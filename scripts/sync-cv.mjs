import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const cvRoot = process.env.CV_ROOT ?? "D:\\archive\\CV";
const cvPath = path.join(cvRoot, "Matthew_Browne_CV.md");
const bibPath = path.join(cvRoot, "my_citations.bib");
const outputPath = path.join(projectRoot, "data", "cv.json");

const markdown = fs.readFileSync(cvPath, "utf8");
const bibtex = fs.readFileSync(bibPath, "utf8");

function section(title) {
  const heading = `## ${title}`;
  const headingStart = markdown.indexOf(heading);
  if (headingStart < 0) return "";
  const contentStart = markdown.indexOf("\n", headingStart) + 1;
  if (contentStart <= 0) return "";
  const remainder = markdown.slice(contentStart);
  const nextHeading = remainder.search(/\r?\n## /);
  return remainder.slice(0, nextHeading < 0 ? remainder.length : nextHeading).trim();
}

function bullets(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.match(/^[-*]\s+(.+)$/)?.[1]?.trim())
    .filter(Boolean);
}

function cleanBibValue(value) {
  return value
    .replace(/^\{/, "")
    .replace(/\}$/, "")
    .replace(/^\"/, "")
    .replace(/\"$/, "")
    .replace(/\{([^{}]*)\}/g, "$1")
    .replace(/\&/g, "&")
    .replace(/--/g, "–")
    .trim();
}

function parseBibtex(source) {
  return source
    .split(/\r?\n(?=@)/)
    .map((entry) => entry.trim())
    .filter((entry) => entry.startsWith("@"))
    .map((entry) => {
      const header = entry.match(/^@(\w+)\{([^,]+),/);
      if (!header) return null;

      const fields = {};
      for (const line of entry.split(/\r?\n/)) {
        const match = line.match(/^\s*([A-Za-z]+)\s*=\s*(\{.*\}|\".*\")\s*,?\s*$/);
        if (match) fields[match[1].toLowerCase()] = cleanBibValue(match[2]);
      }

      const year = Number.parseInt(fields.year ?? "0", 10);
      return {
        id: header[2].trim(),
        type: header[1].toLowerCase(),
        title: fields.title ?? "Untitled publication",
        authors: fields.author ?? "",
        year: Number.isFinite(year) && year > 0 ? year : null,
        venue: fields.journal ?? fields.booktitle ?? fields.publisher ?? "",
        doi: fields.doi ?? "",
        url: fields.url ?? (fields.doi ? `https://doi.org/${fields.doi}` : ""),
      };
    })
    .filter(Boolean)
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || a.title.localeCompare(b.title));
}

const contactLine = markdown.match(/^\*\*Contact:\*\*\s*(.+)$/m)?.[1] ?? "";
const email = contactLine.match(/[\w.+-]+@[\w.-]+\.\w+/)?.[0] ?? "";
const currentPosition = markdown.match(/^\*\*Current position:\*\*\s*(.+)$/m)?.[1] ?? "Professor";
const institution = markdown.match(/^\*\*Institution:\*\*\s*(.+)$/m)?.[1] ?? "Central Queensland University";
const qualifications = markdown.match(/^\*\*Qualifications:\*\*\s*(.+)$/m)?.[1] ?? "";
const updated = markdown.match(/^updated:\\s*(.+)$/m)?.[1]?.trim() ?? new Date().toISOString().slice(0, 10);

const summary = bullets(section("Research Summary")).map((item) => {
  const [label, ...rest] = item.split(":");
  return { label: label.trim(), value: rest.join(":").trim().replace(/[.]$/, "") };
});

const output = {
  name: markdown.match(/^# (.+)$/m)?.[1]?.trim() ?? "Matthew Browne",
  currentPosition,
  institution,
  qualifications,
  email,
  profile: section("Profile").replace(/\s+/g, " ").trim(),
  education: bullets(section("Education")),
  employment: bullets(section("Employment")),
  summary,
  publicEngagement: section("Public Engagement").replace(/\s+/g, " ").trim(),
  updated,
  publications: parseBibtex(bibtex),
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`Synced ${output.publications.length} publications from ${cvRoot}`);
