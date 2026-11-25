# The Souled Store — Version 3

## Source of truth
This implementation is measured against the supplied Figma file **Version 3**, its layer-description CSV/JSON, design-token CSS and original React/CSS export. Desktop source frame: **1440 × 2590 px**. Desktop/tablet scales proportionally to preserve geometry; mobile uses a dedicated reflow.

## Exact Figma desktop geometry
| Component | X | Y | Width | Height |
|---|---:|---:|---:|---:|
| Page | 0 | 0 | 1440 | 2590 |
| Header | 0 | 0 | 1440 | 64 |
| Flash offer | 0 | 62 | 1440 | 68 |
| Hero image | 32 | 130 | 1379 | 449 |
| Tracking section | 64 | 627 | 1312 | 1842.84 |
| Timeline card | 64 | 695.28 | 822.59 | 643.61 |
| Shipment summary | 905.9 | 695.28 | 469.13 | 270.7 |
| Order panel | 905.9 | 985.2 | 469.13 | 231.68 |
| About heading | 64 | 1401.9 | 1312 | 90 |
| Video poster | 64 | 1523.9 | 1312 | 435 |
| Product section | 64 | 2022.9 | 1312 | 446.91 |
| Product grid | 232 | 2022.9 | 976 | 320.91 |
| Footer | 0 | 2523 | 1440 | 67 |

## Tokens
Poppins, Inter, Source Sans Pro and Montserrat; colours include #1A1A1A, #FFFFFF, #F9F9F9, #1FC16B, #FF6600, #D2D2D2 and #E8E8E8. Full token values are retained in docs/figma-tokens.css.

## Files
- index.html, styles.css, app.js — responsive web implementation
- assets/images and assets/vectors — original artwork and vectors, with descriptive image names
- source/FigmaExport.jsx and source/FigmaExport.css — original Figma code export
- docs — Figma JSON, layer descriptions, tokens and asset manifest

## Functionality
Waybill/Order ID/Mobile Number selection; demo form validation; In-Transit scan history expand/collapse; bounded vertical/horizontal table scrolling with sticky headings. Shipment values are dummy data; no courier API is connected. Video section is the supplied static poster artwork.

## Responsive behaviour
Desktop/tablet preserves the Figma 1440px geometry by proportional canvas scaling. At 640px and below, layout reflows into a single column and products use two columns.
