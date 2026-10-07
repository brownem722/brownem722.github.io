import Link from "next/link";
import { cv, profileParagraphs } from "../../lib/site-data";
import Dual from "../dual";
import PageHeader from "../page-header";

export const metadata = {
  title: "About | Matthew Browne",
  description: "About Professor Matthew Browne.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <main>
      <PageHeader />
      <section className="page-hero shell">
        <p className="eyebrow">
          <Dual serious={`${cv.currentPosition} · ${cv.institution}`} party={`${cv.currentPosition} (kind of a big deal) · ${cv.institution}`} />
        </p>
        <h1><Dual serious="About" party="About me" /></h1>
      </section>
      <section className="bio-section shell">
        <div className="bio">
          {profileParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {cv.publicEngagement && (
            <>
              <h2><Dual serious="Public engagement" party="Podcast!!" /></h2>
              <p>{cv.publicEngagement}</p>
            </>
          )}
          <a className="quiet-link" href="/Matthew_Browne_CV.pdf"><Dual serious="Full CV (PDF) →" party="The full CV, if you dare →" /></a>
        </div>
      </section>
      <footer className="site-footer shell"><span>Matthew Browne</span><Link href="/">Home</Link></footer>
    </main>
  );
}
