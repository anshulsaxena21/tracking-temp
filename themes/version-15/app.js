const IMAGE_BASE = "assets/images/";
const ASSET_MAP_URL = "assets/images/asset-map.json";

const directNodeAssets = {
  "2970:10543": "travel-3-1-2970-10543.png",
  "2937:10229": "blue-dart-logo-transparent-1-2937-10229.png",
  "2937:10431": "image-2937-10431.png",
  "2937:10060": "live-sell-2-1-2937-10060.png",
  "2937:10430": "image-18-2937-10430.png",
  "2937:10371": "live-sell-1-1-2937-10371.png"
};

const productNodeIds = [
  "I2937:10394;6:3170",
  "I2937:10395;6:3170",
  "I2937:10396;6:3170",
  "I2937:10397;6:3170"
];

function assetUrl(filename) {
  return IMAGE_BASE + filename.split("/").map(encodeURIComponent).join("/");
}

function applyImage(image, filename) {
  if (!image || !filename) return;
  image.src = assetUrl(filename);
  image.addEventListener("error", () => {
    image.classList.add("asset-load-error");
    console.error("Could not load Version 15 image asset:", filename);
  }, { once: true });
}

async function loadFigmaAssets() {
  let assets = [];
  try {
    const response = await fetch(ASSET_MAP_URL, { cache: "no-cache" });
    if (!response.ok) throw new Error("Asset map request failed: " + response.status);
    const manifest = await response.json();
    assets = Array.isArray(manifest.assets) ? manifest.assets : [];
  } catch (error) {
    console.error("Version 15 asset map could not be loaded.", error);
  }

  const byNodeId = new Map(assets.map(asset => [asset.nodeId, asset]));

  document.querySelectorAll("[data-asset-node]").forEach(image => {
    const nodeId = image.dataset.assetNode;
    const asset = byNodeId.get(nodeId);
    const filename = asset?.filename || directNodeAssets[nodeId];
    if (filename) applyImage(image, filename);
    else console.warn("No mapped Version 15 asset for Figma node:", nodeId);
  });

  document.querySelectorAll("[data-product-image]").forEach(image => {
    const index = Number(image.dataset.productImage);
    const asset = byNodeId.get(productNodeIds[index]);
    if (asset?.filename) {
      applyImage(image, asset.filename);
      image.alt = ["Featured product image 1", "Featured product image 2", "Featured product image 3", "Featured product image 4"][index] || "Featured product";
    } else {
      image.closest(".product-card")?.classList.add("product-card--asset-pending");
      console.warn("No mapped product image for card:", index);
    }
  });
}

const form = document.getElementById("trackingForm");
const message = document.getElementById("formMessage");
const input = document.getElementById("trackingNumber");
const modes = document.querySelectorAll('input[name="trackMode"]');
const modeLabels = { waybill: "waybill number", order: "order ID", mobile: "mobile number" };

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

loadFigmaAssets();
