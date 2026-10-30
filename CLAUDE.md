# Maquette — Plateforme e-sport Max it (parcours joueur)

## Objectif
Maquette HTML cliquable, sur téléphone, de la plateforme e-sport décrite dans
reference/backlog.html. Uniquement le parcours du joueur final, uniquement les US « MVP ».
Pas d'écrans d'administration (responsable local, responsable MEA, responsable contenu).

## Parcours d'entrée (à reproduire fidèlement d'après les captures)
1. reference/01-accueil-maxit.png : accueil Max it. Le bouton du milieu de la barre du bas ouvre l'écran 2.
2. reference/02-univers.png : sélection de l'univers. « Gaming » ouvre l'écran 3.
3. reference/03-gaming.png : univers gaming. Le bouton « E-sport » ouvre la plateforme e-sport.

## Règles techniques
- HTML, CSS et JavaScript simples, sans framework ni étape de compilation.
- Code lisible plutôt qu'optimisé, commenté en français.
- Une page HTML par écran ; une feuille de style commune (css/style.css) ;
  les données fictives dans un seul fichier (js/data.js).
- Format mobile : 390 × 844 px. Sur ordinateur, la maquette s'affiche dans un cadre de téléphone centré.
- Aucune ressource en ligne : pas de CDN. Icônes en SVG dans le code.
- Tous les textes en français. Données fictives crédibles : jeux mobiles populaires en Afrique,
  pseudos, pays MEA, montants en MAD ou FCFA.

## Design
- S'inspirer strictement du design system de Max it visible dans les captures :
  couleurs, typographie, rayons, cartes, barre du haut, barre de navigation du bas.
- Les couleurs, tailles et espacements extraits des captures sont dans css/tokens.css :
  toujours les utiliser, ne jamais inventer de nouvelle couleur.

## Gratuit / abonné
Un interrupteur de démonstration, discret en haut de l'écran, bascule entre « joueur gratuit »
et « joueur abonné ». Il change l'affichage partout : verrous, boutons « S'inscrire » qui ouvrent
la page d'offre, accès aux contenus. Le choix est mémorisé entre les pages.

