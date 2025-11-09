// src/app/demo-receptionist/page.jsx
"use client";

import { useEffect } from "react";

export default function DemoReceptionist() {
  useEffect(() => {
    // The script will auto-run because it’s async; keeping hook ensures client-only
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl mb-4">AI Voice Receptionist (demo)</h1>
        <elevenlabs-convai agent-id="agent_6301k9kvm5r5fmwb600nqgxjk0fc"></elevenlabs-convai>
        <script
          async
          type="text/javascript"
          src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        ></script>
      </div>
    </main>
  );
}