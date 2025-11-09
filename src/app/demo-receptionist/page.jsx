'''
// src/app/demo-receptionist/page.jsx
"use client";

import Script from "next/script";

export default function DemoReceptionist() {
  return (
    <>
      <main
        className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-cover bg-center"
        style={{
          backgroundImage: "url('/restaurant-background.jpg')", // <-- IMPORTANT: Upload your image to the /public folder and name it restaurant-background.jpg, or update this path.
        }}
      >
        {/* Soothing Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-200/70 via-rose-200/70 to-amber-200/70"></div>

        {/* Content Wrapper */}
        <div className="relative z-10 w-full flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-8 shadow-sm">
            BIG FOOD RESTAURANT SINGAPORE VOICE RECEPTIONIST
          </h1>

          {/* Widget Container */}
          <div className="w-full max-w-xl h-[600px] rounded-lg shadow-2xl overflow-hidden">
            <elevenlabs-convai agent-id="agent_6301k9kvm5r5fmwb600nqgxjk0fc"></elevenlabs-convai>
          </div>
        </div>
      </main>
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="lazyOnload"
      />
    </>
  );
}
'''
