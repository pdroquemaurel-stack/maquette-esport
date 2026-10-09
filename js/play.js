/* Fonctions communes aux écrans de Play (p01 à p05) : catalogue visible dans le pays,
   historique du joueur (récents, favoris, lancements), recommandations, visuels SVG des jeux,
   tuiles, rangées et feuilles du bas. Les données viennent de js/data-play.js ;
   l'état de la démo est mémorisé par js/nav.js (Etat). */

const Play = (function () {

  /* =====================================================================
     Catalogue visible par le joueur
     ===================================================================== */

  function pays() { return Etat.get("playPays") || PLAY.paysParDefaut; }
  function infosPays() { return PLAY.pays[pays()]; }
  function jeu(id) { return PLAY.jeux.find((j) => j.id === id) || null; }
  function partenaire(j) { return PLAY.partenaires[j.partenaire]; }
  function genre(id) { return PLAY.genres.find((g) => g.id === id) || null; }

  /* Jeux momentanément indisponibles (S08-04) : forcé par le menu de démo */
  function indisponibles() { return Etat.get("playIndispo") ? [PLAY.demo.jeuIndisponible] : []; }

  /* Un jeu est visible s'il est proposé dans le pays (S02-04) et disponible (S08-04) */
  function disponible(j) {
    return !!j && !(j.absentDe || []).includes(pays()) && !indisponibles().includes(j.id);
  }
  function catalogue() { return PLAY.jeux.filter(disponible); }

  function parties(j) { return j.parties[pays()] || 0; }
  function parPopularite(liste) { return liste.slice().sort((a, b) => parties(b) - parties(a)); }

  /* =====================================================================
     Historique du joueur (mémorisé entre les pages)
     ===================================================================== */

  /* Liste mémorisée, sinon celle du début de la démo (vide pour un nouveau joueur) */
  function liste(cle, depart) {
    const valeur = Etat.get(cle);
    if (valeur) return valeur.slice();
    return Etat.get("playNouveau") ? [] : depart.slice();
  }

  function idsRecents() { return liste("playRecents", PLAY.joueur.recents); }
  function idsLances() { return liste("playLances", PLAY.joueur.recents); }
  function idsFavoris() { return liste("playFavoris", PLAY.joueur.favoris); }

  /* Récemment joués : 10 derniers jeux lancés, le plus récent en premier (S09-02) */
  function recents() { return idsRecents().map(jeu).filter(disponible).slice(0, 10); }

  /* Mes favoris : le dernier ajouté en premier (S09-01).
     Un favori indisponible est seulement masqué : il retrouve sa place quand il revient (S08-04). */
  function favoris() { return idsFavoris().map(jeu).filter(disponible); }
  function estFavori(id) { return idsFavoris().includes(id); }
  function basculerFavori(id) {
    let ids = idsFavoris();
    const ajoute = !ids.includes(id);
    ids = ajoute ? [id].concat(ids) : ids.filter((x) => x !== id);
    Etat.set("playFavoris", ids);
    return ajoute;
  }

  /* Chaque lancement alimente les récents et les recommandations (S08-01) */
  function enregistrerLancement(id) {
    Etat.set("playRecents", [id].concat(idsRecents().filter((x) => x !== id)).slice(0, 10));
    const lances = idsLances();
    if (!lances.includes(id)) Etat.set("playLances", lances.concat(id));
  }

  /* =====================================================================
     Avis des joueurs (E10)
     ===================================================================== */

  /* Pseudonyme du joueur (compte Max it), sous lequel ses avis sont publiés */
  function pseudo() { return Etat.get("pseudo") || PLAY.joueur.pseudo; }

  /* Le joueur ne peut noter qu'un jeu qu'il a lancé au moins une fois (S10-01) */
  function aLance(id) { return idsLances().includes(id); }

  /* Avis du joueur, par jeu : mémorisés, sinon ceux du début de la démo */
  function tousMesAvis() {
    const valeur = Etat.get("playAvis");
    if (valeur) return Object.assign({}, valeur);
    return Etat.get("playNouveau") ? {} : Object.assign({}, PLAY.joueur.avis);
  }
  function monAvis(id) { return tousMesAvis()[id] || null; }
  /* Un seul avis par jeu : un nouvel avis remplace le précédent */
  function enregistrerAvis(id, note, texte) {
    const avis = tousMesAvis();
    avis[id] = { note: note, texte: texte, date: aujourdhui() };
    Etat.set("playAvis", avis);
  }
  function supprimerAvis(id) {
    const avis = tousMesAvis();
    delete avis[id];
    Etat.set("playAvis", avis);
  }

  function aujourdhui() {
    const d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  /* « 2026-10-02 » → « 02/10/2026 » */
  function dateCourte(iso) { return iso.split("-").reverse().join("/"); }

  /* Nombre tiré du nom du jeu : sélection d'avis stable d'une page à l'autre */
  function graine(texte) { return texte.split("").reduce((n, c) => (n * 31 + c.charCodeAt(0)) % 9973, 7); }

  /* Commentaires des autres joueurs, du plus récent au plus ancien */
  function avisDesJoueurs(j) {
    const pool = PLAY.avisJoueurs;
    const g = graine(j.id);
    const nombre = 6 + (g % 5);
    const liste = [];
    for (let i = 0; i < nombre; i++) {
      const modele = pool[(g + i * 5) % pool.length];
      const date = new Date(2026, 9, 8 - i * 4 - (g % 3));
      liste.push({
        id: j.id + "-" + i,
        pseudo: modele.pseudo,
        note: modele.note,
        texte: modele.texte,
        date: date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0")
      });
    }
    return liste;
  }

  /* Note moyenne et nombre d'avis, avis du joueur compris (S10-02) */
  function moyenne(j) {
    const mien = monAvis(j.id);
    if (!mien) return { note: j.note, nombre: j.avis };
    return { note: (j.note * j.avis + mien.note) / (j.avis + 1), nombre: j.avis + 1 };
  }
  function note(j) { return moyenne(j).note.toFixed(1).replace(".", ","); }

  /* Répartition des notes de 5 à 1 étoiles, en pourcentage, autour de la moyenne */
  function repartition(j) {
    const m = moyenne(j).note;
    const poids = [5, 4, 3, 2, 1].map((k) => Math.exp(-Math.pow(k - m, 2) / 0.9));
    const total = poids.reduce((a, b) => a + b, 0);
    return poids.map((p) => Math.round(p / total * 100));
  }

  /* Signalements envoyés par le joueur (S10-03) */
  function idsSignales() { return (Etat.get("playSignales") || []).slice(); }
  function estSignale(idAvis) { return idsSignales().includes(idAvis); }
  function signaler(idAvis) { Etat.set("playSignales", idsSignales().concat(idAvis)); }

  /* =====================================================================
     Sections de l'accueil
     ===================================================================== */

  /* Jeu à la une du pays, sinon celui du responsable MEA (S03-01) */
  function aLaUne() {
    const candidats = [jeu(infosPays().aLaUne), jeu(PLAY.aLaUneMEA)].concat(parPopularite(catalogue()));
    return candidats.find(disponible) || null;
  }

  /* Recommandés : jeux des genres les plus joués, pas encore lancés ;
     pour un joueur sans historique, les jeux populaires du pays (S09-03) */
  function recommandes() {
    const lances = idsLances();
    const nonLances = parPopularite(catalogue().filter((j) => !lances.includes(j.id)));
    if (!lances.length) return nonLances.slice(0, 8);
    const poids = {};
    lances.map(jeu).filter(Boolean).forEach((j) => { poids[j.genre] = (poids[j.genre] || 0) + 1; });
    const duGout = nonLances.filter((j) => poids[j.genre]).sort((a, b) => poids[b.genre] - poids[a.genre]);
    const autres = nonLances.filter((j) => !poids[j.genre]);
    return duGout.concat(autres).slice(0, 8);
  }

  /* Nouveautés : publiés depuis moins de 30 jours, du plus récent au plus ancien (S03-02) */
  function nouveautes() { return catalogue().filter((j) => j.publie < 30).sort((a, b) => a.publie - b.publie); }

  /* Populaires ici : parties lancées dans le pays sur 7 jours (S03-03) */
  function populaires() { return parPopularite(catalogue()).slice(0, 10); }

  /* Genres de la grille, dans l'ordre du pays, s'ils ont au moins un jeu (S06-02, S03-04) */
  function genresVisibles() {
    return infosPays().ordreGenres.map(genre).filter((g) => catalogue().some((j) => j.genre === g.id));
  }
  function jeuxDuGenre(idGenre) {
    return parPopularite(catalogue().filter((j) => idGenre === "tous" || j.genre === idGenre));
  }

  /* Jeux similaires : même genre, sans le jeu de la fiche, par popularité (S07-04) */
  function similaires(j) { return jeuxDuGenre(j.genre).filter((x) => x.id !== j.id).slice(0, 8); }

  /* =====================================================================
     Navigation
     ===================================================================== */

  /* Adresse de la page affichée, pour y revenir (« p02-genre.html?genre=sport ») */
  function ici() {
    const recherche = new URLSearchParams(rechercheCourante());
    recherche.delete("depuis");
    const texte = recherche.toString();
    return pageCourante() + (texte ? "?" + texte : "");
  }

  /* Page d'où l'on vient (paramètre « depuis »), limitée aux écrans de Play */
  function depuis() {
    const valeur = Nav.param("depuis");
    return valeur && /^p0\d-[\w-]+\.html(\?[\w=&%.-]*)?$/.test(valeur) ? valeur : "p01-accueil.html";
  }

  function url(page, params) { return page + "?" + new URLSearchParams(params).toString(); }
  function lienFiche(id, origine) { return url("p03-jeu.html", { jeu: id, depuis: origine || ici() }); }

  /* Un jeu indisponible ou inconnu n'a pas de fiche : retour à l'accueil avec un message (S08-04) */
  function jeuDeLaPage() {
    const j = jeu(Nav.param("jeu"));
    if (!disponible(j)) {
      ouvrirPage("p01-accueil.html?indispo=1");
      return null;
    }
    return j;
  }

  /* Rendu au chargement et à chaque changement d'état (menu de démo) */
  function monter(fn) {
    document.addEventListener("DOMContentLoaded", fn);
    document.addEventListener("etat-change", fn);
  }

  /* =====================================================================
     Icônes de l'interface (SVG 24 × 24)
     ===================================================================== */

  const ICONES = {
    retour: '<path d="M10.6 5.3 12 6.7 7.7 11H20v2H7.7l4.3 4.3-1.4 1.4L3.9 12z"/>',
    partager: '<path d="M18 2a3 3 0 1 1-2.8 4.1L8.9 9.6a3 3 0 0 1 0 2.8l6.3 3.5A3 3 0 1 1 15 17l-6.3-3.5a3 3 0 1 1 0-3L15 7A3 3 0 0 1 18 2z"/>',
    coeur: '<path d="M12 20.3l-1.3-1.2C6 14.9 3 12.2 3 8.8 3 6.1 5.1 4 7.8 4c1.5 0 3 .7 4.2 1.9C13.2 4.7 14.7 4 16.2 4 18.9 4 21 6.1 21 8.8c0 3.4-3 6.1-7.7 10.3zm0-2.7c4.2-3.8 7-6.3 7-8.8C19 7.2 17.8 6 16.2 6c-1.2 0-2.4.8-2.9 1.9h-2.6C10.2 6.8 9 6 7.8 6 6.2 6 5 7.2 5 8.8c0 2.5 2.8 5 7 8.8z"/>',
    coeurPlein: '<path d="M12 20.3l-1.3-1.2C6 14.9 3 12.2 3 8.8 3 6.1 5.1 4 7.8 4c1.5 0 3 .7 4.2 1.9C13.2 4.7 14.7 4 16.2 4 18.9 4 21 6.1 21 8.8c0 3.4-3 6.1-7.7 10.3z"/>',
    etoile: '<path d="M12 2.5l2.9 6 6.6.8-4.9 4.6 1.3 6.5L12 17.2l-5.9 3.2 1.3-6.5-4.9-4.6 6.6-.8z"/>',
    lecture: '<path d="M8 5.5v13l10.5-6.5z"/>',
    pause: '<path d="M7 5h4v14H7zm6 0h4v14h-4z"/>',
    fermer: '<path d="M6.4 5 12 10.6 17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4z"/>',
    chevron: '<path d="M9.3 5.3 15.9 12l-6.6 6.7-1.4-1.4 5.2-5.3-5.2-5.3z"/>',
    info: '<path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm-1 7h2v6h-2zm0-4h2v2h-2z"/>',
    gratuit: '<path d="M3 3h8.6l9.7 9.7-8.6 8.6L3 11.6zm4.5 2.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>',
    data: '<path d="M12 4c3.6 0 6.9 1.4 9.4 3.7l-1.4 1.5A11.6 11.6 0 0 0 12 6C9 6 6.2 7.2 4 9.2L2.6 7.7A13.6 13.6 0 0 1 12 4zm0 4.5c2.4 0 4.6.9 6.3 2.4l-1.4 1.5A7.3 7.3 0 0 0 12 10.5c-1.9 0-3.6.7-4.9 1.9l-1.4-1.5A9.3 9.3 0 0 1 12 8.5zm0 4.5c1.2 0 2.3.4 3.2 1.2L12 17.6l-3.2-3.4c.9-.8 2-1.2 3.2-1.2zM3.3 2 22 20.7 20.7 22 2 3.3z"/>',
    copier: '<path d="M8 3h11a2 2 0 0 1 2 2v11h-2V5H8zM5 7h10a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2zm0 2v11h10V9z"/>',
    message: '<path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2zm0 2v11.2L7.2 16H20V6z"/>',
    discussion: '<path d="M12 3c5 0 9 3.6 9 8s-4 8-9 8c-1.1 0-2.2-.2-3.2-.5L4 20l1.3-3.9A7.6 7.6 0 0 1 3 11c0-4.4 4-8 9-8zm-4 7a1.3 1.3 0 1 0 0 2.6A1.3 1.3 0 0 0 8 10zm4 0a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6zm4 0a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6z"/>',
    reseau: '<path d="M7 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm10-6a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 12a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM9.6 10.6l4.8-2.8 1 1.7-4.8 2.8zm0 2.8 1-1.7 4.8 2.8-1 1.7z"/>',
    mail: '<path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm1 2.4V17h16V7.4l-8 5.3zM5.6 7l6.4 4.3L18.4 7z"/>',
    hub: '<path d="M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 0h7v7h-7z"/>'
  };

  function icone(nom, classe) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true" class="' + (classe || "f-play-text") + '">' + ICONES[nom] + "</svg>";
  }

  /* Note en étoiles (pleines jusqu'à la note arrondie) */
  function etoiles(note, taille) {
    let html = '<span class="etoiles" aria-hidden="true">';
    for (let i = 1; i <= 5; i++) {
      html += '<svg viewBox="0 0 24 24" style="width:' + taille + "px;height:" + taille + 'px" class="' +
        (i <= Math.round(note) ? "f-play-star" : "f-play-chip") + '">' + ICONES.etoile + "</svg>";
    }
    return html + "</span>";
  }

  /* =====================================================================
     Pictogrammes des genres (grille de l'accueil, style de la maquette Figma :
     orange et blanc sur case gris chaud)
     ===================================================================== */

  const PICTOS_GENRES = {
    action: '<path class="g2" d="M7 5h4l15 15-4 4L7 9z"/><path class="g1" d="M41 5h-4L22 20l4 4L41 9z"/>' +
      '<path class="g2" d="M12 27l9 9-3 3-2-2-5 5-3-3 5-5-2-2z"/><path class="g1" d="M36 27l-9 9 3 3 2-2 5 5 3-3-5-5 2-2z"/>',
    arcade: '<rect class="g2" x="7" y="30" width="34" height="12" rx="4"/><rect class="g2" x="22" y="15" width="4" height="16"/>' +
      '<circle class="g1" cx="24" cy="12" r="7"/><circle class="g1" cx="34" cy="36" r="2.5"/>',
    course: '<path class="g1" d="M12 8h12v14H12z"/><path class="gs2" d="M12 43V6M12 8h24l-5 7 5 7H12" fill="none" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/>',
    puzzle: '<path class="gs2" d="M9 14h9a4 4 0 1 1 8 0h9v9a4 4 0 1 1 0 8v9h-9a4 4 0 1 0-8 0H9v-9a4 4 0 1 0 0-8z" fill="none" stroke-width="3.5" stroke-linejoin="round"/>',
    casual: '<path class="g1" d="M24 7c5 5 6 13 0 22-6-9-5-17 0-22z"/><path class="g1" d="M5 17c8 0 14 5 16 13-8 1-15-4-16-13z"/>' +
      '<path class="g1" d="M43 17c-8 0-14 5-16 13 8 1 15-4 16-13z"/><path class="g1" d="M9 33h30c-3 5-8 7-15 7s-12-2-15-7z"/>',
    sport: '<circle class="gs2" cx="24" cy="24" r="17" fill="none" stroke-width="3.5"/><path class="g2" d="M24 16l7.5 5.5-3 8.5h-9l-3-8.5z"/>' +
      '<path class="gs2" d="M24 16V8M31.5 21.5l7.5-2.5M28.5 30l4.5 6.5M19.5 30L15 36.5M16.5 21.5 9 19" fill="none" stroke-width="3"/>',
    cartes: '<rect class="g2" x="7" y="8" width="21" height="31" rx="3"/><rect class="g1" x="20" y="9" width="21" height="31" rx="3" transform="rotate(10 30 25)"/>',
    quiz: '<path class="g2" d="M7 7h34v25H22l-8 8v-8H7z"/><path class="g1" d="M19.5 15.5a4.5 4.5 0 1 1 6.6 4c-1.1.7-2.1 1.4-2.1 2.6v.9h-3.5v-1.4c0-2.2 1.6-3.3 2.8-4a1.2 1.2 0 1 0-1.8-1.3z"/>' +
      '<circle class="g1" cx="22.3" cy="27" r="2"/>',
    aventure: '<circle class="gs2" cx="24" cy="24" r="17" fill="none" stroke-width="3.5"/><path class="g1" d="M31 13l-4.5 13.5L17 35l4.5-13.5z"/><circle class="g2" cx="24" cy="24" r="2.2"/>',
    strategie: '<path class="gs2" d="M14 7h4v4h4V7h4v4h4V7h4v9l-4 4v12h4v9H14v-9h4V20l-4-4z" fill="none" stroke-width="3" stroke-linejoin="round"/>' +
      '<rect class="g1" x="21" y="24" width="6" height="8" rx="3"/>',
    tous: '<circle class="g1" cx="10" cy="24" r="5"/><circle class="g2" cx="24" cy="24" r="5"/><circle class="g3" cx="38" cy="24" r="5"/>'
  };

  function pictoGenre(id) {
    return '<svg viewBox="0 0 48 48" aria-hidden="true" class="picto-genre">' + PICTOS_GENRES[id] + "</svg>";
  }

  /* =====================================================================
     Visuels des jeux : dégradé de la palette, formes anguleuses et pictogramme.
     p1 : blanc ; p2 : couleur sombre de la palette ; p3 : couleur claire.
     ===================================================================== */

  /* Palettes : deux couleurs de tokens.css (sombre, claire) */
  const PALETTES = {
    flamme: ["--color-gaming-flame-dark", "--color-primary"],
    nuit: ["--color-game-blue-bg", "--color-game-blue"],
    foret: ["--color-game-green-bg", "--color-game-green"],
    violet: ["--illu-purple-dark", "--color-game-purple"],
    neon: ["--illu-purple-deep", "--illu-neon-pink"],
    or: ["--illu-black", "--illu-gold"],
    terre: ["--illu-hair", "--illu-terracotta"],
    sable: ["--illu-terracotta", "--illu-sand"]
  };

  /* Pictogrammes des jeux (48 × 48) */
  const PICTOS = {
    epee: '<path class="p1" d="M40 5l3 3-21 21-3-3z"/><path class="p3" d="M13 24l11 11-3 3-3-3-7 7-3-3 7-7-3-3z"/>',
    robot: '<rect class="p1" x="12" y="14" width="24" height="20" rx="4"/><rect class="p2" x="16" y="19" width="5" height="5" rx="1"/>' +
      '<rect class="p2" x="27" y="19" width="5" height="5" rx="1"/><rect class="p2" x="18" y="28" width="12" height="2" rx="1"/>' +
      '<rect class="p1" x="22" y="7" width="4" height="7"/><circle class="p3" cx="24" cy="6" r="3"/><rect class="p1" x="6" y="20" width="4" height="10" rx="2"/>' +
      '<rect class="p1" x="38" y="20" width="4" height="10" rx="2"/><rect class="p1" x="16" y="34" width="5" height="8"/><rect class="p1" x="27" y="34" width="5" height="8"/>',
    cible: '<circle class="p1" cx="24" cy="24" r="18"/><circle class="p2" cx="24" cy="24" r="13"/><circle class="p1" cx="24" cy="24" r="8"/><circle class="p3" cx="24" cy="24" r="4"/>',
    bus: '<rect class="p1" x="6" y="12" width="36" height="22" rx="5"/><rect class="p2" x="10" y="16" width="8" height="7" rx="1"/>' +
      '<rect class="p2" x="20" y="16" width="8" height="7" rx="1"/><rect class="p2" x="30" y="16" width="8" height="7" rx="1"/>' +
      '<rect class="p3" x="10" y="6" width="28" height="6" rx="2"/><circle class="p2" cx="14" cy="36" r="5"/><circle class="p2" cx="34" cy="36" r="5"/>' +
      '<circle class="p1" cx="14" cy="36" r="2"/><circle class="p1" cx="34" cy="36" r="2"/>',
    serpent: '<path class="t1" d="M8 38h12V26H10V12h28v12H28v14h10" fill="none" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><circle class="p3" cx="40" cy="38" r="4"/>',
    ballon: '<ellipse class="p3" cx="24" cy="20" rx="13" ry="15"/><path class="p3" d="M21 34h6l-3 4z"/>' +
      '<path class="t1" d="M24 38c-3 4 3 5 0 9" fill="none" stroke-width="2"/><ellipse class="p1" cx="19" cy="15" rx="3" ry="5" opacity=".6"/>',
    voiture: '<path class="p1" d="M6 30l3-9c1-3 3-4 6-4h18c3 0 5 1 6 4l3 9v7H6z"/><path class="p2" d="M14 20h20l2 7H12z"/>' +
      '<circle class="p2" cx="15" cy="37" r="5"/><circle class="p2" cx="33" cy="37" r="5"/><circle class="p3" cx="15" cy="37" r="2"/><circle class="p3" cx="33" cy="37" r="2"/>',
    moto: '<circle class="p1" cx="12" cy="33" r="8"/><circle class="p2" cx="12" cy="33" r="4"/><circle class="p1" cx="36" cy="33" r="8"/>' +
      '<circle class="p2" cx="36" cy="33" r="4"/><path class="p3" d="M12 33l8-12h10l6 12h-6l-3-6h-6l-4 6z"/><rect class="p1" x="28" y="15" width="8" height="4" rx="2"/>',
    parking: '<rect class="p3" x="8" y="6" width="32" height="36" rx="6"/><path class="p1" d="M18 14h9a7 7 0 0 1 0 14h-4v8h-5zm5 5v4h4a2 2 0 0 0 0-4z"/>',
    blocs: '<rect class="p1" x="6" y="6" width="11" height="11" rx="2"/><rect class="p3" x="19" y="6" width="11" height="11" rx="2"/>' +
      '<rect class="p1" x="19" y="19" width="11" height="11" rx="2"/><rect class="p1" x="32" y="19" width="11" height="11" rx="2"/>' +
      '<rect class="p3" x="6" y="32" width="11" height="11" rx="2"/><rect class="p1" x="19" y="32" width="11" height="11" rx="2"/>',
    diamant: '<path class="p1" d="M14 8h20l8 11-18 23L6 19z"/><path class="p3" d="M6 19h36L24 42z"/><path class="p2" d="M17 19l7-11 7 11z" opacity=".5"/>',
    fruit: '<circle class="p3" cx="24" cy="28" r="15"/><path class="p1" d="M24 13c0-4 2-7 6-8l1 2c-3 1-5 3-5 6z"/>' +
      '<path class="p1" d="M26 12c4-5 10-5 13-2-4 4-9 4-13 2z"/><ellipse class="p1" cx="18" cy="23" rx="3" ry="5" opacity=".6"/>',
    marmite: '<path class="p1" d="M8 22h32v10c0 6-5 10-11 10H19c-6 0-11-4-11-10z"/><rect class="p3" x="6" y="18" width="36" height="5" rx="2.5"/>' +
      '<rect class="p1" x="21" y="13" width="6" height="5" rx="2"/><path class="t1" d="M17 4c-2 3 2 5 0 8M24 3c-2 3 2 5 0 8M31 4c-2 3 2 5 0 8" fill="none" stroke-width="2" stroke-linecap="round"/>',
    chat: '<path class="p1" d="M10 8l9 8h10l9-8v20c0 9-6 14-14 14S10 37 10 28z"/><circle class="p2" cx="18" cy="26" r="2.5"/>' +
      '<circle class="p2" cx="30" cy="26" r="2.5"/><path class="p3" d="M22 31h4l-2 3z"/>',
    bulles: '<circle class="p3" cx="17" cy="29" r="11"/><circle class="p1" cx="32" cy="17" r="9"/><circle class="p1" cx="35" cy="36" r="6"/><circle class="p1" cx="13" cy="25" r="3" opacity=".6"/>',
    foot: '<circle class="p1" cx="24" cy="24" r="18"/><path class="p2" d="M24 16l8 6-3 9h-10l-3-9z"/><circle class="p2" cx="24" cy="7" r="3"/>' +
      '<circle class="p2" cx="40" cy="19" r="3"/><circle class="p2" cx="8" cy="19" r="3"/><circle class="p2" cx="34" cy="38" r="3"/><circle class="p2" cx="14" cy="38" r="3"/>',
    basket: '<circle class="p3" cx="24" cy="24" r="18"/><path class="t2" d="M6 24h36M24 6v36M11 11c6 6 6 20 0 26M37 11c-6 6-6 20 0 26" fill="none" stroke-width="2"/>',
    billard: '<circle class="p2" cx="24" cy="24" r="18"/><circle class="p1" cx="24" cy="22" r="9"/>' +
      '<circle class="t2" cx="24" cy="18.5" r="2.8" fill="none" stroke-width="2.2"/><circle class="t2" cx="24" cy="25" r="3.4" fill="none" stroke-width="2.2"/>' +
      '<ellipse class="p1" cx="15" cy="13" rx="3" ry="2" opacity=".5"/>',
    de: '<rect class="p1" x="8" y="8" width="32" height="32" rx="7"/><circle class="p2" cx="16" cy="16" r="3"/><circle class="p2" cx="32" cy="16" r="3"/>' +
      '<circle class="p3" cx="24" cy="24" r="3"/><circle class="p2" cx="16" cy="32" r="3"/><circle class="p2" cx="32" cy="32" r="3"/>',
    pion: '<ellipse class="p1" cx="24" cy="31" rx="16" ry="7"/><rect class="p1" x="8" y="22" width="32" height="9"/>' +
      '<ellipse class="p3" cx="24" cy="22" rx="16" ry="7"/><ellipse class="p1" cx="24" cy="22" rx="9" ry="3.5" opacity=".5"/>',
    carte: '<rect class="p1" x="16" y="6" width="24" height="34" rx="3" transform="rotate(12 28 23)" opacity=".6"/>' +
      '<rect class="p1" x="8" y="8" width="24" height="34" rx="3"/><path class="p3" d="M20 18c-3-4-8-1-6 3l6 6 6-6c2-4-3-7-6-3z"/>',
    interro: '<circle class="p3" cx="24" cy="24" r="18"/><path class="p1" d="M18 18a6 6 0 1 1 9 5c-2 1-3 2-3 4v2h-4v-3c0-3 2-5 4-6a2 2 0 1 0-2-3z"/><circle class="p1" cx="22" cy="35" r="2.5"/>',
    lettres: '<rect class="p1" x="6" y="6" width="16" height="16" rx="3"/><rect class="p3" x="26" y="6" width="16" height="16" rx="3"/>' +
      '<rect class="p3" x="6" y="26" width="16" height="16" rx="3"/><rect class="p1" x="26" y="26" width="16" height="16" rx="3"/>' +
      '<path class="t2" d="M10 19l4-10 4 10M11.5 15h5M30 30v9h8" fill="none" stroke-width="2"/>',
    bulleMot: '<path class="p1" d="M8 10h32a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3H20l-9 7v-7H8a3 3 0 0 1-3-3V13a3 3 0 0 1 3-3z"/>' +
      '<rect class="p3" x="11" y="16" width="5" height="5" rx="1"/><rect class="p2" x="18" y="16" width="5" height="5" rx="1"/>' +
      '<rect class="p3" x="25" y="16" width="5" height="5" rx="1"/><rect class="p2" x="32" y="16" width="5" height="5" rx="1"/>' +
      '<rect class="p2" x="11" y="25" width="26" height="3" rx="1.5" opacity=".4"/>',
    coffre: '<path class="p3" d="M8 20c0-7 5-12 16-12s16 5 16 12z"/><rect class="p1" x="8" y="20" width="32" height="20" rx="2"/>' +
      '<rect class="p3" x="8" y="20" width="32" height="4"/><rect class="p2" x="21" y="22" width="6" height="8" rx="1"/>',
    colonne: '<rect class="p1" x="8" y="8" width="32" height="5" rx="1"/><rect class="p1" x="12" y="13" width="6" height="24"/>' +
      '<rect class="p1" x="30" y="13" width="6" height="24"/><rect class="p3" x="21" y="20" width="6" height="17"/><rect class="p1" x="6" y="37" width="36" height="5" rx="1"/>',
    dune: '<circle class="p3" cx="33" cy="15" r="7"/><path class="p1" d="M2 40c8-12 16-14 24-8 6-6 13-6 20 2v8H2z"/>',
    tour: '<path class="p1" d="M12 8h5v5h4V8h6v5h4V8h5v10l-4 4v14h4v6H12v-6h4V22l-4-4z"/><rect class="p2" x="21" y="26" width="6" height="10" rx="3"/>',
    couronne: '<path class="p3" d="M6 16l9 8 9-14 9 14 9-8-4 22H10z"/><rect class="p1" x="10" y="36" width="28" height="5" rx="1"/><circle class="p1" cx="24" cy="26" r="3"/>',
    piece: '<circle class="p3" cx="24" cy="24" r="17"/><circle class="p1" cx="24" cy="24" r="12" opacity=".35"/>' +
      '<path class="p1" d="M22 13h4v3c3 0 5 2 5 4h-4c0-1-1-1-3-1s-3 1-3 2 1 2 4 2c4 1 6 2 6 5 0 2-2 4-5 4v3h-4v-3c-3 0-5-2-5-5h4c0 1 1 2 3 2s3-1 3-2-1-2-4-2c-4-1-6-2-6-5 0-2 2-4 5-4z"/>'
  };

  let compteurVisuels = 0;

  /* Pictogramme du jeu, centré en (cx, cy), de taille t, sur un disque sombre */
  function picto(j, cx, cy, t) {
    const k = t / 48;
    return '<g transform="translate(' + (cx - t / 2) + " " + (cy - t / 2) + ") scale(" + k + ')">' +
      '<circle class="p2" cx="24" cy="24" r="27" opacity=".45"/>' + PICTOS[j.picto] + "</g>";
  }

  /* Visuel d'un jeu, en SVG, de proportions l × h.
     variante : « tuile » (pictogramme centré), « carte » (pictogramme en haut, place pour un texte),
     « capture-1 » à « capture-3 » (galerie), « partie » (écran de jeu simulé). */
  function visuel(j, l, h, variante) {
    // Image fournie (js/data-play.js, PLAY.images) : utilisée partout, sauf pour les captures 2 et 3 de la galerie
    const image = PLAY.images[j.id];
    if (image && variante !== "capture-2" && variante !== "capture-3") {
      return '<img class="visuel-play visuel-image-play" src="' + ressource(image) + '" alt="">';
    }

    const id = "vj" + (++compteurVisuels);
    const couleurs = PALETTES[j.palette];
    const petit = Math.min(l, h);
    let scene = "";

    // Formes anguleuses en écho à l'univers Gaming, et halo
    scene += '<path class="p2" opacity=".35" d="M' + l * 0.58 + " 0H" + l + "V" + h + "H" + l * 0.82 + 'z"/>';
    scene += '<circle class="p1" opacity=".1" cx="' + l * 0.8 + '" cy="' + h * 0.22 + '" r="' + petit * 0.22 + '"/>';

    if (variante === "carte") {
      scene += picto(j, l * 0.5, h * 0.36, petit * 0.42);
    } else if (variante === "capture-1") {
      // Écran de jeu : barre de score et pictogramme
      scene += '<rect class="p2" opacity=".6" x="' + l * 0.06 + '" y="' + h * 0.05 + '" width="' + l * 0.88 + '" height="' + h * 0.07 + '" rx="' + h * 0.035 + '"/>';
      scene += '<rect class="p3" x="' + l * 0.09 + '" y="' + h * 0.072 + '" width="' + l * 0.4 + '" height="' + h * 0.026 + '" rx="' + h * 0.013 + '"/>';
      scene += picto(j, l * 0.5, h * 0.55, petit * 0.62);
    } else if (variante === "capture-2") {
      // Grille de niveaux
      for (let ligne = 0; ligne < 3; ligne++) {
        for (let col = 0; col < 2; col++) {
          scene += picto(j, l * (0.3 + col * 0.4), h * (0.22 + ligne * 0.28), petit * 0.26);
        }
      }
    } else if (variante === "capture-3") {
      // Horizon et soleil
      scene += '<circle class="p3" cx="' + l * 0.5 + '" cy="' + h * 0.42 + '" r="' + petit * 0.26 + '"/>';
      scene += '<path class="p2" d="M0 ' + h * 0.62 + "Q" + l * 0.3 + " " + h * 0.52 + " " + l * 0.55 + " " + h * 0.62 + "T" + l + " " + h * 0.6 + "V" + h + "H0z\"/>";
      scene += picto(j, l * 0.5, h * 0.8, petit * 0.3);
    } else if (variante === "partie") {
      // Décor de partie : sol, obstacles et pictogramme du joueur
      scene += '<rect class="p2" y="' + h * 0.78 + '" width="' + l + '" height="' + h * 0.22 + '"/>';
      [0.15, 0.42, 0.7].forEach((x, i) => {
        scene += '<rect class="p1" opacity=".25" x="' + l * x + '" y="' + h * (0.58 - i * 0.08) + '" width="' + l * 0.16 + '" height="' + h * 0.04 + '" rx="' + h * 0.02 + '"/>';
      });
      scene += picto(j, l * 0.5, h * 0.62, petit * 0.4);
    } else {
      scene += picto(j, l * 0.5, h * 0.5, petit * 0.56);
    }

    return '<svg class="visuel-play" viewBox="0 0 ' + l + " " + h + '" preserveAspectRatio="xMidYMid slice" aria-hidden="true"' +
      ' style="--vj-sombre: var(' + couleurs[0] + "); --vj-clair: var(" + couleurs[1] + ')">' +
      '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" style="stop-color: var(--vj-sombre)"/><stop offset="1" style="stop-color: var(--vj-clair)"/>' +
      "</linearGradient></defs>" +
      '<rect width="' + l + '" height="' + h + '" fill="url(#' + id + ')"/>' + scene + "</svg>";
  }

  /* =====================================================================
     Composants
     ===================================================================== */

  /* Tuile d'un jeu : visuel, nom, « Gratuit » et note ; mène toujours à la fiche (S06-04).
     Identique quel que soit le partenaire et le modèle d'intégration. */
  function tuile(j, origine) {
    return '<a href="' + lienFiche(j.id, origine) + '" class="tuile-play">' +
      '<span class="visuel-tuile">' + visuel(j, 160, 150, "tuile") + "</span>" +
      '<span class="tuile-nom">' + j.nom + "</span>" +
      '<span class="tuile-meta">Gratuit<span class="tuile-note">' + icone("etoile", "f-play-star") + note(j) + "</span></span>" +
      "</a>";
  }

  /* Rangée horizontale de tuiles, avec son titre (masquée si vide) */
  function rangee(titre, jeux, origine) {
    if (!jeux.length) return "";
    return '<section><h2 class="titre-play">' + titre + "</h2>" +
      '<div class="carrousel rangee-play">' + jeux.map((j) => tuile(j, origine)).join("") + "</div></section>";
  }

  /* Feuille du bas. contenu : HTML ; classe : « feuille-sombre » pour une feuille de Play
     (la feuille de partage, elle, est celle du téléphone). Renvoie le voile pour la fermer. */
  function feuille(contenu, etiquette, classe) {
    const telephone = document.querySelector(".telephone");
    const voile = document.createElement("div");
    voile.className = "voile ouvert";
    voile.innerHTML = '<div class="feuille ' + (classe || "") + '" role="dialog" aria-modal="true" aria-label="' + etiquette + '">' +
      '<div class="poignee"></div>' + contenu + "</div>";
    voile.addEventListener("click", (evenement) => {
      if (evenement.target === voile || evenement.target.closest("[data-fermer]")) voile.remove();
    });
    telephone.appendChild(voile);
    return voile;
  }

  /* ---------- Avis (style de reference/figma-play/06-avis.png) ---------- */

  /* Initiales du pseudonyme pour l'avatar : « Salma_ElA » → « SE » */
  function initiales(nom) {
    const morceaux = nom.split(/[_.\s]+/).filter(Boolean);
    return (morceaux.length > 1 ? morceaux[0][0] + morceaux[1][0] : morceaux[0].slice(0, 2)).toUpperCase();
  }

  /* Carte d'un avis. mien : avis du joueur (pas de signalement) ; actions : HTML ajouté en bas */
  function carteAvis(avis, mien, actions) {
    const long = avis.texte.length > 110;
    let pied = "";
    if (mien) pied = actions || "";
    else if (estSignale(avis.id)) pied = '<span class="avis-signale">Signalé · en cours d\'examen</span>';
    else pied = '<button class="lien-avis lien-signaler" data-signaler="' + avis.id + '">Signaler</button>';
    return '<article class="avis-play' + (mien ? " avis-mien" : "") + '">' +
      '<div class="avis-tete"><span class="avatar-play" aria-hidden="true">' + initiales(avis.pseudo) + "</span>" +
      '<div class="avis-auteur"><span class="avis-nom">' + avis.pseudo + (mien ? " <small>· Ton avis</small>" : "") + "</span>" +
      '<span class="avis-note">' + etoiles(avis.note, 18) + '<span class="avis-date">' + dateCourte(avis.date) + "</span></span></div></div>" +
      (avis.texte ? '<p class="avis-texte' + (long ? " replie" : "") + '">' + avis.texte + "</p>" +
        (long ? '<button class="lien-avis" data-lire-suite>Lire la suite</button>' : "") : "") +
      '<div class="avis-pied">' + pied + "</div>" +
      "</article>";
  }

  /* Gestes communs aux listes d'avis : « Lire la suite » et « Signaler » (S10-03) */
  function brancherAvis(conteneur, j) {
    conteneur.querySelectorAll("[data-lire-suite]").forEach((bouton) => bouton.addEventListener("click", () => {
      bouton.previousElementSibling.classList.remove("replie");
      bouton.remove();
    }));
    conteneur.querySelectorAll("[data-signaler]").forEach((bouton) => bouton.addEventListener("click", () => {
      ouvrirSignalement(avisDesJoueurs(j).find((a) => a.id === bouton.dataset.signaler));
    }));
  }

  /* Feuille de signalement : motif obligatoire, puis envoi en modération */
  function ouvrirSignalement(avis) {
    const motifs = ["Insultant", "Hors sujet", "Publicité", "Autre"];
    const voile = feuille(
      '<p class="demo-titre">Signaler cet avis</p>' +
      '<p class="demo-aide">L\'avis de ' + avis.pseudo + " sera examiné par l'équipe Max it de ton pays.</p>" +
      '<div class="motifs-play" role="radiogroup" aria-label="Motif">' + motifs.map((m) =>
        '<label class="motif-play"><input type="radio" name="motif" value="' + m + '"><span>' + m + "</span></label>").join("") + "</div>" +
      '<button class="bouton bouton-primaire bouton-pleine-largeur" id="envoyer-signalement" disabled>Envoyer le signalement</button>' +
      '<button class="bouton bouton-secondaire bouton-pleine-largeur bouton-annuler" data-fermer>Annuler</button>',
      "Signaler un avis",
      "feuille-sombre"
    );
    const envoyer = voile.querySelector("#envoyer-signalement");
    voile.querySelectorAll('input[name="motif"]').forEach((r) => r.addEventListener("change", () => { envoyer.disabled = false; }));
    envoyer.addEventListener("click", () => {
      voile.remove();
      signaler(avis.id);
      Nav.toast("Avis signalé : il sera examiné");
    });
  }

  return {
    pays, infosPays, jeu, partenaire, genre, disponible, catalogue,
    recents, favoris, estFavori, basculerFavori, enregistrerLancement,
    pseudo, aLance, monAvis, enregistrerAvis, supprimerAvis, dateCourte, avisDesJoueurs, moyenne, repartition,
    estSignale, carteAvis, brancherAvis,
    aLaUne, recommandes, nouveautes, populaires, genresVisibles, jeuxDuGenre, similaires,
    ici, depuis, url, lienFiche, jeuDeLaPage, monter,
    icone, etoiles, note, pictoGenre, visuel, tuile, rangee, feuille
  };
})();
