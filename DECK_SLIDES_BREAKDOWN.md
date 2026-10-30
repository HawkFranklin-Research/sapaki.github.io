# Project Sapaki: Investor Deck & Content Specification

This document provides a comprehensive breakdown of **Project Sapaki**, the strategic positioning, the critical analysis and rationale, and an exact scene-by-scene content and typography inventory for every slide in the interactive scroll deck.

---

## 1. Executive Summary: What is Project Sapaki?

**Project Sapaki** is an independent, global managed marketplace, compliance, and service platform (founded under **HawkFranklin OÜ**) designed to build the **global trade rail for robotics**. It connects worldwide robotics manufacturers (across China, the United States, Vietnam, Europe, and India) directly with enterprise operators, hospitals, warehouses, retail channels, and domestic buyers globally.

Sapaki solves the fundamental cross-border bottlenecks:
1. **The Paperwork & Compliance Wall:** Eliminating the friction of multi-jurisdiction testing, certifications (CE / FCC / UL, UN 38.3 Hazmat, ISO 10218, RoHS/REACH), HS tariff classification, Extended Producer Responsibility (EPR), and Importer-of-Record liability using an AI-powered documentation audit engine.
2. **The Infrastructure Gap:** Replacing fragmented single-country reseller markups (40%+) and generic B2B listing directories (like Alibaba, which lack compliance/liability backing) with a frictionless end-to-end corridor: **Register SKU → AI Doc Engine → Clear & Ship → Commission → Local SLA**.
3. **The Trust & Service Moat:** Overcoming buyer hesitation through local, regional repair nodes backed by AI fault diagnostics and AR-guided field technician support—turning one-time cross-border hardware sales into 5-year recurring SLA revenue.

---

## 2. Reflected Understanding of Your Strategic Thinking & Critique

### What You Communicated (In Plain Terms)
You asked for an honest, human interpretation of what the Sapaki deck is actually communicating:
* **Core Business Intent:** Recognizing that Sapaki is an investor pitch presented as an interactive web page. The goal is to convince investors to fund a unified distribution and market-entry channel—a single vendor solution that solves market entry for robot makers.
* **Competitor Context:** Acknowledging that deep competitive intelligence hasn't yet been compiled on how competitors or current OEMs (e.g., Unitree, 1X, Agility) navigate Western distribution today.
* **Critique of the "Europe-First" Thesis:** Recognizing that framing Europe as the initial market purely on demographic grounds (aging population) felt too narrow and repetitive across multiple slides, and that world robotics numbers provide a far more compelling foundation.
* **Emphasis on the Repair Layer:** Pointing out that while repair facilities and post-sales support are mentioned in later slides, they are a critical differentiator and necessity.
* **Constructive Criticism:** Requesting direct, human feedback on how to make the pitch stronger, more believable, and more commercially viable—without modifying the code.

---

### The Strategic Analysis & Critique

#### 1. What's Working Well
* **The Visual Impact & Narrative Hook:** The opening line, *"The robots are ready. Global trade isn't,"* immediately commands attention.
* **Authentic Signal Proof:** The video reel featuring authentic footage from the 2026 World Humanoid Robot Games in Beijing validates that hardware has crossed the threshold from lab experiment to commercial performance across 16+ manufacturing nations.
* **The Repair & AR Technician Angle:** Identifying the repair layer as a core requirement (rather than an afterthought) is the single most defensible aspect of the business model.

#### 2. How the New Copy Solves Previous Pitfalls
* **Clear Business Model:** Sapaki is now explicitly defined as a **Managed Marketplace & Compliance Engine**—not a vague "trade agent" or passive directory.
* **Global Demand Framing:** Transitioned from isolated EU demographic stats to **$65B+ global robotics demand** blocked by 190+ fragmented customs regimes.
* **Explicit Competitor Contrast:** Directly contrasts against the 3 broken alternatives: Direct OEM sales (stranded at customs), Generic B2B portals (no compliance or liability), and Local resellers (single-country silos with 40%+ markups).
* **Elevated Service Moat:** Clarifies that buyers will not import a $20k machine without local service backup, and explicitly defines the unit economics: transforming one-time marketplace commissions into 5-year recurring SLA contracts.
* **Anchored Pre-seed Raise:** Clear $350k pre-seed tranche specifying concrete milestones across trade & policy experts, AI compliance engine build, buyer/seller acquisition, and activating the first 3 trade corridors.

