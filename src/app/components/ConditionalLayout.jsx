"use client"; // This component is a client component to check the URL

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatbotWidget from "./ChatbotWidget";
import ParticleBackground from "./ParticleBackground";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const isDemoPage = pathname === '/demo-receptionist';

  return (
    <>
      {/* Conditionally render the layout components */}
      {!isDemoPage && <ParticleBackground />}
      {!isDemoPage && <Navbar />}
      
      <main>{children}</main>
      
      {!isDemoPage && <Footer />}
      {!isDemoPage && <ChatbotWidget />}
    </>
  );
}
