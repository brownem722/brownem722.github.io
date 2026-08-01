"use client";

import { useEffect, useState } from "react";

const quotes = [
  { text: "Recognised in the Stanford–Elsevier World's Top 2% Scientists list (2024, 2025).", attribution: "CQUniversity" },
  { text: "Nominated for the Vice Chancellor's Award for Research Excellence.", attribution: "CQUniversity" },
  { text: "After 20 years he still hasn't learned how to stack the dishwasher correctly.", attribution: "Michiko Browne" },
  { text: "Who is Matthew Browne?", attribution: "Dr Eric Weinstein" },
];

const displayMs = 5000;
const fadeMs = 650;

export default function QuoteCycle() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setVisible(false), displayMs - fadeMs);
    const changeTimer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % quotes.length);
      setVisible(true);
    }, displayMs);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(changeTimer);
    };
  }, [index]);

  const quote = quotes[index];

  return (
    <section className="quote-section shell" aria-label="Selected observations">
      <blockquote className={`quote-cycle${visible ? " is-visible" : " is-fading"}`}>
        <p>“{quote.text}”</p>
        <cite>— {quote.attribution}</cite>
      </blockquote>
    </section>
  );
}
