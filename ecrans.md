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
- Liens : → 06.

### 11 `11-match.html` — Salle de match
- US : S06-02, S06-03
- Éléments : adversaire, heure, compte à rebours, bouton « Je suis présent » (actif de -10 min au début).
- États : attente de l'adversaire ; match démarré ; forfait adverse (qualifié) ; mon forfait (motif et heure) ; deux absents.
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
- États : en attente de l'adversaire ; match clos ; résultat adverse retenu avec « Contester » (30 min) ; délai dépassé.
- Liens : → 15, 12.

### 15 `15-litige.html` — Litige et preuves
- US : S07-03, S07-02
- Éléments : les deux déclarations ; jusqu'à 3 captures ; compte à rebours 30 min ; état « En attente d'arbitrage » puis décision.
- Liens : → 12.

### 17 `17-profil-public.html` — Profil public d'un joueur
- US : S01-02, S05-03
- Éléments : pseudo, tournois joués, résultats ; aucune donnée personnelle.

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
- Liens : → 21, 24, 27, 28.

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
  - paiement refusé, paiement abandonné (22, retour sur l'écran affiché) ;
  - abonnement résilié, abonnement expiré (24) ;
  - pseudo jugé offensant (23).

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
           ├─► 27 Préférences notif
           └─► 28 Mes données
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

Démo des matchs (lot 4) : dans 11, 14 et 15, le temps défile 30 fois plus vite (1 s = 30 s) ; les raccourcis du menu de démo mènent à chaque état.

## Couverture

### US MVP joueur couvertes en partie
| US | Limite dans la maquette |
|---|---|
| S01-01 | Compte suspendu et session expirée simulés via le menu de démo. |
| S01-05 | La reprise elle-même est côté serveur ; seul son résultat est visible (02, 23, 28). |
| S06-01, S06-04 | Automatismes sans écran propre ; leurs effets sont visibles dans 11 et 12 (vainqueur au tour suivant, qualification d'office après double absence). |
| S06-02 | Compte à rebours, présence de -10 min au début, rappel à -5 min, démarrage dès que les deux sont présents (11). La convocation reçue 15 min avant arrive par notification (25). |
| S06-03 | Forfait (motif, heure), victoire par forfait, double absence (11, 12). Le compteur de forfaits est fixe (1 sur 30 jours) ; la suspension après 3 forfaits est montrée en 08. Le forfait en poule (défaite au score de la fiche jeu) n'est pas maquetté. |
| S07-01 | Saisie, correction tant que l'adversaire n'a pas déclaré, match clos par concordance, refus après le délai (14). Ouverture de la déclaration : voir « Décisions ». |
| S07-02 | Déclaration adverse retenue, contestation pendant 30 min, résultat définitif sans contestation (14). Les avis à l'adversaire passent par les notifications (25). Aucune déclaration dans le délai : voir « Décisions ». |
| S07-03 | Litige automatique, 3 captures au plus, délai de 30 min, arbitrage puis décision avec motif (15). Les captures restent sur l'appareil ; la conservation 90 jours est seulement mentionnée. La décision est simulée : avec au moins une capture, la déclaration du joueur l'emporte. |
| S01-02 | Pseudo unique modifiable une fois tous les 30 jours, identifiant de jeu refusé s'il est déjà rattaché, pseudo offensant remplacé (02, 23, raccourci « Pseudo jugé offensant »). Les badges ne sont pas maquettés (fonction non activée). |
| S09-02 | Côté joueur seulement : bouton « Signaler » avec motif, une fois par article (19). Le retrait après 3 signalements, la publication et la règle d'accès par pays relèvent du back-office ; seul leur effet (verrou) est visible. |
| S10-01 | Lecteur simulé sans fichier vidéo : lecture dans l'application, sous-titres, mode « économie de données » (240p), reprise à la seconde près (18). Non maquettés : démarrage en moins de 5 s, fluidité et reprise après une coupure réseau. |
| S10-02 | Vidéo réservée verrouillée avec condition d'accès et offre ; ni téléchargement ni lien externe (18, 20). Le blocage d'une adresse de lecture ouverte hors plateforme est côté serveur. |
| S11-01 | Contenus et tournois réservés visibles avec leur condition d'accès, bandes-annonces libres, page d'offre ouverte seulement par un geste du joueur (03, 06, 18, 19, 20, 21, 23). Le corps d'un article réservé n'est pas inséré dans la page, mais il reste présent dans `js/data.js` (dans le produit, le serveur ne l'enverrait pas). |
| S11-02 | Offres et essai du pays (21), brique de paiement simulée avec offre et montant renseignés, issues confirmé / refusé / abandonné (22). Moyens de paiement et reçus : ceux de Max it, seulement évoqués. |
| S11-03 | Retour exact sur l'écran d'origine (06, 18, 19, 23, 24, 03, 08), déverrouillé après confirmation et bascule en mode abonné ; toujours verrouillé après refus ou abandon (`outils/parcours-abonnement.html`). |
| S11-04 | Offre, échéance, avis de reconduction selon la périodicité, « Mettre fin », états actif / résilié / expiré (24, 23, 03). L'avis lui-même arrive par notification (25) ; l'échec de reconduction est figuré par l'état « expiré ». |
| S08-04 | Côté joueur seulement : décision d'exclusion (motif, durée, conséquences) et contestation transmise au responsable local (26). L'exclusion elle-même relève du back-office. |
| S08-02 | Activation par pays simulée par un indicateur dans `data.js` (ex. masquer les vidéos). |
| S12-02 | Courriels et SMS reçus hors de l'application ; seules les préférences (27) sont maquettées. |
| S03-06 | Le versement sur le numéro Max it n'apparaît que par la notification (25). |
| S03-03 | Acceptation obligatoire et réacceptation d'un règlement modifié maquettées (07). Seule la version acceptée est mémorisée, pas la date. L'avis « désinscrit après refus » arrive par notification (25). |
| S04-01 | Place acquise, liste d'attente avec rang, refus pour pays (08), désinscription avant le début (06). Le passage du premier de la liste d'attente en cas de désistement est côté serveur ; il n'est visible que par notification (25). Pas de refus pour l'âge (S01-03 en suspens). |
| S04-02 | Comme S04-01 ; la réponse en moins de 5 s est figurée par l'affichage immédiat de 08. Le joueur abonné s'inscrit aux tournois réservés comme aux autres. |
| S04-03 | Création, nom unique, ouverte / fermée, demandes, invitation par pseudo, lien, transmission du rôle, départ du capitaine, inscription automatique, équipe incomplète à la clôture (09, 10). Les réponses des autres joueurs sont simulées par des délais ; la réception d'une invitation côté invité et les avis aux membres passent par les notifications (25). |
| S04-04 | Liste des équipes ouvertes, demande acceptée par le capitaine (simulée), une seule équipe par tournoi (09). Non maquettés : le refus d'une demande pour critère non rempli et l'arrivée par le lien d'une équipe fermée. |
| S04-05 | Refus pour compte ou identifiant de jeu déjà inscrit, avec motif et « Contester » vers 26 (08). La consignation du refus et sa consultation par le responsable local relèvent du back-office. |

### US MVP joueur entièrement couvertes, à noter
- S05-04 Classement d'un tournoi (backlog 15 Epics / 71 US) : couverte par l'onglet « Classement » de 12. La correction des E-Sport Orange Points citée dans un critère d'acceptation relève de l'Epic E15 (V2) et n'est pas maquettée.

### US V2 liées, non maquettées
- E15 Leaderboard mensuel (S15-01 à S15-05) : points, leaderboards mensuels ouvert à tous et réservé aux joueurs gratuits.

### Décisions prises pendant la maquette
- 2026-10-07, S07-02 : si aucun joueur ne déclare dans le délai, les deux sont éliminés, comme en double absence ; l'adversaire prévu au tour suivant est qualifié d'office (14, 12 ; raccourci « Aucune déclaration dans le délai »).
- 2026-10-07, S07-01 : la déclaration du résultat est ouverte dès le démarrage du match (et non à la fin prévue) ; elle se ferme 30 min après la fin prévue.
- 2026-10-07 : le match nul est refusé en élimination directe, accepté en poules et en championnat (14).

### US en suspens
- S01-03 Âge du joueur et accès des mineurs : ni refus pour âge, ni consentement parental.

### US MVP hors périmètre (back-office)
S02-01, S03-01, S03-02, S07-04, S08-01, S08-03, S08-05, S09-01, S09-03, et la partie gestion de S09-02.
