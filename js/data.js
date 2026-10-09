/* Données fictives de la maquette.
   Seul fichier de données : tous les écrans lisent l'objet DONNEES. */

const DONNEES = {

  /* Date et heure « actuelles » de la maquette : vendredi soir, pendant le Défi eFootball */
  maintenant: "2026-10-09T21:10",

  /* ---- Joueur connecté (compte Max it) ---- */
  joueur: {
    prenom: "Youssef",
    numero: "+212 6 61 23 45 67",
    pays: "MA",
    pseudo: "Youss_KZ",
    // Identifiants de jeu (gamertags), un par jeu
    gamertags: { freefire: "YoussKZ#4471", efootball: "YoussKZ" },
    // Rempli quand le joueur est abonné (voir l'interrupteur du menu de démo)
    abonnement: { offre: "mensuelle", echeance: "2026-11-07" },
    // Dernier changement de pseudo : modifiable une fois tous les 30 jours (S01-02)
    pseudoModifieLe: "2026-08-20",
    // Inscriptions en cours (modifiables pendant la démo, voir Esport.inscription)
    // etat : "inscrit" ou "attente" (liste d'attente, avec le rang)
    inscriptions: {
      t01: { etat: "inscrit" },
      t05: { etat: "inscrit" },
      t11: { etat: "attente", rang: 3 }
    },
    // Tournois terminés joués sur la nouvelle plateforme (écran 05)
    historique: [{ tournoi: "t10", resultat: "117e sur 128" }],
    // Ancien joueur : historique repris de l'ancienne plateforme (S01-05)
    // matchs / gagnes : matchs disputés et gagnés, pour le ratio de victoires du profil (17)
    historiqueRepris: { tournois: 12, victoires: 2, matchs: 34, gagnes: 17 },
    // Statistiques sur la nouvelle plateforme, hors quart de finale en cours (profil 17, lot 7)
    // horsListe : tournois terminés absents de DONNEES.tournois (Défis eFootball du jeudi et du mardi)
    stats: {
      matchs: 22, gagnes: 15, meilleurePlace: 1, meilleurTournoi: "Défi eFootball du jeudi",
      serieRecord: 5, sansForfait: 4, jeux: 2,
      horsListe: { tournois: 2, gagnes: 1 },
      // Badges sans compteur, avec leur date d'obtention
      obtenus: { "premier-tournoi": "2026-08-10", equipe: "2026-10-08" }
    }
  },

  /* ---- Équipes (S04-03, S04-04) ----
     Une équipe n'existe que dans son tournoi. membres[0] est le membre le plus ancien.
     mesEquipes : équipe du joueur par tournoi (modifiable pendant la démo, voir Esport.equipe). */
  mesEquipes: {
    t01: {
      nom: "Kenitra Kings", ouverte: false, capitaine: "Youss_KZ",
      membres: ["Youss_KZ", "Ismail_Pro", "Saad.Booyah", "Yahya_FF"],
      demandes: [], invitations: [], lien: "maxit.ma/e/KK4471"
    }
  },

  /* Équipes ouvertes de chaque tournoi en équipe : nom, capitaine, membres actuels */
  equipesOuvertes: {
    t01: [
      { nom: "Team Sahara", capitaine: "Bilal_Rush", membres: ["Bilal_Rush", "Chaimae_FF", "Hassan.Pro"] },
      { nom: "Casa Legends", capitaine: "Ali_Headshot", membres: ["Ali_Headshot", "Meryem.FF"] },
      { nom: "Rabat Wolves", capitaine: "Taha_Sniper", membres: ["Taha_Sniper"] }
    ],
    t12: [
      { nom: "Casa Drop Squad", capitaine: "Hassan.Pro", membres: ["Hassan.Pro", "Bilal_Rush", "Asmae.G"] },
      { nom: "Erg Chebbi Team", capitaine: "Rania_212", membres: ["Rania_212"] }
    ],
    t04: [
      { nom: "Dakar Booyah", capitaine: "Simba_221", membres: ["Simba_221", "Awa.FF"] },
      { nom: "Atlas Elite", capitaine: "Driss_Rush", membres: ["Driss_Rush", "Jihane_GG", "Leila_GG"] }
    ],
    t06: [
      { nom: "Rabat Snipers", capitaine: "Rania_212", membres: ["Rania_212", "Asmae.G", "Nadia.X"] }
    ]
  },

  /* Noms d'équipe déjà utilisés dans les tournois (le nom est unique dans un tournoi) */
  nomsEquipesPris: ["Atlas Squad", "Casa Legends", "Team Sahara", "Rabat Wolves", "Marrakech Fire",
    "Tanger Storm", "Kenitra Kings", "Dakar Booyah", "Atlas Elite", "Rabat Snipers", "Casa Drop Squad", "Erg Chebbi Team"],

  /* Joueurs qui demandent à rejoindre une équipe ouverte que le joueur vient de créer */
  demandesSimulees: ["Houda_FF", "Omar_Sniper"],

  /* Démo « Équipe fermée à compléter » (lot 7) : mon équipe fermée de la PUBG Squad Casablanca,
     à rendre ouverte pour trouver les joueurs manquants */
  equipeFermeeDemo: {
    tournoi: "t12",
    equipe: { nom: "Atlas Raiders", ouverte: false, capitaine: "Youss_KZ", membres: ["Youss_KZ", "Ismail_Pro"],
      demandes: [], invitations: [], lien: "maxit.ma/e/ATLA4471" }
  },

  /* ---- Mon prochain match : quart de finale du Défi eFootball (t05), lot 4 ----
     Heures « simulées » : dans les écrans 11, 14 et 15, le temps défile 30 fois plus vite.
     tour / match : position dans DONNEES.arbres.t05.matchs. */
  monMatch: {
    tournoi: "t05", tour: 1, match: 0, adversaire: "Rachid_GOAT",
    debut: "2026-10-09T21:30",
    convocation: 15,          // convocation 15 min avant le début (S06-02)
    ouverturePresence: 10,    // « Je suis présent » de -10 min au début
    rappel: 5,                // rappel 5 min avant si pas de confirmation
    duree: 15,                // fin prévue du match 15 min après le début
    delaiDeclaration: 30,     // déclaration ouverte 30 min après la fin prévue (S07-01)
    delaiContestation: 30,    // contestation d'une déclaration retenue (S07-02)
    delaiPieces: 30,          // pièces jointes au litige (S07-03)
    presenceAdversaire: "2026-10-09T21:23",  // l'adversaire confirme à 21:23
    reponseAdversaire: 5,     // l'adversaire déclare 5 min après moi
    // Décision d'arbitrage : dépend des captures jointes par le joueur
    decision: {
      avecPieces: "Tes captures montrent le score final. La déclaration de Rachid_GOAT est écartée.",
      sansPieces: "Aucune capture de ta part. Rachid_GOAT a joint une capture montrant le score final 1–2 : sa déclaration est retenue."
    }
  },

  /* ---- Discussion de la salle de match (11, lot 7) ----
     messages : déjà échangés à l'arrivée dans la salle (heures simulées).
     rapides : messages proposés en un geste. reponses : réponse de l'adversaire selon les mots
     du message reçu ; sinon l'une des réponses par défaut, à tour de rôle. */
  chatMatch: {
    messages: [
      { de: "Rachid_GOAT", texte: "Salut ! Prêt pour le quart ?", heure: "21:06" },
      { de: "Rachid_GOAT", texte: "On joue en 10 minutes par mi-temps, comme d'habitude.", heure: "21:07" }
    ],
    rapides: ["Je suis prêt", "Envoie-moi ton code ami", "Je lance l'invitation", "Bien joué !"],
    reponses: [
      { mots: ["code", "ami", "id"], texte: "Mon code ami eFootball : 4821-7730-1156. Ajoute-moi, je valide tout de suite." },
      { mots: ["invit", "lance", "salon"], texte: "Reçu, je rejoins le salon." },
      { mots: ["prêt", "pret", "go"], texte: "Moi aussi. Confirme ta présence dans la salle et on démarre." },
      { mots: ["bien joué", "gg", "bravo", "merci"], texte: "Merci, toi aussi ! Bon match." },
      { mots: ["score", "résultat", "resultat"], texte: "N'oublie pas de déclarer le score, je fais pareil de mon côté." }
    ],
    parDefaut: ["Ok, ça marche.", "Pas de souci 👍", "On fait comme ça."]
  },

  /* ---- Décisions contestables (écran 26, S08-04, S04-05) ---- */
  decisions: {
    exclusion: {
      titre: "Exclusion d'un tournoi", tournoi: "t10",
      motif: "Propos insultants envers un adversaire dans le chat d'un match, signalés le 19 sept.",
      duree: "Jusqu'à la fin de la Free Fire Rentrée Cup (20 sept.)",
      consequence: "Tes matchs restants comptent comme des forfaits ; une dotation non remise est annulée."
    },
    "refus-identifiant": {
      titre: "Inscription refusée : identifiant de jeu déjà inscrit",
      motif: "L'identifiant eFootball « YoussKZ » est déjà inscrit à ce tournoi par un autre compte.",
      duree: "Pour toute la durée du tournoi"
    },
    "refus-compte": {
      titre: "Inscription refusée : compte déjà inscrit",
      motif: "Ton compte Max it est déjà inscrit à ce tournoi sous un autre pseudo.",
      duree: "Pour toute la durée du tournoi"
    },
    "refus-pays": {
      titre: "Inscription refusée : pays non éligible",
      motif: "Ce tournoi n'est pas ouvert aux joueurs du Maroc.",
      duree: "Pour toute la durée du tournoi"
    },
    suspension: {
      titre: "Suspension des inscriptions",
      motif: "3 forfaits en 30 jours : les 19 sept., 2 oct. et 7 oct.",
      duree: "7 jours, jusqu'au 14 oct."
    }
  },

  /* ---- Notifications (S12-01) ----
     Familles réglables dans 27 ; « match-en-cours » (convocation, rappel) ne se désactive pas.
     Chaque notification ouvre un écran : ecran, params (paramètres d'URL), scenario (état de 08…). */
  famillesNotif: [
    { id: "match-en-cours", libelle: "Match en cours", aide: "Convocation et rappel 5 min avant", verrouillee: true },
    { id: "match", libelle: "Résultats et matchs", aide: "Résultat, litige, qualification, élimination, victoire" },
    { id: "inscription", libelle: "Inscriptions", aide: "Acceptée, refusée, sortie de liste d'attente" },
    { id: "tournoi", libelle: "Vie des tournois", aide: "Report, annulation, règlement modifié, nouveau tournoi sur un jeu suivi" },
    { id: "equipe", libelle: "Équipe", aide: "Invitation, demande, équipe inscrite" },
    { id: "abonnement", libelle: "Abonnement", aide: "Activation, reconduction, échec de paiement, expiration" },
    { id: "dotation", libelle: "Dotations", aide: "Dotation versée sur ton numéro Max it" },
    { id: "exclusion", libelle: "Décisions", aide: "Exclusion d'un tournoi ou de la plateforme" },
    { id: "classement", libelle: "Classement mensuel", aide: "MaxPoints crédités, récompenses du mois" }
  ],

  notifications: [
    { id: "n01", famille: "match-en-cours", date: "2026-10-09T21:10", lue: false, ecran: "11",
      titre: "Convocation : quart de finale", texte: "Défi eFootball du vendredi, contre Rachid_GOAT à 21:30. Confirme ta présence dès 21:20." },
    { id: "n02", famille: "match", date: "2026-10-09T20:42", lue: false, ecran: "12", params: { id: "t05" },
      titre: "Qualifié pour les quarts de finale", texte: "Tu as battu Brahim.10 (3–1) au Défi eFootball du vendredi." },
    { id: "n03", famille: "tournoi", date: "2026-10-08T18:00", lue: false, ecran: "07", params: { id: "t01" },
      titre: "Règlement modifié", texte: "Coupe Atlas Free Fire : accepte la version 2 du règlement pour garder ta place." },
    { id: "n04", famille: "match", date: "2026-10-09T20:41", lue: true, ecran: "12", params: { id: "t05" },
      titre: "Résultat enregistré", texte: "Youss_KZ 3–1 Brahim.10 : déclarations identiques, match clos." },
    { id: "n05", famille: "equipe", date: "2026-10-08T12:30", lue: true, ecran: "10", params: { id: "t01" },
      titre: "Équipe inscrite", texte: "Kenitra Kings est complète : elle est inscrite à la Coupe Atlas Free Fire." },
    { id: "n06", famille: "inscription", date: "2026-10-08T10:15", lue: true, ecran: "06", params: { id: "t11" },
      titre: "Liste d'attente : tu es 3e", texte: "PUBG Solo Night est complet. Tu seras prévenu si une place se libère." },
    { id: "n07", famille: "equipe", date: "2026-10-07T19:20", lue: true, ecran: "10", params: { id: "t01" },
      titre: "Demande acceptée", texte: "Yahya_FF a rejoint Kenitra Kings après ta validation." },
    { id: "n08", famille: "equipe", date: "2026-10-07T17:05", lue: true, ecran: "09", params: { id: "t12" },
      titre: "Invitation d'équipe", texte: "Hassan.Pro t'invite à rejoindre Casa Drop Squad pour la PUBG Squad Casablanca." },
    { id: "n09", famille: "tournoi", date: "2026-10-06T09:00", lue: true, ecran: "06", params: { id: "t06" },
      titre: "Tournoi reporté", texte: "CODM Rabat Showdown est reporté au 30 oct. à 20:00." },
    { id: "n10", famille: "tournoi", date: "2026-10-05T11:00", lue: true, ecran: "06", params: { id: "t12" },
      titre: "Nouveau tournoi sur un jeu suivi", texte: "PUBG Squad Casablanca : les inscriptions sont ouvertes." },
    { id: "n11", famille: "tournoi", date: "2026-10-04T16:30", lue: true, ecran: "04",
      titre: "Tournoi annulé", texte: "Tanger Free Fire Cup est annulé faute de participants. Ton inscription est retirée." },
    { id: "n12", famille: "inscription", date: "2026-10-04T08:45", lue: true, ecran: "08", params: { id: "t09" }, scenario: "refus-doublon",
      titre: "Inscription refusée", texte: "MEA eFootball Cup : ton identifiant de jeu est déjà inscrit par un autre compte." },
    { id: "n13", famille: "inscription", date: "2026-10-03T14:10", lue: true, ecran: "06", params: { id: "t05" },
      titre: "Une place s'est libérée", texte: "Tu passes de la liste d'attente aux inscrits du Défi eFootball du vendredi." },
    { id: "n14", famille: "dotation", date: "2026-10-03T10:00", lue: true, ecran: "05",
      titre: "Dotation versée", texte: "500 Mo de data crédités sur ton numéro Max it (Défi eFootball du jeudi)." },
    { id: "n15", famille: "match", date: "2026-10-02T22:40", lue: true, ecran: "05",
      titre: "Victoire finale !", texte: "Tu remportes le Défi eFootball du jeudi. Bravo !" },
    { id: "n16", famille: "match", date: "2026-09-20T22:15", lue: true, ecran: "12", params: { id: "t10" },
      titre: "Éliminé", texte: "Free Fire Rentrée Cup : tu termines 117e sur 128." },
    { id: "n17", famille: "exclusion", date: "2026-09-19T23:00", lue: true, ecran: "26", params: { id: "t10", decision: "exclusion" },
      titre: "Exclusion d'un tournoi", texte: "Tu es exclu de la Free Fire Rentrée Cup. Motif : propos insultants. Tu peux contester." },
    { id: "n18", famille: "abonnement", date: "2026-09-08T00:05", lue: true, ecran: "24",
      titre: "Abonnement expiré", texte: "Ton abonnement mensuel a expiré. Tu es revenu au niveau gratuit, ton historique est conservé." },
    { id: "n19", famille: "abonnement", date: "2026-09-07T08:00", lue: true, ecran: "24",
      titre: "Échec de paiement", texte: "La reconduction de ton abonnement a échoué : solde Orange Money insuffisant." },
    { id: "n20", famille: "abonnement", date: "2026-09-04T09:00", lue: true, ecran: "24",
      titre: "Reconduction à venir", texte: "Ton abonnement mensuel sera reconduit le 7 sept. pour 49 MAD." },
    { id: "n21", famille: "abonnement", date: "2026-08-08T19:30", lue: true, ecran: "21",
      titre: "Abonnement activé", texte: "Bienvenue chez les abonnés : tous les tournois et contenus réservés sont ouverts." },
    { id: "n22", famille: "classement", date: "2026-10-01T00:10", lue: true, ecran: "29", params: { mois: "2026-09", onglet: "gratuits" },
      titre: "Classement de septembre : tu gagnes !", texte: "9e des joueurs gratuits du Maroc avec 290 MaxPoints : 1 semaine d'abonnement offerte, activée automatiquement." },
    { id: "n23", famille: "classement", date: "2026-10-02T22:45", lue: true, ecran: "29",
      titre: "170 MaxPoints crédités", texte: "Défi eFootball du jeudi : 20 points de participation et 150 points pour la 1re place." }
  ],

  /* Pseudonyme anonyme après suppression du compte (S01-04) */
  pseudoAnonyme: "Joueur_anonyme_7F3A",

  /* Forfaits du joueur sur 30 jours (suspension après 3 forfaits, S06-03) */
  forfaits: ["2026-09-19", "2026-10-02", "2026-10-07"],

  /* Pseudos déjà pris (écran 02) */
  pseudosPris: ["Youss_KZ", "ShadowMA", "AtlasKing", "Simba_221", "KingAbidjan", "Zizou10"],

  /* ---- Pays ---- */
  pays: {
    MA: { nom: "Maroc", monnaie: "MAD", indicatif: "+212" },
    SN: { nom: "Sénégal", monnaie: "FCFA", indicatif: "+221" },
    CI: { nom: "Côte d'Ivoire", monnaie: "FCFA", indicatif: "+225" }
  },

  /* ---- Offres d'abonnement par pays (S11-02) ---- */
  offres: {
    MA: [
      { id: "quotidienne", libelle: "Jour", prix: 3, essai: null },
      { id: "hebdomadaire", libelle: "Semaine", prix: 15, essai: null },
      { id: "mensuelle", libelle: "Mois", prix: 49, essai: "7 jours offerts" }
    ],
    SN: [
      { id: "quotidienne", libelle: "Jour", prix: 150, essai: null },
      { id: "hebdomadaire", libelle: "Semaine", prix: 700, essai: null },
      { id: "mensuelle", libelle: "Mois", prix: 2500, essai: null }
    ],
    CI: [
      { id: "quotidienne", libelle: "Jour", prix: 150, essai: null },
      { id: "hebdomadaire", libelle: "Semaine", prix: 750, essai: null },
      { id: "mensuelle", libelle: "Mois", prix: 2500, essai: "3 jours offerts" }
    ]
  },

  /* ---- Jeux ----
     Offres de la boutique Max it (S05-05) : celles du Shop (js/data-shop.js). Un jeu absent du Shop
     (Call of Duty: Mobile) n'affiche pas de lien vers la boutique.
     images : visuels du jeu (dossier images/jeux), affichés sans déformation, recadrés au minimum
     pour remplir chaque emplacement. carre : tuiles et vignettes ; large : bandeaux et en-têtes.
     Pour changer un visuel, remplacer le fichier PNG (même nom) ou modifier le chemin ici.
     Sans image (ou si le fichier manque), le dégradé et le pictogramme du jeu s'affichent. */
  jeux: [
    {
      id: "freefire", nom: "Free Fire", genre: "Battle royale", equipe: 4,
      images: { carre: "images/jeux/freefire-carre.png", large: "images/jeux/freefire-large.png" }
    },
    {
      id: "pubg", nom: "PUBG Mobile", genre: "Battle royale", equipe: 4,
      images: { carre: "images/jeux/pubg-carre.png", large: "images/jeux/pubg-large.png" }
    },
    {
      id: "efootball", nom: "eFootball", genre: "Football", equipe: 1,
      images: { carre: "images/jeux/efootball-carre.png", large: "images/jeux/efootball-large.png" }
    },
    {
      id: "codm", nom: "Call of Duty: Mobile", genre: "Tir", equipe: 5,
      images: { carre: "images/jeux/codm-carre.png", large: "images/jeux/codm-large.png" }
    }
  ],

  /* ---- Tournois ----
     acces : "tous" ou "abonnes" (S03-04)
     portee : "local" ou "MEA" (S03-07) ; pays : pays où le tournoi est ouvert
     mode : "solo" ou "equipe" ; format : "elimination" ou "poules"
     etat : "ouvert", "complet", "en-cours", "termine" */
  tournois: [
    {
      id: "t01", nom: "Coupe Atlas Free Fire", jeu: "freefire", acces: "tous",
      portee: "local", pays: ["MA"], mode: "equipe", format: "elimination",
      debut: "2026-10-18T20:00", ouverture: "2026-10-01", cloture: "2026-10-17",
      places: 64, inscrits: 41, dotations: ["2 000 MAD", "1 000 MAD", "500 MAD"], etat: "ouvert",
      // Règlement modifié après l'ouverture des inscriptions : nouvelle acceptation requise (S03-03)
      reglement: {
        version: 2, modifie: true, date: "2026-10-08",
        changements: [
          "Article 3 : la présence se confirme désormais 10 minutes avant le match, au lieu de 5.",
          "Article 6 : la dotation de la 3e place passe de 250 à 500 MAD."
        ]
      }
    },
    {
      id: "t02", nom: "eFootball Masters Casablanca", jeu: "efootball", acces: "abonnes",
      portee: "local", pays: ["MA"], mode: "solo", format: "elimination",
      debut: "2026-10-12T19:00", ouverture: "2026-09-28", cloture: "2026-10-11",
      places: 128, inscrits: 97, dotations: ["10 Go de data", "5 Go de data", "2 Go de data"], etat: "ouvert",
      reglement: { version: 1 }
    },
    {
      id: "t03", nom: "Ligue eFootball du Royaume", jeu: "efootball", acces: "tous",
      portee: "local", pays: ["MA"], mode: "solo", format: "poules",
      debut: "2026-10-05T18:00", ouverture: "2026-09-20", cloture: "2026-10-03",
      places: 16, inscrits: 16, dotations: ["3 000 MAD", "1 500 MAD"], etat: "en-cours",
      reglement: { version: 1 }
    },
    {
      id: "t04", nom: "MEA Free Fire Championship", jeu: "freefire", acces: "abonnes",
      portee: "MEA", pays: ["MA", "SN", "CI"], mode: "equipe", format: "poules",
      debut: "2026-11-08T17:00", ouverture: "2026-10-01", cloture: "2026-11-05",
      places: 256, inscrits: 88, dotations: ["Un smartphone par membre", "50 Go de data par membre"], etat: "ouvert",
      reglement: { version: 1 }
    },
    {
      id: "t05", nom: "Défi eFootball du vendredi", jeu: "efootball", acces: "tous",
      portee: "local", pays: ["MA"], mode: "solo", format: "elimination",
      debut: "2026-10-09T20:00", ouverture: "2026-10-02", cloture: "2026-10-08",
      places: 16, inscrits: 16, dotations: ["1 Go de data", "500 Mo de data"], etat: "en-cours",
      reglement: { version: 1 }
    },
    {
      id: "t06", nom: "CODM Rabat Showdown", jeu: "codm", acces: "abonnes",
      portee: "local", pays: ["MA"], mode: "equipe", format: "elimination",
      debut: "2026-10-30T20:00", ouverture: "2026-10-06", cloture: "2026-10-28",
      places: 16, inscrits: 6, dotations: ["2 500 MAD"], etat: "ouvert",
      reglement: { version: 1 }
    },
    {
      id: "t07", nom: "Coupe de la Teranga eFootball", jeu: "efootball", acces: "tous",
      portee: "local", pays: ["SN"], mode: "solo", format: "elimination",
      debut: "2026-10-19T20:00", ouverture: "2026-10-01", cloture: "2026-10-17",
      places: 64, inscrits: 52, dotations: ["100 000 FCFA", "50 000 FCFA"], etat: "ouvert",
      reglement: { version: 1 }
    },
    {
      id: "t08", nom: "Abidjan PUBG Night", jeu: "pubg", acces: "abonnes",
      portee: "local", pays: ["CI"], mode: "equipe", format: "poules",
      debut: "2026-10-24T21:00", ouverture: "2026-10-03", cloture: "2026-10-22",
      places: 24, inscrits: 11, dotations: ["150 000 FCFA"], etat: "ouvert",
      reglement: { version: 1 }
    },
    {
      id: "t09", nom: "MEA eFootball Cup", jeu: "efootball", acces: "tous",
      portee: "MEA", pays: ["MA", "SN"], mode: "solo", format: "poules",
      debut: "2026-11-15T19:00", ouverture: "2026-10-08", cloture: "2026-11-12",
      places: 512, inscrits: 143, dotations: ["Une console de jeu", "20 Go de data"], etat: "ouvert",
      reglement: { version: 1 }
    },
    {
      id: "t10", nom: "Free Fire Rentrée Cup", jeu: "freefire", acces: "tous",
      portee: "local", pays: ["MA"], mode: "solo", format: "elimination",
      debut: "2026-09-20T20:00", ouverture: "2026-09-01", cloture: "2026-09-18",
      places: 128, inscrits: 128, dotations: ["1 000 MAD", "500 MAD", "250 MAD"], etat: "termine",
      reglement: { version: 1 },
      // Classement recalculé après une décision d'arbitrage (S05-04)
      recalcul: "Classement recalculé le 21/09 après une décision d'arbitrage."
    },
    {
      // Tournoi en équipe ouvert à tous, sans le joueur : parcours équipe testable en mode gratuit
      id: "t12", nom: "PUBG Squad Casablanca", jeu: "pubg", acces: "tous",
      portee: "local", pays: ["MA"], mode: "equipe", format: "elimination",
      debut: "2026-10-25T20:00", ouverture: "2026-10-05", cloture: "2026-10-23",
      places: 32, inscrits: 19, dotations: ["4 000 MAD", "2 000 MAD", "1 000 MAD"], etat: "ouvert",
      reglement: { version: 1 }
    },
    {
      id: "t11", nom: "PUBG Solo Night", jeu: "pubg", acces: "tous",
      portee: "local", pays: ["MA"], mode: "solo", format: "elimination",
      debut: "2026-10-16T21:00", ouverture: "2026-10-04", cloture: "2026-10-15",
      places: 32, inscrits: 32, dotations: ["800 MAD"], etat: "complet",
      reglement: { version: 1 }
    }
  ],

  /* ---- Arbre du Défi eFootball (t05) : élimination simple à 16 joueurs (S02-02) ----
     Chaque match : [joueur A, joueur B, score A, score B] ; score null = pas encore joué.
     Le quart « en direct » reçoit son résultat pendant la démo (S06-01). */
  arbres: {
    t05: {
      tours: ["Huitièmes", "Quarts", "Demi-finales", "Finale"],
      matchs: [
        [
          ["Youss_KZ", "Brahim.10", 3, 1], ["Rachid_GOAT", "Sanaa_FC", 2, 0],
          ["AtlasKing", "Mehdi_Gz", 1, 1, "AtlasKing"], ["Nour.ElHoda", "Tarik_77", 4, 2],
          ["ShadowMA", "Ilyas_Pro", 2, 3], ["Zakaria.B", "Hamza_OCS", 0, 2],
          ["Karim_RCA", "Yassine_MAS", 1, 0], ["Salma_WAC", "Anas_10", 2, 1]
        ],
        [
          ["Youss_KZ", "Rachid_GOAT", null, null, null, "a-jouer"],
          ["AtlasKing", "Nour.ElHoda", 1, 2],
          ["Ilyas_Pro", "Hamza_OCS", 2, 1, null, "en-direct"],
          ["Karim_RCA", "Salma_WAC", null, null]
        ],
        [[null, "Nour.ElHoda", null, null], [null, null, null, null]],
        [[null, null, null, null]]
      ],
      // Résultat qui arrive pendant la démo : quart n° 3 (index 2)
      resultatLive: { tour: 1, match: 2, scoreA: 3, scoreB: 1 },
      // Heure de mon prochain match
      monMatch: "21:30"
    },
    t10: {
      // Tournoi terminé : seule la phase finale est affichée
      tours: ["Quarts", "Demi-finales", "Finale"],
      matchs: [
        [["Simba_FF", "Dounia_X", 2, 0], ["Amine.Booyah", "Rayan_212", 1, 2],
         ["Kenza_GG", "Omar_Sniper", 2, 1], ["Hakim_FF", "Lina.Fire", 0, 2]],
        [["Simba_FF", "Rayan_212", 2, 1], ["Kenza_GG", "Lina.Fire", 1, 2]],
        [["Simba_FF", "Lina.Fire", 2, 1]]
      ]
    }
  },

  /* ---- Poules de la Ligue eFootball du Royaume (t03, S02-03) ----
     Barème : victoire 3, nul 1, défaite 0. 2 qualifiés par poule.
     critere : critère de départage affiché quand deux joueurs ont les mêmes points (S06-04). */
  poules: {
    t03: [
      { nom: "Poule A", joueurs: [
        { pseudo: "Zizou10", j: 3, v: 2, n: 1, d: 0, diff: 5, pts: 7 },
        { pseudo: "Mouad_FC", j: 3, v: 2, n: 0, d: 1, diff: 2, pts: 6, critere: "Confrontation directe" },
        { pseudo: "Ayoub.R", j: 3, v: 2, n: 0, d: 1, diff: 3, pts: 6 },
        { pseudo: "Soufiane_7", j: 3, v: 0, n: 1, d: 2, diff: -10, pts: 1 }
      ] },
      { nom: "Poule B", joueurs: [
        { pseudo: "Reda_KAC", j: 3, v: 3, n: 0, d: 0, diff: 7, pts: 9 },
        { pseudo: "Imane_GG", j: 3, v: 1, n: 1, d: 1, diff: 1, pts: 4, critere: "Différence de buts" },
        { pseudo: "Walid.MAS", j: 3, v: 1, n: 1, d: 1, diff: -1, pts: 4 },
        { pseudo: "Ghita_10", j: 3, v: 0, n: 0, d: 3, diff: -7, pts: 0 }
      ] },
      { nom: "Poule C", joueurs: [
        { pseudo: "Badr_Pro", j: 2, v: 2, n: 0, d: 0, diff: 4, pts: 6 },
        { pseudo: "Othmane_FUT", j: 2, v: 1, n: 0, d: 1, diff: 0, pts: 3 },
        { pseudo: "Fatima.Z", j: 2, v: 0, n: 1, d: 1, diff: -1, pts: 1 },
        { pseudo: "Adil_RSB", j: 2, v: 0, n: 1, d: 1, diff: -3, pts: 1, critere: "Nombre de victoires puis tirage au sort" }
      ] },
      { nom: "Poule D", joueurs: [
        { pseudo: "Hicham.M", j: 2, v: 1, n: 1, d: 0, diff: 2, pts: 4 },
        { pseudo: "Sara_Goal", j: 2, v: 1, n: 1, d: 0, diff: 1, pts: 4, critere: "Différence de buts" },
        { pseudo: "Nabil_10", j: 2, v: 0, n: 1, d: 1, diff: -1, pts: 1 },
        { pseudo: "Khalid.T", j: 2, v: 0, n: 1, d: 1, diff: -2, pts: 1, critere: "Confrontation directe" }
      ] }
    ]
  },

  /* Pseudos utilisés pour générer les longs classements (t10 : 128 joueurs) */
  pseudosClassement: [
    "Simba_FF", "Lina.Fire", "Rayan_212", "Kenza_GG", "Dounia_X", "Amine.Booyah", "Omar_Sniper", "Hakim_FF",
    "Ali_Headshot", "Meryem.FF", "Driss_Rush", "Jihane_GG", "Saad.Booyah", "Houda_FF", "Ismail_Pro", "Nadia.X",
    "Taha_Sniper", "Rania_212", "Yahya_FF", "Asmae.G", "Bilal_Rush", "Chaimae_FF", "Hassan.Pro", "Leila_GG"
  ],

  /* ---- Contenus (articles et vidéos) ----
     acces : "tous" ou "abonnes" (règle choisie par le responsable local, S09-02)
     Vidéo : duree en secondes ; bandeAnnonce : durée de l'extrait lisible par tous (S11-01), ou absent ;
     sousTitres : [seconde de début, texte], répétés en boucle dans le lecteur simulé.
     Article : resume (visible par tous) et corps (paragraphes, réservé aux abonnés si acces = "abonnes"). */
  contenus: [
    { id: "c01", type: "video", jeu: "freefire", titre: "Les 5 meilleures rotations sur Bermuda", duree: 522, acces: "tous", date: "2026-10-06",
      description: "Où se placer à chaque zone pour finir dans le top 3 : les rotations des pros expliquées sur la carte.",
      sousTitres: [[0, "Salut à tous, aujourd'hui on parle rotations sur Bermuda."], [6, "Première règle : ne jamais traverser la carte à découvert."], [12, "On longe la falaise pour rejoindre Clock Tower."], [18, "À la deuxième zone, prends la hauteur avant les autres."], [24, "Et garde toujours un véhicule à portée."]] },
    { id: "c02", type: "video", jeu: "efootball", titre: "Finale Masters Casablanca : le résumé", duree: 735, acces: "abonnes", bandeAnnonce: 45, date: "2026-10-05",
      description: "Tous les buts et les moments forts de la finale entre Reda_KAC et Zizou10, commentés en direct.",
      sousTitres: [[0, "Bienvenue pour cette finale des Masters de Casablanca !"], [6, "Reda_KAC ouvre le score dès la 12e minute."], [12, "Zizou10 répond sur coup franc, quelle frappe !"], [18, "Prolongation : tout se joue maintenant."]] },
    { id: "c03", type: "article", jeu: "pubg", titre: "PUBG Solo Night : tout savoir avant de s'inscrire", resume: "Dates, format et dotations de la soirée.", acces: "tous", date: "2026-10-04", lecture: 3,
      corps: ["La PUBG Solo Night revient le 16 octobre à 21 h. Trente-deux joueurs s'affrontent en solo sur Erangel, en trois manches.",
        "Le classement additionne les points de placement et d'élimination. Le vainqueur remporte 800 MAD, versés sur son numéro Max it.",
        "Les inscriptions sont complètes, mais la liste d'attente reste ouverte : la première place libérée revient au premier inscrit."] },
    { id: "c04", type: "article", jeu: "efootball", titre: "Défendre en 4-2-3-1 : le guide complet", resume: "Placement, pressing et transitions expliqués par un pro.", acces: "abonnes", date: "2026-10-03", lecture: 6,
      corps: ["Le 4-2-3-1 reste le système le plus joué en compétition. Sa force : deux milieux défensifs qui protègent l'axe.",
        "Premier réflexe : ne sortez jamais vos deux sentinelles en même temps. L'une presse, l'autre couvre l'espace devant la défense.",
        "Sur les transitions, repliez votre ailier du côté du ballon. Vous fermez la passe en profondeur et forcez l'adversaire à jouer large.",
        "Enfin, réglez le pressing sur « après perte de balle » : vous récupérez haut sans vous exposer aux contres."] },
    { id: "c05", type: "video", jeu: "codm", titre: "Réglages manette pour CODM", duree: 390, acces: "abonnes", bandeAnnonce: 30, date: "2026-10-02",
      description: "Sensibilité, zone morte, boutons : les réglages qui font la différence en classé.",
      sousTitres: [[0, "Voici mes réglages manette pour Call of Duty: Mobile."], [6, "Sensibilité de visée : 6 en horizontal, 5 en vertical."], [12, "Réduisez la zone morte à 10 %."]] },
    { id: "c06", type: "article", jeu: "freefire", titre: "Coupe Atlas : comment inscrire son escouade", resume: "Créer son équipe, inviter ses amis, valider l'inscription.", acces: "tous", date: "2026-10-01", lecture: 4,
      corps: ["La Coupe Atlas Free Fire se joue en escouades de quatre. Pour participer, l'un d'entre vous crée l'équipe depuis la page du tournoi.",
        "Le capitaine choisit si l'équipe est ouverte ou fermée, puis invite ses coéquipiers par leur pseudo ou partage le lien de l'équipe.",
        "Dès que le quatrième joueur rejoint l'équipe, elle est inscrite automatiquement. Attention : une équipe incomplète à la clôture n'est pas inscrite."] },
    { id: "c07", type: "video", jeu: "pubg", titre: "Interview : l'équipe championne d'Abidjan", duree: 545, acces: "tous", date: "2026-09-30",
      description: "Les vainqueurs de l'Abidjan PUBG Night racontent leur préparation et leur stratégie.",
      sousTitres: [[0, "On s'entraîne tous les soirs après le travail."], [6, "Le secret, c'est la communication."], [12, "Rendez-vous à la prochaine édition !"]] },
    { id: "c08", type: "article", jeu: "freefire", titre: "Les armes les plus fortes de la saison", resume: "Notre classement après la dernière mise à jour.", acces: "abonnes", date: "2026-09-29", lecture: 5,
      corps: ["La dernière mise à jour a rebattu les cartes. En tête de notre classement, le MP40 reste imbattable à courte distance.",
        "À moyenne portée, le Woodpecker profite de la hausse de ses dégâts. Il devient le meilleur choix en fin de partie.",
        "Grande perdante : la M1887, dont la cadence a été réduite. Gardez-la pour les combats en intérieur."] },
    { id: "c09", type: "video", jeu: "efootball", titre: "Analyse : les 10 plus beaux buts de la saison", duree: 440, acces: "abonnes", date: "2026-09-27",
      description: "Retour sur les plus beaux buts des tournois eFootball du Maroc, analysés image par image.",
      sousTitres: [[0, "Numéro 10 : une volée de Badr_Pro en poule."], [6, "Numéro 9 : le slalom de Sara_Goal."]] },
    { id: "c10", type: "article", jeu: "efootball", titre: "Ligue du Royaume : le point après la 3e journée", resume: "Qui file vers la phase finale, qui doit s'imposer.", acces: "tous", date: "2026-10-08", lecture: 3,
      corps: ["Reda_KAC survole la poule B avec trois victoires. Dans la poule A, Zizou10 est déjà qualifié.",
        "Mouad_FC et Ayoub.R comptent six points chacun : la confrontation directe a donné l'avantage à Mouad_FC.",
        "Dernière journée lundi soir. Les deux premiers de chaque poule rejoignent la phase finale à élimination directe."] }
  ],

  /* Motifs proposés pour signaler un contenu (S09-02 : 3 signalements = retrait en attente de revue) */
  motifsSignalement: ["Contenu choquant ou haineux", "Fausse information", "Triche ou piratage", "Publicité ou spam", "Autre raison"],

  /* Identifiants de jeu déjà rattachés à d'autres profils (S01-02) */
  gamertagsPris: { freefire: ["ShadowMA#0001", "AtlasKing#7777"], pubg: ["KingAbidjan"], efootball: ["Zizou10"], codm: ["SniperCasa"] },

  /* Solde Orange Money affiché dans la brique de paiement simulée (22) */
  soldeOrangeMoney: 230.5,

  /* ---- Badges à collectionner (profil 17, lot 7) ----
     Un badge est obtenu :
     - compteur / objectif : quand la statistique du joueur atteint l'objectif (progression affichée sinon) ;
     - place : quand le meilleur classement du joueur est dans les « place » premiers ;
     - sinon : quand il figure dans stats.obtenus, avec sa date. */
  badges: [
    { id: "premier-tournoi", nom: "Baptême du feu", description: "Disputer son premier tournoi.", icone: "fanion" },
    { id: "premiere-victoire", nom: "Premier succès", description: "Gagner son premier match.", icone: "coche", compteur: "gagnes", objectif: 1 },
    { id: "dix-victoires", nom: "10 victoires", description: "Gagner 10 matchs en tournoi.", icone: "medaille", compteur: "gagnes", objectif: 10 },
    { id: "cinquante-victoires", nom: "50 victoires", description: "Gagner 50 matchs en tournoi.", icone: "medaille", compteur: "gagnes", objectif: 50 },
    { id: "serie-5", nom: "Inarrêtable", description: "Gagner 5 matchs d'affilée.", icone: "eclair", compteur: "serieRecord", objectif: 5 },
    { id: "podium", nom: "Podium", description: "Finir dans les 3 premiers d'un tournoi.", icone: "podium", place: 3 },
    { id: "champion", nom: "Champion", description: "Remporter un tournoi.", icone: "trophee", place: 1 },
    { id: "fair-play", nom: "Fair-play", description: "Disputer 10 matchs d'affilée sans forfait.", icone: "bouclier", compteur: "sansForfait", objectif: 10 },
    { id: "polyvalent", nom: "Polyvalent", description: "Disputer des tournois sur 3 jeux différents.", icone: "manette", compteur: "jeux", objectif: 3 },
    { id: "equipe", nom: "Esprit d'équipe", description: "Disputer un tournoi en équipe.", icone: "groupe" },
    { id: "mea", nom: "Voyageur MEA", description: "Disputer un tournoi MEA, ouvert à plusieurs pays.", icone: "globe" },
    { id: "top-mensuel", nom: "Top 10 du mois", description: "Finir dans les 10 premiers du classement mensuel MaxPoints de son pays.", icone: "etoile" },
    { id: "veteran", nom: "Vétéran", description: "Joueur de l'ancienne plateforme, historique repris.", icone: "calendrier" }
  ],

  /* Statistiques publiques des autres joueurs (17) ; un joueur absent reçoit des chiffres tirés de son pseudo */
  statsJoueurs: {
    Rachid_GOAT: { matchs: 41, gagnes: 27, meilleurePlace: 1, meilleurTournoi: "Défi eFootball du mardi", serieRecord: 7, sansForfait: 18, jeux: 2,
      obtenus: { "premier-tournoi": "2026-06-02", "top-mensuel": "2026-09-30", veteran: "2026-06-01" } },
    "Nour.ElHoda": { matchs: 29, gagnes: 18, meilleurePlace: 2, meilleurTournoi: "Ligue eFootball du Royaume", serieRecord: 4, sansForfait: 29, jeux: 1,
      obtenus: { "premier-tournoi": "2026-07-11" } },
    Simba_FF: { matchs: 63, gagnes: 44, meilleurePlace: 1, meilleurTournoi: "Free Fire Rentrée Cup", serieRecord: 9, sansForfait: 31, jeux: 3,
      obtenus: { "premier-tournoi": "2026-05-20", equipe: "2026-06-14", mea: "2026-07-05", "top-mensuel": "2026-09-30", veteran: "2026-05-20" } },
    Zizou10: { matchs: 52, gagnes: 39, meilleurePlace: 1, meilleurTournoi: "Masters Casablanca", serieRecord: 11, sansForfait: 52, jeux: 1,
      obtenus: { "premier-tournoi": "2026-05-02", mea: "2026-08-22", "top-mensuel": "2026-08-31", veteran: "2026-05-01" } }
  },

  /* ---- MaxPoints et classement mensuel (Epic E15, V2, ajouté au lot 7) ----
     Chaque tournoi rapporte des MaxPoints ; chaque mois et dans chaque pays, deux classements :
     ouvert à tous (cadeaux) et réservé aux joueurs gratuits (abonnements offerts). */
  maxpoints: {
    // Barème commun aux 17 pays, défini par le responsable MEA (S15-01)
    bareme: {
      participation: 20,
      places: [
        { libelle: "1re place", points: 150 }, { libelle: "2e place", points: 100 }, { libelle: "3e – 4e place", points: 70 },
        { libelle: "5e – 8e place", points: 30 }, { libelle: "9e – 16e place", points: 15 }
      ]
    },
    // Récompenses du mois, définies par le responsable local du Maroc (S15-02, S15-03)
    // jusqua : dernier rang qui reçoit ce lot ; les 10 premiers de chaque classement sont récompensés
    recompenses: {
      tous: [
        { rangs: "1er", jusqua: 1, lot: "Un smartphone Samsung Galaxy A16" },
        { rangs: "2e – 3e", jusqua: 3, lot: "Un casque gaming sans fil" },
        { rangs: "4e – 10e", jusqua: 10, lot: "5 Go de data Orange" }
      ],
      gratuits: [
        { rangs: "1er – 3e", jusqua: 3, lot: "1 mois d'abonnement offert" },
        { rangs: "4e – 10e", jusqua: 10, lot: "1 semaine d'abonnement offerte" }
      ]
    },

    // Mes MaxPoints, un crédit par tournoi clôturé (S15-01 : tournoi, date, points)
    historique: [
      { tournoi: "Défi eFootball du mardi", date: "2026-10-06", points: 50, detail: "Participation 20 + 5e – 8e place 30" },
      { tournoi: "Défi eFootball du jeudi", date: "2026-10-02", points: 170, detail: "Participation 20 + 1re place 150" },
      { tournoi: "Défi eFootball du jeudi", date: "2026-09-25", points: 120, detail: "Participation 20 + 2e place 100" },
      { tournoi: "Free Fire Rentrée Cup", date: "2026-09-20", points: 0, detail: "Exclu du tournoi : aucun point" },
      { tournoi: "Défi eFootball du jeudi", date: "2026-09-18", points: 170, detail: "Participation 20 + 1re place 150" },
      { tournoi: "Défi eFootball du jeudi", date: "2026-08-27", points: 50, detail: "Participation 20 + 5e – 8e place 30" },
      { tournoi: "Coupe d'été Free Fire", date: "2026-08-14", points: 35, detail: "Participation 20 + 9e – 16e place 15" }
    ],
    // Crédit ajouté par le raccourci de démo « MaxPoints crédités » (clôture du Défi du vendredi)
    creditDemo: { tournoi: "Défi eFootball du vendredi", points: 50, detail: "Participation 20 + 5e – 8e place 30" },

    // Mois consultables ; les mois clôturés gardent leurs 10 premiers et leurs gagnants (S15-04)
    mois: [
      { id: "2026-10", libelle: "Octobre 2026", fin: "2026-10-31", enCours: true },
      { id: "2026-09", libelle: "Septembre 2026", fin: "2026-09-30",
        tous: [["Simba_FF", 1180], ["Rachid_GOAT", 1105], ["Zizou10", 990], ["Lina.Fire", 870], ["Reda_KAC", 815],
          ["Rayan_212", 760], ["Kenza_GG", 702], ["Badr_Pro", 655], ["Nour.ElHoda", 610], ["Ilyas_Pro", 575]],
        gratuits: [["Lina.Fire", 870], ["Rayan_212", 760], ["Ilyas_Pro", 575], ["Dounia_X", 498], ["Sara_Goal", 455],
          ["Hamza_OCS", 402], ["Omar_Sniper", 351], ["Meryem.FF", 318], [null, 290], ["Chaimae_FF", 270]],
        maPlaceTous: 16, maPlaceGratuits: 9 },
      { id: "2026-08", libelle: "Août 2026", fin: "2026-08-31",
        tous: [["Zizou10", 1240], ["Simba_FF", 1090], ["Reda_KAC", 960], ["Rachid_GOAT", 905], ["Kenza_GG", 780],
          ["Badr_Pro", 744], ["Lina.Fire", 690], ["Amine.Booyah", 640], ["Hakim_FF", 590], ["Mouad_FC", 560]],
        gratuits: [["Lina.Fire", 690], ["Amine.Booyah", 640], ["Hakim_FF", 590], ["Sanaa_FC", 520], ["Taha_Sniper", 470],
          ["Asmae.G", 415], ["Driss_Rush", 380], ["Houda_FF", 341], ["Jihane_GG", 300], ["Ali_Headshot", 276]],
        // Abonné en août : absent du classement des joueurs gratuits
        maPlaceTous: 74, maPlaceGratuits: null }
    ],

    // Mois en cours : joueurs du Maroc générés à partir de ces pseudos (voir Esport.classementMensuel)
    vedettes: ["Zizou10", "Simba_FF", "Rachid_GOAT", "Reda_KAC", "Lina.Fire", "Badr_Pro", "Nour.ElHoda", "Kenza_GG",
      "Rayan_212", "Ilyas_Pro", "Mouad_FC", "Sara_Goal", "Hamza_OCS", "AtlasKing", "Imane_GG", "Brahim.10"],
    bases: ["Atlas", "Casa", "Rabat", "Tanger", "Fes", "Agadir", "Oujda", "Sahara", "Lion", "Faucon", "Viper", "Ninja", "Storm", "Booyah"],
    suffixes: ["_FF", "_212", ".Pro", "_GG", "10", "_MA", "_Rush", "99"]
  },

  /* ---- Fonctionnalités activées par pays (S08-02) ---- */
  fonctions: {
    MA: { video: true, sms: true },
    SN: { video: true, sms: false },
    CI: { video: false, sms: true }
  }
};
