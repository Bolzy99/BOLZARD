"use client"
import Link from 'next/link';
import { motion } from 'framer-motion';

const processSteps = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description: "It all begins with a discovery call. This isn't just a requirements-gathering session; it's a deep dive into your workflow. We listen to understand your primary needs and identify hidden pain points where automation can deliver the most value. Together, we map out a clear strategy for success.",
  },
  {
    number: "02",
    title: "Design & Development",
    description: "Based on your timeline and our strategic plan, we get to work. Our development is agile and transparent. We build your custom automation solution, providing you with updates and seeking feedback along the way to ensure the final product is simple, powerful, and perfectly aligned with your goals.",
  },
  {
    number: "03",
    title: "Launch & Support",
    description: "We handle the full deployment and integration of your new automation. But our partnership doesn't end at launch. We provide comprehensive support to handle any queries or suggestions, ensuring your system runs smoothly and continues to deliver value long-term with complete satisfaction.",
  },
];

const ProcessStep = ({ number, title, description, index }) => (
  <motion.div 
    className="grid md:grid-cols-[150px_1fr] gap-8 md:gap-12 items-start text-left"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.15 }}
  >
    <span className="text-8xl font-black bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text opacity-30 leading-none">{number}</span>
    <div>
      <h3 className="text-4xl font-bold mb-4">{title}</h3>
      <p className="text-lg text-slate-300">{description}</p>
    </div>
  </motion.div>
);

const OurProcessPage = () => {
  return (
    // 1. ADD this wrapper to lift the content
    <div className="relative z-10">
      {/* 2. REMOVE "bg-black" and the redundant Navbar */}
      <main className="text-white min-h-screen">
        <div className="pt-40 pb-20 px-8 text-center">
          <h1 className="text-6xl font-black bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text mb-4">
            Our Process
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            A collaborative journey from idea to implementation, ensuring your automation is a perfect fit.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-8 space-y-20 pb-24">
          {processSteps.map((step, index) => (
            <ProcessStep key={index} {...step} index={index} />
          ))}

          <div className="text-center border-t border-white/10 pt-20">
            <h3 className="text-4xl font-bold mb-4">Ready to Start Your Automation Journey?</h3>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">Let's begin with a simple conversation.</p>
            <Link href="/book-call">
              <motion.div 
                className="inline-block px-10 py-4 bg-primary rounded-full text-lg font-bold text-white cursor-pointer shadow-lg"
                style={{ backgroundColor: '#007cf0' }} // Explicitly setting your primary blue
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px #007cf0" }}
              >
                Book Your Discovery Call
              </motion.div>
            </Link>
          </div>
        </div>
      </main>
    </div> // 3. Close the new wrapper div
  );
};

export default OurProcessPage;
