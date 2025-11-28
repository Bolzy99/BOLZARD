"use client";

import Script from "next/script";

export default function DemoDentist() {
  return (
    <>
      <main className="fixed inset-0 w-screen h-screen bg-black overflow-hidden relative">
        {/* Full-Screen Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center animate-fade-in-slow"
          style={{
            backgroundImage: "url('/dentist-clinic-bg.jpg')",
          }}
        ></div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        {/* Centered Heading at the Top */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-md text-center z-10 px-4 pointer-events-none">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-2xl">
            Smile Dental Clinic
          </h1>
          <p className="text-xl md:text-2xl text-white/90 drop-shadow-xl">
            AI Voice Receptionist
          </p>
        </div>

        {/* The ElevenLabs Widget */}
        {/* We place it directly in the main container, just like the working version */}
        <elevenlabs-convai agent-id="agent_4801kb5mszk7f7f94jnw26max7va"></elevenlabs-convai>
      </main>

      {/* Required Script for the Widget - Matching the working strategy */}
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="lazyOnload"
      />
    </>
  );
}
