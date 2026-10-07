"use client";

import type { MouseEvent } from "react";
import { useSyncExternalStore } from "react";

type Mode = "serious" | "party";

const storageKey = "mb-mode";
const sequinColours = ["#ff4f1f", "#ffc531", "#d2310f", "#1f5fe0", "#fff3c4", "#f59e0b"];

function currentMode(): Mode {
  return document.documentElement.dataset.mode === "party" ? "party" : "serious";
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-mode"] });
  return () => observer.disconnect();
}

function preloadPartyPortrait() {
  new Image().src = "/headshot-party.jpg";
}

function sequinBurst(origin: HTMLElement) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const box = origin.getBoundingClientRect();
  const x = box.left + box.width / 2;
  const y = box.top + box.height / 2;
  const layer = document.createElement("div");
  layer.className = "sequin-burst";
  layer.setAttribute("aria-hidden", "true");
  document.body.append(layer);

  const flights = Array.from({ length: 80 }, (_, index) => {
    const sequin = document.createElement("span");
    const size = 7 + Math.random() * 10;
    sequin.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size}px;--c:${sequinColours[index % sequinColours.length]}`;
    layer.append(sequin);

    // Burst outward, mostly downward, then fall and fade while flipping like a sequin.
    const angle = Math.PI * (0.1 + Math.random() * 1.1);
    const reach = 90 + Math.random() * 360;
    const dx = Math.cos(angle) * reach;
    const dy = Math.sin(angle) * reach * 0.6;
    const fall = 220 + Math.random() * 360;
    const flip = (Math.random() < 0.5 ? -1 : 1) * (540 + Math.random() * 900);
    return sequin.animate(
      [
        { transform: "translate(-50%, -50%) scale(.2) rotateY(0deg)", opacity: 1 },
        { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1) rotateY(${flip / 2}deg)`, opacity: 1, offset: 0.3 },
        { transform: `translate(calc(-50% + ${dx * 1.25}px), calc(-50% + ${dy + fall}px)) scale(.85) rotateY(${flip}deg)`, opacity: 0 },
      ],
      { duration: 1500 + Math.random() * 1100, easing: "cubic-bezier(.15, .75, .35, 1)", fill: "forwards" },
    ).finished;
  });

  Promise.allSettled(flights).then(() => layer.remove());
}

export default function ModeSwitch() {
  const mode = useSyncExternalStore(subscribe, currentMode, () => "serious");
  const party = mode === "party";

  function toggle(event: MouseEvent<HTMLButtonElement>) {
    const next: Mode = currentMode() === "party" ? "serious" : "party";
    document.documentElement.dataset.mode = next;
    try {
      sessionStorage.setItem(storageKey, next);
    } catch {
      // Storage can be blocked; the switch still works for this page view.
    }
    const url = new URL(window.location.href);
    if (url.searchParams.has("mode")) {
      url.searchParams.set("mode", next);
      window.history.replaceState(null, "", url);
    }
    if (next === "party") sequinBurst(event.currentTarget);
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={party}
      aria-label="Light mode"
      className="mode-switch"
      onClick={toggle}
      onPointerEnter={preloadPartyPortrait}
      onFocus={preloadPartyPortrait}
    >
      <span className="mode-switch-word mode-switch-dark" aria-hidden="true">Dark</span>
      <span className="mode-switch-track" aria-hidden="true">
        <span className="mode-switch-knob" />
      </span>
      <span className="mode-switch-word mode-switch-light" aria-hidden="true">
        Light
      </span>
    </button>
  );
}
