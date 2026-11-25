import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
const root=process.cwd(), target=path.join(root,"themes/version-3");
const tmp=path.join(root,".tmp-theme-version-3");
fs.rmSync(tmp,{recursive:true,force:true});fs.mkdirSync(tmp,{recursive:true});
execFileSync("unzip",["-q",path.join(root,"Theme Version 3.zip"),"-d",tmp]);
const images=path.join(target,"assets/images"),vectors=path.join(target,"assets/vectors"),source=path.join(target,"source"),docs=path.join(target,"docs");
for(const dir of [images,vectors,source,docs])fs.mkdirSync(dir,{recursive:true});
const imageNames={
"001-beautiful-aster-flower-leaves-floral-background-1-62-6604.png":"floral-footer-background.png",
"003-image-62-6609.png":"floral-tracking-hero-background.png",
"008-blue-dart-logo-transparent-1-62-6636.png":"blue-dart-courier-logo.png",
"024-frame-7-62-6692.png":"order-details-floral-panel.png",
"025-souled-store-62-6700.png":"souled-store-gradient-heading.png",
"026-image-62-6701.png":"product-spotlight-video-poster.png",
"036-image-I62-6704-6-3179.png":"product-card-01-skincare.png",
"037-image-I62-6705-6-3179.png":"product-card-02-skincare.png",
"038-image-I62-6706-6-3179.png":"product-card-03-skincare.png",
"039-image-I62-6707-6-3179.png":"product-card-04-skincare.png",
"040-flower-drawn-continuous-line-vector-260nw-2410309501-1-62-6711.png":"floral-line-art-decoration.png",
"041-fire-1f525-1-62-6715.png":"flash-sale-fire-icon.png",
"042-300x157-twitter-1-62-6716.png":"souled-store-logo.png"
};
const copyAll=(from,to)=>{for(const name of fs.readdirSync(from)){const src=path.join(from,name);if(fs.statSync(src).isFile())fs.copyFileSync(src,path.join(to,name));}};
copyAll(path.join(tmp,"assets/images"),images);copyAll(path.join(tmp,"assets/vectors"),vectors);
for(const [oldName,newName] of Object.entries(imageNames)){const oldPath=path.join(images,oldName);if(fs.existsSync(oldPath)){fs.renameSync(oldPath,path.join(images,newName));}}
fs.copyFileSync(path.join(tmp,"code/FigmaExport.jsx"),path.join(source,"FigmaExport.jsx"));
let sourceCss=fs.readFileSync(path.join(tmp,"code/FigmaExport.css"),"utf8");
for(const [oldName,newName] of Object.entries(imageNames)){const noZero=oldName.replace(/^0+(?=\d)/,"");sourceCss=sourceCss.replaceAll(oldName,newName).replaceAll(noZero,newName);}
fs.writeFileSync(path.join(source,"FigmaExport.css"),sourceCss);
const docsMap=[
["figma-design Theme Version 3.json","figma-design.json"],
["layer-descriptions Theme Version 3.json","layer-descriptions.json"],
["layer-descriptions Theme Version 3.csv","layer-descriptions.csv"],
["figma-tokens Theme Version 3.css","figma-tokens.css"]
];
for(const [from,to] of docsMap){const p=path.join(root,from);if(fs.existsSync(p))fs.copyFileSync(p,path.join(docs,to));}
const manifest=JSON.parse(fs.readFileSync(path.join(tmp,"assets/asset-manifest.json"),"utf8"));
for(const a of manifest){a.originalName=a.name;a.name=imageNames[a.name]||a.name;}
fs.writeFileSync(path.join(docs,"asset-manifest.json"),JSON.stringify(manifest,null,2));
fs.rmSync(tmp,{recursive:true,force:true});
console.log("Version 3 assets, original source and Figma documentation prepared.");
