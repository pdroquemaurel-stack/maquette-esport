/* Fonctions communes aux écrans de Max it Gaming Play (p01 à p10, pv1 à pv3) : langue et sens de lecture,
   catalogue visible dans le pays, historique du joueur (récents, favoris, lancements), pseudos,
   classements, avis, visuels SVG des jeux et des genres, tuiles, rangées et feuilles du bas.
   Les données viennent de js/data-play.js, les textes de js/textes-play.js ;
   l'état de la démo est mémorisé par js/nav.js (Etat). */

const Play = (function () {

  /* =====================================================================
     Langue : français, anglais ou arabe (menu de démo) ; l'arabe se lit de droite à gauche
     ===================================================================== */

  function langue() { return TEXTES_PLAY[Etat.get("playLangue")] ? Etat.get("playLangue") : "fr"; }
  function rtl() { return langue() === "ar"; }

  /* Texte traduit : t("accueil.titre"), t("commun.avis", { n: 12 }) ; repli sur le français */
  function t(cle, variables) {
    const valeur = cle in TEXTES_PLAY[langue()] ? TEXTES_PLAY[langue()][cle] : TEXTES_PLAY.fr[cle];
    if (valeur === undefined) return cle;
    return typeof valeur === "function" ? valeur(variables || {}) : valeur;
  }

  /* Langue et sens de la page, et textes fixes du HTML :
     data-t="cle" (contenu), data-t-aria="cle" (étiquette pour les lecteurs d'écran) */
  function appliquerLangue() {
    document.documentElement.lang = langue();
    document.documentElement.dir = rtl() ? "rtl" : "ltr";
    document.querySelectorAll("[data-t]").forEach((e) => { e.textContent = t(e.dataset.t); });
    document.querySelectorAll("[data-t-aria]").forEach((e) => { e.setAttribute("aria-label", t(e.dataset.tAria)); });
  }

  /* Nombre avec la virgule en français (« 4,5 ») */
  function decimal(n) { return langue() === "fr" ? n.toFixed(1).replace(".", ",") : n.toFixed(1); }
  /* Nombre avec séparateur de milliers (« 12 400 ») */
  function entier(n) { return langue() === "fr" ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ") : String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }

  /* =====================================================================
     Catalogue visible par le joueur
     ===================================================================== */

  function pays() { return Etat.get("playPays") || PLAY.paysParDefaut; }
  function infosPays() { return PLAY.pays[pays()]; }
  function nomPays() { return t("pays." + pays()); }
  function jeu(id) { return PLAY.jeux.find((j) => j.id === id) || null; }
  function partenaire(j) { return PLAY.partenaires[j.partenaire]; }
  function genre(id) { return PLAY.genres.find((g) => g.id === id) || null; }
  function nomGenre(id) { return t("genre." + id); }

  /* Jeux momentanément indisponibles (S08-03) : forcé par le menu de démo */
  function indisponibles() { return Etat.get("playIndispo") ? [PLAY.demo.jeuIndisponible] : []; }

  /* Un jeu est visible s'il est proposé dans le pays (S02-04) et disponible (S08-03) */
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
     Un favori indisponible est seulement masqué : il retrouve sa place quand il revient (S08-03). */
  function favoris() { return idsFavoris().map(jeu).filter(disponible); }
  function estFavori(id) { return idsFavoris().includes(id); }
  function basculerFavori(id) {
    let ids = idsFavoris();
    const ajoute = !ids.includes(id);
    ids = ajoute ? [id].concat(ids) : ids.filter((x) => x !== id);
    Etat.set("playFavoris", ids);
    return ajoute;
  }

  /* Chaque lancement alimente les récents, les statistiques et les classements (S08-01) */
  function enregistrerLancement(id) {
    Etat.set("playRecents", [id].concat(idsRecents().filter((x) => x !== id)).slice(0, 10));
    const lances = idsLances();
    if (!lances.includes(id)) Etat.set("playLances", lances.concat(id));
  }

  /* Le joueur ne peut noter qu'un jeu qu'il a lancé au moins une fois (S10-01) */
  function aLance(id) { return idsLances().includes(id); }

  /* =====================================================================
     Pseudos (S11-01) : au MVP, pas de profil joueur ; un pseudo généré automatiquement
     (« Joueur4821 ») s'affiche dans les classements et sous les avis.
     Sur les écrans V2 (pv…, ou « v2=1 »), le pseudo choisi s'affiche et ouvre le profil.
     ===================================================================== */

  function v2() { return /^pv/.test(pageCourante()) || Nav.param("v2") === "1"; }

  /* Pseudo choisi du joueur (commun avec la plateforme de tournois) */
  function pseudo() { return Etat.get("pseudo") || PLAY.joueur.pseudo; }

  /* Nombre tiré d'un texte : valeurs fictives stables d'une page à l'autre */
  function graine(texte) { return String(texte).split("").reduce((n, c) => (n * 31 + c.charCodeAt(0)) % 99991, 7); }

  /* Pseudo généré d'un autre joueur : « Joueur » + 4 chiffres tirés de son pseudo */
  function pseudoGenere(nom) {
    let numero = 1000 + (graine(nom) * 7919) % 9000;
    if (numero === 4821) numero = 4822;
    return "Joueur" + numero;
  }
  /* Nom affiché d'un joueur, et le mien */
  function nomAffiche(nom) { return v2() ? nom : pseudoGenere(nom); }
  function monNom() { return v2() ? pseudo() : PLAY.joueur.pseudoGenere; }

  /* Lien vers le profil d'un joueur (V2, S11-02) ; null hors V2 */
  function lienProfil(nom) {
    if (!v2()) return null;
    return nom === pseudo() ? "pv1-profil.html" : "pv1-profil.html?" + new URLSearchParams({ joueur: nom }).toString();
  }
  /* Pseudo affiché, cliquable en V2 */
  function pseudoHtml(nom, classe) {
    const lien = lienProfil(nom);
    const texte = nom === pseudo() ? monNom() : nomAffiche(nom);
    return lien ? '<a class="' + (classe || "") + ' lien-pseudo" href="' + lien + '">' + texte + "</a>"
      : '<span class="' + (classe || "") + '">' + texte + "</span>";
  }

  /* Générateur pseudo-aléatoire à graine (mulberry32) : classements et profils fictifs */
  function hasard(graineDepart) {
    let a = graineDepart >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) >>> 0;
      let x = Math.imul(a ^ (a >>> 15), 1 | a);
      x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
      return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* =====================================================================
     Avis des joueurs (E10)
     ===================================================================== */

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

  /* Commentaires des autres joueurs du pays, du plus récent au plus ancien (S10-02) */
  function avisDesJoueurs(j) {
    const pool = PLAY.avisJoueurs;
    const auteurs = PLAY.joueurs[pays()];
    const g = graine(j.id);
    const nombre = 6 + (g % 5);
    const resultat = [];
    for (let i = 0; i < nombre; i++) {
      const modele = pool[(g + i * 5) % pool.length];
      const date = new Date(2026, 9, 8 - i * 4 - (g % 3));
      resultat.push({
        id: j.id + "-" + i,
        pseudo: auteurs[(g + i * 3) % auteurs.length],
        note: modele.note,
        texte: modele.texte,
        date: date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0")
      });
    }
    return resultat;
  }

  /* Avis signalés par le joueur (S10-03) : masqués tout de suite de la liste */
  function idsSignales() { return (Etat.get("playSignales") || []).slice(); }
  function estSignale(idAvis) { return idsSignales().includes(idAvis); }
  function signaler(idAvis) { Etat.set("playSignales", idsSignales().concat(idAvis)); }
  function avisVisibles(j) { return avisDesJoueurs(j).filter((a) => !estSignale(a.id)); }

  /* Note moyenne et nombre d'avis, avis du joueur compris, avis masqués exclus (S10-02, S04-01) */
  function moyenne(j) {
    const masques = avisDesJoueurs(j).filter((a) => estSignale(a.id)).length;
    const mien = monAvis(j.id);
    const nombre = j.avis - masques;
    if (!mien) return { note: j.note, nombre: nombre };
    return { note: (j.note * nombre + mien.note) / (nombre + 1), nombre: nombre + 1 };
  }
  function note(j) { return decimal(moyenne(j).note); }

  /* Répartition des notes de 5 à 1 étoiles, en pourcentage, autour de la moyenne */
  function repartition(j) {
    const m = moyenne(j).note;
    const poids = [5, 4, 3, 2, 1].map((k) => Math.exp(-Math.pow(k - m, 2) / 0.9));
    const total = poids.reduce((a, b) => a + b, 0);
    return poids.map((p) => Math.round(p / total * 100));
  }

  /* Jeux signalés par le joueur (S10-04) : un même jeu au plus une fois par jour */
  function dejaSignaleAujourdhui(id) { return (Etat.get("playJeuxSignales") || {})[id] === aujourdhui(); }
  function signalerJeu(id) {
    const signales = Object.assign({}, Etat.get("playJeuxSignales") || {});
    signales[id] = aujourdhui();
    Etat.set("playJeuxSignales", signales);
  }

  /* =====================================================================
     Classements du jeu : jour, semaine, tout temps, propres au pays (S07-04)
     ===================================================================== */

  const PERIODES = ["jour", "semaine", "tout"];
  /* Le partenaire transmet-il les scores ? Sinon, pas de classement */
  function aUnClassement(j) { return partenaire(j).scores; }

  /* Ma position sur une période (null : pas classé) ; precedent : jour ou semaine précédents */
  function maPosition(j, periode, precedent) {
    if (!aLance(j.id)) return null;
    const fixees = !Etat.get("playNouveau") && PLAY.mesPositions[j.id];
    if (fixees && !precedent && fixees[periode] !== undefined) return fixees[periode];
    const r = hasard(graine(j.id + periode + pays() + (precedent ? "-p" : "")))();
    if (precedent && r < 0.3) return null;
    return { jour: 4 + Math.floor(r * 90), semaine: 15 + Math.floor(r * 180), tout: 120 + Math.floor(r * 600) }[periode];
  }

  /* Classement complet : les 100 premiers, puis ma position.
     Renvoie { liste: [{ rang, pseudo, score, moi }], moi: { rang, score } | null } */
  function classement(j, periode, precedent) {
    const alea = hasard(graine(j.id + "|" + periode + "|" + pays() + (precedent ? "|p" : "")));
    const pool = PLAY.joueurs[pays()];
    // Score du premier selon la période, puis des écarts décroissants
    let score = Math.round({ jour: 2400, semaine: 9800, tout: 48000 }[periode] * (0.8 + alea() * 0.4));
    const pas = { jour: 22, semaine: 80, tout: 380 }[periode];
    const ordre = pool.map((p, i) => i).sort(() => alea() - 0.5);
    const position = maPosition(j, periode, precedent);
    const resultat = [];
    for (let rang = 1; rang <= 100; rang++) {
      const i = ordre[(rang - 1) % pool.length];
      const nom = rang <= pool.length ? pool[i] : pool[i] + (rang + 10);
      resultat.push({ rang: rang, pseudo: nom, score: score, moi: rang === position });
      score -= Math.max(1, Math.round(pas * (0.4 + alea())));
    }
    let moi = null;
    if (position) {
      const monScore = position <= 100 ? resultat[position - 1].score : Math.max(10, score - (position - 100) * Math.round(pas / 3));
      if (position <= 100) resultat[position - 1].pseudo = pseudo();
      moi = { rang: position, score: monScore };
    }
    return { liste: resultat, moi: moi };
  }

  /* Phrase d'encouragement selon ma position */
  function encouragement(rang, periode) {
    if (!rang) return t("classement.pasClasse");
    if (rang <= 20) return t({ jour: "classement.bravoJour", semaine: "classement.bravoSemaine", tout: "classement.bravoTout" }[periode], { rang: rang });
    return t("classement.continue", { rang: rang });
  }

  /* Meilleures positions du joueur, tous jeux confondus (profil V2, S11-02) */
  function meilleuresPositions() {
    const positions = [];
    idsLances().map(jeu).filter((j) => disponible(j) && aUnClassement(j)).forEach((j) => {
      PERIODES.forEach((p) => {
        const rang = maPosition(j, p);
        if (rang) positions.push({ jeu: j, periode: p, rang: rang });
      });
    });
    return positions.sort((a, b) => a.rang - b.rang).slice(0, 3);
  }

  /* =====================================================================
     Sections de l'accueil (S06-02)
     ===================================================================== */

  /* Jeu à la une du pays, sinon celui du responsable MEA (S03-01) */
  function aLaUne() {
    const candidats = [jeu(infosPays().aLaUne), jeu(PLAY.aLaUneMEA)].concat(parPopularite(catalogue()));
    return candidats.find(disponible) || null;
  }

  /* « Recommandé pour vous » : sélection du responsable local, la même pour tous au MVP ;
     un jeu masqué en est retiré automatiquement (S03-04). Personnalisation : V2 (S09-03). */
  function recommandes() { return infosPays().recommandes.map(jeu).filter(disponible); }

  /* Nouveautés : publiés depuis moins de 30 jours, du plus récent au plus ancien (S03-03) */
  function nouveautes() { return catalogue().filter((j) => j.publie < 30).sort((a, b) => a.publie - b.publie); }

  /* Rangées par genre, dans l'ordre du pays, si le genre a au moins un jeu (S06-02, S03-05) */
  function genresVisibles() {
    return infosPays().ordreGenres.map(genre).filter((g) => catalogue().some((j) => j.genre === g.id));
  }
  /* Jeux d'un genre, par popularité dans le pays (S03-05) */
  function jeuxDuGenre(idGenre) {
    return parPopularite(catalogue().filter((j) => idGenre === "tous" || j.genre === idGenre));
  }

  /* Jeux similaires : même genre, sans le jeu de la fiche, par popularité (S07-05) */
  function similaires(j) { return jeuxDuGenre(j.genre).filter((x) => x.id !== j.id).slice(0, 8); }

  /* =====================================================================
     Profil joueur (V2, S11-02)
     ===================================================================== */

  /* Statistiques d'un joueur : les miennes (nom absent ou mon pseudo), sinon fictives et stables */
  function statistiques(nom) {
    if (!nom || nom === pseudo()) {
      const lances = idsLances().map(jeu).filter(Boolean);
      const nouveau = Etat.get("playNouveau");
      const s = PLAY.joueur.stats;
      const temps = lances.map((j) => ({ jeu: j, minutes: nouveau ? 6 : (s.temps[j.id] || 12) }))
        .sort((a, b) => b.minutes - a.minutes);
      return {
        pseudo: pseudo(), moi: true,
        parties: nouveau ? lances.length : s.parties,
        partiesSemaine: nouveau ? lances.length : s.partiesSemaine,
        jeux: lances.length,
        genre: genrePrefere(lances),
        serie: nouveau ? Math.min(1, lances.length) : s.serie,
        positions: meilleuresPositions(),
        favoris: idsFavoris().length,
        avis: Object.keys(tousMesAvis()).length,
        temps: temps
      };
    }
    // Autre joueur : valeurs tirées de son pseudo
    const alea = hasard(graine(nom + pays()));
    const jeux = parPopularite(catalogue()).filter(() => alea() < 0.35).slice(0, 5);
    if (!jeux.length) jeux.push(parPopularite(catalogue())[0]);
    const positions = jeux.filter(aUnClassement).slice(0, 3).map((j, i) => ({
      jeu: j, periode: PERIODES[i % 3], rang: 1 + Math.floor(alea() * (i === 0 ? 5 : 60))
    })).sort((a, b) => a.rang - b.rang);
    return {
      pseudo: nom, moi: false,
      parties: 40 + Math.floor(alea() * 400),
      partiesSemaine: 3 + Math.floor(alea() * 40),
      jeux: jeux.length + Math.floor(alea() * 6),
      genre: genrePrefere(jeux),
      serie: 1 + Math.floor(alea() * 12),
      positions: positions,
      favoris: Math.floor(alea() * 9),
      avis: Math.floor(alea() * 7),
      temps: jeux.map((j) => ({ jeu: j, minutes: 10 + Math.floor(alea() * 400) })).sort((a, b) => b.minutes - a.minutes)
    };
  }
  function genrePrefere(jeux) {
    const compte = {};
    jeux.forEach((j) => { compte[j.genre] = (compte[j.genre] || 0) + 1; });
    const meilleur = Object.keys(compte).sort((a, b) => compte[b] - compte[a])[0];
    return meilleur || null;
  }
  /* « 6 h 52 min » */
  function duree(minutes) { return t("profil.heures", { h: Math.floor(minutes / 60), m: minutes % 60 }); }

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
    return valeur && /^pv?\d+-[\w-]+\.html(\?[\w=&%.-]*)?$/.test(valeur) ? valeur : "p01-accueil.html";
  }

  /* Adresse d'un écran ; sur un écran V2, les écrans de Play ouverts restent en V2 */
  function url(page, params) {
    const p = Object.assign({}, params);
    if (v2() && /^p\d/.test(page)) p.v2 = "1";
    const texte = new URLSearchParams(p).toString();
    return page + (texte ? "?" + texte : "");
  }
  function lienFiche(id, origine) { return url("p03-jeu.html", { jeu: id, depuis: origine || ici() }); }

  /* Un jeu indisponible ou inconnu n'a pas de fiche : retour à l'accueil avec un message (S08-03) */
  function jeuDeLaPage() {
    const j = jeu(Nav.param("jeu"));
    if (!disponible(j)) {
      ouvrirPage("p01-accueil.html?indispo=1");
      return null;
    }
    return j;
  }

  /* Rendu au chargement et à chaque changement d'état (menu de démo), dans la langue choisie */
  function monter(fn) {
    const rendre = () => { appliquerLangue(); fn(); };
    document.addEventListener("DOMContentLoaded", rendre);
    document.addEventListener("etat-change", rendre);
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
    sansPub: '<path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm6.3 5.1L7.1 18.3A8 8 0 0 0 18.3 7.1zM12 4a8 8 0 0 0-6.3 12.9L16.9 5.7A8 8 0 0 0 12 4z"/>',
    copier: '<path d="M8 3h11a2 2 0 0 1 2 2v11h-2V5H8zM5 7h10a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2zm0 2v11h10V9z"/>',
    message: '<path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2zm0 2v11.2L7.2 16H20V6z"/>',
    discussion: '<path d="M12 3c5 0 9 3.6 9 8s-4 8-9 8c-1.1 0-2.2-.2-3.2-.5L4 20l1.3-3.9A7.6 7.6 0 0 1 3 11c0-4.4 4-8 9-8zm-4 7a1.3 1.3 0 1 0 0 2.6A1.3 1.3 0 0 0 8 10zm4 0a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6zm4 0a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6z"/>',
    reseau: '<path d="M7 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm10-6a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 12a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM9.6 10.6l4.8-2.8 1 1.7-4.8 2.8zm0 2.8 1-1.7 4.8 2.8-1 1.7z"/>',
    hub: '<path d="M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 0h7v7h-7z"/>',
    drapeau: '<path d="M5 3h2v1h11l-2.5 4.5L18 13H7v8H5zm2 3v5h7.6L13 8.5 14.6 6z"/>',
    trophee: '<path d="M7 3h10v2h3v3a4 4 0 0 1-4 4h-.3A5 5 0 0 1 13 14.9V18h3v3H8v-3h3v-3.1A5 5 0 0 1 8.3 12H8a4 4 0 0 1-4-4V5h3zm0 4H6v1a2 2 0 0 0 1 1.7zm10 0v2.7A2 2 0 0 0 18 8V7z"/>',
    flamme: '<path d="M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 1.5-5 3-6 0 2 1 3 2 3-1-3 0-6 1-9z"/>',
    manette: '<path d="M7 7h10a5 5 0 0 1 5 5l.4 4.3c.3 2.6-2.8 4-4.6 2.2L15.5 16h-7l-2.3 2.5C4.4 20.3 1.3 18.9 1.6 16.3L2 12a5 5 0 0 1 5-5zm0 3v1.5H5.5v2H7V15h2v-1.5h1.5v-2H9V10zm9.5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zm-2 2.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z"/>',
    horloge: '<path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm1 3v5.4l3.6 2.1-1 1.7L11 13.6V7z"/>',
    envoyer: '<path d="M3 20.5 21 12 3 3.5 3 10l12 2-12 2z"/>',
    etincelles: '<path d="M10 3l1.6 4.4L16 9l-4.4 1.6L10 15l-1.6-4.4L4 9l4.4-1.6zm8 9 .9 2.1L21 15l-2.1.9L18 18l-.9-2.1L15 15l2.1-.9z"/>',
    coche: '<path d="M9.5 16.2 5.3 12l-1.4 1.4 5.6 5.6 11-11-1.4-1.4z"/>'
  };
  /* Icônes qui montrent une direction : retournées en arabe (lecture de droite à gauche) */
  const DIRECTIONNELLES = ["retour", "chevron", "envoyer"];

  function icone(nom, classe) {
    const miroir = DIRECTIONNELLES.includes(nom) ? " miroir" : "";
    return '<svg viewBox="0 0 24 24" aria-hidden="true" class="' + (classe || "f-play-text") + miroir + '">' + ICONES[nom] + "</svg>";
  }

  /* Note en étoiles (pleines jusqu'à la note arrondie) */
  function etoiles(valeur, taille) {
    let html = '<span class="etoiles" aria-hidden="true">';
    for (let i = 1; i <= 5; i++) {
      html += '<svg viewBox="0 0 24 24" style="width:' + taille + "px;height:" + taille + 'px" class="' +
        (i <= Math.round(valeur) ? "f-play-star" : "f-play-chip") + '">' + ICONES.etoile + "</svg>";
    }
    return html + "</span>";
  }

  /* Étiquette « V2 » des écrans et blocs hors MVP */
  function etiquetteV2() { return '<span class="etiquette-v2" title="' + t("commun.v2Aide") + '">' + t("commun.v2") + "</span>"; }

  /* =====================================================================
     Pictogrammes des genres : dessins blancs sur pastille de la couleur du genre,
     détails dans la couleur du genre (g2) ; sans personnage ni marque.
     ===================================================================== */

  const PICTOS_GENRES = {
    action: '<path class="g1" d="M27 4 10 27h11l-3 17 19-25H26z"/>',
    arcade: '<rect class="g1" x="8" y="30" width="32" height="12" rx="6"/><rect class="g1" x="22" y="15" width="4" height="16" rx="2"/>' +
      '<circle class="g1" cx="24" cy="12" r="7"/><circle class="g2" cx="33" cy="36" r="2.6"/>',
    course: '<path class="g1" d="M7 31l3-9c1.2-3.4 3.4-5 7-5h14c3.6 0 5.8 1.6 7 5l3 9v6H7z"/><path class="g2" d="M15.5 20.5h17l2 7h-21z"/>' +
      '<circle class="g1" cx="15" cy="37" r="5.5"/><circle class="g2" cx="15" cy="37" r="2.2"/><circle class="g1" cx="33" cy="37" r="5.5"/><circle class="g2" cx="33" cy="37" r="2.2"/>',
    puzzle: '<rect class="g1" x="9" y="15" width="25" height="25" rx="5"/><circle class="g1" cx="21.5" cy="13" r="5.5"/><circle class="g1" cx="36" cy="27.5" r="5.5"/>' +
      '<circle class="g2" cx="21.5" cy="27.5" r="3"/>',
    casual: '<ellipse class="g1" cx="24" cy="19" rx="12.5" ry="14"/><path class="g1" d="M21 32h6l-3 4.5z"/>' +
      '<path class="gs1" d="M24 36c-3 3 3 5 0 8" fill="none" stroke-width="2.4" stroke-linecap="round"/><ellipse class="g2" cx="19.5" cy="14" rx="2.6" ry="4.2" opacity=".5"/>',
    sport: '<circle class="g1" cx="24" cy="24" r="17"/><path class="g2" d="M24 16.5l7.2 5.2-2.8 8.5h-8.8l-2.8-8.5z"/>' +
      '<circle class="g2" cx="24" cy="8.5" r="2.6"/><circle class="g2" cx="39" cy="20" r="2.6"/><circle class="g2" cx="9" cy="20" r="2.6"/>' +
      '<circle class="g2" cx="33" cy="37.5" r="2.6"/><circle class="g2" cx="15" cy="37.5" r="2.6"/>',
    cartes: '<rect class="g1" x="7" y="10" width="20" height="28" rx="4" transform="rotate(-12 17 24)" opacity=".75"/>' +
      '<g transform="rotate(8 30 24)"><rect class="g1" x="20" y="9" width="20" height="29" rx="4"/>' +
      '<path class="g2" d="M30 21.5c-1.6-2.6-5.6-1.4-5 1.6.4 1.8 2.6 3.6 5 5.6 2.4-2 4.6-3.8 5-5.6.6-3-3.4-4.2-5-1.6z"/></g>',
    quiz: '<path class="g1" d="M9 8h30a5 5 0 0 1 5 5v15a5 5 0 0 1-5 5H23l-9 8v-8H9a5 5 0 0 1-5-5V13a5 5 0 0 1 5-5z"/>' +
      '<path class="gs2" d="M19.5 16.5a4.5 4.5 0 1 1 6 4.2c-1.1.5-1.5 1.2-1.5 2.3v.8" fill="none" stroke-width="3" stroke-linecap="round"/><circle class="g2" cx="24" cy="28" r="2"/>',
    aventure: '<circle class="g1" cx="24" cy="24" r="17"/><path class="g2" d="M31.5 14.5 27 27l-10.5 6.5L21 21z"/><circle class="g1" cx="24" cy="24" r="2.4"/>',
    strategie: '<path class="g1" d="M9 42V19h6v5h4v-5h4v5h2v-5h4v5h4v-5h6v23z"/><path class="g2" d="M20 42v-8a4 4 0 0 1 8 0v8z"/>' +
      '<path class="g1" d="M23 6h2v8h-2z"/><path class="g1" d="M25 6h8l-2 3 2 3h-8z"/>',
    tous: '<circle class="g1" cx="12" cy="24" r="5"/><circle class="g1" cx="24" cy="24" r="5"/><circle class="g1" cx="36" cy="24" r="5"/>'
  };

  /* Pastille d'un genre : pictogramme blanc sur la couleur du genre */
  function pastilleGenre(id, classe) {
    const couleur = id === "tous" ? "var(--color-primary)" : "var(--play-g-" + id + ")";
    return '<span class="pastille-genre ' + (classe || "") + '" style="--gc: ' + couleur + '" aria-hidden="true">' +
      '<svg viewBox="0 0 48 48" class="picto-genre">' + PICTOS_GENRES[id] + "</svg></span>";
  }

  /* =====================================================================
     Visuels des jeux sans image : dégradé de deux couleurs vives, bulles douces et pictogramme.
     p1 : blanc ; p2 : couleur foncée de la palette ; p3 : couleur claire.
     ===================================================================== */

  /* Palettes : deux couleurs de genre de tokens.css (foncée, claire) */
  const PALETTES = {
    flamme: ["--play-g-action", "--play-g-sport"],
    nuit: ["--play-g-quiz", "--play-g-course"],
    foret: ["--play-g-puzzle", "--play-g-strategie"],
    violet: ["--play-g-arcade", "--play-g-casual"],
    neon: ["--play-g-casual", "--play-g-arcade"],
    or: ["--play-g-aventure", "--play-g-sport"],
    terre: ["--play-g-aventure", "--play-g-action"],
    sable: ["--play-g-cartes", "--play-g-sport"]
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

  /* Pictogramme du jeu, centré en (cx, cy), de taille t, sur un disque clair */
  function picto(j, cx, cy, t) {
    const k = t / 48;
    return '<g transform="translate(' + (cx - t / 2) + " " + (cy - t / 2) + ") scale(" + k + ')">' +
      '<circle class="p1" cx="24" cy="24" r="27" opacity=".22"/>' + PICTOS[j.picto] + "</g>";
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

    // Bulles douces en fond (sans déborder à droite du visuel)
    scene += '<circle class="p1" opacity=".16" cx="' + l * 0.82 + '" cy="' + h * 0.18 + '" r="' + Math.min(l * 0.16, petit * 0.28) + '"/>';
    scene += '<circle class="p1" opacity=".12" cx="' + l * 0.1 + '" cy="' + h * 0.9 + '" r="' + petit * 0.34 + '"/>';
    scene += '<circle class="p1" opacity=".2" cx="' + l * 0.2 + '" cy="' + h * 0.2 + '" r="' + petit * 0.06 + '"/>';

    if (variante === "carte") {
      scene += picto(j, l * 0.5, h * 0.36, petit * 0.42);
    } else if (variante === "capture-1") {
      // Écran de jeu : barre de score arrondie et pictogramme
      scene += '<rect class="p1" opacity=".35" x="' + l * 0.06 + '" y="' + h * 0.05 + '" width="' + l * 0.88 + '" height="' + h * 0.07 + '" rx="' + h * 0.035 + '"/>';
      scene += '<rect class="p1" x="' + l * 0.09 + '" y="' + h * 0.072 + '" width="' + l * 0.4 + '" height="' + h * 0.026 + '" rx="' + h * 0.013 + '"/>';
      scene += picto(j, l * 0.5, h * 0.55, petit * 0.62);
    } else if (variante === "capture-2") {
      // Grille de niveaux
      for (let ligne = 0; ligne < 3; ligne++) {
        for (let col = 0; col < 2; col++) {
          scene += picto(j, l * (0.3 + col * 0.4), h * (0.22 + ligne * 0.28), petit * 0.26);
        }
      }
    } else if (variante === "capture-3") {
      // Collines et soleil
      scene += '<circle class="p3" cx="' + l * 0.5 + '" cy="' + h * 0.42 + '" r="' + petit * 0.26 + '"/>';
      scene += '<path class="p1" opacity=".35" d="M0 ' + h * 0.62 + "Q" + l * 0.3 + " " + h * 0.52 + " " + l * 0.55 + " " + h * 0.62 + "T" + l + " " + h * 0.6 + "V" + h + "H0z\"/>";
      scene += picto(j, l * 0.5, h * 0.8, petit * 0.3);
    } else if (variante === "partie") {
      // Décor de partie : sol arrondi, plateformes et pictogramme du joueur
      scene += '<rect class="p1" opacity=".3" y="' + h * 0.78 + '" width="' + l + '" height="' + h * 0.22 + '" rx="' + h * 0.04 + '"/>';
      [0.15, 0.42, 0.7].forEach((x, i) => {
        scene += '<rect class="p1" opacity=".4" x="' + l * x + '" y="' + h * (0.58 - i * 0.08) + '" width="' + l * 0.16 + '" height="' + h * 0.04 + '" rx="' + h * 0.02 + '"/>';
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

  /* Tuile d'un jeu : icône, nom et note moyenne ; mène toujours à la fiche (S06-04).
     Identique quel que soit le partenaire et le modèle d'intégration.
     Encadré « Sans pub » sur le visuel des jeux sans publicité (badge du backlog en V2, S02-05 ;
     affiché sur les tuiles dès le MVP à la demande du 2026-10-12).
     lien : adresse de la fiche, si ce n'est pas p03 (écrans V2) ; suite : HTML ajouté sous la note. */
  function tuile(j, origine, lien, suite) {
    return '<a href="' + (lien || lienFiche(j.id, origine)) + '" class="tuile-play">' +
      '<span class="visuel-tuile">' + visuel(j, 156, 146, "tuile") +
      (j.sansPub ? '<span class="badge-tuile">' + icone("sansPub", "f-play-free") + t("fiche.badgeSansPub") + "</span>" : "") + "</span>" +
      '<span class="tuile-nom">' + j.nom + "</span>" +
      '<span class="tuile-note" aria-label="' + t("commun.note", { note: note(j) }) + '">' + icone("etoile", "f-play-star") + note(j) + "</span>" +
      (suite || "") + "</a>";
  }

  /* Rangée horizontale de tuiles, avec son titre (masquée si vide).
     options : { genre : pastille du genre devant le titre ; voirTout : lien « Voir tout » } */
  function rangee(titre, jeux, origine, options) {
    if (!jeux.length) return "";
    const o = options || {};
    return '<section class="section-play"><h2 class="titre-play">' +
      (o.genre ? pastilleGenre(o.genre, "pastille-titre") : "") + "<span>" + titre + "</span>" +
      (o.voirTout ? '<a href="' + o.voirTout + '" class="voir-tout-play">' + t("commun.voirTout") + icone("chevron", "f-primary") + "</a>" : "") +
      "</h2>" +
      '<div class="carrousel rangee-play">' + jeux.map((j) => tuile(j, origine)).join("") + "</div></section>";
  }

  /* Feuille du bas de Play (fond blanc, coins arrondis). Renvoie le voile pour la fermer. */
  function feuille(contenu, etiquette) {
    const telephone = document.querySelector(".telephone");
    const voile = document.createElement("div");
    voile.className = "voile ouvert";
    voile.innerHTML = '<div class="feuille feuille-play" role="dialog" aria-modal="true" aria-label="' + etiquette + '">' +
      '<div class="poignee"></div>' + contenu + "</div>";
    voile.addEventListener("click", (evenement) => {
      if (evenement.target === voile || evenement.target.closest("[data-fermer]")) voile.remove();
    });
    telephone.appendChild(voile);
    return voile;
  }

  /* ---------- Classement : ligne d'un joueur, avec médaille pour le podium ---------- */

  function medaille(rang) {
    return '<span class="medaille medaille-' + rang + '" role="img" aria-label="' + t("classement.medaille", { n: rang }) + '">' +
      '<svg viewBox="0 0 32 32" aria-hidden="true"><path class="ruban" d="M9 2h6l3 9h-6zM23 2h-6l-3 9h6z"/>' +
      '<circle class="disque" cx="16" cy="20" r="10"/></svg><b>' + rang + "</b></span>";
  }

  function ligneClassement(entree, periode) {
    const moi = entree.moi;
    return '<li class="ligne-classement' + (moi ? " ligne-moi" : "") + '">' +
      (entree.rang <= 3 ? medaille(entree.rang) : '<span class="rang-play">' + t("classement.rang", { rang: entree.rang }) + "</span>") +
      '<span class="nom-classement">' + pseudoHtml(entree.pseudo) + (moi ? ' <small class="pastille-toi">' + t("classement.toi") + "</small>" : "") + "</span>" +
      '<span class="score-classement">' + t("classement.points", { n: entier(entree.score) }) + "</span></li>";
  }

  /* Carte « ma place » : mon rang et un encouragement, ou une invitation à jouer (S07-04) */
  function maPlace(moi, periode, precedent) {
    if (!moi) {
      return '<div class="ma-place"><span class="rang-moi">' + icone("manette", "f-play-on-accent") + "</span>" +
        "<p>" + t(precedent ? "classement.pasClasseAvant" : "classement.pasClasse") + "</p></div>";
    }
    return '<div class="ma-place"><span class="rang-moi">' + t("classement.rang", { rang: moi.rang }) + "</span>" +
      "<p>" + (precedent ? t("classement.taPlace") : encouragement(moi.rang, periode)) +
      "<small>" + monNom() + " · " + t("classement.points", { n: entier(moi.score) }) + "</small></p></div>";
  }

  /* ---------- Avis (style de reference/figma-play/06-avis.png) ---------- */

  /* Initiales du pseudo pour l'avatar : « Joueur4821 » → « J4 », « Salma_ElA » → « SE » */
  function initiales(nom) {
    const morceaux = nom.replace(/(\D)(\d)/, "$1 $2").split(/[_.\s]+/).filter(Boolean);
    return (morceaux.length > 1 ? morceaux[0][0] + morceaux[1][0] : morceaux[0].slice(0, 2)).toUpperCase();
  }
  /* Couleur de l'avatar, tirée du pseudo parmi les couleurs des genres */
  function couleurAvatar(nom) { return "var(--play-g-" + PLAY.genres[graine(nom) % PLAY.genres.length].id + ")"; }

  /* Carte d'un avis. mien : avis du joueur (pas de signalement) ; actions : HTML ajouté en bas */
  function carteAvis(avis, mien, actions) {
    const long = avis.texte.length > 110;
    const nom = mien ? pseudo() : avis.pseudo;
    const affiche = mien ? monNom() : nomAffiche(avis.pseudo);
    const pied = mien ? actions || "" : '<button class="lien-avis lien-signaler" data-signaler="' + avis.id + '">' + t("avis.signaler") + "</button>";
    return '<article class="avis-play' + (mien ? " avis-mien" : "") + '">' +
      '<div class="avis-tete"><span class="avatar-play" style="--av: ' + couleurAvatar(affiche) + '" aria-hidden="true">' + initiales(affiche) + "</span>" +
      '<div class="avis-auteur"><span class="avis-nom">' + pseudoHtml(nom) + (mien ? " <small>· " + t("avis.tonAvis") + "</small>" : "") + "</span>" +
      '<span class="avis-note">' + etoiles(avis.note, 18) + '<span class="avis-date">' + dateCourte(avis.date) + "</span></span></div></div>" +
      (avis.texte ? '<p class="avis-texte' + (long ? " replie" : "") + '" dir="ltr" lang="fr">' + avis.texte + "</p>" +
        (long ? '<button class="lien-avis" data-lire-suite>' + t("avis.lireSuite") + "</button>" : "") : "") +
      '<div class="avis-pied">' + pied + "</div>" +
      "</article>";
  }

  /* Gestes communs aux listes d'avis : « Lire la suite » et « Signaler » (S10-03).
     Un avis signalé disparaît aussitôt : apres() redessine la liste. */
  function brancherAvis(conteneur, j, apres) {
    conteneur.querySelectorAll("[data-lire-suite]").forEach((bouton) => bouton.addEventListener("click", () => {
      bouton.previousElementSibling.classList.remove("replie");
      bouton.remove();
    }));
    conteneur.querySelectorAll("[data-signaler]").forEach((bouton) => bouton.addEventListener("click", () => {
      ouvrirSignalement(avisDesJoueurs(j).find((a) => a.id === bouton.dataset.signaler), apres);
    }));
  }

  /* Feuille de signalement d'un avis : motif obligatoire, puis l'avis est masqué (S10-03) */
  function ouvrirSignalement(avis, apres) {
    const motifs = ["motifInsultant", "motifHorsSujet", "motifPub", "motifAutre"];
    const voile = feuille(
      '<p class="feuille-titre">' + t("avis.signalerTitre") + "</p>" +
      '<p class="feuille-aide">' + t("avis.signalerAide") + "</p>" +
      '<div class="motifs-play" role="radiogroup" aria-label="' + t("avis.motif") + '">' + motifs.map((m) =>
        '<label class="motif-play"><input type="radio" name="motif" value="' + m + '"><span>' + t("avis." + m) + "</span></label>").join("") + "</div>" +
      '<button class="bouton-jouer" id="envoyer-signalement" disabled>' + t("avis.envoyer") + "</button>" +
      '<button class="bouton-doux" data-fermer>' + t("commun.annuler") + "</button>",
      t("avis.signalerTitre")
    );
    const envoyer = voile.querySelector("#envoyer-signalement");
    voile.querySelectorAll('input[name="motif"]').forEach((r) => r.addEventListener("change", () => { envoyer.disabled = false; }));
    envoyer.addEventListener("click", () => {
      voile.remove();
      signaler(avis.id);
      if (apres) apres();
      Nav.toast(t("avis.signale"));
    });
  }

  return {
    langue, rtl, t, appliquerLangue, decimal, entier,
    pays, infosPays, nomPays, jeu, partenaire, genre, nomGenre, disponible, catalogue, parPopularite,
    recents, favoris, estFavori, basculerFavori, enregistrerLancement, aLance,
    v2, pseudo, monNom, nomAffiche, pseudoHtml, lienProfil,
    monAvis, enregistrerAvis, supprimerAvis, dateCourte, avisDesJoueurs, avisVisibles, moyenne, repartition,
    carteAvis, brancherAvis, dejaSignaleAujourdhui, signalerJeu,
    PERIODES, aUnClassement, maPosition, classement, encouragement, ligneClassement, medaille, maPlace,
    aLaUne, recommandes, nouveautes, genresVisibles, jeuxDuGenre, similaires,
    statistiques, duree,
    ici, depuis, url, lienFiche, jeuDeLaPage, monter,
    icone, etoiles, etiquetteV2, note, pastilleGenre, visuel, tuile, rangee, feuille
  };
})();
