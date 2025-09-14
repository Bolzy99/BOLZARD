"use client"

import { motion, useMotionValue, useTransform, animate, useScroll, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState, memo } from 'react'
import ParticleBackground from './ParticleBackground'

// Memoize the heavy ParticleBackground component to prevent it from re-rendering
const MemoizedParticleBackground = memo(ParticleBackground);

const MagneticLetter = ({ children }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const moveX = clientX - (left + width / 2);
        const moveY = clientY - (top + height / 2);

        if (Math.sqrt(moveX ** 2 + moveY ** 2) < 150) {
            animate(x, moveX * 0.4, { type: 'spring', stiffness: 250, damping: 20 });
            animate(y, moveY * 0.4, { type: 'spring', stiffness: 250, damping: 20 });
        } else {
            animate(x, 0, { type: 'spring', stiffness: 100, damping: 15 });
            animate(y, 0, { type: 'spring', stiffness: 100, damping: 15 });
        }
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <motion.span ref={ref} style={{ x, y }} className="inline-block relative gradient-text">
            {children}
        </motion.span>
    );
};

const ChatBubble = ({ message, avatar, isBot, hasButtons }) => (
    <motion.div
        layout
        initial={{ opacity: 0, x: -30, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 30, scale: 0.9 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`flex items-start gap-3 w-fit max-w-[90%] ${isBot ? '' : 'self-end'}`}
    >
        {!isBot && <img src={avatar} alt="User" className="size-8 rounded-full object-cover mt-1" />}
        <div
            className={`rounded-2xl px-4 py-3 text-sm md:text-base ${isBot
                    ? 'bg-purple-500/10 text-neutral-200 rounded-bl-lg'
                    : 'bg-white/5 text-neutral-300 self-end rounded-br-lg'
                }`}
        >
            <p>{message}</p>
            {hasButtons && (
                <div className="mt-3 flex flex-wrap gap-2">
                    <motion.button className="rounded-lg bg-purple-600/50 px-3 py-1.5 text-white/90 text-xs sm:text-sm">
                        Schedule a Call
                    </motion.button>
                    <motion.button className="rounded-lg bg-white/10 px-3 py-1.5 text-white/90 text-xs sm:text-sm">
                        Learn More
                    </motion.button>
                </div>
            )}
        </div>
        {isBot && <div className="size-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold mt-1">B</div>}
    </motion.div>
);

const Hero = () => {
    const brandName = "AUTOMATE YOUR ENTIRE WORLD";
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    const notificationOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // **FIX:** Restructured conversation flow for a natural, back-and-forth exchange
    const conversationFlow = [
        { id: 1, text: 'Can you create a website chatbot for me?', avatar: 'https://i.pravatar.cc/32?u=user1', isBot: false },
        { id: 2, text: 'Yes, we build custom website chatbots to engage visitors 24/7.', isBot: true, hasButtons: true },
        { id: 3, text: 'Can you automate replies on Instagram as if I\'m replying?', avatar: 'https://i.pravatar.cc/32?u=user2', isBot: false },
        { id: 4, text: 'Absolutely. Our system handles Instagram DMs with a human-like touch.', isBot: true, hasButtons: true },
        { id: 5, text: 'What about scaling my outreach with cold texting?', avatar: 'https://i.pravatar.cc/32?u=user3', isBot: false },
        { id: 6, text: 'We handle that too. Our platform automates personalized cold texts to fill your sales pipeline.', isBot: true, hasButtons: true },
    ];

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // **FIX:** More robust logic for cycling through the conversation
        let index = 0;
        const interval = setInterval(() => {
            // Determine the current and previous messages to display
            const currentMessage = conversationFlow[index % conversationFlow.length];
            const prevIndex = (index - 1 + conversationFlow.length) % conversationFlow.length;
            const previousMessage = conversationFlow[prevIndex];

            // Always show two messages after the first cycle
            if (index > 0) {
                setMessages([previousMessage, currentMessage]);
            } else {
                setMessages([currentMessage]); // Show only one message at the start
            }
            
            index++;
        }, 4000); // Cycle every 4 seconds

        return () => clearInterval(interval);
    }, []); // Empty dependency array ensures this effect runs only once

    return (
        <section ref={heroRef} id="home" className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
            <MemoizedParticleBackground />
            
            <div className="text-center z-10 px-6">
                <h1 className="text-4xl md:text-7xl font-black mb-4">
                    {brandName.split("").map((letter, i) => (
                        <MagneticLetter key={i}>{letter === " " ? "\u00A0" : letter}</MagneticLetter>
                    ))}
                </h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }} className="text-base md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto font-medium">
                    From social media and content creation to your daily tasks, BOLZARD brings the power of intelligent automation to every corner of your digital life.
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.7, ease: 'easeOut' }}>
                    <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 35px rgba(255, 69, 0, 0.6)" }} whileTap={{ scale: 0.95 }} className="px-6 py-4 bg-primary rounded-full text-white text-base font-bold shadow-lg transition-all duration-300 cursor-pointer">
                        BEGIN WITH YOUR AUTOMATION JOURNEY
                    </motion.button>
                </motion.div>
            </div>

            <div className="absolute bottom-6 left-2 sm:left-8 md:left-12 w-[90%] max-w-sm">
                <motion.div style={{ opacity: notificationOpacity }} className="flex flex-col gap-4">
                    <AnimatePresence>
                        {messages.map((msg) => (
                            <ChatBubble 
                                key={msg.id} // The simple ID key now works because we replace the whole array
                                message={msg.text} 
                                avatar={msg.avatar} 
                                isBot={msg.isBot} 
                                hasButtons={msg.hasButtons} 
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    )
}

export default Hero;
