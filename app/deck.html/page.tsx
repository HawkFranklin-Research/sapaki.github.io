"use client";

import { useEffect, useRef, useState } from "react";

const scenes = [
  { id: "opening", label: "Opening", tone: "dark" },
  { id: "signal", label: "The robotics signal", tone: "light" },
  { id: "europe", label: "Why Europe", tone: "dark" },
  { id: "approval", label: "The approval barrier", tone: "light" },
  { id: "gap", label: "The distribution gap", tone: "dark" },
  { id: "platform", label: "The Sapaki platform", tone: "light" },
  { id: "service", label: "The service network", tone: "dark" },
  { id: "raise", label: "The investment", tone: "light" },
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
    const data = { title: "Sapaki — Europe’s route into the robot age", text: "The independent distribution, approval and service platform for robots in Europe.", url: window.location.href };
    if (navigator.share) { try { await navigator.share(data); } catch { return; } }
    else { await navigator.clipboard.writeText(data.url); setCopied(true); window.setTimeout(() => setCopied(false), 1600); }
  };

  return (
    <main className={`sapaki-deck tone-${scenes[active].tone}`}>
      <header className="deck-header">
        <button className="brand-lockup" onClick={() => goTo(0)} aria-label="Go to the Sapaki opening"><img src="/sapaki-logo.png" alt="Sapaki" /></button>
        <nav aria-label="Investor deck sections">
          {scenes.map((scene, index) => (
            <button key={scene.id} className={index === active ? "is-active" : index < active ? "is-seen" : ""} onClick={() => goTo(index)} aria-label={`Go to ${scene.label}`} aria-current={index === active ? "step" : undefined}><span /></button>
          ))}
        </nav>
        <div className="header-actions"><button onClick={share} aria-label="Share the Sapaki investor deck">Share</button><span className="deck-count">{String(active + 1).padStart(2, "0")} / {String(scenes.length).padStart(2, "0")}</span></div>
      </header>

      <section className="deck-reel" ref={reelRef}>
        <article className={`deck-scene scene-opening ${active === 0 ? "is-active" : ""}`} id="opening">
          <div className="opening-grid" aria-hidden="true" /><div className="orbit orbit-one" aria-hidden="true" /><div className="orbit orbit-two" aria-hidden="true" />
          <div className="scene-inner opening-copy"><span className="eyebrow">A HawkFranklin OÜ venture</span><h1>The robots<br />are ready.<br /><em>Europe isn&apos;t.</em></h1><div className="opening-line"><span>Distribution</span><i /><span>Approval</span><i /><span>Service</span></div><button className="scroll-cue" onClick={() => goTo(1)}><span>Scroll the case</span><b>↓</b></button></div>
          <div className="robot-mark" aria-hidden="true"><span className="robot-head" /><span className="robot-body" /><i className="robot-arm arm-left" /><i className="robot-arm arm-right" /><i className="robot-leg leg-left" /><i className="robot-leg leg-right" /><b>01</b></div>
        </article>

        <article className={`deck-scene scene-signal ${active === 1 ? "is-active" : ""}`} id="signal">
          <div className="scene-inner signal-layout"><div className="signal-copy"><span className="eyebrow">01 / The signal</span><h2>Robotics is no longer a promise.<br /><em>It is a performance.</em></h2></div><div className="media-stage" aria-label="Reserved media area for World Humanoid Robot Games photography"><div className="media-crop crop-run"><b>X MEDIA SLOT</b><span>RUNNING</span></div><div className="media-crop crop-play"><b>X MEDIA SLOT</b><span>FOOTBALL</span></div><div className="media-caption">WORLD HUMANOID ROBOT GAMES · BEIJING · 2026</div></div><div className="signal-numbers"><strong>2,000+</strong><span>humanoid robots</span><strong>16</strong><span>countries</span></div></div>
        </article>

        <article className={`deck-scene scene-europe ${active === 2 ? "is-active" : ""}`} id="europe">
          <div className="europe-map" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <div className="scene-inner europe-layout"><div className="europe-heading"><span className="eyebrow">02 / Why Europe</span><h2>Europe needs<br /><em>more hands.</em></h2></div><div className="europe-facts"><article><strong>44.9</strong><span>EU median age</span></article><article><strong>21.6%</strong><span>already 65+</span></article></div><div className="workforce-line"><span>Healthcare</span><i /><span>Logistics</span><i /><span>Hospitality</span><i /><span>Skilled trades</span></div><p>Migration remains essential. Robotics adds capacity where shortages stay structural.</p></div>
        </article>

        <article className={`deck-scene scene-approval ${active === 3 ? "is-active" : ""}`} id="approval">
          <div className="scene-inner approval-layout"><header><span className="eyebrow">03 / The barrier</span><h2>The machine may be ready.<br /><em>The market entry is not.</em></h2></header><div className="approval-track" aria-label="EU robot market entry requirements"><span>Classify</span><i>→</i><span>Test</span><i>→</i><span>Document</span><i>→</i><span>Register</span><i>→</i><span>Import</span><i>→</i><span>Support</span></div><div className="approval-cost"><span>Indicative first robot SKU</span><strong>€7k—€15k</strong><b>€25k+ when redesign and retesting enter the loop</b></div><div className="approval-tags"><span>EN 71</span><span>EN 62115</span><span>RED</span><span>RoHS / REACH</span><span>UN 38.3</span><span>CE / DoC</span><span>EPR</span><span>Customs</span></div></div>
        </article>

        <article className={`deck-scene scene-gap ${active === 4 ? "is-active" : ""}`} id="gap">
          <div className="gap-grid" aria-hidden="true" /><div className="scene-inner gap-layout"><header><span className="eyebrow">04 / The gap</span><h2>Europe has robot sellers.<br /><em>It lacks a shared route in.</em></h2></header><div className="market-columns"><article><span>BRAND ROUTES</span><strong>Unitree Europe</strong><b>One manufacturer</b></article><article><span>PRO / RESEARCH</span><strong>Generation Robots</strong><b>Specialist buyers</b></article><article><span>MARKETPLACE</span><strong>RobotShop</strong><b>Broad catalogue</b></article><article><span>SERVICE ROBOTS</span><strong>United Robotics Group</strong><b>Business deployments</b></article></div><div className="gap-statement"><span>Each new manufacturer still repeats the same work:</span><strong>approval · localisation · retail · service</strong></div></div>
        </article>

        <article className={`deck-scene scene-platform ${active === 5 ? "is-active" : ""}`} id="platform">
          <div className="scene-inner platform-layout"><header><span className="eyebrow">05 / Sapaki</span><h2>One platform.<br /><em>Many robot makers.</em></h2></header><div className="platform-core"><img src="/sapaki-logo.png" alt="Sapaki" /><span>EU MARKET OPERATING LAYER</span></div><div className="platform-flow"><div><span>01</span><strong>Select</strong></div><i>→</i><div><span>02</span><strong>Qualify</strong></div><i>→</i><div><span>03</span><strong>Import</strong></div><i>→</i><div><span>04</span><strong>Distribute</strong></div><i>→</i><div><span>05</span><strong>Support</strong></div></div><div className="platform-ends"><span>Diverse global manufacturers</span><span>European retailers · operators · homes</span></div></div>
        </article>

        <article className={`deck-scene scene-service ${active === 6 ? "is-active" : ""}`} id="service">
          <div className="service-rings" aria-hidden="true"><i /><i /><i /></div><div className="scene-inner service-layout"><header><span className="eyebrow">06 / The second network</span><h2>Every robot sold<br />creates a <em>service future.</em></h2></header><div className="service-sequence"><article className="service-step step-one"><span>01</span><strong>Local repair hubs</strong><b>Parts · diagnostics · accountable service</b></article><article className="service-step step-two"><span>02</span><strong>AI-guided diagnosis</strong><b>See the fault. Retrieve the procedure.</b></article><article className="service-step step-three"><span>03</span><strong>AR-assisted humans</strong><b>Expert guidance inside the technician&apos;s view.</b></article></div><div className="ar-visor" aria-label="Conceptual AR repair interface"><span>FAULT / LEFT KNEE ACTUATOR</span><b>STEP 04 / TORQUE 2.4 NM</b><i>87%</i></div><p>The EU seller carries a minimum two-year legal guarantee. Local repair is infrastructure, not an add-on.</p></div>
        </article>

        <article className={`deck-scene scene-raise ${active === 7 ? "is-active" : ""}`} id="raise">
          <div className="scene-inner raise-layout"><header><span className="eyebrow">07 / The first build</span><h2>Build Europe&apos;s<br /><em>robot route now.</em></h2></header><div className="raise-number"><span>Seeking</span><strong>$150k</strong><b>HawkFranklin commits the first $10k</b></div><div className="capital-bar" aria-label="Indicative use of initial 160 thousand dollars"><i style={{"--share":"34%"} as React.CSSProperties}><span>Team</span><b>$55k</b></i><i style={{"--share":"34%"} as React.CSSProperties}><span>Approval + pilot stock</span><b>$55k</b></i><i style={{"--share":"19%"} as React.CSSProperties}><span>Market route</span><b>$30k</b></i><i style={{"--share":"13%"} as React.CSSProperties}><span>Service pilot</span><b>$20k</b></i></div><a className="invest-link" href="mailto:partnerships@hawkfranklin.in?subject=Sapaki%20investment">Connect with Sapaki <span>↗</span></a><footer><span>Sapaki × HawkFranklin OÜ · Investor concept · August 2026</span><details><summary>Research notes</summary><div><a href="https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20260213-2" target="_blank" rel="noreferrer">Eurostat age</a><a href="https://ec.europa.eu/eurostat/statistics-explained/SEPDF/cache/1271.pdf" target="_blank" rel="noreferrer">EU population</a><a href="https://www.ela.europa.eu/en/publications/labour-shortages-and-surpluses-europe-2025" target="_blank" rel="noreferrer">ELA shortages</a><a href="https://single-market-economy.ec.europa.eu/sectors/toys/placing-toys-eu-market_en" target="_blank" rel="noreferrer">EU toy access</a><a href="https://europa.eu/youreurope/business/selling-in-eu/consumer-contracts-guarantees/consumer-guarantees/index_en.htm" target="_blank" rel="noreferrer">EU guarantee</a></div></details></footer></div>
        </article>
      </section>
      <div className={`deck-toast ${copied ? "show" : ""}`} role="status">Link copied</div>
    </main>
  );
}
