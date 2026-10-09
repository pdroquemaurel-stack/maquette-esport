/* Routeur de la maquette : liste des écrans, état de démonstration mémorisé,
   navigation entre les pages, retour à l'écran d'origine, messages éphémères.
   Chaque écran est une page HTML ; ce script est chargé par toutes les pages. */

/* ---- Registre des écrans (voir ecrans.md) ----
   pret : la page existe. Un écran non prêt n'est jamais lié : on affiche un message. */
const ECRANS = {
  "00a": { fichier: "00a-maxit-accueil.html", titre: "Accueil Max it", pret: true },
  "00b": { fichier: "00b-maxit-univers.html", titre: "Tous les univers", pret: true },
  "00c": { fichier: "00c-maxit-gaming.html", titre: "Game corner", pret: true },
  "02": { fichier: "02-pseudo.html", titre: "Choix du pseudo", pret: true },
  "03": { fichier: "03-accueil.html", titre: "Accueil e-sport", pret: true },
  "04": { fichier: "04-calendrier.html", titre: "Calendrier", pret: true },
  "05": { fichier: "05-mes-tournois.html", titre: "Mes matchs", pret: true },
  "06": { fichier: "06-tournoi.html", titre: "Tournoi", pret: true },
  "07": { fichier: "07-reglement.html", titre: "Règlement", pret: true },
  "08": { fichier: "08-inscription-resultat.html", titre: "Inscription", pret: true },
  "09": { fichier: "09-equipe-choix.html", titre: "Créer ou rejoindre", pret: true },
  "10": { fichier: "10-equipe.html", titre: "Mon équipe", pret: true },
  "11": { fichier: "11-match.html", titre: "Salle de match", pret: true },
  "12": { fichier: "12-arbre.html", titre: "Arbre du tournoi", pret: true },
  "13": { fichier: "13-jeu.html", titre: "Page d'un jeu", pret: true },
  "14": { fichier: "14-resultat.html", titre: "Déclarer le résultat", pret: true },
  "15": { fichier: "15-litige.html", titre: "Litige", pret: true },
  "17": { fichier: "17-profil-public.html", titre: "Profil public", pret: true },
  "18": { fichier: "18-video.html", titre: "Vidéo", pret: true },
  "19": { fichier: "19-article.html", titre: "Article", pret: true },
  "20": { fichier: "20-contenus.html", titre: "Contenus", pret: true },
  "21": { fichier: "21-offre.html", titre: "Offre d'abonnement", pret: true },
  "22": { fichier: "22-paiement-maxit.html", titre: "Paiement Max it", pret: true },
  "23": { fichier: "23-profil.html", titre: "Mon profil", pret: true },
  "24": { fichier: "24-abonnement.html", titre: "Mon abonnement", pret: true },
  "25": { fichier: "25-notifications.html", titre: "Notifications", pret: true },
  "26": { fichier: "26-contestation.html", titre: "Contestation", pret: true },
  "27": { fichier: "27-preferences-notif.html", titre: "Préférences", pret: true },
  "28": { fichier: "28-mes-donnees.html", titre: "Mes données", pret: true },
  "29": { fichier: "29-classement-mensuel.html", titre: "Classement MaxPoints", pret: true },
  // Play, la mini app des mini-jeux (2e chantier)
  "p01": { fichier: "p01-accueil.html", titre: "Accueil Play", pret: true },
  "p02": { fichier: "p02-genre.html", titre: "Genre", pret: true },
  "p03": { fichier: "p03-jeu.html", titre: "Fiche jeu", pret: true },
  "p04": { fichier: "p04-transition.html", titre: "Transition vers le hub", pret: true },
  "p05": { fichier: "p05-partie.html", titre: "Partie", pret: true },
  "p06": { fichier: "p06-avis.html", titre: "Tous les avis", pret: true },
  "p07": { fichier: "p07-donner-avis.html", titre: "Donner mon avis", pret: true },
  // Shop, la boutique de jeux (3e chantier, voir ecrans-shop.md)
  "s01": { fichier: "s01-accueil.html", titre: "Accueil du Shop", pret: true },
  "s02": { fichier: "s02-recherche.html", titre: "Recherche", pret: true },
  "s03": { fichier: "s03-jeu.html", titre: "Page d'un jeu", pret: true },
  "s04": { fichier: "s04-produit.html", titre: "Fiche produit", pret: true },
  "s05": { fichier: "s05-compte-jeu.html", titre: "Compte de jeu", pret: true },
  "s06": { fichier: "s06-recapitulatif.html", titre: "Récapitulatif", pret: true },
  "s07": { fichier: "s07-confirmation.html", titre: "Confirmation", pret: true },
  "s08": { fichier: "s08-achats.html", titre: "Mes achats", pret: true },
  "s09": { fichier: "s09-commande.html", titre: "Détail d'une commande", pret: true },
  "s10": { fichier: "s10-signaler.html", titre: "Signaler un problème", pret: true },
  "s11": { fichier: "s11-aide.html", titre: "Aide", pret: true },
  "s12": { fichier: "s12-conditions.html", titre: "Conditions de vente", pret: true }
};

