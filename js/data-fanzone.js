/* Données fictives de la Fan Zone EA FC (4e chantier) : finale du tournoi panafricain EA FC,
   Tunis, 12 et 13 décembre 2026. Équipes, arbre, quiz, galerie, forfaits data et services payants.
   Les joueurs et les pseudos sont inventés. */

const FANZONE = {
  /* Début du live : 12/12/2026 à 14h00, heure de Tunis (UTC+1, sans heure d'été) */
  debutLive: "2026-12-12T13:00:00Z",

  /* Heure de départ de la démo (heure du téléphone) : 7 décembre à 10h30, 3e jour des questions du jour.
     Le temps s'écoule ensuite normalement ; le menu de démo l'avance (« le live dans 10 s », « jour suivant »). */
  debutDemo: "2026-12-07T10:30:00",

  /* Logo de l'événement (image fournie, usage interne de la maquette, validé le 2026-10-30) */
  logo: "images/fanzone/ea-sports-fc.png",

  /* Photos des équipes (images/fanzone/equipes/<code>.jpg) : aucune pour l'instant ; sans photo,
     le portrait dessiné aux couleurs du pays s'affiche. Exemple : { MA: chemin de images/fanzone/equipes/MA.jpg } */
  photos: {},

  /* Les 8 pays des quarts de finale (qualifications en ligne, novembre).
     couleurs : les deux couleurs principales du drapeau (avatar, visuels) ;
     statut : « qualifie » pour Tunis (vainqueur de son quart) ou « elimine ». */
  pays: [
    { code: "MA", nom: "Maroc", couleurs: ["red", "green"], monnaie: "MAD",
      joueur: "Yassine Amrani", pseudo: "Yass_FC", statut: "qualifie",
      parcours: ["1er des qualifications Orange Maroc (512 joueurs)", "Quart de finale : victoire 3-1 contre le Cameroun", "Demi-finale le 12 décembre à Tunis"] },
    { code: "TN", nom: "Tunisie", couleurs: ["red", "white"], monnaie: "TND",
      joueur: "Skander Ben Salah", pseudo: "Skan_TN", statut: "qualifie",
      parcours: ["1er des qualifications Orange Tunisie (430 joueurs)", "Quart de finale : victoire 2-1 contre le Sénégal", "Demi-finale le 12 décembre, à domicile"] },
    { code: "EG", nom: "Égypte", couleurs: ["red", "black"], monnaie: "EGP",
      joueur: "Omar Fawzy", pseudo: "Pharaoh_10", statut: "qualifie",
      parcours: ["1er des qualifications Orange Égypte (780 joueurs)", "Quart de finale : victoire 4-2 contre le Mali", "Demi-finale le 12 décembre à Tunis"] },
    { code: "CI", nom: "Côte d'Ivoire", couleurs: ["orange", "green"], monnaie: "FCFA",
      joueur: "Koffi N'Guessan", pseudo: "Koffi_Elef", statut: "qualifie",
      parcours: ["1er des qualifications Orange Côte d'Ivoire (395 joueurs)", "Quart de finale : victoire 2-0 contre la RD Congo", "Demi-finale le 12 décembre à Tunis"] },
    { code: "SN", nom: "Sénégal", couleurs: ["green", "yellow"], monnaie: "FCFA",
      joueur: "Mamadou Diallo", pseudo: "Mams_Dkr", statut: "elimine",
      parcours: ["1er des qualifications Orange Sénégal (360 joueurs)", "Quart de finale : défaite 1-2 contre la Tunisie"] },
    { code: "CM", nom: "Cameroun", couleurs: ["green", "red"], monnaie: "FCFA",
      joueur: "Junior Mbarga", pseudo: "Mbarga237", statut: "elimine",
      parcours: ["1er des qualifications Orange Cameroun (310 joueurs)", "Quart de finale : défaite 1-3 contre le Maroc"] },
    { code: "ML", nom: "Mali", couleurs: ["yellow", "green"], monnaie: "FCFA",
      joueur: "Ibrahim Keïta", pseudo: "Ibra_Bko", statut: "elimine",
      parcours: ["1er des qualifications Orange Mali (240 joueurs)", "Quart de finale : défaite 2-4 contre l'Égypte"] },
    { code: "CD", nom: "RD Congo", couleurs: ["blue", "red"], monnaie: "CDF",
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

  /* Le Grand Tirage console : un seul tirage au sort, en direct pendant la finale.
     Chances : questions du jour (+1 par jour réussi, 7 au plus) et Pass Fan achetés (+1 par achat, 5 au plus). */
  tirage: {
    nom: "Le Grand Tirage console",
    date: "2026-12-13T17:00:00Z",   // 13/12/2026 à 18h, heure de Tunis, pendant l'émission de la finale
    lots: "3 consoles de jeu dernière génération, avec une manette en plus",
    plafondAchats: 5
  },

  /* Questions du jour : du 5 au 11 décembre, 3 nouvelles questions chaque jour à 10h (heure du téléphone),
     2 tentatives par jour ; au moins 2 bonnes réponses = +1 chance. Une journée manquée est perdue.
     Une ligne par jour ; réponse attendue = index dans choix. */
  questionsDuJour: {
    debut: "2026-12-05",
    heure: 10,
    tentatives: 2,
    jours: [
      [ { question: "Dans quelle ville se joue la finale panafricaine EA FC ?", choix: ["Casablanca", "Tunis", "Dakar", "Abidjan"], bonne: 1 },
        { question: "Combien de joueurs chaque équipe aligne-t-elle sur le terrain dans un match EA FC ?", choix: ["9", "10", "11"], bonne: 2 },
        { question: "Sur quel jeu s'utilisent les codes gagnés dans la Fan Zone ?", choix: ["EA FC Mobile", "EA FC sur console", "Free Fire"], bonne: 0 } ],
      [ { question: "Combien de pays ont joué les quarts de finale ?", choix: ["4", "6", "8", "16"], bonne: 2 },
        { question: "Quel joueur représente le Maroc ?", choix: ["Yass_FC", "Skan_TN", "Pharaoh_10"], bonne: 0 },
        { question: "Combien de jours dure la finale à Tunis ?", choix: ["1 jour", "2 jours", "3 jours"], bonne: 1 } ],
      [ { question: "Quel score a qualifié l'Égypte contre le Mali ?", choix: ["2-1", "3-1", "4-2", "1-0"], bonne: 2 },
        { question: "Dans EA FC, combien dure une mi-temps par défaut en match rapide ?", choix: ["4 minutes", "6 minutes", "45 minutes"], bonne: 1 },
        { question: "Quel pays affrontera la Côte d'Ivoire en demi-finale ?", choix: ["Le Sénégal", "L'Égypte", "Le Cameroun"], bonne: 1 } ],
      [ { question: "Comment appelle-t-on un joueur professionnel de jeux vidéo ?", choix: ["Un streamer", "Un pro gamer", "Un coach"], bonne: 1 },
        { question: "Quel est le pseudo du joueur ivoirien ?", choix: ["Koffi_Elef", "Mams_Dkr", "Mbarga237", "Kin_Mukendi"], bonne: 0 },
        { question: "Où regarder la finale en direct dans Max it ?", choix: ["Max it TV", "Max it Shop", "Max it Play"], bonne: 0 } ],
      [ { question: "Quel mode d'EA FC permet de construire son équipe de rêve avec des cartes ?", choix: ["Carrière", "Ultimate Team", "Volta"], bonne: 1 },
        { question: "Contre qui le Maroc a-t-il gagné son quart de finale ?", choix: ["Le Cameroun", "La Tunisie", "Le Mali"], bonne: 0 },
        { question: "Combien de Pass Fan peuvent rapporter des chances au Grand Tirage ?", choix: ["1", "3", "5", "Sans limite"], bonne: 2 } ],
      [ { question: "Que signifie « GG » à la fin d'un match ?", choix: ["Good game", "Go go", "Grand gagnant"], bonne: 0 },
        { question: "Quel pays joue la demi-finale à domicile ?", choix: ["Le Maroc", "La Tunisie", "L'Égypte"], bonne: 1 },
        { question: "Combien de codes EA FC Mobile au maximum par utilisateur ?", choix: ["1", "2", "5"], bonne: 1 } ],
      [ { question: "Quel jour a lieu le Grand Tirage console ?", choix: ["Le 11 décembre", "Le 12 décembre", "Le 13 décembre"], bonne: 2 },
        { question: "Quel joueur représente l'Égypte ?", choix: ["Skan_TN", "Pharaoh_10", "Ibra_Bko"], bonne: 1 },
        { question: "Dans EA FC, quelle touche sert d'habitude à tirer au but ?", choix: ["Rond / B", "Croix / A", "Carré / X"], bonne: 0 } ]
    ]
  },

  lotsDuJour: 248,           // codes EA FC Mobile restants aujourd'hui, avant les gains de la démo
  codesMax: 2,               // codes maximum par utilisateur
  validiteCodes: "31/12/2026",

  /* Forfaits data (tuile « Pass data » de f01, écran f05) et services payants (écran f12).
     prix : TTC, dans la monnaie du pays soutenu (MAD, TND, EGP, FCFA, CDF) ; Maroc par défaut.
     jours : durée d'activation ; code : un code EA FC Mobile offert (dans la limite de 2 par utilisateur). */
  forfaits: [
    { id: "fan-1go", nom: "Pass Fan 1 Go", data: "1 Go", duree: "1 jour", jours: 1, code: false,
      accroche: "Pour regarder une demi-finale", prix: { MAD: 10, TND: 3, EGP: 25, FCFA: 500, CDF: 1500 } },
    { id: "fan-2go", nom: "Pass Fan EA FC", data: "2 Go", duree: "7 jours", jours: 7, code: true, conseille: true,
      accroche: "Les deux jours de finale, et plus", prix: { MAD: 30, TND: 10, EGP: 75, FCFA: 1500, CDF: 4000 } },
    { id: "fan-5go", nom: "Pass Fan 5 Go", data: "5 Go", duree: "30 jours", jours: 30, code: true,
      accroche: "Tout le mois, live et replays", prix: { MAD: 60, TND: 20, EGP: 150, FCFA: 3000, CDF: 8000 } }
  ],
  services: [
    { id: "live-hd", nom: "Pass Live HD", icone: "lecture", duree: "1 jour", jours: 1,
      accroche: "Le live en HD sans consommer ta data, avec le multi-caméra",
      confirmation: "Le live HD est débloqué : regarde la finale sans consommer ta data.",
      prix: { MAD: 5, TND: 2, EGP: 15, FCFA: 300, CDF: 1000 } },
    { id: "pack-supporter", nom: "Pack Supporter", icone: "avatar", duree: null,
      accroche: "Fond d'écran et sonnerie aux couleurs de ton pays",
      confirmation: "Ton fond d'écran et ta sonnerie sont dans Mes téléchargements Max it.",
      prix: { MAD: 10, TND: 3, EGP: 30, FCFA: 500, CDF: 2000 } }
  ],

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
