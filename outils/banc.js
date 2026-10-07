/* Banc d'essai commun aux pages de test (hors maquette).
   Deux modes, choisis par l'adresse de la page de test :
   - par défaut : chaque écran est chargé directement (fichiers séparés) ;
   - « ?unique » : les écrans sont ouverts à travers le routeur de maquette-esport.html.
   La page de test doit contenir <iframe id="f">. */

const Banc = (function () {
  const unique = new URLSearchParams(location.search).has("unique");
  const cadre = document.getElementById("f");
  let fichierUniqueCharge = null;

  /* Cadre qui affiche l'écran : le cadre de test, ou celui du routeur du fichier unique */
  function cadreEcran() {
    return unique ? cadre.contentDocument.getElementById("ecran") : cadre;
  }
  function doc() { return cadreEcran().contentDocument; }
  function win() { return cadreEcran().contentWindow; }

  /* Écran affiché : « 06-tournoi.html?id=t02 » */
  function page() {
    return unique ? cadre.contentWindow.MaquetteRouteur.courant : cadre.contentWindow.location.href.split("/").pop();
  }

  /* Promesse résolue au prochain chargement d'écran (à créer avant le clic) */
  function navigation() {
    const c = cadreEcran();
    return new Promise((fini) => c.addEventListener("load", () => fini(), { once: true }));
  }

  /* Ouvre un écran : « 06-tournoi.html?id=t02 » */
  async function charger(url) {
    if (!unique) {
      const n = navigation();
      cadre.src = "../" + url;
      return n;
    }
    if (!fichierUniqueCharge) {
      fichierUniqueCharge = new Promise((fini) => { cadre.onload = () => fini(); cadre.src = "../maquette-esport.html"; });
      await fichierUniqueCharge;
      await new Promise((fini) => setTimeout(fini, 300));
    }
    const n = navigation();
    cadre.contentWindow.MaquetteRouteur.aller(url);
    return n;
  }

  return { unique, doc, win, page, navigation, charger };
})();
