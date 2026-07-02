# Gowtham Sai G — portfolio

A hand-built personal site with an **editorial "dossier"** design: a fixed left
masthead (the name sits like a book cover), a hairline-ruled content stream, and
metadata set in the margin like a fine printed journal. A literary serif
(Newsreader) over a **midnight-ink** dark theme (deep navy-black, luminous
periwinkle accent) and a **cool porcelain** light theme (graphite ink,
ultramarine accent). Dark is the default.

Three files — `index.html`, `styles.css`, `main.js` — plus a résumé PDF. No
build step, no framework. Light + dark themes.

## Run locally

```bash
python3 -m http.server 8777    # then open http://localhost:8777
```

Or just double-click `index.html`.

## Deploy (pick one)

- **GitHub Pages** — push to a repo → Settings → Pages → deploy from `main` / root.
- **Netlify / Vercel / Cloudflare Pages** — drag-and-drop this folder. No build
  command; publish directory = `.`.
- **Any host** — upload the files to the web root.

Custom domain (e.g. `gowtham.dev`): add a `CNAME` file with the domain and point
DNS at your host.

## Editing

Everything is plain and commented:

- **Content** — `index.html`. Sections are labelled (`Lede`, `Work`, `Projects`,
  `Leadership`, `Education`, `Toolkit`, `Contact`). Each entry has an
  `entry__margin` (the note in the left margin) and an `entry__main` (title, lead,
  notes).
- **Contact / links** — the `#contact` section and the hero links. Update email /
  GitHub / LinkedIn in one place.
- **Résumé** — replace `Gowtham-Sai-G.pdf` (keep the filename, or update the
  `data-resume` link in the masthead).
- **Colors** — `styles.css`, the `:root` / `[data-theme="dark"]` blocks. Change
  `--accent` to reskin; adjust `--bg` / `--text` for the palette.
- **Typeface** — the `<link>` to Newsreader in `index.html` and `--serif` in the
  CSS. Swap for any Google font (or drop the link to fall back to system serifs).

## Notes

- `t` toggles light / dark (choice is remembered).
- Respects `prefers-reduced-motion` (disables the scroll reveals).
- Accessible: skip link, focus rings, semantic landmarks, ARIA labels, scroll-spy
  on the index.
- The only external request is the Google font; everything else is local. Remove
  the font `<link>` for a fully self-contained, offline site.
