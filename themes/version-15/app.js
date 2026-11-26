// Version 15 — explicit mapping to the filenames actually present in assets/images.
// The exported asset-map.json retains pre-normalized names; the committed files have
// numeric export prefixes. Keep this map aligned with the repository tree.
const IMAGE_BASE = new URL("./assets/images/", document.baseURI);

const imageAssetsByNode = {
  "2970:10543": "118-travel-3-1-2970-10543.png",
  "2937:10229": "098-blue-dart-logo-transparent-1-2937-10229.png",
  "2937:10431": "100-image-2937-10431.png",
  "2937:10060": "116-live-sell-2-1-2937-10060.png",
  "2937:10430": "117-image-18-2937-10430.png",
  "2937:10371": "110-live-sell-1-1-2937-10371.png"
};

// The four product-image exports are listed in asset-map.json but are not
// present in assets/images in the current repository commit. Do not request
// nonexistent URLs or show broken-image icons; restore these when exports arrive.
const unavailableProductNodes = [
  "I2937:10394;6:3170",
  "I2937:10395;6:3170",
  "I2937:10396;6:3170",
  "I2937:10397;6:3170"
];

function setLocalAsset(image, filename) {
  const url = new URL(filename, IMAGE_BASE);
  image.src = url.href;
  image.addEventListener("error", () => {
    image.removeAttribute("src");
    image.dataset.assetStatus = "missing";
    console.error("Version 15 asset file not found:", url.pathname);
  }, { once: true });
  image.dataset.assetStatus = "loading";
  image.addEventListener("load", () => {
    image.dataset.assetStatus = "loaded";
  }, { once: true });
}

function loadFigmaAssets() {
  document.querySelectorAll("img[data-asset-node]").forEach(image => {
    const nodeId = image.dataset.assetNode;
    const filename = imageAssetsByNode[nodeId];
    if (filename) {
      setLocalAsset(image, filename);
    } else {
      image.removeAttribute("src");
      image.dataset.assetStatus = "unmapped";
      console.warn("No exported image mapped for Figma node:", nodeId);
    }
  });

  document.querySelectorAll("img[data-product-image]").forEach(image => {
    const index = Number(image.dataset.productImage);
    const nodeId = unavailableProductNodes[index];
    image.removeAttribute("src");
    image.hidden = true;
    image.alt = "";
    image.setAttribute("aria-hidden", "true");
    image.dataset.assetStatus = "awaiting-export";
    image.closest(".product-card")?.classList.add("product-card--asset-pending");
    console.warn("Original product image export is missing from assets/images:", nodeId);
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
