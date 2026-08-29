import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr. Dnyaneshwar M. Mate — Associate Professor, Mechanical Engineering",
  description:
    "Academic portfolio of Dr. Dnyaneshwar M. Mate, Associate Professor of Mechanical Engineering at JSPM's Rajarshi Shahu College of Engineering, Pune. 20+ years of teaching, research, patents, and publications.",
  keywords: [
    "Dr Dnyaneshwar Mate",
    "Mechanical Engineering",
    "JSPM RSCE",
    "Rajarshi Shahu College of Engineering",
    "academic portfolio",
    "research publications",
    "burnishing",
    "surface roughness",
  ],
  authors: [{ name: "Dr. Dnyaneshwar M. Mate" }],
  openGraph: {
    title: "Dr. Dnyaneshwar M. Mate — Academic Portfolio",
    description:
      "Associate Professor of Mechanical Engineering | 20+ Years | 40+ Publications | Patent Holder",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
