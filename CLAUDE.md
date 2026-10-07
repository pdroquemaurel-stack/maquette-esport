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