/* ---- Fichier unique (maquette-esport.html) ----
   Chaque écran y est affiché dans un cadre ; le routeur du fichier parent gère la navigation,
   l'historique et le stockage. Hors fichier unique, ROUTEUR vaut null. */
const ROUTEUR = (function () {
  try { return window.parent !== window && window.parent.MaquetteRouteur ? window.parent.MaquetteRouteur : null; }
  catch (e) { return null; }
})();

/* Écran courant et paramètres d'URL, dans les deux modes */
function pageCourante() {
  return ROUTEUR ? window.__PAGE : window.location.pathname.split("/").pop();
}
function rechercheCourante() {
  return ROUTEUR ? window.__RECHERCHE || "" : window.location.search;
}
/* Adresse d'une image du projet (« images/jeux/pubg-carre.png »).
   Dans le fichier unique, les images sont intégrées : le routeur fournit leur contenu. */
function ressource(chemin) {
  return (ROUTEUR && ROUTEUR.images && ROUTEUR.images[chemin]) || chemin;
}

/* Ouvre une page : « 06-tournoi.html?id=t01 » */
function ouvrirPage(url) {
  if (ROUTEUR) ROUTEUR.aller(url);
  else window.location.href = url;
}

/* Stockage : localStorage, sinon mémoire (fichier ouvert directement sur un téléphone).
   Dans le fichier unique, la mémoire est celle du parent : elle survit d'un écran à l'autre. */
const Stockage = (function () {
  const memoire = ROUTEUR ? ROUTEUR.memoire : {};
  return {
    lire(cle) {
      try { return localStorage.getItem(cle); } catch (e) { return memoire[cle] || null; }
    },
    ecrire(cle, valeur) {
      try { localStorage.setItem(cle, valeur); } catch (e) { memoire[cle] = valeur; }
    }
  };
})();

