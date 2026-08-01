import Link from "next/link";
import { cv } from "../lib/site-data";

const featuredYears = [...new Set(cv.publications.map((publication) => publication.year).filter(Boolean))].slice(0, 3);

export default function Home() {
  return (
    <main>
      <header className="site-header shell">
        <Link className="wordmark" href="/">Matthew Browne</Link>
        <nav aria-label="Main navigation">
          <Link href="#about">About</Link>
          <Link href="#work">Work</Link>
          <Link href="/publications">Publications</Link>
          <Link href="#contact">Contact</Link>
        </nav>
      </header>

      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">Researcher · professor · public educator</p>
          <h1>Understanding how people make sense of the world.</h1>
          <p className="lede">{cv.profile}</p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/publications">Browse publications</Link>
            <a className="text-link" href={`mailto:${cv.email}`}>Get in touch <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="portrait-frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/headshot.png" alt="Black and white portrait of Matthew Browne" width="1536" height="1536" />
          <span className="portrait-caption">Professor · Central Queensland University</span>
        </div>
      </section>

      <section className="stats-strip">
        <div className="shell stats-grid">
          {cv.summary.map((item) => (
            <div className="stat" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section shell" id="about">
        <div className="section-intro">
          <p className="eyebrow">01 / About</p>
          <h2>A broad research practice with a public-facing edge.</h2>
        </div>
        <div className="section-body two-column">
          <p>{cv.publicEngagement}</p>
          <div className="meta-list">
            <div><span>Current role</span><strong>{cv.currentPosition}</strong></div>
            <div><span>Institution</span><strong>{cv.institution}</strong></div>
            <div><span>Qualifications</span><strong>{cv.qualifications}</strong></div>
          </div>
        </div>
      </section>

      <section className="section section-rule shell" id="work">
        <div className="section-intro">
          <p className="eyebrow">02 / Selected work</p>
          <h2>Research, measurement, and public reasoning.</h2>
        </div>
        <div className="work-grid">
          <article className="feature-card feature-card-dark">
            <p className="card-kicker">Public work</p>
            <h3>Decoding the Gurus</h3>
            <p>An educational podcast about science communication, critical information literacy, conspiracy theories, online disinformation, and public reasoning.</p>
            <span className="card-arrow" aria-hidden="true">↗</span>
          </article>
          <article className="feature-card">
            <p className="card-kicker">Publications</p>
            <h3>{cv.publications.length} publications, from 2000 to the present.</h3>
            <p>A searchable record of research across gambling harm, public health measurement, computational modelling, and applied social science.</p>
            <Link className="card-link" href="/publications">View the full list <span aria-hidden="true">↗</span></Link>
          </article>
        </div>
      </section>

      <section className="section section-rule shell">
        <div className="section-intro compact-intro">
          <p className="eyebrow">03 / Latest publications</p>
          <h2>Recent research</h2>
          <p className="muted">The full record is grouped by year and searchable on the publications page.</p>
        </div>
        <div className="recent-list">
          {cv.publications.filter((publication) => featuredYears.includes(publication.year)).slice(0, 6).map((publication) => (
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
      </section>

      <section className="contact-band" id="contact">
        <div className="shell contact-content">
          <p className="eyebrow">Contact</p>
          <h2>For research, media, or public work.</h2>
          <a className="contact-email" href={`mailto:${cv.email}`}>{cv.email} <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <footer className="site-footer shell">
        <span>Matthew Browne</span>
        <span>CV data updated {cv.updated}</span>
      </footer>
    </main>
  );
}
