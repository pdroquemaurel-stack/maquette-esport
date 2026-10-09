/* Données fictives du Shop, la boutique de jeux de Max it (reference/backlog-shop.html).
   Ce fichier remplace le back-office (Epics E01 à E04, E11, E12), qui n'est pas maquetté :
   éditeurs, jeux, produits, tags, prix TTC, promotions, stocks, bannières, mises en avant,
   moyens de paiement du pays, conditions de vente, et l'historique d'achats du joueur.
   Noms de jeux réels, comme dans l'e-sport ; prix en MAD, TTC (S06-05). */

const SHOP = {

  /* Date et heure « actuelles » : les mêmes que l'e-sport (js/data.js) */
  maintenant: "2026-10-09T21:10",

  /* ---- Pays du joueur (repris de son compte Max it, S05-01) ---- */
  pays: { code: "MA", nom: "Maroc", monnaie: "MAD" },
  joueur: { numero: "+212 6 61 23 45 67", pseudo: "Youss_KZ" },

  /* ---- Moyens de paiement du pays (S03-05, S07-01) ----
     Réponses simulées du module de paiement Max it :
     plafondDcb : au-delà, le DCB est déclaré inutilisable ; soldeCredit : crédit de la ligne (joueur prépayé). */
  paiement: { orangeMoney: true, dcb: true, plafondDcb: 100, soldeOrangeMoney: 245.5, soldeCredit: 80 },
  /* Envoi du code par SMS activé dans le pays (S09-02) */
  smsActif: true,
  /* Conditions de vente (S06-08) : version en vigueur, version acceptée par le joueur,
     et nouvelle version publiée par le responsable local (menu de démo « Conditions de vente modifiées »). */
  conditions: {
    version: "2.1", date: "2026-09-01",
    acceptee: { version: "2.1", date: "2026-09-03" },
    nouvelle: { version: "2.2", date: "2026-10-09", changement: "Le délai de réclamation passe de 7 à 14 jours après l'achat." }
  },

  /* Identifiants au bon format mais inconnus de l'éditeur (S05-03, démo « Identifiant de jeu introuvable ») */
  identifiantsInconnus: ["512839040"],

  /* Pseudos renvoyés par l'API des éditeurs pour un identifiant de jeu saisi (S05-03) */
  pseudos: ["Kenza_FF", "Amine.Pro", "SamiKZ", "Nour_99", "Yassine_GG", "LinaStar", "Omar_Snipe", "Ilyas.MA", "Hiba_Queen", "Reda_212"],

  /* ---- Éditeurs (S01-01) ----
     api : catalogue, disponibilité et livraison par l'API de l'éditeur (S02-01) ; sinon import de fichier.
     verification : l'API rend le pseudo associé à un identifiant de jeu (S05-03). */
  editeurs: {
    garena: { nom: "Garena", api: true, verification: true },
    levelinfinite: { nom: "Level Infinite", api: true, verification: true },
    konami: { nom: "Konami", api: false, verification: false },
    moonton: { nom: "Moonton", api: true, verification: true },
    supercell: { nom: "Supercell", api: false, verification: false },
    roblox: { nom: "Roblox Corporation", api: false, verification: false },
    hoyoverse: { nom: "HoYoverse", api: true, verification: true },
    gameloft: { nom: "Gameloft", api: true, verification: false }
  },

  /* ---- Tags (S01-04) : ceux des jeux, et ceux des produits (calculés : type, promo) ---- */
  tagsJeux: {
    "battle-royale": "Battle royale",
    moba: "MOBA",
    football: "Football",
    strategie: "Stratégie",
    aventure: "Aventure",
    course: "Course",
    creation: "Création"
  },
  tagsProduits: { topup: "Top-up", voucher: "Voucher", pass: "Pass", promo: "Promo" },

  /* ---- Jeux vendus au Maroc (S01-02, S03-04) ----
     Call of Duty: Mobile, présent dans l'e-sport, n'est pas vendu : sa page e-sport (13) n'a pas de lien boutique.
     images : visuels des jeux de l'e-sport (images/jeux) ; sans image, dégradé et pictogramme (js/shop.js).
     identifiant : saisie guidée pour les top-up (S05-02) : format attendu et aide « où trouver mon identifiant ».
     alias : autres saisies reconnues par la recherche (S06-06). */
  jeux: [
    {
      id: "freefire", nom: "Free Fire", editeur: "garena", tags: ["battle-royale"],
      alias: ["ff", "freefire max", "garena"],
      images: { carre: "images/jeux/freefire-carre.png", large: "images/jeux/freefire-large.png" },
      identifiant: { libelle: "ID joueur", exemple: "512839047", format: "^\\d{8,12}$", regle: "8 à 12 chiffres",
        ouTrouver: "Dans Free Fire, touche ton avatar en haut à gauche : l'ID s'affiche sous ton pseudo." }
    },
    {
      id: "pubg", nom: "PUBG Mobile", editeur: "levelinfinite", tags: ["battle-royale"],
      alias: ["pubg", "battlegrounds", "uc"],
      images: { carre: "images/jeux/pubg-carre.png", large: "images/jeux/pubg-large.png" },
      identifiant: { libelle: "ID personnage", exemple: "5123456789", format: "^\\d{9,11}$", regle: "9 à 11 chiffres",
        ouTrouver: "Dans PUBG Mobile, touche ton profil : l'ID personnage est sous ton pseudo, avec un bouton pour le copier." }
    },
    {
      id: "mlbb", nom: "Mobile Legends: Bang Bang", editeur: "moonton", tags: ["moba"],
      alias: ["mlbb", "mobile legends", "ml"],
      images: null,
      identifiant: { libelle: "ID utilisateur", exemple: "84120395", format: "^\\d{6,10}$", regle: "6 à 10 chiffres",
        ouTrouver: "Dans Mobile Legends, touche ton avatar : l'ID utilisateur est affiché à côté du numéro de serveur." }
    },
    {
      id: "efootball", nom: "eFootball", editeur: "konami", tags: ["football"],
      alias: ["pes", "efoot", "konami"],
      images: { carre: "images/jeux/efootball-carre.png", large: "images/jeux/efootball-large.png" },
      identifiant: { libelle: "ID utilisateur", exemple: "ABCD-123-456-789", format: "^[A-Za-z]{4}-?\\d{3}-?\\d{3}-?\\d{3}$", regle: "4 lettres puis 9 chiffres",
        ouTrouver: "Dans eFootball, ouvre « Extras » puis « Profil utilisateur » : l'ID utilisateur est en haut de la page." }
    },
    {
      id: "roblox", nom: "Roblox", editeur: "roblox", tags: ["creation", "aventure"],
      alias: ["robux"],
      images: null,
      identifiant: null   // e-cards uniquement : aucun identifiant demandé
    },
    {
      id: "clash-of-clans", nom: "Clash of Clans", editeur: "supercell", tags: ["strategie"],
      alias: ["coc", "clash", "supercell"],
      images: null,
      identifiant: { libelle: "Identifiant de joueur", exemple: "#2PQ8LJY0V", format: "^#?[0289PYLQGRJCUV]{6,10}$", regle: "un # suivi de 6 à 10 caractères",
        ouTrouver: "Dans Clash of Clans, touche ton nom en haut à gauche : l'identifiant commence par #." }
    },
    {
      id: "genshin", nom: "Genshin Impact", editeur: "hoyoverse", tags: ["aventure"],
      alias: ["genshin impact", "hoyoverse", "cristaux"],
      images: null,
      identifiant: { libelle: "UID", exemple: "712345678", format: "^\\d{9,10}$", regle: "9 ou 10 chiffres",
        ouTrouver: "Dans Genshin Impact, l'UID est affiché en bas à droite de l'écran de jeu." }
    },
    {
      id: "asphalt", nom: "Asphalt Legends", editeur: "gameloft", tags: ["course"],
      alias: ["asphalt 9", "asphalt legends unite", "gameloft"],
      images: null,
      identifiant: null   // Pass Gameloft et jetons livrés par code
    }
  ],

  /* ---- Produits (S01-03) : un produit par montant ou par offre, dans l'ordre défini ----
     type : topup (crédit direct sur le compte de jeu), voucher (code à saisir), pass (accès à durée limitée).
     livraison : credit (identifiant de jeu demandé) ou code (pas d'identifiant).
     prix : TTC en MAD ; prixBarre : prix avant promotion (S04-03).
     epuise : plus de code en stock, plus de solde éditeur, ou éditeur API qui le déclare indisponible (S02-04).
     duree (jours) et reconduction : pour les pass. */
  produits: [
    // Free Fire (Garena, API)
    { id: "ff-100", jeu: "freefire", nom: "100 diamants", type: "topup", livraison: "credit", prix: 10,
      contenu: "100 diamants crédités sur ton compte Free Fire." },
    { id: "ff-310", jeu: "freefire", nom: "310 diamants", type: "topup", livraison: "credit", prix: 29,
      contenu: "310 diamants crédités sur ton compte Free Fire." },
    { id: "ff-520", jeu: "freefire", nom: "520 diamants", type: "topup", livraison: "credit", prix: 49, prixBarre: 55,
      contenu: "520 diamants crédités sur ton compte Free Fire. Promotion jusqu'au 15 octobre." },
    { id: "ff-1060", jeu: "freefire", nom: "1 060 diamants", type: "topup", livraison: "credit", prix: 95, epuise: true,
      contenu: "1 060 diamants crédités sur ton compte Free Fire." },
    { id: "ff-booyah", jeu: "freefire", nom: "Pass Booyah", type: "pass", livraison: "credit", prix: 39, duree: 30, reconduction: false,
      contenu: "Le Pass Booyah de la saison : récompenses exclusives, skins et diamants bonus à débloquer en jouant." },
    { id: "ff-carte", jeu: "freefire", nom: "Carte Garena 1 060 diamants", type: "voucher", livraison: "code", prix: 99, expiration: "2027-06-30",
      contenu: "Un code à saisir sur le site d'échange Garena : 1 060 diamants. Idéal pour offrir.",
      activation: "Sur shop.garena.ma, choisis Free Fire, connecte-toi puis saisis le code." },

    // PUBG Mobile (Level Infinite, API)
    { id: "pubg-60", jeu: "pubg", nom: "60 UC", type: "topup", livraison: "credit", prix: 9,
      contenu: "60 Unknown Cash (UC) crédités sur ton compte PUBG Mobile." },
    { id: "pubg-325", jeu: "pubg", nom: "325 UC", type: "topup", livraison: "credit", prix: 45,
      contenu: "325 UC crédités sur ton compte PUBG Mobile." },
    { id: "pubg-660", jeu: "pubg", nom: "660 UC", type: "topup", livraison: "credit", prix: 89, epuise: true,
      contenu: "660 UC crédités sur ton compte PUBG Mobile." },
    { id: "pubg-prime", jeu: "pubg", nom: "Prime Plus", type: "pass", livraison: "credit", prix: 59, duree: 30, reconduction: false,
      contenu: "Pendant 30 jours : UC et récompenses quotidiennes, remises dans la boutique du jeu." },
    { id: "pubg-carte", jeu: "pubg", nom: "Carte 1 800 UC", type: "voucher", livraison: "code", prix: 219, expiration: "2027-03-31",
      contenu: "Un code de 1 800 UC à échanger sur le site officiel de PUBG Mobile.",
      activation: "Sur midasbuy.com, choisis PUBG Mobile, saisis ton ID personnage puis le code." },

    // Mobile Legends (Moonton, API)
    { id: "mlbb-86", jeu: "mlbb", nom: "86 diamants", type: "topup", livraison: "credit", prix: 12,
      contenu: "86 diamants crédités sur ton compte Mobile Legends." },
    { id: "mlbb-257", jeu: "mlbb", nom: "257 diamants", type: "topup", livraison: "credit", prix: 35,
      contenu: "257 diamants crédités sur ton compte Mobile Legends." },
    { id: "mlbb-706", jeu: "mlbb", nom: "706 diamants", type: "topup", livraison: "credit", prix: 89, prixBarre: 99,
      contenu: "706 diamants crédités sur ton compte Mobile Legends. Promotion jusqu'au 15 octobre." },
    { id: "mlbb-weekly", jeu: "mlbb", nom: "Weekly Diamond Pass", type: "pass", livraison: "credit", prix: 19, duree: 7, reconduction: false,
      contenu: "Pendant 7 jours : 20 diamants chaque jour de connexion, plus 80 diamants à l'activation." },

    // eFootball (Konami, hors API : vérification du compte impossible)
    { id: "efoot-130", jeu: "efootball", nom: "130 pièces eFootball", type: "topup", livraison: "credit", prix: 12,
      contenu: "130 pièces eFootball créditées sur ton compte." },
    { id: "efoot-550", jeu: "efootball", nom: "550 pièces eFootball", type: "topup", livraison: "credit", prix: 49, prixBarre: 59,
      contenu: "550 pièces eFootball créditées sur ton compte. Promotion jusqu'au 15 octobre." },
    { id: "efoot-carte", jeu: "efootball", nom: "Carte 1 040 pièces", type: "voucher", livraison: "code", prix: 89, expiration: "2027-01-31",
      contenu: "Un code de 1 040 pièces eFootball, à saisir dans le jeu.",
      activation: "Dans eFootball, ouvre « Boutique » puis « Utiliser un code » et saisis le code." },

    // Roblox (hors API : e-cards importées par lots)
    { id: "rbx-400", jeu: "roblox", nom: "Carte 400 Robux", type: "voucher", livraison: "code", prix: 55, expiration: "2027-09-30",
      contenu: "Une e-card de 400 Robux.", activation: "Sur roblox.com/redeem, connecte-toi puis saisis le code." },
    { id: "rbx-800", jeu: "roblox", nom: "Carte 800 Robux", type: "voucher", livraison: "code", prix: 99, expiration: "2027-09-30",
      contenu: "Une e-card de 800 Robux.", activation: "Sur roblox.com/redeem, connecte-toi puis saisis le code." },
    { id: "rbx-premium", jeu: "roblox", nom: "Roblox Premium 450", type: "pass", livraison: "code", prix: 59, duree: 30, reconduction: true,
      contenu: "Abonnement Premium : 450 Robux par mois et accès aux échanges entre joueurs.",
      activation: "Sur roblox.com/redeem, connecte-toi puis saisis le code. L'abonnement est reconduit chaque mois jusqu'à résiliation." },
    { id: "rbx-1700", jeu: "roblox", nom: "Carte 1 700 Robux", type: "voucher", livraison: "code", prix: 199, epuise: true,
      contenu: "Une e-card de 1 700 Robux.", activation: "Sur roblox.com/redeem, connecte-toi puis saisis le code." },

    // Clash of Clans (Supercell, hors API)
    { id: "coc-pass", jeu: "clash-of-clans", nom: "Pass Or", type: "pass", livraison: "credit", prix: 59, duree: 30, reconduction: false,
      contenu: "Le Pass Or du mois : récompenses de défis, bonus de construction et de recherche." },
    { id: "coc-500", jeu: "clash-of-clans", nom: "500 gemmes", type: "topup", livraison: "credit", prix: 49,
      contenu: "500 gemmes créditées sur ton village." },
    { id: "coc-1200", jeu: "clash-of-clans", nom: "1 200 gemmes", type: "topup", livraison: "credit", prix: 99, epuise: true,
      contenu: "1 200 gemmes créditées sur ton village." },

    // Genshin Impact (HoYoverse, API)
    { id: "gi-60", jeu: "genshin", nom: "60 Cristaux Genesis", type: "topup", livraison: "credit", prix: 10,
      contenu: "60 Cristaux Genesis crédités sur ton compte Genshin Impact." },
    { id: "gi-330", jeu: "genshin", nom: "300 + 30 Cristaux Genesis", type: "topup", livraison: "credit", prix: 49,
      contenu: "300 Cristaux Genesis et 30 en bonus, crédités sur ton compte." },
    { id: "gi-lune", jeu: "genshin", nom: "Bénédiction de la lune", type: "pass", livraison: "credit", prix: 49, prixBarre: 55, duree: 30, reconduction: false,
      contenu: "300 Cristaux Genesis tout de suite, puis 90 Primogemmes par jour pendant 30 jours. Promotion jusqu'au 15 octobre." },
    { id: "gi-1090", jeu: "genshin", nom: "980 + 110 Cristaux Genesis", type: "topup", livraison: "credit", prix: 149,
      contenu: "980 Cristaux Genesis et 110 en bonus, crédités sur ton compte." },

    // Asphalt Legends (Gameloft, API) : pass « tout illimité » de l'éditeur
    { id: "gl-illimite", jeu: "asphalt", nom: "Pass Gameloft illimité", type: "pass", livraison: "code", prix: 39, duree: 30, reconduction: true,
      contenu: "Tous les jeux Gameloft sans publicité ni achat intégré, dont Asphalt Legends, pendant 30 jours.",
      activation: "Dans Asphalt Legends, ouvre « Profil » puis « Activer un pass » et saisis le code. Reconduit chaque mois jusqu'à résiliation." },
    { id: "gl-semaine", jeu: "asphalt", nom: "Pass Gameloft 7 jours", type: "pass", livraison: "code", prix: 15, duree: 7, reconduction: false,
      contenu: "Tous les jeux Gameloft sans publicité ni achat intégré, pendant 7 jours.",
      activation: "Dans Asphalt Legends, ouvre « Profil » puis « Activer un pass » et saisis le code." },
    { id: "gl-jetons", jeu: "asphalt", nom: "1 000 jetons", type: "voucher", livraison: "code", prix: 29, expiration: "2027-04-30",
      contenu: "1 000 jetons Asphalt Legends, à saisir dans le jeu.",
      activation: "Dans Asphalt Legends, ouvre « Boutique » puis « Utiliser un code » et saisis le code." }
  ],

  /* ---- Accueil (S06-02) ----
     bannieres : celles du pays (S04-04) ; lien vers un jeu ou un produit.
     misesEnAvant : jeux mis en avant par le responsable local, dans l'ordre défini (S04-02).
     populaires : jeux les plus vendus dans le pays sur 30 jours. */
  bannieres: [
    { id: "b-ff", titre: "520 diamants à 49 MAD", texte: "Free Fire · au lieu de 55 MAD, jusqu'au 15 octobre", jeu: "freefire", produit: "ff-520" },
    { id: "b-gl", titre: "Tous les jeux Gameloft, sans limite", texte: "Pass Gameloft illimité · 39 MAD par mois", jeu: "asphalt" },
    { id: "b-gi", titre: "Bénédiction de la lune", texte: "Genshin Impact · 49 MAD au lieu de 55 MAD", jeu: "genshin", produit: "gi-lune" }
  ],
  misesEnAvant: ["freefire", "genshin", "mlbb"],
  populaires: ["freefire", "pubg", "mlbb", "efootball", "roblox", "clash-of-clans", "genshin", "asphalt"],

  /* ---- Historique d'achats du joueur (E10), du plus récent au plus ancien ----
     Sert aussi à « Tes derniers achats » de l'accueil (S06-02). */
  commandes: [
    { id: "SH-26100819-4821", date: "2026-10-08T19:42", produit: "ff-520", compte: { libelle: "Mon compte", identifiant: "512839047", pseudo: "Youss_KZ" },
      moyen: "orange-money", montant: 49, statut: "livre" },
    { id: "SH-26100517-3307", date: "2026-10-05T17:15", produit: "gl-semaine", moyen: "dcb", montant: 15, statut: "livre",
      code: "GLF7-9QX2-MK4D", fin: "2026-10-12" },
    { id: "SH-26100312-2954", date: "2026-10-03T12:08", produit: "rbx-400", moyen: "orange-money", montant: 55, statut: "livre",
      code: "RBX4-7KQM-2TZL-91PA" },
    { id: "SH-26092021-1180", date: "2026-09-20T21:30", produit: "efoot-550", compte: { libelle: "Mon frère", identifiant: "AMIN-482-117-930", pseudo: null },
      moyen: "dcb", montant: 59, statut: "livre" },
    // Livraison impossible : remboursement effectué (S08-02, S10-02)
    { id: "SH-26091518-0730", date: "2026-09-15T18:20", produit: "mlbb-257", compte: { libelle: "Mon compte", identifiant: "84120395", pseudo: "Youss_KZ" },
      moyen: "dcb", montant: 35, statut: "rembourse", remboursement: "2026-09-16" },
    // Pass reconduit automatiquement : renouvelé aujourd'hui (S09-04)
    { id: "SH-26090920-0417", date: "2026-09-09T20:05", produit: "rbx-premium", moyen: "orange-money", montant: 59, statut: "livre",
      code: "ROB-PR3M-45KQ", fin: "2026-11-08", renouvele: "2026-10-09" }
  ],

  /* ---- Comptes de jeu mémorisés, par jeu (S05-04) ---- */
  comptes: {
    freefire: [
      { libelle: "Mon compte", identifiant: "512839047", pseudo: "Youss_KZ" },
      { libelle: "Mon frère", identifiant: "734120958", pseudo: "Amine_FF" }
    ],
    efootball: [
      { libelle: "Mon frère", identifiant: "AMIN-482-117-930", pseudo: null }
    ]
  }
};
