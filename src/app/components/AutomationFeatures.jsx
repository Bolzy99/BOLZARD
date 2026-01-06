// src/app/components/AutomationFeatures.jsx
"use client"
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const features = [
  {
    id: 'voice',
    title: 'AI Voice Receptionist Agents',
    description: '24/7 multilingual agents that handle incoming calls, transcribe conversations, and book reservations directly into your calendar.',
    icon: '📞',
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    id: 'outreach',
    title: 'Outreach & Nurture Engine',
    description: 'A background system that identifies prospects, enriches data, and executes multi-channel nurture campaigns (SMS, Email, Social) at scale.',
    icon: '⚡',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'social',
    title: 'Social Media DM Automation',
    description: 'Instant, human-like replies on Instagram & Facebook. Qualify leads 24/7 and capture contact details without manual intervention.',
    icon: '💬',
    gradient: 'from-orange-500 to-amber-400',
  },
  {
    id: 'chatbot',
    title: 'Intelligent Website Chatbots',
    description: 'Context-aware sales agents that answer specific questions, demo your product, and guide website visitors to conversion.',
    icon: '🧠',
    gradient: 'from-emerald-500 to-teal-400',
  },
]

// -- UI COMPONENTS FOR PHONE SCREEN --

const VoiceUI = () => (
  <div className="flex flex-col items-center justify-between h-full pt-12 pb-8 px-6 bg-black/80 backdrop-blur-md relative overflow-hidden">
    {/* Background pulsing effect */}
    <div className="absolute inset-0 bg-blue-900/10 animate-pulse" />
    
    <div className="text-center z-10 w-full">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 mx-auto mb-4 flex items-center justify-center shadow-lg shadow-blue-500/20 ring-4 ring-white/5">
        <span className="text-3xl">🤖</span>
      </div>
      <h3 className="text-xl font-bold text-white mb-1">AI Receptionist</h3>
      <p className="text-blue-400 text-xs font-mono uppercase tracking-widest animate-pulse">● Live Call 00:23</p>
    </div>

    <div className="w-full space-y-3 z-10 flex-1 flex flex-col justify-center">
       {/* Transcript Bubbles */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none backdrop-blur-md"
      >
        <p className="text-xs text-blue-200 font-semibold mb-1">AI Agent</p>
        <p className="text-sm text-gray-200 leading-snug">Thanks for calling! I can definitely help with that booking.</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 }}
        className="bg-blue-600/20 border border-blue-500/30 p-3 rounded-2xl rounded-tr-none backdrop-blur-md ml-auto"
      >
        <p className="text-xs text-blue-300 font-semibold mb-1 text-right">Caller</p>
        <p className="text-sm text-white leading-snug">Great, do you have 2 PM open?</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.2 }}
        className="bg-green-500/10 border border-green-500/20 p-2 rounded-lg flex items-center gap-3 backdrop-blur-md mt-2"
      >
         <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">📅</div>
         <div>
            <p className="text-xs text-green-200 font-bold">Booking Confirmed</p>
            <p className="text-[10px] text-green-300/70">Tuesday, 2:00 PM added to Calendar</p>
         </div>
      </motion.div>
    </div>

    {/* End Call Button */}
    <div className="w-14 h-14 rounded-full bg-red-500/90 flex items-center justify-center shadow-lg z-10 mt-auto hover:bg-red-500 transition-colors">
      <span className="text-xl text-white">📞</span>
    </div>
  </div>
)

