import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const target = path.join(root, "themes/version-15");
const archive = path.join(root, "px-custom-tracking-ds-website-wq3c-aefwrds-bundle Version 15.zip");
const temp = path.join(root, ".tmp-theme-version-15");
if (!fs.existsSync(archive)) throw new Error("Version 15 source bundle is missing.");
fs.rmSync(temp, { recursive: true, force: true });
fs.mkdirSync(temp, { recursive: true });
execFileSync("unzip", ["-q", archive, "-d", temp]);

const imageTarget = path.join(target, "assets/images");
const vectorTarget = path.join(target, "assets/vectors");
const sourceTarget = path.join(target, "source");
const docsTarget = path.join(target, "docs");
for (const dir of [imageTarget, vectorTarget, sourceTarget, docsTarget]) fs.mkdirSync(dir, { recursive: true });

function copyFiles(source, destination) {
  if (!fs.existsSync(source)) return;
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const from = path.join(source, entry.name);
    const to = path.join(destination, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(to, { recursive: true });
      copyFiles(from, to);
    } else {
      fs.copyFileSync(from, to);
    }
  }
}
copyFiles(path.join(temp, "assets/images"), imageTarget);
copyFiles(path.join(temp, "assets/vectors"), vectorTarget);

const codeDir = path.join(temp, "code");
if (fs.existsSync(path.join(codeDir, "FigmaExport.jsx"))) fs.copyFileSync(path.join(codeDir, "FigmaExport.jsx"), path.join(sourceTarget, "FigmaExport.jsx"));
if (fs.existsSync(path.join(codeDir, "FigmaExport.css"))) fs.copyFileSync(path.join(codeDir, "FigmaExport.css"), path.join(sourceTarget, "FigmaExport.css"));

const designPath = path.join(root, "figma-design Version 15.json");
const layerPath = path.join(root, "layer-descriptions Version 15.json");
const csvPath = path.join(root, "layer-descriptions Version 15.csv");
const tokensPath = path.join(root, "figma-tokens Version 15.css");
for (const [from, to] of [[designPath,"figma-design.json"],[layerPath,"layer-descriptions.json"],[csvPath,"layer-descriptions.csv"],[tokensPath,"design-tokens.css"]]) {
  if (fs.existsSync(from)) fs.copyFileSync(from, path.join(docsTarget, to));
}

const allExtractedFiles = [];
function listFiles(dir, prefix = "") {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = path.posix.join(prefix, entry.name);
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) listFiles(full, rel);
    else allExtractedFiles.push(rel);
  }
}
listFiles(temp);
console.log("ZIP extracted file count:", allExtractedFiles.length);
console.log("ZIP image folders:", allExtractedFiles.filter(name => /image|product|10394|10395|10396|10397/i.test(name)).slice(0, 160));

const manifestPath = path.join(temp, "assets/asset-manifest.json");
let manifest = [];
if (fs.existsSync(manifestPath)) {
  const parsed = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  manifest = Array.isArray(parsed) ? parsed : (parsed.assets || []);
  fs.copyFileSync(manifestPath, path.join(docsTarget, "asset-manifest.json"));
}
const layerData = fs.existsSync(layerPath) ? JSON.parse(fs.readFileSync(layerPath, "utf8")) : [];
const layerById = new Map(layerData.map(layer => [layer.id, layer]));
const assets = manifest.map(item => {
  const layer = layerById.get(item.nodeId) || {};
  const pos = layer.position || {};
  return {
    nodeId: item.nodeId,
    name: layer.name || item.name,
    hierarchy: layer.hierarchy || "",
    filename: item.name,
    format: item.format || path.extname(item.name).slice(1),
    x: pos.x ?? 0,
    y: pos.y ?? 0,
    width: pos.width ?? 0,
    height: pos.height ?? 0
  };
});
fs.writeFileSync(path.join(imageTarget, "asset-map.json"), JSON.stringify({ assets }, null, 2));

const refFrames = path.join(temp, "reference-frames");
if (fs.existsSync(refFrames)) copyFiles(refFrames, path.join(docsTarget, "reference-frames"));
fs.rmSync(temp, { recursive: true, force: true });
console.log(`Prepared Version 15 assets: ${assets.length} manifest entries; reference frames: ${fs.existsSync(path.join(docsTarget,"reference-frames")) ? "included" : "not present in source bundle"}.`);
