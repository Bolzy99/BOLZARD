"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link"; 

export default function BeforeAfter() {
  const beforeItems = [
    "Endless copy-pasting.",
    "Leads lost in the DM flood.",
    "Sales opportunities missed overnight.",
    "Buried under notifications.",
  ];

  const afterItems = [
    "Instant, intelligent FAQ answers.",
    "Perfectly organized & tagged leads.",
    "A 24/7 automated sales force.",
    "Every interaction, a conversion.",
  ];

  return (
    <section className="relative w-full py-24 md:py-32 px-6 text-white overflow-hidden">
      {/* Heading */}
      <div className="relative z-20 max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter">
          From Manual Chaos to Automated Flow
        </h2>
      </div>

      {/* Anchor Bar and Pendulums Container */}
      <div className="relative max-w-6xl mx-auto h-[400px] md:h-[650px] transform scale-[0.6] md:scale-100">
        {/* Sturdy Anchor Bar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-4 bg-gradient-to-b from-neutral-600 to-neutral-700 rounded-full shadow-lg" />
        
        {/* Left Pendulum */}
        <Pendulum
          side="left"
          offset="-28%"
          duration={7}
          amplitude={6}
        >
          <Card
            title="Before Bolzard:"
            heading="All Work, No Play"
            items={beforeItems}
            bg="#E0E0E0"
            text="#000000"
            showButton={false} 
          />
        </Pendulum>

        {/* Right Pendulum */}
        <Pendulum
          side="right"
          offset="28%"
          duration={8}
          amplitude={5}
        >
          <Card
            title="After Bolzard:"
            heading="Get Back to What You Love"
            items={afterItems}
            bg="#008060"
            text="#FFFFFF"
            ctaBg="#FFFFFF"
            ctaText="#000000"
            showButton={true}
          />
        </Pendulum>
      </div>
    </section>
  );
}

function Pendulum({ offset, duration, amplitude, children }) {
  return (
    <div
      className="absolute top-2 left-1/2 -translate-x-1/2 h-full"
      style={{ marginLeft: offset }}
    >
      <motion.div
        className="flex flex-col items-center"
        style={{ transformOrigin: "top center" }}
        animate={{ rotate: [amplitude, -amplitude, amplitude] }}
        transition={{
          duration,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
      >
        <div className="w-1 h-32 bg-gradient-to-b from-neutral-400 to-neutral-600 rounded" />
        <div className="mt-2">{children}</div>
      </motion.div>
    </div>
  );
}

function Card({ title, heading, items, bg, text, ctaBg, ctaText, showButton }) {
  return (
    <div
      className="w-[450px] max-w-[85vw] h-[450px] rounded-3xl shadow-2xl p-7 md:p-8 flex flex-col"
      style={{ backgroundColor: bg, color: text }}
    >
      <p className="font-semibold mb-5">{title}</p>
      <h3
        className="font-extrabold leading-tight" 
        style={{ fontSize: "clamp(32px, 4vw, 48px)" }}
      >
        {heading}
      </h3>
      <div className="space-y-4 text-sm md:text-base mt-8">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <span>{item}</span>
            <Check className="size-5 flex-shrink-0 ml-4" />
          </div>
        ))}
      </div>
      
      {showButton && (
        // CRITICAL FIX: Changed mt-auto to mt-12 to add a fixed space
        <Link href="/book-call" className="w-full mt-12">
            <motion.button
              className="w-full py-4 rounded-full font-bold transition-transform"
              style={{ background: ctaBg, color: ctaText }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
        </Link>
      )}
    </div>
  );
}
