"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatbotWidget from "./ChatbotWidget";
import ParticleBackground from "./ParticleBackground";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const hideLayout = [
    "/demo-receptionist",
    "/receptionist-dashboard",
    "/dentist-dashboard",
    "/demo-dentist"
  ].includes(pathname);

  return (
    <>
      {!hideLayout && <ParticleBackground />}
      {!hideLayout && <Navbar />}
      <main>{children}</main>
      {!hideLayout && <Footer />}
      {!hideLayout && <ChatbotWidget />}
    </>
  );
}
