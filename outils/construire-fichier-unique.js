/* Construit maquette-esport.html : la maquette entière dans un seul fichier, utilisable hors ligne.
   Usage, depuis la racine du projet :  node outils/construire-fichier-unique.js

   Principe :
   - les feuilles de style et les scripts communs (css/, js/) sont intégrés une seule fois ;
   - chaque écran est gardé comme modèle HTML, ses <link> et <script src> remplacés par des repères @@…@@ ;
   - à l'ouverture d'un écran, un petit routeur reconstitue la page complète et l'affiche dans un
     cadre (srcdoc) : chaque écran repart d'une page neuve, comme avec les fichiers séparés ;
   - js/nav.js reconnaît ce routeur (window.parent.MaquetteRouteur) pour la navigation, le retour
     et le stockage (mémoire de secours si le navigateur refuse localStorage pour un fichier local).
   Aucune dépendance : Node seul suffit. */

const fs = require("fs");
const path = require("path");

const RACINE = path.join(__dirname, "..");
const lire = (fichier) => fs.readFileSync(path.join(RACINE, fichier), "utf8");

/* ---- Écrans : ceux du registre de js/nav.js ---- */
const nav = lire("js/nav.js");
const registre = nav.match(/const ECRANS = (\{[\s\S]*?\n\});/);
if (!registre) throw new Error("Registre ECRANS introuvable dans js/nav.js");
const ECRANS = eval("(" + registre[1] + ")");
const fichiersEcrans = Object.values(ECRANS).filter((e) => e.pret).map((e) => e.fichier);

/* ---- Ressources communes ---- */
const CSS = { tokens: lire("css/tokens.css"), style: lire("css/style.css") };
const JS = { data: lire("js/data.js"), nav: nav, esport: lire("js/esport.js"), demo: lire("js/demo.js") };

/* ---- Modèles d'écran : repères à la place des ressources externes ---- */
const PAGES = {};
fichiersEcrans.forEach((fichier) => {
  let html = lire(fichier);
  html = html.replace(/<link rel="stylesheet" href="css\/(\w+)\.css">/g, (m, nom) => {
    if (!CSS[nom]) throw new Error(fichier + " : feuille inconnue css/" + nom + ".css");
    return "@@CSS:" + nom + "@@";
  });
  html = html.replace(/<script src="js\/(\w+)\.js"><\/script>/g, (m, nom) => {
    if (!JS[nom]) throw new Error(fichier + " : script inconnu js/" + nom + ".js");
    return "@@JS:" + nom + "@@";
  });
  // Paramètres de l'écran (page, recherche), injectés en tête par le routeur
  html = html.replace("<head>", "<head>\n@@PARAMS@@");
  // Aucune autre ressource externe ne doit rester
  const externe = html.match(/(?:src|href)="(?!#|data:)[^"]+\.(?:css|js|png|jpg|svg|woff2?)"/);
  if (externe) throw new Error(fichier + " : ressource externe restante " + externe[0]);
  PAGES[fichier] = html;
});

/* ---- Images citées dans js/data.js (visuels des jeux) : intégrées une seule fois ----
   Les écrans les obtiennent par ressource() (js/nav.js), via le routeur. */
const IMAGES = {};
const TYPES_IMAGES = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp" };
(JS.data.match(/"images\/[^"]+\.(?:png|jpe?g|webp)"/g) || []).forEach((guillemets) => {
  const chemin = guillemets.slice(1, -1);
  if (!fs.existsSync(path.join(RACINE, chemin))) { console.warn("Image absente, ignorée : " + chemin); return; }
  IMAGES[chemin] = "data:" + TYPES_IMAGES[path.extname(chemin).toLowerCase()] + ";base64," + fs.readFileSync(path.join(RACINE, chemin)).toString("base64");
});

/* JSON sûr dans une balise <script> : tous les « < » sont échappés */
const donnees = JSON.stringify({ CSS, JS, PAGES, IMAGES, accueil: ECRANS["00a"].fichier }).replace(/</g, "\\u003c");

/* Routeur, écrit comme une fonction normale puis intégré tel quel.
   Il ne contient ni « <script » ni commentaire HTML, pour ne pas troubler la lecture du navigateur. */
function routeur() {
  const D = JSON.parse(document.getElementById("donnees").textContent);
  const cadre = document.getElementById("ecran");
  const OUVRE = "<" + "script>", FERME = "<" + "/script>";

  /* Page complète d'un écran, avec ses styles, ses scripts et ses paramètres */
  function construire(fichier, recherche) {
    const params = OUVRE + "window.__PAGE = " + JSON.stringify(fichier) + "; window.__RECHERCHE = " + JSON.stringify(recherche) + ";" + FERME;
    return D.PAGES[fichier]
      .replace("@@PARAMS@@", () => params)
      .replace(/@@CSS:(\w+)@@/g, (m, nom) => "<style>" + D.CSS[nom] + "</style>")
      .replace(/@@JS:(\w+)@@/g, (m, nom) => OUVRE + D.JS[nom] + FERME);
  }

  function afficher(url) {
    const morceaux = url.split("?");
    const page = D.PAGES[morceaux[0]] ? morceaux[0] : D.accueil;
    const recherche = morceaux[1] && page === morceaux[0] ? "?" + morceaux[1] : "";
    Routeur.courant = page + recherche;
    try { history.replaceState(null, "", "#" + Routeur.courant); } catch (e) { /* adresse non modifiable */ }
    cadre.srcdoc = construire(page, recherche);
  }

  const Routeur = {
    courant: null,
    pile: [],          // écrans précédents, pour le bouton retour
    memoire: {},       // stockage de secours si localStorage est indisponible
    images: D.IMAGES,  // images intégrées, par chemin (« images/jeux/pubg-carre.png »)
    aller(url) {
      if (Routeur.courant) Routeur.pile.push(Routeur.courant);
      afficher(url);
    },
    retour(repli) {
      afficher(Routeur.pile.length ? Routeur.pile.pop() : repli);
    }
  };
  window.MaquetteRouteur = Routeur;

  // Écran de départ : celui de l'adresse (#06-tournoi.html?id=t01), sinon l'accueil Max it
  afficher(decodeURIComponent(location.hash.slice(1)) || D.accueil);
}

const sortie = `<!DOCTYPE html>
<!-- Maquette e-sport Max it — fichier unique, utilisable hors ligne.
     Généré par outils/construire-fichier-unique.js le ${new Date().toISOString().slice(0, 10)} : ne pas modifier à la main. -->
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>Maquette e-sport Max it</title>
  <style>
${CSS.tokens}
    html, body { margin: 0; height: 100%; overflow: hidden; background: var(--color-bg-muted); }
    #ecran { display: block; width: 100%; height: 100vh; height: 100dvh; border: 0; }
  </style>
</head>
<body>
<iframe id="ecran" title="Maquette e-sport Max it"></iframe>
<script id="donnees" type="application/json">${donnees}</script>
<script>
/* Routeur du fichier unique : affiche chaque écran dans le cadre #ecran. */
(${routeur.toString()})();
</script>
</body>
</html>
`;

fs.writeFileSync(path.join(RACINE, "maquette-esport.html"), sortie);
console.log("maquette-esport.html : " + Object.keys(PAGES).length + " écrans, " + Object.keys(IMAGES).length + " images, " + Math.round(sortie.length / 1024) + " Ko");
