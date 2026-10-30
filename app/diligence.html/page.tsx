import type { Metadata } from "next";
import DiligenceDeck from "./DiligenceDeck";
import "./diligence.css";

export const metadata: Metadata = {
  title: "Sapaki — Execution & Diligence",
  description: "Ten chapters on Sapaki’s trade corridors, compliance architecture, service network and pre-seed execution model.",
  openGraph: {
    title: "Sapaki — Execution & Diligence",
    description: "Trade corridors, compliance architecture, service economics and the $350k pre-seed plan.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sapaki — Execution & Diligence",
    description: "Trade corridors, compliance architecture, service economics and the $350k pre-seed plan.",
  },
};

export default function DiligencePage() {
  return <DiligenceDeck />;
}
