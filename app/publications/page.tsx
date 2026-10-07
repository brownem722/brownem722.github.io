import Link from "next/link";
import Dual from "../dual";
import PageHeader from "../page-header";
import { academicPublications } from "../../lib/site-data";
import PublicationBrowser from "./PublicationBrowser";

export const metadata = {
  title: "Academic publications | Matthew Browne",
  description: "Academic publications by Professor Matthew Browne.",
};

export default function PublicationsPage() {
  return (
    <main>
      <PageHeader />
      <section className="page-hero shell">
        <p className="eyebrow"><Dual serious="Academic publications" party="Papers!! All of them!!" /></p>
        <h1>Academic publications</h1>
      </section>
      <section className="publications-section shell">
        <PublicationBrowser publications={academicPublications} />
      </section>
      <footer className="site-footer shell"><span>Matthew Browne</span><Link href="/">Home</Link></footer>
    </main>
  );
}
