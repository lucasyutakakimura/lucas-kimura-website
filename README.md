# Lucas Y. Kimura — Research Website

Bilingual personal research website for **Lucas Yutaka Kimura**, focused on coral reef ecology, underwater bioacoustics, reef fishes and global change.

## Main navigation

**Home · Publication · Presentation · Fieldwork · About · Contact**

The `日本語 / EN` button switches the entire site between English and Japanese and keeps the selected language while navigating.

## Designed for easy GitHub updates

Routine academic updates are stored in five human-editable files:

- `content/publications.js`
- `content/presentations.js`
- `content/news.js`
- `content/fieldwork.js`
- `content/profile.js`

This means a new paper can update both **Publication** and **Home** without editing either HTML page. A featured presentation updates both **Presentation** and **Home**. Fieldwork and profile information work the same way.

See **[EDITING_GUIDE_JA.md](EDITING_GUIDE_JA.md)** (日本語) or **[EDITING_GUIDE.md](EDITING_GUIDE.md)** (English) for step-by-step instructions.

## Automatic quality check

Every push / pull request runs:

```bash
npm run check
```

The validator checks required content fields and verifies that referenced local images/pages exist.

## Automatic deployment with GitHub Pages

`.github/workflows/pages.yml` deploys the website whenever `main` is updated.

Initial GitHub setup:

1. Create a new repository, e.g. `lucas-kimura-website`.
2. Upload/push this folder to the repository.
3. In **Settings → Pages**, choose **GitHub Actions** as the source if GitHub has not selected it automatically.
4. Push to `main`.
5. Open **Actions → Deploy website to GitHub Pages** to see the deployment URL.

For an independent personal domain later, add the domain under **Settings → Pages → Custom domain**, then update `sitemap.xml` and `robots.txt` from the placeholder domain to the final domain.

## Local preview

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Repository structure

```text
.
├── index.html
├── publications.html
├── presentation.html
├── fieldwork.html
├── about.html
├── contact.html
├── content/                  # routine updates happen here
│   ├── publications.js
│   ├── presentations.js
│   ├── news.js
│   ├── fieldwork.js
│   └── profile.js
├── assets/
│   ├── css/styles.css
│   ├── js/
│   ├── images/
│   ├── publications/
│   └── talks/
├── scripts/validate-content.mjs
└── .github/workflows/
    ├── check.yml
    └── pages.yml
```

## Before final public launch

Replace placeholder / cover-style SVG artwork with original field photographs and publication visuals that you have permission to publish. `ASSET_CHECKLIST.md` contains the image checklist.
