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
    { libelle: "Aucune déclaration dans le délai", ecran: "14", scenario: "sans-declaration" },
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
    { libelle: "Équipe fermée à compléter", ecran: "10", scenario: "equipe-fermee", params: { id: "t12" } },
    { libelle: "MaxPoints crédités (clôture d'un tournoi)", ecran: "29", scenario: "points-credites" },
    { libelle: "Paiement refusé", ecran: "22", scenario: "paiement-refuse" },
    { libelle: "Paiement abandonné", ecran: "22", scenario: "paiement-abandonne" },
    { libelle: "Abonnement résilié", ecran: "24", scenario: "resilie" },
    { libelle: "Abonnement expiré", ecran: "24", scenario: "expire" },
    { libelle: "Pseudo jugé offensant", ecran: "23", scenario: "pseudo-offensant" },
    { libelle: "Compte supprimé (30 jours après)", ecran: "28", scenario: "compte-supprime" },
    // Sans changer d'écran : une notification arrive en moins de 5 secondes (S12-01)
    { libelle: "Nouvelle notification", action: "notification", aide: "Arrive sur l'écran affiché en moins de 5 s" }
  ];

  /* Play (mini-jeux) : bascules et raccourcis propres à la mini app.
     etat : valeurs à forcer avant d'ouvrir l'écran. */
  const BASCULES_PLAY = [
    { cle: "playNouveau", libelle: "Nouveau joueur", aide: "Ni jeux récents ni favoris" },
    { cle: "playIndispo", libelle: "Jeu momentanément indisponible", aide: "« Bloc Mania » disparaît de Play" }
  ];
  const RACCOURCIS_PLAY = [
    { libelle: "Ouverture par lien partagé", ecran: "p03", params: { jeu: "rallye-dunes", via: "lien" } },
    { libelle: "Lien vers un jeu indisponible", ecran: "p03", params: { jeu: "bloc-mania", via: "lien" }, etat: { playIndispo: true } }
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

    const bascule = (b) => {
      const actif = Etat.get(b.cle);
      html +=
        '<button class="demo-ligne" role="switch" aria-checked="' + !!actif + '" data-bascule="' + b.cle + '">' +
        "<span>" + b.libelle + "<small>" + b.aide + "</small></span>" +
        '<span class="inter' + (actif ? " on" : "") + '"></span></button>';
    };
    BASCULES.forEach(bascule);

    // Play (mini-jeux) : pays, nouveau joueur, jeu indisponible, liens partagés
    const senegal = Etat.get("playPays") === "SN";
    html += '<p class="demo-groupe">Play (mini-jeux)</p>' +
      '<div class="segment" role="radiogroup" aria-label="Pays du joueur dans Play">' +
      '<button role="radio" data-pays="MA" aria-checked="' + !senegal + '" class="' + (senegal ? "" : "actif") + '">Maroc</button>' +
      '<button role="radio" data-pays="SN" aria-checked="' + senegal + '" class="' + (senegal ? "actif" : "") + '">Sénégal</button>' +
      "</div>" +
      '<p class="demo-aide">Au Sénégal, les fiches affichent le badge « Sans consommation de data ».</p>';
    BASCULES_PLAY.forEach(bascule);
    RACCOURCIS_PLAY.forEach((r, i) => {
      html += '<button class="demo-ligne" data-raccourci-play="' + i + '">' +
        "<span>" + r.libelle + "<small>Écran " + r.ecran + " · " + ECRANS[r.ecran].titre + "</small></span>" + ICONE_FLECHE + "</button>";
    });

    html += '<p class="demo-groupe">États alternatifs</p>';
    RACCOURCIS.forEach((r, i) => {
      if (r.action) {
        html += '<button class="demo-ligne" data-raccourci="' + i + '"><span>' + r.libelle + "<small>" + r.aide + "</small></span>" + ICONE_FLECHE + "</button>";
        return;
      }
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

    const pays = cible.closest("[data-pays]");
    if (pays) {
      Etat.set("playPays", pays.dataset.pays);
      Nav.toast("Play : joueur au " + (pays.dataset.pays === "SN" ? "Sénégal" : "Maroc"));
      return ouvrir();
    }

    const bascule = cible.closest("[data-bascule]");
    if (bascule) {
      const cle = bascule.dataset.bascule;
      // Nouveau joueur : l'historique de Play repart de zéro (ou de l'historique de départ)
      if (cle === "playNouveau") ["playRecents", "playLances", "playFavoris"].forEach((c) => Etat.set(c, null));
      Etat.set(cle, !Etat.get(cle));
      return ouvrir();
    }

    const raccourciPlay = cible.closest("[data-raccourci-play]");
    if (raccourciPlay) {
      const r = RACCOURCIS_PLAY[Number(raccourciPlay.dataset.raccourciPlay)];
      Object.keys(r.etat || {}).forEach((cle) => Etat.set(cle, r.etat[cle]));
      fermer();
      return Nav.aller(r.ecran, null, r.params);
    }

    const raccourci = cible.closest("[data-raccourci]");
    if (raccourci && !raccourci.disabled) {
      const r = RACCOURCIS[Number(raccourci.dataset.raccourci)];
      if (r.action === "notification") {
        fermer();
        setTimeout(() => {
          const notif = { famille: "tournoi", ecran: "06", params: { id: "t04" }, titre: "Nouveau tournoi sur un jeu suivi",
            texte: "MEA Free Fire Championship : les inscriptions sont ouvertes." };
          if (typeof Esport !== "undefined") Esport.notifier(notif);
          Nav.toast("Notification : " + notif.titre);
        }, 2000);
        return;
      }
      // Un abonnement expiré ramène le joueur au niveau gratuit (S11-04)
      if (r.scenario === "expire" || r.scenario === "abonnement-expire") Etat.set("abonne", false);
      fermer();
      // Paiement : on revient ensuite sur l'écran affiché (S11-03)
      if (r.ecran === "22") Nav.memoriserOrigine();
      return Nav.aller(r.ecran, r.scenario, r.params || null);
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
