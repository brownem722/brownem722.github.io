import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matthew Browne | CV and publications",
  description: "The CV, publications, and research projects of Professor Matthew Browne.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
