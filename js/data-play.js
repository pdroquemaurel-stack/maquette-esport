/* Données fictives de Play, la mini app des mini-jeux (reference/backlog-play.html).
   Ce fichier remplace le back-office (Epics E01 à E05), qui n'est pas maquetté :
   partenaires, catalogue, genres, jeux proposés par pays, badges, jeu à la une, popularité.
   Noms de jeux et de partenaires fictifs. Les visuels sont dessinés en SVG par js/play.js
   à partir de « palette » (couleurs de tokens.css) et « picto » (pictogramme du jeu). */

const PLAY = {
  /* Pays du joueur par défaut (compte Max it) ; le menu de démo permet de passer au Sénégal */
  paysParDefaut: "MA",

  /* ---- Partenaires (S01-01) ----
     modele A : une mini app par jeu ; modele B : hub regroupant plusieurs jeux.
     lienDirect : le hub sait ouvrir un jeu précis (S08-01) ; sinon écran de transition (S08-02).
     mention : affiche « Fourni par … » sur la fiche ; sinon marque blanche totale. */
  partenaires: {
    kora: { nom: "Kora Games", modele: "A", lienDirect: true, mention: true },
    baobab: { nom: "Baobab Arcade", modele: "B", lienDirect: true, mention: false },
    zenith: { nom: "Zénith Jeux", modele: "B", lienDirect: false, mention: false }
  },

  /* ---- Genres (S02-02) : nom complet, et nom court pour la grille de l'accueil ---- */
  genres: [
    { id: "action", nom: "Action", court: "Action" },
    { id: "arcade", nom: "Arcade", court: "Arcade" },
    { id: "course", nom: "Course et voitures", court: "Course" },
    { id: "puzzle", nom: "Puzzle et réflexion", court: "Puzzle" },
    { id: "casual", nom: "Casual", court: "Casual" },
    { id: "sport", nom: "Sport", court: "Sport" },
    { id: "cartes", nom: "Cartes et plateau", court: "Cartes" },
    { id: "quiz", nom: "Quiz et mots", court: "Quiz" },
    { id: "aventure", nom: "Aventure", court: "Aventure" },
    { id: "strategie", nom: "Stratégie", court: "Stratégie" }
  ],

  /* ---- Paramétrage par pays ----
     badgeData : badge « Sans consommation de data » (S02-05) ;
     ordreGenres : ordre des genres sur l'accueil (S03-04) ;
     aLaUne : jeu à la une (S03-01). */
  pays: {
    MA: {
      nom: "Maroc",
      badgeData: false,
      ordreGenres: ["sport", "course", "puzzle", "action", "casual", "cartes", "arcade", "quiz", "aventure", "strategie"],
      aLaUne: "tresor-baobab"
    },
    SN: {
      nom: "Sénégal",
      badgeData: true,
      ordreGenres: ["sport", "cartes", "casual", "puzzle", "arcade", "quiz", "action", "course", "aventure", "strategie"],
      aLaUne: "foot-lions"
    }
  },
  /* Jeu à la une défini par le responsable MEA, si aucun n'est programmé dans le pays */
  aLaUneMEA: "ninja-sahel",

  /* ---- Historique du joueur au début de la démo (le menu « Nouveau joueur » le vide) ---- */
  joueur: {
    pseudo: "Youss_KZ",                                      // pseudonyme du compte, affiché sous ses avis
    recents: ["foot-lions", "bloc-mania", "rallye-dunes"],  // du plus récent au plus ancien
    favoris: ["bloc-mania", "ludo-famille"],                 // le dernier ajouté en premier
    // Avis déjà laissés (S10-01) : un seul par jeu, modifiable ou supprimable
    avis: { "foot-lions": { note: 5, texte: "Le meilleur jeu de foot de Play. Les matchs à deux sur le même téléphone sont géniaux.", date: "2026-10-02" } }
  },

  /* ---- Avis des autres joueurs (E10) ----
     Commentaires fictifs, publiés tout de suite et affichés sous le pseudonyme (choix CLAUDE.md).
     Chaque jeu en reçoit une sélection (voir js/play.js), du plus récent au plus ancien. */
  avisJoueurs: [
    { pseudo: "Salma_ElA", note: 5, texte: "Parfait pour la pause de midi : une partie dure deux minutes et on a envie d'en refaire une." },
    { pseudo: "Mamadou221", note: 5, texte: "Je joue tous les soirs dans le car rapide. Ça marche même quand le réseau est faible." },
    { pseudo: "Awa_Dkr", note: 4, texte: "Très joli et facile à prendre en main. Il manque juste quelques niveaux en plus." },
    { pseudo: "Kofi.Gh", note: 5, texte: "Mes petits frères adorent, on se le passe à tour de rôle sur mon téléphone." },
    { pseudo: "Ines_Tunis", note: 4, texte: "Bonne surprise, je ne pensais pas trouver un jeu aussi complet gratuitement." },
    { pseudo: "Yacine_DZ", note: 3, texte: "Sympa au début, mais ça devient répétitif après une semaine." },
    { pseudo: "Fatou_Sn", note: 5, texte: "Aucun téléchargement, ça s'ouvre tout de suite depuis Max it. Top !" },
    { pseudo: "Omar_Casa", note: 4, texte: "Les commandes répondent bien. Le niveau 12 est vraiment difficile !" },
    { pseudo: "Aminata_CI", note: 5, texte: "J'ai battu le record de mon cousin, il ne s'en remet pas." },
    { pseudo: "Karim_Rbt", note: 2, texte: "Le chargement est un peu long chez moi le soir." },
    { pseudo: "Nadia.M", note: 4, texte: "Graphismes soignés et parties courtes, exactement ce que je cherchais." },
    { pseudo: "Ibrahim_Ml", note: 5, texte: "Simple, rapide, gratuit. Je recommande à tout le monde." }
  ],

  /* ---- Menu de démo ---- */
  demo: {
    jeuIndisponible: "bloc-mania",  // jeu masqué par « Jeu momentanément indisponible » (S08-04)
    jeuPartage: "rallye-dunes"      // jeu ouvert par « Ouverture par lien partagé » (S07-05)
  },

  /* ---- Catalogue (S02-01) ----
     parties : parties lancées sur les 7 derniers jours, par pays (Populaires ici, S03-03) ;
     publie : jours depuis la première publication (Nouveautés : moins de 30 jours, S03-02) ;
     absentDe : pays où le jeu n'est pas proposé (S02-04). */
  jeux: [
    // Action — Kora Games (modèle A)
    { id: "ninja-sahel", nom: "Ninja du Sahel", genre: "action", partenaire: "kora", palette: "flamme", picto: "epee",
      accroche: "Le sabre et le vent",
      description: "Bondis de toit en toit, esquive les pièges et affronte les maîtres du désert dans des combats rapides, à jouer d'une main.",
      langues: ["Français", "Anglais", "Arabe"], joueurs: "1 joueur", mode: "Solo",
      note: 4.5, avis: 132, parties: { MA: 8200, SN: 6100 }, publie: 120, video: true },
    { id: "robots-furie", nom: "Robots en furie", genre: "action", partenaire: "kora", palette: "nuit", picto: "robot",
      accroche: "Assemble ton champion",
      description: "Construis ton robot de combat pièce par pièce, puis défie les autres joueurs dans l'arène.",
      langues: ["Français", "Anglais"], joueurs: "1 à 2 joueurs", mode: "Multijoueur",
      note: 4.2, avis: 64, parties: { MA: 5100, SN: 4300 }, publie: 12, video: false },
    { id: "commando-lagune", nom: "Commando Lagune", genre: "action", partenaire: "kora", palette: "foret", picto: "cible",
      accroche: "Mission sur la lagune",
      description: "Infiltre la base ennemie, vise juste et termine chaque mission en moins de trois minutes.",
      langues: ["Français", "Anglais"], joueurs: "1 joueur", mode: "Solo",
      note: 4.0, avis: 41, parties: { MA: 3900, SN: 5200 }, publie: 200, video: true },

    // Arcade — Baobab Arcade (hub avec lien direct)
    { id: "taxi-brousse", nom: "Taxi-brousse Rush", genre: "arcade", partenaire: "baobab", palette: "sable", picto: "bus",
      accroche: "Klaxon et virages",
      description: "Conduis ton taxi-brousse sur la piste, ramasse les passagers et évite les nids-de-poule.",
      langues: ["Français", "Anglais"], joueurs: "1 joueur", mode: "Solo",
      note: 4.6, avis: 210, parties: { MA: 9400, SN: 8800 }, publie: 300, video: true },
    { id: "serpent-neon", nom: "Serpent néon", genre: "arcade", partenaire: "baobab", palette: "neon", picto: "serpent",
      accroche: "Le classique, en lumière",
      description: "Fais grandir ton serpent sans toucher les murs : simple à prendre en main, difficile à lâcher.",
      langues: ["Français", "Anglais", "Arabe"], joueurs: "1 joueur", mode: "Solo",
      note: 4.3, avis: 98, parties: { MA: 4700, SN: 3900 }, publie: 60, video: false },
    { id: "ballon-pop", nom: "Ballon Pop", genre: "arcade", partenaire: "baobab", palette: "violet", picto: "ballon",
      accroche: "Éclate-les tous",
      description: "Éclate les ballons de la même couleur avant qu'ils ne s'envolent hors de l'écran.",
      langues: ["Français", "Anglais"], joueurs: "1 joueur", mode: "Solo",
      note: 4.1, avis: 37, parties: { MA: 2600, SN: 3100 }, publie: 8, video: false },

    // Course et voitures — Kora Games
    { id: "rallye-dunes", nom: "Rallye des dunes", genre: "course", partenaire: "kora", palette: "flamme", picto: "voiture",
      accroche: "Pleins gaz dans le désert",
      description: "Pilote ton 4x4 à travers les dunes, enchaîne les sauts et bats le chrono de tes amis.",
      langues: ["Français", "Anglais", "Arabe"], joueurs: "1 à 4 joueurs", mode: "Multijoueur",
      note: 4.7, avis: 318, parties: { MA: 12400, SN: 7600 }, publie: 20, video: true },
    { id: "moto-casbah", nom: "Moto Casbah", genre: "course", partenaire: "kora", palette: "terre", picto: "moto",
      accroche: "Les ruelles à toute allure",
      description: "Faufile-toi dans les ruelles de la médina sur ta moto et livre les colis à temps.",
      langues: ["Français", "Arabe"], joueurs: "1 joueur", mode: "Solo",
      note: 4.4, avis: 120, parties: { MA: 6900, SN: 4100 }, publie: 90, video: false },
    { id: "parking-pro", nom: "Parking Pro", genre: "course", partenaire: "kora", palette: "nuit", picto: "parking",
      accroche: "Le créneau parfait",
      description: "Gare ta voiture au millimètre dans des parkings de plus en plus serrés.",
      langues: ["Français", "Anglais"], joueurs: "1 joueur", mode: "Solo",
      note: 3.9, avis: 52, parties: { MA: 3300, SN: 2900 }, publie: 150, video: false },

    // Puzzle et réflexion — Baobab Arcade
    { id: "bloc-mania", nom: "Bloc Mania", genre: "puzzle", partenaire: "baobab", palette: "violet", picto: "blocs",
      accroche: "Aligne, efface, recommence",
      description: "Place les blocs pour compléter des lignes et des colonnes. Une partie dure deux minutes.",
      langues: ["Français", "Anglais", "Arabe"], joueurs: "1 joueur", mode: "Solo",
      note: 4.8, avis: 402, parties: { MA: 11200, SN: 9600 }, publie: 240, video: true },
    { id: "bijoux-atlas", nom: "Bijoux de l'Atlas", genre: "puzzle", partenaire: "baobab", palette: "neon", picto: "diamant",
      accroche: "Trois à la suite",
      description: "Échange les pierres précieuses pour en aligner trois et libère les trésors de l'Atlas.",
      langues: ["Français", "Anglais", "Arabe"], joueurs: "1 joueur", mode: "Solo",
      note: 4.5, avis: 187, parties: { MA: 7800, SN: 6600 }, publie: 180, video: false },
    { id: "fruits-folie", nom: "Fruits en folie", genre: "puzzle", partenaire: "baobab", palette: "foret", picto: "fruit",
      accroche: "Un verger à remplir",
      description: "Associe les fruits identiques pour remplir les paniers du marché avant la fin du temps.",
      langues: ["Français", "Anglais"], joueurs: "1 joueur", mode: "Solo",
      note: 4.2, avis: 76, parties: { MA: 4200, SN: 5100 }, publie: 25, video: false },

    // Casual — Baobab Arcade
    { id: "cuisine-mama", nom: "La cuisine de Mama", genre: "casual", partenaire: "baobab", palette: "flamme", picto: "marmite",
      accroche: "Service en cuisine",
      description: "Prépare thiéboudienne, tajines et beignets avant que les clients ne s'impatientent.",
      langues: ["Français", "Anglais", "Arabe"], joueurs: "1 joueur", mode: "Solo",
      note: 4.6, avis: 256, parties: { MA: 8900, SN: 10300 }, publie: 45, video: true },
    { id: "chat-calin", nom: "Chat câlin", genre: "casual", partenaire: "baobab", palette: "sable", picto: "chat",
      accroche: "Ton compagnon de poche",
      description: "Nourris, habille et fais jouer ton chat. Il t'attend chaque jour avec une surprise.",
      langues: ["Français", "Anglais"], joueurs: "1 joueur", mode: "Solo",
      note: 4.3, avis: 143, parties: { MA: 5600, SN: 4800 }, publie: 210, video: false },
    { id: "bulles-party", nom: "Bulles party", genre: "casual", partenaire: "baobab", palette: "nuit", picto: "bulles",
      accroche: "Vise et fais éclater",
      description: "Lance des bulles pour former des groupes de la même couleur et vider le plateau.",
      langues: ["Français", "Anglais"], joueurs: "1 joueur", mode: "Solo",
      note: 4.0, avis: 61, parties: { MA: 3800, SN: 3500 }, publie: 130, video: false },

    // Sport — Kora Games
    { id: "foot-lions", nom: "Foot des Lions", genre: "sport", partenaire: "kora", palette: "foret", picto: "foot",
      accroche: "Le match en un geste",
      description: "Tire, dribble et marque en glissant le doigt. Choisis ton équipe et remporte la coupe du continent.",
      langues: ["Français", "Anglais", "Arabe"], joueurs: "1 à 2 joueurs", mode: "Multijoueur",
      note: 4.7, avis: 521, parties: { MA: 13800, SN: 14200 }, publie: 400, video: true },
    { id: "basket-rue", nom: "Basket de rue", genre: "sport", partenaire: "kora", palette: "flamme", picto: "basket",
      accroche: "Trois points, pas de faute",
      description: "Enchaîne les paniers sur le terrain du quartier et bats ton record en 60 secondes.",
      langues: ["Français", "Anglais"], joueurs: "1 joueur", mode: "Solo",
      note: 4.1, avis: 88, parties: { MA: 4900, SN: 5600 }, publie: 70, video: false },
    { id: "billard-royal", nom: "Billard royal", genre: "sport", partenaire: "kora", palette: "or", picto: "billard",
      accroche: "La visée parfaite",
      description: "Affronte un ami ou l'ordinateur au billard américain et débloque de nouvelles queues.",
      langues: ["Français", "Anglais", "Arabe"], joueurs: "2 joueurs", mode: "Multijoueur",
      note: 4.4, avis: 164, parties: { MA: 6100, SN: 4400 }, publie: 160, video: false },

    // Cartes et plateau — Zénith Jeux (hub sans lien direct)
    { id: "ludo-famille", nom: "Ludo en famille", genre: "cartes", partenaire: "zenith", palette: "neon", picto: "de",
      accroche: "Comme à la maison",
      description: "Le jeu de dés des soirées en famille, à 2, 3 ou 4, contre tes amis ou l'ordinateur.",
      langues: ["Français", "Anglais", "Arabe"], joueurs: "2 à 4 joueurs", mode: "Multijoueur",
      note: 4.6, avis: 389, parties: { MA: 10100, SN: 12500 }, publie: 365, video: false },
    { id: "dames-pro", nom: "Dames pro", genre: "cartes", partenaire: "zenith", palette: "terre", picto: "pion",
      accroche: "Prise obligatoire",
      description: "Les dames sur 100 cases, avec trois niveaux d'ordinateur et des parties en ligne.",
      langues: ["Français", "Anglais"], joueurs: "2 joueurs", mode: "Multijoueur",
      note: 4.3, avis: 97, parties: { MA: 3600, SN: 7200 }, publie: 280, video: false },
    { id: "solitaire-zen", nom: "Solitaire zen", genre: "cartes", partenaire: "zenith", palette: "nuit", picto: "carte",
      accroche: "Le calme en cartes",
      description: "Le solitaire classique, sans chrono ni pression, avec une nouvelle donne chaque jour.",
      langues: ["Français", "Anglais", "Arabe"], joueurs: "1 joueur", mode: "Solo",
      note: 4.5, avis: 211, parties: { MA: 7300, SN: 5400 }, publie: 500, video: false },

    // Quiz et mots — Zénith Jeux
    { id: "quiz-afrique", nom: "Quiz Afrique", genre: "quiz", partenaire: "zenith", palette: "or", picto: "interro",
      accroche: "Capitales, musique et football",
      description: "Réponds à dix questions sur le continent et compare ton score avec celui de tes amis.",
      langues: ["Français", "Anglais"], joueurs: "1 à 4 joueurs", mode: "Multijoueur",
      note: 4.4, avis: 133, parties: { MA: 5200, SN: 6800 }, publie: 15, video: true },
    { id: "mots-meles", nom: "Mots mêlés", genre: "quiz", partenaire: "zenith", palette: "violet", picto: "lettres",
      accroche: "Trouve-les tous",
      description: "Retrouve les mots cachés dans la grille, sur des thèmes qui changent chaque semaine.",
      langues: ["Français", "Arabe"], joueurs: "1 joueur", mode: "Solo",
      note: 4.2, avis: 79, parties: { MA: 3100, SN: 3700 }, publie: 220, video: false },
    { id: "mot-juste", nom: "Le mot juste", genre: "quiz", partenaire: "zenith", palette: "sable", picto: "bulleMot",
      accroche: "Cinq lettres, six essais",
      description: "Devine le mot du jour en six essais, en français ou en arabe.",
      langues: ["Français", "Arabe"], joueurs: "1 joueur", mode: "Solo",
      note: 4.5, avis: 118, parties: { MA: 4400, SN: 3200 }, publie: 5, video: false },

    // Aventure — Kora Games
    { id: "tresor-baobab", nom: "Le trésor du baobab", genre: "aventure", partenaire: "kora", palette: "foret", picto: "coffre",
      accroche: "La carte est déchirée",
      description: "Explore la savane, résous les énigmes des anciens et retrouve le trésor caché sous le grand baobab.",
      langues: ["Français", "Anglais", "Arabe"], joueurs: "1 joueur", mode: "Solo",
      note: 4.6, avis: 174, parties: { MA: 7700, SN: 6900 }, publie: 28, video: true },
    { id: "ruines-perdues", nom: "Les ruines perdues", genre: "aventure", partenaire: "kora", palette: "terre", picto: "colonne",
      accroche: "Ce que cachent les pierres",
      description: "Fouille une cité oubliée, déplace les colonnes et ouvre les passages secrets.",
      langues: ["Français", "Anglais"], joueurs: "1 joueur", mode: "Solo",
      note: 4.2, avis: 66, parties: { MA: 3500, SN: 3000 }, publie: 260, video: false },
    { id: "caravane-desert", nom: "La caravane du désert", genre: "aventure", partenaire: "kora", palette: "sable", picto: "dune",
      accroche: "D'une oasis à l'autre",
      description: "Guide ta caravane à travers le désert, gère l'eau et les vivres, et commerce dans chaque oasis.",
      langues: ["Français", "Arabe"], joueurs: "1 joueur", mode: "Solo",
      note: 4.0, avis: 39, parties: { MA: 2400, SN: 2100 }, publie: 340, video: false },

    // Stratégie — Zénith Jeux, non proposés au Maroc (la tuile du genre y disparaît, S06-02)
    { id: "tours-defense", nom: "Tours de défense", genre: "strategie", partenaire: "zenith", palette: "nuit", picto: "tour",
      accroche: "Tiens la muraille",
      description: "Place tes tours le long du chemin et repousse les vagues d'assaillants jusqu'à la dernière.",
      langues: ["Français", "Anglais"], joueurs: "1 joueur", mode: "Solo",
      note: 4.3, avis: 85, parties: { MA: 0, SN: 4600 }, publie: 190, video: false, absentDe: ["MA"] },
    { id: "royaume-sable", nom: "Royaume de sable", genre: "strategie", partenaire: "zenith", palette: "or", picto: "couronne",
      accroche: "Bâtis ton royaume",
      description: "Construis ta cité, nourris ta population et noue des alliances avec les royaumes voisins.",
      langues: ["Français", "Anglais"], joueurs: "1 joueur", mode: "Solo",
      note: 4.1, avis: 47, parties: { MA: 0, SN: 3900 }, publie: 75, video: false, absentDe: ["MA"] },
    { id: "empire-marchand", nom: "Empire marchand", genre: "strategie", partenaire: "zenith", palette: "flamme", picto: "piece",
      accroche: "Acheter, vendre, prospérer",
      description: "Ouvre des comptoirs, fixe tes prix et deviens le premier marchand de la côte.",
      langues: ["Français", "Anglais"], joueurs: "1 joueur", mode: "Solo",
      note: 4.4, avis: 58, parties: { MA: 0, SN: 3300 }, publie: 110, video: false, absentDe: ["MA"] }
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

/* Texte de l'écran de transition (S02-01, S08-02) : saisi sur la fiche de chaque jeu d'un hub
   sans lien direct. Ici, rédigé à partir du genre et du nom du jeu. */
PLAY.jeux.forEach((jeu) => {
  const partenaire = PLAY.partenaires[jeu.partenaire];
  if (partenaire.modele === "B" && !partenaire.lienDirect) {
    const genre = PLAY.genres.find((g) => g.id === jeu.genre);
    jeu.transition = "Dans " + partenaire.nom + ", touche l'onglet « " + genre.nom + " », puis le jeu « " + jeu.nom + " ».";
  }
});
