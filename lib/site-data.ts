import cv from "../data/cv.json";
import episodes from "../data/episodes.json";
import links from "../data/links.json";
import writing from "../data/writing.json";
import appearances from "../data/appearances.json";

export type Publication = (typeof cv.publications)[number];
export type Project = (typeof cv.projects)[number];
export type Episode = (typeof episodes)[number];

export const popularPublicationIds = new Set(["browne2021galileo"]);
export const academicPublications = cv.publications.filter((publication) => !popularPublicationIds.has(publication.id));
export const episodeFeedUrl = "https://feeds.captivate.fm/decoding-the-gurus/";

// One-line introduction under the name on the home page; the full CV profile lives on /about.
export const introSentence = "Quantitative researcher measuring gambling harm as a public health problem, and co-host of the Decoding the Gurus podcast.";

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

export { appearances, cv, episodes, links, writing };
