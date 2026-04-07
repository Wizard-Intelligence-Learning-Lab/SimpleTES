# SimpleTES Pages App

This directory contains the GitHub Pages frontend source.

## Local development

```bash
npm ci
npm run dev
```

## Production build

```bash
npm run build:pages
```

The build output is written to `site-app/dist/` and is treated as a CI artifact. It should not be edited manually.

## Deployment model

- Source code lives in `site-app/`
- GitHub Actions builds the app on push to `main` or `github_pages`
- MkDocs builds the markdown docs into `site/`
- `scripts/merge-pages-artifact.mjs` replaces the published root `index.html` with the app build and merges its assets into the final Pages artifact
- `vite.config.ts` computes the correct base path for project Pages deployments

## One-time GitHub setting

In the repository Pages settings, set the source to `GitHub Actions`.
