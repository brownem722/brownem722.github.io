import Link from "next/link";
import { academicPublications, cv, episodes, writing } from "../lib/site-data";
import QuoteCycle from "./quote-cycle";

const funding = cv.summary.find((item) => item.label.toLowerCase() === "research funding") ?? { label: "Research funding", value: "" };
const firstAuthorPattern = /^Browne,\s*M\./i;
const featuredPublications = [...academicPublications]
  .sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || Number(firstAuthorPattern.test(b.authors)) - Number(firstAuthorPattern.test(a.authors)) || a.title.localeCompare(b.title))
  .slice(0, 6);
const featuredProjects = [...cv.projects].sort((a, b) => b.year - a.year || a.title.localeCompare(b.title)).slice(0, 6);
const featuredEpisodes = episodes.slice(0, 5);

function episodeDate(value: string) {
  return new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(value));
}

export default function Home() {
  return (
    <main>
      <header className="site-header shell">
        <Link className="wordmark" href="/">Matthew Browne</Link>
        <nav aria-label="Main navigation">
          <a href="/Matthew_Browne_CV.pdf">CV</a>
          <Link href="/publications">Publications</Link>
          <Link href="/projects">Projects</Link>
          <Link href="#contact">Contact</Link>
        </nav>
      </header>

      <section className="intro shell">
        <div className="intro-copy">
          <p className="eyebrow">{cv.currentPosition} · {cv.institution}</p>
          <h1>{cv.name}</h1>
          <p className="lede">{cv.profile}</p>
          <p className="quiet-note">updated {cv.updated}</p>
        </div>
        <figure className="portrait-frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/headshot.png" alt="Black and white portrait of Matthew Browne" width="1536" height="1536" />
          <figcaption>Professor · Central Queensland University</figcaption>
        </figure>
      </section>

      <QuoteCycle />

      <section className="record-summary shell" aria-label="Record summary">
        <div><strong>{cv.publications.length}</strong><span>Publications</span></div>
        <div><strong>{cv.projects.length}</strong><span>Major funded projects</span></div>
        <div><strong>{funding.value}</strong><span>{funding.label}</span></div>
        <div><strong>{episodes.length}</strong><span>Podcast episodes</span></div>
      </section>

      <section className="section section-rule shell" id="cv">
        <div className="section-label">CV</div>
        <div className="section-content two-column">
          <div>
            <h2>Employment</h2>
            <ul className="plain-list">{cv.employment.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <h2>Education</h2>
            <ul className="plain-list">{cv.education.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="section section-rule shell">
        <div className="section-label">Academic publications</div>
        <div className="section-content">
          <div className="recent-list compact-list">
            {featuredPublications.map((publication) => (
              <article className="publication-row" key={publication.id}>
                <span className="publication-year">{publication.year}</span>
                <div>
                  <h3>{publication.title}</h3>
                  <p>{publication.authors}{publication.venue ? ` · ${publication.venue}` : ""}</p>
                </div>
                {publication.doi && <a href={publication.url} target="_blank" rel="noreferrer" aria-label={`Read ${publication.title}`}>↗</a>}
              </article>
            ))}
          </div>
          <Link className="quiet-link" href="/publications">View all academic publications →</Link>
        </div>
      </section>

      <section className="section section-rule shell">
        <div className="section-label">Research projects</div>
        <div className="section-content">
          <div className="project-browser compact-list">
            {featuredProjects.map((project) => (
              <article className="project-row" key={project.id}>
                <span className="publication-year">{project.period || project.year}</span>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.investigators}</p>
                  <p className="project-meta">{project.funder}{project.scheme ? ` · ${project.scheme}` : ""}</p>
                </div>
                <span className="project-amount">{project.amount}</span>
              </article>
            ))}
          </div>
          <Link className="quiet-link" href="/projects">View all research projects →</Link>
        </div>
      </section>

      <section className="section section-rule shell">
        <div className="section-label">Popular articles</div>
        <div className="section-content">
          <div className="recent-list compact-list">
            {writing.map((article) => (
              <article className="publication-row" key={article.id}>
                <span className="publication-year">{article.year}</span>
                <div>
                  <h3>{article.title}</h3>
                  <p>{article.authors} · {article.venue}</p>
                </div>
                <a href={article.url} target="_blank" rel="noreferrer" aria-label={`Read ${article.title}`}>↗</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-rule shell">
        <div className="section-label">Recent episodes</div>
        <div className="section-content">
          <div className="recent-list compact-list">
            {featuredEpisodes.map((episode) => (
              <article className="publication-row" key={episode.id}>
                <span className="publication-year">{episodeDate(episode.published)}</span>
                <div>
                  <h3>{episode.title}</h3>
                  <p>Decoding the Gurus{episode.type === "bonus" ? " · Bonus" : ""}{episode.duration ? ` · ${episode.duration}` : ""}</p>
                </div>
                <a href={episode.url} target="_blank" rel="noreferrer" aria-label={`Listen to ${episode.title}`}>↗</a>
              </article>
            ))}
          </div>
          <Link className="quiet-link" href="/episodes">View all episodes →</Link>
        </div>
      </section>

      <section className="section section-rule shell" id="contact">
        <div className="section-label">Contact</div>
        <div className="section-content contact-content">
          <h2>{cv.email}</h2>
          <a className="quiet-link" href={`mailto:${cv.email}`}>Email Matthew →</a>
        </div>
      </section>

      <footer className="site-footer shell">
        <span>Matthew Browne</span>
      </footer>
    </main>
  );
}
