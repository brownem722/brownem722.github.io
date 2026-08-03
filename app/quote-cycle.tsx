"use client";

import { useEffect, useState } from "react";

import quotesText from "../data/quotes.txt?raw";

type Quote = { text: string; attribution: string };

const quotes: Quote[] = quotesText
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith("#"))
  .map((line, index) => {
    const separator = line.indexOf(" | ");
    if (separator < 1) throw new Error(`Invalid quote on line ${index + 1}. Use: quote | attribution`);
    return { text: line.slice(0, separator), attribution: line.slice(separator + 3) };
  });

const displayMs = 6500;
const fadeMs = 3000;

export default function QuoteCycle() {
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
  }, [index]);

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
    <section className="quote-section shell" aria-label="Selected observations">
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
