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
  assert.match(html, /measuring gambling harm as a public health problem/);
  assert.doesNotMatch(html, /advises PhD, master's,? and honours students/);
  assert.match(html, /href="\/about"/);
  assert.equal((html.match(/class="stat"/g) ?? []).length, 4);
  // Search engines: real description, canonical URL, Person structured data, robots and sitemap.
  assert.match(html, /<meta name="description" content="Professor Matthew Browne, Central Queensland University/);
  assert.match(html, /<link rel="canonical" href="https:\/\/brownem722\.github\.io\/"/);
  assert.match(html, /application\/ld\+json[\s\S]*"@type":"Person"/);
  assert.match(await readExport("robots.txt"), /Sitemap: https:\/\/brownem722\.github\.io\/sitemap\.xml/);
  assert.match(await readExport("sitemap.xml"), /<loc>https:\/\/brownem722\.github\.io\/about\/<\/loc>/);
  // Google Search Console ownership; removing this file un-verifies the site.
  assert.match(await readExport("google6a22a3452614bbc2.html"), /google-site-verification: google6a22a3452614bbc2\.html/);
  assert.match(html, /Selected observations/);
  assert.match(html, /Among the world.*top 2% of scientists/);
  const quoteSource = await readFile(new URL("../data/quotes.txt", import.meta.url), "utf8");
  assert.match(quoteSource, /top 200 specialists in his field/);
  assert.match(quoteSource, /Private brain care specialist to Zaphod Beeblebrox/);
  assert.match(quoteSource, /Vell, he's just zis guy/);
  assert.match(quoteSource, /for the award of Orange Belt/);
  assert.match(quoteSource, /Shotokan Karate Loganholme/);
  assert.match(quoteSource, /1983 Slacks Creek State School Easter Hat Parade/);
  assert.match(quoteSource, /Mostly isn't a hassle to work with/);
  assert.match(quoteSource, /mentor, a role-model and a father-figure/);
  assert.match(quoteSource, /When he was 14 he was nothing but a bully to me/);
  const [seriousQuotes, partyQuotes] = quoteSource.split(/^\[party\]$/m);
  assert.match(seriousQuotes, /\[serious\][\s\S]*top 200 specialists in his field/);
  assert.doesNotMatch(seriousQuotes, /dishwasher|Easter Hat Parade|Orange Belt/);
  assert.match(partyQuotes, /After 20 years he still hasn't learned/);
  assert.ok(quoteSource.trim().endsWith("Who is Matthew Browne? | Eric Weinstein · Renowned Physicist"));
  // Mode switch: serious by default, both wordings in the markup, party portrait available.
  assert.match(html, /<html[^>]*data-mode="serious"/);
  assert.match(html, /role="switch"/);
  assert.match(html, /mb-mode/);
  assert.match(html, /Papers!!/);
  assert.match(html, /headshot-party\.jpg/);
  assert.match(html, />wow</);
  assert.match(html, /Research funding/i);
  assert.match(html, /Funded research projects/);
  assert.doesNotMatch(html, /Completed research projects/);
  const cv = JSON.parse(await readFile(new URL("../data/cv.json", import.meta.url), "utf8"));
  assert.match(html, new RegExp(`updated[\\s\\S]*?${cv.updated}`));
  assert.match(html, new RegExp(`>${cv.publications.length}<`));
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

test("static export contains the about page with the full CV profile", async () => {
  const html = await readExport("about/index.html");
  assert.match(html, /<h1>.*About.*<\/h1>/);
  assert.match(html, /advises PhD, master's,? and honours students in the psychology program/);
  assert.match(html, /Decoding the Gurus/);
  assert.ok((html.match(/<p>/g) ?? []).length >= 3, "profile is split into paragraphs");
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
  // Floors rather than exact counts, so routine CV refreshes don't break the suite.
  assert.ok(data.publications.length >= 271);
  assert.ok(data.projects.length >= 65);
  assert.equal(data.name, "Matthew Browne");
  assert.match(data.employment.join("\n"), /Commonwealth Scientific and Industrial Research Organisation/);
});
