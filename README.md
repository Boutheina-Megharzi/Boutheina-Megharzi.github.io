# Portfolio · Boutheina Megharzi

Site one-page statique (HTML, CSS, JavaScript sans dépendance) pour la recherche d'un stage de 3 mois en TSSR.

## Arborescence

```
index.html                  tout le contenu du site (8 sections)
css/style.css               toute la mise en forme (couleurs en haut du fichier)
js/main.js                  menu mobile, section active + CONFIG (lien de rendez-vous)
assets/docs/                le CV en PDF (bouton « Télécharger mon CV »)
assets/img/                 photo, favicon, captures de projets
.nojekyll, robots.txt       fichiers utiles pour GitHub Pages
```

## Voir le site sur votre ordinateur

Double-cliquez sur `index.html` : il s'ouvre dans votre navigateur.
Pour un rendu identique à la mise en ligne, depuis le dossier du projet :

```
python -m http.server 8000
```

puis ouvrez http://localhost:8000

## Mettre en ligne sur GitHub Pages (gratuit)

1. Sur GitHub, créez un dépôt public nommé **`Boutheina-Megharzi.github.io`**
   (exactement votre nom d'utilisateur suivi de `.github.io`).
2. Bouton **Add file › Upload files** : glissez **le contenu** du dossier `portfolio`
   (index.html, css, js, assets, .nojekyll, robots.txt), puis **Commit changes**.
3. Onglet **Settings › Pages** : Source = *Deploy from a branch*, Branch = `main`, dossier `/ (root)`, **Save**.
4. Après une à deux minutes, le site est en ligne à l'adresse
   **https://boutheina-megharzi.github.io/**
5. Ajoutez ce lien sur votre CV, votre profil LinkedIn (section « Coordonnées » et « Sélection ») et dans vos candidatures.

Alternative : glisser le dossier sur https://app.netlify.com/drop (en ligne immédiatement).

## Modifier le contenu

| Je veux…                                   | Où                                                        |
|--------------------------------------------|-----------------------------------------------------------|
| Ajouter un lien Calendly / Cal.com         | `js/main.js`, ligne `bookingUrl: ""`                       |
| Remplacer le CV                            | écraser `assets/docs/CV-Boutheina-Megharzi.pdf` (même nom) |
| Changer un texte                           | `index.html`, chaque section est repérée par un commentaire `====` |
| Compléter une fiche projet                 | `index.html`, blocs `<!-- À COMPLÉTER … -->` dans la section Projets |
| Ajouter une capture d'écran                | déposer l'image dans `assets/img/projets/`, décommenter le bloc `<figure class="shot">` |
| Changer une couleur                        | `css/style.css`, variables en haut du fichier             |
| Passer un labo de « en cours » à « terminé » | `index.html`, texte `En cours de réalisation` de la fiche |

## À compléter

- [ ] Lien de prise de rendez-vous (Calendly, Cal.com…) dans `js/main.js`, facultatif
- [ ] Pour chaque labo : difficulté rencontrée et solution, résultat obtenu, une capture d'écran
- [ ] Vérifier que les 3 dépôts GitHub sont publics et ont un README
- [ ] Après mise en ligne : mettre l'adresse réelle dans la balise `<link rel="canonical">` de `index.html`
- [ ] Retirer de la section « Prochains labos envisagés » ceux que vous ne comptez pas faire

Indicateurs à ajouter quand les labos avancent (dans la section Impact) :
nombre de VM déployées, de comptes et groupes créés, de tickets traités dans GLPI, d'incidents simulés et résolus.
Ne publiez un chiffre que s'il est vérifiable dans vos dépôts.
