/* Fiche d'un jeu de Max it Gaming Play (E07), commune à deux écrans :
   - p03-jeu.html : fiche du parcours MVP ;
   - pv3-fiche-badges.html : la même fiche en V2, avec les badges (S07-03) et les pseudos qui ouvrent le profil.
   Feuille posée sur l'accueil, d'après reference/figma-play/04-fiche-jeu.png et 05-fiche-jeu-suite.png.
   La page fournit : .fond-fiche#fond, .poignee-play#poignee, main#page et le bouton a#jouer. */

const Fiche = (function () {
  let jeu = null;
  let depuis = "p01-accueil.html";
  let periode = "semaine";      // onglet affiché dans le bloc « Classements »
  let lectureEnCours = null;    // minuteur de la vidéo simulée
  let enV2 = false;

  /* Adresse de cette fiche (pour revenir après une partie, un avis, un classement) */
  function adresseFiche() {
    return enV2 ? Play.url("pv3-fiche-badges.html", { jeu: jeu.id }) : Play.url("p03-jeu.html", { jeu: jeu.id, depuis: depuis });
  }

  function rendre() {
    if (!jeu) return;
    arreterVideo();
    // Jeu devenu indisponible pendant la démo : il n'a plus de fiche (S08-03)
    if (!Play.disponible(jeu)) return ouvrirPage("p01-accueil.html?indispo=1");

    const t = Play.t;
    document.title = jeu.nom;
    const partenaire = Play.partenaire(jeu);
    const favori = Play.estFavori(jeu.id);
    const couleurGenre = "var(--play-g-" + jeu.genre + "-soft)";

    // Accueil assombri derrière la feuille, et fermeture
    const une = Play.aLaUne() || jeu;
    const autre = Play.parPopularite(Play.catalogue()).find((j) => j.id !== une.id) || jeu;
    const fond = document.getElementById("fond");
    fond.innerHTML = '<span class="fond-cartes"><span>' + Play.visuel(une, 230, 300, "carte") +
      "</span><span>" + Play.visuel(autre, 230, 300, "carte") + "</span></span>";
    fond.href = depuis;
    fond.setAttribute("aria-label", t("fiche.fermer"));
    const poignee = document.getElementById("poignee");
    poignee.href = depuis;
    poignee.setAttribute("aria-label", t("fiche.fermer"));

    // « Jouer » ouvre toujours le jeu directement, mini app comme hub (S08-01)
    const jouer = document.getElementById("jouer");
    jouer.innerHTML = Play.icone("manette", "f-play-on-accent") + t("fiche.jouer");
    jouer.href = Play.url("p05-partie.html", enV2 ? { jeu: jeu.id, retour: "v2" } : { jeu: jeu.id, depuis: depuis });

    let html = "";
    if (enV2) html += '<p class="sous-titre-play" style="padding: 0 0 var(--space-3)">' + Play.etiquetteV2() + " " + t("commun.v2Aide") + "</p>";

    // Vidéo (lancée seulement à la demande) ou visuel du jeu (S07-02)
    html += '<div class="media-fiche" id="media">' + Play.visuel(jeu, 358, 300, "capture-1") +
      (jeu.video
        ? '<button class="bouton-lecture" id="lecture"><span class="rond">' + Play.icone("lecture", "f-play-text") + "</span>" + t("fiche.video") + "</button>"
        : "") +
      "</div>";

    // En-tête : genre, nom, favori, partage, partenaire, note (S07-01)
    html += '<span class="puce-genre" style="--gs: ' + couleurGenre + '">' + Play.pastilleGenre(jeu.genre) + Play.nomGenre(jeu.genre) + "</span>";
    html += '<div class="titre-fiche"><h1>' + jeu.nom + "</h1>" +
      '<button class="bouton-rond-play" id="favori" aria-pressed="' + favori + '" aria-label="' + t(favori ? "fiche.favoriRetirer" : "fiche.favoriAjouter") + '">' +
      Play.icone(favori ? "coeurPlein" : "coeur", favori ? "f-primary" : "f-play-text") + "</button>" +
      '<button class="bouton-rond-play" id="partager" aria-label="' + t("fiche.partager") + '">' + Play.icone("partager") + "</button></div>";
    // « Fourni par » seulement si la mention est activée pour le partenaire (S01-01)
    if (partenaire.mention) html += '<p class="fourni-par">' + t("fiche.fourniPar", { nom: partenaire.nom }) + "</p>";
    const moyenne = Play.moyenne(jeu);
    html += '<button class="note-fiche" id="vers-avis">' + Play.etoiles(moyenne.note, 16) + "<b>" + Play.note(jeu) + "</b> · " + t("commun.avis", { n: moyenne.nombre }) + "</button>";

    // Badges (V2, S07-03) : Gratuit toujours, Sans pub selon la fiche, Sans consommation de data selon le pays
    if (enV2 || Play.v2()) {
      html += '<div class="badges-play">' +
        '<span class="badge-play">' + Play.icone("gratuit", "f-play-free") + t("fiche.badgeGratuit") + "</span>" +
        (jeu.sansPub ? '<span class="badge-play">' + Play.icone("sansPub", "f-play-free") + t("fiche.badgeSansPub") + "</span>" : "") +
        (Play.infosPays().sansData.includes(jeu.id) ? '<span class="badge-play">' + Play.icone("data", "f-play-free") + t("fiche.badgeData") + "</span>" : "") +
        Play.etiquetteV2() + "</div>";
    }

    // Description et informations (S07-02) ; la description est saisie en français dans la démo
    html += '<hr class="separateur-play">';
    html += '<div lang="fr" dir="ltr"><h2 class="accroche-play">' + jeu.accroche + '</h2><p class="description-play">' + jeu.description + "</p></div>";
    html += '<dl class="infos-jeu">' +
      "<div><dt>" + t("fiche.langues") + "</dt><dd>" + jeu.langues.map((l) => t("langue." + l)).join(", ") + "</dd></div>" +
      "<div><dt>" + t("fiche.joueurs") + "</dt><dd>" + t("fiche.nbJoueurs", { min: jeu.joueurs[0], max: jeu.joueurs[1] }) + "</dd></div>" +
      "<div><dt>" + t("fiche.mode") + "</dt><dd>" + t(jeu.mode === "solo" ? "fiche.solo" : "fiche.multi") + "</dd></div></dl>";

    // Classements : seulement si le partenaire transmet les scores (S07-04)
    if (Play.aUnClassement(jeu)) html += '<hr class="separateur-play"><section id="classements">' + blocClassement() + "</section>";

    // Galerie : captures en carrousel, sans « Voir tout »
    html += '<hr class="separateur-play"><section><h2 class="titre-play"><span>' + t("fiche.galerie") + '</span></h2><div class="carrousel rangee-play">' +
      [1, 2, 3].map((n) => '<span class="capture-play" role="img" aria-label="' + t("fiche.capture", { n: n, nom: jeu.nom }) + '">' +
        Play.visuel(jeu, 200, 300, "capture-" + n) + "</span>").join("") +
      "</div></section>";

    // Jeux similaires : même genre, sans ce jeu (S07-05)
    const similaires = Play.similaires(jeu);
    if (similaires.length) {
      html += '<hr class="separateur-play"><section><h2 class="titre-play"><span>' + t("fiche.similaires") + '</span></h2><div class="carrousel rangee-play">' +
        similaires.map((j) => Play.tuile(j, Play.url("p03-jeu.html", { jeu: jeu.id }))).join("") + "</div></section>";
    }

    // Notes et avis (S10-01, S10-02, S10-03) : moyenne, nombre d'avis, derniers commentaires
    const versAvis = Play.url("p06-avis.html", { jeu: jeu.id, depuis: depuis });
    const versDonner = Play.url("p07-donner-avis.html", { jeu: jeu.id, depuis: depuis });
    const mien = Play.monAvis(jeu.id);
    html += '<hr class="separateur-play"><section id="avis">' +
      '<h2 class="titre-play"><span>' + t("avis.titre") + '</span><a href="' + versAvis + '" class="voir-tout-play">' + t("commun.voirTout") + Play.icone("chevron", "f-primary") + "</a></h2>" +
      '<div class="resume-note"><b>' + Play.note(jeu) + "</b>" + Play.etoiles(moyenne.note, 26) + "</div>" +
      '<p class="nombre-avis">' + t("commun.avis", { n: moyenne.nombre }) + "</p>";
    if (mien) {
      html += '<a href="' + versDonner + '" class="bouton-doux">' + t("avis.modifier") + "</a>";
    } else if (Play.aLance(jeu.id)) {
      html += '<a href="' + versDonner + '" class="bouton-doux">' + t("avis.donner") + "</a>";
    } else {
      // Jamais lancé : impossible de noter (S10-01)
      html += '<button class="bouton-doux" disabled>' + t("avis.donner") + "</button>" +
        '<p class="aide-avis">' + t("avis.lanceDabord") + "</p>";
    }
    html += '<div id="derniers-avis">' + derniersAvis(mien) + "</div>";
    html += '<a href="' + versAvis + '" class="lien-tous-avis">' + t("avis.voirTous") + "</a></section>";

    // Signaler un problème avec ce jeu (S10-04)
    html += '<a class="lien-signaler-jeu" href="' + Play.url("p10-signaler-jeu.html", { jeu: jeu.id, depuis: depuis }) + '">' +
      Play.icone("drapeau", "f-play-muted") + t("fiche.signaler") + "</a>";

    html += '<div class="fin-contenu"></div>';
    document.getElementById("page").innerHTML = html;
    brancher();
  }

  /* Mon avis, puis les deux derniers commentaires visibles (un avis signalé disparaît, S10-03) */
  function derniersAvis(mien) {
    let html = "";
    if (mien) html += Play.carteAvis(Object.assign({ pseudo: Play.pseudo() }, mien), true);
    html += Play.avisVisibles(jeu).slice(0, 2).map((a) => Play.carteAvis(a, false)).join("");
    return html;
  }

  /* ---------- Bloc « Classements » : onglets, podium, ma place (S07-04) ---------- */
  function blocClassement() {
    const t = Play.t;
    const c = Play.classement(jeu, periode);
    const onglets = Play.PERIODES.map((p) =>
      '<button class="onglet-play" role="tab" data-periode="' + p + '" aria-selected="' + (p === periode) + '">' + t("classement." + p) + "</button>"
    ).join("");
    const podium = [0, 1, 2].map((i) => {
      const e = c.liste[i];
      return '<div class="marche marche-' + e.rang + '">' + Play.medaille(e.rang) +
        (Play.v2() ? Play.avatarHtml(e.pseudo, "avatar-podium") : "") +
        '<span class="nom-podium">' + Play.pseudoHtml(e.pseudo) + "</span>" +
        '<span class="score-podium">' + t("classement.points", { n: Play.entier(e.score) }) + "</span>" +
        '<span class="socle" aria-hidden="true">' + e.rang + "</span></div>";
    }).join("");
    return '<h2 class="titre-play"><span class="pastille-genre pastille-titre" style="--gc: var(--play-or)">' + Play.icone("trophee", "f-play-text") + "</span>" +
      "<span>" + t("classement.titre") + "</span></h2>" +
      '<div class="onglets-play" role="tablist" aria-label="' + t("classement.titre") + '">' + onglets + "</div>" +
      '<p class="pays-classement">' + Play.icone("drapeau", "f-play-muted") + t("classement.pays", { pays: Play.nomPays() }) + "</p>" +
      '<div class="podium">' + podium + "</div>" +
      Play.maPlace(c.moi, periode) +
      '<a class="bouton-doux" href="' + Play.url("p08-classement.html", { jeu: jeu.id, periode: periode, depuis: depuis }) + '">' + t("classement.voirTout") + "</a>";
  }

  function brancher() {
    const t = Play.t;
    Play.brancherAvis(document.getElementById("avis"), jeu, majAvis);
    document.getElementById("vers-avis").addEventListener("click", () => document.getElementById("avis").scrollIntoView({ behavior: "smooth" }));
    if (jeu.video) document.getElementById("lecture").addEventListener("click", lancerVideo);

    // Favori (S09-01), avec un petit « pop » du cœur
    document.getElementById("favori").addEventListener("click", () => {
      const ajoute = Play.basculerFavori(jeu.id);
      document.getElementById("favori").classList.add("pop");
      Nav.toast(t(ajoute ? "fiche.favoriAjoute" : "fiche.favoriRetire"));
    });
    document.getElementById("partager").addEventListener("click", partager);

    // Onglets du classement : seul le bloc est redessiné
    const bloc = document.getElementById("classements");
    if (bloc) bloc.addEventListener("click", (evenement) => {
      const onglet = evenement.target.closest("[data-periode]");
      if (!onglet) return;
      periode = onglet.dataset.periode;
      bloc.innerHTML = blocClassement();
      bloc.querySelector('[data-periode="' + periode + '"]').focus();
    });
  }

  /* Après le signalement d'un avis : il disparaît de la fiche (S10-03) */
  function majAvis() {
    const conteneur = document.getElementById("derniers-avis");
    conteneur.innerHTML = derniersAvis(Play.monAvis(jeu.id));
    Play.brancherAvis(document.getElementById("avis"), jeu, majAvis);
  }

  /* Vidéo simulée de 30 secondes : lecture et pause, sans fichier vidéo */
  function lancerVideo() {
    const t = Play.t;
    const media = document.getElementById("media");
    document.getElementById("lecture").remove();
    media.insertAdjacentHTML("beforeend",
      '<div class="lecteur-play"><button class="bouton-icone" id="pause" aria-label="' + t("fiche.pause") + '">' + Play.icone("pause", "f-play-white") + "</button>" +
      '<span class="piste"><i id="piste"></i></span><span class="temps" id="temps">0:00 / 0:30</span></div>');
    const bouton = document.getElementById("pause");
    let secondes = 0;

    function avancer() {
      secondes = Math.min(30, secondes + 1);
      document.getElementById("piste").style.width = (secondes / 30 * 100) + "%";
      document.getElementById("temps").textContent = "0:" + String(secondes).padStart(2, "0") + " / 0:30";
      if (secondes === 30) mettreEnPause();
    }
    function mettreEnPause() {
      arreterVideo();
      bouton.innerHTML = Play.icone("lecture", "f-play-white");
      bouton.setAttribute("aria-label", t("fiche.lecture"));
    }
    function reprendre() {
      if (secondes === 30) secondes = 0;
      lectureEnCours = setInterval(avancer, 1000);
      bouton.innerHTML = Play.icone("pause", "f-play-white");
      bouton.setAttribute("aria-label", t("fiche.pause"));
    }

    bouton.addEventListener("click", () => (lectureEnCours ? mettreEnPause() : reprendre()));
    reprendre();
  }
  function arreterVideo() {
    clearInterval(lectureEnCours);
    lectureEnCours = null;
  }

  /* Partage par les applications du téléphone (S07-06, S07-07) : feuille système simulée.
     Le lien ouvre la fiche si l'ami a Max it, sinon la page de Max it dans son store (menu de démo). */
  function partager() {
    const t = Play.t;
    const lien = "maxit.app/play/" + jeu.id;
    const options = [
      { icone: "discussion", cle: "partage.messagerie" },
      { icone: "message", cle: "partage.sms" },
      { icone: "reseau", cle: "partage.reseaux" },
      { icone: "copier", cle: "partage.copier" }
    ];
    const voile = Play.feuille(
      '<div class="apercu-partage"><span class="vignette-partage">' + Play.visuel(jeu, 56, 56, "tuile") + "</span>" +
      "<div><strong>" + jeu.nom + "</strong><small>" + t("partage.message") + " · " + lien + "</small></div></div>" +
      '<p class="aide-partage">' + t("partage.aide") + "</p>" +
      '<div class="options-partage">' + options.map((o, i) =>
        '<button class="option-partage" data-option="' + i + '"><span>' + Play.icone(o.icone) + "</span>" + t(o.cle) + "</button>"
      ).join("") + "</div>" +
      '<button class="bouton-doux" data-fermer>' + t("commun.annuler") + "</button>",
      t("partage.titre", { nom: jeu.nom })
    );
    voile.querySelectorAll("[data-option]").forEach((bouton) => bouton.addEventListener("click", () => {
      const option = options[Number(bouton.dataset.option)];
      voile.remove();
      Nav.toast(option.cle === "partage.copier" ? t("partage.copie") : t("partage.envoye", { app: t(option.cle) }));
    }));
  }

  /* Monte la fiche. options.v2 : écran V2 (badges, profils) */
  function monter(options) {
    enV2 = !!(options && options.v2);
    jeu = Play.jeuDeLaPage();
    // Ouvert par un lien partagé : pas de page précédente dans Play, la fermeture mène à l'accueil
    depuis = Nav.param("via") === "lien" ? "p01-accueil.html" : Play.depuis();
    const periodeDemandee = Nav.param("periode");
    if (Play.PERIODES.includes(periodeDemandee)) periode = periodeDemandee;
    Play.monter(rendre);
  }

  return { monter, adresseFiche };
})();
