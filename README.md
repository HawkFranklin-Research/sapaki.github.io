# Sapaki — Europe’s Route into the Robot Age

**Sapaki** is a specialized consumer-robotics market-entry, distribution, approval, and lifecycle service platform connecting global robotics manufacturers with European and Western markets.

A **HawkFranklin OÜ** venture.

---

## 🚀 Overview

- **Platform Focus**: Independent European distribution, compliance certification, and post-sales maintenance network for the emerging generation of affordable humanoid and consumer robots.
- **Investor Deck**: An interactive full-screen scroll deck located at `/deck.html#opening`.
- **Execution & Diligence Deck**: Ten independent scroll scenes at `/diligence.html#why-now`, linked from the investor deck’s final scene beside Research notes. Includes interactive corridor, customs, battery, service and economics diagrams; technical assumptions and sources expand within each scene.
- **Media & Demonstration**: Curated original high-resolution stills and video captures from global robotics events (including the 2026 World Humanoid Robot Games).

---

## 🛠 Tech Stack

- **Framework**: Next.js (App Router) & TypeScript
- **Styling**: Tailwind CSS & Vanilla CSS (Fluid scroll snapping, CSS grid layouts, mobile animations)
- **Deployment**: GitHub Pages / Cloudflare Pages

---

## 📦 Project Structure

```
├── app/
│   ├── deck.html/       # Investor scroll deck (8 interactive scenes)
│   ├── diligence.html/  # Partner diligence deck (10 scenes, content in DiligenceDeck.tsx)
│   ├── globals.css      # Deck typography, snap scrolling, AR visor & responsive rules
│   ├── layout.tsx       # Metadata, OG tags & fonts
│   └── page.tsx         # Entry page route to investor deck
├── public/
│   ├── images/          # High-resolution robot athletics & competition stills
│   ├── videos/          # Video clips (sprints, football, boxing, fails, ceremonies)
│   ├── sapaki-logo*.png # Transparent brand logo assets
│   └── og.png           # Social share image
└── package.json
```

---

## 💻 Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` or `http://localhost:3000/deck.html#opening`.

The diligence deck is at `http://localhost:3000/diligence.html#why-now`.
Its full scene copy is in `app/diligence.html/DiligenceDeck.tsx`; its scoped styling is in `app/diligence.html/diligence.css`.

`npm run build` also runs `scripts/finalize-static-export.mjs` to create index documents inside Next’s `.html` route directories. This preserves the existing public URLs on GitHub Pages, which may redirect them to a trailing slash. The diligence economics are planning scenarios; the current raise is $350k plus HawkFranklin’s $10k, while the report’s $118.5k pilot is a narrower scenario.
