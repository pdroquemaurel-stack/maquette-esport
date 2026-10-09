# Plan des écrans — maquette joueur e-sport Max it

Source : `reference/backlog.html` (15 Epics, 71 US), US MVP côté joueur. Plan validé le 2026-10-07.

Une page HTML par écran (voir CLAUDE.md). `index.html` ouvre 00a. Le registre des écrans et la navigation sont dans `js/nav.js`, l'état de démonstration est mémorisé entre les pages.

**Barre du bas de la plateforme e-sport** : Accueil (03) · Tournois (04) · **Mes matchs** (05, bouton central orange) · Contenus (20) · Profil (23).
En-tête : cloche → 25 Notifications.

---

## Écrans Max it (reproduits d'après les captures)

### 00a `00a-maxit-accueil.html` — Accueil Max it
- Référence : `reference/01-accueil-maxit.png`.
- Éléments : en-tête (avatar, « Hello … », numéro, recherche, messages, notifications) ; carrousel de bannières ; raccourcis (Send money, Buy bundle, Cashout, See all) ; « Trending now » ; barre du bas Max it (Home, Money, bouton central, My Line, Plazza).
- Liens : bouton central → 00b.

### 00b `00b-maxit-univers.html` — Tous les univers Max it
- Référence : `reference/02-univers.png`.
- Éléments : recherche ; feuille modale « Tous les univers Max it » ; grille de tuiles (Max it TV, Marketplace, Gaming, Messaging, My line, Orange money) ; bouton fermer flottant.
- Liens : Gaming → 00c ; fermer → 00a.

### 00c `00c-maxit-gaming.html` — Game corner
- Référence : `reference/03-gaming.png` (thème sombre).
- Éléments : retour, recherche ; titre « Game corner » ; tuiles Play, Gameshop, Esport ; « Discover » ; « Continue playing ».
- Liens : Esport → 02 au premier accès, sinon 03 ; retour → 00b.
- État (menu de démo) : compte Max it suspendu → message « Accès aux tournois impossible » au lieu d'entrer dans la plateforme (S01-01).

---

## Plateforme e-sport

### 02 `02-pseudo.html` — Choix du pseudonyme (premier accès)
- US : S01-01, S01-02, S01-05
- Éléments : saisie du pseudo ; refus « pseudo déjà pris » avec proposition ; pour un ancien joueur : « Ton historique a été repris » et case « Ne pas reprendre mon historique ».
- Liens : → 03.

### 03 `03-accueil.html` — Accueil e-sport
- US : S05-01, S05-02, S11-01, S10-02, S08-02
- Éléments : prochaine échéance (match ou inscription) ; tournois à la une (badges Abonnés / MEA) ; carrousel des 4 jeux ; derniers contenus (rubrique vidéo masquable par pays) ; pour le joueur gratuit, encart discret « Ce que débloque l'abonnement » (jamais en surimpression).
- Liens : → 04, 05, 06, 13, 18, 19, 20, 21, 25.

### 04 `04-calendrier.html` — Calendrier, recherche et filtres
- US : S05-01, S05-02, S03-04, S03-07
- Éléments : tournois du pays du plus proche au plus lointain ; recherche (nom du tournoi ou du jeu) ; feuille de filtres (jeu, format, date, accès ouvert / abonnés, solo / équipe) ; badges « Réservé aux abonnés », « MEA », « Inscriptions closes ».
- Liens : → 06.

### 05 `05-mes-tournois.html` — Mes matchs et tournois
- US : S05-01, S04-01, S04-02
- Éléments : tournois où je suis inscrit avec leur prochaine échéance ; rang en liste d'attente ; mes équipes ; historique des tournois terminés.
- Liens : → 06, 10, 11, 14.

### 06 `06-tournoi.html` — Page d'un tournoi
- US : S05-03, S03-03, S03-04, S03-06, S03-07, S04-01, S04-02
- Éléments : jeu, format, dates, dotations, condition d'accès, pays (si MEA), participants.
- Bouton principal selon l'état :
  - « S'inscrire » ;
  - « S'abonner pour s'inscrire » (joueur gratuit, tournoi réservé) ;
  - « Rejoindre la liste d'attente » (complet) ;
  - « Inscrit · Se désinscrire » ;
  - « Inscriptions closes ».
- Bandeau « Règlement modifié, nouvelle acceptation requise ».
- Liens : → 07, 12, 13, 17 (participant), 21.

### 07 `07-reglement.html` — Règlement et acceptation
- US : S03-03
- Éléments : règlement et sa version ; case « J'accepte » obligatoire ; après modification : « Accepter » ou « Refuser et me désinscrire ».
- Liens : → 08 (solo), 09 (équipe), retour 06.

### 08 `08-inscription-resultat.html` — Résultat de l'inscription
- US : S04-01, S04-02, S04-05, S06-03, S03-04
- États :
  - place acquise ;
  - liste d'attente avec rang ;
  - refus avec motif (pays, compte ou gamertag déjà inscrit) ;
  - suspension 7 jours après 3 forfaits ;
  - abonnement expiré, inscription annulée.
- Pas de refus pour âge (S01-03 en suspens).
- Liens : → 05, 06, 21 (se réabonner), 26 (contester).

### 09 `09-equipe-choix.html` — Créer ou rejoindre une équipe
- US : S04-03, S04-04
- Éléments : choix « Créer » / « Rejoindre » ; liste des équipes ouvertes (nom, capitaine, places restantes) avec « Demander à rejoindre » ; création (nom unique, équipe ouverte ou fermée).
- Liens : → 10.

