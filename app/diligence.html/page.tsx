import type { Metadata } from "next";
import DiligenceDeck from "./DiligenceDeck";
import "./diligence.css";

export const metadata: Metadata = {
  title: "Sapaki — Execution & Diligence",
  description: "Follow one robot order from a factory in Vietnam to a hospital in Berlin: the rules, the risks, the repairs and the plan to prove it.",
  openGraph: {
    title: "Sapaki — Execution & Diligence",
    description: "One robot order, start to finish — and the $350k plan to prove it twenty times.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sapaki — Execution & Diligence",
    description: "One robot order, start to finish — and the $350k plan to prove it twenty times.",
  },
};

export default function DiligencePage() {
  return <DiligenceDeck />;
}
