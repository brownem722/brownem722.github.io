import Link from "next/link";
import { cv } from "../../lib/site-data";
import PublicationBrowser from "./PublicationBrowser";

export const metadata = {
  title: "Publications | Matthew Browne",
  description: "Publications by Professor Matthew Browne.",
};

export default function PublicationsPage() {
  return (
    <main>
      <header className="site-header shell">
        <Link className="wordmark" href="/">Matthew Browne</Link>
        <Link className="back-link" href="/">← Back to home</Link>
      </header>
      <section className="page-hero shell">
        <p className="eyebrow">Publications</p>
        <h1>Publications</h1>
      </section>
      <section className="publications-section shell">
        <PublicationBrowser publications={cv.publications} />
      </section>
      <footer className="site-footer shell"><span>Matthew Browne</span><Link href="/">Home</Link></footer>
    </main>
  );
}
