"use client";

import Script from "next/script";

export default function DemoCosmetic() {
  return (
    <>
      {/* Full-Screen Background Image */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/demo-assets/salon-bg.jpg')",
        }}
      />

      {/* Dark Overlay with a slight warm tint */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-[2px]" />

      {/* Centered Heading */}
      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen pt-12 pointer-events-none">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-2 text-center px-4 drop-shadow-2xl tracking-wide font-serif">
          Luxe Beauty Bar
        </h1>
        <p className="text-2xl md:text-3xl text-rose-100 text-center px-4 drop-shadow-xl font-light">
          AI Booking Assistant
        </p>
      </div>

      {/* The ElevenLabs Widget */}
      {/* NOTE: If the widget doesn't appear, remove this div wrapper 
          and place the <elevenlabs-convai> tag directly in the fragment 
          like we did for the dentist page. */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <elevenlabs-convai 
          agent-id="agent_6201kbckd7eze3d85jqqd394jxne" 
          suppressHydrationWarning={true}
        ></elevenlabs-convai>
      </div>

      {/* Script */}
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        async
        type="text/javascript"
        strategy="afterInteractive"
      />
    </>
  );
}
