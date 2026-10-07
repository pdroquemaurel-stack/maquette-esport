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
  "11": { fichier: "11-match.html", titre: "Salle de match", pret: false },
  "12": { fichier: "12-arbre.html", titre: "Arbre du tournoi", pret: true },
  "13": { fichier: "13-jeu.html", titre: "Page d'un jeu", pret: true },
  "14": { fichier: "14-resultat.html", titre: "Déclarer le résultat", pret: false },
  "15": { fichier: "15-litige.html", titre: "Litige", pret: false },
  "17": { fichier: "17-profil-public.html", titre: "Profil public", pret: true },
  "18": { fichier: "18-video.html", titre: "Vidéo", pret: false },
  "19": { fichier: "19-article.html", titre: "Article", pret: false },
  "20": { fichier: "20-contenus.html", titre: "Contenus", pret: false },
  "21": { fichier: "21-offre.html", titre: "Offre d'abonnement", pret: false },
  "22": { fichier: "22-paiement-maxit.html", titre: "Paiement Max it", pret: false },
  "23": { fichier: "23-profil.html", titre: "Mon profil", pret: false },
  "24": { fichier: "24-abonnement.html", titre: "Mon abonnement", pret: false },
  "25": { fichier: "25-notifications.html", titre: "Notifications", pret: false },
  "26": { fichier: "26-contestation.html", titre: "Contestation", pret: false },
  "27": { fichier: "27-preferences-notif.html", titre: "Préférences", pret: false },
  "28": { fichier: "28-mes-donnees.html", titre: "Mes données", pret: false }
};

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
    scenario: null,         // état alternatif forcé pour l'écran visé
    origine: null           // écran à retrouver après le paiement (S11-03)
  };

  function lire() {
    try {
      const brut = localStorage.getItem(CLE);
      return Object.assign({}, DEFAUT, brut ? JSON.parse(brut) : {});
    } catch (e) {
      return Object.assign({}, DEFAUT);
    }
  }

  function ecrire(etat) {
    try { localStorage.setItem(CLE, JSON.stringify(etat)); } catch (e) { /* stockage indisponible */ }
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
    window.location.href = ecran.fichier + requete;
  },

  /* Lit un paramètre de l'URL de la page courante */
  param(nom) {
    return new URLSearchParams(window.location.search).get(nom);
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

  /* Mémorise l'écran courant avant de partir vers l'offre (S11-03) */
  memoriserOrigine() {
    Etat.set("origine", window.location.pathname.split("/").pop() + window.location.search);
  },

  retourOrigine() {
    const origine = Etat.get("origine");
    Etat.set("origine", null);
    window.location.href = origine || ECRANS["03"].fichier;
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
   data-ecran="06"            : aller à l'écran 06 (data-id / data-pseudo : paramètres ;
                                data-origine : mémoriser l'écran courant pour y revenir)
   data-action="esport"       : entrée dans la plateforme
   data-action="retour"       : page précédente (data-repli="03" : écran si pas d'historique)
   data-hors="Envoyer de l'argent" : élément hors périmètre de la maquette */
document.addEventListener("click", (evenement) => {
  const cible = evenement.target.closest("[data-ecran], [data-action], [data-hors]");
  if (!cible) return;
  evenement.preventDefault();

  if (cible.dataset.ecran) {
    // data-id="t01" ou data-pseudo="…" deviennent des paramètres d'URL
    const params = {};
    if (cible.dataset.id) params.id = cible.dataset.id;
    if (cible.dataset.pseudo) params.pseudo = cible.dataset.pseudo;
    if (cible.dataset.origine !== undefined) Nav.memoriserOrigine();
    Nav.aller(cible.dataset.ecran, cible.dataset.scenario, Object.keys(params).length ? params : null);
  } else if (cible.dataset.action === "esport") {
    Nav.entrerEsport();
  } else if (cible.dataset.action === "retour") {
    // Page précédente si elle existe, sinon l'écran de repli (jamais d'impasse)
    if (history.length > 1) history.back();
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
});
