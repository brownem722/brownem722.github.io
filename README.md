# Matthew Browne — personal website

The public website for Matthew Browne, generated from the maintained CV and bibliography in `D:\archive\CV`.

## Content model

- `data/cv.json` is the current public export of the CV, bibliography, and research project record.
- `data/writing.json` contains selected popular articles and other public writing.
- `data/appearances.json` is reserved for podcasts, interviews, talks, and other recorded appearances.
- `data/links.json` is reserved for the public link directory.
- `data/episodes.json` is a checked-in snapshot of the Decoding the Gurus RSS feed.

The full CV remains authoritative outside this public repository. The sync script intentionally exports only approved public fields; it does not publish phone numbers or the full contact line.

## Update the site after a CV change

From this project directory:

```powershell
npm run sync-cv
npm run sync-rss
npm test
git add data/cv.json
git commit -m "Sync website from CV"
git push
```

`sync-cv` reads `D:\archive\CV\Matthew_Browne_CV.md` and `D:\archive\CV\my_citations.bib`. Set `CV_ROOT` if the CV archive is stored elsewhere.

## Development

```powershell
npm install
npm run dev
npm test
npm run lint
```

The site contains a compact biography/CV page, searchable academic publications and research projects, selected popular articles, and Decoding the Gurus episodes. The episode feed is refreshed by the scheduled GitHub Pages build. The appearances database can be added later without changing the CV structure.

The public site is deployed from the static export in `dist/client` by GitHub Pages. The repository's `main` branch is the source; the generated public data in `data/cv.json` is refreshed locally from the maintained CV before it is committed.
