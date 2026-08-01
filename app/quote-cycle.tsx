"use client";

import { useEffect, useState } from "react";

const quotes = [
  { text: "Recognised in the Stanford–Elsevier World's Top 2% Scientists list (2024, 2025).", attribution: "Stanford–Elsevier World's Top 2% Scientists" },
  { text: "Nominated for the Vice Chancellor's Award for Research Excellence.", attribution: "CQUniversity" },
  { text: "After 20 years he still hasn't learned how to stack the dishwasher correctly.", attribution: "Michiko Browne" },
  { text: "Who is Matthew Browne?", attribution: "Dr Eric Weinstein" },
  { text: "Vell, Matt's just zis guy, you know?", attribution: "Gag Halfrunt · The Hitchhiker's Guide to the Galaxy" },
];

const displayMs = 5000;
const fadeMs = 650;

export default function QuoteCycle() {
  const [index, setIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [incomingVisible, setIncomingVisible] = useState(false);

  useEffect(() => {
    let finishTimer;
    let frame;
    const startTimer = window.setTimeout(() => {
      setTransitioning(true);
      frame = window.requestAnimationFrame(() => setIncomingVisible(true));
      finishTimer = window.setTimeout(() => {
        setIndex((current) => (current + 1) % quotes.length);
        setTransitioning(false);
        setIncomingVisible(false);
      }, fadeMs);
    }, displayMs - fadeMs);

    return () => {
      window.clearTimeout(startTimer);
      if (finishTimer) window.clearTimeout(finishTimer);
      if (frame) window.cancelAnimationFrame(frame);
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
          <blockquote className={`quote-cycle quote-incoming${incomingVisible ? " is-visible" : ""}`}>
            {renderQuote(incomingQuote)}
          </blockquote>
        )}
      </div>
    </section>
  );
}
