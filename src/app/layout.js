// src/app/layout.js
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatbotWidget from "./components/ChatbotWidget";
import ParticleBackground from "./components/ParticleBackground"; // 1. IMPORT this

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument-sans",
});

// Added: Open Graph + Twitter metadata for share previews
export const metadata = {
  title: "BOLZARD - AI Automation",
  description: "Elite AI automation for next-generation business workflows.",
  openGraph: {
    title: "BOLZARD - AI Automation",
    description: "Elite AI automation for next-generation business workflows.",
    url: "https://bolzard.com", // replace with your production URL
    siteName: "BOLZARD",
    images: [
      {
        url: "https://bolzard.com/images/bolzard-preview.png", // file at /public/og-image.png
        width: 1200,
        height: 630,
        alt: "BOLZARD — AI Automation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BOLZARD - AI Automation",
    description: "Elite AI automation for next-generation business workflows.",
    images: ["https://bolzard.com/images/bolzard-preview.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.variable} font-sans`}>
        <ParticleBackground /> {/* 2. ADD this component here */}
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatbotWidget />
      </body>
    </html>
  );
}
