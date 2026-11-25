# The Souled Store — Version 3

Responsive static recreation of the supplied Figma Version 3 tracking page.

## Structure
- index.html — semantic page structure
- styles.css — responsive layout and visual styling
- app.js — demo tracking form and expandable scan history
- assets/images — supplied raster artwork, renamed descriptively
- assets/vectors — original SVG vector exports
- source — original Figma-exported React JSX and CSS
- docs — Figma design JSON, layer descriptions, tokens and asset manifest

## Interactions
- Waybill, Order ID and Mobile Number selection
- Demo tracking form validation and feedback (no courier API connected)
- In-Transit scan history expands/collapses from its info control
- Scan table supports vertical and horizontal scrolling with sticky headings

## Responsive behaviour
Desktop uses a two-column shipment summary. Tablet and mobile reflow into one column; product cards change from four columns to two. Timeline and scan history remain scrollable on narrow screens.

## Notes
Shipment details are illustrative dummy data. Live tracking requires a courier API integration. The video section uses the supplied static video-poster artwork to match the reference.
