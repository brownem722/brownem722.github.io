import Link from "next/link";
import { cv } from "../lib/site-data";

const funding = cv.summary.find((item) => item.label.toLowerCase().includes("funding"))?.value ?? "";

export default function Home() {
  return (
    <main>
      <header className="site-header shell">
        <Link className="wordmark" href="/">Matthew Browne</Link>
        <nav aria-label="Main navigation">
          <Link href="#about">About</Link>
          <Link href="#cv">CV</Link>
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
        </div>
        <figure className="portrait-frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/headshot.png" alt="Black and white portrait of Matthew Browne" width="1536" height="1536" />
          <figcaption>Professor · Central Queensland University</figcaption>
        </figure>
      </section>

      <section className="record-summary shell" aria-label="Record summary">
        <div><strong>{cv.publications.length}</strong><span>Publications</span></div>
        <div><strong>{cv.projects.length}</strong><span>Completed research projects</span></div>
        <div><strong>{funding}</strong><span>Total research funding</span></div>
      </section>

      <section className="section shell" id="about">
        <div className="section-label">About</div>
        <div className="section-content two-column">
          <div>
            <h2>Profile</h2>
            <p>{cv.profile}</p>
          </div>
          <div>
            <h2>Public engagement</h2>
            <p>{cv.publicEngagement}</p>
          </div>
        </div>
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
        <div className="section-label">Recent publications</div>
        <div className="section-content">
          <div className="recent-list compact-list">
            {cv.publications.slice(0, 6).map((publication) => (
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
          <Link className="quiet-link" href="/publications">View all publications →</Link>
        </div>
      </section>

      <section className="section section-rule shell">
        <div className="section-label">Research projects</div>
        <div className="section-content project-summary">
          <Link className="quiet-link" href="/projects">View all research projects →</Link>
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
