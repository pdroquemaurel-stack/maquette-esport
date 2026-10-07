/* Composants communs aux écrans de la plateforme e-sport :
   en-tête, barre du bas, cartes de tournoi, badges, visuels des jeux,
   état d'inscription du joueur, formats de date.
   Chargé après data.js et nav.js, avant demo.js. */

const Esport = (function () {

  /* ---------- Icônes de l'interface (trait monochrome, comme Max it) ---------- */
  const ICONES = {
    retour: '<path d="M10.6 5.3 12 6.7 7.7 11H20v2H7.7l4.3 4.3-1.4 1.4L3.9 12z"/>',
    cloche: '<path d="M12 2a6 6 0 0 1 6 6v5l2 3v1H4v-1l2-3V8a6 6 0 0 1 6-6zm0 2a4 4 0 0 0-4 4v5.6L6.9 15h10.2L16 13.6V8a4 4 0 0 0-4-4zm-2 15h4a2 2 0 0 1-4 0z"/>',
    recherche: '<path d="M10.5 3a7.5 7.5 0 0 1 5.9 12.1l4.8 4.8-1.4 1.4-4.8-4.8A7.5 7.5 0 1 1 10.5 3zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z"/>',
    filtres: '<path d="M3 5h12.2a3 3 0 0 1 5.6 1H21v1h-.2a3 3 0 0 1-5.6 0H3zm15 1a1 1 0 1 0 0 .01zM3 17h3.2a3 3 0 0 1 5.6 0H21v2h-9.2a3 3 0 0 1-5.6 0H3zm6 1a1 1 0 1 0 0 .01zM3 11h18v2H3z"/>',
    accueil: '<path d="M12 3l9 7.5V21h-6v-6H9v6H3V10.5zm0 2.6-7 5.8V19h2v-6h10v6h2v-7.6z"/>',
    accueilPlein: '<path d="M12 3l9 7.5V21h-6v-6H9v6H3V10.5z"/>',
    trophee: '<path d="M7 3h10v2h4v3a4 4 0 0 1-4.3 4A5 5 0 0 1 13 14.9V18h3v3H8v-3h3v-3.1A5 5 0 0 1 7.3 12 4 4 0 0 1 3 8V5h4zm2 2v5a3 3 0 0 0 6 0V5zM5 7v1a2 2 0 0 0 2 2V7zm12 0v3a2 2 0 0 0 2-2V7z"/>',
    manette: '<path d="M7.5 6h9a5.5 5.5 0 0 1 5.4 6.6l-.8 4a2.9 2.9 0 0 1-5 1.3L14.4 16H9.6l-1.7 1.9a2.9 2.9 0 0 1-5-1.3l-.8-4A5.5 5.5 0 0 1 7.5 6zM7 9v1.5H5.5v2H7V14h2v-1.5h1.5v-2H9V9zm8.5 0a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zm2 2.6a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z"/>',
    lecture: '<path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v12h16V6zm6 2.5 5.5 3.5-5.5 3.5z"/>',
    profil: '<path d="M12 3a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm0 8.5c4.4 0 8 2.2 8 5.5v2H4v-2c0-3.3 3.6-5.5 8-5.5zm0 2c-3.2 0-5.7 1.4-6 3.5h12c-.3-2.1-2.8-3.5-6-3.5z"/>',
    cadenas: '<path d="M7 10V7a5 5 0 0 1 10 0v3h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h1zm2 0h6V7a3 3 0 0 0-6 0v3z"/>',
    chevron: '<path d="M9.3 5.3 15.9 12l-6.6 6.7-1.4-1.4 5.2-5.3-5.2-5.3z"/>',
    calendrier: '<path d="M7 2h2v2h6V2h2v2h2a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2zM5 9v10h14V9z"/>',
    groupe: '<path d="M9 4a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zm7.5 1.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM9 12.5c3.6 0 6.5 1.8 6.5 4.5V19H2.5v-2c0-2.7 2.9-4.5 6.5-4.5zm7.5.5c2.8 0 5 1.4 5 3.5V19h-4v-2c0-1.5-.6-2.8-1.7-3.8z"/>',
    globe: '<path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm-1.9 2.2A8 8 0 0 0 4.1 11h3.4c.2-2.5.9-4.9 2.6-6.8zm3.8 0c1.7 1.9 2.4 4.3 2.6 6.8h3.4a8 8 0 0 0-6-6.8zM9.5 11h5c-.2-2.3-1-4.4-2.5-6-1.5 1.6-2.3 3.7-2.5 6zm-5.4 2a8 8 0 0 0 6 6.8c-1.7-1.9-2.4-4.3-2.6-6.8zm5.4 0c.2 2.3 1 4.4 2.5 6 1.5-1.6 2.3-3.7 2.5-6zm6.9 0c-.2 2.5-.9 4.9-2.6 6.8a8 8 0 0 0 6-6.8z"/>',
    coche: '<path d="M9.5 16.2 4.8 11.5l-1.4 1.4 6.1 6.1L21 7.5l-1.4-1.4z"/>',
    alerte: '<path d="M12 2 1 21h22zm0 4 7.5 13h-15zm-1 4v5h2v-5zm0 6v2h2v-2z"/>',
    boutique: '<path d="M3 3h18l-1 6a3 3 0 0 1-5 1.5A3 3 0 0 1 12 12a3 3 0 0 1-3-1.5A3 3 0 0 1 4 9zm2 9.6a5 5 0 0 0 0 .1V21h14v-8.3a5 5 0 0 1-2 .3 5 5 0 0 1-2-.5 5 5 0 0 1-6 0 5 5 0 0 1-4 .1zM9 15h6v4H9z"/>',
    article: '<path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2v14h14V5zm2 2h10v2H7zm0 4h10v2H7zm0 4h6v2H7z"/>'
  };

  /* Renvoie un SVG prêt à insérer. classe : classe de remplissage (f-text, f-primary…) */
  function icone(nom, classe) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true" class="' + (classe || "f-text") + '">' + ICONES[nom] + "</svg>";
  }

  /* ---------- Visuels des jeux (pas d'image : dégradé et pictogramme SVG) ---------- */
  const PICTOS_JEUX = {
    // Flamme
    freefire: '<path class="f-white" d="M12 2c1 3.5 5 5.6 5 10.5a5 5 0 0 1-10 0c0-2 .9-3.6 2.2-4.8-.1 1.6.5 2.8 1.6 3.3C10.2 7.6 11 4.5 12 2z"/>',
    // Casque
    pubg: '<path class="f-white" d="M12 3a8 8 0 0 1 8 8v3h-3l-1 4H8l-1-4H4v-3a8 8 0 0 1 8-8zm-5 8v1h10v-1z"/>',
    // Ballon
    efootball: '<path class="f-white" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 4.5-3.3 2.4 1.3 3.9h4l1.3-3.9zM6.2 7.3A8 8 0 0 0 4 12l2.6.8 1.2-3.6zm11.6 0-1.6 1.9 1.2 3.6L20 12a8 8 0 0 0-2.2-4.7zM9.3 14.8l-1.6 2.3A8 8 0 0 0 12 20v-2.8l-2-1.4zm5.4 0-.7 1L12 17.2V20a8 8 0 0 0 4.3-2.9z"/>',
    // Viseur
    codm: '<path class="f-white" d="M11 2h2v3.1A7 7 0 0 1 18.9 11H22v2h-3.1A7 7 0 0 1 13 18.9V22h-2v-3.1A7 7 0 0 1 5.1 13H2v-2h3.1A7 7 0 0 1 11 5.1zm1 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>'
  };

  /* Bloc visuel d'un jeu (fond dégradé + pictogramme). taille : "petit" ou "grand" */
  function visuelJeu(idJeu, taille) {
    return '<span class="visuel-jeu jeu-' + idJeu + (taille ? " visuel-" + taille : "") + '" aria-hidden="true">' +
      '<span class="visuel-forme"></span>' +
      '<svg viewBox="0 0 24 24">' + PICTOS_JEUX[idJeu] + "</svg></span>";
  }

  /* ---------- Accès aux données ---------- */
  function jeu(id) { return DONNEES.jeux.find((j) => j.id === id); }
  function tournoi(id) { return DONNEES.tournois.find((t) => t.id === id); }
  function maintenant() { return new Date(DONNEES.maintenant); }
  function abonne() { return !!Etat.get("abonne"); }
  function pseudo() { return Etat.get("pseudo") || DONNEES.joueur.pseudo; }
  function pays() { return DONNEES.pays[DONNEES.joueur.pays]; }
  function fonction(nom) { return DONNEES.fonctions[DONNEES.joueur.pays][nom]; }

  /* Tournois visibles par le joueur : ceux ouverts dans son pays (S03-07) */
  function tournoisDuPays() {
    return DONNEES.tournois.filter((t) => t.pays.includes(DONNEES.joueur.pays));
  }

  /* ---------- Inscriptions du joueur (mémorisées pendant la démo) ---------- */
  function inscriptions() {
    return Etat.get("inscriptions") || DONNEES.joueur.inscriptions;
  }
  function inscription(idTournoi) {
    return inscriptions()[idTournoi] || null;
  }
  /* valeur : { etat: "inscrit" } / { etat: "attente", rang } ou null pour retirer */
  function changerInscription(idTournoi, valeur) {
    const copie = Object.assign({}, inscriptions());
    if (valeur) copie[idTournoi] = valeur;
    else delete copie[idTournoi];
    Etat.set("inscriptions", copie);
  }

  /* ---------- Équipe du joueur dans un tournoi (S04-03, S04-04) ----------
     Les modifications de la démo sont mémorisées ; null = pas d'équipe (même si data.js en a une). */
  function equipe(idTournoi) {
    const memo = Etat.get("equipes") || {};
    if (Object.prototype.hasOwnProperty.call(memo, idTournoi)) return memo[idTournoi];
    return DONNEES.mesEquipes[idTournoi] || null;
  }
  function changerEquipe(idTournoi, valeur) {
    const copie = Object.assign({}, Etat.get("equipes") || {});
    copie[idTournoi] = valeur;
    Etat.set("equipes", copie);
  }
  /* Taille exigée par la fiche du jeu */
  function tailleEquipe(t) { return jeu(t.jeu).equipe; }

  /* ---------- Règlement (S03-03) ---------- */
  /* Un inscrit doit réaccepter un règlement modifié tant qu'il n'a pas accepté la nouvelle version */
  function reglementAAccepter(t) {
    const ins = inscription(t.id);
    const acceptes = Etat.get("reglementsAcceptes") || {};
    return !!(ins && ins.etat === "inscrit" && t.reglement.modifie && acceptes[t.id] !== t.reglement.version);
  }
  function accepterReglement(t) {
    const acceptes = Object.assign({}, Etat.get("reglementsAcceptes") || {});
    acceptes[t.id] = t.reglement.version;
    Etat.set("reglementsAcceptes", acceptes);
  }

  /* État alternatif demandé par le menu de démo : lu une seule fois, puis effacé */
  function lireScenario() {
    const scenario = Etat.get("scenario");
    if (scenario) Etat.set("scenario", null);
    return scenario;
  }

  /* Inscriptions closes : date de clôture passée, tournoi commencé ou terminé */
  function inscriptionsCloses(t) {
    if (t.etat === "en-cours" || t.etat === "termine") return true;
    return maintenant() > new Date(t.cloture + "T23:59");
  }

  /* État du bouton principal d'un tournoi pour le joueur courant (écran 06) :
     inscrit, inscrit-en-cours, attente, equipe-incomplete, abonner, complet, inscrire, closes, termine */
  function etatBouton(t) {
    const ins = inscription(t.id);
    if (ins && ins.etat === "inscrit") {
      if (t.etat === "en-cours") return "inscrit-en-cours";
      if (t.etat === "termine") return "termine";
      return "inscrit";
    }
    if (ins && ins.etat === "attente" && !inscriptionsCloses(t)) return "attente";
    if (t.etat === "termine") return "termine";
    if (inscriptionsCloses(t)) return "closes";
    // Équipe créée ou rejointe mais pas encore complète : pas encore inscrite (S04-03)
    if (t.mode === "equipe" && equipe(t.id)) return "equipe-incomplete";
    if (t.acces === "abonnes" && !abonne()) return "abonner";
    if (t.etat === "complet" || t.inscrits >= t.places) return "complet";
    return "inscrire";
  }

  /* ---------- Dates ---------- */
  const JOURS = ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."];
  const MOIS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];

  function date(iso) { return new Date(iso.length === 10 ? iso + "T12:00" : iso); }
  /* « sam. 18 oct. » */
  function jourLong(iso) { const d = date(iso); return JOURS[d.getDay()] + " " + d.getDate() + " " + MOIS[d.getMonth()]; }
  /* « 18 oct. » */
  function jourCourt(iso) { const d = date(iso); return d.getDate() + " " + MOIS[d.getMonth()]; }
  /* « 20:00 » */
  function heure(iso) { return iso.slice(11, 16); }
  /* Bloc date des cartes : { jour: "18", mois: "oct." } */
  function blocDate(iso) { const d = date(iso); return { jour: d.getDate(), mois: MOIS[d.getMonth()] }; }

  /* Montant dans la monnaie du pays du joueur */
  function prix(montant) {
    return montant.toLocaleString("fr-FR").replace(/ | /g, " ") + " " + pays().monnaie;
  }

  /* ---------- Badges d'un tournoi ---------- */
  function badges(t) {
    let html = "";
    const ins = inscription(t.id);
    if (ins && ins.etat === "inscrit") html += '<span class="puce-etat puce-inscrit">' + icone("coche", "f-white") + "Inscrit</span>";
    if (ins && ins.etat === "attente") html += '<span class="puce-etat puce-attente">Liste d\'attente · ' + ins.rang + "e</span>";
    const eq = !ins && t.mode === "equipe" ? equipe(t.id) : null;
    if (eq) html += '<span class="puce-etat puce-attente">Équipe ' + eq.membres.length + "/" + tailleEquipe(t) + "</span>";
    if (t.acces === "abonnes") {
      // Joueur gratuit : condition d'accès explicite avec un cadenas (S03-04, S05-02)
      html += abonne()
        ? '<span class="puce-etat puce-abonnes">Abonnés</span>'
        : '<span class="puce-etat puce-reserve">' + icone("cadenas", "f-primary") + "Réservé aux abonnés</span>";
    }
    if (t.portee === "MEA") html += '<span class="puce-etat puce-mea">' + icone("globe", "f-text") + "MEA</span>";
    if (t.etat === "en-cours") html += '<span class="puce-etat puce-direct"><i></i>En cours</span>';
    else if (t.etat === "termine") html += '<span class="puce-etat puce-clos">Terminé</span>';
    else if (inscriptionsCloses(t)) html += '<span class="puce-etat puce-clos">Inscriptions closes</span>';
    else if (t.etat === "complet" || t.inscrits >= t.places) html += '<span class="puce-etat puce-clos">Complet</span>';
    return html;
  }

  /* Libellés lisibles */
  function libelleFormat(t) { return t.format === "poules" ? "Poules puis élimination" : "Élimination directe"; }
  function libelleMode(t) {
    const j = jeu(t.jeu);
    return t.mode === "solo" ? "Solo" : "Équipe de " + j.equipe;
  }

  /* ---------- Carte de tournoi (liste du calendrier, accueil, page d'un jeu) ---------- */
  function carteTournoi(t) {
    const d = blocDate(t.debut);
    const j = jeu(t.jeu);
    return '<a href="#" class="carte-tournoi" data-ecran="06" data-id="' + t.id + '">' +
      '<span class="carte-date"><b>' + d.jour + "</b>" + d.mois + "</span>" +
      '<span class="carte-corps">' +
      '<span class="carte-titre">' + t.nom + "</span>" +
      '<span class="carte-sous-titre">' + j.nom + " · " + libelleMode(t) + " · " + heure(t.debut) + "</span>" +
      '<span class="carte-badges">' + badges(t) + "</span>" +
      "</span>" +
      icone("chevron", "f-muted carte-chevron") +
      "</a>";
  }

  /* Carte large pour les carrousels (tournois à la une) */
  function carteUne(t) {
    const j = jeu(t.jeu);
    return '<a href="#" class="carte-une" data-ecran="06" data-id="' + t.id + '">' +
      visuelJeu(t.jeu, "bandeau") +
      '<span class="carte-une-badges">' + badges(t) + "</span>" +
      '<span class="carte-une-texte">' +
      '<span class="carte-titre">' + t.nom + "</span>" +
      '<span class="carte-sous-titre">' + j.nom + " · " + jourLong(t.debut) + " · " + t.dotations[0] + "</span>" +
      "</span></a>";
  }

  /* ---------- Contenus (articles et vidéos) ---------- */

  /* Contenus visibles : les vidéos disparaissent si la fonction est désactivée dans le pays (S08-02) */
  function contenusVisibles() {
    const videos = fonction("video");
    return DONNEES.contenus.filter((c) => c.type !== "video" || videos);
  }

  /* Ligne de contenu ; joueur gratuit : cadenas et condition d'accès (S10-02, S11-01) */
  function ligneContenu(c) {
    const verrou = c.acces === "abonnes" && !abonne();
    let meta = (c.type === "video" ? "Vidéo · " + c.duree : "Article") + " · " + jeu(c.jeu).nom;
    if (verrou) {
      meta += '<span class="puce-etat puce-reserve">' + icone("cadenas", "f-primary") + "Réservé aux abonnés</span>";
      if (c.bandeAnnonce) meta += '<span class="puce-etat puce-abonnes">Bande-annonce libre</span>';
    }
    return '<a href="#" class="ligne contenu-ligne" data-ecran="' + (c.type === "video" ? "18" : "19") + '" data-id="' + c.id + '">' +
      '<span class="vignette">' + visuelJeu(c.jeu, "petit") +
      (c.type === "video" ? '<span class="lecture">' + icone("lecture", "f-white") + "</span>" : "") + "</span>" +
      '<span class="ligne-corps"><span class="ligne-titre">' + c.titre + '</span><span class="meta">' + meta + "</span></span>" +
      icone(verrou ? "cadenas" : "chevron", "f-muted") +
      "</a>";
  }

  /* ---------- En-tête et barre du bas, remplis automatiquement ----------
     <header class="entete-esport" data-titre="Tournois" data-repli="03"></header>
       data-repli : affiche un bouton retour (écran si pas d'historique)
     <nav class="nav-bas" data-onglet="04"></nav> */
  function remplirEntete() {
    document.querySelectorAll("header.entete-esport[data-titre]").forEach((entete) => {
      const repli = entete.dataset.repli;
      entete.innerHTML =
        (repli
          ? '<button class="bouton-icone" data-action="retour" data-repli="' + repli + '" aria-label="Retour">' + icone("retour") + "</button>"
          : '<span class="entete-espace"></span>') +
        '<h1 class="entete-titre">' + entete.dataset.titre + "</h1>" +
        '<button class="bouton-icone" data-ecran="25" aria-label="Notifications, 3 nouvelles">' + icone("cloche") +
        '<span class="pastille">3</span></button>';
    });
  }

  const ONGLETS = [
    { ecran: "03", libelle: "Accueil", icone: "accueil" },
    { ecran: "04", libelle: "Tournois", icone: "trophee" },
    { ecran: "05", libelle: "Mes matchs", icone: "manette", central: true },
    { ecran: "20", libelle: "Contenus", icone: "lecture" },
    { ecran: "23", libelle: "Profil", icone: "profil" }
  ];

  function remplirNavBas() {
    document.querySelectorAll("nav.nav-bas[data-onglet]").forEach((nav) => {
      const actif = nav.dataset.onglet;
      nav.setAttribute("aria-label", "Navigation e-sport");
      nav.innerHTML = ONGLETS.map((o) => {
        if (o.central) {
          return '<a href="#" class="onglet onglet-central" data-ecran="' + o.ecran + '" aria-label="' + o.libelle + '">' +
            '<span class="bouton-central">' + icone(o.icone, "f-white") + "</span>" +
            '<span class="libelle-central' + (actif === o.ecran ? " actif" : "") + '">' + o.libelle + "</span></a>";
        }
        const estActif = actif === o.ecran;
        return '<a href="#" class="onglet' + (estActif ? " actif" : "") + '" data-ecran="' + o.ecran + '"' +
          (estActif ? ' aria-current="page"' : "") + ">" +
          '<span class="icone-onglet">' + icone(o.icone, estActif ? "f-primary" : "f-text") + "</span>" +
          o.libelle + "</a>";
      }).join("");
    });
  }

  /* Exécute fn au chargement puis à chaque changement d'état (gratuit / abonné…) */
  function monter(fn) {
    document.addEventListener("DOMContentLoaded", fn);
    document.addEventListener("etat-change", fn);
  }

  document.addEventListener("DOMContentLoaded", () => {
    remplirEntete();
    remplirNavBas();
  });

  return {
    icone, visuelJeu, jeu, tournoi, maintenant, abonne, pseudo, pays, fonction, tournoisDuPays,
    inscription, changerInscription, inscriptionsCloses, etatBouton,
    equipe, changerEquipe, tailleEquipe, reglementAAccepter, accepterReglement, lireScenario,
    jourLong, jourCourt, heure, blocDate, prix,
    badges, libelleFormat, libelleMode, carteTournoi, carteUne, contenusVisibles, ligneContenu, monter
  };
})();
