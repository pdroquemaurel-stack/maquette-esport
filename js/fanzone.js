/* Fonctions communes de la Fan Zone EA FC (écrans f01 à f11) :
   en-tête, drapeaux et avatar en SVG, pays soutenu, codes gagnés, compte à rebours,
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
    plein: '<path d="M4 4h6v2H6v4H4zm10 0h6v6h-2V6h-4zM4 14h2v4h4v2H4zm14 0h2v6h-6v-2h4z"/>'
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
  function avatar(code) {
    const p = pays(code) || pays("MA");
    const c1 = REMPLI[p.couleurs[0]], c2 = REMPLI[p.couleurs[1]];
    return '<svg class="fz-avatar-svg" viewBox="0 0 100 100" aria-hidden="true">' +
      '<rect class="f-fz-card" width="100" height="100"/>' +
      '<circle class="' + c1 + '" cx="50" cy="50" r="50" opacity=".35"/>' +
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

  /* ---- Prix du Pass Fan, en monnaie locale (pays soutenu, Maroc par défaut) ---- */
  function prixPass() {
    const p = paysSoutenu() || pays("MA");
    return p.prixPass.toLocaleString("fr-FR").replace(/\s/g, " ") + " " + p.monnaie;
  }

  /* ---- État de la page : avant le live ou en direct (menu de démo) ---- */
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
    const code = { code: "EAFC-" + bloc() + "-" + bloc(), origine: origine, date: new Date().toISOString().slice(0, 10), revele: false };
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
  function decompte() {
    const reste = Math.max(0, new Date(FANZONE.debutLive) - Date.now());
    const s = Math.floor(reste / 1000);
    return { jours: Math.floor(s / 86400), heures: Math.floor(s / 3600) % 24, min: Math.floor(s / 60) % 60, sec: s % 60 };
  }
  function compteRebours() {
    const maj = () => {
      const d = decompte();
      document.querySelectorAll("[data-rebours]").forEach((e) => {
        e.textContent = String(d[e.dataset.rebours]).padStart(2, "0");
      });
    };
    maj();
    minuteur(maj, 1000);
  }
  /* Début du live à l'heure locale du téléphone : « samedi 12 décembre à 14:00 » */
  function debutLocal() {
    const debut = new Date(FANZONE.debutLive);
    return debut.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }) +
      " à " + debut.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
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
    icone, drapeau, avatar, degrade, pays, paysSoutenu, avecArticle, equipesOrdonnees, prixPass, enDirect,
    codes, ajouterCode, revelerCode, codeAffiche, lotsRestants,
    entete, minuteur, monter, compteRebours, debutLocal, choisirPays
  };
})();
