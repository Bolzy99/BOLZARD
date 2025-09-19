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
  variable: "--font-instrument-sans",
});

export const metadata = {
  title: "BOLZARD - AI Automation",
  description: "Elite AI automation for next-generation business workflows.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* relative establishes a stacking context for the content wrapper */}
      <body className={`${instrumentSans.variable} font-sans bg-black text-white relative`}>
        {/* Full-screen particles behind everything */}
        <ParticleBackground />
        {/* Content wrapper sits above particles */}
        <div className="relative z-10">
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
          <ChatbotWidget />
        </div>
      </body>
    </html>
  );
}