### 10 `10-equipe.html` — Mon équipe
- US : S04-03, S04-04
- Éléments : effectif / taille requise ; inviter par pseudo, partager le lien ; demandes en attente (capitaine : accepter / refuser) ; transmettre le rôle de capitaine ; quitter.
- États : équipe inscrite automatiquement ; équipe incomplète à la clôture.
- Lot 7 : le capitaine d'une équipe incomplète la rend ouverte pour la compléter (« Rendre l'équipe ouverte » : elle rejoint la liste des équipes ouvertes de 09, une demande arrive), ou la referme.
- Liens : → 06.

### 11 `11-match.html` — Salle de match
- US : S06-02, S06-03
- Éléments : adversaire, heure, compte à rebours, bouton « Je suis présent » (actif de -10 min au début).
- États : attente de l'adversaire ; match démarré ; forfait adverse (qualifié) ; mon forfait (motif et heure) ; deux absents.
- Lot 7, discussion entre les deux joueurs : messages libres et messages rapides (« Envoie-moi ton code ami »…), réponses de l'adversaire simulées, « Signaler » au responsable local ; fermée si le match n'a pas lieu (forfait, double absence). Bouton « Discuter avec … » sur la carte du match.
- Liens : → 14, 12.

### 12 `12-arbre.html` — Arbre, poules et classement du tournoi
- US : S05-03, S02-02, S02-03, S06-01, S06-04, S05-04 (classement du tournoi)
- Éléments : onglets « Arbre » (élimination, exemptés), « Poules » (points, qualifiés, critère de départage affiché), « Classement » ; mise à jour en direct ; mon match en évidence.
- Onglet « Classement » (S05-04) : consultable pendant et après le tournoi ; 100 premiers puis ma position épinglée ; indication « mis à jour il y a quelques secondes » ; mention « recalculé après arbitrage » quand c'est le cas.
- Liens : → 11 (mon match), 17 (joueur).

### 13 `13-jeu.html` — Page d'un jeu
- US : S05-05
- Éléments : tournois à venir et en cours ; articles et vidéos du jeu ; lien « Boutique Max it » avec prix en monnaie locale (absent si le jeu n'a pas d'offre).
- Liens : → 06, 18, 19, boutique Max it (hors maquette).

