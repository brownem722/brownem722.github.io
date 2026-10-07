import type { ReactNode } from "react";

// Renders both wordings; CSS shows the one matching <html data-mode>.
export default function Dual({ serious, party }: { serious: ReactNode; party: ReactNode }) {
  return (
    <>
      <span className="m-serious">{serious}</span>
      <span className="m-party">{party}</span>
    </>
  );
}
