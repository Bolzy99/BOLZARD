// src/app/components/Features.jsx
"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

// Enhanced features data with outcome-driven copy and premium positioning
const features = [
  {
    title: 'Context-Aware AI Chatbots',
    description: 'Autonomous sales agents that understand intent, handle objections, and guide visitors to conversion. Not a generic support script—a revenue driver.',
    benefits: [
      'Natural Language Understanding (NLU)',
      'Instant Lead Qualification',
      'Seamless Calendar Integration',
      'Knowledge Base Training'
    ],
    imageUrl: '/images/chatbot-feature.png',
    gradient: 'from-blue-500 to-cyan-400',
    icon: '🧠'
  },
  {
    title: 'Background Outreach Engine',
    description: 'Scale your prospecting without manual effort. Our system identifies, enriches, and engages leads across multiple channels continuously in the background.',
    benefits: [
      'Multi-Channel Sequencing (Email/SMS/Social)',
      'Automated List Enrichment',
      'Smart Reply Detection',
      'A/B Testing Infrastructure'
    ],
    imageUrl: '/images/outreach-feature.png',
    gradient: 'from-purple-500 to-pink-500',
    icon: '⚡'
  },
  {
    title: 'Workflow Infrastructure',
    description: 'Transform fragmented tasks into a unified business logic. We connect your entire tech stack to eliminate data silos and manual operational drag.',
    benefits: [
      'End-to-End Process Mapping',
      'Error Handling & Recovery',
      'Custom API Integrations',
      'Real-Time Data Sync'
    ],
    imageUrl: '/images/workflow-feature.png',
    gradient: 'from-orange-500 to-amber-400',
    icon: '🔄'
  },
  {
    title: 'Decision Intelligence',
    description: 'Move beyond vanity metrics. Get actionable insights into pipeline health, agent performance, and conversion bottlenecks to optimize ROI.',
    benefits: [
      'Conversion Rate Optimization',
      'Pipeline Velocity Tracking',
      'Attribution Modeling',
      'Custom Executive Dashboards'
    ],
    imageUrl: '/images/analytics-feature.png',
    gradient: 'from-emerald-500 to-teal-400',
    icon: '📊'
  }
]

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0)

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* 
        Global background preserved: 
        No solid background colors applied to section or container.
        Using only gradients and blurs for visibility.
      */}
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight drop-shadow-lg">
            Enterprise-Grade <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Automation Infrastructure
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            We don't just implement tools. We build the invisible engine that powers your growth, 
            handling thousands of interactions while you focus on strategy.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Feature Navigation */}
          <div className="w-full lg:w-5/12 space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveFeature(index)}
                className={`
                  group relative p-6 rounded-2xl cursor-pointer transition-all duration-500 overflow-hidden
                  border backdrop-blur-sm
                  ${activeFeature === index 
                    ? 'border-white/20 bg-white/5 shadow-2xl' 
                    : 'border-transparent hover:bg-white/5 hover:border-white/10'
                  }
                `}
              >
                {/* Active Glow Gradient */}
                <div 
                  className={`absolute inset-0 opacity-0 transition-opacity duration-700 pointer-events-none
                    bg-gradient-to-r ${feature.gradient} blur-3xl -z-10
                    ${activeFeature === index ? 'opacity-20' : 'group-hover:opacity-10'}
                  `}
                />

                <div className="flex items-start gap-5 relative z-10">
                  {/* Icon Container */}
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center text-2xl
                    transition-all duration-500 shadow-inner
                    ${activeFeature === index 
                      ? 'bg-gradient-to-br from-white/20 to-white/5 text-white scale-110 ring-1 ring-white/30' 
                      : 'bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-slate-200'
                    }
                  `}>
                    {feature.icon}
                  </div>

                  <div className="flex-1">
                    <h3 className={`
                      text-xl font-bold mb-2 transition-colors duration-300
                      ${activeFeature === index ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}
                    `}>
                      {feature.title}
                    </h3>
                    
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: activeFeature === index ? 'auto' : 0,
                        opacity: activeFeature === index ? 1 : 0
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-slate-300 text-sm leading-relaxed mb-4">
                        {feature.description}
                      </p>
                      
                      {/* Interactive Benefits List */}
                      <div className="space-y-2 pt-2 border-t border-white/10">
                        {feature.benefits.map((benefit, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3 text-xs font-medium text-slate-400 group-hover/item:text-white"
                          >
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.gradient}`} />
                            {benefit}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Progress Indicator for Active Item */}
                {activeFeature === index && (
                  <motion.div 
                    layoutId="active-bar"
                    className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${feature.gradient}`}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="w-full lg:w-7/12 sticky top-32">
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/40 backdrop-blur-xl group">
              
              {/* Dynamic Glow Behind Image */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={`glow-${activeFeature}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className={`absolute inset-0 bg-gradient-to-tr ${features[activeFeature].gradient} blur-[100px] z-0`}
                />
              </AnimatePresence>

              {/* Feature Image with Transitions */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  transition={{ duration: 0.6, ease: "circOut" }}
                  className="relative z-10 w-full h-full p-1"
                >
                  <div className="w-full h-full rounded-2xl overflow-hidden relative">
                    {/* Glass Overlay/Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-20 mix-blend-overlay" />
                    
                    <img 
                      src={features[activeFeature].imageUrl}
                      alt={features[activeFeature].title}
                      className="w-full h-full object-cover object-center transform transition-transform duration-[10s] ease-linear group-hover:scale-110"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Floating Status Badge */}
              <motion.div 
                key={`badge-${activeFeature}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute bottom-6 right-6 z-30 flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 border border-white/10 backdrop-blur-md"
              >
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-gradient-to-r ${features[activeFeature].gradient}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 bg-gradient-to-r ${features[activeFeature].gradient}`}></span>
                </span>
                <span className="text-xs font-mono text-white/90 tracking-wide uppercase">System Active</span>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Features
