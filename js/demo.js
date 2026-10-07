/* Menu de démonstration : icône discrète en haut à droite, sur tous les écrans.
   Il ne fait pas partie du produit. Il sert à basculer entre joueur gratuit et abonné,
   et à forcer les états alternatifs difficiles à atteindre en cliquant. */

const Demo = (function () {

  /* Bascules : états qui restent actifs jusqu'à ce qu'on les coupe */
  const BASCULES = [
    { cle: "suspendu", libelle: "Compte Max it suspendu", aide: "Bloque l'entrée par « E-sport »" },
    { cle: "sessionExpiree", libelle: "Session Max it expirée", aide: "Reconnexion à la prochaine page e-sport" },
    { cle: "premierAcces", libelle: "Premier accès", aide: "« E-sport » ouvre le choix du pseudo" }
  ];

  /* Raccourcis : forcent un état puis ouvrent l'écran concerné */
  const RACCOURCIS = [
    { libelle: "Forfait adverse", ecran: "11", scenario: "forfait-adverse" },
    { libelle: "Mon forfait", ecran: "11", scenario: "mon-forfait" },
    { libelle: "Double absence", ecran: "11", scenario: "double-absence" },
    { libelle: "Résultat divergent", ecran: "14", scenario: "resultat-divergent" },
    { libelle: "Déclaration adverse à contester", ecran: "14", scenario: "declaration-adverse" },
    { libelle: "Délai de déclaration dépassé", ecran: "14", scenario: "delai-depasse" },
    { libelle: "Litige ouvert", ecran: "15", scenario: "litige-ouvert" },
    { libelle: "Décision d'arbitrage rendue", ecran: "15", scenario: "decision-rendue" },
    { libelle: "Exclusion d'un tournoi (contestation)", ecran: "26", scenario: "exclusion" },
    { libelle: "Refus : identifiant de jeu déjà inscrit", ecran: "08", scenario: "refus-doublon" },
    { libelle: "Refus : compte déjà inscrit", ecran: "08", scenario: "refus-compte" },
    { libelle: "Refus : pays non éligible", ecran: "08", scenario: "refus-pays" },
    { libelle: "Liste d'attente", ecran: "08", scenario: "liste-attente" },
    { libelle: "Suspension après 3 forfaits", ecran: "08", scenario: "suspension" },
    { libelle: "Inscription annulée (abonnement expiré)", ecran: "08", scenario: "abonnement-expire" },
    { libelle: "Équipe incomplète à la clôture", ecran: "10", scenario: "equipe-incomplete" },
    { libelle: "Abonnement expiré", ecran: "24", scenario: "expire" },
    { libelle: "Paiement refusé", ecran: "22", scenario: "paiement-refuse" }
  ];

  const ICONE_REGLAGES =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path class="f-text" d="M4 6h10.2a3 3 0 0 1 5.6 0H20v2h-.2a3 3 0 0 1-5.6 0H4zm13 1a1 1 0 1 0 0 .01zM4 16h.2a3 3 0 0 1 5.6 0H20v2H9.8a3 3 0 0 1-5.6 0H4zm3 1a1 1 0 1 0 0 .01z"/></svg>';
  const ICONE_FLECHE =
    '<svg class="fleche" viewBox="0 0 24 24" aria-hidden="true"><path class="f-muted" d="M9.3 5.3 15.9 12l-6.6 6.7-1.4-1.4 5.2-5.3-5.2-5.3z"/></svg>';

  let voile;

  /* Construit le contenu de la feuille à partir de l'état courant */
  function construire() {
    const abonne = Etat.get("abonne");
    let html =
      '<div class="feuille" role="dialog" aria-modal="true" aria-label="Menu de démonstration">' +
      '<div class="poignee"></div>' +
      '<p class="demo-titre">Menu de démonstration</p>' +
      '<p class="demo-aide">Hors produit : sert à présenter la maquette.</p>' +

      '<p class="demo-groupe">Profil du joueur</p>' +
      '<div class="segment" role="radiogroup">' +
      '<button role="radio" data-abonne="non" aria-checked="' + !abonne + '" class="' + (abonne ? "" : "actif") + '">Joueur gratuit</button>' +
      '<button role="radio" data-abonne="oui" aria-checked="' + abonne + '" class="' + (abonne ? "actif" : "") + '">Joueur abonné</button>' +
      "</div>" +

      '<p class="demo-groupe">Compte Max it</p>';

    BASCULES.forEach((b) => {
      const actif = Etat.get(b.cle);
      html +=
        '<button class="demo-ligne" role="switch" aria-checked="' + !!actif + '" data-bascule="' + b.cle + '">' +
        "<span>" + b.libelle + "<small>" + b.aide + "</small></span>" +
        '<span class="inter' + (actif ? " on" : "") + '"></span></button>';
    });

    html += '<p class="demo-groupe">États alternatifs</p>';
    RACCOURCIS.forEach((r, i) => {
      const ecran = ECRANS[r.ecran];
      html +=
        '<button class="demo-ligne" data-raccourci="' + i + '"' + (ecran.pret ? "" : " disabled") + ">" +
        "<span>" + r.libelle + "<small>Écran " + r.ecran + " · " + ecran.titre + "</small></span>" +
        (ecran.pret ? ICONE_FLECHE : '<span class="lot">à venir</span>') +
        "</button>";
    });

    html +=
      '<button class="demo-reinit" data-reinit>Réinitialiser la démo</button>' +
      '<button class="bouton bouton-secondaire bouton-pleine-largeur" data-fermer>Fermer</button>' +
      "</div>";
    return html;
  }

  function ouvrir() {
    voile.innerHTML = construire();
    voile.classList.add("ouvert");
  }

  function fermer() {
    voile.classList.remove("ouvert");
  }

  function gererClic(evenement) {
    const cible = evenement.target;
    if (cible === voile || cible.closest("[data-fermer]")) return fermer();

    const segment = cible.closest("[data-abonne]");
    if (segment) {
      const abonne = segment.dataset.abonne === "oui";
      Etat.set("abonne", abonne);
      Nav.toast(abonne ? "Mode joueur abonné" : "Mode joueur gratuit");
      return ouvrir();
    }

    const bascule = cible.closest("[data-bascule]");
    if (bascule) {
      const cle = bascule.dataset.bascule;
      Etat.set(cle, !Etat.get(cle));
      return ouvrir();
    }

    const raccourci = cible.closest("[data-raccourci]");
    if (raccourci && !raccourci.disabled) {
      const r = RACCOURCIS[Number(raccourci.dataset.raccourci)];
      // Un abonnement expiré ramène le joueur au niveau gratuit (S11-04)
      if (r.scenario === "expire" || r.scenario === "abonnement-expire") Etat.set("abonne", false);
      fermer();
      return Nav.aller(r.ecran, r.scenario);
    }

    if (cible.closest("[data-reinit]")) {
      Etat.reinitialiser();
      Nav.toast("Démo réinitialisée");
      return ouvrir();
    }
  }

  function installer() {
    const telephone = document.querySelector(".telephone");
    const icones = document.querySelector(".barre-etat .icones-systeme");
    if (!telephone || !icones) return;

    const bouton = document.createElement("button");
    bouton.className = "demo-bouton";
    bouton.setAttribute("aria-label", "Menu de démonstration");
    bouton.innerHTML = ICONE_REGLAGES;
    bouton.addEventListener("click", ouvrir);
    icones.prepend(bouton);

    voile = document.createElement("div");
    voile.className = "voile";
    voile.addEventListener("click", gererClic);
    telephone.appendChild(voile);
  }

  document.addEventListener("DOMContentLoaded", installer);
  return { ouvrir };
})();
