import Link from "next/link";

export default function Home() {
  return (
    <main className="entry-page">
      <img src="/sapaki-logo.png" alt="Sapaki" className="entry-logo" />
      <h1>Europe&apos;s route into the robot age.</h1>
      <Link href="/deck.html">Open the investor deck</Link>
    </main>
  );
}
