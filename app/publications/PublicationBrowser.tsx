"use client";

import { useMemo, useState } from "react";
import type { Publication } from "../../lib/site-data";

export default function PublicationBrowser({ publications }: { publications: Publication[] }) {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("all");
  const years = useMemo(() => [...new Set(publications.map((publication) => publication.year).filter(Boolean))], [publications]);
  const filtered = useMemo(() => {
    const needle = query.toLowerCase().trim();
    return publications.filter((publication) => {
      const matchesYear = year === "all" || String(publication.year) === year;
      const searchable = `${publication.title} ${publication.authors} ${publication.venue}`.toLowerCase();
      return matchesYear && (!needle || searchable.includes(needle));
    });
  }, [publications, query, year]);

  return (
    <>
      <div className="publication-controls">
        <label>
          <span className="sr-only">Search publications</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, author, or venue" />
        </label>
        <label>
          <span className="sr-only">Filter by year</span>
          <select value={year} onChange={(event) => setYear(event.target.value)}>
            <option value="all">All years</option>
            {years.map((option) => <option key={option} value={String(option)}>{option}</option>)}
          </select>
        </label>
      </div>
      <p className="results-count">Showing {filtered.length} of {publications.length} publications</p>
      <div className="publication-browser">
        {filtered.map((publication) => (
          <article className="publication-row" key={publication.id}>
            <span className="publication-year">{publication.year ?? "—"}</span>
            <div>
              <h2>{publication.title}</h2>
              <p>{publication.authors}{publication.venue ? ` · ${publication.venue}` : ""}</p>
            </div>
            {publication.doi && <a href={publication.url} target="_blank" rel="noreferrer" aria-label={`Read ${publication.title}`}>↗</a>}
          </article>
        ))}
      </div>
    </>
  );
}
