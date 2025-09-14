"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Globe, Send } from 'lucide-react';

// --- Child Components (Defined first for clarity) ---

const IPhoneFrame = ({ children }) => (
    <div className="relative w-full max-w-[300px] sm:max-w-[320px] aspect-[9/19.5] bg-neutral-800 rounded-[44px] p-2.5 shadow-2xl border-4 border-neutral-900">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140px] h-6 bg-neutral-900 rounded-b-xl z-20" />
        <div className="w-full h-full bg-black rounded-[34px] overflow-hidden relative">
            {children}
        </div>
    </div>
);

const InstagramSimulation = () => (
    <div className="h-full bg-black flex flex-col">
        <div className="p-3 flex items-center gap-3 border-b border-neutral-800 flex-shrink-0">
            <img src="https://i.pravatar.cc/40?u=brand-logo" alt="Brand" className="size-9 rounded-full border-2 border-purple-500"/>
            <div>
                <p className="font-bold text-white">YourBrand</p>
                <p className="text-xs text-green-400">Online</p>
            </div>
        </div>
        <motion.div 
            className="p-4 flex-grow flex flex-col gap-4 overflow-hidden"
            variants={{ visible: { transition: { staggerChildren: 1.2 } } }}
            initial="hidden" animate="visible"
        >
            <motion.p variants={{ hidden: { opacity: 0, x: -15 }, visible: { opacity: 1, x: 0 } }} className="p-3 bg-neutral-800 rounded-2xl rounded-bl-md w-fit max-w-[75%] text-sm">Hey! Is this product available?</motion.p>
            <motion.p variants={{ hidden: { opacity: 0, x: 15 }, visible: { opacity: 1, x: 0 } }} className="p-3 bg-purple-600 rounded-2xl rounded-br-md w-fit max-w-[75%] self-end text-sm">It sure is! And for a limited time, we have a 15% discount. Want the link?</motion.p>
            <motion.p variants={{ hidden: { opacity: 0, x: -15 }, visible: { opacity: 1, x: 0 } }} className="p-3 bg-neutral-800 rounded-2xl rounded-bl-md w-fit max-w-[75%] text-sm">Yes please!</motion.p>
        </motion.div>
        <div className="p-3 border-t border-neutral-800">
            <div className="w-full bg-neutral-800 rounded-full h-8" />
        </div>
    </div>
);

const WebsiteSimulation = () => (
    <div className="h-full w-full bg-slate-100 flex flex-col justify-end relative rounded-[34px]">
        <motion.div className="p-4 space-y-3" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 1.2 } } }}>
            <motion.p variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} className="p-2.5 text-sm text-black bg-white shadow-md rounded-lg w-fit max-w-[75%]">I'd like to book a demo for my team.</motion.p>
            <motion.p variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} className="p-2.5 text-sm bg-purple-600 text-white rounded-lg w-fit max-w-[75%] self-end ml-auto">Of course! What time works best for you tomorrow?</motion.p>
            <motion.p variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} className="p-2.5 text-sm text-black bg-white shadow-md rounded-lg w-fit max-w-[75%]">2 PM works great. Can you send a calendar invite?</motion.p>
            <motion.p variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} className="p-2.5 text-sm bg-purple-600 text-white rounded-lg w-fit max-w-[75%] self-end ml-auto">Absolutely. The invite has been sent. Looking forward to it!</motion.p>
        </motion.div>
        <div className="absolute bottom-5 right-5 bg-purple-600 rounded-full size-12 sm:size-14 flex items-center justify-center shadow-xl">
            <Globe className="text-white" size={28} />
        </div>
    </div>
);

const OutreachSimulation = () => (
    <div className="h-full bg-black text-white p-4 sm:p-6 flex flex-col justify-center text-left">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.8 } } }}>
            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="mb-4">
                <p className="font-bold text-purple-400">1. Define Ideal Client</p>
                <p className="text-sm text-neutral-300 mt-1">SaaS founders with 10-50 employees</p>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="mb-4">
                <p className="font-bold text-purple-400">2. Cold Text & AI Convo</p>
                <p className="text-sm text-neutral-300 mt-1">Our AI brain initiates and warms up 500+ leads automatically.</p>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="mb-4">
                <p className="font-bold text-purple-400">3. Result</p>
                <p className="text-lg font-bold text-green-400 mt-1">23 Calls Booked This Week</p>
            </motion.div>
        </motion.div>
    </div>
);

const features = [
    { id: 'instagram', title: 'Instagram Automation', description: 'Engage followers instantly with an AI that mirrors your voice.', icon: <Instagram size={24} />, visual: <InstagramSimulation /> },
    { id: 'website', title: 'Intelligent Web Chat', description: 'Convert visitors into leads 24/7 with a bot that never sleeps.', icon: <Globe size={24} />, visual: <WebsiteSimulation /> },
    { id: 'outreach', title: 'Automated Cold Outreach', description: 'Scale outreach by scraping leads and initiating conversations automatically.', icon: <Send size={24} />, visual: <OutreachSimulation /> },
];

const AutomationFeatures = () => {
    const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            setSelectedFeatureIndex(prevIndex => (prevIndex + 1) % features.length);
        }, 8000);
        return () => clearInterval(timer);
    }, [isPaused]);

    const selectedFeature = features[selectedFeatureIndex];

    return (
        <section
            id="automation-features"
            className="relative z-10 w-full py-20 md:py-28 text-white"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 px-6 items-center transform scale-[0.6] lg:scale-100">
                <div className="flex flex-col">
                    <h2 className="text-4xl md:text-5xl font-bold mb-10">See It In Action</h2>
                    <div className="space-y-4">
                        {features.map((feature, index) => (
                            <div
                                key={feature.id}
                                className="p-5 rounded-xl cursor-pointer transition-all duration-300 relative border-2 border-transparent hover:border-purple-500/50"
                                style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                                onClick={() => setSelectedFeatureIndex(index)}
                            >
                                {selectedFeatureIndex === index && (
                                    <motion.div 
                                        layoutId="activeFeatureHighlight"
                                        className="absolute inset-0 border-2 border-purple-500 rounded-xl"
                                        initial={false}
                                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <div className="flex items-center gap-4">
                                    <div className="text-purple-400">{feature.icon}</div>
                                    <h3 className="text-lg font-bold">{feature.title}</h3>
                                </div>
                                <p className="mt-1 text-white/60 pl-10 text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative w-full flex items-center justify-center">
                    <IPhoneFrame>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedFeature.id}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="w-full h-full"
                            >
                                {selectedFeature.visual}
                            </motion.div>
                        </AnimatePresence>
                    </IPhoneFrame>
                </div>
            </div>
        </section>
    );
};

export default AutomationFeatures;
