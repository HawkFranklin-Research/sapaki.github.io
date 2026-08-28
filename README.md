# Sapaki — Europe’s Route into the Robot Age

**Sapaki** is a specialized consumer-robotics market-entry, distribution, approval, and lifecycle service platform connecting global robotics manufacturers with European and Western markets.

A **HawkFranklin OÜ** venture.

---

## 🚀 Overview

- **Platform Focus**: Independent European distribution, compliance certification, and post-sales maintenance network for the emerging generation of affordable humanoid and consumer robots.
- **Investor Deck**: An interactive full-screen scroll deck located at `/deck.html#opening`.
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