#### 3. The Reframed Positioning
> **Sapaki is the "Flexport + Authorized Service Network" of Robotics**—the global trade rail connecting worldwide robotics makers to enterprise buyers, backed by AI-audited compliance and regional on-site repair networks.

---

## 3. Codebase File Directory

The entire presentation is built with Next.js (App Router) in static export mode:

| File Path | Description | URL Route |
| :--- | :--- | :--- |
| [`app/page.tsx`](file:///Users/vatsal1/Projects/web-pages/sapaki.github.io/app/page.tsx) | Minimal landing splash page linking into the deck | `/` |
| [`app/deck.html/page.tsx`](file:///Users/vatsal1/Projects/web-pages/sapaki.github.io/app/deck.html/page.tsx) | The primary investor deck source code (8 interactive scenes) | `/deck.html` |
| [`app/globals.css`](file:///Users/vatsal1/Projects/web-pages/sapaki.github.io/app/globals.css) | Complete layout styles, typography, color tokens, and responsive overrides | (Global) |
| [`app/deck.html/components/RobotMediaOrb.tsx`](file:///Users/vatsal1/Projects/web-pages/sapaki.github.io/app/deck.html/components/RobotMediaOrb.tsx) | Interactive 3D Three.js sphere with 53 media assets | Mounted on Scene 0 |
| [`app/deck.html/components/SignalVideoReel.tsx`](file:///Users/vatsal1/Projects/web-pages/sapaki.github.io/app/deck.html/components/SignalVideoReel.tsx) | Dual-video cycling media component | Mounted on Scene 1 |

---

## 4. Design System & Global Styles

* **Color Palette:**
  * `--ink`: `#07152f` (Deep Midnight Navy)
  * `--paper`: `#f5f2ea` (Warm Off-white / Cream)
  * `--blue`: `#174f9e` (Primary Corporate Royal Blue)
  * `--electric`: `#2f73dd` (Bright Electric Blue accent)
  * `--acid`: `#c8ff4a` (Fluorescent Acid Lime / Neon Accent)
  * White: `#ffffff`
* **Typography:**
  * **Headings & Body:** `Geist Sans` (`--font-geist-sans`), Fallback: `Arial, sans-serif`
  * **Eyebrows, Metadata & Figures:** `Geist Mono` (`--font-geist-mono`)

---

## 5. Scene-by-Scene Content, Layout & Typography Specification

### Persistent Global Header
* **Position:** Fixed top (`height: 74px`, mobile `62px`).
* **Left:** Sapaki Brand Lockup (116px desktop, 92px mobile). Switches between `sapaki-logo-white.png` (on dark slides) and `sapaki-logo-blue.png` (on light slides).
* **Center:** 8-Step Navigation Bar. Minimal 34px horizontal dash indicators (Opacity 0.26 normal, 0.62 seen, 1.0 active).
* **Right:**
  * `SHARE` button: `Geist Mono`, 10px, weight 650, tracking `0.12em`, uppercase.
  * Counter: `01 / 08` through `08 / 08`: `Geist Mono`, 12px, weight 600, tracking `0.08em`.

---

### Scene 0: The Opening
* **ID:** `#opening` | **Tone:** Dark (`radial-gradient(#1f5cab 0%, #0c285d 24%, #07152f 58%)`)
* **Layout:** Left-aligned text stack with floating 3D media sphere on the right.
* **Content Breakdown:**
  * **Eyebrow (Top Left):**
    * Text: `A HawkFranklin OÜ venture`
    * Font: `Geist Mono`, 11px, weight 650, uppercase, letter-spacing `0.15em`, Color: `--paper` (`#f5f2ea`).
  * **Main Title (H1 - Center Left):**
    * Text:
      ```text
      The robots
      are ready.
      Global trade isn't.
      ```
    * Emphasis: *"Global trade isn't."* styled in italics with `--acid` lime (`#c8ff4a`).
    * Font: `Geist Sans`, `clamp(4.2rem, 8.8vw, 9.4rem)`, weight 680, line-height `0.82`, letter-spacing `-0.078em`.
  * **Sub-bar Triple Line (Bottom Left):**
    * Text: `MARKETPLACE  —  COMPLIANCE  —  SERVICE`
    * Separated by 34px horizontal hairline rules (opacity 0.45).
    * Font: `Geist Mono`, `clamp(0.7rem, 1.1vw, 1rem)`, weight 600, uppercase, letter-spacing `0.09em`.
  * **Call to Action (Button):**
    * Text: `SCROLL THE CASE ↓`
    * Font: `Geist Mono`, 11px, weight 600, tracking `0.12em`, uppercase. Circular arrow badge (38px circle, 1px white border).
  * **Right Visual Stage:**
    * Component: `RobotMediaOrb` (interactive Three.js 3D sphere, textured with 53 media thumbnails, surrounded by a neon glow halo).

---

### Scene 1: The Robotics Signal
* **ID:** `#signal` | **Tone:** Light (`--paper` background `#f5f2ea`, text `--ink` `#07152f`)
* **Layout:** Two-column split: Left copy and metrics; Right dual video stage.
* **Content Breakdown:**
  * **Eyebrow (Left):**
    * Text: `01 / THE SIGNAL`
    * Font: `Geist Mono`, 11px, weight 650, uppercase, letter-spacing `0.15em`.
  * **Heading (H2 - Left):**
    * Text:
      ```text
      Innovation is everywhere.
      Distribution is nowhere.
      ```
    * Emphasis: *"Distribution is nowhere."* in `--electric` blue (`#2f73dd`).
    * Font: `Geist Sans`, `clamp(3.5rem, 6.6vw, 7.3rem)`, line-height `0.88`, letter-spacing `-0.07em`.
  * **Key Metrics (Bottom Left):**
    * Stat 1: `2,000+` (Font: `clamp(3rem, 5vw, 6rem)`, color `--blue` `#174f9e`) / Label: `DEPLOYABLE ROBOT MODELS` (`Geist Mono`, 12px).
    * Stat 2: `16+` (Font: `clamp(3rem, 5vw, 6rem)`, color `--blue` `#174f9e`) / Label: `MANUFACTURING NATIONS` (`Geist Mono`, 12px).
  * **Media Stage (Right):**
    * Dual Asymmetric Video Player:
      * Left video card: Curved corner `110px 8px 8px 8px`, running `SignalVideoReel` (robot sprint & athletics footage).
      * Right video card: Offset lower (`margin-top: 16vh`), curved corner `8px 8px 90px 8px`, running `SignalHighlightVideo`.
    * Caption: `WORLD HUMANOID ROBOT GAMES · BEIJING · 2026 · GLOBAL OEM PROOF` (`Geist Mono`, 10px, tracking `0.11em`).

---

### Scene 2: The Borderless Demand
* **ID:** `#europe` | **Tone:** Dark (`#081a38` Navy)
* **Layout:** Left heading; Right statistical demographic cards; Full-width bottom industry strip and thesis.
* **Background Decor:** Abstract world/regional radar contour with 5 pulsing coordinate nodes (`--acid` lime).
* **Content Breakdown:**
  * **Eyebrow (Left):**
    * Text: `02 / THE BORDERLESS DEMAND`
    * Font: `Geist Mono`, 11px, weight 650, uppercase.
  * **Heading (H2 - Left):**
    * Text:
      ```text
      Buyers are global.
      Borders are broken.
      ```
    * Emphasis: *"Borders are broken."* in `--acid` lime (`#c8ff4a`).
    * Font: `Geist Sans`, `clamp(3.7rem, 7vw, 8rem)`, line-height `0.86`, letter-spacing `-0.075em`.
  * **Market Facts (Right):**
    * Metric 1: `$65B+` (`--acid`, `clamp(4rem, 7vw, 8rem)`) / Label: `GLOBAL ROBOTICS DEMAND` (`Geist Mono`, 11px).
    * Metric 2: `190+` (`--acid`, `clamp(4rem, 7vw, 8rem)`) / Label: `FRAGMENTED CUSTOMS REGIMES` (`Geist Mono`, 11px).
  * **Sector Target Strip (Bottom Across):**
    * Text: `HEALTHCARE  —  LOGISTICS  —  HOSPITALITY  —  MANUFACTURING`
    * Font: `Geist Mono`, 11px, weight 650, tracking `0.1em`, uppercase, separated by hairline rules.
  * **Thesis Statement (Bottom):**
    * Text: *"A hospital in Berlin or a warehouse in Texas wants the best robot—whether it's built in Vietnam, China, or California. Today, cross-border friction blocks the sale."*
    * Font: `Geist Sans`, `clamp(1.4rem, 2.2vw, 2.5rem)`, line-height `1.1`, color `--paper`.

---

### Scene 3: The Paperwork Wall
* **ID:** `#approval` | **Tone:** Light (`--paper` `#f5f2ea`, text `--ink` `#07152f`)
* **Layout:** Full-width header and compliance workflow track bar; Split lower area (cost card left, standard badges right).
* **Content Breakdown:**
  * **Eyebrow:**
    * Text: `03 / THE PAPERWORK WALL`
    * Font: `Geist Mono`, 11px, weight 650, uppercase.
  * **Heading (H2):**
    * Text:
      ```text
      Makers know hardware.
      Not 50 customs codes.
      ```
    * Emphasis: *"Not 50 customs codes."* in `--electric` blue (`#2f73dd`).
    * Font: `Geist Sans`, `clamp(3.7rem, 7vw, 8rem)`.
  * **Process Linear Track (Across):**
    * Flow: `LIST → AI-AUDIT → CERTIFY → CLEAR CUSTOMS → DELIVER → SERVICE`
    * Font: `Geist Mono`, 14px, weight 650, tracking `0.06em`, uppercase, enclosed in a rounded pill border.
  * **Cost Callout Card (Left):**
    * Card Container: Royal Blue background (`--blue` `#174f9e`), curved border `8px 90px 8px 8px`, white text.
    * Subtitle: `COST PER NEW COUNTRY CORRIDOR` (`Geist Mono`, 10px).
    * Cost Stat: `$10k—$25k` (`Geist Sans`, `clamp(4.2rem, 7.3vw, 8.5rem)`, color `--acid` `#c8ff4a`).
    * Risk Footnote: `Plus 6 months of manual legal & customs delays per country` (`Geist Mono`, 10px).
  * **Regulatory Badges Grid (Right):**
    * Tags: `CE / FCC / UL` | `UN 38.3 Hazmat` | `HS Tariff Codes` | `ISO 10218` | `RoHS / REACH` | `Importer of Record` | `EPR` | `AI Doc Audit`
    * Style: Rounded pill badges, 1px border, `Geist Mono`, 13px, weight 650.

---

### Scene 4: The Infrastructure Gap
* **ID:** `#gap` | **Tone:** Dark (`linear-gradient(125deg, #061226, #102c59)` with 9vw grid background)
* **Layout:** Header; 3 Competitor/Channel failure cards; "What Sapaki Handles" process bar; Bottom contrasting thesis.
* **Content Breakdown:**
  * **Eyebrow:**
    * Text: `04 / THE INFRASTRUCTURE GAP`
    * Font: `Geist Mono`, 11px, weight 650, uppercase.
  * **Heading (H2):**
    * Text:
      ```text
      No global supply chain
      exists for robotics.
      ```
    * Emphasis: *"exists for robotics."* in `--acid` lime (`#c8ff4a`).
    * Font: `Geist Sans`, `clamp(3.7rem, 7vw, 8rem)`.
  * **Channel Failure Cards (3 Columns):**
    1. Channel 1: Tag: `DIRECT OEM SALES` (`--acid`, `Geist Mono`, 11px) / Title: `Stranded at customs; zero local repair` (`Geist Sans`, `clamp(1.35rem, 2vw, 2.3rem)`).
    2. Channel 2: Tag: `GENERIC B2B PORTALS` (`--acid`, `Geist Mono`, 11px) / Title: `Alibaba lists boxes, not compliance or liability` (`clamp(1.35rem, 2vw, 2.3rem)`).
    3. Channel 3: Tag: `LOCAL RESELLERS` (`--acid`, `Geist Mono`, 11px) / Title: `Single-country silos with 40%+ markups` (`clamp(1.35rem, 2vw, 2.3rem)`).
  * **What Sapaki Handles Bar:**
    * Style: Acid green perimeter border (`#c8ff4a`) with translucent green fill.
    * Columns: `WHAT SAPAKI HANDLES FOR EVERY CROSS-BORDER ORDER` (`Geist Mono`, 10px) followed by 4 solution pillars: `AI Compliance` | `Export / Import` | `B2B Escrow` | `Local Repair` (`Geist Sans`, `clamp(1rem, 1.5vw, 1.6rem)`).
  * **Bottom Comparison Statement:**
    * Left side: *"Today, a maker in Vietnam can't ship to Europe without building a logistics company."* (`Geist Sans`, `clamp(1.1rem, 1.6vw, 1.8rem)`, white).
    * Right side: *"Sapaki is the global supply chain — register once, ship anywhere."* (`Geist Mono`, 12px, uppercase, `--acid` lime).

---

### Scene 5: The Managed Marketplace
* **ID:** `#platform` | **Tone:** Light (`--paper` `#f5f2ea`, text `--ink` `#07152f`)
* **Layout:** Left heading; Right core engine emblem; Full-width 5-step operational pipeline; Bottom audience connectors.
* **Content Breakdown:**
  * **Eyebrow (Left):**
    * Text: `05 / THE MANAGED MARKETPLACE`
    * Font: `Geist Mono`, 11px, weight 650, uppercase.
  * **Heading (H2 - Left):**
    * Text:
      ```text
      List anywhere.
      Deploy everywhere.
      ```
    * Emphasis: *"Deploy everywhere."* in `--electric` blue (`#2f73dd`).
    * Font: `Geist Sans`, `clamp(3.7rem, 7vw, 8rem)`.
  * **Core Engine Emblem (Right):**
    * Container: Curved white container (`border-radius: 110px 8px 110px 8px`, drop shadow).
    * Image: Sapaki Blue Logo (`sapaki-logo-blue.png`).
    * Subtitle: `GLOBAL TRADE & COMPLIANCE ENGINE` (`Geist Mono`, 10px, `--blue` `#174f9e`).
  * **5-Stage Pipeline (Center Full-Width):**
    * Step 01: `01` (`Geist Mono`, 10px) / `Register SKU` (`Geist Sans`, `clamp(1.2rem, 2rem)`)
    * Step 02: `02` / `AI Doc Engine`
    * Step 03: `03` / `Clear & Ship`
    * Step 04: `04` / `Commission`
    * Step 05: `05` / `Local SLA`
    * Style: Connected via blue arrows (`→`), electric blue left-accent borders (`border-left: 3px solid #2f73dd`).
  * **Ecosystem Terminals (Bottom):**
    * Left: `SELLERS: REGISTER & UPLOAD SPECS (CHINA · VIETNAM · US · EU · INDIA)` (`Geist Mono`, 13px, uppercase, `--blue`).
    * Right: `BUYERS: ONE-CLICK COMPLIANT DELIVERY + LOCAL WARRANTY` (`Geist Mono`, 13px, uppercase, `--blue`).

---

### Scene 6: The Trust Moat
* **ID:** `#service` | **Tone:** Dark (`radial-gradient(#194a91, #07152f 45%)` with orbital rings)
* **Layout:** Header; Left 3-part service sequence; Right AR HUD interface visor; Bottom recurring revenue economic model.
* **Content Breakdown:**
  * **Eyebrow:**
    * Text: `06 / THE TRUST MOAT`
    * Font: `Geist Mono`, 11px, weight 650, uppercase.
  * **Heading (H2):**
    * Text:
      ```text
      Cross-border sales fail
      without local repair.
      ```
    * Emphasis: *"without local repair."* in `--acid` lime (`#c8ff4a`).
    * Font: `Geist Sans`, `clamp(3.7rem, 7vw, 8rem)`.
  * **Service Workflow Sequence (Left Column):**
    * Item 1: `01` (`--acid`, `Geist Mono`, 11px) | `Regional service nodes` (`clamp(1.5rem, 2.2rem)`) | `No shipping broken robots back across oceans` (`Geist Mono`, 10px, opacity 0.7).
    * Item 2: `02` (`--acid`) | `AI fault diagnostics` (`clamp(1.5rem, 2.2rem)`) | `Ingests any OEM manual. Pinpoints the failure.` (`Geist Mono`, 10px, opacity 0.7).
    * Item 3: `03` (`--acid`) | `AR-guided field techs` (`clamp(1.5rem, 2.2rem)`) | `Local technicians repair any global brand on-site.` (`Geist Mono`, 10px, opacity 0.7).
  * **AR Visor UI Display (Right Column):**
    * Graphic: Stylized curved visor perimeter (`border: 1px solid rgba(200,255,74,.65)`).
    * Top Bar: `MODEL + COMPONENT IDENTIFIED` (`Geist Mono`, 10px).
    * Center Core: `AI ASSISTS` (Large `clamp(2.8rem, 6rem)`, `--acid` lime) + `HUMAN CONFIRMS` (white).
    * Bottom Bar: `VERIFIED REPAIR PROCEDURE IN VIEW` (`Geist Mono`, 10px, opacity 0.72).
  * **Economic Model Rationale (Bottom):**
    * Text: *"Buyers won't import a $20k robot from overseas without local backup. Our repair network turns one-time marketplace commissions into 5-year recurring SLA revenue."*
    * Font: `Geist Sans`, `clamp(1.2rem, 1.8vw, 2rem)`, line-height `1.08`, color `--paper`.

---

### Scene 7: The Pre-Seed Build
* **ID:** `#raise` | **Tone:** Light (`--paper` `#f5f2ea`, text `--ink` `#07152f`)
* **Layout:** Header; Left investment summary box; Right 4-part horizontal capital bar; CTA link; Legal & research footer.
* **Content Breakdown:**
  * **Eyebrow:**
    * Text: `07 / THE PRE-SEED BUILD`
    * Font: `Geist Mono`, 11px, weight 650, uppercase.
  * **Heading (H2):**
    * Text:
      ```text
      Build the global
      robot trade rail.
      ```
    * Emphasis: *"robot trade rail."* in `--electric` blue (`#2f73dd`).
    * Font: `Geist Sans`, `clamp(3.7rem, 7vw, 8rem)`.
  * **Raise Box (Left):**
    * Container: Royal blue card (`--blue` `#174f9e`, curved border `8px 90px 8px 8px`, white text).
    * Subtitle: `PRE-SEED TRANCHE` (`Geist Mono`, 10px, uppercase).
    * Amount: `$350k` (`Geist Sans`, `clamp(4.8rem, 9vw, 11rem)`, color `--acid` `#c8ff4a`).
    * Internal Commitment: `HawkFranklin commits the first $10k` (`Geist Mono`, 10px).
  * **Capital Allocation Bar (Right):**
    * Total Budget: Represented as a segmented proportional bar:
      1. Segment 1 (34%, Deep Ink): `TRADE & POLICY EXPERTS` / `$55k`
      2. Segment 2 (34%, Royal Blue `#174f9e`): `AI COMPLIANCE ENGINE` / `$55k`
      3. Segment 3 (19%, Electric Blue `#2f73dd`): `BUYER/SELLER ACQUISITION` / `$30k`
      4. Segment 4 (13%, Light Blue `#79a6e2`, text dark): `FIRST 3 TRADE CORRIDORS` / `$20k`
  * **Call to Action (Button):**
    * Label: `Back the Global Rail ↗`
    * Link: `mailto:partnerships@hawkfranklin.in?subject=Sapaki%20investment`
    * Style: Pill container, dark background (`--ink`), white text, acid lime arrow (`#c8ff4a`).
  * **Footer (Bottom):**
    * Left Notice: `Sapaki × HawkFranklin OÜ · Investor concept · August 2026` (`Geist Mono`, 9px).
    * Right Collapsible (`<details>`): `Research notes` with Eurostat, ELA, and EU Directives references.
