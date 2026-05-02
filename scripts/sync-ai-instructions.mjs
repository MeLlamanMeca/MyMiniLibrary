import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const sourcePath = path.join(rootDir, "docs", "ai-instructions.md");
const targetPaths = [
  path.join(rootDir, "GEMINI.md"),
  path.join(rootDir, ".github", "copilot-instructions.md")
];

const banner = [
  "<!-- AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY. -->",
  "<!-- Source: docs/ai-instructions.md -->"
].join("\n");

const sourceContent = await readFile(sourcePath, "utf8");
const output = `${banner}\n\n${sourceContent.trimEnd()}\n`;

for (const targetPath of targetPaths) {
  await mkdir(path.dirname(targetPath), { recursive: true });
  await writeFile(targetPath, output, "utf8");
}

console.log("AI instruction files synchronized.");
