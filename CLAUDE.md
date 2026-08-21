# ut01.github.io

UT Austin student portal (Jekyll site). Links live in `_data/links.yml`; guides are standalone pages in `guides/`.

## Guide Principles

- Guides are standalone HTML pages in `guides/`, each self-contained: own `<style>` block plus `../style.css`, front matter `layout: none`.
- Bilingual throughout: English first, Chinese in parentheses or paired lines. Titles follow `UT X Guide - X指南` pattern.
- Not an official UT document. Every guide opens with a disclaimer block linking the official UT pages to verify against.
- Disclaimer date format is `(as of YYYYMM)` with the real current date, e.g. a guide updated in August 2026 uses `(as of 202608)`.
- Every guide ends with:
  1. A `.source-attribution` footer listing content sources and dates in unified bilingual format, always using the real current time at edit: `内容来源: ... | 更新时间: YYYY年M月` / `Sources: ... | Last Updated: Month YYYY`
  2. A `← Back to Navigation` link to `/`
- New guides must be registered in `_data/links.yml` under the appropriate section, with bilingual `keywords` so the find-in-page search works.
- Images go in `assets/`, referenced relatively from the guide.

## Conventions

- Guide footers use a unified date format: `更新时间: YYYY年M月` + `Last Updated: Month YYYY`, and disclaimers use `(as of YYYYMM)`. Dates must always reflect the real current time when a guide is edited, never hardcoded.
- Site is deployed via GitHub Pages from `main` (protected branch; direct pushes bypass rules).

## Local Preview

### Option 1: Simple HTTP Server (limited)
```bash
python3 -m http.server 8000
# Visit http://localhost:8000
# Note: Jekyll templating won't work, only static HTML/CSS/JS
```

### Option 2: Jekyll Local Setup
```bash
bundle install
bundle exec jekyll serve --port 4000
# Visit http://localhost:4000
```

### Option 3: VS Code Live Server
- Install Live Server extension in VS Code
- Right-click index.html -> "Open with Live Server"
- Note: Jekyll templating won't work
