# Dr Satwinder Singh — Portfolio 

A zero-build, single-page React site for your academic portfolio. Uses React + Tailwind via CDNs so you can deploy by simply uploading these files.

## Quick Start (GitHub Pages)

1. Create a new public repo, e.g. `satwinder-portfolio`.
2. Upload all files from this folder (keep the same structure).
3. In the repo: **Settings → Pages → Source: Deploy from a branch**, select `main` (or `master`) and `/ (root)`.
4. Your site will be live shortly at `https://<your-username>.github.io/<repo-name>/`.

> If your repo name is **`<your-username>.github.io`**, Pages will deploy to the root domain automatically.

## Local Preview

Double-click `index.html` to open in your browser. (Some browser extensions block `localStorage` for file URLs; if needed, host locally with a simple server: `python3 -m http.server` and visit `http://localhost:8000/`).

## Customize

- Replace `assets/cv.pdf` with your latest CV file.
- Edit the seed content in `app.js` (`seedData` object).
- Use the **Edit Mode** button on the site to add News or Publications; data persists to `localStorage`.
- Use **Export/Import** in the top bar to move data between machines.

## Notes

- Tailwind and React are loaded from CDNs; ensure visitors have internet access.
- No build step. No router. Anchor links only, so Pages doesn't need SPA fallback.
- If you later want Markdown posts or a CMS (Notion/Sheets), you can integrate a small API or static JSON—happy to help.