## Méthode
- Avant chaque lot d'écrans, présenter la liste des fichiers à créer, puis attendre mon accord.
- Après chaque lot, vérifier qu'aucun lien n'est cassé et qu'aucun écran n'est une impasse.
- Pas de captures d'écran. Fin de chaque lot : page de contrôle automatique dans les deux modes, liens et impasses, puis commit.
  (Page de contrôle : outils/controle.html#gratuit et #abonne ; y ajouter les nouveaux écrans.)
- Ne jamais modifier le dossier reference/.


## Section Play — Max it Gaming Play, mini-jeux (2e chantier)

### Objectif
Maquette front office de Max it Gaming Play, la mini app des mini-jeux dans Max it, décrite dans
reference/backlog-play.html (version de référence depuis le 2026-10-11). Uniquement les Epics
« Front » (E06 à E11). Le back-office (E01 à E05) n'est pas maquetté : son paramétrage est simulé
dans js/data-play.js.

### Entrée
Depuis 00c (univers gaming), le bouton « Jouer » ouvre l'accueil de Play. Le bouton « E-sport »
continue de mener à la plateforme e-sport, qui ne doit pas être modifiée.

### Règles propres à Play
- Fichiers préfixés « p » (p01-accueil.html, p02-genre.html…) ; écrans V2 préfixés « pv » ;
  données dans js/data-play.js ; textes de l'interface en français, anglais et arabe dans
  js/textes-play.js ; fiche jeu commune à p03 et pv3 dans js/play-fiche.js.
- Réutiliser tokens.css, style.css, nav.js et demo.js. Aucune couleur en dehors de tokens.css.
  Ne pas modifier les composants partagés hors de Play : créer une variante propre à Play.
- Play est une mini app : en-tête avec retour vers Max it, pas de barre du bas e-sport.
- Les jeux ne sont pas jouables. « Jouer » ouvre toujours le jeu directement, sans écran
  intermédiaire (mini app comme hub) : écran de chargement, puis une illustration « partie en cours ».
  Mini app : capsule « Quitter » ; hub : bouton de sortie de Max it au-dessus du hub. Les deux
  ramènent à la fiche.
- Noms de jeux et de partenaires fictifs (pas de marques réelles). Icônes des jeux en SVG.
- Visuels des jeux : une image par jeu dans images/play/<id>.jpg (déclarée dans PLAY.images de
  js/data-play.js), utilisée partout où le jeu apparaît ; sans image, le dessin SVG s'affiche.
  Exception validée le 2026-10-09 : certaines images fournies montrent des titres ou logos de jeux
  réels (commando-lagune, ninja-sahel, rallye-dunes, robots-furie, taxi-brousse) ; usage interne
  de la maquette uniquement.
- Catalogue fictif : environ 30 jeux répartis dans les 10 genres, 3 partenaires fictifs, dont
  un en modèle A (une mini app par jeu) et deux en modèle B (hub, ouverts par lien direct) ;
  l'un des hubs ne transmet pas les scores (pas de classement sur ses jeux).
- Choix pour les questions ouvertes du backlog : avis publiés tout de suite ; mention
  « Fourni par » active pour un partenaire et absente pour les autres.
- Pseudo : au MVP, pas de profil ; un pseudo généré (« Joueur4821 ») s'affiche dans les
  classements et sous les avis.
- Fonctions V2 (toutes les US V2 du front) : étiquette « V2 » ; l'interrupteur « Afficher les
  fonctions V2 » du menu de démo, activé par défaut (2026-10-12), les montre dans le parcours (profil
  depuis l'accueil, assistant, recommandations personnalisées, badges, avatars et pseudos) ; écrans
  pv1 à pv4 aussi ouverts depuis le menu de démo. Interrupteur coupé : parcours MVP seul.
- Profil joueur (V2) : indicateurs repris du profil joueur du Game Hub de Samsung (validé le
  2026-10-12), pas sa charte graphique ; avatar emoji au choix ; pseudo commun avec les tournois
  (clés d'état « pseudo », « pseudoModifieLe », « pseudoOffensant » partagées).
- Langues : français, anglais et arabe (lecture de droite à gauche) ; propriétés CSS logiques.
  Les noms, descriptions des jeux et les avis restent en français.

### Direction visuelle « kid & family friendly » (validée le 2026-10-11)
- Fond clair crème, couleurs vives et chaleureuses (une par genre), orange #FF7900 en accent,
  texte foncé sur l'orange pour le contraste.
- Police ronde Nunito (fonts/, licence OFL, intégrée au fichier unique) ; 16 px pour le texte,
  14 px au minimum.
- Coins bien arrondis (22 px), boutons en pilule, bouton « Jouer » de 56 px, zones tactiles de 48 px.
- Pastilles de genre illustrées (sans personnage ni marque), micro-animations douces, coupées si
  le téléphone demande moins de mouvements.
- Ton simple, positif et bienveillant (tutoiement). Classements ludiques : podium à médailles,
  ma place mise en avant avec un encouragement.

### Menu de démo — ajouts Play
Langue (français, anglais, arabe) ; pays (Maroc, Sénégal) ; nouveau joueur (ni récents ni favoris) ;
jeu momentanément indisponible ; lien partagé reçu par un ami qui a Max it, ou qui ne l'a pas
(Android, iPhone) ; lien vers un jeu indisponible ; interrupteur « Afficher les fonctions V2 » ;
pseudo jugé offensant ; écrans V2.

### Visuels de référence Figma
- Les écrans de reference/figma-play/ sont la maquette de l'équipe UI : ils font foi pour la
  mise en page et les composants de Play. Couleurs et ton : direction « kid & family friendly ».
- Les couleurs et tailles propres à Play vont dans css/tokens.css, dans une section « Play ».
- Si un écran Figma contredit le backlog, ou si une US n'a pas d'écran Figma, me le signaler
  au lieu de trancher seul.

### Arbitrages Figma / backlog (validés)
- Accueil : ordre du backlog (jeu à la une, récemment joués, Recommandé pour vous, mes favoris,
  nouveautés, rangées par genre avec « Voir tout ») ; une seule carte « à la une » au style des
  cartes « Discover » ; « Recommandé pour vous » = sélection du pays au MVP.
- Tuile : icône, nom, note moyenne et encadré « Sans pub » pour les jeux sans publicité
  (écart au backlog, où ce badge est en V2 : validé le 2026-10-12). Titre de la mini app : « Play ».
- Fiche jeu : favori, langues, nombre de joueurs, mode solo ou multijoueur, nombre d'avis,
  classements, « Signaler » ; ligne « Fourni par » seulement pour le partenaire concerné ;
  « Donner mon avis » désactivé si le jeu n'a jamais été lancé ; pas de « Voir tout » sur la
  galerie ni sur les jeux similaires. Badges (V2) : seulement sur l'écran pv3.
- Écrans sans Figma : réutiliser les composants Figma, sans en inventer.


## Section Shop — Game Center Shop (3e chantier)

### Objectif
Maquette front office du Shop décrit dans reference/backlog-shop.html : uniquement les Epics
« Parcours du client » (E05 à E10), plus S02-04 (ne vendre que du livrable). Le back-office
(E01 à E04, E11, E12) n'est pas maquetté : catalogue, prix, promotions, bannières et stocks sont
simulés dans js/data-shop.js. Les US V2 (S06-04, S06-09, S06-12, S10-03) ne sont pas maquettées.
Si des visuels Figma sont dans reference/figma-shop/, ils font foi, comme pour Play.

### Entrées
- Depuis 00c (univers gaming), le bouton du Shop (tuile « Boutique ») ouvre l'accueil du Shop.
- Depuis la page d'un jeu de l'e-sport (13), le lien « Boutique Max it » ouvre la page de ce
  jeu dans le Shop.
- Les entrées E-sport et Jouer ne doivent pas être modifiées.

### Règles propres au Shop
- Fichiers préfixés « s » (s01-accueil.html…) ; données dans js/data-shop.js.
- Réutiliser tokens.css, style.css, nav.js et demo.js. Aucune nouvelle couleur.
- Mini app : en-tête avec retour vers Max it, accès à « Mes achats » et à l'aide.
- Catalogue fictif cohérent avec l'e-sport : les 4 jeux de data.js, plus 4 ou 5 autres ; pour
  chaque jeu, 3 à 6 produits mêlant top-up, vouchers ou e-cards et pass. Prix en MAD, TTC.
  Quelques produits en promotion (prix barré) et quelques produits en rupture (non achetables).
- Pas de panier : une commande porte sur un seul produit. Le tunnel part toujours du jeu, puis
  du produit.
- Le paiement réutilise la brique de paiement Max it simulée de l'e-sport (écran 22),
  complétée par le choix entre Orange Money et crédit ou facture mobile (DCB).
- Vérification du compte de jeu : possible pour certains jeux (le pseudo s'affiche),
  impossible pour d'autres (saisie de l'identifiant en double).
- Tous les textes en français ; le changement de langue (S03-06) n'est pas maquetté.

### Menu de démo — ajouts Shop
Premier achat (conditions de vente à accepter) ; conditions de vente modifiées ; identifiant de
jeu introuvable ; solde Orange Money insuffisant ; montant hors plafond DCB ; paiement sans
réponse (« Vérification en cours ») ; livraison en échec puis remboursement ; pass qui expire
dans 3 jours ; envoi du code par SMS activé ou non.

## Section Fan Zone — Fan Zone EA FC (4e chantier)

### Objectif
Espace « FAN ZONE EA FC » de Max it, dédié à la finale du tournoi panafricain EA FC (Tunis, 12 et 13 décembre 2026).
Adaptation de l'ancienne Fan zone de la CAN : garder sa structure, son style et sa hiérarchie visuelle, remplacer
uniquement les contenus football par des contenus e-sport EA FC. Plan des écrans : ecrans-fanzone.md (validé le 2026-10-30).

### Entrée
Depuis 00c, le visuel de la rubrique « Découvrir » ouvre l'accueil de la Fan Zone (f01). Les entrées Jouer, Boutique
et E-sport ne changent pas.

### Règles propres à la Fan Zone
- Fichiers préfixés « f » (f01-accueil.html…) ; données dans js/data-fanzone.js ; fonctions communes dans js/fanzone.js.
- Réutiliser tokens.css, style.css, nav.js et demo.js. Couleurs dans la section « Fan Zone » de tokens.css :
  fond #0D0D0D, cartes #1E1E1E (16 px), orange Max it en accent, gris clair, néon vert #00E37A (direct, arbre),
  badge rouge « EN DIRECT », couleurs des drapeaux.
- Mini app : en-tête avec retour et titre centré, pas de barre du bas.
- Pays soutenu choisi à la première ouverture (« Quel pays soutiens-tu ? ») et mémorisé : drapeau sous l'avatar,
  équipe mise en avant, entourage orange dans l'arbre, monnaie du Pass Fan (MAD, TND, EGP, FCFA, CDF).
- 8 pays en quarts (Maroc, Tunisie, Égypte, Côte d'Ivoire qualifiés ; Sénégal, Cameroun, Mali, RD Congo éliminés),
  joueurs et pseudos inventés. Logo EA FC : simple emplacement, pas de reproduction du vrai logo.
- Codes EA FC Mobile fictifs : 2 maximum par utilisateur, valables jusqu'au 31/12/2026, regroupés dans « Mes codes » (f07).
- La photo de l'avatar reste dans le téléphone ; l'avatar est un dessin SVG aux couleurs du pays.
- L'interrupteur gratuit / abonné n'a aucun effet dans la Fan Zone.

### Menu de démo — ajouts Fan Zone
État de la page : avant le live / en direct ; rejouer le choix du pays ; nouveau supporter (sans pays, avatar ni codes).
