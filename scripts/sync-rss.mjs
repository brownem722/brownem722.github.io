import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const feedUrl = "https://feeds.captivate.fm/decoding-the-gurus/";
const outputPath = path.join(projectRoot, "data", "episodes.json");

function cleanValue(value = "") {
  return value
    .replace(/^<!\[CDATA\[/, "")
    .replace(/\]\]>$/, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&ndash;|&#x2013;/g, "–")
    .replace(/&mdash;|&#x2014;/g, "—")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/\s+/g, " ")
    .trim();
}

function tagValue(source, tag) {
  const match = source.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i"));
  return cleanValue(match?.[1] ?? "");
}

function parseEpisodes(xml) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)]
    .map((match) => {
      const item = match[1];
      const title = tagValue(item, "title");
      const published = tagValue(item, "pubDate");
      const date = new Date(published);
      const url = tagValue(item, "link");
      const guid = tagValue(item, "guid");
      return {
        id: guid || url || title,
        title,
        published: Number.isNaN(date.getTime()) ? published : date.toISOString(),
        url,
        duration: tagValue(item, "itunes:duration"),
        type: tagValue(item, "itunes:episodeType") || "full",
      };
    })
    .filter((episode) => episode.title && episode.url)
    .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());
}

async function sync() {
  const response = await fetch(feedUrl, { headers: { "user-agent": "matthew-browne-website/1.0" } });
  if (!response.ok) throw new Error(`RSS feed returned ${response.status}`);
  const episodes = parseEpisodes(await response.text());
  if (!episodes.length) throw new Error("RSS feed contained no usable episodes");
  fs.writeFileSync(outputPath, `${JSON.stringify(episodes, null, 2)}\n`, "utf8");
  console.log(`Synced ${episodes.length} podcast episodes from ${feedUrl}`);
}

try {
  await sync();
} catch (error) {
  if (fs.existsSync(outputPath)) {
    console.warn(`RSS sync failed; retaining existing episode data: ${error.message}`);
  } else {
    throw error;
  }
}
