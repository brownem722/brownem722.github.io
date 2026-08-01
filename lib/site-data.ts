import cv from "../data/cv.json";
import links from "../data/links.json";
import writing from "../data/writing.json";
import appearances from "../data/appearances.json";

export type Publication = (typeof cv.publications)[number];

export { appearances, cv, links, writing };
