"use client";

import { useEffect, useRef, useState } from "react";
import RobotMediaOrb from "./components/RobotMediaOrb";
import SignalHighlightVideo from "./components/SignalHighlightVideo";
import SignalVideoReel from "./components/SignalVideoReel";

const scenes = [
  { id: "opening", label: "Opening", tone: "dark" },
  { id: "signal", label: "The robotics signal", tone: "light" },
  { id: "europe", label: "The borderless demand", tone: "dark" },
  { id: "approval", label: "The paperwork wall", tone: "light" },
  { id: "gap", label: "The infrastructure gap", tone: "dark" },
  { id: "platform", label: "The managed marketplace", tone: "light" },
  { id: "service", label: "The trust moat", tone: "dark" },
  { id: "raise", label: "The pre-seed build", tone: "light" },
];

export default function SapakiDeck() {
  const reelRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const goTo = (index: number) => {
    const next = Math.max(0, Math.min(index, scenes.length - 1));
    reelRef.current?.querySelectorAll<HTMLElement>(".deck-scene")[next]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const reel = reelRef.current;
    if (!reel) return;
    const panels = Array.from(reel.querySelectorAll<HTMLElement>(".deck-scene"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = panels.indexOf(visible.target as HTMLElement);
        setActive(index);
        window.history.replaceState(null, "", `#${scenes[index].id}`);
      },
      { root: reel, threshold: [0.48, 0.68, 0.82] },
    );
    panels.forEach((panel) => observer.observe(panel));

    const onKey = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement)?.closest("a,button,summary,input,textarea,select")) return;
      if (["ArrowDown", "PageDown", " "].includes(event.key)) { event.preventDefault(); goTo(active + 1); }
      if (["ArrowUp", "PageUp"].includes(event.key)) { event.preventDefault(); goTo(active - 1); }
      if (event.key === "Home") { event.preventDefault(); goTo(0); }
      if (event.key === "End") { event.preventDefault(); goTo(scenes.length - 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => { observer.disconnect(); window.removeEventListener("keydown", onKey); };
  }, [active]);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const index = scenes.findIndex((scene) => scene.id === hash);
    if (index > 0) requestAnimationFrame(() => goTo(index));
  }, []);

  const share = async () => {
    const data = { title: "Sapaki — The global robot trade rail", text: "The global managed marketplace, compliance and service platform for robotics.", url: window.location.href };
    if (navigator.share) { try { await navigator.share(data); } catch { return; } }
    else { await navigator.clipboard.writeText(data.url); setCopied(true); window.setTimeout(() => setCopied(false), 1600); }
  };

  return (
    <main className={`sapaki-deck tone-${scenes[active].tone}`}>
      <header className="deck-header">
        <button className="brand-lockup" onClick={() => goTo(0)} aria-label="Go to the Sapaki opening">
          <img className="logo-on-light" src="/sapaki-logo-blue.png" alt="Sapaki" />
          <img className="logo-on-dark" src="/sapaki-logo-white.png" alt="" aria-hidden="true" />
        </button>
        <nav aria-label="Investor deck sections">
          {scenes.map((scene, index) => (
            <button key={scene.id} className={index === active ? "is-active" : index < active ? "is-seen" : ""} onClick={() => goTo(index)} aria-label={`Go to ${scene.label}`} aria-current={index === active ? "step" : undefined}><span /></button>
          ))}
        </nav>
        <div className="header-actions"><button onClick={share} aria-label="Share the Sapaki investor deck">Share</button><span className="deck-count">{String(active + 1).padStart(2, "0")} / {String(scenes.length).padStart(2, "0")}</span></div>
      </header>

      <section className="deck-reel" ref={reelRef}>
        <article className={`deck-scene scene-opening ${active === 0 ? "is-active" : ""}`} id="opening">
          <div className="opening-grid" aria-hidden="true" />
          <div className="scene-inner opening-copy"><span className="eyebrow">A HawkFranklin OÜ venture</span><h1>The robots<br />are ready.<br /><em>Global trade isn&apos;t.</em></h1><div className="opening-line"><span>Marketplace</span><i /><span>Compliance</span><i /><span>Service</span></div><button className="scroll-cue" onClick={() => goTo(1)}><span>Scroll the case</span><b>↓</b></button></div>
          <RobotMediaOrb active={active === 0} />
        </article>

        <article className={`deck-scene scene-signal ${active === 1 ? "is-active" : ""}`} id="signal">
          <div className="scene-inner signal-layout"><div className="signal-copy"><span className="eyebrow">01 / The signal</span><h2>Innovation is everywhere.<br /><em>Distribution is nowhere.</em></h2></div><div className="media-stage" aria-label="World Humanoid Robot Games media"><div className="media-crop crop-run"><SignalVideoReel active={active === 1} /></div><div className="media-crop crop-play"><SignalHighlightVideo active={active === 1} /></div><div className="media-caption">WORLD HUMANOID ROBOT GAMES · BEIJING · 2026 · GLOBAL OEM PROOF</div></div><div className="signal-numbers"><strong>2,000+</strong><span>deployable robot models</span><strong>16+</strong><span>manufacturing nations</span></div></div>
        </article>

        <article className={`deck-scene scene-europe ${active === 2 ? "is-active" : ""}`} id="europe">
          <div className="europe-map" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <div className="scene-inner europe-layout"><div className="europe-heading"><span className="eyebrow">02 / The borderless demand</span><h2>Buyers are global.<br /><em>Borders are broken.</em></h2></div><div className="europe-facts"><article><strong>$65B+</strong><span>global robotics demand</span></article><article><strong>190+</strong><span>fragmented customs regimes</span></article></div><div className="workforce-line"><span>Healthcare</span><i /><span>Logistics</span><i /><span>Hospitality</span><i /><span>Manufacturing</span></div><p>A hospital in Berlin or a warehouse in Texas wants the best robot—whether it&apos;s built in Vietnam, China, or California. Today, cross-border friction blocks the sale.</p></div>
        </article>

        <article className={`deck-scene scene-approval ${active === 3 ? "is-active" : ""}`} id="approval">
          <div className="scene-inner approval-layout"><header><span className="eyebrow">03 / The paperwork wall</span><h2>Makers know hardware.<br /><em>Not 50 customs codes.</em></h2></header><div className="approval-track" aria-label="Global robot trade and compliance workflow"><span>List</span><i>→</i><span>AI-Audit</span><i>→</i><span>Certify</span><i className="mobile-break">→</i><span>Clear Customs</span><i>→</i><span>Deliver</span><i>→</i><span>Service</span></div><div className="approval-cost"><span>Cost per new country corridor</span><strong>$10k—$25k</strong><b>Plus 6 months of manual legal &amp; customs delays per country</b></div><div className="approval-tags"><span>CE / FCC / UL</span><span>UN 38.3 Hazmat</span><span>HS Tariff Codes</span><span>ISO 10218</span><span>RoHS / REACH</span><span>Importer of Record</span><span>EPR</span><span>AI Doc Audit</span></div></div>
        </article>

        <article className={`deck-scene scene-gap ${active === 4 ? "is-active" : ""}`} id="gap">
          <div className="gap-grid" aria-hidden="true" /><div className="scene-inner gap-layout"><header><span className="eyebrow">04 / The infrastructure gap</span><h2>No global supply chain<br /><em>exists for robotics.</em></h2></header><div className="maker-streams"><article><span>DIRECT OEM SALES</span><strong>Stranded at customs; zero local repair</strong></article><article><span>GENERIC B2B PORTALS</span><strong>Alibaba lists boxes, not compliance or liability</strong></article><article><span>LOCAL RESELLERS</span><strong>Single-country silos with 40%+ markups</strong></article></div><div className="entry-wall"><span>WHAT SAPAKI HANDLES FOR EVERY CROSS-BORDER ORDER</span><strong>AI Compliance</strong><strong>Export / Import</strong><strong>B2B Escrow</strong><strong>Local Repair</strong></div><div className="gap-statement"><span>Today, a maker in Vietnam can&apos;t ship to Europe without building a logistics company.</span><strong>Sapaki is the global supply chain — register once, ship anywhere.</strong></div></div>
        </article>

        <article className={`deck-scene scene-platform ${active === 5 ? "is-active" : ""}`} id="platform">
          <div className="scene-inner platform-layout"><header><span className="eyebrow">05 / The managed marketplace</span><h2>List anywhere.<br /><em>Deploy everywhere.</em></h2></header><div className="platform-core"><img src="/sapaki-logo-blue.png" alt="Sapaki" /><span>GLOBAL TRADE &amp; COMPLIANCE ENGINE</span></div><div className="platform-flow"><div><span>01</span><strong>Register SKU</strong></div><i>→</i><div><span>02</span><strong>AI Doc Engine</strong></div><i>→</i><div><span>03</span><strong>Clear &amp; Ship</strong></div><i>→</i><div><span>04</span><strong>Commission</strong></div><i>→</i><div><span>05</span><strong>Local SLA</strong></div></div><div className="platform-ends"><span>Sellers: register &amp; upload specs (China · Vietnam · US · EU · India)</span><span>Buyers: one-click compliant delivery + local warranty</span></div></div>
        </article>

        <article className={`deck-scene scene-service ${active === 6 ? "is-active" : ""}`} id="service">
          <div className="service-rings" aria-hidden="true"><i /><i /><i /></div><div className="scene-inner service-layout"><header><span className="eyebrow">06 / The trust moat</span><h2>Cross-border sales fail<br /><em>without local repair.</em></h2></header><div className="service-sequence"><article className="service-step step-one"><span>01</span><strong>Regional service nodes</strong><b>No shipping broken robots back across oceans</b></article><article className="service-step step-two"><span>02</span><strong>AI fault diagnostics</strong><b>Ingests any OEM manual. Pinpoints the failure.</b></article><article className="service-step step-three"><span>03</span><strong>AR-guided field techs</strong><b>Local technicians repair any global brand on-site.</b></article></div><div className="ar-visor" aria-label="Conceptual AR repair interface"><span>MODEL + COMPONENT IDENTIFIED</span><b>VERIFIED REPAIR PROCEDURE IN VIEW</b><i>AI ASSISTS</i><em>HUMAN CONFIRMS</em></div><p>Buyers won&apos;t import a $20k robot from overseas without local backup. Our repair network turns one-time marketplace commissions into 5-year recurring SLA revenue.</p></div>
        </article>

        <article className={`deck-scene scene-raise ${active === 7 ? "is-active" : ""}`} id="raise">
          <div className="scene-inner raise-layout"><header><span className="eyebrow">07 / The pre-seed build</span><h2>Build the global<br /><em>robot trade rail.</em></h2></header><div className="raise-number"><span>Pre-seed tranche</span><strong>$350k</strong><b>HawkFranklin commits the first $10k</b></div><div className="capital-bar" aria-label="Indicative use of initial 160 thousand dollars"><i style={{"--share":"34%"} as React.CSSProperties}><span>Trade &amp; policy experts</span><b>$55k</b></i><i style={{"--share":"34%"} as React.CSSProperties}><span>AI compliance engine</span><b>$55k</b></i><i style={{"--share":"19%"} as React.CSSProperties}><span>Buyer/seller acquisition</span><b>$30k</b></i><i style={{"--share":"13%"} as React.CSSProperties}><span>First 3 trade corridors</span><b>$20k</b></i></div><a className="invest-link" href="mailto:partnerships@hawkfranklin.in?subject=Sapaki%20investment">Back the Global Rail <span>↗</span></a><footer><span>Sapaki × HawkFranklin OÜ · Investor concept · August 2026</span><a className="dd-deck-link" href="/diligence.html#why-now">Execution &amp; diligence deck ↗</a><details><summary>Research notes</summary><div><a href="https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20260213-2" target="_blank" rel="noreferrer">Eurostat age</a><a href="https://ec.europa.eu/eurostat/statistics-explained/SEPDF/cache/1271.pdf" target="_blank" rel="noreferrer">EU population</a><a href="https://www.ela.europa.eu/en/publications/labour-shortages-and-surpluses-europe-2025" target="_blank" rel="noreferrer">ELA shortages</a><a href="https://single-market-economy.ec.europa.eu/sectors/toys/placing-toys-eu-market_en" target="_blank" rel="noreferrer">EU toy access</a><a href="https://europa.eu/youreurope/business/selling-in-eu/consumer-contracts-guarantees/consumer-guarantees/index_en.htm" target="_blank" rel="noreferrer">EU guarantee</a></div></details></footer></div>
        </article>
      </section>
      <div className={`deck-toast ${copied ? "show" : ""}`} role="status">Link copied</div>
    </main>
  );
}