/* ---- État de démonstration, mémorisé entre les pages ---- */
const Etat = (function () {
  const CLE = "maquette-esport-etat";
  const DEFAUT = {
    abonne: false,          // joueur gratuit / abonné
    suspendu: false,        // compte Max it suspendu (S01-01)
    sessionExpiree: false,  // session Max it expirée (S01-01)
    premierAcces: false,    // premier accès : choix du pseudo (02)
    pseudo: null,           // pseudo choisi au premier accès (02) ; sinon celui de data.js
    inscriptions: null,     // inscriptions modifiées pendant la démo ; sinon celles de data.js
    equipes: null,          // équipes modifiées pendant la démo ; sinon celles de data.js
    reglementsAcceptes: null, // version du règlement acceptée par tournoi (S03-03)
    historiqueNonRepris: false, // case « Ne pas reprendre mon historique » (02)
    horloge: null,          // horloge accélérée des écrans 11, 14, 15 : { reel, simule }
    monMatch: null,         // déroulé de mon match : présence, déclarations, litige (lot 4)
    matchs: null,           // résultats ajoutés à l'arbre pendant la démo, par « tournoi-tour-match »
    contestations: null,    // contestations envoyées (26)
    abonnement: null,       // { offre, echeance, statut } : actif, resilie, expire (lot 5)
    positions: null,        // position de lecture de chaque vidéo, en secondes (18)
    economieDonnees: false, // mode « économie de données » du lecteur (18)
    sousTitres: false,      // sous-titres activés (18)
    signalements: null,     // contenus signalés par le joueur (19)
    gamertags: null,        // identifiants de jeu modifiés (23)
    pseudoModifieLe: null,  // date du dernier changement de pseudo (23)
    pseudoOffensant: null,  // ancien pseudo remplacé car jugé offensant (23)
    toastSuivant: null,     // message à afficher sur la page suivante (retour après paiement)
    notifsAjoutees: null,   // notifications créées pendant la démo (lot 6)
    notifsLues: null,       // notifications lues, par identifiant
    prefsNotif: null,       // familles de notifications désactivées (27)
    refusSms: false,        // refus des SMS (27, S12-02)
    promo: false,           // consentement aux messages promotionnels (27)
    telechargement: null,   // demande de téléchargement des données (28)
    suppression: null,      // date de la demande de suppression du compte (28)
    compteSupprime: false,  // démo : suppression effective, résultats sous un pseudonyme anonyme
    chat: null,             // messages échangés dans la salle de match (11, lot 7)
    chatSignale: false,     // discussion signalée au responsable local (11)
    maxpointsCredites: null, // MaxPoints crédités pendant la démo (29, lot 7)
    // Play (mini-jeux) : null = valeurs de départ de js/data-play.js
    playPays: null,         // pays du joueur dans Play (menu de démo : Maroc ou Sénégal)
    playNouveau: false,     // nouveau joueur : ni récents ni favoris (S06-02)
    playIndispo: false,     // un jeu momentanément indisponible (S08-04)
    playRecents: null,      // jeux récemment joués, du plus récent au plus ancien (S09-02)
    playLances: null,       // jeux déjà lancés au moins une fois (recommandations, avis)
    playFavoris: null,      // jeux favoris, le dernier ajouté en premier (S09-01)
    playAvis: null,         // avis du joueur, par jeu : { note, texte, date } (S10-01)
    playSignales: null,     // avis signalés par le joueur (S10-03)
    // Shop (boutique de jeux)
    shopPremierAchat: false, // premier achat : aucun achat passé, conditions de vente à accepter (S06-08)
    shopCgvModifiees: false, // nouvelle version des conditions de vente publiée (S06-08)
    shopCgvAcceptee: null,  // version des conditions acceptée pendant la démo : { version, date }
    shopComptes: null,      // comptes de jeu mémorisés modifiés pendant la démo (S05-04) ; sinon ceux de data-shop.js
    shopCommandes: null,    // commandes passées pendant la démo (E06 à E09)
    shopTunnel: null,       // achat en cours : { produit, compte } choisi en s05 (S06-07)
    shopScenario: null,     // état de démo du tunnel : id-introuvable, om-insuffisant, hors-plafond, sans-reponse…
    shopEpuises: null,      // produits épuisés pendant la démo (S02-04)
    shopSansSms: false,     // pays sans envoi du code par SMS (S09-02)
    shopReclamations: null, // réclamations envoyées depuis une commande (S10-04)
    scenario: null,         // état alternatif forcé pour l'écran visé
    origine: null           // écran à retrouver après le paiement (S11-03)
  };

  function lire() {
    try {
      const brut = Stockage.lire(CLE);
      return Object.assign({}, DEFAUT, brut ? JSON.parse(brut) : {});
    } catch (e) {
      return Object.assign({}, DEFAUT);
    }
  }

  function ecrire(etat) {
    Stockage.ecrire(CLE, JSON.stringify(etat));
  }

  return {
    get(cle) { return lire()[cle]; },
    set(cle, valeur) {
      const etat = lire();
      etat[cle] = valeur;
      ecrire(etat);
      document.dispatchEvent(new CustomEvent("etat-change", { detail: { cle, valeur } }));
    },
    reinitialiser() {
      ecrire(Object.assign({}, DEFAUT));
      document.dispatchEvent(new CustomEvent("etat-change", { detail: {} }));
    }
  };
})();

