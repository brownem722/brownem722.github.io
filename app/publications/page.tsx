import Link from "next/link";
import { academicPublications } from "../../lib/site-data";
import PublicationBrowser from "./PublicationBrowser";

export const metadata = {
  title: "Academic publications | Matthew Browne",
  description: "Academic publications by Professor Matthew Browne.",
};

export default function PublicationsPage() {
  return (
    <main>
      <header className="site-header shell">
        <Link className="wordmark" href="/">Matthew Browne</Link>
        <Link className="back-link" href="/">← Back to home</Link>
      </header>
      <section className="page-hero shell">
        <p className="eyebrow">Academic publications</p>
        <h1>Academic publications</h1>
      </section>
      <section className="publications-section shell">
        <PublicationBrowser publications={academicPublications} />
      </section>
      <footer className="site-footer shell"><span>Matthew Browne</span><Link href="/">Home</Link></footer>
    </main>
  );
}
