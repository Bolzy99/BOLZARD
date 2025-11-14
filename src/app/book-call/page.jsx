"use client";
import { InlineWidget } from "react-calendly";

const BookCallPage = () => {
  return (
    // This wrapper lifts the content in front of the particle background
    <div className="relative z-10">
      {/* This container is transparent to let the background show through */}
      <div className="min-h-screen text-white pt-24 pb-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          
          {/* --- Header (UPDATED) --- */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text">
            Book Your Free Consultation
          </h1>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            Choose a time that works for you. Let's discuss how Bolzard can revolutionize your business with AI automation.
          </p>

          {/* --- Calendly Widget --- */}
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <InlineWidget 
              url="https://calendly.com/bolzard/45min"
              styles={{
                height: '800px'
              }}
              pageSettings={{
                backgroundColor: '1a1a1a',
                hideEventTypeDetails: false,
                hideLandingPageDetails: false,
                primaryColor: '00a2ff',
                textColor: 'ffffff'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCallPage;
