import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the personal home page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Matthew Browne \| Researcher and public educator<\/title>/i);
  assert.match(html, /Understanding how people make sense of the world/);
  assert.match(html, /Central Queensland University/);
  assert.match(html, /271/);
  assert.match(html, /Browse publications/);
  assert.match(html, /headshot\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/i);
});

test("publication page renders the CV-derived record and search controls", async () => {
  const response = await render("/publications");
  assert.equal(response.status, 200);
  const html = await response.text();
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
