"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
// NEW: Imported the Smile icon for the Humour mood
import { MessageSquare, Send, X, Bot, Zap, Coffee, Smile } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


// --- CONFIGURATION ---
const WEBHOOK_URL = "https://suitable-rapidly-terrier.ngrok-free.app/webhook/skynet"; 
const BOT_NAME = "BOLZARD AI";
const INITIAL_MESSAGE = {
  id: "init",
  sender: "bot",
  text: "Welcome to BOLZARD! I'm your personal automation architect. I can also chat in other languages. Just let me know!",
  quickReplies: [
    { text: "What can you do?", value: "features" },
    { text: "What services do you offer?", value: "services" },
    { text: "Book a free demo", value: "demo" },
  ],
};



// --- SUB-COMPONENTS ---

const TypingIndicator = () => (
  <motion.div
    className="flex items-center space-x-2 p-3"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
  >
    <span className="text-sm text-slate-400">Thinking...</span>
    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-pulse [animation-delay:0s]" />
    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-pulse [animation-delay:0.2s]" />
    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-pulse [animation-delay:0.4s]" />
  </motion.div>
);


const ChatMessage = ({ message }) => {
  const isUser = message.sender === "user";

  return (
    <motion.div
      className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center flex-shrink-0">
          <Bot size={20} className="text-white" />
        </div>
      )}
      <div
        className={`max-w-xs md:max-w-md rounded-2xl p-3 text-white ${
          isUser
            ? "bg-primary rounded-br-none"
            : "bg-neutral-800 rounded-bl-none bg-gradient-to-br from-neutral-800 to-neutral-900"
        }`}
      >
        <p className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: message.text }} />
        
        {message.card && (
          <div className="mt-3 border-t border-white/10 pt-3">
            <div className="relative w-full h-32 rounded-lg overflow-hidden mb-2">
              <Image src={message.card.image} alt={message.card.title} fill className="object-cover" />
            </div>
            <h4 className="font-bold">{message.card.title}</h4>
            <p className="text-xs text-slate-300 mb-3">{message.card.description}</p>
            <Link href={message.card.cta.href}>
              <button className="w-full text-center text-xs py-2 bg-white/10 rounded-md hover:bg-white/20 transition-colors">
                {message.card.cta.text}
              </button>
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};


const QuickReplies = ({ replies, onReplyClick }) => (
  <motion.div
    className="flex flex-wrap gap-2 justify-start px-4 py-2"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.3 }}
  >
    {replies.map((reply) => (
      <button
        key={reply.value}
        onClick={() => onReplyClick(reply.text, reply.value)}
        className="text-sm border border-white/20 rounded-full px-3 py-1.5 hover:bg-white/10 transition-colors"
      >
        {reply.text}
      </button>
    ))}
  </motion.div>
);


