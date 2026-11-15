import Link from "next/link";
import { notFound } from "next/navigation";
import Dual from "../../dual";
import PageHeader from "../../page-header";
import PublicationBrowser from "../../publications/PublicationBrowser";
import { researchAreas, type Publication } from "../../../lib/site-data";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return researchAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const area = researchAreas.find((candidate) => candidate.slug === slug);
  if (!area) return {};
  return {
    title: `${area.label} | Matthew Browne`,
    description: area.overview.split(/(?<=\.)\s/)[0],
    alternates: { canonical: `/research/${area.slug}/` },
  };
}

function PublicationRow({ publication }: { publication: Publication }) {
  return (
    <article className="publication-row">
      <span className="publication-year">{publication.year ?? "—"}</span>
      <div>
        <h3>{publication.title}</h3>
        <p>{publication.authors}{publication.venue ? ` · ${publication.venue}` : ""}</p>
      </div>
      {publication.doi && <a href={publication.url} target="_blank" rel="noreferrer" aria-label={`Read ${publication.title}`}>↗</a>}
    </article>
  );
}

export default async function ResearchAreaPage({ params }: Params) {
  const { slug } = await params;
  const area = researchAreas.find((candidate) => candidate.slug === slug);
  if (!area) notFound();
  const sections = area.sections.filter((section) => section.publications.length);

  return (
    <main>
      <PageHeader />
      <section className="page-hero shell">
        <p className="eyebrow"><Dual serious={`Research area · ${area.publications.length} publications`} party={`${area.publications.length} papers!!`} /></p>
        <h1>{area.label}</h1>
        <p className="area-overview">{area.overview}</p>
        {sections.length > 0 && (
          <ul className="area-sections">
            {sections.map((section) => (
              <li key={section.code}><a href={`#${section.code}`}>{section.label}</a> <span>{section.publications.length}</span></li>
            ))}
          </ul>
        )}
      </section>
      <section className="publications-section shell">
        {sections.length > 0
          ? sections.map((section) => (
              <section className="area-section" id={section.code} key={section.code}>
                <h2>{section.label}</h2>
                <p className="area-section-intro">{section.intro}</p>
                <div className="publication-browser">
                  {section.publications.map((publication) => <PublicationRow publication={publication} key={publication.id} />)}
                </div>
              </section>
            ))
          : <PublicationBrowser publications={area.publications} />}
      </section>
      <footer className="site-footer shell"><span>Matthew Browne</span><Link href="/publications/">All publications</Link></footer>
    </main>
  );
}
