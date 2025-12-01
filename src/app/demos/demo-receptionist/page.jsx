"use client";

import Script from "next/script";

export default function DemoReceptionist() {
  return (
    <>
      <main className="fixed inset-0 w-screen h-screen bg-black overflow-hidden relative">
        {/* Full-Screen Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center animate-fade-in-slow"
          style={{ backgroundImage: "url('/demo-assets/restaurant-hero.jpg')" }}
        ></div>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
        {/* Centered Heading at the Top */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-md text-center z-10 px-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Big Food Restaurant
          </h1>
          <p className="mt-1 text-md md:text-lg text-white/70">
            AI Voice Receptionist
          </p>
        </div>
        {/* The ElevenLabs Widget (centered by script) */}
        <elevenlabs-convai agent-id="agent_6301k9kvm5r5fmwb600nqgxjk0fc"></elevenlabs-convai>
      </main>
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="lazyOnload"
      />
    </>
  );
}
