/* Numéro de version des feuilles de style et des scripts communs, ajouté à leurs liens dans chaque écran :
   <link rel="stylesheet" href="css/style.css?v=3f9a1c2e">, <script src="js/nav.js?v=3f9a1c2e">.
   Le numéro est une empreinte du contenu de css/ et js/ : il change dès qu'un de ces fichiers change.
   Ainsi, après une mise en ligne, le navigateur (et le cache de Render) ne mélange jamais une page neuve
   avec une ancienne feuille de style ou un ancien script.
   Usage, depuis la racine du projet :  node outils/versionner.js
   (lancé aussi par outils/construire-fichier-unique.js, à la fin de chaque lot). Aucune dépendance : Node seul suffit. */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const RACINE = path.join(__dirname, "..");

function versionner() {
  // Empreinte de toutes les feuilles de style et de tous les scripts, dans l'ordre alphabétique
  const empreinte = crypto.createHash("sha1");
  ["css", "js"].forEach((dossier) => {
    fs.readdirSync(path.join(RACINE, dossier)).filter((f) => /\.(css|js)$/.test(f)).sort().forEach((f) => {
      empreinte.update(f);
      empreinte.update(fs.readFileSync(path.join(RACINE, dossier, f)));
    });
  });
  const version = empreinte.digest("hex").slice(0, 8);

  // Écrans : toutes les pages HTML de la racine, sauf le fichier unique (tout y est intégré)
  let modifies = 0;
  fs.readdirSync(RACINE).filter((f) => f.endsWith(".html") && f !== "maquette-esport.html").forEach((fichier) => {
    const chemin = path.join(RACINE, fichier);
    const avant = fs.readFileSync(chemin, "utf8");
    const apres = avant
      .replace(/(href="css\/[\w-]+\.css)(?:\?v=\w+)?"/g, '$1?v=' + version + '"')
      .replace(/(src="js\/[\w-]+\.js)(?:\?v=\w+)?"/g, '$1?v=' + version + '"');
    if (apres !== avant) {
      fs.writeFileSync(chemin, apres);
      modifies++;
    }
  });
  console.log("Version des CSS et JS : " + version + " (" + modifies + " page(s) mise(s) à jour)");
  return version;
}

module.exports = versionner;
if (require.main === module) versionner();
