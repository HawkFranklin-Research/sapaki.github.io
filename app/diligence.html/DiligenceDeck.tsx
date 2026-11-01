"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export const chapters = [
  ["why-now", "The deadline"], ["corridors", "Where we start"], ["customs", "What is it called?"],
  ["liability", "Who is responsible?"], ["batteries", "The battery"], ["engine", "Software + people"],
  ["after-sale", "After the sale"], ["competition", "Who else is here"], ["economics", "How we earn"], ["execution", "The first 20 orders"],
];
export const sources = {
  pld: "https://eur-lex.europa.eu/eli/dir/2024/2853/oj/eng",
  machinery: "https://eur-lex.europa.eu/eli/reg/2023/1230/oj/eng",
  cbp: "https://rulings.cbp.gov/ruling/N356154",
  origin: "https://www.cbp.gov/trade/rulings",
  batteries: "https://www.iata.org/en/programs/cargo/dgr/lithium-batteries/",
  summary: "https://www.phmsa.dot.gov/sites/phmsa.dot.gov/files/2024-09/Lithium-Battery-Test-Summary-2024.pdf",
  gb: "https://www.gov.uk/guidance/placing-manufactured-goods-on-the-market-in-great-britain",
  robotlab: "https://www.robotlab.com/",
  qviro: "https://qviro.com/",
  robotshop: "https://www.robotshop.com/",
  generation: "https://www.generationrobots.com/",
};

