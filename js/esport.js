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
    article: '<path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2v14h14V5zm2 2h10v2H7zm0 4h10v2H7zm0 4h6v2H7z"/>',
    // Lot 7 : preuves, discussion, badges, MaxPoints
    photo: '<path fill-rule="evenodd" d="M9 3h6l1.8 2H20a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3.2zm3 5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 2a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z"/>',
    bulle: '<path d="M5 3h14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2zm0 2v12.6L7.3 16H19V5z"/>',
    envoyer: '<path d="M3 20.5V14l9-2-9-2V3.5L22 12z"/>',
    etoile: '<path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"/>',
    medaille: '<path fill-rule="evenodd" d="M7 2h3.5L12 6l1.5-4H17l-3 7.3a6.5 6.5 0 1 1-4 0zm5 9a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>',
    eclair: '<path d="M13 2 4 14h6l-1 8 9-12h-6z"/>',
    bouclier: '<path d="M12 2l8 3v6c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V5z"/>',
    podium: '<path d="M9 7h6v14H9zM2 12h6v9H2zm14 3h6v6h-6z"/>',
    fanion: '<path d="M5 2h2v20H5zm3 1h11l-2.5 4.5L19 12H8z"/>'
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

  /* Bloc visuel d'un jeu. taille : "petit", "grand", "bandeau" ou rien (tuile).
     Avec une image (DONNEES.jeux[].images) : l'image couvre le bloc sans déformation (object-fit: cover),
     le carré pour les petits formats, le large pour les bandeaux et en-têtes.
     Dessous, le dégradé et le pictogramme restent visibles si l'image ne se charge pas. */
  function visuelJeu(idJeu, taille) {
    const images = (jeu(idJeu) || {}).images;
    const format = taille === "grand" || taille === "bandeau" ? "large" : "carre";
    const image = images && images[format]
      ? '<img class="visuel-image" src="' + ressource(images[format]) + '" alt="" onerror="this.remove()">' : "";
    return '<span class="visuel-jeu jeu-' + idJeu + (taille ? " visuel-" + taille : "") + (image ? " avec-image" : "") + '" aria-hidden="true">' +
      '<span class="visuel-forme"></span>' +
      '<svg viewBox="0 0 24 24">' + PICTOS_JEUX[idJeu] + "</svg>" + image + "</span>";
  }

  /* ---------- Accès aux données ---------- */
  function jeu(id) { return DONNEES.jeux.find((j) => j.id === id); }
  function tournoi(id) { return DONNEES.tournois.find((t) => t.id === id); }
  function maintenant() { return new Date(DONNEES.maintenant); }
  function abonne() { return !!Etat.get("abonne"); }
  function pseudo() {
    // Compte supprimé (démo, 30 jours après la demande) : résultats sous un pseudonyme anonyme (S01-04)
    if (Etat.get("compteSupprime")) return DONNEES.pseudoAnonyme;
    return Etat.get("pseudo") || DONNEES.joueur.pseudo;
  }
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

  /* Durée lisible : 522 → « 8:42 » */
  function duree(secondes) {
    const s = Math.max(0, Math.floor(secondes));
    return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
  }
  function contenu(id) { return DONNEES.contenus.find((c) => c.id === id); }
  /* Le joueur peut-il lire / ouvrir ce contenu en entier ? */
  function contenuAccessible(c) { return c.acces === "tous" || abonne(); }

  /* Contenus visibles : les vidéos disparaissent si la fonction est désactivée dans le pays (S08-02) */
  function contenusVisibles() {
    const videos = fonction("video");
    return DONNEES.contenus.filter((c) => c.type !== "video" || videos);
  }

  /* Ligne de contenu ; joueur gratuit : cadenas et condition d'accès (S10-02, S11-01) */
  function ligneContenu(c) {
    const verrou = c.acces === "abonnes" && !abonne();
    let meta = (c.type === "video" ? "Vidéo · " + duree(c.duree) : "Article · " + c.lecture + " min") + " · " + jeu(c.jeu).nom;
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

  /* ---------- Abonnement (S11-02, S11-04) ----------
     Mémorisé : { offre, echeance, statut } avec statut actif, resilie ou expire.
     L'interrupteur de démo « abonné » reste la référence de l'accès (Etat abonne). */
  const DUREES_OFFRES = { quotidienne: 1, hebdomadaire: 7, mensuelle: 30 };
  function offre(id) { return DONNEES.offres[DONNEES.joueur.pays].find((o) => o.id === id); }
  /* « abonnement mensuel » : l'identifiant d'offre (mensuelle…) accordé avec « abonnement » */
  const ADJECTIFS = { quotidienne: "quotidien", hebdomadaire: "hebdomadaire", mensuelle: "mensuel" };
  function nomOffre(id) { return "abonnement " + (ADJECTIFS[id] || id); }

  /* État de l'abonnement : actif, resilie, expire ou aucun */
  function etatAbonnement() {
    const memo = Etat.get("abonnement") || {};
    const base = Object.assign({}, DONNEES.joueur.abonnement, memo);
    if (!abonne()) return Object.assign(base, { statut: memo.statut === "expire" ? "expire" : "aucun" });
    return Object.assign(base, { statut: memo.statut === "resilie" ? "resilie" : "actif" });
  }

  /* Paiement confirmé : l'abonnement démarre, l'accès s'ouvre aussitôt (S11-03) */
  function souscrire(idOffre) {
    const o = offre(idOffre);
    const jours = DUREES_OFFRES[idOffre] + (o.essai ? parseInt(o.essai, 10) : 0);
    const echeance = new Date(maintenant().getTime() + jours * 86400000).toISOString().slice(0, 10);
    Etat.set("abonnement", { offre: idOffre, echeance, statut: "actif" });
    Etat.set("abonne", true);
    notifier({ famille: "abonnement", ecran: "24", titre: "Abonnement activé",
      texte: "Ton " + nomOffre(idOffre) + " est actif jusqu'au " + jourCourt(echeance) + ". Tous les contenus réservés sont ouverts." });
  }
  /* Mettre fin : l'accès reste ouvert jusqu'à l'échéance (S11-04) */
  function resilier() {
    const a = etatAbonnement();
    Etat.set("abonnement", Object.assign({}, a, { statut: "resilie" }));
    notifier({ famille: "abonnement", ecran: "24", titre: "Abonnement résilié",
      texte: "Il ne sera pas reconduit. Ton accès reste ouvert jusqu'au " + jourCourt(a.echeance) + "." });
  }
  /* Expiration (fin de période ou échec de reconduction) : retour au niveau gratuit, historique conservé */
  function expirer() {
    Etat.set("abonnement", Object.assign({}, etatAbonnement(), { statut: "expire", echeance: "2026-10-08" }));
    Etat.set("abonne", false);
  }

  /* ---------- Notifications (S12-01) ---------- */

  /* Famille désactivée par le joueur ? (« match-en-cours » ne l'est jamais) */
  function familleActive(id) {
    const famille = DONNEES.famillesNotif.find((f) => f.id === id);
    if (famille && famille.verrouillee) return true;
    return !(Etat.get("prefsNotif") || {})[id];
  }
  /* Toutes les notifications (départ + démo), de la plus récente à la plus ancienne */
  function notifications() {
    const lues = Etat.get("notifsLues") || {};
    return DONNEES.notifications.concat(Etat.get("notifsAjoutees") || [])
      .map((n) => Object.assign({}, n, { lue: n.lue || !!lues[n.id] }))
      .sort((a, b) => b.date.localeCompare(a.date));
  }
  function notificationsVisibles() { return notifications().filter((n) => familleActive(n.famille)); }
  function nonLues() { return notificationsVisibles().filter((n) => !n.lue).length; }
  function marquerLue(id) {
    const lues = Object.assign({}, Etat.get("notifsLues") || {});
    lues[id] = true;
    Etat.set("notifsLues", lues);
  }
  function toutMarquerLu() {
    const lues = Object.assign({}, Etat.get("notifsLues") || {});
    notifications().forEach((n) => { lues[n.id] = true; });
    Etat.set("notifsLues", lues);
  }
  /* Nouvelle notification née d'une action de la démo (inscription, paiement, résultat…) */
  function notifier(n) {
    const liste = (Etat.get("notifsAjoutees") || []).slice();
    const h = horloge();
    const date = h.getFullYear() + "-" + String(h.getMonth() + 1).padStart(2, "0") + "-" + String(h.getDate()).padStart(2, "0") + "T" + hhmm(h) + ":" + String(h.getSeconds()).padStart(2, "0");
    liste.push(Object.assign({ id: "d" + Date.now() + liste.length, date, lue: false }, n));
    Etat.set("notifsAjoutees", liste);
  }

  /* Compteur de non-lues sur toutes les cloches de l'écran (data-ecran="25") */
  function majCloches() {
    const n = nonLues();
    document.querySelectorAll('[data-ecran="25"]').forEach((cloche) => {
      let pastille = cloche.querySelector(".pastille");
      if (!pastille) {
        pastille = document.createElement("span");
        pastille.className = "pastille";
        cloche.appendChild(pastille);
      }
      pastille.textContent = n > 9 ? "9+" : n;
      pastille.hidden = n === 0;
      cloche.setAttribute("aria-label", "Notifications" + (n ? ", " + n + " non lues" : ""));
    });
  }

  /* ---------- Identifiants de jeu du joueur (modifiables dans 23) ---------- */
  function gamertags() { return Object.assign({}, DONNEES.joueur.gamertags, Etat.get("gamertags") || {}); }

  /* ---------- Horloge accélérée (écrans 11, 14, 15) ----------
     Dans la salle de match, le temps défile 30 fois plus vite : 1 s = 30 s.
     Ailleurs, tant que l'horloge n'est pas lancée, l'heure reste celle de data.js. */
  const VITESSE = 30;
  function horloge() {
    const h = Etat.get("horloge");
    if (!h) return maintenant();
    return new Date(new Date(h.simule).getTime() + (Date.now() - h.reel) * VITESSE);
  }
  function regleHorloge(isoSimule) { Etat.set("horloge", { reel: Date.now(), simule: isoSimule }); }
  function demarrerHorloge() { if (!Etat.get("horloge")) regleHorloge(DONNEES.maintenant); }
  /* Date située « minutes » après une heure ISO */
  function plus(iso, minutes) { return new Date(new Date(iso).getTime() + minutes * 60000); }
  /* « 21:30 » */
  function hhmm(d) { return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0"); }
  /* Compte à rebours « 12:05 » (minutes:secondes simulées) jusqu'à une date */
  function rebours(cible) {
    const s = Math.max(0, Math.floor((cible - horloge()) / 1000));
    return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
  }

  /* ---------- Mon match (lot 4) ----------
     monMatch mémorise : presenceMoi (heure), issue (demarre, forfait-adverse, mon-forfait, double-absence),
     declMoi / declAdv ({ moi, adv } : mon score, celui de l'adversaire), statut (attente-adv, clos,
     litige, retenu-adverse, definitif), litige ({ ouverture, pieces, envoye, decision }). */
  function monMatch() { return Object.assign({}, Etat.get("monMatch") || {}); }
  function majMonMatch(changements) { Etat.set("monMatch", Object.assign(monMatch(), changements)); }
  function cleMonMatch() { const c = DONNEES.monMatch; return c.tournoi + "-" + c.tour + "-" + c.match; }

  /* États de démo (14, 15) : match démarré à 21:23, sans résultat, horloge réglée sur « heure » */
  function preparerMatchDemo(supplement, heure) {
    const resultats = Object.assign({}, resultatsMatchs());
    delete resultats[cleMonMatch()];
    Etat.set("matchs", resultats);
    Etat.set("monMatch", Object.assign({
      presenceMoi: "21:21", adversaireVu: true, rappelVu: true,
      issue: "demarre", demarrage: "21:23", demarrageIso: "2026-10-09T21:23"
    }, supplement));
    regleHorloge(heure);
  }

  /* Fin prévue du match et limite de déclaration (30 min après la fin prévue, S07-01) */
  function finPrevue() { return plus(monMatch().demarrageIso, DONNEES.monMatch.duree); }
  function limiteDeclaration() { return new Date(finPrevue().getTime() + DONNEES.monMatch.delaiDeclaration * 60000); }

  /* Résultats ajoutés à l'arbre : { a, b, vainqueur, mention } par « tournoi-tour-match » */
  function resultatsMatchs() { return Etat.get("matchs") || {}; }
  function enregistrerResultat(cle, resultat) {
    const copie = Object.assign({}, resultatsMatchs());
    copie[cle] = resultat;
    Etat.set("matchs", copie);
  }
  /* Résultat de mon match : mes scores (moi, adv) convertis dans l'ordre de l'arbre */
  function enregistrerMonResultat(scoreMoi, scoreAdv, mention, vainqueurForce) {
    const c = DONNEES.monMatch;
    const moiEnA = DONNEES.arbres[c.tournoi].matchs[c.tour][c.match][0] === DONNEES.joueur.pseudo;
    const gagnant = vainqueurForce !== undefined ? vainqueurForce
      : scoreMoi === scoreAdv ? null : scoreMoi > scoreAdv ? DONNEES.joueur.pseudo : c.adversaire;
    enregistrerResultat(cleMonMatch(), {
      a: moiEnA ? scoreMoi : scoreAdv, b: moiEnA ? scoreAdv : scoreMoi, vainqueur: gagnant, mention: mention || null
    });
  }

  /* ---------- Arbre à élimination ----------
     Match : [joueur A, joueur B, score A, score B, vainqueur (égalité, forfait), état, mention]. */
  /* Match sans vainqueur où les deux joueurs sont éliminés :
     double absence (S06-03) ou aucune déclaration dans le délai (S07-02, décision du 2026-10-07) */
  const DOUBLES_ELIMINATIONS = ["Double absence", "Aucune déclaration"];
  function doubleElimination(m) { return DOUBLES_ELIMINATIONS.includes(m[6]); }

  function vainqueur(m) {
    if (doubleElimination(m)) return null;
    if (m[4] && (m[2] === null || m[3] === null || m[2] === m[3])) return m[4];
    if (!m[0] || !m[1] || m[2] === null || m[3] === null || m[2] === m[3]) return null;
    return m[2] > m[3] ? m[0] : m[1];
  }

  /* Les vainqueurs d'un tour remplissent le tour suivant, sans action humaine (S06-01).
     Après une double élimination, l'adversaire prévu au tour suivant est qualifié d'office (S06-03). */
  function propager(a) {
    for (let r = 1; r < a.matchs.length; r++) {
      a.matchs[r].forEach((m, i) => {
        const gauche = a.matchs[r - 1][i * 2];
        const droite = a.matchs[r - 1][i * 2 + 1];
        m[0] = vainqueur(gauche);
        m[1] = vainqueur(droite);
        if (m[2] === null && m[3] === null) {
          if (doubleElimination(gauche) && m[1]) { m[4] = m[1]; m[6] = "Qualifié d'office"; }
          else if (doubleElimination(droite) && m[0]) { m[4] = m[0]; m[6] = "Qualifié d'office"; }
        }
      });
    }
    return a;
  }

  /* Arbre d'un tournoi avec les résultats ajoutés pendant la démo */
  function arbre(idTournoi) {
    if (!DONNEES.arbres[idTournoi]) return null;
    const copie = JSON.parse(JSON.stringify(DONNEES.arbres[idTournoi]));
    copie.matchs.forEach((tour) => tour.forEach((m) => { while (m.length < 7) m.push(null); }));
    const resultats = resultatsMatchs();
    Object.keys(resultats).forEach((cle) => {
      const [id, r, i] = cle.split("-");
      if (id !== idTournoi) return;
      const m = copie.matchs[Number(r)][Number(i)];
      const v = resultats[cle];
      m[2] = v.a; m[3] = v.b; m[4] = v.vainqueur; m[5] = null; m[6] = v.mention;
    });
    return propager(copie);
  }

  /* Le tournoi a-t-il été recalculé après un arbitrage ? (S05-04) */
  function recalculeApresArbitrage(idTournoi) {
    return Object.keys(resultatsMatchs()).some((cle) => cle.startsWith(idTournoi + "-") && resultatsMatchs()[cle].mention === "Arbitrage");
  }

  /* Où en est mon prochain match ? etape : a-venir, en-cours, litige, qualifie, elimine */
  function prochainMatch() {
    const c = DONNEES.monMatch;
    const t = tournoi(c.tournoi);
    const ins = inscription(t.id);
    if (!ins || ins.etat !== "inscrit" || t.etat !== "en-cours") return null;
    const a = arbre(t.id);
    const moi = DONNEES.joueur.pseudo;
    const resultat = resultatsMatchs()[cleMonMatch()];
    const mm = monMatch();
    const base = { t, tour: a.tours[c.tour], adversaire: c.adversaire, heure: hhmm(new Date(c.debut)) };
    if (!resultat) {
      const etape = mm.statut === "litige" ? "litige" : mm.issue === "demarre" ? "en-cours" : "a-venir";
      return Object.assign(base, { etape });
    }
    if (resultat.vainqueur !== moi) return Object.assign(base, { etape: "elimine" });
    // Qualifié : match du tour suivant, adversaire connu ou non
    for (let r = c.tour + 1; r < a.matchs.length; r++) {
      const m = a.matchs[r].find((x) => x[0] === moi || x[1] === moi);
      if (m && !vainqueur(m)) return Object.assign(base, { etape: "qualifie", tour: a.tours[r], adversaire: m[0] === moi ? m[1] : m[0] });
    }
    return Object.assign(base, { etape: "qualifie", tour: a.tours[c.tour + 1], adversaire: null });
  }

  /* Carte sombre « prochain match » (accueil 03 et Mes matchs 05) */
  function carteProchainMatch(p) {
    const moi = pseudo();
    const duel = (adversaire) =>
      '<div class="duel"><span class="joueur"><span class="avatar avatar-moi">' + moi[0] + "</span>" + moi + "</span>" +
      '<span class="vs">VS</span>' +
      (adversaire
        ? '<a href="#" class="joueur" data-ecran="17" data-pseudo="' + adversaire + '"><span class="avatar">' + adversaire[0] + "</span>" + adversaire + "</a>"
        : '<span class="joueur"><span class="avatar">?</span>Bientôt connu</span>') + "</div>";
    const arbreLien = '<a href="#" class="bouton bouton-verre" data-ecran="12" data-id="' + p.t.id + '">Voir l\'arbre</a>';
    const carte = (surtitre, titre, corps, actions) =>
      '<div class="carte-match"><span class="flamme"></span><p class="surtitre">' + surtitre + "</p><h2>" + titre + "</h2>" +
      corps + '<div class="actions">' + actions + "</div></div>";

    switch (p.etape) {
      case "a-venir": {
        const minutes = Math.round((new Date(DONNEES.monMatch.debut) - horloge()) / 60000);
        return carte("Ton prochain match", p.tour + " · " + p.t.nom, duel(p.adversaire) +
          '<p class="quand">Aujourd\'hui à ' + p.heure + (minutes > 0 ? " · <b>dans " + minutes + " min</b>" : " · <b>maintenant</b>") + "</p>",
          '<a href="#" class="bouton bouton-primaire" data-ecran="11">Salle de match</a>' + arbreLien);
      }
      case "en-cours":
        return carte("Match en cours", p.tour + " · " + p.t.nom, duel(p.adversaire) +
          '<p class="quand">Déclare le score dès la fin du match</p>',
          '<a href="#" class="bouton bouton-primaire" data-ecran="14">Déclarer le résultat</a>' + arbreLien);
      case "litige":
        return carte("Litige en cours", p.tour + " · " + p.t.nom, duel(p.adversaire) +
          '<p class="quand">Vos déclarations divergent : le responsable local tranche</p>',
          '<a href="#" class="bouton bouton-primaire" data-ecran="15">Voir le litige</a>' + arbreLien);
      case "qualifie":
        return carte("Qualifié !", p.tour + " · " + p.t.nom, duel(p.adversaire) +
          '<p class="quand">Horaire communiqué à la convocation</p>', arbreLien);
      default:
        return carte("Fin du tournoi pour toi", "Éliminé en " + p.tour.toLowerCase() + " · " + p.t.nom, "",
          '<a href="#" class="bouton bouton-primaire" data-ecran="04">Trouver un tournoi</a>' +
          '<a href="#" class="bouton bouton-verre" data-ecran="12" data-id="' + p.t.id + '">Classement</a>');
    }
  }

  /* ---------- Captures d'écran jointes (déclaration 14, litige 15) ----------
     La photo choisie est réduite en vignette (320 px) pour être mémorisée entre les pages ;
     rien n'est envoyé, elle reste sur l'appareil. Renvoie une promesse : { url, nom }. */
  function vignette(fichier) {
    return new Promise((resolu) => {
      const lecteur = new FileReader();
      lecteur.onload = () => {
        const image = new Image();
        image.onload = () => {
          const echelle = Math.min(1, 320 / Math.max(image.width, image.height));
          const toile = document.createElement("canvas");
          toile.width = Math.round(image.width * echelle);
          toile.height = Math.round(image.height * echelle);
          toile.getContext("2d").drawImage(image, 0, 0, toile.width, toile.height);
          resolu({ url: toile.toDataURL("image/jpeg", 0.7), nom: fichier.name });
        };
        // Fichier illisible comme image : on garde seulement son nom
        image.onerror = () => resolu({ url: "", nom: fichier.name });
        image.src = lecteur.result;
      };
      lecteur.readAsDataURL(fichier);
    });
  }

  /* Grille de captures (3 au plus) avec la case « Ajouter » liée au champ de fichiers idChamp */
  function grilleCaptures(captures, max, idChamp) {
    return '<div class="captures">' + captures.map((cap, i) =>
      '<div class="capture">' + (cap.url ? '<img src="' + cap.url + '" alt="Capture ' + (i + 1) + '">' : "") +
      '<button class="retirer" data-retirer="' + i + '" aria-label="Retirer la capture">×</button></div>'
    ).join("") +
      (captures.length < max
        ? '<label class="ajout" for="' + idChamp + '" tabindex="0">' + icone("photo", "f-muted") + "Ajouter une capture</label>"
        : "") + "</div>";
  }

  /* « 1er », « 2e », « 117e » */
  function rangTexte(n) { return n === 1 ? "1er" : n + "e"; }

  /* ---------- Statistiques et badges d'un joueur (17, 23) ---------- */

  /* Nombre stable tiré d'un pseudo (chiffres crédibles pour un joueur absent des données) */
  function empreinte(texte) {
    let h = 7;
    for (const c of texte) h = (h * 31 + c.charCodeAt(0)) % 100003;
    return h;
  }

  /* Statistiques d'un joueur : matchs, gagnes, meilleurePlace, meilleurTournoi, serieRecord, sansForfait, jeux, obtenus.
     pseudoDonnees : pseudo dans les données (le mien est celui de data.js, même après un changement de pseudo). */
  function statsJoueur(pseudoDonnees) {
    if (pseudoDonnees === DONNEES.joueur.pseudo) {
      const base = DONNEES.joueur.stats;
      // Historique repris de l'ancienne plateforme, sauf refus du joueur (S01-05)
      const repris = Etat.get("historiqueNonRepris") ? null : DONNEES.joueur.historiqueRepris;
      const s = Object.assign({}, base, { obtenus: Object.assign({}, base.obtenus) });
      if (repris) {
        s.matchs += repris.matchs;
        s.gagnes += repris.gagnes;
        s.obtenus.veteran = "2026-08-10";
      }
      // Mon quart de finale, une fois son résultat connu
      const r = resultatsMatchs()[cleMonMatch()];
      if (r && !DOUBLES_ELIMINATIONS.includes(r.mention)) {
        s.matchs++;
        if (r.vainqueur === DONNEES.joueur.pseudo) { s.gagnes++; s.sansForfait++; }
        else s.sansForfait = r.mention === "Forfait" ? 0 : s.sansForfait + 1;
      }
      return s;
    }
    if (DONNEES.statsJoueurs[pseudoDonnees]) return DONNEES.statsJoueurs[pseudoDonnees];
    const h = empreinte(pseudoDonnees);
    const matchs = 6 + (h % 34);
    return {
      matchs, gagnes: Math.round(matchs * (0.3 + (h % 45) / 100)),
      meilleurePlace: [1, 2, 3, 4, 6, 8, 12, 16][h % 8], meilleurTournoi: null,
      serieRecord: 1 + (h % 6), sansForfait: h % 14, jeux: 1 + (h % 3),
      obtenus: Object.assign({ "premier-tournoi": "2026-0" + (5 + (h % 4)) + "-1" + (h % 9) }, h % 3 ? {} : { equipe: "2026-09-12" })
    };
  }

  /* Ratio de victoires en pourcentage entier */
  function ratioVictoires(s) { return s.matchs ? Math.round((100 * s.gagnes) / s.matchs) : 0; }

  /* Collection de badges d'un joueur : [{ badge, obtenu, date, progres: [valeur, objectif] }], obtenus d'abord */
  function badgesJoueur(s) {
    const liste = DONNEES.badges.map((b) => {
      let obtenu = false;
      let progres = null;
      if (b.compteur) {
        obtenu = s[b.compteur] >= b.objectif;
        progres = [Math.min(s[b.compteur], b.objectif), b.objectif];
      } else if (b.place) {
        obtenu = !!s.meilleurePlace && s.meilleurePlace <= b.place;
      } else {
        obtenu = !!s.obtenus[b.id];
      }
      return { badge: b, obtenu, date: s.obtenus[b.id] || null, progres };
    });
    return liste.filter((x) => x.obtenu).concat(liste.filter((x) => !x.obtenu));
  }

  /* Pastille d'un badge (bouton : le détail s'ouvre au toucher, voir ouvrirBadge) */
  function medaille(x) {
    const p = !x.obtenu && x.progres ? '<span class="progres" aria-hidden="true"><i style="width:' + Math.round((100 * x.progres[0]) / x.progres[1]) + '%"></i></span>' : "";
    return '<button class="medaille' + (x.obtenu ? "" : " verrouillee") + '" data-badge="' + x.badge.id + '">' +
      '<span class="medaille-icone">' + icone(x.badge.icone, x.obtenu ? "f-white" : "f-muted") +
      (x.obtenu ? "" : '<span class="cadenas-mini">' + icone("cadenas", "f-muted") + "</span>") + "</span>" +
      x.badge.nom + p + "</button>";
  }

  /* Détail d'un badge : condition d'obtention, date ou progression */
  function ouvrirBadge(x) {
    const etat = x.obtenu
      ? (x.date ? "Obtenu le " + jourCourt(x.date) + "." : "Obtenu.")
      : x.progres ? "Progression : " + x.progres[0] + " sur " + x.progres[1] + "." : "Pas encore obtenu.";
    Nav.dialogue({
      icone: icone(x.badge.icone, x.obtenu ? "f-primary" : "f-muted"),
      titre: x.badge.nom,
      texte: x.badge.description + " " + etat,
      boutons: [{ libelle: "Fermer", primaire: true }]
    });
  }

  /* ---------- MaxPoints et classement mensuel (E15, lot 7) ---------- */

  /* Mes crédits de MaxPoints, du plus récent au plus ancien (S15-01) */
  function historiquePoints() {
    return (Etat.get("maxpointsCredites") || []).concat(DONNEES.maxpoints.historique)
      .slice().sort((a, b) => b.date.localeCompare(a.date));
  }
  function pointsDuMois(idMois) {
    return historiquePoints().filter((h) => h.date.startsWith(idMois)).reduce((total, h) => total + h.points, 0);
  }
  function moisPoints(id) { return DONNEES.maxpoints.mois.find((m) => m.id === id) || DONNEES.maxpoints.mois[0]; }

  /* Joueurs du Maroc du mois en cours, générés : vedettes, pseudos connus, puis combinaisons de pseudos.
     Environ un joueur sur deux est gratuit. Points décroissants ; les 4e et 5e sont à égalité. */
  function joueursDuMois() {
    const mp = DONNEES.maxpoints;
    const noms = new Set(mp.vedettes.concat(DONNEES.pseudosClassement));
    mp.suffixes.forEach((s) => mp.bases.forEach((b) => noms.add(b + s)));
    noms.delete(DONNEES.joueur.pseudo);
    return [...noms].map((pseudo, i) => {
      const r = i + 1;
      return {
        pseudo,
        points: Math.round(1300 * Math.exp(-r / 55)) + (150 - r),
        gratuit: i % 2 === 1,
        // Heure à laquelle le total a été atteint : départage des égalités (S15-02)
        atteint: "2026-10-0" + (1 + (i % 8)) + "T2" + (i % 4) + ":" + String((i * 7) % 60).padStart(2, "0")
      };
    }).map((j, i, liste) => (i === 4 ? Object.assign({}, j, { points: liste[3].points, atteint: "2026-10-08T22:14" }) : j))
      .map((j, i) => (i === 3 ? Object.assign({}, j, { atteint: "2026-10-07T21:02" }) : j));
  }

  /* Classement d'un mois. type : "tous" ou "gratuits".
     Renvoie { lignes: [{ rang, pseudo, points, moi, atteint, egalite }], moi: ma ligne ou null, total } */
  function classementMensuel(type, idMois) {
    const m = moisPoints(idMois);
    const monPseudo = pseudo();
    // Un joueur abonné ne figure pas dans le classement des joueurs gratuits (S15-03)
    const jeFigure = type === "tous" || !abonne();
    if (!m.enCours) {
      // Mois clôturé : les 10 premiers et ma place finale
      const lignes = m[type].map((x, i) => ({ rang: i + 1, pseudo: x[0] || monPseudo, points: x[1], moi: !x[0] }));
      const place = type === "tous" ? m.maPlaceTous : m.maPlaceGratuits;
      const moi = place ? lignes.find((l) => l.moi) || { rang: place, pseudo: monPseudo, points: pointsDuMois(m.id), moi: true } : null;
      return { lignes, moi, total: null };
    }
    let joueurs = joueursDuMois().filter((j) => type === "tous" || j.gratuit);
    if (jeFigure) joueurs.push({ pseudo: monPseudo, points: pointsDuMois(m.id), moi: true, atteint: "2026-10-06T22:30" });
    // Plus de points d'abord ; à égalité, le premier à atteindre le total passe devant (S15-02)
    joueurs.sort((a, b) => b.points - a.points || a.atteint.localeCompare(b.atteint));
    const lignes = joueurs.map((j, i) => Object.assign({ rang: i + 1 }, j, {
      egalite: joueurs.some((k) => k !== j && k.points === j.points)
    }));
    return { lignes, moi: lignes.find((l) => l.moi) || null, total: lignes.length };
  }

  /* Jours restants avant la clôture du mois (minuit, heure du pays) : du 9 au 31 octobre, 22 jours */
  function joursRestants(idMois) {
    const fin = date(moisPoints(idMois).fin);
    const aujourdhui = date(DONNEES.maintenant.slice(0, 10));
    return Math.max(0, Math.round((fin - aujourdhui) / 86400000));
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
        '<button class="bouton-icone" data-ecran="25" aria-label="Notifications">' + icone("cloche") + "</button>";
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
    // Après les rendus des pages (qui créent parfois leur cloche)
    setTimeout(majCloches, 0);
  });
  document.addEventListener("etat-change", () => setTimeout(majCloches, 0));

  return {
    icone, visuelJeu, jeu, tournoi, maintenant, abonne, pseudo, pays, fonction, tournoisDuPays,
    inscription, changerInscription, inscriptionsCloses, etatBouton,
    equipe, changerEquipe, tailleEquipe, reglementAAccepter, accepterReglement, lireScenario,
    jourLong, jourCourt, heure, blocDate, prix,
    badges, libelleFormat, libelleMode, carteTournoi, carteUne, contenusVisibles, ligneContenu, monter,
    duree, contenu, contenuAccessible, offre, nomOffre, etatAbonnement,
    familleActive, notifications, notificationsVisibles, nonLues, marquerLue, toutMarquerLu, notifier, majCloches, souscrire, resilier, expirer, gamertags,
    horloge, regleHorloge, demarrerHorloge, plus, hhmm, rebours,
    monMatch, majMonMatch, cleMonMatch, preparerMatchDemo, finPrevue, limiteDeclaration, resultatsMatchs, enregistrerResultat, enregistrerMonResultat,
    vainqueur, doubleElimination, propager, arbre, recalculeApresArbitrage, prochainMatch, carteProchainMatch,
    vignette, grilleCaptures, rangTexte, statsJoueur, ratioVictoires, badgesJoueur, medaille, ouvrirBadge,
    historiquePoints, pointsDuMois, moisPoints, classementMensuel, joursRestants
  };
})();
