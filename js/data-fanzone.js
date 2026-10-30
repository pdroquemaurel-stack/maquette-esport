/* Données fictives de la Fan Zone EA FC (4e chantier) : finale du tournoi panafricain EA FC,
   Tunis, 12 et 13 décembre 2026. Équipes, arbre, quiz, galerie et offre « Pass Fan ».
   Les joueurs et les pseudos sont inventés. */

const FANZONE = {
  /* Début du live : 12/12/2026 à 14h00, heure de Tunis (UTC+1, sans heure d'été) */
  debutLive: "2026-12-12T13:00:00Z",

  /* Les 8 pays des quarts de finale (qualifications en ligne, novembre).
     couleurs : les deux couleurs principales du drapeau (avatar, visuels) ;
     statut : « qualifie » pour Tunis (vainqueur de son quart) ou « elimine ». */
  pays: [
    { code: "MA", nom: "Maroc", couleurs: ["red", "green"], monnaie: "MAD", prixPass: 30,
      joueur: "Yassine Amrani", pseudo: "Yass_FC", statut: "qualifie",
      parcours: ["1er des qualifications Orange Maroc (512 joueurs)", "Quart de finale : victoire 3-1 contre le Cameroun", "Demi-finale le 12 décembre à Tunis"] },
    { code: "TN", nom: "Tunisie", couleurs: ["red", "white"], monnaie: "TND", prixPass: 10,
      joueur: "Skander Ben Salah", pseudo: "Skan_TN", statut: "qualifie",
      parcours: ["1er des qualifications Orange Tunisie (430 joueurs)", "Quart de finale : victoire 2-1 contre le Sénégal", "Demi-finale le 12 décembre, à domicile"] },
    { code: "EG", nom: "Égypte", couleurs: ["red", "black"], monnaie: "EGP", prixPass: 75,
      joueur: "Omar Fawzy", pseudo: "Pharaoh_10", statut: "qualifie",
      parcours: ["1er des qualifications Orange Égypte (780 joueurs)", "Quart de finale : victoire 4-2 contre le Mali", "Demi-finale le 12 décembre à Tunis"] },
    { code: "CI", nom: "Côte d'Ivoire", couleurs: ["orange", "green"], monnaie: "FCFA", prixPass: 1500,
      joueur: "Koffi N'Guessan", pseudo: "Koffi_Elef", statut: "qualifie",
      parcours: ["1er des qualifications Orange Côte d'Ivoire (395 joueurs)", "Quart de finale : victoire 2-0 contre la RD Congo", "Demi-finale le 12 décembre à Tunis"] },
    { code: "SN", nom: "Sénégal", couleurs: ["green", "yellow"], monnaie: "FCFA", prixPass: 1500,
      joueur: "Mamadou Diallo", pseudo: "Mams_Dkr", statut: "elimine",
      parcours: ["1er des qualifications Orange Sénégal (360 joueurs)", "Quart de finale : défaite 1-2 contre la Tunisie"] },
    { code: "CM", nom: "Cameroun", couleurs: ["green", "red"], monnaie: "FCFA", prixPass: 1500,
      joueur: "Junior Mbarga", pseudo: "Mbarga237", statut: "elimine",
      parcours: ["1er des qualifications Orange Cameroun (310 joueurs)", "Quart de finale : défaite 1-3 contre le Maroc"] },
    { code: "ML", nom: "Mali", couleurs: ["yellow", "green"], monnaie: "FCFA", prixPass: 1500,
      joueur: "Ibrahim Keïta", pseudo: "Ibra_Bko", statut: "elimine",
      parcours: ["1er des qualifications Orange Mali (240 joueurs)", "Quart de finale : défaite 2-4 contre l'Égypte"] },
    { code: "CD", nom: "RD Congo", couleurs: ["blue", "red"], monnaie: "CDF", prixPass: 4000,
      joueur: "Christian Mukendi", pseudo: "Kin_Mukendi", statut: "elimine",
      parcours: ["1er des qualifications Orange RDC (290 joueurs)", "Quart de finale : défaite 0-2 contre la Côte d'Ivoire"] }
  ],

  /* Arbre : quarts joués en ligne, demi-finales (jour 1) et finale (jour 2) à Tunis.
     scores : null = match à jouer. enDirect : match en cours quand la page est « En direct ». */
  arbre: [
    { tour: "Quarts de finale", date: "Novembre · en ligne", matchs: [
      { a: "MA", b: "CM", scores: [3, 1] },
      { a: "TN", b: "SN", scores: [2, 1] },
      { a: "EG", b: "ML", scores: [4, 2] },
      { a: "CI", b: "CD", scores: [2, 0] }
    ] },
    { tour: "Demi-finales", date: "12 déc. · Tunis", matchs: [
      { a: "MA", b: "TN", scores: null, enDirect: [1, 1] },
      { a: "EG", b: "CI", scores: null }
    ] },
    { tour: "Finale", date: "13 déc. · Tunis", matchs: [
      { a: null, b: null, scores: null }
    ] }
  ],

  /* Quiz « Jouer & Gagner » : 3 questions, réponse attendue = index dans choix */
  quiz: [
    { question: "Dans quelle ville se joue la finale panafricaine EA FC ?",
      choix: ["Casablanca", "Tunis", "Dakar", "Abidjan"], bonne: 1 },
    { question: "Combien de joueurs chaque équipe aligne-t-elle sur le terrain dans un match EA FC ?",
      choix: ["9", "10", "11", "12"], bonne: 2 },
    { question: "Sur quel jeu peut-on utiliser les codes gagnés dans la Fan Zone ?",
      choix: ["EA FC Mobile", "EA FC sur console", "Tous les jeux EA", "Free Fire"], bonne: 0 }
  ],
  lotsDuJour: 248,           // lots restants aujourd'hui, avant les gains de la démo
  codesMax: 2,               // codes maximum par utilisateur
  validiteCodes: "31/12/2026",

  /* Offre « Pass Fan EA FC » : le prix dépend du pays (monnaie locale) */
  pass: { nom: "Pass Fan EA FC", data: "2 Go", duree: "7 jours" },

  /* Galerie : vignettes colorées (couleurs du pays, ou orange pour l'organisation) */
  galerie: [
    { pays: "MA", legende: "Arrivée de Yass_FC à l'aéroport de Tunis-Carthage" },
    { pays: "EG", legende: "Séance d'entraînement de Pharaoh_10" },
    { pays: null, legende: "Tirage au sort des demi-finales" },
    { pays: "CI", legende: "Koffi_Elef fête sa qualification" },
    { pays: "TN", legende: "Skan_TN devant son public" },
    { pays: null, legende: "Montage de la scène de la finale" },
    { pays: "SN", legende: "Mams_Dkr salue ses supporters après le quart" },
    { pays: "CM", legende: "Mbarga237 pendant les qualifications" },
    { pays: null, legende: "Photo de groupe des 8 quart-de-finalistes" }
  ]
};
