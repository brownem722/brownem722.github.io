"use client";

import { useMemo, useState } from "react";
import type { Project } from "../../lib/site-data";

export default function ProjectBrowser({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("all");
  const years = useMemo(() => [...new Set(projects.map((project) => project.year))], [projects]);
  const filtered = useMemo(() => {
    const needle = query.toLowerCase().trim();
    return projects.filter((project) => {
      const matchesYear = year === "all" || String(project.year) === year;
      const searchable = `${project.title} ${project.investigators} ${project.funder} ${project.scheme}`.toLowerCase();
      return matchesYear && (!needle || searchable.includes(needle));
    });
  }, [projects, query, year]);

  return (
    <>
      <div className="publication-controls">
        <label>
          <span className="sr-only">Search research projects</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, investigator, or funder" />
        </label>
        <label>
          <span className="sr-only">Filter projects by year</span>
          <select value={year} onChange={(event) => setYear(event.target.value)}>
            <option value="all">All years</option>
            {years.map((option) => <option key={option} value={String(option)}>{option}</option>)}
          </select>
        </label>
      </div>
      <p className="results-count">Showing {filtered.length} of {projects.length} projects</p>
      <div className="project-browser">
        {filtered.map((project) => (
          <article className="project-row" key={project.id}>
            <span className="publication-year">{project.period || project.year}</span>
            <div>
              <h2>{project.title}</h2>
              <p>{project.investigators}</p>
              <p className="project-meta">{project.funder}{project.scheme ? ` · ${project.scheme}` : ""}</p>
            </div>
            <span className="project-amount">{project.amount}</span>
          </article>
        ))}
      </div>
    </>
  );
}
