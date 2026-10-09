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


## Section Play — mini-jeux (2e chantier)

### Objectif
Maquette front office de Play, la mini app des mini-jeux dans Max it, décrite dans
reference/backlog-play.html. Uniquement les Epics « Front — mini app Play » (E06 à E10).
Le back-office (E01 à E05) n'est pas maquetté : son paramétrage est simulé dans js/data-play.js.

### Entrée
Depuis 00c (univers gaming), le bouton « Jouer » ouvre l'accueil de Play. Le bouton « E-sport »
continue de mener à la plateforme e-sport, qui ne doit pas être modifiée.

### Règles propres à Play
- Fichiers préfixés « p » (p01-accueil.html, p02-genre.html…) ; données dans js/data-play.js.
- Réutiliser tokens.css, style.css, nav.js et demo.js. Aucune couleur en dehors de tokens.css.
- Play est une mini app : en-tête avec retour vers Max it, pas de barre du bas e-sport.
- Les jeux ne sont pas jouables. « Jouer » ouvre un écran de jeu simulé : écran de chargement,
  puis une illustration « partie en cours » avec un bouton pour quitter, qui ramène à la fiche.
- Noms de jeux et de partenaires fictifs (pas de marques réelles). Icônes des jeux en SVG.
- Catalogue fictif : environ 30 jeux répartis dans les 10 genres, 3 partenaires fictifs, dont
  un en modèle A (une mini app par jeu) et deux en modèle B (hub), l'un avec lien direct et
  l'autre sans.
- Choix pour les questions ouvertes du backlog : avis publiés tout de suite, affichés sous le
  pseudonyme ; mention « Fourni par » active pour un partenaire et absente pour les autres ;
  bouton « Quitter » affiché par Max it au-dessus du jeu.

### Menu de démo — ajouts Play
Nouveau joueur (ni récents ni favoris) ; pays avec ou sans badge « Sans consommation de data » ;
jeu momentanément indisponible ; ouverture par lien partagé ; lien vers un jeu indisponible.

### Visuels de référence Figma
- Les écrans de reference/figma-play/ sont la maquette de l'équipe UI : ils font foi pour la
  mise en page, les composants, les couleurs et les textes de Play.
- Reproduire ces écrans au plus près. Les couleurs et tailles propres à Play vont dans
  css/tokens.css, dans une section « Play ».
- Si un écran Figma contredit le backlog, ou si une US n'a pas d'écran Figma, me le signaler
  au lieu de trancher seul.

### Arbitrages Figma / backlog (validés)
- Accueil : ordre de Figma (récemment joués avant l'éditorial) ; une seule carte « à la une »
  au style des cartes « Discover » ; grille de genres de Figma avec les 10 genres et
  « Tous les jeux » (à la place des rangées par genre) ; ajout de Recommandés, Mes favoris,
  Nouveautés et Populaires ici (au lieu de « Best reviewed ») au style de « Recently played ».
- Tuile : image, nom, « Gratuit » et note moyenne. Titre de la mini app : « Play ».
- Fiche jeu : ajout du favori, des badges, des langues, du nombre de joueurs, du mode solo ou
  multijoueur, du nombre d'avis et de « Signaler » ; ligne « Fourni par » seulement pour le
  partenaire concerné ; « Donner mon avis » désactivé si le jeu n'a jamais été lancé ;
  avis sous pseudonyme ; pas de « Voir tout » sur la galerie ni sur les jeux similaires.
- Textes traduits en français, noms de jeux et de partenaires fictifs, visuels en SVG
  aux formats de Figma.
- Écrans sans Figma : réutiliser les composants Figma, sans en inventer.