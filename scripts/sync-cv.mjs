import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const cvRoot = process.env.CV_ROOT ?? "D:\\archive\\CV";
const cvPath = path.join(cvRoot, "Matthew_Browne_CV.md");
const bibPath = path.join(cvRoot, "my_citations.bib");
const projectsPath = path.join(cvRoot, "research_projects.csv");
const outputPath = path.join(projectRoot, "data", "cv.json");
const cvPdfPath = path.join(cvRoot, "Matthew_Browne_CV.pdf");
const pdfOutputPath = path.join(projectRoot, "public", "Matthew_Browne_CV.pdf");

const markdown = fs.readFileSync(cvPath, "utf8");
const bibtex = fs.readFileSync(bibPath, "utf8");
const projectCsv = fs.readFileSync(projectsPath, "utf8");

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

function parseCsv(source) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    const next = source[index + 1];

    if (quoted) {
      if (character === '"' && next === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
    } else if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }

  if (field.length || row.length) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }

  const headers = rows.shift() ?? [];
  return rows
    .filter((values) => values.some((value) => value.trim()))
    .map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])));
}

function parseProjects(source) {
  return parseCsv(source)
    .map((project, index) => ({
      id: `${project.year}-${index + 1}`,
      year: Number.parseInt(project.year, 10),
      period: project.project_year_text.trim(),
      category: project.category.trim(),
      title: project.title.trim(),
      investigators: project.investigators.trim(),
      funder: project.funder.trim(),
      scheme: project.scheme.trim(),
      amount: project.amount_display.trim(),
    }))
    .filter((project) => project.title)
    .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
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
const currentPosition = markdown.match(/^\*\*Current position:\*\*\s*(.+)$/m)?.[1]?.trim() ?? "Professor";
const institution = markdown.match(/^\*\*Institution:\*\*\s*(.+)$/m)?.[1]?.trim() ?? "Central Queensland University";
const qualifications = markdown.match(/^\*\*Qualifications:\*\*\s*(.+)$/m)?.[1]?.trim() ?? "";
const updated = markdown.match(/^updated:\s*(.+)$/m)?.[1]?.trim() ?? new Date().toISOString().slice(0, 10);

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
  publicEngagement: section("Public Engagement")
    .replace(/\*+/g, "")
    .replace(/\s+As of .*$/i, "")
    .replace(/\s+/g, " ")
    .trim(),
  updated,
  publications: parseBibtex(bibtex),
  projects: parseProjects(projectCsv),
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
if (fs.existsSync(cvPdfPath)) {
  fs.mkdirSync(path.dirname(pdfOutputPath), { recursive: true });
  fs.copyFileSync(cvPdfPath, pdfOutputPath);
}
console.log(`Synced ${output.publications.length} publications and ${output.projects.length} projects${fs.existsSync(cvPdfPath) ? " and the CV PDF" : ""} from ${cvRoot}`);