const MoodSelector = ({ selectedMood, onMoodChange }) => {
    const moods = [
        { id: 'professional', icon: <Zap size={16} />, label: 'Professional' },
        { id: 'casual', icon: <Coffee size={16} />, label: 'Casual' },
        { id: 'funny', icon: <Bot size={16} />, label: 'Funny' },
        { id: 'humour', icon: <Smile size={16} />, label: 'Humour' }
    ];
    return (
        <div className="flex bg-neutral-800/60 p-1 rounded-full w-full justify-center">
            {moods.map(mood => (
                <button
                    key={mood.id}
                    onClick={() => onMoodChange(mood.id)}
                    className={`relative flex items-center gap-1.5 text-xs px-2 py-1 rounded-full transition-colors ${selectedMood === mood.id ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                >
                    {selectedMood === mood.id && (
                        <motion.div
                            layoutId="mood-selector-bubble"
                            className="absolute inset-0 bg-primary rounded-full z-0"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                    )}
                    <span className="relative z-10">{mood.icon}</span>
                    <span className="relative z-10">{mood.label}</span>
                </button>
            ))}
        </div>
    );
};



// --- MAIN CHATBOT WIDGET ---

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [mood, setMood] = useState('professional');
  const [language, setLanguage] = useState('en');
  const chatBodyRef = useRef(null);

  useEffect(() => {
    const savedState = sessionStorage.getItem("bolzard_chat_state");
    if (savedState) {
      const { messages, mood, language } = JSON.parse(savedState);
      setMessages(messages || [INITIAL_MESSAGE]);
      setMood(mood || 'professional');
      setLanguage(language || 'en');
    }
  }, []);

  useEffect(() => {
    const stateToSave = { messages, mood, language };
    sessionStorage.setItem("bolzard_chat_state", JSON.stringify(stateToSave));
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, mood, language]);

  const handleSendMessage = async (text, value = null) => {
    if (!text.trim()) return;

    const userMessage = { id: Date.now(), sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    if (value) {
      setTimeout(() => {
        let botResponse = {};
        if (value === "services") {
          botResponse = {
            id: Date.now() + 1,
            sender: "bot",
            text: "We specialize in three core areas: AI-powered Chatbots, Workflow Automation, and custom Web App development.",
          };
        } else if (value === "features") {
           botResponse = {
            id: Date.now() + 1,
            sender: "bot",
            text: "Happy to show you! Here's a look at our automated lead generation feature.",
            card: {
              image: "/images/book-call-feature.png",
              title: "Automated Lead Funnels",
              description: "Capture, qualify, and convert leads 24/7.",
              cta: { text: "See Case Study", href: "/case-studies/lead-funnels" },
            },
          };
        } else if (value === "demo") {
           botResponse = {
            id: Date.now() + 1,
            sender: "bot",
            text: "Excellent choice! Please visit our booking page to find a time that works for you.",
            card: {
              image: "/images/book-call-feature.png",
              title: "Book Your Free Demo",
              description: "Schedule a 30-minute call to get a personalized automation strategy.",
              cta: { text: "Book a Call", href: "/book-call" },
            },
          };
        }
        setMessages((prev) => [...prev, botResponse]);
        setIsLoading(false);
      }, 1500);
    } else {
      try {
        const response = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, language: language, mood: mood }),
        });

        if (!response.ok) throw new Error(`Webhook error: ${response.statusText}`);

        const data = await response.json(); 
        const botReplyText = data.reply || "Sorry, I couldn't process that. Please try again.";

        const botMessage = {
          id: Date.now() + 1,
          sender: "bot",
          text: botReplyText.replace(/\n/g, '<br />'),
        };

        setMessages((prev) => [...prev, botMessage]);

      } catch (error) {
        console.error("Error sending message to webhook:", error);
        const errorMessage = { id: Date.now() + 1, sender: "bot", text: "Sorry, I'm having trouble connecting right now." };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleQuickReplyClick = (text, value) => {
    handleSendMessage(text, value);
  };
  
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-28 right-4 w-[calc(100vw-32px)] max-w-sm h-[70vh] max-h-[600px] bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col z-50"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="p-4 border-b border-white/10 flex-shrink-0">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                        <h3 className="font-bold text-lg">{BOT_NAME}</h3>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-full">
                        <X size={20} />
                    </button>
                </div>
                <MoodSelector selectedMood={mood} onMoodChange={setMood} />
            </div>

            <div ref={chatBodyRef} className="flex-grow p-4 space-y-4 overflow-y-auto">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {isLoading && <TypingIndicator />}
              {!isLoading && messages[messages.length - 1]?.quickReplies && (
                <QuickReplies replies={messages[messages.length - 1].quickReplies} onReplyClick={handleQuickReplyClick} />
              )}
            </div>

            <div className="p-4 border-t border-white/10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(input);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full bg-neutral-800/50 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                />
                <button
                  type="submit"
                  className="bg-primary rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0"
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="fixed bottom-8 right-8 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white shadow-lg z-40"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, rotate: -15 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <AnimatePresence>
          {isOpen ? <X size={32} /> : <MessageSquare size={32} />}
        </AnimatePresence>
        <motion.div 
            className="absolute inset-0 rounded-full bg-primary"
            animate={{ 
                scale: [1, 1.4, 1],
                opacity: [0.7, 0, 0.7]
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
      </motion.button>
    </>
  );
}