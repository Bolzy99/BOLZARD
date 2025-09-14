"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const buttonTexts = [
  "Book a Free Demo",
  "🚀 Let’s Automate!",
  "✅ Get Started Now",
];

const CallToAction = () => {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % buttonTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-32 bg-transparent text-white relative flex items-center justify-center min-h-[80vh]">
      <motion.div
        className="relative z-10 p-8 rounded-3xl bg-gradient-to-br from-purple-900 via-indigo-900 to-black border border-white/10 shadow-2xl max-w-4xl mx-auto"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative w-full h-64 rounded-xl overflow-hidden">
            <Image
              src="/images/book-call-feature.png"
              alt="Ready to Automate?"
              fill
              className="object-cover"
            />
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to Automate?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Stop wasting time on repetitive tasks. Let&apos;s build your
              AI-powered future, today.
            </p>

            {/* This Link component ensures the button navigates to the /book-call page */}
            <Link href="/book-call" passHref>
              <motion.div
                className="relative inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold rounded-full text-lg cursor-pointer w-64 h-16" // Fixed width and height
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={textIndex}
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {buttonTexts[textIndex]}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction;