import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Free Text-to-Speech Converter | High-Quality Voice Generation",
  description: "Convert text to natural-sounding speech with our free text-to-speech tool. No signup required, just paste your Verbatik API key and start generating professional voice content instantly.",
  keywords: "text to speech, free tts, voice generator, speech synthesis, audio content, Verbatik API",
  openGraph: {
    title: "Free Text-to-Speech Converter | No Signup Required",
    description: "Generate natural-sounding speech from text instantly. No account creation needed.",
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Free Text-to-Speech Converter",
    description: "Generate natural-sounding speech from text instantly. No account creation needed.",
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}