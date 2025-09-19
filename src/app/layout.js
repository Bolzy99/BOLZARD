// src/app/layout.js
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatbotWidget from "./components/ChatbotWidget";
import ParticleBackground from "./components/ParticleBackground";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: '--font-instrument-sans',
});

// The icons object has been corrected and simplified
export const metadata = {
  title: "BOLZARD - AI Automation",
  description: "Elite AI automation for next-generation business workflows.",
  
  // --- CORRECTED 'icons' OBJECT ---
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  // --- END OF CORRECTED SECTION ---

  openGraph: {
    title: "BOLZARD - AI Automation",
    description: "Elite AI automation for next-generation business workflows.",
    url: "https://bolzard.com",
    siteName: "BOLZARD",
    images: [
      {
        url: "https://bolzard.com/images/bolzard-preview.png",
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
        <ParticleBackground />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatbotWidget />
      </body>
    </html>
  );
}
