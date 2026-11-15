import cv from "../data/cv.json";
import episodes from "../data/episodes.json";
import links from "../data/links.json";
import writing from "../data/writing.json";
import appearances from "../data/appearances.json";
import topics from "../data/topics.json";

export type Publication = (typeof cv.publications)[number];
export type Project = (typeof cv.projects)[number];
export type Episode = (typeof episodes)[number];

export const popularPublicationIds = new Set(["browne2021galileo"]);
export const academicPublications = cv.publications.filter((publication) => !popularPublicationIds.has(publication.id));
export const episodeFeedUrl = "https://feeds.captivate.fm/decoding-the-gurus/";

// One-line introduction under the name on the home page; the full CV profile lives on /about.
export const introSentence = "Quantitative researcher measuring gambling harm as a public health problem, and co-host of the Decoding the Gurus podcast.";

export const siteUrl = "https://brownem722.github.io";
export const siteDescription =
  "Professor Matthew Browne, Central Queensland University: quantitative methods, psychometrics and the measurement of gambling harm. Co-host of the Decoding the Gurus podcast.";

// Splits the single-paragraph CV profile into readable paragraphs: break once a paragraph
// reaches ~50 words, unless the next sentence leans on the previous one ("Its", "This", ...).
export const profileParagraphs = cv.profile
  .split(/(?<=\.)\s+(?=[A-Z])/)
  .reduce<string[][]>((paragraphs, sentence) => {
    const current = paragraphs.at(-1);
    const words = current?.join(" ").split(/\s+/).length ?? 0;
    if (!current || (words >= 50 && !/^(Its|This|These|That|Their)\b/.test(sentence))) paragraphs.push([sentence]);
    else current.push(sentence);
    return paragraphs;
  }, [])
  .map((sentences) => sentences.join(" "));

// Research areas: topic codes come from the CV bib's `topics` field via sync-cv; a paper
// belongs to an area when any of its codes is the area slug or one of its section codes.
type TopicDefinition = { slug: string; label: string; party: string; overview: string; sections?: { code: string; label: string; intro: string }[] };
const byNewest = (a: Publication, b: Publication) => (b.year ?? 0) - (a.year ?? 0) || a.title.localeCompare(b.title);
export const researchAreas = (topics as TopicDefinition[]).map((topic) => {
  const codes = new Set([topic.slug, ...(topic.sections ?? []).map((section) => section.code)]);
  const publications = cv.publications.filter((publication) => publication.topics.some((code) => codes.has(code))).sort(byNewest);
  const sections = (topic.sections ?? []).map((section) => ({
    ...section,
    publications: publications.filter((publication) => publication.topics.includes(section.code)),
  }));
  // Papers tagged with the bare area slug still need a home on a sectioned page.
  const unsectioned = publications.filter((publication) => !sections.some((section) => section.publications.includes(publication)));
  if (sections.length && unsectioned.length) sections.push({ code: `${topic.slug}-other`, label: "Other work", intro: "", publications: unsectioned });
  return { ...topic, publications, sections };
});
export type ResearchArea = (typeof researchAreas)[number];

export { appearances, cv, episodes, links, writing };