function Detail({ title = "Rules, numbers & sources", children }: { title?: string; children: ReactNode }) {
  return <details className="dd-detail"><summary>For the diligence team · {title}<span aria-hidden="true">＋</span></summary><div className="dd-detail-body">{children}</div></details>;
}
function Story({ children }: { children: ReactNode }) {
  return <p className="dd-story">{children}</p>;
}
function Source({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noreferrer">{children} ↗</a>;
}
function Heading({ index, title, accent }: { index: number; title: string; accent: string }) {
  return <header className="dd-heading"><span className="eyebrow">{String(index + 1).padStart(2, "0")} / {chapters[index][1]}</span><h1 hidden={index !== 0}>{index === 0 ? <>{title}<br /><em>{accent}</em></> : null}</h1>{index !== 0 && <h2>{title}<br /><em>{accent}</em></h2>}</header>;
}
const corridors = [
  { route: "China / Vietnam → Europe", label: "First road", supply: "Shenzhen · Hangzhou · Suzhou · Haiphong", demand: "Germany / Benelux", gate: "A complete safety file that the buyer's country accepts.", why: "Hotels, warehouses and cleaning teams in Germany and the Benelux want robots now. We start with the businesses that need them and make one file work again and again.", tags: ["Safety mark (CE)", "Radio approval", "Importer ID (EORI)", "Local repair"] },
  { route: "Vietnam / Korea → United States", label: "Second road", supply: "Qualified makers in Vietnam and South Korea", demand: "Texas / California", gate: "Proof of where it's made, radio approval and the right workplace-safety listing.", why: "The US charges different import duties depending on where a robot is truly made. We prove the origin first, then quote the real cost.", tags: ["Proof of origin", "Radio (FCC)", "Workplace safety", "US customs broker"] },
  { route: "Vetted makers → Gulf", label: "Later", supply: "Robot models we have already checked", demand: "Saudi Arabia / UAE", gate: "Approvals filed before shipping, through a registered local importer.", why: "Saudi Arabia and the UAE want product approvals before the robot ships. Missing paperwork can leave the container waiting at the port. Each country has its own rules.", tags: ["Saudi SABER", "Local importer", "UAE approvals", "Check before shipping"] },
];
const serviceTiers = [
  { name: "Fix it remotely", share: "55–65%", title: "Solved before anyone travels.", body: "Check the robot's logs, maps and sensors from afar, and send a careful software fix. Safety-related changes always get a person's approval first.", location: "AI triage + a remote engineer", detail: "Planning target for ticket resolution; validate against the first deployed fleet. No automatic safety-critical OTA changes." },
  { name: "Swap the part", share: "25%", title: "Swap the module, not the robot.", body: "Spare motors, controllers, sensors and batteries stored near the robots, so a replacement arrives the next business day where stocked.", location: "Rotterdam / Frankfurt · Dallas", detail: "Proposed LRU stock buffer: 5–10%. Exchange eligibility depends on inventory, geography, dangerous-goods handling and service contract." },
  { name: "Send a technician", share: "10–20%", title: "Send the right person.", body: "A trained local technician follows the maker's approved steps, with AR guidance, to repair the robot and put it back to work on site.", location: "Trained technicians in each region", detail: "Proposed training: Level 1 ≈4 hours per model; Level 2 ≈50 hours; Level 3 ≈130 hours. These are training design targets, not an external certification." },
];

function CorridorGraphic() {
  const [selected, setSelected] = useState(0);
  const corridor = corridors[selected];
  return <div className="dd-corridor"><div className="dd-tabs" role="group" aria-label="Select a trade corridor">{corridors.map((c, i) => <button key={c.route} aria-pressed={selected === i} onClick={() => setSelected(i)}>{String(i + 1).padStart(2, "0")} / {c.label}</button>)}</div><div className="dd-route" aria-hidden="true"><div><i /><b>MAKER</b></div><span className="dd-rail"><i /><i /><i /></span><div className="dd-route-core">SAPAKI</div><span className="dd-rail"><i /><i /><i /></span><div><i /><b>BUYER</b></div></div><div className="dd-route-copy" aria-live="polite"><span className="dd-kicker">{corridor.supply}</span><h3>{corridor.route}</h3><p>{corridor.why}</p><div className="dd-tags">{corridor.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="dd-route-gate"><span>To enter {corridor.demand}</span><strong>{corridor.gate}</strong></div></div></div>;
}
function CustomsGraphic() {
  const [kind, setKind] = useState("humanoid");
  const routes = { humanoid: ["Humanoid or four-legged", "8479.89?", "Customs looks at what the robot actually does. One past US ruling placed humanoids and four-legged robots here, but it covers one specific model, not every robot like it."], handling: ["Warehouse mover", "8428?", "A robot that lifts and carries goods may belong under a different heading. A customs broker confirms the exact line before anything ships."], cleaning: ["Cleaning robot", "8508 / 8479?", "A cleaning machine's main job decides its heading. We describe it exactly as it is, and we never drop a real feature to get a lower tax."] };
  const choice = routes[kind as keyof typeof routes];
  return <div className="dd-customs"><div className="dd-tabs" role="group" aria-label="Choose a robot type">{Object.entries(routes).map(([key, value]) => <button key={key} aria-pressed={key === kind} onClick={() => setKind(key)}>{value[0]}</button>)}</div><div className="dd-customs-path"><div><span>01 / Look</span><strong>What it does<br />+ where it’s made</strong></div><b aria-hidden="true">→</b><div className="dd-code" aria-live="polite"><span>Likely customs heading</span><strong>{choice[1]}</strong></div><b aria-hidden="true">→</b><div><span>03 / Confirm</span><strong>A broker<br />+ an official ruling</strong></div></div><p aria-live="polite">{choice[2]}</p><div className="dd-invoice"><span>Our rule</span><strong>Describe it honestly. Prove where it’s made. Check today’s tax.</strong></div></div>;
}
function BatteryGraphic() {
  const [mode, setMode] = useState("installed");
  return <div className="dd-battery"><div className="dd-tabs" role="group" aria-label="Battery shipping configuration"><button aria-pressed={mode === "installed"} onClick={() => setMode("installed")}>Inside the robot</button><button aria-pressed={mode === "spare"} onClick={() => setMode("spare")}>A spare, shipped alone</button></div><div className="dd-battery-shell" aria-hidden="true"><span /><span /><span /><span /><b>{mode === "spare" ? "≤30%" : "BATTERY"}</b></div><div className="dd-battery-info" aria-live="polite"><span className="dd-kicker">{mode === "spare" ? "Shipped alone · UN 3480" : "Shipped inside the robot · UN 3481"}</span><h3>{mode === "spare" ? "Cargo plane only. Partly charged." : "The battery still needs its own proof."}</h3><p>{mode === "spare" ? "A spare battery travels as dangerous goods: usually on a cargo aircraft, charged to no more than 30%, and no more than 35 kg per package. Carriers and approvals can add limits." : "The test report has to match the exact finished battery in the robot. A report on the individual cells isn't enough."}</p></div><div className="dd-document-check"><span>✓ Who made it</span><span>✓ Which lab tested it</span><span>✓ The test results</span><span>✓ The right edition</span><span>✓ Signed by a person</span></div></div>;
}
function ServiceGraphic() {
  const [selected, setSelected] = useState(0);
  const tier = serviceTiers[selected];
  return <div className="dd-service"><div className="dd-service-tiers" role="group" aria-label="Explore service tiers">{serviceTiers.map((t, i) => <button key={t.name} className={`dd-tier dd-tier-${i}`} aria-pressed={selected === i} onClick={() => setSelected(i)}><span>{t.name}</span><strong>{t.share}</strong><small>of problems · our target</small></button>)}</div><div className="dd-service-selected" aria-live="polite"><span className="dd-kicker">{tier.location}</span><h3>{tier.title}</h3><p>{tier.body}</p><p className="dd-note">{tier.detail}</p></div></div>;
}
function Economics() {
  const [units, setUnits] = useState(20);
  const [rate, setRate] = useState(15);
  const [attach, setAttach] = useState(60);
  const money = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
  return <div className="dd-economics"><div className="dd-controls"><label htmlFor="dd-units">Robots sold <output>{units}</output><input id="dd-units" type="range" min="5" max="100" step="5" value={units} onChange={e => setUnits(Number(e.target.value))} /></label><label htmlFor="dd-rate">Our commission <output>{rate}%</output><input id="dd-rate" type="range" min="5" max="15" value={rate} onChange={e => setRate(Number(e.target.value))} /></label><label htmlFor="dd-attach">Buyers who add a service plan <output>{attach}%</output><input id="dd-attach" type="range" min="0" max="100" step="5" value={attach} onChange={e => setAttach(Number(e.target.value))} /></label></div><div className="dd-econ-results" aria-live="polite"><div><span>Robots sold, at $25k each</span><strong>{money(units * 25000)}</strong></div><div><span>What Sapaki earns in commission</span><strong>{money(units * 25000 * rate / 100)}</strong></div><div><span>Service plans, per year (15% of price)</span><strong>{money(units * attach / 100 * 3750)}</strong></div></div><p className="dd-note">Illustrative agency scenario. SLA revenue is annualised, not cash collected. Excludes onboarding, parts, returns, delivery costs and tax. Wholesale margin is an alternative hardware model; it is not added to agency commission on the same sale.</p></div>;
}

export function DiligenceDeckScenes({
  onGoToChapter,
  onReturnToPitch,
  onReturnToStart,
  activeChapter,
}: {
  onGoToChapter?: (index: number) => void;
  onReturnToPitch?: () => void;
  onReturnToStart?: () => void;
  activeChapter?: number;
}) {
  return (
    <>
      <section className={`dd-scene dd-dark dd-first ${activeChapter === 0 ? "is-current" : ""}`} id="why-now" aria-label="Why now">
        <div className="opening-grid" aria-hidden="true" />
        <div className="dd-inner">
          <Heading index={0} title="Robots are getting cheaper." accent="The rules are getting stricter." />
          <div className="dd-split">
            <div className="dd-thesis">
              <span className="dd-kicker">The story of one order · HawkFranklin OÜ</span>
              <p>Picture Minh, who builds a good robot in Hai Phong. Picture Hanna, who runs logistics at a hospital in Berlin and needs one. Sapaki is what makes that sale actually happen.</p>
              <div className="dd-tags">
                <span>Businesses first</span>
                <span>People check every file</span>
                <span>Repairs included</span>
              </div>
              <button className="dd-text-button" onClick={() => onGoToChapter?.(1)}>Follow the order <span>↓</span></button>
            </div>
            <div className="dd-deadlines">
              <article>
                <time dateTime="2026-12-09">09 DEC <b>2026</b></time>
                <div>
                  <strong>Europe’s liability rules tighten</strong>
                  <p>New product-liability rules apply to products sold from this date. Software and AI now count as part of the product.</p>
                </div>
              </article>
              <article>
                <time dateTime="2027-01-20">20 JAN <b>2027</b></time>
                <div>
                  <strong>Europe’s machinery rules tighten</strong>
                  <p>The new Machinery Regulation applies. Some AI-driven safety systems will need an outside expert to sign off.</p>
                </div>
              </article>
              <div className="dd-callout">Makers shouldn’t have to learn all this alone. We get the file right before the robot leaves the factory.</div>
            </div>
          </div>
          <Detail title="Dates, scope & sources">
            <p>The source report describes entry-level hardware price compression and a $66B–$81.5B long-range humanoid forecast. Those are research estimates, not a verified current robotics market size or Sapaki traction.</p>
            <p>The PLD deadline is not a universal certification deadline. National implementation and product placement dates matter. The Machinery Regulation’s Annex I Part A requirements apply to specified categories, not every AI-enabled robot. Dynamically stable robots require application-specific safety analysis; do not assume a draft standard provides a presumption of conformity.</p>
            <Source href={sources.pld}>EU Product Liability Directive</Source>
            <Source href={sources.machinery}>EU Machinery Regulation</Source>
          </Detail>
        </div>
      </section>

      <section className={`dd-scene dd-light ${activeChapter === 1 ? "is-current" : ""}`} id="corridors" aria-label="Corridor prioritisation">
        <div className="dd-inner">
          <Heading index={1} title="Open one road first." accent="Then build the next." />
          <Story>We won’t try to open the whole world at once. Minh’s robot goes to Berlin first. Once that road works every time, we build the second.</Story>
          <CorridorGraphic />
          <Detail title="Why businesses first & what each road requires">
            <p>Initial buyers: hotels, warehouses, factories and non-clinical hospital logistics. Medical-purpose robots require a separate device assessment. Focus on repeatable commercial deployments before broad consumer retail.</p>
            <p>EU consumer sales have a minimum two-year legal guarantee. B2B remedies can be negotiated only within applicable national law; an SLA does not eliminate non-waivable rights or injury liability. Use counsel-reviewed terms.</p>
            <p>Great Britain recognises CE marking indefinitely for specified product regimes, including machinery. Verify the particular product’s requirements and keep Northern Ireland separate. GCC approvals are product-specific; incomplete filings can delay or prevent clearance.</p>
            <p>Historical 0% / 2.5% base-duty examples and Section 301 assumptions in the report are not live landed-cost quotes. Assembly or transshipment alone does not prove origin; request a ruling when uncertain.</p>
            <Source href={sources.gb}>GB product guidance</Source>
            <Source href={sources.origin}>CBP rulings & origin</Source>
          </Detail>
        </div>
      </section>

      <section className={`dd-scene dd-dark ${activeChapter === 2 ? "is-current" : ""}`} id="customs" aria-label="Customs intelligence">
        <div className="dd-inner">
          <Heading index={2} title="What do you call a robot?" accent="Customs has to decide." />
          <Story>Every product that crosses a border needs a name customs understands, and that name sets the tax. Robots are new, so the right name isn’t obvious. Get it wrong and the crate waits at the port.</Story>
          <CustomsGraphic />
          <Detail title="How classification works & where it goes wrong">
            <p>The report cites NY N356154 as a humanoid/quadruped classification precedent. Confirm the original ruling and that the imported configuration matches before relying on it. Industrial robots, material-handling systems and cleaning machines can fall under different headings.</p>
            <p>The proposed RAG customs agent retrieves rulings and tariff notes, checks origin documents and drafts accurate invoices. A qualified broker reviews the recommendation and files the entry. Never substitute marketing-name removal for legal classification.</p>
            <p>Vietnam or Korea sourcing can alter tariff treatment only when origin and any preferential rules are actually met. Base duties, trade remedies and other applicable measures must be checked at shipment time.</p>
            <Source href={sources.cbp}>CBP ruling NY N356154</Source>
            <Source href={sources.origin}>Request a customs ruling</Source>
          </Detail>
        </div>
      </section>

      <section className={`dd-scene dd-light ${activeChapter === 3 ? "is-current" : ""}`} id="liability" aria-label="Liability architecture">
        <div className="dd-inner">
          <Heading index={3} title="If something goes wrong," accent="everyone knows their part." />
          <Story>If the robot in Hanna’s hospital ever hurts someone, the first question is who answers for it. We settle that in writing, order by order, before any money moves.</Story>
          <div className="dd-role-map">
            <div className="dd-role-top">
              <span>THE MAKER</span>
              <b>Designs it · proves it’s safe · carries the insurance</b>
            </div>
            <div className="dd-role-spine" aria-hidden="true" />
            <div className="dd-role-branches">
              <article>
                <span>The buyer</span>
                <h3>Brings it into the country</h3>
                <p>The buyer, or their customs agent, registers as the importer and handles tax and the customs filing.</p>
              </article>
              <article className="dd-role-sapaki">
                <span>Sapaki</span>
                <h3>Runs the order</h3>
                <p>Checks the evidence, coordinates the sale, connects licensed payment partners and arranges the repairs.</p>
              </article>
              <article>
                <span>A local representative</span>
                <h3>Speaks to the authorities</h3>
                <p>Named in writing by the maker, with access to the technical file and a duty to work with regulators.</p>
              </article>
            </div>
            <div className="dd-role-bottom">Delivery terms decide who ships what. They don’t remove legal responsibility.</div>
          </div>
          <Detail title="Contracts, insurance, payment holdbacks & what we still carry">
            <p>Proposed default: avoid assigning HawkFranklin OÜ the importer or authorised-representative role automatically. Document the actual seller, importer, representative, customs agent and payment roles per order. Contracts and conduct must match.</p>
            <p>Buyer-as-importer requires informed acceptance and valid registration; a digital POA authorises a broker, not a universal liability transfer. VAT recovery depends on the buyer, documentation and local rules.</p>
            <p>Proposed safeguards: 10–15% OEM payout retention through a regulated payment/escrow partner, a $5M OEM product liability policy with appropriate additional-insured cover, and Sapaki’s own contingent/cargo cover. These are negotiation targets, not policies already bound.</p>
            <p>Product liability can still attach to the platform based on its actual role. The one-month identification provision has specific conditions; it is not blanket immunity. Liability to injured people cannot simply be waived by B2B terms.</p>
            <Source href={sources.pld}>Article 8: liable economic operators</Source>
          </Detail>
        </div>
      </section>

      <section className={`dd-scene dd-dark ${activeChapter === 4 ? "is-current" : ""}`} id="batteries" aria-label="Dangerous goods logistics">
        <div className="dd-inner">
          <Heading index={4} title="The robot is easy to ship." accent="The battery isn't." />
          <Story>A humanoid’s battery stores many times the energy of a laptop’s. That makes it dangerous cargo, and a single missing form can stop the whole shipment.</Story>
          <BatteryGraphic />
          <Detail title="Battery test evidence & the dispatch checklist">
            <p>A 2.3 kWh pack is 23 times the 100 Wh small-battery threshold. Classification also depends on whether the pack is shipped alone, packed with equipment or installed in equipment. Use the applicable current packing instruction and carrier restrictions.</p>
            <p>The UN 38.3.5 summary covers manufacturer identity/contact, lab identity/contact, report identifier, report date, battery description, tests/results, assembly references where applicable, Manual edition and the responsible person’s signature. The pack description includes chemistry, mass, energy/lithium content, physical description and model identity.</p>
            <p>The proposed vision audit matches the report to the physical pack nameplate and model configuration. Design/BMS changes can require retesting; an engineer decides from the applicable rules. A certified DG specialist checks packaging and signs required declarations.</p>
            <p>For batteries over normal air limits, assess IMDG sea freight or any permitted approval route; do not assume ocean carriage removes dangerous-goods obligations. Carrier acceptance is a separate gate.</p>
            <Source href={sources.summary}>PHMSA test-summary guidance</Source>
            <Source href={sources.batteries}>IATA battery shipping guidance</Source>
          </Detail>
        </div>
      </section>

      <section className={`dd-scene dd-light ${activeChapter === 5 ? "is-current" : ""}`} id="engine" aria-label="Compliance engine">
        <div className="dd-inner">
          <Heading index={5} title="Software does the paperwork." accent="People sign it." />
          <Story>Most of the work is reading documents and spotting what’s missing, which software does well. Anything that needs a licence or a signature stays with a qualified person.</Story>
          <div className="dd-engine">
            <div className="dd-engine-input">
              <span className="dd-kicker">What the maker sends</span>
              <strong>The technical file<br />The battery papers<br />Where it’s made and going</strong>
            </div>
            <div className="dd-engine-lanes">
              <article>
                <span>SOFTWARE READS</span>
                <h3>The battery check</h3>
                <p>Reads the battery paperwork and catches missing or mismatched details.</p>
              </article>
              <article>
                <span>SOFTWARE COMPARES</span>
                <h3>The safety check</h3>
                <p>Compares the file to the rules for that country and flags what’s missing.</p>
              </article>
              <article>
                <span>A PERSON DECIDES</span>
                <h3>The sign-off</h3>
                <p>Engineers, test labs, dangerous-goods specialists and customs brokers approve and file.</p>
              </article>
            </div>
            <div className="dd-engine-output">
              <strong>75–80%</strong>
              <span>of document prep we aim to automate</span>
              <p>A target we’ll test on the first 20 orders. Software never certifies a robot or releases a shipment by itself.</p>
            </div>
          </div>
          <Detail title="What gets automated, and what cannot">
            <p>Pipeline 1 extracts UN 38.3 summary fields, checks lab/report identities and flags nameplate mismatches. Lab registry access and document verification depend on available licensed data and APIs.</p>
            <p>Pipeline 2 maps each intended use to the relevant machinery, radio, electrical and battery requirements. ISO 10218 editions, ISO 13482, UL 3100/3300 and functional safety standards are checked for applicability and recognised status; a newer edition does not automatically invalidate every existing file.</p>
            <p>Pipeline 3 drafts dossier indexes, declarations, translations, invoices and filing packets from verified evidence. Physical testing, legal signatures, binding tariff determinations and regulated submissions stay with authorised people. The 20–25% human share is a planning assumption, not measured performance.</p>
            <Source href={sources.machinery}>Conformity assessment framework</Source>
          </Detail>
        </div>
      </section>

      <section className={`dd-scene dd-dark ${activeChapter === 6 ? "is-current" : ""}`} id="after-sale" aria-label="After-sales service">
        <div className="dd-inner">
          <Heading index={6} title="We don't just sell the robot." accent="We keep it working." />
          <Story>One Tuesday morning, Hanna’s robot stops mid-shift. Who does the hospital call? Not a factory three weeks away. We make sure someone nearby picks up.</Story>
          <ServiceGraphic />
          <div className="dd-service-economics">
            <div>
              <strong>12–18%</strong>
              <span>of the robot’s price, per year, for a service plan</span>
            </div>
            <div>
              <strong>55–70%</strong>
              <span>margin we aim for on service</span>
            </div>
            <p>On a $25k robot, that’s $3k–$4.5k a year.</p>
          </div>
          <Detail title="Service obligations & operating assumptions">
            <p>These ticket shares, prices, parts buffers and margins are targets from the supplied report. They are not Sapaki operating results. Prove resolution rates, dispatch cost, OEM parts access and SLA attachment before scaling.</p>
            <p>Use model-specific authorised repair procedures and safety checks after service. Service terms must define response coverage, exclusions, uptime measurement and remedy limits. B2B freedom is jurisdiction-dependent; consumer guarantees and personal-injury rules cannot be replaced wholesale with a paid SLA.</p>
            <p>Start with contracted partners rather than owned storefronts. Rotterdam/Frankfurt and Dallas are proposed hubs; no partnership or warehouse is claimed as secured.</p>
          </Detail>
        </div>
      </section>

      <section className={`dd-scene dd-light ${activeChapter === 7 ? "is-current" : ""}`} id="competition" aria-label="Competitive landscape">
        <div className="dd-inner">
          <Heading index={7} title="Others do part of this." accent="We join it up." />
          <Story>Hanna already has places to look for a robot. The hard part comes after she picks one: the paperwork, the shipping, and the repairs. That’s the part we’re building.</Story>
          <div className="dd-table-scroll" tabIndex={0} role="region" aria-label="Competitive comparison; scroll horizontally on narrow screens">
            <table className="dd-table">
              <caption>Our reading of each model, not a complete audit</caption>
              <thead>
                <tr>
                  <th scope="col">Who</th>
                  <th scope="col">What they do well</th>
                  <th scope="col">What we add</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row"><Source href={sources.robotlab}>RobotLAB</Source></th>
                  <td>Local setup and service through franchise partners.</td>
                  <td>A network of partners instead of owned shops.</td>
                </tr>
                <tr>
                  <th scope="row"><Source href={sources.qviro}>Qviro</Source></th>
                  <td>Helps buyers find and compare robots.</td>
                  <td>We carry on after the choice: paperwork, shipping and repairs.</td>
                </tr>
                <tr>
                  <th scope="row"><Source href={sources.robotshop}>RobotShop</Source> and regional shops</th>
                  <td>A wide range of products, with support.</td>
                  <td>One process that works across many countries.</td>
                </tr>
                <tr>
                  <th scope="row"><Source href={sources.generation}>Generation Robots</Source></th>
                  <td>Hands-on engineering help.</td>
                  <td>We turn what we learn on each order into checks we reuse.</td>
                </tr>
                <tr className="dd-sapaki-row">
                  <th scope="row">Sapaki</th>
                  <td>Trade, compliance and repair together.</td>
                  <td>We prove it on 20 orders before we claim we can scale.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Detail title="Competitive claims to validate">
            <p>The report cites RobotLAB’s $120M+ lifetime sales, roughly $26k average invoices, ≈46% blended gross margin and substantial franchise setup costs. These are reported benchmarks, not audited Sapaki comparables; verify current primary disclosures before quoting them externally.</p>
            <p>Do not assume competitors have no customs, repair or compliance services. The investment case is a better integrated multi-corridor process, not the absence of incumbents. Partner coverage, operating cost and repeatable onboarding are the proof points.</p>
          </Detail>
        </div>
      </section>

      <section className={`dd-scene dd-dark ${activeChapter === 8 ? "is-current" : ""}`} id="economics" aria-label="Unit economics">
        <div className="dd-inner">
          <Heading index={8} title="One order." accent="Several ways to earn." />
          <Story>Selling Minh’s robot to Hanna is the first payment, not the only one. Try it yourself: move the sliders and see what a handful of orders could become.</Story>
          <Economics />
          <div className="dd-revenues">
            <article>
              <span>Maker onboarding fee</span>
              <strong>$1.5k–$3.5k</strong>
              <b>Paid once per robot model · target margin 75–85%</b>
            </article>
            <article>
              <span>Commission</span>
              <strong>5–15% of the sale</strong>
              <b>We earn the commission, not the sale value</b>
            </article>
            <article>
              <span>Buy and resell</span>
              <strong>20–32%</strong>
              <b>Target margin · an alternative to commission</b>
            </article>
            <article>
              <span>Yearly service plan</span>
              <strong>$3k–$4.5k</strong>
              <b>Per robot · target margin 55–70%</b>
            </article>
            <article>
              <span>Spare parts</span>
              <strong>60–75%</strong>
              <b>Target margin · repeat purchases</b>
            </article>
          </div>
          <Detail title="Accounting, margins & model limits">
            <p>All economics are assumptions to validate with supplier quotes, signed buyer orders and actual service costs. A 46%+ blended gross margin is a hypothesis, not a direct consequence of adding the percentages above.</p>
            <p>Agency revenue recognition and wholesale revenue recognition differ. Determine principal-versus-agent treatment with an accountant. Do not add commission and wholesale spread to the same sale or confuse markup with gross margin.</p>
            <p>The calculator assumes $25k AOV, annual service at 15% of price, and your selected attachment rate. It does not imply that a $25k robot order yields $25k of platform revenue.</p>
          </Detail>
        </div>
      </section>

      <section className={`dd-scene dd-light ${activeChapter === 9 ? "is-current" : ""}`} id="execution" aria-label="Pre-seed execution">
        <div className="dd-inner">
          <Heading index={9} title="Do it by hand first." accent="Twenty orders to prove it." />
          <Story>We won’t build software for a process we haven’t run ourselves. First we handle 20 real orders with experts and partners, and learn exactly what is worth automating.</Story>
          <div className="dd-execution-top">
            <div className="dd-funding">
              <span className="dd-kicker">What we’re raising</span>
              <strong>$350k</strong>
              <b>+ $10k committed by HawkFranklin</b>
              <p>The goal: 20 robots and about $500k of sales in 6–9 months.</p>
            </div>
            <ol className="dd-hire-list">
              <li>
                <span>01 / A safety-compliance expert</span>
                <strong>$32k / 8 months</strong>
                <p>Reviews our first 15–20 technical files and turns their decisions into rules. Proposed equity: 1–2%.</p>
              </li>
              <li>
                <span>02 / A bilingual lead on the maker side</span>
                <strong>$35k / 8 months</strong>
                <p>Works with factories on documents, pricing and onboarding. Proposed commission plus 1.5–2.5% equity.</p>
              </li>
              <li>
                <span>03 / A freight, customs and legal team</span>
                <strong>$4.5k setup</strong>
                <p>A dangerous-goods shipper, a customs broker and a local representative. Freight and duties are priced per order.</p>
              </li>
            </ol>
          </div>
          <div className="dd-milestones">
            <div>
              <span>Months 1–2</span>
              <strong>Partners signed, first file complete</strong>
            </div>
            <div>
              <span>Months 3–5</span>
              <strong>First 10 orders, done with expert help</strong>
            </div>
            <div>
              <span>Months 6–9</span>
              <strong>20 orders, and automation measured</strong>
            </div>
          </div>
          <Detail title="Pilot budget, corrected cash model & raise reconciliation">
            <div className="dd-budget">
              {[["Legal setup",8500],["Insurance",9000],["MVP + AI evidence engine",7500],["Compliance architect",32000],["OEM solutions lead",35000],["Partner setup",4500],["Buyer acquisition",14000],["Working capital buffer",8000]].map(([label, amount]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>${Number(amount).toLocaleString("en-US")}</strong>
                </div>
              ))}
            </div>
            <p><strong>Base pilot outlay: $118,500.</strong> This is the supplied report’s narrow pilot scenario, not the full $350k deployment budget. The $360k combined capital would leave $241,500 before revenue; allocation and runway require a fuller operating plan.</p>
            <p>The report models $65k–$90k of hardware revenue plus $12.5k–$22.5k of introductory SKU fees on $500k GMV: $77.5k–$112.5k total. At a fixed $118.5k outlay, the arithmetic difference is $6k–$41k, not the quoted $41k–$62.5k. This is not a cash-burn forecast: supplier payments, cost of goods, collection timing, tax, returns and additional staffing must be reconciled.</p>
            <p>The source’s earlier $160k capital case is retained only as historical research context. The current ask is $350k. Equity, retainers, wholesale discounts, holdbacks and partnerships are proposals, not executed agreements.</p>
          </Detail>
          <div className="dd-end">
            <a className="dd-primary" href="mailto:partnerships@hawkfranklin.in?subject=Sapaki%20partner%20diligence">Talk to us about the plan ↗</a>
            {onReturnToPitch ? (
              <button onClick={onReturnToPitch}>← Return to pitch</button>
            ) : (
              <a href="/deck.html#raise">← Return to investor deck</a>
            )}
            <button onClick={onReturnToStart ? onReturnToStart : () => onGoToChapter?.(0)}>Back to the start ↑</button>
          </div>
          <p className="dd-note">Sapaki × HawkFranklin OÜ · Minh and Hanna are illustrative · Planning assumptions, not operating results. Based on the supplied Global Robotics Marketplace Research report, with legal and arithmetic qualifications.</p>
        </div>
      </section>
    </>
  );
}

export default function DiligenceDeck() {
  const reel = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [shareStatus, setShareStatus] = useState("");
  const go = (index: number) => {
    const next = Math.min(chapters.length - 1, Math.max(0, index));
    reel.current?.querySelectorAll<HTMLElement>(".dd-scene")[next]?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
  };
  useEffect(() => {
    const root = reel.current;
    if (!root) return;
    const sections = Array.from(root.querySelectorAll<HTMLElement>(".dd-scene"));
    let frame = 0;
    const update = () => {
      const marker = root.scrollTop + root.clientHeight * 0.3;
      let index = 0;
      sections.forEach((section, i) => { if (section.offsetTop <= marker) index = i; });
      setActive(index);
      window.history.replaceState(null, "", `#${chapters[index][0]}`);
    };
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    const hash = chapters.findIndex(([id]) => id === window.location.hash.slice(1));
    if (hash >= 0) sections[hash].scrollIntoView({ block: "start", behavior: "instant" });
    update();
    root.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(frame); root.removeEventListener("scroll", onScroll); };
  }, []);
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement).closest("a,button,input,select,textarea,summary")) return;
      if (event.key === "PageDown" || event.key === "ArrowDown") { event.preventDefault(); go(active + 1); }
      if (event.key === "PageUp" || event.key === "ArrowUp") { event.preventDefault(); go(active - 1); }
      if (event.key === "Home") { event.preventDefault(); go(0); }
      if (event.key === "End") { event.preventDefault(); go(9); }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [active]);
  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: "Sapaki — Execution & Diligence", url: window.location.href });
      else { await navigator.clipboard.writeText(window.location.href); setShareStatus("Link copied"); }
    } catch (error) { if (!(error instanceof DOMException && error.name === "AbortError")) setShareStatus("Copy the page address to share this chapter."); }
  };

  return <main className={`sapaki-deck diligence-deck ${active % 2 === 1 ? "tone-light" : "tone-dark"}`}>
    <a className="dd-skip" href="#dd-content">Skip to diligence content</a>
    <header className="deck-header"><a className="brand-lockup" href="/deck.html#raise" aria-label="Return to Sapaki investor deck"><img className="logo-on-light" src="/sapaki-logo-blue.png" alt="Sapaki" /><img className="logo-on-dark" src="/sapaki-logo-white.png" alt="" aria-hidden="true" /></a><nav aria-label="Diligence chapters">{chapters.map(([id, label], i) => <button key={id} onClick={() => go(i)} className={i === active ? "is-active" : i < active ? "is-seen" : ""} aria-label={`Chapter ${i + 1}: ${label}`} aria-current={i === active ? "step" : undefined}><span /></button>)}</nav><div className="header-actions"><button onClick={share}>Share</button><span className="deck-count">{String(active + 1).padStart(2, "0")} / 10</span></div></header>
    <div className="dd-reel" ref={reel} id="dd-content" tabIndex={-1}>
      <DiligenceDeckScenes
        onGoToChapter={(i) => go(i)}
        onReturnToPitch={() => { window.location.href = "/deck.html#raise"; }}
        onReturnToStart={() => go(0)}
        activeChapter={active}
      />
    </div><div className="dd-chapter-control"><span>{chapters[active][1]}</span><button disabled={active === 0} onClick={() => go(active - 1)} aria-label="Previous chapter">↑</button><button disabled={active === 9} onClick={() => go(active + 1)} aria-label="Next chapter">↓</button></div><div className="dd-share-status" role="status">{shareStatus}</div>
  </main>;
}
