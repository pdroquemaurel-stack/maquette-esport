# Plan des écrans — Shop, la boutique de jeux de Max it (3e chantier)

Source : `reference/backlog-shop.html`, Epics « Parcours du client » (E05 à E10) et S02-04. Plan validé le 2026-10-09.
Le back-office (E01 à E04, E11, E12) est simulé dans `js/data-shop.js` ; les fonctions communes sont dans `js/shop.js`.
Pas de maquette Figma (`reference/figma-shop/` absent) : composants Max it et e-sport, thème clair, couleurs de `css/tokens.css`.

**Mini app** : en-tête avec retour, titre, « Mes achats » (s08) et aide (s11) ; pas de barre du bas.
**Entrées** : 00c (tuile « Boutique » et visuel « Les meilleurs jeux au meilleur prix ») → s01 ; page d'un jeu de l'e-sport (13), « Ouvrir la boutique Max it » → s03 du jeu ; lien direct (menu de démo) → s03 ou s04.
**Catalogue** : 8 jeux (Free Fire, PUBG Mobile, eFootball de l'e-sport ; Mobile Legends, Roblox, Clash of Clans, Genshin Impact, Asphalt Legends), 3 à 6 produits par jeu, prix en MAD TTC, quelques promotions (prix barré) et produits épuisés. Call of Duty: Mobile n'est pas vendu : sa page e-sport (13) n'a pas de lien boutique.
**Interrupteur gratuit / abonné** : aucun effet dans le Shop (décision du 2026-10-09).

---

## Écrans

### s01 `s01-accueil.html` — Accueil du Shop
- US : S05-01, S06-01, S06-02, S06-06 (accès).
- Éléments : en-tête (retour vers Max it) ; champ « Rechercher un jeu » ; bannières du pays ; « Tes derniers achats » (masqué au premier achat) ; « À la une » (jeux mis en avant, dans l'ordre défini) ; « Populaires au Maroc » (tous les jeux, par ventes, avec le prix le plus bas). Avec `?absent=1` : message « Ce jeu n'est pas vendu dans le Shop ».
- Liens : retour → 00c ; recherche → s02 ; bannières → s04 (produit en promo) ou s03 ; tuiles et cartes → s03 ; Mes achats → s08 ; aide → s11.

### s02 `s02-recherche.html?q=…&tag=…` — Recherche et filtres
- US : S06-06.
- Éléments : champ de saisie (clavier ouvert), bouton « Effacer » ; puces de filtre : Tous, tags des produits (Top-up, Voucher, Pass, Promo) et des jeux (Battle royale, MOBA, Football, Stratégie, Aventure, Course, Création) ; nombre de résultats ; liste des jeux trouvés. Recherche tolérante : accents, espaces, fautes de frappe (« frifire », « asfalt », « jenshin »), noms courts (« mlbb », « coc », « pes »). Sans résultat : « Aucun jeu trouvé » et « Voir tous les jeux ».
- Liens : résultats → s03 (le retour retrouve la même recherche) ; retour → page d'origine (s01).

### s03 `s03-jeu.html?jeu=…&depuis=…` — Page d'un jeu
- US : S06-03, S02-04, S06-01 (lien direct `via=lien`).
- Éléments : visuel du jeu (images de l'e-sport, sinon dégradé et pictogramme) ; nom, éditeur, tags ; encart sur l'identifiant : compte vérifié avant paiement, identifiant à saisir deux fois, ou livraison par code ; « Produits » : une seule liste dans l'ordre défini, chaque produit marqué « Top-up · crédit direct » ou « Voucher · code à saisir », un pass avec sa durée ; prix TTC, prix barré et « Promo −x % » ; produit épuisé grisé, sans lien ; « Où trouver mon identifiant ? ». Jeu inconnu ou non vendu → s01 avec message.
- Liens : produit → s04 ; retour → page d'origine (s01, s02, 13…), ou 00c pour un lien direct ; aide → s11.

### s04 `s04-produit.html?produit=…&depuis=…` — Fiche produit
- US : S06-05, S02-04, S06-07 (étape suivante), S06-01 (lien direct).
- Éléments : jeu et éditeur ; nom ; badges (Top-up ou Voucher, durée du pass, promo, épuisé) ; prix TTC en MAD, prix barré ; contenu ; livraison (crédit direct et identifiant demandé ensuite, ou code affiché, envoyé par SMS et retrouvé dans « Mes achats », avec les instructions d'activation) ; conditions (validité et reconduction d'un pass, date limite d'un code, pays, pas de remboursement une fois livré, lien vers les conditions de vente) ; bouton « Acheter · prix », inactif « Épuisé » sinon.
- Liens : « Acheter » → s05 (top-up, pass crédité) ou s06 (code) ; jeu → s03 ; retour → page d'origine, ou 00c pour un lien direct ; conditions → s12.

### s05 `s05-compte-jeu.html?produit=…` — Compte de jeu (lot S2)
- US : S05-02, S05-03, S05-04.
- Éléments : comptes mémorisés avec libellé (« Mon compte », « Mon frère ») et « Supprimer » ; ajout d'un compte : identifiant au format contrôlé (message explicite), libellé ; vérification avec pseudo affiché, ou avertissement et double saisie ; identifiant introuvable refusé.
- Liens : « Où trouver mon identifiant ? » → s11 ; Continuer → s06.

### s06 `s06-recapitulatif.html?produit=…` — Récapitulatif (lot S2)
- US : S06-07, S07-01, S06-08, S02-04, S06-11.
- Éléments : jeu, produit, compte de jeu et pseudo (destinataire clairement affiché pour un proche), prix ; choix Orange Money ou crédit / facture mobile (DCB), Orange Money seul au-delà du plafond DCB ; acceptation des conditions de vente au premier achat ou après une nouvelle version ; « Payer » bloqué tant qu'un paiement précédent est en vérification ; état « Produit épuisé pendant l'achat ».
- Liens : conditions → s12 ; Payer → 22 (mode Shop) ; retour → s04 ou s05.

### 22 `22-paiement-maxit.html?commande=…` — Brique de paiement Max it, mode Shop (lot S2)
- US : S07-02, S07-03.
- Éléments : marchand « Max it Shop », montant ; Orange Money (code secret) ou DCB (confirmation) ; solde Orange Money insuffisant : montant manquant et « Payer par crédit mobile » ; solde DCB insuffisant : message clair. Le mode e-sport de l'écran 22 ne change pas.
- Liens : → s07 ; refus → s06.

### s07 `s07-confirmation.html?commande=…` — Confirmation et livraison (lot S2)
- US : S06-10, S06-11, S08-01, S08-02, S09-01, S09-02.
- Éléments : paiement en cours, livraison en cours, livré ; voucher : code unique, expiration, instructions, lien d'activation, « Copier » ; top-up : montant crédité ; pass : date de fin et reconduction ; « Code envoyé par SMS » si activé ; refusé ; livraison échouée puis remboursement engagé ; « Vérification en cours » et lien vers la commande.
- Liens : Voir ma commande → s09 ; Retour au Shop → s01 ; Retour au jeu → s03.

### s08 `s08-achats.html` — Mes achats (lot S3)
- US : S10-01.
- Éléments : commandes de la plus récente à la plus ancienne, statut simple (Livré, En cours, Remboursé, Échec) ; aucun achat : message et lien vers l'accueil.
- Liens : commande → s09 ; retour.

### s09 `s09-commande.html?id=…` — Détail d'une commande (lot S3)
- US : S10-02, S06-10, S09-02, S09-04.
- Éléments : référence, date, produit, compte de jeu, moyen de paiement, montant ; code et instructions avec « Copier », ou statut de livraison ; pass : date de fin, reconduction, bandeau « Expire dans 3 jours » et « Me réabonner » ; date du remboursement.
- Liens : Signaler un problème → s10 ; Me réabonner → s04 ; aide → s11 ; retour → s08.

### s10 `s10-signaler.html?commande=…` — Signaler un problème (lot S3)
- US : S10-04.
- Éléments : commande rattachée (résumé), motif (non reçu, code invalide, mauvais compte, autre), commentaire facultatif, puis « Réclamation n° … enregistrée ».
- Liens : retour à la commande → s09.

### s11 `s11-aide.html` — Aide (lot S3)
- US : S10-05, S05-02.
- Éléments : questions fréquentes dépliables ; « Où trouver mon identifiant ? » renvoie à l'aide de chaque jeu (`#jeu-…`).
- Liens : conditions → s12 ; Mes achats → s08 ; retour.

### s12 `s12-conditions.html` — Conditions de vente (lot S2)
- US : S06-08.
- Éléments : texte du pays, version et date, clause de non-remboursement.
- Liens : retour vers l'écran d'origine (s06, s04 ou s11).

### Notifications Max it simulées (lot S3)
- US : S08-03, S09-04.
- Bannière de notification déclenchée par le menu de démo, aussi hors du Shop (00c) : « Ton crédit est arrivé » → s09 ; « Ton pass expire dans 3 jours » → s04 ; « Pass renouvelé » → s09.

---

## Modifications hors Shop

- **00c** : la tuile « Boutique » et le visuel « Les meilleurs jeux au meilleur prix » ouvrent s01. « Jouer » et « E-sport » ne changent pas.
- **13** : la section « Boutique Max it » affiche les 3 premiers produits achetables du Shop et ouvre s03 du jeu (le retour ramène sur 13). Absente pour Call of Duty: Mobile, qui n'est pas vendu. Les offres de `js/data.js` (`boutique`) sont supprimées : les prix viennent du seul `js/data-shop.js`.
- **22** (lot S2) : mode Shop, sans changer le mode e-sport.
- **css/style.css** : section « Shop » ; la règle de texte de la carte « à la une » de Play est limitée à Play (elle déplaçait aussi le texte des cartes « à la une » de l'accueil e-sport, 03).

## Menu de démonstration — groupe « Shop »

| Réglage | Lot | Effet |
|---|---|---|
| Premier achat | S1 (S2 : conditions) | Aucun achat : pas de « Tes derniers achats » ; au lot S2, conditions de vente à accepter. |
| Lien direct vers un jeu | S1 | s03 Genshin Impact ; le retour ramène dans Max it. |
| Lien direct vers un produit | S1 | s04 Pass Gameloft illimité ; le retour ramène dans Max it. |
| Lien vers un jeu non vendu | S1 | s01 avec « Ce jeu n'est pas vendu dans le Shop ». |
| Conditions de vente modifiées | S2 | Nouvelle version à accepter. |
| Identifiant de jeu introuvable | S2 | Refus en s05. |
| Solde Orange Money insuffisant | S2 | Montant manquant en 22. |
| Montant hors plafond DCB | S2 | Orange Money seul en s06. |
| Paiement sans réponse | S2 | « Vérification en cours » en s07. |
| Produit épuisé pendant l'achat | S2 | Message en s06. |
| Livraison en échec puis remboursement | S2 | s07 puis s09. |
| Pass qui expire dans 3 jours | S3 | Notification → s04. |
| Envoi du code par SMS | S3 | Mention « Code envoyé par SMS » en s07 et s09. |

## Schéma de navigation

```
00c ──Boutique / visuel « meilleurs jeux »──► s01 Accueil
13 ──Ouvrir la boutique Max it──► s03 (retour → 13)
Lien direct (démo) ──► s03 ou s04 (retour → 00c)

s01 ─┬─ recherche ─► s02 ──┐
     ├─ bannière / jeu ────┴─► s03 Jeu ──► s04 Produit
     │                                       │
     │                     top-up / pass crédité │ voucher / pass par code
     │                                       ▼          │
     │                                 s05 Compte jeu   │
     │                                       ▼          ▼
     │                                 s06 Récapitulatif ──► s12 Conditions
     │                                       ▼
     │                                 22 Paiement (OM / DCB)
     │                                  │ refusé → s06
     │                                  ▼
     │                                 s07 Confirmation ──► s09
     ├─ Mes achats ─► s08 ─► s09 Commande ─┬─► s10 Signaler ─► s09
     │                                     └─► s04 (Me réabonner)
     └─ Aide ─► s11 ─► s12 / s08
Notification Max it (démo) ─► s09 (livraison, renouvellement) ou s04 (échéance)
```

## Avancement

| Lot | Écrans | État |
|---|---|---|
| S1 | `js/data-shop.js`, `js/shop.js`, section « Shop » de style.css, s01 à s04, 00c, 13, groupe « Shop » du menu de démo (premier achat, liens directs), page de contrôle, fichier unique | terminé |
| S2 | s05, s06, mode Shop de 22, s07, s12 ; états de démo du tunnel | à faire |
| S3 | s08 à s11, notifications Max it simulées, états de démo restants | à faire |

Dans le lot S1, les liens vers des écrans des lots suivants (Acheter, Mes achats, aide, conditions) affichent « … : arrive au prochain lot ».

## Couverture des US

| US | Couverture | Écrans | Limites et remarques |
|---|---|---|---|
| S02-04 | En partie (S1) | s03, s04 | Produits « Épuisé » affichés, non achetables (choix du 2026-10-09). Réservation au paiement : lot S2 (« Produit épuisé pendant l'achat »). |
| S05-01 | Couverte | s01 | Aucun identifiant à saisir ; pays et numéro simulés. |
| S05-02, S05-03, S05-04 | À venir (S2) | s05 | Formats et aide déjà dans `js/data-shop.js` ; encart sur s03. |
| S06-01 | Couverte | 00c, 13, s01, s03, s04 | Lien direct simulé par le menu de démo. |
| S06-02 | Couverte | s01 | — |
| S06-03 | Couverte | s03 | — |
| S06-05 | Couverte | s04 | — |
| S06-06 | Couverte | s02 | Recherche sur le nom et les noms courts ; tolérance de 1 faute dès 4 lettres, 2 dès 5. |
| S06-07 | En partie (S1) | s04 | Bifurcation top-up / code en place ; suite du tunnel au lot S2. |
| S06-08, S06-10, S06-11, E07, E08, S09-01, S09-02 | À venir (S2) | s06, 22, s07, s12 | — |
| S09-04, E10 | À venir (S3) | s08 à s11 | — |

### US non maquettées
- V2 (CLAUDE.md) : S06-04, S06-09, S06-12, S10-03.
- S09-03 (lien code, commande, joueur) : réservée aux responsables, back-office.
- S03-06 (langues) : textes en français seulement.
