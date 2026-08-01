import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function readExport(pathname) {
  return readFile(new URL(`../dist/client/${pathname}`, import.meta.url), "utf8");
}

test("static export contains the personal home page", async () => {
  const html = await readExport("index.html");
  assert.match(html, /<title>Matthew Browne \| Researcher and public educator<\/title>/i);
  assert.match(html, /Understanding how people make sense of the world/);
  assert.match(html, /Central Queensland University/);
  assert.match(html, /271/);
  assert.match(html, /Browse publications/);
  assert.match(html, /headshot\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/i);
});

test("static export contains the CV-derived publication page", async () => {
  const html = await readExport("publications/index.html");
  assert.match(html, /The complete record/);
  assert.match(html, /Search title, author, or venue/);
  assert.match(html, /All years/);
  assert.match(html, /A Model-Based National Estimate of Gambling Harm in Australia/);
  assert.match(html, /Showing[\s\S]*?271[\s\S]*?of[\s\S]*?271[\s\S]*?publications/);
});

test("CV sync output contains the maintained bibliography", async () => {
  const data = JSON.parse(await readFile(new URL("../data/cv.json", import.meta.url), "utf8"));
  assert.equal(data.publications.length, 271);
  assert.equal(data.name, "Matthew Browne");
});
