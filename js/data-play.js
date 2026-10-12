/* Données fictives de Max it Gaming Play, la mini app des mini-jeux (reference/backlog-play.html).
   Ce fichier remplace le back-office (Epics E01 à E05), qui n'est pas maquetté :
   partenaires, catalogue, genres, jeux proposés par pays, badges, jeu à la une, « Recommandé pour vous »,
   popularité, classements. Noms de jeux et de partenaires fictifs. Les visuels sans image sont dessinés
   en SVG par js/play.js à partir de « palette » (couleurs de tokens.css) et « picto » (pictogramme du jeu).
   Les textes de l'interface (français, anglais, arabe) sont dans js/textes-play.js. */

const PLAY = {
  /* Pays du joueur par défaut (compte Max it) ; le menu de démo permet de passer au Sénégal */
  paysParDefaut: "MA",

  /* ---- Partenaires (S01-01) ----
     modele A : une mini app par jeu ; modele B : hub regroupant plusieurs jeux, ouvert directement
     sur le jeu par lien direct (S08-01), avec le bouton de sortie de Max it (S08-02).
     mention : affiche « Fourni par … » sur la fiche ; sinon marque blanche totale.
     scores : le partenaire transmet le score de chaque partie ; sinon pas de classement (S07-04). */
  partenaires: {
    kora: { nom: "Kora Games", modele: "A", mention: true, scores: true },
    baobab: { nom: "Baobab Arcade", modele: "B", mention: false, scores: true },
    zenith: { nom: "Zénith Jeux", modele: "B", mention: false, scores: false }
  },

  /* ---- Genres (S02-02) : couleur --play-g-<id> de tokens.css ; noms traduits dans js/textes-play.js ---- */
  genres: [
    { id: "action" }, { id: "arcade" }, { id: "course" }, { id: "puzzle" }, { id: "casual" },
    { id: "sport" }, { id: "cartes" }, { id: "quiz" }, { id: "aventure" }, { id: "strategie" }
  ],

  /* ---- Paramétrage par pays ----
     ordreGenres : ordre des rangées par genre (S03-05) ;
     aLaUne : jeu à la une (S03-01) ;
     recommandes : sélection ordonnée « Recommandé pour vous » du responsable local (S03-04) ;
     sansData : jeux sans consommation de data, badge V2 (S02-05) ; vide si le pays n'a pas la gratuité. */
  pays: {
    MA: {
      nom: "Maroc",
      ordreGenres: ["sport", "course", "puzzle", "action", "casual", "cartes", "arcade", "quiz", "aventure", "strategie"],
      aLaUne: "tresor-baobab",
      recommandes: ["cuisine-mama", "bijoux-atlas", "chat-calin", "quiz-afrique", "ludo-famille", "moto-casbah", "solitaire-zen", "serpent-neon"],
      sansData: []
    },
    SN: {
      nom: "Sénégal",
      ordreGenres: ["sport", "cartes", "casual", "puzzle", "arcade", "quiz", "action", "course", "aventure", "strategie"],
      aLaUne: "foot-lions",
      recommandes: ["ludo-famille", "cuisine-mama", "dames-pro", "quiz-afrique", "chat-calin", "tours-defense", "bulles-party", "fruits-folie"],
      sansData: ["foot-lions", "ludo-famille", "cuisine-mama", "dames-pro", "quiz-afrique", "bloc-mania", "taxi-brousse"]
    }
  },
  /* Jeu à la une défini par le responsable MEA, si aucun n'est programmé dans le pays */
  aLaUneMEA: "ninja-sahel",

  /* ---- Le joueur au début de la démo (le menu « Nouveau joueur » vide son historique) ----
     pseudoGenere : affiché tant que le profil joueur (V2) n'existe pas, dans les classements et sous les avis ;
     pseudo : pseudo choisi, commun avec la plateforme de tournois (profil V2, S11-01). */
  joueur: {
    pseudoGenere: "Joueur4821",
    pseudo: "Youss_KZ",
    recents: ["foot-lions", "bloc-mania", "rallye-dunes"],  // du plus récent au plus ancien
    favoris: ["bloc-mania", "ludo-famille"],                 // le dernier ajouté en premier
    // Avis déjà laissés (S10-01) : un seul par jeu, modifiable ou supprimable
    avis: { "foot-lions": { note: 5, texte: "Le meilleur jeu de foot de Play. Les matchs à deux sur le même téléphone sont géniaux.", date: "2026-10-02" } },
    // Pseudo et avatar (V2, S11-01) : dernier changement de pseudo (même date que js/data.js, pseudo commun
    // avec la plateforme de tournois) ; avatar emoji choisi dans PLAY.avatars
    pseudoModifieLe: "2026-08-20",
    avatar: "🦊",
    // Profil (V2, S11-02) : statistiques mesurées par Max it, d'après les indicateurs du profil joueur
    // du Game Hub de Samsung (KPI repris, pas la charte graphique)
    stats: {
      parties: 148, partiesSemaine: 23, serie: 3,
      dernier: { ilYa: 41 },                       // dernier jeu (premier des récents), lancé il y a 41 min
      aujourdhui: { jeux: 2, minutes: 62 },        // jeux joués et durée de jeu aujourd'hui
      // Historique sur 6 mois (données jusqu'à hier) ; les périodes de 30 et 7 jours en sont une part (voir js/play.js).
      // minutes : temps de jeu ; lancements : nombre d'ouvertures ; session : plus longue session unique, en minutes
      sixMois: {
        moment: "soir", genre: "sport",
        parJeu: {
          "foot-lions": { minutes: 2540, lancements: 412, session: 74 },
          "bloc-mania": { minutes: 1630, lancements: 286, session: 52 },
          "rallye-dunes": { minutes: 905, lancements: 133, session: 93 },
          "ludo-famille": { minutes: 610, lancements: 64, session: 68 },
          "cuisine-mama": { minutes: 344, lancements: 41, session: 31 },
          "quiz-afrique": { minutes: 210, lancements: 37, session: 22 },
          "mot-juste": { minutes: 96, lancements: 48, session: 9 }
        }
      },
      // Moyennes des autres joueurs du pays, sur 6 mois
      autres: { minutes: 5256, jeux: 5, session: 351 }
    }
  },

  /* ---- Avatars emoji proposés au joueur (V2, S11-01) : sans personnage ni marque ---- */
  avatars: ["🦊", "🐼", "🐯", "🦁", "🐸", "🐵", "🐧", "🦄", "🐢", "🐙", "🦋", "🐝", "🍉", "🍓", "⚽", "🎲"],

  /* ---- Pseudos déjà pris dans les 17 pays (S11-01 : pseudo unique), en plus des joueurs ci-dessous ---- */
  pseudosPris: ["Lion_Dakar", "Rachid_GOAT", "Taha_Sniper", "Champion", "SuperJoueur", "Max_it", "Kofi.Gh", "Ines_Tunis"],

  /* ---- Positions du joueur dans les classements (S07-04) ----
     Par jeu, pour le jour, la semaine et tous les temps (null : pas encore classé sur la période).
     Les autres jeux déjà lancés reçoivent des positions calculées par js/play.js. */
  mesPositions: {
    "foot-lions": { jour: 3, semaine: 12, tout: 250 },
    "bloc-mania": { jour: null, semaine: 41, tout: 87 },
    "rallye-dunes": { jour: 18, semaine: 64, tout: 312 }
  },

  /* ---- Autres joueurs du pays (avis, classements, profils V2) ----
     Chacun a un pseudo choisi (profil V2) ; au MVP, un pseudo généré « Joueur » + 4 chiffres s'affiche. */
  joueurs: {
    MA: ["Salma_ElA", "Omar_Casa", "Karim_Rbt", "Nadia.M", "Yassine_Fes", "Imane.Tng", "Hamza_Agadir", "Sara_Mkch",
      "Mehdi_Oujda", "Kenza.R", "Ayoub_Meknes", "Lina_Tetouan", "Reda_Kenitra", "Hiba.S", "Anas_Safi", "Rim_Eljadida",
      "Zakaria_9", "Ilyas.B", "Malak_Ifrane", "Adam_Nador"],
    SN: ["Mamadou221", "Awa_Dkr", "Fatou_Sn", "Ibou_Thies", "Aminata.D", "Moussa_Zig", "Khady_Rufisque", "Cheikh.B",
      "Ndeye_Mbour", "Ousmane_SL", "Astou_Pikine", "Babacar.N", "Seynabou_K", "Modou_Touba", "Coumba.F", "Pape_Kaolack",
      "Mariama_G", "Alioune.S", "Bineta_Dk", "Lamine_221"]
  },

  /* ---- Avis des autres joueurs (E10) ----
     Commentaires fictifs, publiés tout de suite, propres au pays du joueur (S10-02).
     Chaque jeu en reçoit une sélection (voir js/play.js), du plus récent au plus ancien ;
     l'auteur est pris dans la liste « joueurs » du pays. */
  avisJoueurs: [
    { note: 5, texte: "Parfait pour la pause de midi : une partie dure deux minutes et on a envie d'en refaire une." },
    { note: 5, texte: "Je joue tous les soirs dans le car rapide. Ça marche même quand le réseau est faible." },
    { note: 4, texte: "Très joli et facile à prendre en main. Il manque juste quelques niveaux en plus." },
    { note: 5, texte: "Mes petits frères adorent, on se le passe à tour de rôle sur mon téléphone." },
    { note: 4, texte: "Bonne surprise, je ne pensais pas trouver un jeu aussi complet gratuitement." },
    { note: 3, texte: "Sympa au début, mais ça devient répétitif après une semaine." },
    { note: 5, texte: "Aucun téléchargement, ça s'ouvre tout de suite depuis Max it. Top !" },
    { note: 4, texte: "Les commandes répondent bien. Le niveau 12 est vraiment difficile !" },
    { note: 5, texte: "J'ai battu le record de mon cousin, il ne s'en remet pas." },
    { note: 2, texte: "Le chargement est un peu long chez moi le soir." },
    { note: 4, texte: "Graphismes soignés et parties courtes, exactement ce que je cherchais." },
    { note: 5, texte: "Simple, rapide, gratuit. Je recommande à toute la famille." }
  ],

  /* ---- Menu de démo ---- */
  demo: {
    jeuIndisponible: "bloc-mania",  // jeu masqué par « Jeu momentanément indisponible » (S08-03)
    jeuPartage: "rallye-dunes"      // jeu ouvert par les liens partagés (S07-06, S07-07)
  },

  /* ---- Catalogue (S02-01) ----
     langues : codes (fr, en, ar) ; joueurs : [minimum, maximum] ; mode : solo ou multi ;
     sansPub : le jeu ne contient aucune publicité (badge V2, S02-05) ;
     parties : parties lancées sur les 7 derniers jours, par pays (popularité, S03-05) ;
     publie : jours depuis la première publication (Nouveautés : moins de 30 jours, S03-03) ;
     absentDe : pays où le jeu n'est pas proposé (S02-04).
     Nom, accroche et description : saisis par le responsable MEA ; seule la version française est simulée. */
  jeux: [
    // Action — Kora Games (modèle A)
    { id: "ninja-sahel", nom: "Ninja du Sahel", genre: "action", partenaire: "kora", palette: "flamme", picto: "epee",
      accroche: "Le sabre et le vent",
      description: "Bondis de toit en toit, esquive les pièges et affronte les maîtres du désert dans des combats rapides, à jouer d'une main.",
      langues: ["fr", "en", "ar"], joueurs: [1, 1], mode: "solo",
      note: 4.5, avis: 132, parties: { MA: 8200, SN: 6100 }, publie: 120, video: true, sansPub: true },
    { id: "robots-furie", nom: "Robots en furie", genre: "action", partenaire: "kora", palette: "nuit", picto: "robot",
      accroche: "Assemble ton champion",
      description: "Construis ton robot de combat pièce par pièce, puis défie les autres joueurs dans l'arène.",
      langues: ["fr", "en"], joueurs: [1, 2], mode: "multi",
      note: 4.2, avis: 64, parties: { MA: 5100, SN: 4300 }, publie: 12, video: false, sansPub: true },
    { id: "commando-lagune", nom: "Commando Lagune", genre: "action", partenaire: "kora", palette: "foret", picto: "cible",
      accroche: "Mission sur la lagune",
      description: "Infiltre la base ennemie, vise juste et termine chaque mission en moins de trois minutes.",
      langues: ["fr", "en"], joueurs: [1, 1], mode: "solo",
      note: 4.0, avis: 41, parties: { MA: 3900, SN: 5200 }, publie: 200, video: true, sansPub: true },

    // Arcade — Baobab Arcade (hub avec lien direct)
    { id: "taxi-brousse", nom: "Taxi-brousse Rush", genre: "arcade", partenaire: "baobab", palette: "sable", picto: "bus",
      accroche: "Klaxon et virages",
      description: "Conduis ton taxi-brousse sur la piste, ramasse les passagers et évite les nids-de-poule.",
      langues: ["fr", "en"], joueurs: [1, 1], mode: "solo",
      note: 4.6, avis: 210, parties: { MA: 9400, SN: 8800 }, publie: 300, video: true, sansPub: false },
    { id: "serpent-neon", nom: "Serpent néon", genre: "arcade", partenaire: "baobab", palette: "neon", picto: "serpent",
      accroche: "Le classique, en lumière",
      description: "Fais grandir ton serpent sans toucher les murs : simple à prendre en main, difficile à lâcher.",
      langues: ["fr", "en", "ar"], joueurs: [1, 1], mode: "solo",
      note: 4.3, avis: 98, parties: { MA: 4700, SN: 3900 }, publie: 60, video: false, sansPub: false },
    { id: "ballon-pop", nom: "Ballon Pop", genre: "arcade", partenaire: "baobab", palette: "violet", picto: "ballon",
      accroche: "Éclate-les tous",
      description: "Éclate les ballons de la même couleur avant qu'ils ne s'envolent hors de l'écran.",
      langues: ["fr", "en"], joueurs: [1, 1], mode: "solo",
      note: 4.1, avis: 37, parties: { MA: 2600, SN: 3100 }, publie: 8, video: false, sansPub: false },

    // Course et voitures — Kora Games
    { id: "rallye-dunes", nom: "Rallye des dunes", genre: "course", partenaire: "kora", palette: "flamme", picto: "voiture",
      accroche: "Pleins gaz dans le désert",
      description: "Pilote ton 4x4 à travers les dunes, enchaîne les sauts et bats le chrono de tes amis.",
      langues: ["fr", "en", "ar"], joueurs: [1, 4], mode: "multi",
      note: 4.7, avis: 318, parties: { MA: 12400, SN: 7600 }, publie: 20, video: true, sansPub: true },
    { id: "moto-casbah", nom: "Moto Casbah", genre: "course", partenaire: "kora", palette: "terre", picto: "moto",
      accroche: "Les ruelles à toute allure",
      description: "Faufile-toi dans les ruelles de la médina sur ta moto et livre les colis à temps.",
      langues: ["fr", "ar"], joueurs: [1, 1], mode: "solo",
      note: 4.4, avis: 120, parties: { MA: 6900, SN: 4100 }, publie: 90, video: false, sansPub: true },
    { id: "parking-pro", nom: "Parking Pro", genre: "course", partenaire: "kora", palette: "nuit", picto: "parking",
      accroche: "Le créneau parfait",
      description: "Gare ta voiture au millimètre dans des parkings de plus en plus serrés.",
      langues: ["fr", "en"], joueurs: [1, 1], mode: "solo",
      note: 3.9, avis: 52, parties: { MA: 3300, SN: 2900 }, publie: 150, video: false, sansPub: true },

    // Puzzle et réflexion — Baobab Arcade
    { id: "bloc-mania", nom: "Bloc Mania", genre: "puzzle", partenaire: "baobab", palette: "violet", picto: "blocs",
      accroche: "Aligne, efface, recommence",
      description: "Place les blocs pour compléter des lignes et des colonnes. Une partie dure deux minutes.",
      langues: ["fr", "en", "ar"], joueurs: [1, 1], mode: "solo",
      note: 4.8, avis: 402, parties: { MA: 11200, SN: 9600 }, publie: 240, video: true, sansPub: false },
    { id: "bijoux-atlas", nom: "Bijoux de l'Atlas", genre: "puzzle", partenaire: "baobab", palette: "neon", picto: "diamant",
      accroche: "Trois à la suite",
      description: "Échange les pierres précieuses pour en aligner trois et libère les trésors de l'Atlas.",
      langues: ["fr", "en", "ar"], joueurs: [1, 1], mode: "solo",
      note: 4.5, avis: 187, parties: { MA: 7800, SN: 6600 }, publie: 180, video: false, sansPub: false },
    { id: "fruits-folie", nom: "Fruits en folie", genre: "puzzle", partenaire: "baobab", palette: "foret", picto: "fruit",
      accroche: "Un verger à remplir",
      description: "Associe les fruits identiques pour remplir les paniers du marché avant la fin du temps.",
      langues: ["fr", "en"], joueurs: [1, 1], mode: "solo",
      note: 4.2, avis: 76, parties: { MA: 4200, SN: 5100 }, publie: 25, video: false, sansPub: false },

    // Casual — Baobab Arcade
    { id: "cuisine-mama", nom: "La cuisine de Mama", genre: "casual", partenaire: "baobab", palette: "flamme", picto: "marmite",
      accroche: "Service en cuisine",
      description: "Prépare thiéboudienne, tajines et beignets avant que les clients ne s'impatientent.",
      langues: ["fr", "en", "ar"], joueurs: [1, 1], mode: "solo",
      note: 4.6, avis: 256, parties: { MA: 8900, SN: 10300 }, publie: 45, video: true, sansPub: false },
    { id: "chat-calin", nom: "Chat câlin", genre: "casual", partenaire: "baobab", palette: "sable", picto: "chat",
      accroche: "Ton compagnon de poche",
      description: "Nourris, habille et fais jouer ton chat. Il t'attend chaque jour avec une surprise.",
      langues: ["fr", "en"], joueurs: [1, 1], mode: "solo",
      note: 4.3, avis: 143, parties: { MA: 5600, SN: 4800 }, publie: 210, video: false, sansPub: false },
    { id: "bulles-party", nom: "Bulles party", genre: "casual", partenaire: "baobab", palette: "nuit", picto: "bulles",
      accroche: "Vise et fais éclater",
      description: "Lance des bulles pour former des groupes de la même couleur et vider le plateau.",
      langues: ["fr", "en"], joueurs: [1, 1], mode: "solo",
      note: 4.0, avis: 61, parties: { MA: 3800, SN: 3500 }, publie: 130, video: false, sansPub: false },

    // Sport — Kora Games
    { id: "foot-lions", nom: "Foot des Lions", genre: "sport", partenaire: "kora", palette: "foret", picto: "foot",
      accroche: "Le match en un geste",
      description: "Tire, dribble et marque en glissant le doigt. Choisis ton équipe et remporte la coupe du continent.",
      langues: ["fr", "en", "ar"], joueurs: [1, 2], mode: "multi",
      note: 4.7, avis: 521, parties: { MA: 13800, SN: 14200 }, publie: 400, video: true, sansPub: true },
    { id: "basket-rue", nom: "Basket de rue", genre: "sport", partenaire: "kora", palette: "flamme", picto: "basket",
      accroche: "Trois points, pas de faute",
      description: "Enchaîne les paniers sur le terrain du quartier et bats ton record en 60 secondes.",
      langues: ["fr", "en"], joueurs: [1, 1], mode: "solo",
      note: 4.1, avis: 88, parties: { MA: 4900, SN: 5600 }, publie: 70, video: false, sansPub: true },
    { id: "billard-royal", nom: "Billard royal", genre: "sport", partenaire: "kora", palette: "or", picto: "billard",
      accroche: "La visée parfaite",
      description: "Affronte un ami ou l'ordinateur au billard américain et débloque de nouvelles queues.",
      langues: ["fr", "en", "ar"], joueurs: [2, 2], mode: "multi",
      note: 4.4, avis: 164, parties: { MA: 6100, SN: 4400 }, publie: 160, video: false, sansPub: true },

    // Cartes et plateau — Zénith Jeux (hub sans lien direct)
    { id: "ludo-famille", nom: "Ludo en famille", genre: "cartes", partenaire: "zenith", palette: "neon", picto: "de",
      accroche: "Comme à la maison",
      description: "Le jeu de dés des soirées en famille, à 2, 3 ou 4, contre tes amis ou l'ordinateur.",
      langues: ["fr", "en", "ar"], joueurs: [2, 4], mode: "multi",
      note: 4.6, avis: 389, parties: { MA: 10100, SN: 12500 }, publie: 365, video: false, sansPub: true },
    { id: "dames-pro", nom: "Dames pro", genre: "cartes", partenaire: "zenith", palette: "terre", picto: "pion",
      accroche: "Prise obligatoire",
      description: "Les dames sur 100 cases, avec trois niveaux d'ordinateur et des parties en ligne.",
      langues: ["fr", "en"], joueurs: [2, 2], mode: "multi",
      note: 4.3, avis: 97, parties: { MA: 3600, SN: 7200 }, publie: 280, video: false, sansPub: true },
    { id: "solitaire-zen", nom: "Solitaire zen", genre: "cartes", partenaire: "zenith", palette: "nuit", picto: "carte",
      accroche: "Le calme en cartes",
      description: "Le solitaire classique, sans chrono ni pression, avec une nouvelle donne chaque jour.",
      langues: ["fr", "en", "ar"], joueurs: [1, 1], mode: "solo",
      note: 4.5, avis: 211, parties: { MA: 7300, SN: 5400 }, publie: 500, video: false, sansPub: true },

    // Quiz et mots — Zénith Jeux
    { id: "quiz-afrique", nom: "Quiz Afrique", genre: "quiz", partenaire: "zenith", palette: "or", picto: "interro",
      accroche: "Capitales, musique et football",
      description: "Réponds à dix questions sur le continent et compare ton score avec celui de tes amis.",
      langues: ["fr", "en"], joueurs: [1, 4], mode: "multi",
      note: 4.4, avis: 133, parties: { MA: 5200, SN: 6800 }, publie: 15, video: true, sansPub: true },
    { id: "mots-meles", nom: "Mots mêlés", genre: "quiz", partenaire: "zenith", palette: "violet", picto: "lettres",
      accroche: "Trouve-les tous",
      description: "Retrouve les mots cachés dans la grille, sur des thèmes qui changent chaque semaine.",
      langues: ["fr", "ar"], joueurs: [1, 1], mode: "solo",
      note: 4.2, avis: 79, parties: { MA: 3100, SN: 3700 }, publie: 220, video: false, sansPub: true },
    { id: "mot-juste", nom: "Le mot juste", genre: "quiz", partenaire: "zenith", palette: "sable", picto: "bulleMot",
      accroche: "Cinq lettres, six essais",
      description: "Devine le mot du jour en six essais, en français ou en arabe.",
      langues: ["fr", "ar"], joueurs: [1, 1], mode: "solo",
      note: 4.5, avis: 118, parties: { MA: 4400, SN: 3200 }, publie: 5, video: false, sansPub: true },

    // Aventure — Kora Games
    { id: "tresor-baobab", nom: "Le trésor du baobab", genre: "aventure", partenaire: "kora", palette: "foret", picto: "coffre",
      accroche: "La carte est déchirée",
      description: "Explore la savane, résous les énigmes des anciens et retrouve le trésor caché sous le grand baobab.",
      langues: ["fr", "en", "ar"], joueurs: [1, 1], mode: "solo",
      note: 4.6, avis: 174, parties: { MA: 7700, SN: 6900 }, publie: 28, video: true, sansPub: true },
    { id: "ruines-perdues", nom: "Les ruines perdues", genre: "aventure", partenaire: "kora", palette: "terre", picto: "colonne",
      accroche: "Ce que cachent les pierres",
      description: "Fouille une cité oubliée, déplace les colonnes et ouvre les passages secrets.",
      langues: ["fr", "en"], joueurs: [1, 1], mode: "solo",
      note: 4.2, avis: 66, parties: { MA: 3500, SN: 3000 }, publie: 260, video: false, sansPub: true },
    { id: "caravane-desert", nom: "La caravane du désert", genre: "aventure", partenaire: "kora", palette: "sable", picto: "dune",
      accroche: "D'une oasis à l'autre",
      description: "Guide ta caravane à travers le désert, gère l'eau et les vivres, et commerce dans chaque oasis.",
      langues: ["fr", "ar"], joueurs: [1, 1], mode: "solo",
      note: 4.0, avis: 39, parties: { MA: 2400, SN: 2100 }, publie: 340, video: false, sansPub: true },

    // Stratégie — Zénith Jeux, non proposés au Maroc (la tuile du genre y disparaît, S06-02)
    { id: "tours-defense", nom: "Tours de défense", genre: "strategie", partenaire: "zenith", palette: "nuit", picto: "tour",
      accroche: "Tiens la muraille",
      description: "Place tes tours le long du chemin et repousse les vagues d'assaillants jusqu'à la dernière.",
      langues: ["fr", "en"], joueurs: [1, 1], mode: "solo",
      note: 4.3, avis: 85, parties: { MA: 0, SN: 4600 }, publie: 190, video: false, sansPub: true, absentDe: ["MA"] },
    { id: "royaume-sable", nom: "Royaume de sable", genre: "strategie", partenaire: "zenith", palette: "or", picto: "couronne",
      accroche: "Bâtis ton royaume",
      description: "Construis ta cité, nourris ta population et noue des alliances avec les royaumes voisins.",
      langues: ["fr", "en"], joueurs: [1, 1], mode: "solo",
      note: 4.1, avis: 47, parties: { MA: 0, SN: 3900 }, publie: 75, video: false, sansPub: true, absentDe: ["MA"] },
    { id: "empire-marchand", nom: "Empire marchand", genre: "strategie", partenaire: "zenith", palette: "flamme", picto: "piece",
      accroche: "Acheter, vendre, prospérer",
      description: "Ouvre des comptoirs, fixe tes prix et deviens le premier marchand de la côte.",
      langues: ["fr", "en"], joueurs: [1, 1], mode: "solo",
      note: 4.4, avis: 58, parties: { MA: 0, SN: 3300 }, publie: 110, video: false, sansPub: true, absentDe: ["MA"] }
  ]
};

/* Visuels fournis (dossier images/play) : une image par jeu, affichée partout où le jeu apparaît
   (tuiles, carte « À la une », en-tête de la fiche, première capture de la galerie, partie simulée),
   recadrée au centre sans déformation. Les jeux sans image gardent leur dessin SVG.
   Pour changer un visuel : remplacer le fichier en gardant son nom, puis reconstruire le fichier unique. */
PLAY.images = {
  "bloc-mania": "images/play/bloc-mania.jpg",
  "commando-lagune": "images/play/commando-lagune.jpg",
  "foot-lions": "images/play/foot-lions.jpg",
  "ludo-famille": "images/play/ludo-famille.jpg",
  "ninja-sahel": "images/play/ninja-sahel.jpg",
  "rallye-dunes": "images/play/rallye-dunes.jpg",
  "robots-furie": "images/play/robots-furie.jpg",
  "taxi-brousse": "images/play/taxi-brousse.jpg",
  "tresor-baobab": "images/play/tresor-baobab.jpg"
};
