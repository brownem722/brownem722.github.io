---
type: Workspace Folder
title: Matthew Browne personal website
aliases: [personal website, Matthew Browne website, GitHub Pages site]
category: personal
description: Next.js personal site deployed to GitHub Pages with a Cloudflare Worker backend and Drizzle database.
---

# Matthew Browne personal website

This repository is the public GitHub Pages site at <https://brownem722.github.io/>.

## Maintenance notes

- The maintained CV, BibTeX bibliography, research-project CSV, and generated PDF live outside this repository in the CV archive. Treat those sources as canonical.
- After a CV change, run `D:\archive\CV\Build-CV.ps1` (regenerates sources and compiles the PDF; `Generate-CV.ps1` alone leaves the PDF stale), then `npm run sync-cv`. This refreshes `data/cv.json` and the public CV PDF.
- Run `npm run sync-rss` when updating the checked-in Decoding the Gurus episode snapshot. GitHub Actions refreshes the RSS data during the scheduled daily build.
- `data/writing.json` holds selected popular articles; `data/appearances.json` is reserved for the later recorded-appearances database.
- When adding a page route, add its URL to `public/sitemap.xml` and give the page a `canonical` in its metadata.
- Before committing site changes, run `npm test` and `npm run lint`. Pushes to `main` deploy through GitHub Pages.

Read `README.md` for the repository overview and update commands.

## Contents

<!-- okf-index:start -->
- [.git](.git/) - Generated, dependency, cache, log, backup, or temporary tree. <!-- okf: no-archive no-backup no-listing reserved -->
- [.github](.github/) - Repository-level GitHub settings, including CI/CD workflow definitions.
- [.openai](.openai/) - Configuration files for OpenAI agent-driven hosting and deployment of matthew-browne-website.
- [.vinext](.vinext/) - Generated, dependency, cache, log, backup, or temporary tree. <!-- okf: no-archive no-backup no-listing reserved -->
- [.wrangler](.wrangler/) - Local Cloudflare Wrangler state for Workers deployment and preview. <!-- okf: no-archive no-backup no-listing -->
- [app](app/) - Next.js app router pages, layouts, and route handlers for the public site.
- [build](build/) - Generated, dependency, cache, log, backup, or temporary tree. <!-- okf: no-archive no-backup no-listing reserved -->
- [data](data/) - JSON data files (CV export, writing, episodes, links) that drive the site content.
- [db](db/) - Local Drizzle SQLite database used during development. <!-- okf: no-archive no-backup -->
- [dist](dist/) - Generated, dependency, cache, log, backup, or temporary tree. <!-- okf: no-archive no-backup no-listing reserved -->
- [drizzle](drizzle/) - Drizzle ORM migration files defining the database schema.
- [examples](examples/) - Example data or usage snippets demonstrating the content model.
- [lib](lib/) - Shared TypeScript utilities and helpers used across the app and worker.
- [node_modules](node_modules/) - Generated, dependency, cache, log, backup, or temporary tree. <!-- okf: no-archive no-backup no-listing reserved -->
- [public](public/) - Static assets served directly, including the public CV PDF and images.
- [scripts](scripts/) - npm script entry points for syncing CV data and refreshing the RSS feed.
- [tests](tests/) - Test suites validating data integrity and site behaviour before deployment.
- [worker](worker/) - Cloudflare Worker code handling server-side routes for the deployed site.
- [.dev-err.log](.dev-err.log) - Captured stderr output from the local development server.
- [.dev-out.log](.dev-out.log) - Captured stdout output from the local development server.
- [.gitignore](.gitignore) - Git ignore rules for build artifacts, logs, and local state.
- [drizzle.config.ts](drizzle.config.ts) - Drizzle ORM configuration pointing at the database URL and migration folder.
- [eslint.config.mjs](eslint.config.mjs) - ESLint flat configuration for linting the project's TypeScript and JavaScript.
- [next.config.ts](next.config.ts) - Next.js build configuration including output and page settings.
- [package-lock.json](package-lock.json) - npm dependency lockfile pinning exact package versions.
- [package.json](package.json) - npm manifest listing project scripts, dependencies, and metadata.
- [postcss.config.mjs](postcss.config.mjs) - PostCSS configuration for CSS processing in the build pipeline.
- [README.md](README.md) - Project overview, content-model description, and update commands.
- [tsconfig.json](tsconfig.json) - TypeScript compiler configuration for the project.
- [vite.config.ts](vite.config.ts) - Vite bundler configuration for build and dev-server behaviour.
<!-- okf-index:end -->
