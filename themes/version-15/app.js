const ASSET_BASE = "assets/images/";
const fallbackAssets = {
  "2970:10543": "travel-3-1-2970-10543.png",
  "2937:10431": "image-2937-10431.png",
  "2937:10430": "image-18-2937-10430.png",
  "2937:10060": "live-sell-2-1-2937-10060.png",
  "2937:10371": "live-sell-1-1-2937-10371.png",
  "2937:10229": "blue-dart-logo-transparent-1-2937-10229.png"
};

async function loadAssetMap() {
  let assets = [];
  try {
    const response = await fetch("assets/asset-map.json");
    if (response.ok) assets = (await response.json()).assets || [];
  } catch (error) {
    console.warn("Asset map is not available yet; using the original asset filenames.", error);
  }
  const byNode = new Map(assets.map(asset => [asset.nodeId, asset]));
  document.querySelectorAll("[data-asset-node]").forEach(image => {
    const nodeId = image.dataset.assetNode;
    const asset = byNode.get(nodeId);
    const src = asset?.filename || fallbackAssets[nodeId];
    if (src) image.src = ASSET_BASE + src;
  });
  const productAssets = assets
    .filter(asset => asset.format === "png" && asset.y >= 8425 && asset.y < 8772 && asset.width > 100 && asset.height > 70)
    .sort((a,b) => a.x - b.x);
  document.querySelectorAll("[data-product-image]").forEach((image, index) => {
    const asset = productAssets[index];
    if (asset) image.src = ASSET_BASE + asset.filename;
    else image.closest(".product-card")?.classList.add("product-card--asset-pending");
  });
}

const form = document.getElementById("trackingForm");
const message = document.getElementById("formMessage");
const input = document.getElementById("trackingNumber");
const modes = document.querySelectorAll('input[name="trackMode"]');
const modeLabels = {waybill:"waybill number",order:"order ID",mobile:"mobile number"};

modes.forEach(mode => mode.addEventListener("change", () => {
  input.value = "";
  input.placeholder = "Enter your " + modeLabels[mode.value];
  input.setAttribute("aria-label", "Enter your " + modeLabels[mode.value]);
  message.textContent = "";
}));

form?.addEventListener("submit", event => {
  event.preventDefault();
  const selectedMode = document.querySelector('input[name="trackMode"]:checked')?.value || "waybill";
  const value = input.value.trim();
  if (!value) {
    message.textContent = "Please enter your " + modeLabels[selectedMode] + ".";
    input.focus();
    return;
  }
  message.textContent = "Demo preview: shipment details shown below are sample data.";
});

loadAssetMap();
