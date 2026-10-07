import Link from "next/link";
import Dual from "./dual";
import ModeSwitch from "./mode-switch";

export default function PageHeader() {
  return (
    <header className="site-header shell">
      <Link className="wordmark" href="/">Matthew Browne</Link>
      <div className="header-tools">
        <ModeSwitch />
        <Link className="back-link" href="/"><Dual serious="← Back to home" party="← Take me home" /></Link>
      </div>
    </header>
  );
}
