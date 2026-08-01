import Link from "next/link";
import { cv } from "../../lib/site-data";
import ProjectBrowser from "./ProjectBrowser";

export const metadata = {
  title: "Research projects | Matthew Browne",
  description: "Completed research projects recorded in Matthew Browne's CV.",
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
        <p className="lede">{cv.projects.length} projects recorded in the CV project database, from {Math.min(...cv.projects.map((project) => project.year))} to {Math.max(...cv.projects.map((project) => project.year))}.</p>
      </section>
      <section className="projects-section shell">
        <ProjectBrowser projects={cv.projects} />
      </section>
      <footer className="site-footer shell"><span>Matthew Browne</span><Link href="/">Home</Link></footer>
    </main>
  );
}
