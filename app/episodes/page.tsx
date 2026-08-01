import Link from "next/link";
import { episodeFeedUrl, episodes } from "../../lib/site-data";

export const metadata = {
  title: "Podcast episodes | Matthew Browne",
  description: "Episodes of Decoding the Gurus, co-hosted by Matthew Browne and Chris Kavanagh.",
};

function episodeDate(value: string) {
  return new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(value));
}

export default function EpisodesPage() {
  return (
    <main>
      <header className="site-header shell">
        <Link className="wordmark" href="/">Matthew Browne</Link>
        <Link className="back-link" href="/">← Back to home</Link>
      </header>
      <section className="page-hero shell">
        <p className="eyebrow">Decoding the Gurus</p>
        <h1>Podcast episodes</h1>
        <a className="quiet-link" href={episodeFeedUrl} target="_blank" rel="noreferrer">RSS feed ↗</a>
      </section>
      <section className="projects-section shell">
        <div className="recent-list">
          {episodes.map((episode) => (
            <article className="publication-row" key={episode.id}>
              <span className="publication-year">{episodeDate(episode.published)}</span>
              <div>
                <h2>{episode.title}</h2>
                <p>Decoding the Gurus{episode.type === "bonus" ? " · Bonus" : ""}{episode.duration ? ` · ${episode.duration}` : ""}</p>
              </div>
              <a href={episode.url} target="_blank" rel="noreferrer" aria-label={`Listen to ${episode.title}`}>↗</a>
            </article>
          ))}
        </div>
      </section>
      <footer className="site-footer shell"><span>Matthew Browne</span><Link href="/">Home</Link></footer>
    </main>
  );
}
