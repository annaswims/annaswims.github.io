# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Deployment

This is a static site deployed to GitHub Pages. Pushing to `master` automatically triggers deployment via `.github/workflows/static.yml`. There is no build step — files are served as-is from the repository root.

To preview locally, use any static file server, e.g.:
```
python3 -m http.server
```

## Project Structure

- `index.html` — root landing page (currently minimal/placeholder)
- `pages/font-preview.html` — main interactive app: a font browser for MakerWorld fonts
- `pages/fonts.json` — font metadata (3.5MB, sourced from MakerWorld's OpenSCAD font list)
- `pages/magic-window-images/` — assets for a physical craft project (a rotating paper volvelle/wheel)
- `pages/writeup notes.md` — notes for a planned writeup on the volvelle project

## Font Preview App Architecture

`pages/font-preview.html` is a self-contained single-file app (HTML + inline CSS + inline JS). It:

1. Loads `fonts.json` on startup via `fetch('./fonts.json')`, reading `familyMetadataList`
2. Classifies each font into categories (`sans`, `serif`, `display`, `mono`, `hand`) based on `category` and `classifications` fields
3. Lazy-loads fonts from Google Fonts API as cards are rendered (one `<link>` per family, deduplicated via a `Set`)
4. Filters the font list client-side by category, weight, script subset, and text search
5. Re-renders the card grid on any filter change; search input is debounced 200ms

**Font data shape** (after mapping from raw JSON):
- `f` — family name
- `c` — category string
- `cl` — classifications array
- `w` — available weights (array of strings, italic weights end with `'i'`)
- `s` — supported subsets (e.g. `"latin"`, `"cyrillic"`, etc.)
- `_cat` — computed category key used for filtering

Filter state is held in module-level variables (`activeCat`, `activeWeight`, `activeSubset`, `search`). The `render()` function rebuilds the entire grid from scratch on each call.
