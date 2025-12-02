"use client";

import Script from "next/script";

export default function DemoCosmetic() {
  return (
    <>
      {/* Main Container - Matches DemoDentist structure */}
      <main className="fixed inset-0 w-screen h-screen bg-black overflow-hidden relative">
        {/* Full-Screen Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center animate-fade-in-slow"
          style={{
            backgroundImage: "url('/demo-assets/salon-bg.jpg')",
          }}
        ></div>

        {/* Dark Overlay with a slight warm tint */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>

        {/* Centered Heading at the Top */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-md text-center z-10 px-4 pointer-events-none">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-2 text-center drop-shadow-2xl tracking-wide font-serif">
            Luxe Beauty Bar
          </h1>
          <p className="text-2xl md:text-3xl text-rose-100 text-center drop-shadow-xl font-light">
            AI Booking Assistant
          </p>
        </div>

        {/* The ElevenLabs Widget */}
        {/* Placed DIRECTLY in the main container, no wrapper div */}
        <elevenlabs-convai 
          agent-id="agent_6201kbckd7eze3d85jqqd394jxne"
        ></elevenlabs-convai>
      </main>

      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="lazyOnload"
      />
    </>
  );
}

