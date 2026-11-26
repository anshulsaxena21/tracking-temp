# Tracking Website — Version 15

## Source of truth
This theme is a separate static implementation of the supplied Figma frame **Version 15** from **PX Custom Tracking & DS Website WQ3C Aefwrds**.

- Figma frame: 1440 × 3205 px
- Figma node: 2937:9576
- Main font: Poppins
- Brand accent: #FF6600
- Success green: #1FC16B
- Runtime: plain HTML, CSS and JavaScript (no build dependency)

## Structure
- `index.html` — semantic page structure and accessible controls
- `styles.css` — responsive layout and component styling
- `app.js` — tracking-form demo behaviour and Figma asset mapping
- `assets/images/` — original raster artwork extracted from the Version 15 source bundle
- `assets/vectors/` — original SVG/vector artwork
- `assets/asset-map.json` — Figma node-to-file mapping generated from the original asset manifest
- `docs/` — Figma JSON, layer descriptions, tokens, manifest and reference screenshots when included in the source bundle
- `source/` — original Figma code export for reference only

## Sections
1. Contact header and primary navigation
2. Flash-deal announcement
3. Tracking hero with tracking-mode selector
4. Delivery summary and shipment progress
5. Tracking-history table
6. Store video/promo artwork
7. Store feature imagery
8. Product cards
9. Social and contact CTA

## Functionality and limitations
The tracking form validates input and shows a demo message. Shipment details are static sample data; no courier API is connected. The video area uses the supplied Figma poster artwork because no Version 15 video URL was specified. Product cards are visual catalogue placeholders until a real product feed or destination links are supplied.

## Responsive behaviour
Desktop follows the supplied 1440px Figma composition. Tablet adjusts the two-column tracking layout. Mobile stacks the main sections, keeps progress steps horizontally scrollable, and allows the scan-history table to scroll independently.

## Asset preparation
The GitHub Actions workflow extracts the original Version 15 bundle, preserves source asset filenames, builds the asset map from the Figma layer JSON, and copies the design documentation into this theme folder. Existing themes and source files are not modified.
