/* Fonctions communes aux écrans du Shop (s01 à s12) : catalogue, prix, produits disponibles,
   recherche tolérante, historique du joueur, navigation entre écrans, visuels des jeux,
   en-tête de la mini app, tuiles et cartes produit. Les données viennent de js/data-shop.js ;
   l'état de la démo est mémorisé par js/nav.js (Etat). */

const Shop = (function () {

  /* =====================================================================
     Catalogue
     ===================================================================== */

  function jeu(id) { return SHOP.jeux.find((j) => j.id === id) || null; }
  function produit(id) { return SHOP.produits.find((p) => p.id === id) || null; }
  function editeur(j) { return SHOP.editeurs[j.editeur]; }

  /* Produits d'un jeu, dans l'ordre défini (S01-03, S06-03) */
  function produitsDuJeu(idJeu) { return SHOP.produits.filter((p) => p.jeu === idJeu); }

  /* Un produit n'est achetable que s'il est livrable (S02-04).
     shopEpuises : produits épuisés pendant la démo (« Produit épuisé pendant l'achat »). */
  function achetable(p) { return !!p && !p.epuise && !(Etat.get("shopEpuises") || []).includes(p.id); }

  /* Prix le plus bas parmi les produits achetables du jeu (tuiles « dès … ») */
  function prixMin(j) {
    const prix = produitsDuJeu(j.id).filter(achetable).map((p) => p.prix);
    return prix.length ? Math.min.apply(null, prix) : null;
  }

  /* Montant en MAD, TTC : « 1 060 MAD » */
  function prix(montant) {
    return montant.toLocaleString("fr-FR").replace(/ | /g, " ") + " " + SHOP.pays.monnaie;
  }

  /* Réduction en pourcentage d'un produit en promotion (S04-03) */
  function remise(p) { return p.prixBarre ? Math.round((1 - p.prix / p.prixBarre) * 100) : 0; }

  /* Mode de livraison, toujours visible (S06-03) : Top-up (crédit direct) ou Voucher (code à saisir) */
  function modeLivraison(p) { return p.livraison === "credit" ? "Top-up" : "Voucher"; }
  function explicationLivraison(p) {
    return p.livraison === "credit" ? "crédit direct sur ton compte" : "code à saisir";
  }
  /* Mention complète : « Top-up · crédit direct sur ton compte », « Pass 30 jours · Voucher… » */
  function mention(p) {
    const base = modeLivraison(p) + " · " + explicationLivraison(p);
    return p.type === "pass" ? "Pass " + p.duree + " jours · " + base : base;
  }

  /* Tags d'un produit : son type et « promo » (S01-04) */
  function tagsProduit(p) {
    const tags = [p.type];
    if (p.prixBarre && achetable(p)) tags.push("promo");
    return tags;
  }
  /* Un jeu porte ses tags, et ceux de ses produits */
  function aLeTag(j, tag) {
    if (j.tags.includes(tag)) return true;
    return produitsDuJeu(j.id).some((p) => tagsProduit(p).includes(tag));
  }
  function libelleTag(tag) { return SHOP.tagsJeux[tag] || SHOP.tagsProduits[tag] || tag; }

  /* Jeux par ventes dans le pays */
  function parPopularite(liste) {
    return liste.slice().sort((a, b) => SHOP.populaires.indexOf(a.id) - SHOP.populaires.indexOf(b.id));
  }

  /* =====================================================================
     Historique du joueur
     ===================================================================== */

  /* Commandes du joueur, de la plus récente à la plus ancienne :
     celles passées pendant la démo (shopCommandes), puis l'historique de départ (vide au premier achat). */
  function commandes() {
    const ajoutees = (Etat.get("shopCommandes") || []).slice().reverse().map(actualiser);
    const depart = Etat.get("shopPremierAchat") ? [] : SHOP.commandes.slice().sort((a, b) => b.date.localeCompare(a.date));
    return ajoutees.concat(depart);
  }
  function commande(id) { return commandes().find((c) => c.id === id) || null; }

  /* Nouvelle commande, au lancement du paiement (S06-07) : le produit est réservé (S02-04) */
  function creerCommande(p, compte, moyen) {
    const c = {
      id: "SH-" + SHOP.maintenant.slice(2, 10).replace(/-/g, "") + SHOP.maintenant.slice(11, 13) + "-" + String(Date.now()).slice(-4),
      date: SHOP.maintenant, produit: p.id, compte: compte || null, moyen: moyen, montant: p.prix, statut: "paiement"
    };
    Etat.set("shopCommandes", (Etat.get("shopCommandes") || []).concat(c));
    return c;
  }

  /* Modifie une commande passée pendant la démo */
  function majCommande(id, changements) {
    const liste = (Etat.get("shopCommandes") || []).map((c) => c.id === id ? Object.assign({}, c, changements) : c);
    Etat.set("shopCommandes", liste);
    return liste.find((c) => c.id === id);
  }

  /* Livraison réussie (S06-10, S08-01, S09-01) : un code unique pour un voucher ou un pass livré par code,
     la date de fin pour un pass. Une commande déjà livrée ne l'est jamais une seconde fois. */
  function livrer(c) {
    if (c.statut === "livre") return c;
    const p = produit(c.produit);
    const changements = { statut: "livre" };
    if (p.livraison === "code") changements.code = genererCode(c);
    if (p.type === "pass") changements.fin = ajouterJours(aujourdhui(), p.duree);
    return majCommande(c.id, changements);
  }

  /* Paiement sans réponse (S06-11) : « Vérification en cours », puis confirmation au bout de 20 s de démo */
  const DELAI_VERIFICATION = 20000;
  function actualiser(c) {
    if (c.statut === "verification" && Date.now() - c.debut > DELAI_VERIFICATION) return livrer(c);
    return c;
  }
  /* Paiement précédent encore sans résultat : un nouveau paiement est bloqué (S06-11) */
  function paiementEnAttente() { return commandes().find((c) => c.statut === "verification") || null; }

  /* Statut formulé simplement pour le joueur (S10-01) : libellé et classe de puce */
  function statutCommande(c) {
    const statuts = {
      livre: { libelle: "Livré", classe: "puce-inscrit" },
      paiement: { libelle: "En cours", classe: "puce-attente" },
      livraison: { libelle: "En cours", classe: "puce-attente" },
      verification: { libelle: "En cours", classe: "puce-attente" },
      echec: { libelle: "Remboursement en cours", classe: "puce-attente" },
      rembourse: { libelle: "Remboursé", classe: "puce-mea" },
      refuse: { libelle: "Paiement refusé", classe: "puce-clos" }
    };
    return statuts[c.statut] || statuts.paiement;
  }

  /* Pass : jours restants avant la fin ; « expire bientôt » à 3 jours pour un pass sans reconduction (S09-04) */
  function joursRestants(c) {
    return c.fin ? Math.round((new Date(c.fin + "T12:00") - new Date(aujourdhui() + "T12:00")) / 86400000) : null;
  }
  function expireBientot(c) {
    const p = produit(c.produit);
    const jours = joursRestants(c);
    return c.statut === "livre" && p.type === "pass" && !p.reconduction && jours !== null && jours >= 0 && jours <= 3;
  }

  /* Envoi du code par SMS : activé pays par pays (S09-02) ; le menu de démo peut le couper */
  function smsActif() { return SHOP.smsActif && !Etat.get("shopSansSms"); }

  /* Réclamations du joueur (S10-04), rattachées à une commande */
  function reclamations() { return (Etat.get("shopReclamations") || []).slice(); }
  function reclamation(idCommande) { return reclamations().find((r) => r.commande === idCommande) || null; }
  function signaler(idCommande, motif, commentaire) {
    const r = { numero: "RC-" + String(graine(idCommande + motif)).slice(-6).padStart(6, "0"), commande: idCommande,
      motif: motif, commentaire: commentaire, date: aujourdhui() };
    Etat.set("shopReclamations", reclamations().filter((x) => x.commande !== idCommande).concat(r));
    return r;
  }

  /* Paiement abandonné dans la brique Max it : la commande disparaît, le produit réservé est libéré */
  function supprimerCommande(id) {
    Etat.set("shopCommandes", (Etat.get("shopCommandes") || []).filter((c) => c.id !== id));
  }

  /* Code unique tiré de la référence de la commande : « FRE-7K2M-Q9TZ » */
  function genererCode(c) {
    const lettres = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let n = graine(c.id + c.produit);
    let code = produit(c.produit).jeu.replace(/-/g, "").slice(0, 3).toUpperCase();
    for (let g = 0; g < 2; g++) {
      code += "-";
      for (let i = 0; i < 4; i++) { code += lettres[n % lettres.length]; n = Math.floor(n / lettres.length) + (i + 7) * 131; }
    }
    return code;
  }

  /* =====================================================================
     Comptes de jeu mémorisés (S05-04) et vérification de l'identifiant (S05-02, S05-03)
     ===================================================================== */

  function tousLesComptes() { return Etat.get("shopComptes") || SHOP.comptes; }
  function comptes(idJeu) { return (tousLesComptes()[idJeu] || []).slice(); }
  function enregistrerComptes(idJeu, liste) {
    const tous = Object.assign({}, tousLesComptes());
    tous[idJeu] = liste;
    Etat.set("shopComptes", tous);
  }
  /* Le dernier compte utilisé passe en tête ; un identifiant n'est mémorisé qu'une fois */
  function memoriserCompte(idJeu, compte) {
    enregistrerComptes(idJeu, [compte].concat(comptes(idJeu).filter((c) => c.identifiant !== compte.identifiant)));
  }
  function supprimerCompte(idJeu, identifiant) {
    enregistrerComptes(idJeu, comptes(idJeu).filter((c) => c.identifiant !== identifiant));
  }

  /* Contrôle du format, jeu par jeu (longueur, caractères) */
  function formatValide(j, identifiant) {
    return new RegExp(j.identifiant.format, "i").test(identifiant.trim());
  }
  /* Pseudo renvoyé par l'éditeur : celui d'un compte déjà connu, sinon un pseudo fictif stable */
  function pseudoPour(idJeu, identifiant) {
    const connu = comptes(idJeu).concat(SHOP.comptes[idJeu] || []).find((c) => c.identifiant === identifiant && c.pseudo);
    return connu ? connu.pseudo : SHOP.pseudos[graine(identifiant) % SHOP.pseudos.length];
  }

  /* =====================================================================
     Conditions de vente (S06-08)
     ===================================================================== */

  function conditionsEnVigueur() { return Etat.get("shopCgvModifiees") ? SHOP.conditions.nouvelle : SHOP.conditions; }
  /* Version acceptée par le joueur : aucune au premier achat */
  function conditionsAcceptees() {
    return Etat.get("shopCgvAcceptee") || (Etat.get("shopPremierAchat") ? null : SHOP.conditions.acceptee);
  }
  function conditionsAJour() {
    const acceptee = conditionsAcceptees();
    return !!acceptee && acceptee.version === conditionsEnVigueur().version;
  }
  /* La date et la version acceptées sont conservées */
  function accepterConditions() {
    Etat.set("shopCgvAcceptee", { version: conditionsEnVigueur().version, date: aujourdhui() });
  }

  /* =====================================================================
     Paiement (S07-01) et scénarios du menu de démo
     ===================================================================== */

  /* Le DCB n'est proposé que sous le plafond déclaré par le module de paiement */
  function dcbUtilisable(montant) {
    return SHOP.paiement.dcb && montant <= SHOP.paiement.plafondDcb && scenario() !== "hors-plafond";
  }
  function nomMoyen(moyen) { return moyen === "dcb" ? "Crédit ou facture mobile" : "Orange Money"; }
  /* Dans une phrase : « payés avec ton crédit ou ta facture mobile », « remboursés sur ton compte Orange Money » */
  function moyenEnPhrase(moyen) { return moyen === "dcb" ? "ton crédit ou ta facture mobile" : "ton compte Orange Money"; }
  /* Numéro masqué : « +212 6 61 •• •• 67 » */
  function numeroMasque() { return SHOP.joueur.numero.replace(/\d\d \d\d (\d\d)$/, "•• •• $1"); }

  /* Scénario de démo en cours (menu de démo) ; « consommer » l'efface une fois appliqué */
  function scenario() { return Etat.get("shopScenario"); }
  function consommerScenario(nom) {
    if (scenario() !== nom) return false;
    Etat.set("shopScenario", null);
    return true;
  }

  /* =====================================================================
     Dates
     ===================================================================== */

  function aujourdhui() { return SHOP.maintenant.slice(0, 10); }
  function ajouterJours(iso, jours) {
    const d = new Date(iso + "T12:00");
    d.setDate(d.getDate() + jours);
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  /* « 2026-10-09 » → « 09/10/2026 » */
  function dateCourte(iso) { return iso.slice(0, 10).split("-").reverse().join("/"); }

  /* Nombre tiré d'un texte : résultats stables d'une page à l'autre */
  function graine(texte) { return texte.split("").reduce((n, c) => (n * 31 + c.charCodeAt(0)) % 999983, 7); }

  /* Derniers jeux achetés, sans doublon (S06-02) */
  function derniersJeux() {
    const ids = [];
    commandes().forEach((c) => {
      const p = produit(c.produit);
      if (p && !ids.includes(p.jeu)) ids.push(p.jeu);
    });
    return ids.map(jeu).filter(Boolean);
  }

  /* =====================================================================
     Recherche (S06-06) : tolère les fautes de frappe, les accents, les espaces
     ===================================================================== */

  /* « Fréé Fire ! » → « freefire » */
  function normaliser(texte) {
    return texte.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "");
  }

  /* Distance d'édition entre deux mots (lettres ajoutées, retirées ou remplacées) */
  function distance(a, b) {
    let precedente = Array.from({ length: b.length + 1 }, (v, i) => i);
    for (let i = 1; i <= a.length; i++) {
      const ligne = [i];
      for (let k = 1; k <= b.length; k++) {
        ligne[k] = Math.min(precedente[k] + 1, ligne[k - 1] + 1, precedente[k - 1] + (a[i - 1] === b[k - 1] ? 0 : 1));
      }
      precedente = ligne;
    }
    return precedente[b.length];
  }

  /* Pertinence d'un jeu pour la saisie : 0 = nom exact, puis début du nom, nom contenant la saisie,
     faute de frappe tolérée, tag. null = sans rapport. */
  function pertinence(j, saisie) {
    const q = normaliser(saisie);
    if (!q) return 10;
    // Fautes tolérées : 1 dès 4 lettres, 2 dès 5 lettres (« asfalt » trouve Asphalt)
    const tolerance = q.length >= 5 ? 2 : q.length >= 4 ? 1 : 0;
    let meilleure = null;
    const garder = (score) => { if (meilleure === null || score < meilleure) meilleure = score; };
    [j.nom].concat(j.alias || []).forEach((nom) => {
      const n = normaliser(nom);
      if (n === q) garder(0);
      else if (n.startsWith(q)) garder(1);
      else if (n.includes(q)) garder(2);
      else {
        // Comparaison au nom entier et à son début (une lettre de plus ou de moins que la saisie)
        const d = Math.min(distance(q, n), distance(q, n.slice(0, q.length - 1)),
          distance(q, n.slice(0, q.length)), distance(q, n.slice(0, q.length + 1)));
        if (d <= tolerance) garder(3 + d);
      }
    });
    j.tags.forEach((tag) => { if (normaliser(libelleTag(tag)).includes(q)) garder(6); });
    return meilleure;
  }

  /* Jeux trouvés, du plus pertinent au moins pertinent, puis par ventes ; tag : filtre facultatif */
  function rechercher(saisie, tag) {
    return parPopularite(SHOP.jeux)
      .filter((j) => !tag || aLeTag(j, tag))
      .map((j) => ({ jeu: j, score: pertinence(j, saisie || "") }))
      .filter((r) => r.score !== null)
      .sort((a, b) => a.score - b.score)
      .map((r) => r.jeu);
  }

  /* =====================================================================
     Navigation
     ===================================================================== */

  /* Adresse de la page affichée, pour y revenir (« s03-jeu.html?jeu=freefire&depuis=… »).
     Elle garde sa propre origine : en revenant, chaque page retrouve encore la sienne
     (13 → s03 → s04 → s03 → 13). */
  function ici() {
    const texte = new URLSearchParams(rechercheCourante()).toString();
    return pageCourante() + (texte ? "?" + texte : "");
  }

  /* Page d'où l'on vient (paramètre « depuis ») : un écran du Shop, ou la page d'un jeu de l'e-sport (13).
     Ouverture par lien direct (via=lien) : le retour ramène dans Max it (S06-01). */
  function depuis(defaut) {
    if (Nav.param("via") === "lien") return "00c-maxit-gaming.html";
    const valeur = Nav.param("depuis");
    return valeur && /^(s\d\d-[\w-]+|13-jeu)\.html(\?[\w=&%.+-]*)?$/.test(valeur) ? valeur : (defaut || "s01-accueil.html");
  }

  function url(page, params) { return page + "?" + new URLSearchParams(params).toString(); }
  function lienJeu(id, origine) { return url("s03-jeu.html", { jeu: id, depuis: origine || ici() }); }
  function lienProduit(id, origine) { return url("s04-produit.html", { produit: id, depuis: origine || ici() }); }

  /* Rendu au chargement et à chaque changement d'état (menu de démo) */
  function monter(fn) {
    document.addEventListener("DOMContentLoaded", fn);
    document.addEventListener("etat-change", fn);
  }

  /* =====================================================================
     Icônes (SVG 24 × 24, trait monochrome comme Max it)
     ===================================================================== */

  const ICONES = {
    retour: '<path d="M10.6 5.3 12 6.7 7.7 11H20v2H7.7l4.3 4.3-1.4 1.4L3.9 12z"/>',
    recherche: '<path d="M10.5 3a7.5 7.5 0 0 1 5.9 12.1l4.8 4.8-1.4 1.4-4.8-4.8A7.5 7.5 0 1 1 10.5 3zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z"/>',
    // Mes achats : ticket de caisse
    achats: '<path d="M5 2h14v20l-2.3-1.5L14.3 22 12 20.5 9.7 22l-2.4-1.5L5 22zm2 2v14.3l.3-.2 2.4 1.5 2.3-1.5 2.3 1.5 2.4-1.5.3.2V4zm2 3h6v2H9zm0 4h6v2H9z"/>',
    // Aide : point d'interrogation dans un cercle
    aide: '<path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm-1 11h2v2h-2zm1-9a3.5 3.5 0 0 1 1.6 6.6c-.5.3-.6.5-.6.9V14h-2v-.6c0-1.3.7-2 1.6-2.5A1.5 1.5 0 1 0 10.5 9.5h-2A3.5 3.5 0 0 1 12 6z"/>',
    chevron: '<path d="M9.3 5.3 15.9 12l-6.6 6.7-1.4-1.4 5.2-5.3-5.2-5.3z"/>',
    fermer: '<path d="M6.4 5 12 10.6 17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4z"/>',
    info: '<path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm-1 7h2v6h-2zm0-4h2v2h-2z"/>',
    coche: '<path d="M9.5 16.2 4.8 11.5l-1.4 1.4 6.1 6.1L21 7.5l-1.4-1.4z"/>',
    // Types de produits : éclair (top-up), ticket (voucher), calendrier (pass)
    topup: '<path d="M13 2 4 14h6l-1 8 9-12h-6z"/>',
    voucher: '<path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a3 3 0 0 0 0 6v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a3 3 0 0 0 0-6zm13 0h-2v2h2zm0 4h-2v4h2zm0 6h-2v2h2z"/>',
    pass: '<path d="M7 2h2v2h6V2h2v2h2a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2zM5 9v10h14V9zm2 2h4v4H7z"/>',
    // Tunnel d'achat (lot S2)
    copier: '<path d="M8 3h11a2 2 0 0 1 2 2v11h-2V5H8zM5 7h10a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2zm0 2v11h10V9z"/>',
    alerte: '<path d="M12 2 1 21h22zm0 4 7.5 13h-15zm-1 4v5h2v-5zm0 6v2h2v-2z"/>',
    portefeuille: '<path d="M4 5h14a2 2 0 0 1 2 2v1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm0 2v11h14v-1h-4a3 3 0 0 1-3-3v-1a3 3 0 0 1 3-3h4V7zm10 5a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h6v-3zm1 .5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>',
    mobile: '<path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2v16h10V4zm3 13h4v2h-4z"/>',
    horloge: '<path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm1 3v5.4l3.6 2.1-1 1.7L11 13.6V7h2z"/>',
    rembourse: '<path d="M12 3a9 9 0 1 1-8.5 12h2.1A7 7 0 1 0 7 7.1V10H5V4h2v1.4A9 9 0 0 1 12 3zm-1 4h2v1.1c1.3.3 2.3 1.2 2.4 2.4h-2c-.1-.4-.6-.7-1.4-.7-.9 0-1.4.3-1.4.8s.4.7 1.8 1c2 .4 3.1 1.1 3.1 2.6 0 1.3-1 2.2-2.5 2.5V18h-2v-1.3c-1.5-.3-2.5-1.3-2.6-2.6h2c.1.5.7.9 1.6.9 1 0 1.5-.3 1.5-.8s-.4-.7-1.9-1c-1.9-.4-3-1.1-3-2.6 0-1.2.9-2.1 2.4-2.4z"/>',
    compte: '<path d="M12 3a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm0 8.5c4.4 0 8 2.2 8 5.5v2H4v-2c0-3.3 3.6-5.5 8-5.5zm0 2c-3.2 0-5.7 1.4-6 3.5h12c-.3-2.1-2.8-3.5-6-3.5z"/>',
    bouclier: '<path d="M12 2l8 3v6c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V5zm0 2.1L6 6.4V11c0 3.9 2.5 7.4 6 8.9 3.5-1.5 6-5 6-8.9V6.4zm-1 9.7 4.6-4.6 1.4 1.4-6 6-3.4-3.4 1.4-1.4z"/>'
  };

  function icone(nom, classe) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true" class="' + (classe || "f-text") + '">' + ICONES[nom] + "</svg>";
  }

  /* =====================================================================
     Visuels des jeux : l'image de l'e-sport si elle existe (images/jeux),
     sinon dégradé (tokens.css) et pictogramme, comme dans l'e-sport.
     format : « carre » (tuiles, vignettes) ou « large » (en-têtes, bannières).
     ===================================================================== */

  const PICTOS = {
    freefire: '<path d="M12 2c1 3.5 5 5.6 5 10.5a5 5 0 0 1-10 0c0-2 .9-3.6 2.2-4.8-.1 1.6.5 2.8 1.6 3.3C10.2 7.6 11 4.5 12 2z"/>',
    pubg: '<path d="M12 3a8 8 0 0 1 8 8v3h-3l-1 4H8l-1-4H4v-3a8 8 0 0 1 8-8zm-5 8v1h10v-1z"/>',
    efootball: '<path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 4.5-3.3 2.4 1.3 3.9h4l1.3-3.9zM6.2 7.3A8 8 0 0 0 4 12l2.6.8 1.2-3.6zm11.6 0-1.6 1.9 1.2 3.6L20 12a8 8 0 0 0-2.2-4.7zM9.3 14.8l-1.6 2.3A8 8 0 0 0 12 20v-2.8l-2-1.4zm5.4 0-.7 1L12 17.2V20a8 8 0 0 0 4.3-2.9z"/>',
    // Bouclier
    mlbb: '<path d="M12 2l8 3v6c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V5zm0 4-1.5 4.5H6l3.7 2.7-1.4 4.4L12 15l3.7 2.6-1.4-4.4 3.7-2.7h-4.5z"/>',
    // Cube incliné
    roblox: '<path fill-rule="evenodd" d="M6.2 2 22 6.2 17.8 22 2 17.8zm4.3 7.4-.9 3.4 3.4.9.9-3.4z"/>',
    // Tour de château
    "clash-of-clans": '<path d="M5 3h3v3h2V3h4v3h2V3h3v6l-2 2v8h2v3H5v-3h2v-8L5 9zm6 10v4h2v-4a1 1 0 0 0-2 0z"/>',
    // Étoile à quatre branches
    genshin: '<path d="M12 2c1 6 4 9 10 10-6 1-9 4-10 10-1-6-4-9-10-10 6-1 9-4 10-10z"/>',
    // Voiture de course
    asphalt: '<path d="M5 11l2-5h10l2 5h1a1 1 0 0 1 1 1v5h-2a2 2 0 0 1-4 0H9a2 2 0 0 1-4 0H3v-5a1 1 0 0 1 1-1zm3.3-3-1.2 3h9.8l-1.2-3z"/>'
  };

  /* Bloc visuel. taille : « petit » (44 px), « grand » (remplit son conteneur) ou rien (tuile, 100 %) */
  function visuel(j, taille) {
    const format = taille === "grand" ? "large" : "carre";
    const image = j.images && j.images[format]
      ? '<img class="visuel-image" src="' + ressource(j.images[format]) + '" alt="" onerror="this.remove()">' : "";
    return '<span class="visuel-jeu jeu-' + j.id + (taille ? " visuel-" + taille : " visuel-tuile-shop") + '" aria-hidden="true">' +
      '<span class="visuel-forme"></span>' +
      '<svg viewBox="0 0 24 24" class="f-white">' + PICTOS[j.id] + "</svg>" + image + "</span>";
  }

  /* =====================================================================
     Composants
     ===================================================================== */

  /* En-tête de la mini app : retour, titre, « Mes achats » et aide (CLAUDE.md).
     retour : adresse de la page précédente ; libelleRetour : texte lu par les lecteurs d'écran. */
  function entete(titre, retour, libelleRetour) {
    return '<header class="entete-esport entete-shop">' +
      '<a href="' + retour + '" class="bouton-icone" aria-label="' + (libelleRetour || "Retour") + '">' + icone("retour") + "</a>" +
      '<h1 class="entete-titre">' + titre + "</h1>" + boutonsEntete("f-text") + "</header>";
  }
  /* « Mes achats » et aide ; on n'y renvoie pas depuis l'écran lui-même. Le retour ramène ici. */
  function boutonsEntete(classe) {
    const page = pageCourante();
    return (page === "s08-achats.html" ? "" : '<a href="' + url("s08-achats.html", { depuis: ici() }) + '" class="bouton-icone" aria-label="Mes achats">' + icone("achats", classe) + "</a>") +
      (page === "s11-aide.html" ? "" : '<a href="' + url("s11-aide.html", { depuis: ici() }) + '" class="bouton-icone" aria-label="Aide">' + icone("aide", classe) + "</a>");
  }

  /* Tuile d'un jeu : visuel carré, nom, prix le plus bas */
  function tuile(j, origine) {
    const min = prixMin(j);
    return '<a href="' + lienJeu(j.id, origine) + '" class="tuile-shop">' + visuel(j) +
      '<span class="tuile-shop-nom">' + j.nom + "</span>" +
      '<span class="tuile-shop-prix">' + (min !== null ? "dès " + prix(min) : "Épuisé") + "</span></a>";
  }

  /* Ligne d'un jeu (résultats de recherche) */
  function ligneJeu(j, origine, detail) {
    const min = prixMin(j);
    return '<a href="' + lienJeu(j.id, origine) + '" class="ligne ligne-jeu-shop">' + visuel(j, "petit") +
      '<span class="ligne-corps"><span class="ligne-titre">' + j.nom + "</span>" +
      '<span class="ligne-sous-titre">' + (detail || j.tags.map(libelleTag).join(" · ")) +
      (min !== null ? " · dès " + prix(min) : "") + "</span></span>" +
      icone("chevron", "f-muted") + "</a>";
  }

  /* Prix d'un produit, avec le prix barré d'une promotion */
  function blocPrix(p) {
    return '<span class="prix-shop">' + (p.prixBarre ? "<s>" + prix(p.prixBarre) + "</s>" : "") + "<b>" + prix(p.prix) + "</b></span>";
  }

  /* Carte d'un produit dans la liste du jeu (S06-03) : un produit épuisé reste affiché, sans lien (S02-04) */
  function carteProduit(p, origine) {
    const corps =
      '<span class="icone-produit">' + icone(p.type, "f-primary") + "</span>" +
      '<span class="carte-corps"><span class="carte-titre">' + p.nom + "</span>" +
      '<span class="mention-livraison">' + mention(p) + "</span>" +
      (p.prixBarre && achetable(p) ? '<span class="carte-badges"><span class="puce-etat puce-promo">Promo −' + remise(p) + " %</span></span>" : "") +
      "</span>";
    if (!achetable(p)) {
      return '<div class="carte-produit epuise" aria-disabled="true">' + corps +
        '<span class="prix-shop"><b>' + prix(p.prix) + '</b><span class="puce-etat puce-clos">Épuisé</span></span></div>';
    }
    return '<a href="' + lienProduit(p.id, origine) + '" class="carte-produit">' + corps + blocPrix(p) + "</a>";
  }

  /* Feuille du bas (aide « où trouver mon identifiant », confirmations). Renvoie le voile pour la fermer. */
  function feuille(contenu, etiquette) {
    const voile = document.createElement("div");
    voile.className = "voile ouvert";
    voile.innerHTML = '<div class="feuille" role="dialog" aria-modal="true" aria-label="' + etiquette + '">' +
      '<div class="poignee"></div>' + contenu + "</div>";
    voile.addEventListener("click", (e) => {
      if (e.target === voile || e.target.closest("[data-fermer]")) voile.remove();
    });
    document.querySelector(".telephone").appendChild(voile);
    return voile;
  }

  /* Résumé d'une commande : visuel du jeu, produit, mention de livraison */
  function resumeProduit(p) {
    const j = jeu(p.jeu);
    return '<div class="resume-produit">' + visuel(j, "petit") +
      '<span class="ligne-corps"><span class="ligne-titre">' + p.nom + '</span><span class="ligne-sous-titre">' + j.nom + " · " + mention(p) + "</span></span></div>";
  }

  return {
    feuille, resumeProduit,
    jeu, produit, editeur, produitsDuJeu, achetable, prixMin, prix, remise,
    modeLivraison, explicationLivraison, mention, tagsProduit, aLeTag, libelleTag, parPopularite,
    statutCommande, joursRestants, expireBientot, smsActif, reclamations, reclamation, signaler, boutonsEntete,
    commandes, commande, creerCommande, majCommande, livrer, paiementEnAttente, supprimerCommande, derniersJeux, normaliser, rechercher,
    comptes, memoriserCompte, supprimerCompte, formatValide, pseudoPour,
    conditionsEnVigueur, conditionsAcceptees, conditionsAJour, accepterConditions,
    dcbUtilisable, nomMoyen, moyenEnPhrase, numeroMasque, scenario, consommerScenario, aujourdhui, ajouterJours, dateCourte,
    ici, depuis, url, lienJeu, lienProduit, monter,
    icone, visuel, entete, tuile, ligneJeu, blocPrix, carteProduit
  };
})();
