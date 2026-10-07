import Link from "next/link";
import { academicPublications, cv, episodes, introSentence, siteDescription, siteUrl, writing } from "../lib/site-data";
import Dual from "./dual";
import QuoteCycle from "./quote-cycle";
import SiteHeader from "./site-header";

const funding = cv.summary.find((item) => item.label.toLowerCase() === "total research funding") ?? { label: "Research funding", value: "" };
const fundingDollars = Number(funding.value.replace(/[^\d.]/g, ""));
const fundingShort = fundingDollars >= 1e6 ? `$${(fundingDollars / 1e6).toFixed(1)}M` : funding.value;
const firstAuthorPattern = /^Browne,\s*M\./i;
const featuredPublications = [...academicPublications]
  .sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || Number(firstAuthorPattern.test(b.authors)) - Number(firstAuthorPattern.test(a.authors)) || a.title.localeCompare(b.title))
  .slice(0, 6);
const featuredProjects = [...cv.projects].sort((a, b) => b.year - a.year || a.title.localeCompare(b.title)).slice(0, 6);
const featuredEpisodes = episodes.slice(0, 5);

export const metadata = { alternates: { canonical: "/" } };

// Tells search engines who this page is about (schema.org Person).
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: cv.name,
  url: `${siteUrl}/`,
  image: `${siteUrl}/headshot.png`,
  jobTitle: cv.currentPosition,
  worksFor: { "@type": "CollegeOrUniversity", name: cv.institution },
  email: `mailto:${cv.email}`,
  description: siteDescription,
};

function episodeDate(value: string) {
  return new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(value));
}

function Sticker({ children }: { children: React.ReactNode }) {
  return <em className="sticker m-party" aria-hidden="true">{children}</em>;
}

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <SiteHeader />

      <section className="intro shell">
        <div className="intro-copy">
          <p className="eyebrow">
            <Dual serious={`${cv.currentPosition} · ${cv.institution}`} party={`${cv.currentPosition} (kind of a big deal) · ${cv.institution}`} />
          </p>
          <h1>{cv.name}</h1>
          <p className="lede">{introSentence}</p>
          <Link className="quiet-link" href="/about"><Dual serious="Read the full bio →" party="The whole story →" /></Link>
          <p className="quiet-note">updated {cv.updated}</p>
        </div>
        <figure className="portrait-frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="m-serious" src="/headshot.png" alt="Black and white portrait of Matthew Browne" width="1536" height="1536" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="m-party" src="/headshot-party.jpg" alt="Matthew Browne in a sun hat and sunglasses, holding a blue parasol in front of a wall of orange and gold sequins" width="1200" height="1200" loading="lazy" />
          <figcaption className="sr-only min-[761px]:not-sr-only">Matt Browne</figcaption>
        </figure>
      </section>

      <QuoteCycle set="serious" className="m-serious" />
      <QuoteCycle set="party" className="m-party" />

      <section className="record-summary shell" aria-label="Record summary">
        <Link className="stat" href="/publications"><strong>{cv.publications.length}</strong><span><Dual serious="Publications" party="Papers!!" /></span><Sticker>!!</Sticker></Link>
        <Link className="stat" href="/projects"><strong>{cv.projects.length}</strong><span><Dual serious="Funded research projects" party="Projects somebody paid for" /></span><Sticker>!</Sticker></Link>
        <Link className="stat" href="/projects"><strong><Dual serious={funding.value} party={fundingShort} /></strong><span><Dual serious={funding.label} party="Research money. Real money!" /></span><Sticker>wow</Sticker></Link>
        <Link className="stat" href="/episodes"><strong>{episodes.length}</strong><span><Dual serious="Podcast episodes" party="Hours of yapping (episodes)" /></span><Sticker>!!!</Sticker></Link>
      </section>

      <section className="section section-rule shell" id="cv">
        <a className="section-label" href="/Matthew_Browne_CV.pdf"><Dual serious="CV" party="The lore" /></a>
        <div className="section-content two-column">
          <div>
            <h2><Dual serious="Employment" party="Jobs!" /></h2>
            <ul className="plain-list">{cv.employment.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <h2><Dual serious="Education" party="School!!" /></h2>
            <ul className="plain-list">{cv.education.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="section section-rule shell">
        <Link className="section-label" href="/publications"><Dual serious="Academic publications" party="Papers!!" /></Link>
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
          <Link className="quiet-link" href="/publications"><Dual serious="View all academic publications →" party="ALL the papers →" /></Link>
        </div>
      </section>

      <section className="section section-rule shell">
        <Link className="section-label" href="/projects"><Dual serious="Research projects" party="Science projects!" /></Link>
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
          <Link className="quiet-link" href="/projects"><Dual serious="View all research projects →" party="Every single project →" /></Link>
        </div>
      </section>

      <section className="section section-rule shell">
        <div className="section-label"><Dual serious="Popular articles" party="Words for normal people" /></div>
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
        <Link className="section-label" href="/episodes"><Dual serious="Recent episodes" party="Podcast!!" /></Link>
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
          <Link className="quiet-link" href="/episodes"><Dual serious="View all episodes →" party="More yapping →" /></Link>
        </div>
      </section>

      <section className="section section-rule shell" id="contact">
        <div className="section-label"><Dual serious="Contact" party="Say hi!!" /></div>
        <div className="section-content contact-content">
          <h2>{cv.email}</h2>
          <a className="quiet-link" href={`mailto:${cv.email}`}><Dual serious="Email Matthew →" party="Slide into the inbox →" /></a>
        </div>
      </section>

      <footer className="site-footer shell">
        <span>Matthew Browne</span>
        <span className="m-party">Now in lighthearted mode ✦</span>
      </footer>
    </main>
  );
}
