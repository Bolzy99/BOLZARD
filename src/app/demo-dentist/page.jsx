"use client";

import Script from "next/script";

export default function DemoReceptionist() {
  return (
    <>
      <main className="min-h-screen w-full bg-black relative overflow-hidden p-8">
        {/* Full-Screen Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center animate-fade-in-slow"
          style={{ backgroundImage: "url('/restaurant-hero.jpg')" }}
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

        {/* The ElevenLabs Widget Container */}
        {/* We place the custom element here. 
            Next.js/React will render this custom web component. */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <elevenlabs-convai agent-id="agent_4801kb5mszk7f7f94jnw26max7va"></elevenlabs-convai>
        </div>
      </main>

      {/* Load the script that powers the custom element */}
      <Script 
        src="https://unpkg.com/@elevenlabs/convai-widget-embed" 
        async 
        type="text/javascript" 
        strategy="afterInteractive"
      />
    </>
  );
}
