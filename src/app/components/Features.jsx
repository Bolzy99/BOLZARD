"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Calendar, Check, Send, Clock, Bell, Settings, ArrowRightLeft, Zap, FileText, MessageSquare } from "lucide-react";

// --- DATA ---
const features = [
  {
    title: "AI-Powered Chatbots",
    description: "Deploy intelligent chatbots that learn your brand voice and engage customers 24/7.",
    imageUrl: "/images/chatbot-feature.png",
    gradient: "from-purple-600 to-indigo-600",
    benefits: [
      { text: "Instantly answer any customer query using your company's knowledge base.", animation: "barChart" },
      { text: "Book appointments, schedule calls, and send confirmations automatically.", animation: "calendar" },
      { text: "Save customer insights and analytics, from pain points to CRM updates.", animation: "speechBubbles" }, // Changed animation
    ],
  },
  {
    title: "Automated Outreach",
    description: "Launch hyper-personalized campaigns that nurture leads automatically.",
    imageUrl: "/images/outreach-feature.png",
    gradient: "from-sky-600 to-cyan-600",
    benefits: [
      { text: "Hyper-personalized cold outreach that adapts messaging to each prospect.", animation: "send" },
      { text: "AI-driven scheduling for follow-ups via email, WhatsApp, and social channels.", animation: "clock" },
      { text: "Track engagement rates and optimize campaigns in real-time.", animation: "bell" },
    ],
  },
  {
    title: "Dynamic Workflows",
    description: "A visual, no-code builder for creating complex business automations.",
    imageUrl: "/images/workflow-feature.png",
    gradient: "from-emerald-600 to-green-600",
    benefits: [
      { text: "Build powerful no-code workflows visually with drag-and-drop ease.", animation: "nodes" },
      { text: "Integrate seamlessly with CRMs, payment systems, and third-party APIs.", animation: "gears" },
      { text: "Automate repetitive tasks across departments, boosting team productivity.", animation: "cycle" },
    ],
  },
  {
    title: "Real-Time Analytics",
    description: "Track your ROI from one beautiful, unified dashboard.",
    imageUrl: "/images/analytics-feature.png",
    gradient: "from-pink-600 to-rose-600",
    benefits: [
      { text: "Unified dashboard to monitor KPIs across all channels in real-time.", animation: "dashboard" },
      { text: "AI-generated insights that highlight trends, anomalies, and opportunities.", animation: "lightbulb" },
      { text: "Export-ready reports for investors, stakeholders, and internal reviews.", animation: "file" },
    ],
  },
];

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section
      className="relative w-full min-h-screen py-24 bg-transparent text-white px-6 flex flex-col items-center justify-center"
    >
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-5xl md:text-6xl font-bold">Our Core Features</h2>
        <p className="text-lg md:text-xl mt-4 text-white/70 max-w-3xl">
          A closer look at our elite automation suite. Hover to see the benefits.
        </p>
      </div>

      <div
        className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {features.map((_, index) => (
          <FeatureCard
            key={index}
            index={index}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        ))}
      </div>
    </section>
  );
}