### 14 `14-resultat.html` — Déclarer le résultat
- US : S07-01, S07-02
- Éléments : saisie du score ; délai 30 min ; correction possible tant que l'adversaire n'a pas déclaré.
- Lot 7, preuve à chaque déclaration : section « Preuve facultative » (jusqu'à 3 captures) ; sans capture, « Ajouter une preuve ? » propose « Ajouter une capture » ou « Déclarer sans preuve ». Les captures jointes sont reprises dans le litige (15).
- États : en attente de l'adversaire ; match clos ; résultat adverse retenu avec « Contester » (30 min) ; délai dépassé.
- Liens : → 15, 12.

### 15 `15-litige.html` — Litige et preuves
- US : S07-03, S07-02
- Éléments : les deux déclarations ; jusqu'à 3 captures (celles de la déclaration déjà jointes, modifiables) ; compte à rebours 30 min ; état « En attente d'arbitrage » puis décision.
- Liens : → 12.

### 17 `17-profil-public.html` — Profil public d'un joueur
- US : S01-02, S05-03
- Éléments : pseudo, tournois joués et gagnés, résultats ; aucune donnée personnelle.
- Lot 7 : ratio de victoires (jauge, matchs gagnés / disputés), meilleur classement, meilleure série ; collection de 13 badges (obtenus, ou verrouillés avec leur progression ; détail au toucher).

### 18 `18-video.html` — Lecteur vidéo
- US : S10-01, S10-02, S11-01
- Éléments : lecture dans l'application ; sous-titres ; mode « économie de données » ; reprise à l'endroit interrompu.
- Joueur gratuit : bande-annonce lisible ; vidéo réservée verrouillée avec condition d'accès et « S'abonner ».
- Liens : → 21.

### 19 `19-article.html` — Article
- US : S11-01, S09-02 (signalement)
- Éléments : titre, visuel, résumé ; corps masqué pour un joueur gratuit si l'article est réservé, avec invitation à s'abonner ; bouton « Signaler ».
- Liens : → 21.

### 20 `20-contenus.html` — Contenus (onglet)
- US : S10-01, S10-02, S11-01, S08-02
- Éléments : liste des articles et vidéos ; filtre par jeu (puces) ; verrou sur les contenus réservés (joueur gratuit) ; vidéos masquées si la fonction est désactivée dans le pays.
- Liens : → 18, 19.

### 21 `21-offre.html` — Offre d'abonnement
- US : S11-01, S11-02
- Éléments : ce que débloque l'abonnement ; offres quotidienne, hebdomadaire, mensuelle aux tarifs du pays ; période d'essai si activée.
- Liens : → 22.

### 22 `22-paiement-maxit.html` — Brique de paiement Max it (simulée)
- US : S11-02, S11-03
- Éléments : offre et montant pré-remplis ; issues confirmé / refusé / abandonné.
- Liens : retour à l'écran d'origine (06, 18, 19, 20, 23 ou 24), déverrouillé si confirmé, toujours verrouillé sinon.

### 23 `23-profil.html` — Mon profil
- US : S01-02, S01-05, S11-04
- Éléments : pseudo (modifiable une fois tous les 30 jours) ; gamertags par jeu (refus si déjà rattaché) ; tournois joués (historique repris compris) ; résumé de l'abonnement, ou « S'abonner » pour un joueur gratuit ; état « pseudo remplacé car jugé offensant ».
- Lot 7 : ratio de victoires, meilleur classement, MaxPoints du mois ; badges obtenus ; « Mes MaxPoints » : position du mois et historique des crédits (tournoi, date, points).
- Liens : → 17, 21, 24, 27, 28, 29.

### 24 `24-abonnement.html` — Mon abonnement
- US : S11-04
- Éléments : offre, date d'échéance, avis de reconduction, « Mettre fin ».
- États : actif ; résilié (accès jusqu'au JJ/MM) ; expiré avec « Se réabonner ».
- Liens : → 21.

### 25 `25-notifications.html` — Centre de notifications
- US : S12-01, S03-06, S08-04, S03-04
- Événements :
  - inscription (acceptée, refusée, sortie de liste d'attente) ;
  - tournoi (reporté, annulé, règlement modifié) ;
  - match (convocation, rappel 5 min, résultat, contestation, décision d'arbitrage, qualification, élimination, victoire) ;
  - dotation versée, invitation d'équipe, exclusion ;
  - abonnement (activé, reconduction à venir, échec de paiement, expiré) ;
  - nouveau tournoi sur un jeu suivi.
- Liens : → écran concerné (06, 07, 08, 10, 11, 14, 15, 24, 26).

### 26 `26-contestation.html` — Contester une décision
- US : S08-04, S04-05
- Éléments : décision (exclusion d'un tournoi ou de la plateforme, refus pour doublon), motif, durée ; champ libre ; envoi au responsable local.

### 27 `27-preferences-notif.html` — Préférences de notification
- US : S12-01, S12-02
- Éléments : un interrupteur par famille (« Match en cours » grisé, non désactivable) ; refus des SMS ; consentement aux messages promotionnels.

### 28 `28-mes-donnees.html` — Mes données
- US : S01-04, S01-05
- Éléments : « Télécharger mes données » ; « Supprimer mon profil » (effacement sous 30 jours, résultats anonymisés) ; « Ne pas reprendre mon historique ».
- Pas de consentement parental (S01-03 en suspens).

### 29 `29-classement-mensuel.html` — Classement mensuel des MaxPoints (lot 7)
- US : E15 (V2) S15-01, S15-02, S15-03, S15-04 ; S15-05 (remise des récompenses) relève du back-office.
- Éléments : mois, clôture et jours restants, ma position et mes points ; onglets « Ouvert à tous » (cadeaux) et « Joueurs gratuits » (abonnements offerts) ; récompenses du responsable local ; 100 premiers puis ma position épinglée ; égalité départagée par l'heure d'atteinte du total ; mois précédents avec leurs gagnants et ma place finale ; feuille « Comment gagner des MaxPoints » (barème).
- Joueur abonné : absent du classement des joueurs gratuits, avec explication.
- Paramètres : `mois` (2026-10, 2026-09, 2026-08), `onglet` (tous, gratuits).
- Liens : → 17 (joueur) ; accès depuis 03, 23 et les notifications « Classement mensuel » (25).

---

## Menu de démonstration — `js/demo.js`

Icône discrète en haut à droite, présente sur tous les écrans. Ce n'est pas un écran du produit.

- Interrupteur **joueur gratuit / joueur abonné**.
- Raccourcis vers les états alternatifs :
  - compte Max it suspendu (00c) ;
  - session Max it expirée (retour vers Max it puis vers l'écran d'origine) ;
  - premier accès (00c → 02) ;
  - forfait adverse, mon forfait, double absence (11) ;
  - résultat divergent, déclaration adverse à contester, délai de déclaration dépassé, aucune déclaration dans le délai (14) ;
  - litige ouvert, décision d'arbitrage rendue (15) ;
  - exclusion d'un tournoi, à contester (26) ;
  - refus : identifiant de jeu, compte, pays ; liste d'attente ; suspension après 3 forfaits ;
    inscription annulée par abonnement expiré (08) ;
  - équipe incomplète à la clôture (10) ;
  - équipe fermée à compléter (10, PUBG Squad Casablanca, lot 7) ;
  - MaxPoints crédités à la clôture d'un tournoi (29 : +50 points, la position monte, notification ; lot 7) ;
  - paiement refusé, paiement abandonné (22, retour sur l'écran affiché) ;
  - abonnement résilié, abonnement expiré (24) ;
  - pseudo jugé offensant (23) ;
  - compte supprimé, 30 jours après la demande (28 ; pseudonyme anonyme dans 12 et 17) ;
  - nouvelle notification, reçue en moins de 5 s sur l'écran affiché (sans changer d'écran).

---

## Schéma de navigation

```
00a Accueil Max it ─(bouton central)─► 00b Univers ─(Gaming)─► 00c Game corner
                                          │ fermer → 00a          │ (Esport)
                                                                  ▼
                                      1er accès ─► 02 Pseudo ─► 03 ACCUEIL e-sport
                                      sinon ─────────────────► 03

Barre du bas : [03 Accueil] [04 Tournois] (05 Mes matchs) [20 Contenus] [23 Profil]
En-tête      : 🔔 25 Notifications        Menu démo : icône en haut à droite

04 Calendrier ─┐
03 Accueil ────┼─► 06 Tournoi ─┬─► 07 Règlement ─┬─(solo)───► 08 Résultat inscription ─► 05
13 Jeu ────────┘               │                 └─(équipe)─► 09 Choix équipe ─► 10 Mon équipe
                               ├─► 12 Arbre/Poules/Classement ─┬─► 11 Salle de match
                               │                               └─► 17 Profil public
                               ├─(gratuit + réservé)─► 21 Offre
                               └─► 13 Jeu ─┬─► 18 Vidéo
                                           ├─► 19 Article
                                           └─► Boutique Max it (externe)

20 Contenus ─┬─► 18 Vidéo ───(verrou)─► 21
             └─► 19 Article ─(verrou)─► 21

05 Mes matchs ─► 11 Salle de match ─► 14 Déclarer résultat ─(divergence/contestation)─► 15 Litige
                                                   └──────────────► 12 Arbre

21 Offre ─► 22 Paiement Max it ─(confirmé/refusé/abandonné)─► écran d'origine

23 Profil ─┬─► 24 Abonnement ─► 21
           ├─► 17 Profil public (badges, ratio de victoires)
           ├─► 29 Classement MaxPoints
           ├─► 27 Préférences notif
           └─► 28 Mes données
03 Accueil ─► 29 Classement MaxPoints ─► 17 Profil public
25 Notifications ─► 06 / 07 / 08 / 10 / 11 / 14 / 15 / 24 / 26 Contestation
08 Résultat (refus doublon) ─► 26 Contestation
```

---

## Avancement

| Lot | Écrans | État |
|---|---|---|
| 1 | Socle (CSS, données, routeur, menu de démo), 00a, 00b, 00c | terminé |
| 2 | 02, 03, 04, 06, 12, 13, 17 et barre du bas e-sport | terminé |
| 3 | 05, 07, 08, 09, 10 et page de contrôle `outils/controle.html` | terminé |
| 4 | 11, 14, 15, 26 et test de parcours `outils/parcours-match.html` | terminé |
| 5 | 18, 19, 20, 21, 22, 23, 24 et test de parcours `outils/parcours-abonnement.html` | terminé |
| 6 | 25, 27, 28, fichier unique `maquette-esport.html`, tests `outils/parcours-notifications.html` et `outils/test-fichier-unique.html` | terminé |
| 7 | Preuve à chaque déclaration (14, 15), discussion de match (11), indicateurs et badges (17, 23), équipe fermée → ouverte (10), bouton « S'abonner pour s'inscrire » réduit (style.css), 29 classement mensuel des MaxPoints (accès 03, 23, 25) | terminé |
| 8 | Visuels des jeux en PNG (`images/jeux/<jeu>-carre.png` et `<jeu>-large.png`), déclarés dans `js/data.js` (jeux[].images), affichés sans déformation (object-fit: cover) partout où le jeu apparaît ; intégrés au fichier unique | terminé |

**Visuels des jeux** : le carré sert aux tuiles et vignettes, le large aux bandeaux et en-têtes. Pour changer un visuel, remplacer le PNG en gardant son nom (ou changer le chemin dans `js/data.js`), puis reconstruire le fichier unique. Sans image, le dégradé et le pictogramme du jeu s'affichent.

**Tests** (dossier `outils/`, à ouvrir avec l'accès entre fichiers locaux autorisé, par exemple `msedge --allow-file-access-from-files`) : `controle.html#gratuit` et `#abonne` (débordements, textes coupés, barre du bas, liens, impasses), `parcours-match.html`, `parcours-abonnement.html`, `parcours-notifications.html`, `test-fichier-unique.html`. Ajouter `?unique` pour les rejouer dans le fichier unique.
**Fichier unique** : `maquette-esport.html`, reconstruit par `node outils/construire-fichier-unique.js` après chaque modification.

Démo des matchs (lot 4) : dans 11, 14 et 15, le temps défile 30 fois plus vite (1 s = 30 s) ; les raccourcis du menu de démo mènent à chaque état.

## Couverture

### Couverture finale des US MVP

48 US MVP dans le backlog (15 Epics, 71 US) : 14 couvertes, 24 en partie, 9 hors périmètre (back-office), 1 en suspens.
« En partie » : le parcours joueur est maquetté, mais une part de la règle est côté serveur, dans le back-office ou hors de l'application.

| US | Titre | Couverture | Écrans | Limites et remarques |
|---|---|---|---|---|
| S01-01 | Authentification déléguée à Max it | En partie | 00c, 02, 03 | Entrée depuis Max it ; compte suspendu et session expirée simulés par le menu de démo. L'authentification elle-même est celle de Max it. |
| S01-02 | Profil de joueur esport | En partie | 02, 17, 23 | Pseudo unique modifiable une fois tous les 30 jours, identifiant de jeu refusé s'il est déjà rattaché, pseudo offensant remplacé (02, 23, raccourci « Pseudo jugé offensant »). Badges, ratio de victoires et meilleur classement ajoutés au lot 7 (17, 23). |
| S01-03 | Âge du joueur et accès des mineurs | En suspens | — | Ni refus pour âge, ni consentement parental. |
| S01-04 | Droits du joueur sur ses données | Couverte | 28, 12, 17 | Téléchargement : confirmation simulée, aucun fichier produit. Suppression sous 30 jours puis pseudonyme anonyme (raccourci « Compte supprimé »). |
| S01-05 | Reprise des données de l'ancienne plateforme | En partie | 02, 05, 17, 23, 28 | La reprise elle-même est côté serveur ; seul son résultat est visible (02, 23, 28). |
| S02-01 | Ajouter un nouveau jeu sans développement | Hors périmètre | — | Back-office. |
| S02-02 | Format à élimination | En partie | 12 | Arbre à 16 joueurs. Exemptés et double élimination non maquettés ; génération de l'arbre côté serveur. |
| S02-03 | Format en poules et championnat | En partie | 12 | Poules, barème, qualifiés, critère de départage. Répartition et barème définis dans le back-office. |
| S03-01 | Création et configuration d'un tournoi | Hors périmètre | — | Back-office. |
| S03-02 | Modifier, reporter, annuler ou dupliquer un tournoi | Hors périmètre | 25 | Back-office ; le joueur voit seulement les notifications de report et d'annulation. |
| S03-03 | Règlement du tournoi et son acceptation | En partie | 07, 06, 03 | Acceptation obligatoire et réacceptation d'un règlement modifié maquettées (07). Seule la version acceptée est mémorisée, pas la date. L'avis « désinscrit après refus » arrive par notification (25). |
| S03-04 | Tournois ouverts ou réservés aux abonnés | Couverte | 04, 06, 07, 08, 21 | Le changement de règle et son journal relèvent du back-office. |
| S03-06 | Remise des dotations | En partie | 06, 25 | Le versement sur le numéro Max it n'apparaît que par la notification (25). |
| S03-07 | Créer un tournoi MEA ouvert à plusieurs pays | Couverte (côté joueur) | 04, 06 | Seuls les tournois ouverts dans le pays du joueur sont visibles. Création et ouverture par pays : back-office. |
| S04-01 | Inscription d'un joueur gratuit | En partie | 06, 07, 08 | Place acquise, liste d'attente avec rang, refus pour pays (08), désinscription avant le début (06). Le passage du premier de la liste d'attente en cas de désistement est côté serveur ; il n'est visible que par notification (25). Pas de refus pour l'âge (S01-03 en suspens). |
| S04-02 | Inscription d'un joueur abonné | En partie | 06, 07, 08 | Comme S04-01 ; la réponse en moins de 5 s est figurée par l'affichage immédiat de 08. Le joueur abonné s'inscrit aux tournois réservés comme aux autres. |
| S04-03 | Créer une équipe pour un tournoi | En partie | 09, 10 | Création, nom unique, ouverte / fermée (modifiable ensuite par le capitaine, lot 7), demandes, invitation par pseudo, lien, transmission du rôle, départ du capitaine, inscription automatique, équipe incomplète à la clôture (09, 10). Les réponses des autres joueurs sont simulées par des délais ; la réception d'une invitation côté invité et les avis aux membres passent par les notifications (25). |
| S04-04 | Rejoindre une équipe | En partie | 09, 10 | Liste des équipes ouvertes, demande acceptée par le capitaine (simulée), une seule équipe par tournoi (09). Non maquettés : le refus d'une demande pour critère non rempli et l'arrivée par le lien d'une équipe fermée. |
| S04-05 | Un seul compte par joueur et par tournoi | En partie | 08, 26 | Refus pour compte ou identifiant de jeu déjà inscrit, avec motif et « Contester » vers 26 (08). La consignation du refus et sa consultation par le responsable local relèvent du back-office. |
| S05-01 | Calendrier, recherche et filtres (abonné) | Couverte | 04, 05, 03 | — |
| S05-02 | Calendrier, recherche et filtres (gratuit) | Couverte | 04, 06, 21, 22 | — |
| S05-03 | Page d'un tournoi et arbre consultables par tous | Couverte | 06, 12, 17 | Mise à jour sans rechargement simulée (résultat en direct après 4 s). |
| S05-04 | Classement d'un tournoi | Couverte | 12 | La correction des MaxPoints après arbitrage (E15) est seulement mentionnée dans le barème (29). |
| S05-05 | Page d'un jeu et lien vers la boutique | Couverte | 13 | La boutique Max it est hors maquette (message) ; l'attribution des achats relève des rapports. |
| S06-01 | Progression du tournoi sans intervention | En partie | 11, 12 | Automatismes sans écran propre ; leurs effets sont visibles dans 11 et 12 (vainqueur au tour suivant, qualification d'office après double absence). |
| S06-02 | Convocation et confirmation de présence | En partie | 11, 25 | Compte à rebours, présence de -10 min au début, rappel à -5 min, démarrage dès que les deux sont présents (11). La convocation reçue 15 min avant arrive par notification (25). |
| S06-03 | Absence d'un joueur au début du match | En partie | 11, 12, 08 | Forfait (motif, heure), victoire par forfait, double absence (11, 12). Le compteur de forfaits est fixe (1 sur 30 jours) ; la suspension après 3 forfaits est montrée en 08. Le forfait en poule (défaite au score de la fiche jeu) n'est pas maquetté. |
| S06-04 | Départage des égalités | En partie | 12 | Automatismes sans écran propre ; leurs effets sont visibles dans 11 et 12 (vainqueur au tour suivant, qualification d'office après double absence). |
| S07-01 | Résultat déclaré par les deux joueurs | En partie | 14 | Saisie, correction tant que l'adversaire n'a pas déclaré, match clos par concordance, refus après le délai (14). Ouverture de la déclaration : voir « Décisions ». |
| S07-02 | Résultat déclaré par un seul joueur | En partie | 14, 15 | Déclaration adverse retenue, contestation pendant 30 min, résultat définitif sans contestation (14). Les avis à l'adversaire passent par les notifications (25). Aucune déclaration dans le délai : voir « Décisions ». |
| S07-03 | Déclarations divergentes et preuve | En partie | 14, 15 | Preuve proposée dès la déclaration (14, lot 7). Litige automatique, 3 captures au plus, délai de 30 min, arbitrage puis décision avec motif (15). Les captures restent sur l'appareil ; la conservation 90 jours est seulement mentionnée. La décision est simulée : avec au moins une capture, la déclaration du joueur l'emporte. |
| S07-04 | File d'arbitrage outillée | Hors périmètre | — | Back-office ; le joueur voit l'attente et la décision (15). |
| S08-01 | Rôles et périmètres | Hors périmètre | — | Back-office. |
| S08-02 | Activation des fonctionnalités par pays | En partie | 03, 18, 20, 27 | Activation par pays simulée par un indicateur dans `data.js` (ex. masquer les vidéos). |
| S08-03 | Journal d'audit | Hors périmètre | — | Back-office. |
| S08-04 | Exclusion d'un joueur | En partie | 26, 25 | Côté joueur seulement : décision d'exclusion (motif, durée, conséquences) et contestation transmise au responsable local (26). L'exclusion elle-même relève du back-office. |
| S08-05 | Statistiques et exports | Hors périmètre | — | Back-office. |
| S09-01 | Définir les types de contenus | Hors périmètre | — | Back-office. |
| S09-02 | Gérer et publier les contenus de mon pays | En partie (côté joueur) | 19, 20 | Côté joueur seulement : bouton « Signaler » avec motif, une fois par article (19). Le retrait après 3 signalements, la publication et la règle d'accès par pays relèvent du back-office ; seul leur effet (verrou) est visible. |
| S09-03 | Déposer un contenu | Hors périmètre | — | Back-office. |
| S10-01 | Lire une vidéo sans quitter l'application | En partie | 18 | Lecteur simulé sans fichier vidéo : lecture dans l'application, sous-titres, mode « économie de données » (240p), reprise à la seconde près (18). Non maquettés : démarrage en moins de 5 s, fluidité et reprise après une coupure réseau. |
| S10-02 | Vidéos réservées pour un joueur gratuit | Couverte | 18, 20 | Vidéo réservée verrouillée avec condition d'accès et offre ; ni téléchargement ni lien externe (18, 20). Le blocage d'une adresse de lecture ouverte hors plateforme est côté serveur. |
| S11-01 | Être invité à s'abonner au bon moment | Couverte | 03, 06, 18, 19, 20, 21, 23 | Contenus et tournois réservés visibles avec leur condition d'accès, bandes-annonces libres, page d'offre ouverte seulement par un geste du joueur (03, 06, 18, 19, 20, 21, 23). Le corps d'un article réservé n'est pas inséré dans la page, mais il reste présent dans `js/data.js` (dans le produit, le serveur ne l'enverrait pas). |
| S11-02 | Choisir une offre et payer avec Max it | Couverte | 21, 22 | Offres et essai du pays (21), brique de paiement simulée avec offre et montant renseignés, issues confirmé / refusé / abandonné (22). Moyens de paiement et reçus : ceux de Max it, seulement évoqués. |
| S11-03 | Revenir au contenu après le paiement | Couverte | 22 et écran d'origine | Retour exact sur l'écran d'origine (06, 18, 19, 23, 24, 03, 08), déverrouillé après confirmation et bascule en mode abonné ; toujours verrouillé après refus ou abandon (`outils/parcours-abonnement.html`). |
| S11-04 | Suivre et gérer mon abonnement | Couverte | 24, 23, 03 | Offre, échéance, avis de reconduction selon la périodicité, « Mettre fin », états actif / résilié / expiré (24, 23, 03). L'avis lui-même arrive par notification (25) ; l'échec de reconduction est figuré par l'état « expiré ». |
| S12-01 | Être averti de ce qui me concerne | Couverte | 25, 27, cloche de chaque écran | Toutes les familles, dont « nouveau tournoi sur un jeu suivi ». Hors maquette : consentement parental (S01-03 en suspens) et début d'un direct (V2). Le délai de moins de 5 s est figuré par le raccourci « Nouvelle notification ». |
| S12-02 | Avertir par courriel et par SMS | En partie | 27 | Refus des SMS (si le pays les a activés) et consentement promotionnel. Les envois eux-mêmes et le choix des canaux par le responsable local sont hors application. |

### US V2 maquettées à la demande (lot 7)
| US | Titre | Couverture | Écrans | Limites et remarques |
|---|---|---|---|---|
| S15-01 | Gagner des MaxPoints | En partie | 23, 29 | Barème (participation, place finale) affiché ; historique des crédits dans 23, dont un tournoi d'exclusion à 0 point. Le calcul à la clôture et le recalcul après arbitrage sont côté serveur (raccourci « MaxPoints crédités »). |
| S15-02 | Classement mensuel ouvert à tous | Couverte | 29, 03 | Classement du Maroc seulement ; joueurs du mois en cours générés ; égalité départagée par l'heure d'atteinte du total. |
| S15-03 | Classement mensuel des joueurs gratuits | Couverte | 29 | Un abonné n'y figure pas (interrupteur de démo). La sortie en cours de mois après un abonnement est seulement expliquée. |
| S15-04 | Consulter les classements | Couverte | 29, 03, 23 | 100 premiers puis ma position épinglée, jours restants, récompenses, mois précédents avec gagnants. La mise à jour en moins de 10 s est figurée par le raccourci « MaxPoints crédités ». |
| S15-05 | Récompenser les gagnants du mois | Hors périmètre | 25, 29 | Back-office ; le joueur voit la notification de gain (n22) et les gagnants des mois clôturés. |

Le nom « E-Sport Orange Points » du backlog est affiché « MaxPoints » (décision du 2026-10-07). S01-02 : les badges, prévus « lorsque la fonction est activée », sont maquettés (17, 23).

### Décisions prises pendant la maquette
- 2026-10-07, lot 7 : une preuve (capture) est demandée à chaque déclaration de résultat, et non plus seulement en cas de litige ; elle reste facultative (14), et les captures jointes sont reprises dans le litige (15).
- 2026-10-07, lot 7 : discussion entre les deux joueurs dans la salle de match (11), avec signalement au responsable local (hors backlog).
- 2026-10-07, lot 7 : profil enrichi d'indicateurs (ratio de victoires, meilleur classement, meilleure série) et de 13 badges à collectionner (17, 23).
- 2026-10-07, lot 7 : le capitaine peut rendre ouverte une équipe fermée pour la compléter, puis la refermer (10).
- 2026-10-07, lot 7 : Epic E15 (V2) maquettée sous le nom « MaxPoints » (29).
- 2026-10-07, S07-02 : si aucun joueur ne déclare dans le délai, les deux sont éliminés, comme en double absence ; l'adversaire prévu au tour suivant est qualifié d'office (14, 12 ; raccourci « Aucune déclaration dans le délai »).
- 2026-10-07, S07-01 : la déclaration du résultat est ouverte dès le démarrage du match (et non à la fin prévue) ; elle se ferme 30 min après la fin prévue.
- 2026-10-07 : le match nul est refusé en élimination directe, accepté en poules et en championnat (14).

### US en suspens
- S01-03 Âge du joueur et accès des mineurs : ni refus pour âge, ni consentement parental.

### US MVP hors périmètre (back-office)
S02-01, S03-01, S03-02, S07-04, S08-01, S08-03, S08-05, S09-01, S09-03, et la partie gestion de S09-02.

---

# Play — mini app des mini-jeux (2e chantier)

Source : `reference/backlog-play.html`, Epics « Front — mini app Play » (E06 à E10). Visuels de référence : `reference/figma-play/` (et `reference/05-fiche-jeu-suite.png`). Arbitrages Figma / backlog : voir CLAUDE.md.
Données fictives (back-office simulé) : `js/data-play.js` ; fonctions communes : `js/play.js` ; couleurs et tailles : section « Play » de `css/tokens.css`.
Entrée : 00c, tuile « Jouer » → p01. Thème sombre, pas de barre du bas. Les numéros d'US ci-dessous sont ceux du backlog Play.

### p01 `p01-accueil.html` — Accueil de Play
- Référence : Figma 01 et 02.
- US : S06-01, S06-02, S06-03, S06-04, S09-01, S09-02, S09-03, S08-04.
- Éléments : retour vers Max it, illustration, « Bienvenue sur Play » ; Récemment joués (dès la première partie) ; À la une (une carte) ; Recommandés pour toi ; Mes favoris (dès le premier favori) ; Nouveautés ; Populaires ici ; grille des genres du pays et « Tous les jeux ». Avec `?indispo=1` : message « Ce jeu n'est pas disponible pour le moment ».
- Liens : retour → 00c ; tuiles et carte → p03 ; genres → p02.

### p02 `p02-genre.html?genre=sport` — Page d'un genre (`?genre=tous` : tout le catalogue)
- Pas d'écran Figma. US : S06-03, S06-04.
- Éléments : nom du genre, nombre de jeux, grille des jeux du pays par popularité.
- Liens : retour → p01 ; tuiles → p03.

### p03 `p03-jeu.html?jeu=…&depuis=…` — Fiche jeu
- Référence : Figma 04 et 05 (feuille posée sur l'accueil).
- US : S07-01 à S07-05, S09-01, S06-01 (lien direct `via=lien`), S08-04.
- Éléments : vidéo lancée à la demande ou visuel ; genre, nom, favori, partage (feuille du téléphone simulée) ; « Fourni par Kora Games » pour ce seul partenaire ; note et nombre d'avis ; badges « Gratuit » et, selon le pays, « Sans consommation de data » ; accroche, description, langues, joueurs, mode ; galerie ; jeux similaires ; notes et avis (Figma 06 : moyenne, nombre d'avis, « Donner mon avis » ou « Modifier mon avis », mon avis, 2 derniers commentaires, « Signaler ») ; bouton « Jouer » toujours visible.
- Liens : fermer (voile ou poignée) → page d'origine ; « Jouer » → p05, ou p04 pour un hub sans lien direct ; jeux similaires → p03 ; « Voir tout » et « Voir tous les avis » → p06 ; « Donner mon avis » → p07.

### p06 `p06-avis.html?jeu=…` — Tous les avis
- Pas d'écran Figma pour la liste : composants de Figma 06. US : S10-01, S10-02, S10-03.
- Éléments : moyenne, nombre d'avis et de commentaires, répartition des notes ; « Donner mon avis » (inactif si le jeu n'a jamais été lancé) ; mon avis en tête avec « Modifier » et « Supprimer » ; tous les commentaires, du plus récent au plus ancien, avec « Lire la suite » et « Signaler » (motif : insultant, hors sujet, publicité, autre).
- Liens : retour → p03 ; « Modifier » / « Donner mon avis » → p07 (retour sur p06).

### p07 `p07-donner-avis.html?jeu=…` — Donner ou modifier son avis
- Pas d'écran Figma. US : S10-01.
- Éléments : jeu, 1 à 5 étoiles avec libellé, commentaire facultatif (500 caractères, compteur), pseudonyme de publication, « Publier » (inactif sans note), « Supprimer mon avis » pour un avis existant. Jeu jamais lancé : message « Joue d'abord une partie » et « Revenir au jeu ».
- Liens : retour et « Publier » → p03 (ou p06 si l'on en vient).

### p04 `p04-transition.html?jeu=…` — Transition vers un hub sans lien direct
- Pas d'écran Figma. US : S08-02.
- Éléments : hub, texte « où trouver le jeu » de la fiche, « Continuer », « Revenir à la fiche ».
- Liens : « Continuer » → p05 (accueil du hub) ; retour → p03.

### p05 `p05-partie.html?jeu=…` — Jeu simulé
- Pas d'écran Figma. US : S08-01, S08-03 (et S08-02 avec `mode=hub`).
- Éléments : barre Max it avec « Quitter » au-dessus du jeu ; chargement puis « partie en cours » ; avec `mode=hub`, accueil du hub où le joueur choisit le jeu. Le lancement alimente les récents et les recommandations.
- Liens : « Quitter » → p03 du jeu.

### Schéma de navigation de Play
```
00c ─« Jouer »─► p01 Accueil ─┬─► p02 Genre ─► p03
                  ▲           └─► p03 Fiche ─┬─ jeux similaires ─► p03
                  │ retour Max it             ├─ « Jouer » (mini app, hub avec lien) ─► p05 ─« Quitter »─► p03
                  00c                         ├─ « Jouer » (hub sans lien) ─► p04 ─► p05 (accueil du hub) ─► p03
                                              ├─ « Voir tout » ─► p06 Tous les avis ─► p07 ─► p06
                                              └─ « Donner mon avis » ─► p07 ─« Publier »─► p03
Lien partagé ─► p03 (fermer → p01) ; lien vers un jeu indisponible ─► p01 avec message
```

**Visuels des jeux de Play** : une image par jeu dans `images/play/<id>.jpg`, déclarée dans `PLAY.images` (`js/data-play.js`). Elle sert partout où le jeu apparaît (tuiles, carte « À la une », en-tête et première capture de la fiche, partie simulée), recadrée au centre sans déformation ; les captures 2 et 3 de la galerie et les jeux sans image gardent leur dessin SVG. Pour changer un visuel : remplacer le fichier en gardant son nom (ou ajouter une ligne à `PLAY.images`), puis reconstruire le fichier unique. 9 jeux ont une image : bloc-mania, commando-lagune, foot-lions, ludo-famille, ninja-sahel, rallye-dunes, robots-furie, taxi-brousse, tresor-baobab.

### Avancement de Play
| Lot | Écrans | État |
|---|---|---|
| P1 | `data-play.js`, `play.js`, section « Play » de tokens.css et style.css, 00c (« Jouer »), p01 à p05, menu de démo (pays, nouveau joueur, jeu indisponible, liens partagés), test `outils/parcours-play.html` | terminé |
| P2 | Avis : bloc de la fiche (p03), p06 tous les avis, p07 donner son avis, signalement ; vérifications ajoutées à `outils/parcours-play.html` | terminé |
| P3 | Visuels des jeux en image (`images/play/`) pour 9 jeux, intégrés au fichier unique | terminé |

### Couverture des US MVP de Play
| US | Couverture | Écrans | Limites et remarques |
|---|---|---|---|
| S06-01 | En partie | 00c, p01, p03 | Pays et compte Max it simulés (menu de démo) ; textes en français seulement. |
| S06-02 | Couverte | p01 | Ordre de Figma : Récemment joués avant l'éditorial. |
| S06-03 | Couverte (arbitrage) | p01, p02 | Grille des genres de Figma à la place des rangées par genre. |
| S06-04 | Couverte | p01, p02, p03 | — |
| S07-01 à S07-04 | Couvertes | p03 | Vidéo simulée (30 s), sans fichier. |
| S07-05 | En partie | p03 | Feuille de partage simulée ; ce que voit une personne sans Max it n'est pas maquetté (question ouverte). |
| S08-01 | En partie | p03, p05 | Jeux simulés ; classement et défis des hubs non montrés ; statistiques : back-office. |
| S08-02, S08-03 | Couvertes | p04, p05 | — |
| S08-04 | En partie | toutes | Indisponibilité forcée par le menu de démo, pas par de vrais échecs d'ouverture. |
| S09-01 | En partie | p03, p01 | Favoris mémorisés dans le navigateur, pas sur le compte Max it. |
| S09-02, S09-03 | Couvertes | p01 | — |
| S10-01 | Couverte | p03, p06, p07 | Avis publié tout de suite sous le pseudonyme (choix CLAUDE.md) ; mémorisé dans le navigateur. |
| S10-02 | Couverte | p03, p06 | Commentaires des autres joueurs fictifs ; la répartition des notes est calculée autour de la moyenne. |
| S10-03 | En partie | p03, p06 | Motif et marque « en cours d'examen » ; la modération (S04-01) relève du back-office. |