// UPDATED: System Dashboard UI (No Chat Bubbles)
const OutreachUI = () => (
  <div className="h-full bg-slate-950/90 backdrop-blur-xl flex flex-col relative overflow-hidden text-white">
    {/* Header */}
    <div className="p-4 border-b border-white/5 bg-white/5">
      <div className="flex justify-between items-center mb-1">
        <h4 className="font-bold text-sm tracking-wide">Campaign Status</h4>
        <span className="flex items-center gap-1 text-[10px] text-green-400 bg-green-900/30 px-2 py-0.5 rounded-full border border-green-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/> Active
        </span>
      </div>
      <p className="text-[10px] text-slate-400 font-mono">ID: #CAM-8821 • "Lead Reactivation"</p>
    </div>

    {/* Dashboard Stats */}
    <div className="grid grid-cols-2 gap-3 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/5 p-3 rounded-xl"
      >
        <p className="text-[10px] text-slate-400 mb-1">Prospects Found</p>
        <p className="text-xl font-bold text-white">1,248</p>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-purple-500/10 border border-purple-500/20 p-3 rounded-xl"
      >
        <p className="text-[10px] text-purple-300 mb-1">Enriched Data</p>
        <p className="text-xl font-bold text-purple-100">98%</p>
      </motion.div>
    </div>

    {/* Pipeline Visualizer */}
    <div className="flex-1 px-4 py-2 space-y-4">
       <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold pl-1">Live Execution Pipeline</p>
       
       <div className="relative pl-4 border-l border-white/10 space-y-6">
          {/* Step 1 */}
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
             <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-slate-950" />
             <div className="bg-blue-500/10 border border-blue-500/20 p-2 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <span className="text-xs">🔍</span>
                   <span className="text-xs font-medium text-blue-200">Identifying Targets</span>
                </div>
                <span className="text-[10px] text-blue-300 animate-pulse">Scanning...</span>
             </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="relative"
          >
             <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-purple-500 ring-4 ring-slate-950" />
             <div className="bg-purple-500/10 border border-purple-500/20 p-2 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                   <span className="text-xs font-medium text-purple-200">Multi-Channel Outreach</span>
                </div>
                <div className="flex gap-2">
                   {['📧', '💬', '📱'].map((icon, i) => (
                      <motion.div 
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1 + (i * 0.2) }}
                        className="w-6 h-6 rounded bg-purple-500/20 flex items-center justify-center text-[10px] border border-purple-500/30"
                      >
                        {icon}
                      </motion.div>
                   ))}
                </div>
             </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8 }}
            className="relative"
          >
             <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-green-500 ring-4 ring-slate-950" />
             <div className="bg-green-500/10 border border-green-500/20 p-2 rounded-lg flex items-center justify-between">
                <span className="text-xs font-medium text-green-200">Replies Detected</span>
                <span className="text-xs font-bold text-green-400">24</span>
             </div>
          </motion.div>
       </div>
    </div>
  </div>
)

const SocialUI = () => (
  <div className="h-full bg-black flex flex-col relative overflow-hidden">
    {/* Instagram Header */}
    <div className="bg-white/5 backdrop-blur-sm p-4 border-b border-white/10 flex items-center justify-between z-10">
       <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600" />
          <span className="text-white font-bold text-sm">Instagram Business</span>
       </div>
    </div>

    <div className="flex-1 p-4 space-y-6 overflow-y-auto">
       {/* Story Reply */}
       <motion.div 
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         className="flex items-end gap-2"
       >
         <div className="w-6 h-6 rounded-full bg-gray-700 border border-white/10" />
         <div className="space-y-1">
            <div className="bg-white/10 border border-white/5 p-3 rounded-2xl rounded-bl-none max-w-[85%]">
              <p className="text-[10px] text-gray-400 mb-1 flex items-center gap-1">↩ Replied to story</p>
              <p className="text-sm text-white">Hey! How much is the starter package?</p>
            </div>
         </div>
       </motion.div>

       {/* AI Processing */}
       <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          exit={{ opacity: 0 }}
          className="flex items-center gap-2 ml-8"
       >
         <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" />
         <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce delay-75" />
         <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce delay-150" />
       </motion.div>

       {/* AI Response */}
       <motion.div 
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 1.5 }}
         className="bg-blue-600 p-3 rounded-2xl rounded-br-none ml-auto max-w-[90%] shadow-lg shadow-blue-900/20"
       >
         <p className="text-sm text-white leading-relaxed">Hi! 👋 Our starter plan begins at $1k/mo. Are you looking for this for an agency or local business?</p>
       </motion.div>

       {/* Lead Tagging */}
       <motion.div 
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ delay: 2.2 }}
         className="flex justify-center"
       >
          <span className="text-[10px] text-orange-300 bg-orange-900/30 px-2 py-1 rounded border border-orange-500/20">
             ⚡ Lead Qualified: "Pricing Inquiry"
          </span>
       </motion.div>
    </div>
  </div>
)