const FeatureCard = ({ index, hoveredIndex, setHoveredIndex }) => {
  const isOther = hoveredIndex !== null && hoveredIndex !== index;
  
  const feature = features[index];
  const benefitToShow = isOther
    ? features[hoveredIndex].benefits[
        (index + features.length - hoveredIndex - 1) % (features.length - 1)
      ]
    : null;

  const gradient = isOther ? `bg-gradient-to-br ${features[hoveredIndex].gradient}` : "bg-neutral-900";

  return (
    <div
      className={`relative rounded-3xl p-6 shadow-2xl backdrop-blur-md border border-white/10 flex flex-col cursor-pointer h-[400px] ${gradient}`}
      onMouseEnter={() => setHoveredIndex(index)}
    >
      <AnimatePresence mode="wait">
        {isOther && benefitToShow ? (
          <motion.div
            key="benefit"
            className="flex flex-col h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex-1 flex items-center justify-center">
              <BenefitAnimation type={benefitToShow.animation} />
            </div>
            <p className="text-white/90 text-center text-lg leading-relaxed h-1/3 pt-4">
              {benefitToShow.text}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            className="flex flex-col h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-full h-2/3 rounded-xl overflow-hidden mb-4">
              <Image src={feature.imageUrl} alt={feature.title} fill className="object-cover" />
            </div>
            <h3 className="text-white font-bold text-xl mb-1">{feature.title}</h3>
            <p className="text-white/80 text-base flex-1">{feature.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BenefitAnimation = ({ type }) => {
  const container = "w-full h-full relative flex items-center justify-center";

  switch (type) {
    case "barChart":
      return (
        <div className={`${container} flex items-end gap-2`}>
          {[30, 60, 40, 75, 50].map((h, i) => (
            <motion.div
              key={i}
              className="w-5 bg-white/50 rounded-t-sm"
              initial={{ height: "0%" }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            />
          ))}
        </div>
      );
    case "calendar":
        return (
            <div className={container}>
                <div className="w-1/2 h-1/2 border-2 border-white/50 rounded-lg p-2">
                    <div className="w-full border-b-2 border-white/50 pb-1 flex justify-between px-2">
                        {[...Array(3)].map((_, i) => <div key={i} className="w-2 h-2 bg-white/30 rounded-full"/>)}
                    </div>
                </div>
                <motion.div className="absolute" initial={{scale: 0}} animate={{scale: 1}} transition={{delay: 0.5, type: 'spring', stiffness: 200, damping: 10}}>
                     <Check className="w-10 h-10 text-white"/>
                </motion.div>
            </div>
        );
    case "speechBubbles":
      return (
        <div className={container}>
          <motion.div
            animate={{ y: [-4, 4, -4], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <MessageSquare className="w-10 h-10 text-white" />
          </motion.div>
          <motion.div
            className="absolute"
            animate={{ y: [4, -4, 4], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
          >
            <MessageSquare className="w-10 h-10 text-white transform scale-x-[-1]" />
          </motion.div>
        </div>
      );
    case "send":
        return (
            <div className={container}>
                <motion.div initial={{x: -100, opacity: 0}} animate={{x: 100, opacity: [0, 1, 0]}} transition={{duration: 2.5, repeat: Infinity, ease: 'linear'}}>
                    <Send className="w-16 h-16 text-white"/>
                </motion.div>
            </div>
        );
    case "clock":
        return (
            <div className={container}>
                <motion.div className="w-24 h-24 border-2 border-white/50 rounded-full"/>
                <motion.div className="absolute w-0.5 h-8 bg-white" style={{originY: 1, top: '50%', left: '50%', transform: 'translate(-50%, -100%)'}} animate={{rotate: 360}} transition={{duration: 10, repeat: Infinity, ease: 'linear'}}/>
            </div>
        );
    case "bell":
        return (
            <motion.div className={container} animate={{rotate: [0, -10, 10, -10, 10, 0]}} transition={{duration: 1.8, repeat: Infinity, ease: 'easeInOut'}}>
                <Bell className="w-16 h-16 text-white"/>
            </motion.div>
        );
    case "nodes":
        return (
            <svg className={container} viewBox="0 0 100 50">
                <motion.line x1="15" y1="25" x2="85" y2="25" stroke="white" strokeWidth="1" strokeDasharray="2 2"/>
                <motion.circle cx="15" cy="25" r="4" fill="white" animate={{cx: 85}} transition={{duration: 4, repeat: Infinity, repeatType: "reverse", ease: 'easeInOut'}}/>
                <motion.circle cx="85" cy="25" r="4" fill="white" animate={{cx: 15}} transition={{duration: 4, repeat: Infinity, repeatType: "reverse", ease: 'easeInOut'}}/>
            </svg>
        );
    case "gears":
        return (
            <div className={container}>
                <motion.div animate={{rotate: 360}} transition={{duration: 12, repeat: Infinity, ease: 'linear'}}><Settings className="w-16 h-16 text-white/80"/></motion.div>
                <motion.div className="absolute" animate={{rotate: -360}} transition={{duration: 8, repeat: Infinity, ease: 'linear'}}><Settings className="w-12 h-12 text-white/60"/></motion.div>
            </div>
        );
    case "cycle":
        return (
            <motion.div className={container} animate={{rotate: 360}} transition={{duration: 8, repeat: Infinity, ease: 'linear'}}>
                <ArrowRightLeft className="w-16 h-16 text-white"/>
            </motion.div>
        );
    case "dashboard":
        return (
            <div className={`${container} flex items-end gap-2`}>
                <motion.div className="w-5 bg-white/70 rounded-t" animate={{height: ['25%', '75%', '45%']}} transition={{duration: 2.5, repeat: Infinity, repeatType: "mirror"}}/>
                <motion.div className="w-5 bg-white/50 rounded-t" animate={{height: ['55%', '35%', '65%']}} transition={{duration: 2.5, repeat: Infinity, repeatType: "mirror", delay: 0.5}}/>
                <motion.div className="w-5 bg-white/70 rounded-t" animate={{height: ['40%', '60%', '30%']}} transition={{duration: 2.5, repeat: Infinity, repeatType: "mirror", delay: 1}}/>
            </div>
        );
    case "lightbulb":
        return (
            <motion.div className={container} animate={{scale: [1, 1.05, 1], filter: ['brightness(1.2)', 'brightness(1.8)', 'brightness(1.2)']}} transition={{duration: 2, repeat: Infinity, repeatType: "mirror"}}>
                <Zap className="w-20 h-20 text-yellow-400"/>
            </motion.div>
        );
    case "file":
        return (
            <div className={container}>
                <FileText className="w-16 h-16 text-white"/>
                <motion.div className="absolute w-10 h-0.5 bg-white/80" style={{top: '40%'}} initial={{scaleX: 0, originX: 0}} animate={{scaleX: 1}} transition={{duration: 2, repeat: Infinity, delay: 0.5, repeatType: "reverse"}}/>
                <motion.div className="absolute w-10 h-0.5 bg-white/80" style={{top: '50%'}} initial={{scaleX: 0, originX: 0}} animate={{scaleX: 1}} transition={{duration: 2, repeat: Infinity, delay: 1, repeatType: "reverse"}}/>
                <motion.div className="absolute w-10 h-0.5 bg-white/80" style={{top: '60%'}} initial={{scaleX: 0, originX: 0}} animate={{scaleX: 1}} transition={{duration: 2, repeat: Infinity, delay: 1.5, repeatType: "reverse"}}/>
            </div>
        );
    default:
      return null;
  }
};