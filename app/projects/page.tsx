import Link from "next/link";
import Dual from "../dual";
import PageHeader from "../page-header";
import { cv } from "../../lib/site-data";
import ProjectBrowser from "./ProjectBrowser";

export const metadata = {
  title: "Research projects | Matthew Browne",
  description: "Research projects involving Professor Matthew Browne.",
};

export default function ProjectsPage() {
  return (
    <main>
      <PageHeader />
      <section className="page-hero shell">
        <p className="eyebrow"><Dual serious="Research projects" party="Science projects (funded!)" /></p>
        <h1>Research projects</h1>
      </section>
      <section className="projects-section shell">
        <ProjectBrowser projects={cv.projects} />
      </section>
      <footer className="site-footer shell"><span>Matthew Browne</span><Link href="/">Home</Link></footer>
    </main>
  );
}
