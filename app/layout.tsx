import type { Metadata } from "next";
import { siteDescription } from "../lib/site-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://brownem722.github.io"),
  title: "Matthew Browne",
  description: siteDescription,
  openGraph: {
    type: "profile",
    siteName: "Matthew Browne",
    title: "Matthew Browne",
    description: siteDescription,
    images: [{ url: "/headshot.png", width: 1536, height: 1536, alt: "Portrait of Matthew Browne" }],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

// Runs before first paint: ?mode=party|serious wins, then this tab's last choice, else serious.
const modeScript = `(function(){var d=document.documentElement,m=null;try{m=new URLSearchParams(location.search).get("mode")}catch(e){}try{if(m==="party"||m==="serious")sessionStorage.setItem("mb-mode",m);else m=sessionStorage.getItem("mb-mode")}catch(e){}d.dataset.mode=m==="party"?"party":"serious"})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-mode="serious" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: modeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- the app-router root layout covers every page */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
