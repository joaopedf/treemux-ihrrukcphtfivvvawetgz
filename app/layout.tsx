import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Debate Arena - TreeHacks 2026",
  description: "Watch AI models debate any topic in real-time. An innovative platform showcasing AI reasoning and argumentation.",
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
