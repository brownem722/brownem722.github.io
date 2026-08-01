---
type: Workspace Folder
title: Matthew Browne personal website
aliases: [personal website, Matthew Browne website, GitHub Pages site]
category: personal
---

# Matthew Browne personal website

This repository is the public GitHub Pages site at <https://brownem722.github.io/>.

## Maintenance notes

- The maintained CV, BibTeX bibliography, research-project CSV, and generated PDF live outside this repository in the CV archive. Treat those sources as canonical.
- After a CV change, run `D:\archive\CV\Generate-CV.ps1`, then `npm run sync-cv`. This refreshes `data/cv.json` and the public CV PDF.
- Run `npm run sync-rss` when updating the checked-in Decoding the Gurus episode snapshot. GitHub Actions refreshes the RSS data during the scheduled daily build.
- `data/writing.json` holds selected popular articles; `data/appearances.json` is reserved for the later recorded-appearances database.
- Before committing site changes, run `npm test` and `npm run lint`. Pushes to `main` deploy through GitHub Pages.

Read `README.md` for the repository overview and update commands.
