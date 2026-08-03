import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function readExport(pathname) {
  return readFile(new URL(`../dist/client/${pathname}`, import.meta.url), "utf8");
}

test("static export contains the personal home page", async () => {
  const html = await readExport("index.html");
  assert.match(html, /<title>Matthew Browne<\/title>/i);
  assert.match(html, /<h1>Matthew Browne<\/h1>/);
  assert.match(html, /Central Queensland University/);
  assert.match(html, /computational statistics/);
  assert.match(html, /advises PhD, master's, and honours students in the psychology program/);
  assert.match(html, /Selected observations/);
  assert.match(html, /Among the world.*top 2% of scientists/);
  const quoteSource = await readFile(new URL("../app/quote-cycle.tsx", import.meta.url), "utf8");
  assert.match(quoteSource, /top 200 specialists in his field/);
  assert.match(quoteSource, /Private brain care specialist to Zaphod Beeblebrox/);
  assert.match(quoteSource, /Vell, he's just zis guy/);
  assert.match(quoteSource, /for the award of Orange Belt/);
  assert.match(quoteSource, /Shotokan Karate Loganholme/);
  assert.match(quoteSource, /1983 Slacks Creek State School Easter Hat Parade/);
  assert.match(quoteSource, /Mostly isn't a hassle to work with/);
  assert.match(quoteSource, /mentor, a role-model and a father-figure/);
  assert.ok(quoteSource.indexOf("After 20 years he still hasn't learned") < quoteSource.indexOf("Ranked among the top 200 specialists"));
  assert.match(html, /Chris Kavanagh, Associate Professor of Psychology at Rikkyo University/);
  assert.match(html, /Research funding/);
  assert.match(html, /Funded research projects/);
  assert.doesNotMatch(html, /Completed research projects/);
  assert.match(html, /updated[\s\S]*?2026-06-26/);
  assert.match(html, /271/);
  assert.match(html, /Academic publications/);
  assert.match(html, /Research projects/);
  assert.match(html, /Podcast episodes/);
  assert.match(html, /href="\/Matthew_Browne_CV\.pdf"[^>]*>CV<\/a>/);
  assert.match(html, /Popular articles/);
  assert.match(html, /Gambling in Australia: how bad is the problem/);
  assert.match(html, /You're probably not Galileo/);
  assert.match(html, /Recent episodes/);
  assert.match(html, /Matthew the Succulent, Bin-faced Politicians/);
  assert.doesNotMatch(html, /Government-funded projects/);
  assert.match(html, /headshot\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview|Selected work|Latest publications|Curriculum vitae updated|CV data updated|<div class="section-label">About<\/div>/i);
});

test("static export contains the CV-derived publication page", async () => {
  const html = await readExport("publications/index.html");
  assert.match(html, /<h1>Academic publications<\/h1>/);
  assert.match(html, /Search title, author, or venue/);
  assert.match(html, /All years/);
  assert.match(html, /A Model-Based National Estimate of Gambling Harm in Australia/);
  assert.doesNotMatch(html, /recorded in the maintained CV bibliography|Showing[\s\S]*?publications/i);
});

test("static export contains the podcast episode page", async () => {
  const html = await readExport("episodes/index.html");
  assert.match(html, /<h1>Podcast episodes<\/h1>/);
  assert.match(html, /Matthew the Succulent, Bin-faced Politicians/);
  assert.match(html, /feeds\.captivate\.fm\/decoding-the-gurus/);
});

test("static export contains the CV-derived project page", async () => {
  const html = await readExport("projects/index.html");
  assert.match(html, /<h1>Research projects<\/h1>/);
  assert.match(html, /Search title, investigator, or funder/);
  assert.match(html, /The Sixth Social and Economic Impact Study of Gambling in Tasmania/);
  assert.match(html, /Skill-based gambling in Australia/);
  assert.match(html, /A framework for conceptualising and measuring the burden of gambling-related harm/);
  assert.doesNotMatch(html, /recorded in the CV project database|Showing[\s\S]*?projects/i);
});

test("CV sync output contains the maintained bibliography", async () => {
  const data = JSON.parse(await readFile(new URL("../data/cv.json", import.meta.url), "utf8"));
  assert.equal(data.publications.length, 271);
  assert.equal(data.projects.length, 65);
  assert.equal(data.name, "Matthew Browne");
  assert.match(data.employment.join("\n"), /Commonwealth Scientific and Industrial Research Organisation/);
});