const ChatbotUI = () => (
  <div className="h-full bg-slate-50 flex flex-col relative overflow-hidden">
    {/* Website Mockup Header */}
    <div className="bg-white p-3 border-b border-slate-200 flex items-center gap-2 shadow-sm z-10">
      <div className="bg-slate-100 px-2 py-1 rounded text-[10px] text-slate-400 flex-1 text-center font-mono">bolzard.com</div>
    </div>
    
    {/* Website Content Placeholder */}
    <div className="p-4 space-y-3 opacity-50 bg-slate-50 flex-1">
       <div className="h-6 w-3/4 bg-slate-200 rounded animate-pulse" />
       <div className="h-3 w-full bg-slate-200 rounded" />
       <div className="h-24 w-full bg-slate-200 rounded mt-2" />
    </div>

    {/* Chat Widget Overlay */}
    <motion.div 
      initial={{ y: 300 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 25 }}
      className="absolute bottom-0 left-0 right-0 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.1)] h-[70%] rounded-t-3xl flex flex-col overflow-hidden"
    >
       <div className="bg-emerald-600 p-4 text-white flex justify-between items-center shadow-md z-10">
         <div>
            <p className="font-bold text-sm">Support Agent</p>
            <p className="text-[10px] text-emerald-100 opacity-80">Online • Replies instantly</p>
         </div>
         <span className="w-2 h-2 rounded-full bg-green-300 shadow-[0_0_10px_rgba(134,239,172,0.8)]" />
       </div>
       
       <div className="flex-1 p-4 space-y-4 bg-slate-50/50 overflow-y-auto">
          <div className="flex gap-2">
             <div className="w-7 h-7 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-xs shadow-sm">🤖</div>
             <div className="bg-white p-2.5 rounded-xl rounded-tl-none text-xs text-slate-700 shadow-sm border border-slate-100 max-w-[85%]">
                Hi there! 👋 Looking to automate your workflows?
             </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="flex justify-end"
          >
             <div className="bg-emerald-600 p-2.5 rounded-xl rounded-tr-none text-xs text-white shadow-md max-w-[85%]">
                Yes, do you integrate with HubSpot?
             </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2 }}
            className="flex gap-2"
          >
             <div className="w-7 h-7 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-xs shadow-sm">🤖</div>
             <div className="bg-white p-2.5 rounded-xl rounded-tl-none text-xs text-slate-700 shadow-sm border border-slate-100 max-w-[85%]">
                <p className="mb-2">We absolutely do! Full two-way sync.</p>
                <div className="bg-slate-50 border border-slate-200 rounded p-2 text-center hover:bg-slate-100 transition-colors cursor-pointer">
                   <span className="text-emerald-600 font-bold block mb-0.5">📅 Book a Demo</span>
                   <span className="text-[9px] text-slate-400">15 min discovery call</span>
                </div>
             </div>
          </motion.div>
       </div>
    </motion.div>
  </div>
)

// -- MAIN COMPONENT --

const AutomationFeatures = () => {
  const [activeFeature, setActiveFeature] = useState(0)

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* NO background color on section to allow global animation to show through */}

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        
        {/* Left Side: Features List */}
        <div className="w-full lg:w-1/2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight drop-shadow-lg">
              Systems that work <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 filter drop-shadow-sm">
                while you sleep.
              </span>
            </h2>
            <p className="text-slate-300 text-lg max-w-lg leading-relaxed shadow-black drop-shadow-md">
              We don't just build "chatbots". We engineer complete AI infrastructures that handle your business's critical interactions autonomously.
            </p>
          </motion.div>

          <div className="space-y-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                onClick={() => setActiveFeature(index)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group p-5 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden backdrop-blur-sm ${
                  activeFeature === index
                    ? 'bg-white/10 border-white/20 shadow-lg'
                    : 'bg-transparent border-transparent hover:bg-white/5'
                }`}
              >
                {/* Active Indicator Line */}
                {activeFeature === index && (
                  <motion.div 
                    layoutId="active-indicator"
                    className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${feature.gradient}`}
                  />
                )}

                <div className="flex items-start gap-5 relative z-10">
                  <div className={`text-2xl p-3 rounded-xl bg-black/40 border border-white/5 transition-all duration-300 ${
                    activeFeature === index ? 'scale-110 shadow-inner' : 'scale-100'
                  }`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold mb-1.5 transition-colors ${
                      activeFeature === index ? 'text-white' : 'text-slate-200'
                    }`}>
                      {feature.title}
                    </h3>
                    <p className={`text-sm leading-relaxed transition-colors ${
                       activeFeature === index ? 'text-slate-200' : 'text-slate-400'
                    }`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Premium Phone Mockup */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end z-20">
          <div className="relative w-[300px] md:w-[340px] h-[640px] md:h-[680px] bg-black rounded-[3.5rem] border-[8px] border-gray-900 shadow-2xl overflow-hidden ring-1 ring-white/20 backdrop-blur-md">
            
            {/* Dynamic Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-50 flex justify-center items-end pb-1 gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-gray-800" />
               <div className="w-12 h-1.5 rounded-full bg-gray-800" />
            </div>
            
            {/* Screen Content Area */}
            <div className="w-full h-full relative bg-gray-900">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="w-full h-full"
                >
                  {activeFeature === 0 && <VoiceUI />}
                  {activeFeature === 1 && <OutreachUI />}
                  {activeFeature === 2 && <SocialUI />}
                  {activeFeature === 3 && <ChatbotUI />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Reflection Glare */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none z-40 rounded-[3rem]" />
          </div>
        </div>

      </div>
    </section>
  )
}

export default AutomationFeatures
