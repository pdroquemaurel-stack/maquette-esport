# Plan des écrans — Fan Zone EA FC (4e chantier)

Espace « FAN ZONE EA FC » dans Max it, dédié à la finale du tournoi panafricain EA FC (Tunis, 12 et 13 décembre 2026).
Adaptation de l'ancienne Fan zone de la CAN : même structure, même style, même hiérarchie ; contenus e-sport à la place du football.
Plan validé le 2026-10-30. Données fictives dans `js/data-fanzone.js`, fonctions communes dans `js/fanzone.js`.

**Charte** (section « Fan Zone » de `css/tokens.css`) : fond noir #0D0D0D, cartes anthracite #1E1E1E (coins de 16 px),
orange Max it en accent, texte blanc et gris clair, halo néon vert #00E37A sur le direct et l'arbre, badge rouge « EN DIRECT ».
**Entrée** : 00c, visuel « Fan Zone EA FC » de la rubrique « Découvrir » → f01. La tuile « Boutique » ouvre toujours le Shop (s01).
**Pays soutenu** : choisi à la première ouverture de f01 (« Quel pays soutiens-tu ? ») et mémorisé ; il fixe le drapeau de l'en-tête,
l'équipe mise en avant, l'entourage orange dans l'arbre et la monnaie du Pass Fan (MAD, TND, EGP, FCFA, CDF).
**Équipes** : 8 pays en quarts de finale (joués en ligne en novembre) ; 4 qualifiés pour les demi-finales à Tunis (Maroc, Tunisie,
Égypte, Côte d'Ivoire), 4 éliminés (Sénégal, Cameroun, Mali, RD Congo). Joueurs et pseudos inventés.
**Interrupteur gratuit / abonné** : aucun effet dans la Fan Zone.

---

## Écrans

### f01 `f01-accueil.html` — Accueil de la Fan Zone
- En-tête : retour vers Max it (00c), « FanZone Orange » (« Orange » en orange).
- Sous le titre : emplacement « EA FC / Orange eSport » à gauche, avatar du supporter au centre (cercle orange ; sans avatar :
  « + » et « Crée ton avatar ») avec le drapeau du pays soutenu, logo Orange « est là » à droite.
- Carte stream 16:9. Avant le live : « Finale EA FC – Tunis – 12 & 13 décembre », compte à rebours (jours, heures, min, sec)
  jusqu'au 12/12/2026 à 14h heure de Tunis, heure de début affichée à l'heure locale, « Me rappeler le début du live » (toast
  « Rappel activé », à nouveau pour désactiver). En direct : badge « EN DIRECT », « Finale EA FC – Jour 1 », « Émission live avec
  les streamers », bouton lecture « Regarder » → f02.
- Tuiles « Avatar Supporter » → f03 et « Jouer & Gagner » (« Gagne des codes EA FC Mobile ») → f04.
- Icônes Équipes → f08, Arbre → f10, Galerie → f11, Bundle EA FC → f05.
- Carrousel de 3 bannières orange (toutes les 4 s, points de pagination) : avatar → f03, Pass data → f05, quiz du jour → f04.
- Première ouverture : fenêtre « Quel pays soutiens-tu ? ».

### f02 `f02-live.html` — Live Max it TV
- En direct : lecteur simulé (mention « Max it TV », badge « EN DIRECT », pause, plein écran hors périmètre), 12 438 spectateurs,
  programme du jour à l'heure locale (demi-finale 1 en cours), « Voir l'arbre » → f10.
- Avant le live : « Le live n'a pas encore commencé », compte à rebours, rappel, retour à la Fan Zone.

### f03 `f03-avatar.html` — Avatar Supporter
- Indicateur d'étapes : Photo, Pays, Avatar.
- 1 : zone de dépôt (galerie du téléphone, ou « photo d'exemple ») et case obligatoire « J'accepte que ma photo soit utilisée pour
  générer mon avatar ». La photo reste dans le téléphone.
- 2 : liste des 8 pays avec drapeaux (pays soutenu présélectionné).
- 3 : « Création de ton avatar… » puis avatar simulé (silhouette, maillot e-sport aux couleurs du pays, casque gaming),
  « Utiliser comme photo de profil » (→ f01 avec toast), « Partager » (lien copié), « Recommencer ».
- Avatar terminé : affiché dans l'en-tête de f01 ; le pays choisi devient le pays soutenu.

### f04 `f04-quiz.html` — Jouer & Gagner
- 3 questions à choix multiples, barre de progression, correction immédiate, « Lots restants aujourd'hui : 248 » (−1 par code gagné).
- Fin : score ; à partir de 2 bonnes réponses, « Tu as gagné un code EA FC Mobile ! », code masqué, « Révéler mon code » ;
  moins de 2 : « Rejouer ». Plafond de 2 codes atteint : message dédié, lien vers f07.
- Mention « 2 codes maximum par utilisateur – valables jusqu'au 31/12/2026 ».

### f05 `f05-bundle.html` — Bundle EA FC
- Carte « Pass Fan EA FC – 2 Go – 7 jours + 1 code EA FC Mobile », prix en monnaie locale, « Acheter » → f06.
- Mentions : code valable uniquement sur EA FC Mobile, jusqu'au 31/12/2026, 2 codes max par utilisateur.
- Plafond atteint : le pass reste achetable, avec la data seulement. Lien « Mes codes » → f07.

### f06 `f06-achat.html` — Achat du Pass Fan
- Récapitulatif, choix Orange Money ou crédit, « Confirmer et payer », paiement simulé (1,5 s).
- « Achat confirmé, ton code est disponible dans Mes codes », date de fin des 2 Go ; « Voir mes codes » → f07, retour → f01.

### f07 `f07-mes-codes.html` — Mes codes
- Codes gagnés au quiz ou reçus avec le pass : origine, date, code masqué → « Révéler », puis « Copier ». Mode d'emploi du code.
- Sans code : liens vers le quiz (f04) et le Pass Fan (f05).

### f08 `f08-equipes.html` — Équipes
- Grille des 8 pays : drapeau, pays, joueur, pseudo, « Qualifié » ou « Éliminé ». Équipe du pays soutenu en premier, entourée
  d'orange (« Ton équipe »). Carte → f09.

### f09 `f09-equipe.html?pays=…` — Fiche d'une équipe
- Photo (emplacement aux couleurs du pays), statut, joueur, pseudo, parcours en qualification. « Voir l'arbre » → f10.

### f10 `f10-arbre.html` — Arbre
- Défile horizontalement : quarts (scores) → demi-finales (12 déc.) → finale (13 déc.). Vainqueurs en surbrillance néon,
  pays soutenu entouré d'orange. En direct : demi-finale 1 Maroc – Tunisie en cours (1-1), « Regarder le live » → f02.
- Ligne d'un pays → f09.

### f11 `f11-galerie.html` — Galerie
- 9 vignettes colorées (couleurs du pays, orange pour l'organisation) avec légendes ; vue agrandie avec précédente / suivante.

## Menu de démo — Fan Zone EA FC
- « État de la page : Avant le live / En direct » : carte principale de f01, lecteur f02, arbre f10.
- « Rejouer le choix du pays » : ouvre f01 avec la fenêtre « Quel pays soutiens-tu ? ».
- « Nouveau supporter » : f01 sans pays, ni avatar, ni codes, ni rappel.
