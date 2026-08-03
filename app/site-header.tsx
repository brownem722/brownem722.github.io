"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const navId = useId();

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    function onResize() {
      if (window.matchMedia("(min-width: 761px)").matches) setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className={`site-header shell${open ? " is-nav-open" : ""}`}>
      <Link className="wordmark" href="/" onClick={closeMenu}>
        Matthew Browne
      </Link>
      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls={navId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="nav-toggle-bar" aria-hidden="true" />
        <span className="nav-toggle-bar" aria-hidden="true" />
        <span className="nav-toggle-bar" aria-hidden="true" />
      </button>
      <nav id={navId} aria-label="Main navigation">
        <a href="/Matthew_Browne_CV.pdf" onClick={closeMenu}>
          CV
        </a>
        <Link href="/publications" onClick={closeMenu}>
          Publications
        </Link>
        <Link href="/projects" onClick={closeMenu}>
          Projects
        </Link>
        <Link href="#contact" onClick={closeMenu}>
          Contact
        </Link>
      </nav>
    </header>
  );
}
