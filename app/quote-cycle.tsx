"use client";

import { useEffect, useState } from "react";

const quotes = [
  { text: "Among the world's top 2% of scientists.", attribution: "Stanford–Elsevier global research rankings" },
  { text: "Ranked among the top 200 scientists in his field.", attribution: "Stanford–Elsevier global research rankings" },
  { text: "Nominated for the Vice Chancellor's Award for Research Excellence.", attribution: "CQUniversity" },
  { text: "After 20 years he still hasn't learned how to stack the dishwasher correctly.", attribution: "Michiko Browne" },
  { text: "Who is Matthew Browne?", attribution: "Eric Weinstein · Renowned Physicist" },
  { text: "Vell, he's just zis guy, you know?", attribution: "Private brain care specialist to Zaphod Beeblebrox · Gag Halfrunt" },
  { text: "Matthew has satisfied all the requirements for promotion to Orange Belt.", attribution: "Ken White, Sensei, Shotokan Karate Loganholme" },
];

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
