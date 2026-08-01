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

export { appearances, cv, episodes, links, writing };
