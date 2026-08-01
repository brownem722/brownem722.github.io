import Link from "next/link";
import { cv } from "../../lib/site-data";
import ProjectBrowser from "./ProjectBrowser";

export const metadata = {
  title: "Research projects | Matthew Browne",
  description: "Research projects involving Professor Matthew Browne.",
};

export default function ProjectsPage() {
  return (
    <main>
      <header className="site-header shell">
        <Link className="wordmark" href="/">Matthew Browne</Link>
        <Link className="back-link" href="/">← Back to home</Link>
      </header>
      <section className="page-hero shell">
        <p className="eyebrow">Research projects</p>
        <h1>Research projects</h1>
      </section>
      <section className="projects-section shell">
        <ProjectBrowser projects={cv.projects} />
      </section>
      <footer className="site-footer shell"><span>Matthew Browne</span><Link href="/">Home</Link></footer>
    </main>
  );
}
