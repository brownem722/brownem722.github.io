"use client";

import { useEffect, useState } from "react";

import quotesText from "../data/quotes.txt?raw";

type Quote = { text: string; attribution: string };
type QuoteSet = "serious" | "party";

const quoteSets: Record<QuoteSet, Quote[]> = { serious: [], party: [] };
let currentSet: QuoteSet | null = null;
quotesText.split(/\r?\n/).forEach((raw: string, index: number) => {
  const line = raw.trim();
  if (!line || line.startsWith("#")) return;
  const heading = line.match(/^\[(serious|party)\]$/);
  if (heading) {
    currentSet = heading[1] as QuoteSet;
    return;
  }
  const separator = line.indexOf(" | ");
  if (!currentSet || separator < 1) throw new Error(`Invalid quote on line ${index + 1}. Use: quote | attribution, under [serious] or [party]`);
  quoteSets[currentSet].push({ text: line.slice(0, separator), attribution: line.slice(separator + 3) });
});

const displayMs = 6500;
const fadeMs = 3000;

export default function QuoteCycle({ set, className = "" }: { set: QuoteSet; className?: string }) {
  const quotes = quoteSets[set];
  const [index, setIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    let finishTimer;
    const startTimer = window.setTimeout(() => {
      setTransitioning(true);
      finishTimer = window.setTimeout(() => {
        setIndex((current) => (current + 1) % quotes.length);
        setTransitioning(false);
      }, fadeMs);
    }, displayMs - fadeMs);

    return () => {
      window.clearTimeout(startTimer);
      if (finishTimer) window.clearTimeout(finishTimer);
    };
  }, [index, quotes.length]);

  const quote = quotes[index];
  const incomingQuote = quotes[(index + 1) % quotes.length];

  function renderQuote(item: (typeof quotes)[number]) {
    return (
      <>
        <p>“{item.text}”</p>
        <cite>— {item.attribution}</cite>
      </>
    );
  }

  return (
    <section className={`quote-section quote-${set} shell ${className}`} aria-label="Selected observations">
      <div className="quote-stack">
        <blockquote className={`quote-cycle quote-current${transitioning ? " is-fading" : ""}`}>
          {renderQuote(quote)}
        </blockquote>
        {transitioning && (
          <blockquote className="quote-cycle quote-incoming is-visible">
            {renderQuote(incomingQuote)}
          </blockquote>
        )}
      </div>
    </section>
  );
}
