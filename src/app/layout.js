import { Instrument_Sans } from "next/font/google";
import "./globals.css";
// Import the new component we will create
import ConditionalLayout from "./components/ConditionalLayout";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: '--font-instrument-sans',
});

// Your metadata remains UNTOUCHED and will work correctly.
export const metadata = {
  title: "BOLZARD - AI Automation",
  description: "Elite AI automation for next-generation business workflows.",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
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
        {/* The new component now wraps your page content */}
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
