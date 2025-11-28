"use client";

import Script from "next/script";

export default function DemoDentist() {
  return (
    <>
      {/* Full-Screen Background Image */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/dentist-clinic-bg.jpg')",
        }}
      />

      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black/50" />

      {/* Centered Heading at the Top */}
      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen pt-12 pointer-events-none">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-2 text-center px-4 drop-shadow-2xl">
          Smile Dental Clinic
        </h1>
        <p className="text-2xl md:text-3xl text-white/90 text-center px-4 drop-shadow-xl">
          AI Voice Receptionist
        </p>
      </div>

      {/* The ElevenLabs Widget */}
      {/* Positioned absolutely in the center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <elevenlabs-convai agent-id="agent_4801kb5mszk7f7f94jnw26max7va"></elevenlabs-convai>
      </div>

      {/* Required Script for the Widget */}
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        async
        type="text/javascript"
        strategy="afterInteractive"
      />
    </>
  );
}