/* ---- Navigation ---- */
const Nav = {
  /* Aller à un écran par son numéro.
     scenario : état alternatif à afficher ; params : paramètres d'URL, ex. { id: "t01" } */
  aller(id, scenario, params) {
    const ecran = ECRANS[id];
    if (!ecran || !ecran.pret) {
      Nav.toast((ecran ? ecran.titre : "Cet écran") + " : arrive au prochain lot");
      return;
    }
    if (scenario !== undefined && scenario !== null) Etat.set("scenario", scenario);
    const requete = params ? "?" + new URLSearchParams(params).toString() : "";
    ouvrirPage(ecran.fichier + requete);
  },

  /* Lit un paramètre de l'URL de la page courante */
  param(nom) {
    return new URLSearchParams(rechercheCourante()).get(nom);
  },

  /* Bouton « E-sport » de l'univers Gaming : entrée dans la plateforme (S01-01) */
  entrerEsport() {
    if (Etat.get("suspendu")) {
      Nav.dialogue({
        icone: ICONES_NAV.cadenas,
        titre: "Accès aux tournois impossible",
        texte: "Ton compte Max it est suspendu. Contacte le service client Max it pour le réactiver.",
        boutons: [{ libelle: "J'ai compris", primaire: true }]
      });
      return;
    }
    if (Etat.get("premierAcces")) {
      Nav.aller("02");
      return;
    }
    Nav.aller("03");
  },

  /* Mémorise l'écran courant avant de partir vers l'offre (S11-03).
     L'offre (21) et le paiement (22) ne sont jamais des écrans d'origine. */
  memoriserOrigine() {
    const page = pageCourante();
    if (page === ECRANS["21"].fichier || page === ECRANS["22"].fichier) return;
    Etat.set("origine", page + rechercheCourante());
  },

  /* Retour exact sur l'écran d'origine, avec un message affiché à l'arrivée */
  retourOrigine(message) {
    const origine = Etat.get("origine");
    Etat.set("origine", null);
    if (message) Etat.set("toastSuivant", message);
    ouvrirPage(origine || ECRANS["03"].fichier);
  },

  /* Notification Max it simulée (Shop : S08-03, S09-04) : bandeau en haut de l'écran, sur n'importe quelle page.
     Le toucher ouvre « lien » ; il disparaît seul après 8 secondes. */
  notificationMaxit({ titre, texte, lien }) {
    const telephone = document.querySelector(".telephone");
    if (!telephone) return;
    const bandeau = document.createElement("button");
    bandeau.className = "notif-maxit";
    bandeau.setAttribute("role", "status");
    bandeau.innerHTML = '<span class="notif-app" aria-hidden="true">M</span>' +
      '<span class="notif-corps"><small>Max it · maintenant</small><b>' + titre + "</b><span>" + texte + "</span></span>";
    bandeau.addEventListener("click", () => { bandeau.remove(); ouvrirPage(lien); });
    telephone.appendChild(bandeau);
    setTimeout(() => bandeau.classList.add("visible"), 30);
    setTimeout(() => bandeau.remove(), 8000);
  },

  /* Message éphémère en bas de l'écran */
  toast(message) {
    const telephone = document.querySelector(".telephone");
    if (!telephone) return;
    let toast = telephone.querySelector(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      toast.setAttribute("role", "status");
      telephone.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("visible");
    clearTimeout(toast._minuteur);
    toast._minuteur = setTimeout(() => toast.classList.remove("visible"), 2400);
  },

  /* Boîte de dialogue bloquante. boutons : [{ libelle, primaire, action }] */
  dialogue({ icone, titre, texte, boutons }) {
    const telephone = document.querySelector(".telephone");
    const voile = document.createElement("div");
    voile.className = "voile ouvert";
    voile.innerHTML =
      '<div class="dialogue" role="alertdialog" aria-modal="true">' +
      (icone ? '<div class="icone-dialogue">' + icone + "</div>" : "") +
      "<h2>" + titre + "</h2><p>" + texte + "</p></div>";
    const boite = voile.querySelector(".dialogue");
    boutons.forEach((b) => {
      const bouton = document.createElement("button");
      bouton.className = "bouton bouton-pleine-largeur " + (b.primaire ? "bouton-primaire" : "bouton-secondaire");
      bouton.textContent = b.libelle;
      bouton.addEventListener("click", () => {
        voile.remove();
        if (b.action) b.action();
      });
      boite.appendChild(bouton);
    });
    telephone.appendChild(voile);
  }
};

/* Petites icônes utilisées par le routeur */
const ICONES_NAV = {
  cadenas: '<svg viewBox="0 0 24 24"><path class="f-primary" d="M7 10V7a5 5 0 0 1 10 0v3h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h1zm2 0h6V7a3 3 0 0 0-6 0v3z"/></svg>',
  horloge: '<svg viewBox="0 0 24 24"><path class="f-primary" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm1 3v5.4l3.6 2.1-1 1.7L11 13.6V7h2z"/></svg>'
};

/* ---- Barre d'état du téléphone (heure et icônes système) ---- */
function remplirBarreEtat() {
  document.querySelectorAll(".barre-etat").forEach((barre) => {
    const heure = barre.dataset.heure || "9:30";
    barre.innerHTML =
      "<span>" + heure + "</span>" +
      '<span class="icones-systeme">' +
      // Réseau
      '<svg viewBox="0 0 16 16" aria-hidden="true"><path class="f-text" d="M1 12h2v3H1zm4-3h2v6H5zm4-3h2v9H9zm4-3h2v12h-2z"/></svg>' +
      // Wi-Fi
      '<svg viewBox="0 0 16 16" aria-hidden="true"><path class="f-text" d="M8 13.5l2-2.3a2.8 2.8 0 0 0-4 0zm-3.3-3.8a4.8 4.8 0 0 1 6.6 0l1.3-1.5a6.8 6.8 0 0 0-9.2 0zM2 6.6a8.8 8.8 0 0 1 12 0l1.3-1.5a10.8 10.8 0 0 0-14.6 0z"/></svg>' +
      // Batterie
      '<svg viewBox="0 0 16 16" aria-hidden="true"><path class="f-text" d="M5 1h6v1h1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h1z"/></svg>' +
      "</span>";
  });
}

/* ---- Liens déclaratifs ----
   data-ecran="06"            : aller à l'écran 06 (data-id / data-pseudo / data-decision : paramètres ;
                                data-origine : mémoriser l'écran courant pour y revenir)
   data-action="esport"       : entrée dans la plateforme
   data-action="retour"       : page précédente (data-repli="03" : écran si pas d'historique)
   data-hors="Envoyer de l'argent" : élément hors périmètre de la maquette */
/* Fichier unique : les liens classiques vers une page (href="00b-….html") passent par le routeur */
document.addEventListener("click", (evenement) => {
  if (!ROUTEUR) return;
  const lien = evenement.target.closest("a[href]");
  const cible = lien && lien.getAttribute("href");
  if (cible && /^[\w-]+\.html/.test(cible)) {
    evenement.preventDefault();
    ROUTEUR.aller(cible);
  }
});

document.addEventListener("click", (evenement) => {
  const cible = evenement.target.closest("[data-ecran], [data-action], [data-hors]");
  if (!cible) return;
  evenement.preventDefault();

  if (cible.dataset.ecran) {
    // data-id="t01" ou data-pseudo="…" deviennent des paramètres d'URL
    const params = {};
    if (cible.dataset.id) params.id = cible.dataset.id;
    if (cible.dataset.pseudo) params.pseudo = cible.dataset.pseudo;
    if (cible.dataset.decision) params.decision = cible.dataset.decision;
    if (cible.dataset.mois) params.mois = cible.dataset.mois;
    if (cible.dataset.onglet && cible.dataset.ecran === "29") params.onglet = cible.dataset.onglet;
    if (cible.dataset.origine !== undefined) Nav.memoriserOrigine();
    Nav.aller(cible.dataset.ecran, cible.dataset.scenario, Object.keys(params).length ? params : null);
  } else if (cible.dataset.action === "esport") {
    Nav.entrerEsport();
  } else if (cible.dataset.action === "retour") {
    // Page précédente si elle existe, sinon l'écran de repli (jamais d'impasse)
    if (ROUTEUR) ROUTEUR.retour(ECRANS[cible.dataset.repli || "03"].fichier);
    else if (history.length > 1) history.back();
    else Nav.aller(cible.dataset.repli || "03");
  } else if (cible.dataset.hors !== undefined) {
    Nav.toast((cible.dataset.hors || "Cette fonction") + " : hors périmètre de la maquette");
  }
});

/* ---- Session expirée (S01-01) : à la première action dans la plateforme,
   le joueur est renvoyé vers l'identification Max it puis revient sur l'écran. ---- */
function verifierSession() {
  if (document.body.dataset.zone !== "esport" || !Etat.get("sessionExpiree")) return;
  Nav.dialogue({
    icone: ICONES_NAV.horloge,
    titre: "Session Max it expirée",
    texte: "Pour continuer, reconnecte-toi à Max it. Tu reviendras ensuite sur cet écran.",
    boutons: [{
      libelle: "Se reconnecter avec Max it",
      primaire: true,
      action: () => {
        Etat.set("sessionExpiree", false);
        Nav.toast("Reconnecté à Max it");
      }
    }]
  });
}

document.addEventListener("DOMContentLoaded", () => {
  remplirBarreEtat();
  verifierSession();
  // Message laissé par la page précédente (ex. « Abonnement activé » au retour du paiement)
  const message = Etat.get("toastSuivant");
  if (message) {
    Etat.set("toastSuivant", null);
    setTimeout(() => Nav.toast(message), 300);
  }
});
