/* Fonctions communes de la Fan Zone EA FC (écrans f01 à f12) :
   en-tête, logo, drapeaux, avatar et portraits en SVG, pays soutenu, prix des offres, codes gagnés,
   heure de la démo (temps avancé depuis le menu de démo), compte à rebours,
   fenêtre « Quel pays soutiens-tu ? ». Données : js/data-fanzone.js. */

const Fz = (function () {

  /* ---- Icônes (24 × 24) ---- */
  const ICONES = {
    retour: '<path d="M10.6 5.3 12 6.7 7.7 11H20v2H7.7l4.3 4.3-1.4 1.4L3.9 12z"/>',
    plus: '<path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z"/>',
    lecture: '<path d="M8 5.5v13a1 1 0 0 0 1.5.9l10.4-6.5a1 1 0 0 0 0-1.8L9.5 4.6A1 1 0 0 0 8 5.5z"/>',
    cloche: '<path d="M12 3a6 6 0 0 1 6 6v4l2 3v1H4v-1l2-3V9a6 6 0 0 1 6-6zm-2 15h4a2 2 0 0 1-4 0z"/>',
    avatar: '<path d="M12 4a5 5 0 0 1 5 5 5 5 0 0 1-10 0 5 5 0 0 1 5-5zM5 9a7 7 0 0 1 14 0h-2a5 5 0 0 0-10 0zM4 9h3v5H5a1 1 0 0 1-1-1zm13 0h3v4a1 1 0 0 1-1 1h-2zM4 21c0-4 3.6-6 8-6s8 2 8 6z"/>',
    cadeau: '<path d="M4 8h16v4H4zm1 5h6v8H6a1 1 0 0 1-1-1zm8 0h6v7a1 1 0 0 1-1 1h-5zM11 8h2v4h-2zm1-.5C10.5 4 7 3.5 7 5.5S10 7.5 12 7.5zm0 0c1.5-3.5 5-4 5-2s-3 2-5 2z"/>',
    equipes: '<path d="M12 2l8 3v6c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V5zm0 4a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm-4 10h8c0-2-1.8-3.5-4-3.5S8 14 8 16z"/>',
    arbre: '<path d="M2 4h6v2H5v4h3v2H3V6H2zm0 10h6v2H3v-4h2v2zm6-9h4v6h3v2h-3v6H8v-2h2v-4H8v-2h2V7H8zm9 6h5v2h-5z"/>',
    galerie: '<path d="M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm1 2v10l4-4 3 3 4-5 3 4V6zm4 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"/>',
    bundle: '<path d="M7 2h8l4 4v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm1 9v7h8v-7zm2 1.5h4V14h-4zm0 2.5h4v1.5h-4z"/>',
    trophee: '<path d="M7 3h10v2h3v3a4 4 0 0 1-4 4h-.3A5 5 0 0 1 13 14.9V18h3v2H8v-2h3v-3.1A5 5 0 0 1 8.3 12H8a4 4 0 0 1-4-4V5h3zm0 4H6v1a2 2 0 0 0 1 1.7zm10 0v2.7A2 2 0 0 0 18 8V7z"/>',
    copier: '<path d="M8 3h11a1 1 0 0 1 1 1v12h-2V5H8zM5 7h10a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z"/>',
    partager: '<path d="M17 3a3 3 0 1 1-2.8 4l-5.4 2.8a3 3 0 0 1 0 2.4l5.4 2.8A3 3 0 1 1 13.5 17l-5.4-2.8a3 3 0 1 1 0-4.4L13.5 7A3 3 0 0 1 17 3z"/>',
    coche: '<path d="M9.5 16.2 5.3 12l-1.4 1.4 5.6 5.6L20.1 8.4 18.7 7z"/>',
    croix: '<path d="M6.4 5 12 10.6 17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4z"/>',
    photo: '<path d="M9 4h6l1.5 2H20a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3.5zm3 4a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 2a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z"/>',
    oeil: '<path d="M12 5c5 0 9 4.5 10 7-1 2.5-5 7-10 7S3 14.5 2 12c1-2.5 5-7 10-7zm0 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>',
    chevron: '<path d="M9.3 5.3 15.9 12l-6.6 6.7-1.4-1.4 5.2-5.3-5.2-5.3z"/>',
    precedent: '<path d="M14.7 5.3 8.1 12l6.6 6.7 1.4-1.4-5.2-5.3 5.2-5.3z"/>',
    pause: '<path d="M7 5h3v14H7zm7 0h3v14h-3z"/>',
    plein: '<path d="M4 4h6v2H6v4H4zm10 0h6v6h-2V6h-4zM4 14h2v4h4v2H4zm14 0h2v6h-6v-2h4z"/>',
    manette: '<path d="M7 6h10c3 0 4.6 2.3 5 5.6l.5 4.2c.4 3-2.3 4.3-4.3 2.4L15.6 16H8.4l-2.6 2.2c-2 1.9-4.7.6-4.3-2.4l.5-4.2C2.4 8.3 4 6 7 6zm0 3v2H5v2h2v2h2v-2h2v-2H9V9zm9 0a1.2 1.2 0 1 0 0 2.4A1.2 1.2 0 0 0 16 9zm2.5 2.6a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z"/>',
    carte: '<path d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm2 3v2h14V9zm0 5v2h6v-2z"/>',
    etoile: '<path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"/>'
  };
  function icone(nom, classe) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><g class="' + (classe || "f-white") + '">' + ICONES[nom] + "</g></svg>";
  }

  /* Classe de remplissage de chaque couleur de drapeau */
  const REMPLI = { red: "f-fz-red", green: "f-fz-green", yellow: "f-fz-yellow", orange: "f-fz-orange",
    blue: "f-fz-blue", black: "f-fz-black", white: "f-white" };

  /* Points d'une étoile à 5 branches de centre (cx, cy) et de rayon r */
  function etoile(cx, cy, r) {
    const points = [];
    for (let i = 0; i < 10; i++) {
      const angle = -Math.PI / 2 + i * Math.PI / 5;
      const rayon = i % 2 ? r * 0.4 : r;
      points.push((cx + rayon * Math.cos(angle)).toFixed(2) + "," + (cy + rayon * Math.sin(angle)).toFixed(2));
    }
    return points.join(" ");
  }

  /* Bandes verticales ou horizontales d'un drapeau (3 couleurs) */
  function bandes(couleurs, verticales) {
    return couleurs.map((c, i) => verticales
      ? '<rect class="' + REMPLI[c] + '" x="' + i * 10 + '" width="10" height="20"/>'
      : '<rect class="' + REMPLI[c] + '" y="' + (i * 20 / 3).toFixed(2) + '" width="30" height="' + (20 / 3 + 0.1).toFixed(2) + '"/>').join("");
  }

  /* Drapeau simplifié d'un pays, au format 3:2 */
  function drapeau(code) {
    let dessin = "";
    switch (code) {
      case "MA":
        dessin = '<rect class="f-fz-red" width="30" height="20"/>' +
          '<polygon class="s-fz-green" fill="none" stroke-width="1.1" points="' + etoile(15, 10.4, 5) + '"/>';
        break;
      case "TN":
        dessin = '<rect class="f-fz-red" width="30" height="20"/><circle class="f-white" cx="15" cy="10" r="5"/>' +
          '<circle class="f-fz-red" cx="14.4" cy="10" r="3.6"/><circle class="f-white" cx="15.4" cy="10" r="2.9"/>' +
          '<polygon class="f-fz-red" points="' + etoile(16.3, 10, 1.9) + '"/>';
        break;
      case "EG":
        dessin = bandes(["red", "white", "black"], false) + '<rect class="f-gold" x="13.5" y="8" width="3" height="4" rx=".8"/>';
        break;
      case "SN":
        dessin = bandes(["green", "yellow", "red"], true) + '<polygon class="f-fz-green" points="' + etoile(15, 10.3, 3.4) + '"/>';
        break;
      case "CI":
        dessin = bandes(["orange", "white", "green"], true);
        break;
      case "CM":
        dessin = bandes(["green", "red", "yellow"], true) + '<polygon class="f-fz-yellow" points="' + etoile(15, 10.3, 3.4) + '"/>';
        break;
      case "ML":
        dessin = bandes(["green", "yellow", "red"], true);
        break;
      case "CD":
        dessin = '<rect class="f-fz-blue" width="30" height="20"/>' +
          '<path class="f-fz-yellow" d="M0 16.5 25 0h5v3.5L5 20H0z"/><path class="f-fz-red" d="M0 18 27.5 0H30v1.9L2.8 20H0z"/>' +
          '<polygon class="f-fz-yellow" points="' + etoile(5.5, 5, 3.4) + '"/>';
        break;
    }
    return '<svg class="fz-drapeau" viewBox="0 0 30 20" aria-hidden="true">' + dessin + "</svg>";
  }

  /* Avatar e-sport simulé : silhouette stylisée, maillot aux couleurs du pays, casque gaming */
  /* sansFond : sans le fond (portraits des équipes, posés sur un dégradé) */
  function avatar(code, sansFond) {
    const p = pays(code) || pays("MA");
    const c1 = REMPLI[p.couleurs[0]], c2 = REMPLI[p.couleurs[1]];
    return '<svg class="fz-avatar-svg" viewBox="0 0 100 100" aria-hidden="true">' +
      (sansFond ? "" : '<rect class="f-fz-card" width="100" height="100"/>' +
      '<circle class="' + c1 + '" cx="50" cy="50" r="50" opacity=".35"/>') +
      // Maillot e-sport : couleur principale, bande centrale, col blanc, numéro
      '<path class="' + c1 + '" d="M10 100c2-18 17-29 40-29s38 11 40 29z"/>' +
      '<path class="' + c2 + '" d="M43 72h14v28H43z"/>' +
      '<path class="' + c2 + '" d="M16 86c4-6 9-10 15-12l2 26H13zm68 0c-4-6-9-10-15-12l-2 26h20z" opacity=".9"/>' +
      '<rect class="f-skin" x="44" y="56" width="12" height="16" rx="3"/>' +
      '<path class="f-white" d="M42 71l8 8 8-8z"/>' +
      // Tête et cheveux
      '<circle class="f-skin" cx="50" cy="43" r="15"/>' +
      '<path class="f-hair" d="M35 41c0-10 7-17 15-17s15 7 15 17c-4-5-9-7-15-7s-11 2-15 7z"/>' +
      // Casque gaming : arceau, écouteurs à touche néon, micro
      '<path class="f-fz-black" d="M32 45c0-12 8-21 18-21s18 9 18 21h-4c0-10-6-17-14-17s-14 7-14 17z"/>' +
      '<rect class="f-fz-black" x="28" y="38" width="9" height="15" rx="3"/>' +
      '<rect class="f-fz-black" x="63" y="38" width="9" height="15" rx="3"/>' +
      '<rect class="f-fz-neon" x="30" y="42" width="3" height="7" rx="1"/>' +
      '<rect class="f-fz-neon" x="67" y="42" width="3" height="7" rx="1"/>' +
      '<path class="f-fz-black" d="M32 52c0 6 4 10 10 10.5v2.5c-7.5-.5-12.5-5.5-12.5-13z"/>' +
      '<circle class="f-fz-neon" cx="43" cy="63.8" r="1.8"/>' +
      '<text class="f-white" x="50" y="95" text-anchor="middle" font-size="11" font-weight="700">10</text>' +
      "</svg>";
  }

  /* Fond en dégradé aux couleurs d'un pays (photos et vignettes en attente), orange sans pays */
  const VARIABLES = { red: "--fz-flag-red", green: "--fz-flag-green", yellow: "--fz-flag-yellow", orange: "--fz-flag-orange",
    blue: "--fz-flag-blue", black: "--fz-flag-black", white: "--color-on-primary" };
  function degrade(code) {
    const p = pays(code);
    const couleurs = p ? p.couleurs.map((c) => "var(" + VARIABLES[c] + ")") : ["var(--color-primary)", "var(--fz-card)"];
    return "background: linear-gradient(135deg, " + couleurs[0] + ", " + couleurs[1] + ")";
  }

  /* Photo d'une équipe (FANZONE.photos) ; sans photo, portrait dessiné sur un dégradé aux couleurs du pays */
  function portrait(code) {
    const photo = FANZONE.photos[code];
    return '<span class="fz-portrait" style="' + degrade(code) + '">' + avatar(code, true) +
      (photo ? '<img src="' + ressource(photo) + '" alt="" onerror="this.remove()">' : "") + "</span>";
  }

  /* Logo EA SPORTS FC (image fournie, affichée en blanc sur le fond noir) */
  function logo() {
    return '<img class="fz-logo-eafc" src="' + ressource(FANZONE.logo) + '" alt="EA SPORTS FC">';
  }

  /* ---- Pays ---- */
  function pays(code) {
    return FANZONE.pays.find((p) => p.code === code) || null;
  }
  /* Pays soutenu par l'utilisateur (choisi à la première ouverture), ou null */
  function paysSoutenu() {
    return pays(Etat.get("fzPays"));
  }
  /* Article devant le nom du pays : « le Maroc », « la Tunisie », « l'Égypte » */
  function avecArticle(p) {
    const articles = { MA: "le ", TN: "la ", EG: "l'", CI: "la ", SN: "le ", CM: "le ", ML: "le ", CD: "la " };
    return articles[p.code] + p.nom;
  }
  /* Équipes : celle du pays soutenu d'abord, puis les qualifiés, puis les éliminés */
  function equipesOrdonnees() {
    const soutenu = Etat.get("fzPays");
    return FANZONE.pays.slice().sort((x, y) =>
      (y.code === soutenu) - (x.code === soutenu) || (y.statut === "qualifie") - (x.statut === "qualifie"));
  }

  /* ---- Offres : forfaits data et services payants ---- */
  function offre(id) {
    return FANZONE.forfaits.concat(FANZONE.services).find((o) => o.id === id) || null;
  }
  /* Prix d'une offre dans la monnaie du pays soutenu (Maroc par défaut) : « 1 500 FCFA » */
  function prix(o) {
    const monnaie = (paysSoutenu() || pays("MA")).monnaie;
    return o.prix[monnaie].toLocaleString("fr-FR").replace(/\s/g, " ") + " " + monnaie;
  }

  /* ---- Heure de la démo : celle du téléphone, avancée depuis le menu de démo (« Avancer le temps ») ---- */
  function maintenant() {
    const horloge = Etat.get("fzHorloge");
    // Heure remise à zéro (« Nouveau supporter ») : départ de la démo, en attendant la prochaine ouverture d'écran
    if (!horloge) return new Date(FANZONE.debutDemo).getTime();
    return horloge.simule + (Date.now() - horloge.reel);
  }
  /* Place l'heure de la démo à « moment » (millisecondes) ; le temps continue ensuite de s'écouler */
  function reglerHorloge(moment) {
    Etat.set("fzHorloge", { reel: Date.now(), simule: moment });
  }
  // Première visite : la démo commence le 7 décembre à 10h30 (avant tout rendu, pour ne pas redessiner)
  if (!Etat.get("fzHorloge")) reglerHorloge(new Date(FANZONE.debutDemo).getTime());

  /* Saut dans le temps demandé par le menu de démo (js/demo.js), appliqué à l'ouverture de l'écran :
     debut (7 décembre, avant le live), direct (live commencé depuis 1 h), live10 (live dans 10 s),
     jourSuivant (lendemain à 10h30, avec la notification des questions du jour), tirage10 (tirage dans 10 s). */
  const saut = Etat.get("fzSaut");
  if (saut) {
    Etat.set("fzSaut", null);
    const live = new Date(FANZONE.debutLive).getTime();
    if (saut === "debut") { reglerHorloge(new Date(FANZONE.debutDemo).getTime()); Etat.set("fzLive", false); }
    if (saut === "direct") { reglerHorloge(live + 3600000); Etat.set("fzLive", true); }
    if (saut === "live10") { reglerHorloge(live - 10000); Etat.set("fzLive", false); }
    if (saut === "tirage10") { reglerHorloge(new Date(FANZONE.tirage.date).getTime() - 10000); Etat.set("fzLive", true); }
    if (saut === "jourSuivant") {
      const demain = new Date(maintenant() + 86400000);
      demain.setHours(10, 30, 0, 0);
      reglerHorloge(demain.getTime());
      Etat.set("fzLive", demain.getTime() >= live);
      Nav.notificationMaxit({ titre: "La question du jour est en ligne",
        texte: "3 questions, +1 chance au Grand Tirage console. Tu as " + nbChances(chances().total) + ".", lien: "f04-quiz.html" });
    }
    Nav.toast("Démo : " + new Date(maintenant()).toLocaleString("fr-FR", { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }));
  }

  /* Date locale « 2026-12-07 » d'un moment */
  function jourIso(moment) {
    const d = new Date(moment);
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  /* ---- Questions du jour (5 au 11 décembre, 10h) ----
     Renvoie { index, date, ouvert, fini } : index du jour (0 à 6, -1 avant, 7 après), date « 2026-12-07 »,
     ouvert : les questions du jour sont publiées (10h passées). */
  function jourQuestions() {
    const qdj = FANZONE.questionsDuJour;
    const t = maintenant();
    const date = jourIso(t);
    const debut = new Date(qdj.debut + "T00:00:00");
    const index = Math.floor((new Date(date + "T00:00:00") - debut) / 86400000);
    return { index: Math.max(-1, Math.min(index, qdj.jours.length)), date: date,
      ouvert: new Date(t).getHours() >= qdj.heure, fini: index >= qdj.jours.length };
  }
  /* Jeu du jour joué : { tentatives, gagne } */
  function quizDuJour(date) {
    return (Etat.get("fzQuiz") || {})[date] || { tentatives: 0, gagne: false };
  }
  function enregistrerQuiz(date, gagne) {
    const tout = Object.assign({}, Etat.get("fzQuiz") || {});
    const jour = quizDuJour(date);
    tout[date] = { tentatives: jour.tentatives + 1, gagne: jour.gagne || gagne };
    Etat.set("fzQuiz", tout);
  }

  /* ---- Chances au Grand Tirage : questions du jour réussies et Pass Fan achetés (plafonnés) ---- */
  function chances() {
    const quiz = Object.values(Etat.get("fzQuiz") || {}).filter((j) => j.gagne).length;
    const achats = Math.min(Etat.get("fzAchatsPass") || 0, FANZONE.tirage.plafondAchats);
    return { quiz: quiz, achats: achats, total: quiz + achats };
  }
  /* Achat d'un Pass Fan : +1 chance, sauf plafond atteint. Renvoie true si une chance est ajoutée. */
  function ajouterAchatPass() {
    const avant = chances().achats;
    Etat.set("fzAchatsPass", (Etat.get("fzAchatsPass") || 0) + 1);
    return chances().achats > avant;
  }
  /* Le tirage a-t-il commencé ? (13/12 à 18h, heure de Tunis) */
  function tirageEnCours() {
    return maintenant() >= new Date(FANZONE.tirage.date).getTime();
  }
  /* « 4 chances » */
  function nbChances(n) {
    return n + " chance" + (n > 1 ? "s" : "");
  }

  /* ---- État de la page : avant le live ou en direct (menu de démo, ou fin du compte à rebours) ---- */
  function enDirect() {
    return !!Etat.get("fzLive");
  }

  /* ---- Codes EA FC Mobile gagnés ou achetés ---- */
  function codes() {
    return Etat.get("fzCodes") || [];
  }
  /* Ajoute un code fictif (origine : « Quiz du jour » ou « Pass Fan EA FC ») ;
     null si le maximum de codes par utilisateur est atteint. */
  function ajouterCode(origine) {
    const liste = codes();
    if (liste.length >= FANZONE.codesMax) return null;
    const lettres = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const bloc = () => Array.from({ length: 4 }, () => lettres[Math.floor(Math.random() * lettres.length)]).join("");
    const code = { code: "EAFC-" + bloc() + "-" + bloc(), origine: origine, date: jourIso(maintenant()), revele: false };
    Etat.set("fzCodes", liste.concat([code]));
    return code;
  }
  function revelerCode(index) {
    const liste = codes();
    if (!liste[index]) return;
    liste[index].revele = true;
    Etat.set("fzCodes", liste);
  }
  /* Code masqué tant qu'il n'est pas révélé */
  function codeAffiche(c) {
    return c.revele ? c.code : "EAFC-••••-••••";
  }
  /* Lots restants aujourd'hui : diminue à chaque code gagné au quiz */
  function lotsRestants() {
    return FANZONE.lotsDuJour - codes().filter((c) => c.origine === "Quiz du jour").length;
  }

  /* ---- En-tête des écrans secondaires : retour, titre centré ---- */
  function entete(titre, retour) {
    return '<header class="fz-entete">' +
      '<a href="' + retour + '" class="bouton-icone" aria-label="Retour">' + icone("retour") + "</a>" +
      '<h1 class="fz-titre">' + titre + '</h1><span class="fz-entete-espace"></span></header>';
  }

  /* ---- Minuteurs de la page (compte à rebours, carrousel) : arrêtés à chaque nouveau rendu ---- */
  let minuteurs = [];
  function minuteur(fn, delai) {
    minuteurs.push(setInterval(fn, delai));
  }

  /* Affiche l'écran, puis le redessine quand l'état de démo change (menu de démo, codes…) */
  function monter(rendre) {
    const tout = () => {
      minuteurs.forEach(clearInterval);
      minuteurs = [];
      rendre();
    };
    tout();
    document.addEventListener("etat-change", tout);
  }

  /* ---- Compte à rebours jusqu'au début du live (cases data-rebours="jours|heures|min|sec") ---- */
  /* ---- Comptes à rebours : début du live (cases data-rebours) et Grand Tirage (cases data-rebours-tirage) ---- */
  function decompte(cible) {
    const reste = Math.max(0, new Date(cible) - maintenant());
    const s = Math.floor(reste / 1000);
    return { fini: reste === 0, jours: Math.floor(s / 86400), heures: Math.floor(s / 3600) % 24, min: Math.floor(s / 60) % 60, sec: s % 60 };
  }
  /* Live à zéro : la page passe d'elle-même « En direct ». Tirage à zéro : la page se redessine. */
  function compteRebours() {
    const maj = () => {
      const live = decompte(FANZONE.debutLive);
      if (live.fini && !enDirect() && document.querySelector("[data-rebours]")) {
        Etat.set("fzLive", true);
        Nav.toast("Le live commence !");
        return;
      }
      const tirage = decompte(FANZONE.tirage.date);
      if (tirage.fini && document.querySelector("[data-rebours-tirage]")) {
        document.dispatchEvent(new CustomEvent("etat-change", { detail: {} }));
        return;
      }
      document.querySelectorAll("[data-rebours]").forEach((e) => {
        e.textContent = String(live[e.dataset.rebours]).padStart(2, "0");
      });
      document.querySelectorAll("[data-rebours-tirage]").forEach((e) => {
        e.textContent = String(tirage[e.dataset.reboursTirage]).padStart(2, "0");
      });
    };
    maj();
    minuteur(maj, 1000);
  }
  /* Début du live (ou d'un autre moment) à l'heure locale du téléphone : « samedi 12 décembre à 14:00 » */
  function debutLocal(moment) {
    const debut = new Date(moment || FANZONE.debutLive);
    return debut.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }) +
      " à " + debut.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  }

  /* Cases d'un compte à rebours : attribut « data-rebours » (live) ou « data-rebours-tirage » */
  function cases(attribut, classe) {
    return '<div class="fz-rebours' + (classe ? " " + classe : "") + '" role="timer">' +
      [["jours", "jours"], ["heures", "heures"], ["min", "min"], ["sec", "sec"]].map((c) =>
        "<span><b " + attribut + '="' + c[0] + '">00</b><small>' + c[1] + "</small></span>").join("") + "</div>";
  }

  /* Bloc « Mes chances » au Grand Tirage : total, détail par source, compte à rebours jusqu'au tirage.
     lien : le bloc ouvre l'écran du tirage (f13) depuis l'accueil */
  function blocChances(lien) {
    const c = chances();
    const debut = '<' + (lien ? 'a href="f13-tirage.html"' : "section") + ' class="fz-chances" aria-label="Mes chances au Grand Tirage">';
    return debut +
      '<div class="fz-chances-tete"><span class="fz-pastille">' + icone("manette", "f-primary") + "</span>" +
      "<span><small>" + FANZONE.tirage.nom + "</small><strong>Tu as " + nbChances(c.total) + "</strong></span>" +
      (lien ? icone("chevron", "f-primary") : "") + "</div>" +
      '<div class="fz-chances-detail"><span>' + icone("etoile", "f-fz-neon") + "Questions du jour <b>" + c.quiz + "/" + FANZONE.questionsDuJour.jours.length + "</b></span>" +
      "<span>" + icone("bundle", "f-fz-neon") + "Pass Fan <b>" + c.achats + "/" + FANZONE.tirage.plafondAchats + "</b></span></div>" +
      (tirageEnCours()
        ? '<p class="fz-chances-direct"><span class="fz-badge-direct">EN DIRECT</span>Le tirage a lieu maintenant dans l\'émission</p>'
        : "<p class=\"fz-chances-quand\">Tirage en direct le 13 décembre, dans</p>" + cases("data-rebours-tirage", "fz-rebours-petit")) +
      "</" + (lien ? "a" : "section") + ">";
  }

  /* ---- Fenêtre « Quel pays soutiens-tu ? » ---- */
  function choisirPays(apres) {
    const telephone = document.querySelector(".telephone");
    const voile = document.createElement("div");
    voile.className = "voile ouvert";
    voile.innerHTML = '<div class="fz-feuille" role="dialog" aria-modal="true" aria-labelledby="fz-choix-titre">' +
      '<div class="poignee"></div>' +
      '<h2 id="fz-choix-titre">Quel pays soutiens-tu ?</h2>' +
      "<p>Ton équipe sera mise en avant partout dans la Fan Zone.</p>" +
      '<div class="fz-liste-pays">' + FANZONE.pays.map((p) =>
        '<button class="fz-choix-pays" data-choix="' + p.code + '">' + drapeau(p.code) + "<span>" + p.nom + "</span></button>").join("") +
      "</div></div>";
    voile.addEventListener("click", (evenement) => {
      const choix = evenement.target.closest("[data-choix]");
      if (!choix) return;
      voile.remove();
      Etat.set("fzPays", choix.dataset.choix);
      Nav.toast("Tu soutiens " + avecArticle(pays(choix.dataset.choix)) + " !");
      if (apres) apres();
    });
    telephone.appendChild(voile);
  }

  return {
    icone, drapeau, avatar, portrait, logo, degrade, pays, paysSoutenu, avecArticle, equipesOrdonnees, offre, prix, maintenant, enDirect,
    codes, ajouterCode, revelerCode, codeAffiche, lotsRestants,
    reglerHorloge, jourIso, jourQuestions, quizDuJour, enregistrerQuiz, chances, ajouterAchatPass, tirageEnCours, nbChances, blocChances,
    entete, minuteur, monter, compteRebours, cases, debutLocal, choisirPays
  };
})();
