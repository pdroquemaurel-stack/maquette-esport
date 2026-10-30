# Plan des écrans — Fan Zone EA FC (4e chantier)

Espace « FAN ZONE EA FC » dans Max it, dédié à la finale du tournoi panafricain EA FC (Tunis, 12 et 13 décembre 2026).
Adaptation de l'ancienne Fan zone de la CAN : même structure, même style, même hiérarchie ; contenus e-sport à la place du football.
Plan validé le 2026-10-30, complété le même jour (retours : temps accéléré, Pass data, logo EA SPORTS FC, services payants,
relais Shop et Play, carrousel des équipes, Grand Tirage console). Données fictives dans `js/data-fanzone.js`, fonctions
communes dans `js/fanzone.js`.

**Charte** (section « Fan Zone » de `css/tokens.css`) : fond noir #0D0D0D, cartes anthracite #1E1E1E (coins de 16 px),
orange Max it en accent, texte blanc et gris clair, halo néon vert #00E37A sur le direct et l'arbre, badge rouge « EN DIRECT ».
**Entrée** : 00c, visuel « Fan Zone EA FC » de la rubrique « Découvrir » → f01. La tuile « Boutique » ouvre toujours le Shop (s01).
**Pays soutenu** : choisi à la première ouverture de f01 (« Quel pays soutiens-tu ? ») et mémorisé ; il fixe le drapeau de l'en-tête,
l'équipe mise en avant, l'entourage orange dans l'arbre et la monnaie du Pass Fan (MAD, TND, EGP, FCFA, CDF).
**Équipes** : 8 pays en quarts de finale (joués en ligne en novembre) ; 4 qualifiés pour les demi-finales à Tunis (Maroc, Tunisie,
Égypte, Côte d'Ivoire), 4 éliminés (Sénégal, Cameroun, Mali, RD Congo). Joueurs et pseudos inventés.
**Heure de la démo** : départ le 7 décembre 2026 à 10h30 (heure du téléphone), puis le temps s'écoule ; le menu de démo l'avance.
**Le Grand Tirage console** : un seul tirage au sort, en direct pendant la finale le 13/12 à 18h (heure de Tunis), 3 consoles à gagner.
Chances : questions du jour (+1 par jour réussi, 7 au plus) et Pass Fan achetés dans la Fan Zone (+1 par achat, 5 au plus).
**Interrupteur gratuit / abonné** : aucun effet dans la Fan Zone.

---

## Écrans

### f01 `f01-accueil.html` — Accueil de la Fan Zone
- En-tête : retour vers Max it (00c), « FanZone Orange » (« Orange » en orange).
- Sous le titre : logo EA SPORTS FC (image fournie, en blanc) et « Orange eSport » à gauche, avatar du supporter au centre
  (cercle orange ; sans avatar : « + » et « Crée ton avatar ») avec le drapeau du pays soutenu, logo Orange « est là » à droite.
- Carte stream 16:9. Avant le live : « Finale EA FC – Tunis – 12 & 13 décembre », compte à rebours (jours, heures, min, sec)
  jusqu'au 12/12/2026 à 14h heure de Tunis, heure de début affichée à l'heure locale, « Me rappeler le début du live » (toast
  « Rappel activé », à nouveau pour désactiver). À zéro, la carte bascule seule en direct (toast « Le live commence ! »).
  En direct : badge « EN DIRECT », « Finale EA FC – Jour 1 », « Émission live avec les streamers », bouton « Regarder » → f02.
- Tuiles « Pass data » (« Regarde le live sans compter ») → f05 et « Jouer & Gagner » (questions du jour) → f04.
- Bloc « Mes chances » au Grand Tirage console : total, détail (questions du jour, Pass Fan), compte à rebours du tirage → f13.
- Icônes Équipes → f08, Arbre → f10, Galerie → f11, Services → f12.
- « Les équipes » : carrousel de portraits au doigt (équipe soutenue d'abord) → f09 ; « Voir tout » → f08.
- « À ne pas manquer » : cartes cadeaux gaming (Shop s01 ; pastilles PlayStation, Xbox, PUBG, Free Fire, Roblox → s03 du jeu,
  retour vers f01) ; Play, les mini-jeux Max it → p01.
- Carrousel de 4 bannières orange (toutes les 4 s, points de pagination) : avatar → f03, Pass Fan → f05, questions du jour → f04,
  mini-jeux → p01.
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

### f04 `f04-quiz.html` — Jouer & Gagner : questions du jour
- Du 5 au 11 décembre, 3 nouvelles questions chaque jour à 10h (EA FC, e-sport, équipes), 3 ou 4 réponses, 2 tentatives par jour
  (questions dans un autre ordre à la 2e).
- Compteur « Tu as N chances au Grand Tirage » et calendrier des 7 jours : chance gagnée, manqué, aujourd'hui, à venir.
- Barre de progression, correction immédiate. Au moins 2 bonnes réponses : « +1 chance au Grand Tirage ! » et un code EA FC
  Mobile en bonus (code masqué, « Révéler mon code »), dans la limite des lots du jour et de 2 codes par utilisateur.
  Moins de 2 : « Retenter » s'il reste une tentative, sinon « Reviens demain ».
- Déjà gagné aujourd'hui, plus de tentative, avant 10h, avant le 5 ou après le 11 décembre : message adapté. Pas de rattrapage.

### f05 `f05-bundle.html` — Pass data
- 3 forfaits, prix en monnaie locale : Pass Fan 1 Go (1 jour) ; Pass Fan EA FC 2 Go (7 jours, « Le plus choisi ») et 5 Go
  (30 jours), chacun avec 1 code EA FC Mobile et +1 chance au Grand Tirage. « Acheter » → f06?offre=….
- Plafonds atteints (2 codes, 5 chances par les achats) : encarts ; les pass restent achetables.
- Mentions ; liens « Mes chances au Grand Tirage » → f13 et « Mes codes » → f07.

### f06 `f06-achat.html?offre=…` — Achat d'une offre
- Forfait (f05) ou service (f12) : récapitulatif (data, code, chance ; ou contenu et durée), Orange Money ou crédit,
  « Confirmer et payer », paiement simulé (1,5 s).
- Pass Fan : « Achat confirmé, ton code est disponible dans Mes codes », +1 chance (ou plafond), date de fin ; « Voir mes codes »,
  « Mes chances au Grand Tirage ». Service : message propre (live HD débloqué, fond d'écran et sonnerie disponibles).
- Retour → f05 ou f12 ; offre inconnue : Pass Fan EA FC.

### f07 `f07-mes-codes.html` — Mes codes
- Codes gagnés au quiz ou reçus avec le pass : origine, date, code masqué → « Révéler », puis « Copier ». Mode d'emploi du code.
- Sans code : liens vers le quiz (f04) et le Pass Fan (f05).

### f08 `f08-equipes.html` — Équipes
- Carrousel des 8 pays, qui défile seul toutes les 4 s et au doigt (le toucher arrête le défilement), points de pagination.
  Chaque carte : photo de l'équipe (portrait dessiné aux couleurs du pays tant qu'il n'y a pas de photo), drapeau, pays, pseudo,
  joueur, « Qualifié » ou « Éliminé ». Équipe du pays soutenu en premier, entourée d'orange (« Ton équipe »). Carte → f09.
- Dessous : « Toutes les équipes », liste compacte → f09.

### f09 `f09-equipe.html?pays=…` — Fiche d'une équipe
- Photo (emplacement aux couleurs du pays), statut, joueur, pseudo, parcours en qualification. « Voir l'arbre » → f10.

### f10 `f10-arbre.html` — Arbre
- Défile horizontalement : quarts (scores) → demi-finales (12 déc.) → finale (13 déc.). Vainqueurs en surbrillance néon,
  pays soutenu entouré d'orange. En direct : demi-finale 1 Maroc – Tunisie en cours (1-1), « Regarder le live » → f02.
- Ligne d'un pays → f09.

### f11 `f11-galerie.html` — Galerie
- 9 vignettes colorées (couleurs du pays, orange pour l'organisation) avec légendes ; vue agrandie avec précédente / suivante.

### f12 `f12-services.html` — Services
- Pass Live HD (le live en HD sans consommer sa data, multi-caméra, 1 jour) et Pack Supporter (fond d'écran et sonnerie aux
  couleurs du pays) → f06?offre=…, prix en monnaie locale.
- Abonnement e-sport Max it → page d'offre de l'e-sport (21), dont le retour ramène ici.
- « Aussi dans Max it » : Pass data → f05, cartes cadeaux gaming → s01.

### f13 `f13-tirage.html` — Le Grand Tirage console
- Lots (3 consoles de jeu), date et heure du tirage à l'heure locale.
- Bloc « Mes chances » : total, détail par source (questions du jour x/7, Pass Fan x/5), compte à rebours jusqu'au tirage.
  Au moment du tirage : « EN DIRECT », « Regarder le tirage » → f02.
- « Gagne plus de chances » : questions du jour → f04, Pass Fan → f05. Règlement en bref.

## Menu de démo — Fan Zone EA FC
- « État de la page : Avant le live / En direct » : remet l'heure au 7 décembre 10h30, ou la place 1 h après le début du live.
- « Avancer le temps : le live dans 10 s » : f01, le compte à rebours arrive à zéro et la carte bascule en direct.
- « Questions du jour : jour suivant, 10h30 » : f01 avec la notification Max it « La question du jour est en ligne » (→ f04).
- « Grand Tirage dans 10 s » : f13, le tirage passe en direct.
- « Rejouer le choix du pays » : ouvre f01 avec la fenêtre « Quel pays soutiens-tu ? ».
- « Nouveau supporter » : f01 sans pays, ni avatar, ni codes, ni chances, ni rappel ; heure remise au 7 décembre.
