(() => {
  const ASSETS = {
    "offer-fire-icon.png": "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/11016fae-7d90-40f3-b2ae-aba6db56756a",
    "hero-campaign-background.png": "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/384691f1-d93b-41c3-874a-d8358d9c2b76",
    "courier-blue-dart-logo.png": "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/0c93cf9f-9fd4-4a92-a919-b72b08af1806",
    "shopping-bag-illustration.png": "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/83b7c5bb-a4c2-4d8c-806e-63b87a521b3a",
    "product-navy-tshirt.png": "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/3865ed56-4a3b-4735-a439-7c7049c828e2",
    "product-black-graphic-tshirt.png": "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/e9992b34-b312-47b4-9dd7-7a40a824307f",
    "product-cream-tshirt.png": "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/01170749-d3fc-4c2f-81dc-8a0b388d5c40",
    "product-navy-polo-shirt.png": "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/e663eeb6-a9a5-4958-94d0-264208b84fff",
    "bottom-campaign-banner.png": "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/be907326-07b9-4e7f-a308-77d66acf9a1f"
  };

  function setMessage(message, isError = false) {
    const node = document.querySelector(".form-message");
    if (!node) return;
    node.textContent = message;
    node.style.color = isError ? "#b42318" : "#1FC16B";
  }

  function setupTrackingModes() {
    const modes = [...document.querySelectorAll(".mode")];
    const input = document.getElementById("trackingValue");
    const placeholders = { waybill: "Enter your waybill number", order: "Enter your order ID", mobile: "Enter your mobile number" };
    modes.forEach((button) => button.addEventListener("click", () => {
      modes.forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-selected", String(active));
        const icon = item.querySelector("i");
        if (icon) icon.className = active ? "ph-fill ph-check-circle" : "ph ph-circle";
      });
      input.placeholder = placeholders[button.dataset.mode] || placeholders.waybill;
      input.value = "";
      input.focus();
      setMessage("");
    }));
  }

  function setupHistoryToggle() {
    const toggle = document.querySelector(".history-toggle");
    const panel = document.getElementById("historyPanel");
    if (!toggle || !panel) return;

    toggle.addEventListener("click", () => {
      const isExpanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isExpanded));
      toggle.setAttribute(
        "aria-label",
        isExpanded ? "Show in-transit scan history" : "Hide in-transit scan history"
      );
      panel.hidden = isExpanded;
    });
  }

  function setupForm() {
    const form = document.getElementById("trackingForm");
    const input = document.getElementById("trackingValue");
    if (!form || !input) return;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = input.value.trim();
      const mode = document.querySelector(".mode.active")?.dataset.mode || "waybill";
      if (!value) {
        setMessage("Please enter your tracking details.", true);
        input.focus();
        return;
      }
      if (mode === "mobile" && !/^[+\\d][\\d\\s-]{7,14}$/.test(value)) {
        setMessage("Please enter a valid mobile number.", true);
        input.focus();
        return;
      }
      if (mode !== "mobile" && value.length < 4) {
        setMessage("Please enter at least 4 characters.", true);
        input.focus();
        return;
      }
      setMessage("Demo preview only: connect your courier tracking API to retrieve real shipment updates.");
      document.querySelector(".tracking-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function loadDesignAssets() {
    const missing = [];
    const status = document.getElementById("assetStatus");
    const jobs = [];
    document.querySelectorAll("[data-asset]").forEach((element) => {
      const filename = element.dataset.asset.split("/").pop();
      const url = ASSETS[filename];
      if (!url) {
        missing.push(filename);
        return;
      }
      element.src = url;
      element.addEventListener("error", () => {
        missing.push(filename);
        element.classList.add("asset-missing");
        if (status) {
          status.textContent = "Could not load: " + [...new Set(missing)].join(", ");
          status.classList.add("show");
        }
      }, { once: true });
      element.addEventListener("load", () => element.classList.add("asset-loaded"), { once: true });
    });
    document.querySelectorAll("[data-bg]").forEach((element) => {
      const filename = element.dataset.bg.split("/").pop();
      const url = ASSETS[filename];
      if (!url) {
        missing.push(filename);
        return;
      }
      const probe = new Image();
      probe.onload = () => {
        element.style.backgroundImage = "url('" + url + "')";
        element.classList.add("asset-loaded");
      };
      probe.onerror = () => {
        missing.push(filename);
        if (status) {
          status.textContent = "Could not load: " + [...new Set(missing)].join(", ");
          status.classList.add("show");
        }
      };
      probe.src = url;
    });
    if (status && missing.length) {
      status.textContent = "Missing asset mapping: " + [...new Set(missing)].join(", ");
      status.classList.add("show");
    }
  }

  setupTrackingModes();
  setupHistoryToggle();
  setupForm();
  loadDesignAssets();
})();