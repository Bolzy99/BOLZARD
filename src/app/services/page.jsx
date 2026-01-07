// src/app/components/ServicesPage.jsx
"use client"
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const services = [
  {
    title: 'AI Voice Receptionist Agents',
    description: 'Deploy 24/7 multilingual voice agents that handle incoming calls, answer FAQs, and book reservations directly into your calendar without human intervention.',
    icon: '🎙️',
    features: ['Instant Call Answering', 'Real-time Transcription', 'CRM Integration', 'Multilingual Support'],
    image: '/images/service-voice.png' // Update path if needed
  },
  {
    title: 'Outreach & Nurture Engines',
    description: 'Automate your entire prospecting pipeline. Our background systems identify leads, enrich data, and execute multi-channel outreach campaigns (Email, SMS, WhatsApp) at scale.',
    icon: '🚀',
    features: ['Lead Identification', 'Multi-Channel Sequencing', 'Automated Follow-ups', 'Reply Detection'],
    image: '/images/service-outreach.png'
  },
  {
    title: 'Social Media DM Automation',
    description: 'Turn your DMs into a conversion channel. Qualify leads instantly on Instagram and Facebook with human-like conversations that guide users to purchase or book.',
    icon: '💬',
    features: ['Instant Replies', 'Lead Qualification', 'Story Reaction Handling', 'Comment-to-DM Triggers'],
    image: '/images/service-social.png'
  },
  {
    title: 'Intelligent Website Chatbots',
    description: 'More than a support tool. A context-aware sales agent that understands visitor intent, answers specific product questions, and drives conversions 24/7.',
    icon: '🧠',
    features: ['Contextual Understanding', 'Booking Integration', 'Knowledge Base Training', 'Live Handover'],
    image: '/images/service-website.png'
  },
  {
    title: 'Workflow & Internal Automation',
    description: 'Eliminate manual bottlenecks. We connect your apps (Slack, Airtable, HubSpot, etc.) to create a unified operating system that runs your business logic automatically.',
    icon: '⚙️',
    features: ['Custom API Integrations', 'Error Handling', 'Data Synchronization', 'Process Mapping'],
    image: '/images/analytics-feature.png'
  },
  {
    title: 'Conversion-Focused Web Development',
    description: 'High-performance websites and PWAs built for speed and SEO. Designed specifically to integrate seamlessly with our automation infrastructure for maximum leverage.',
    icon: '💻',
    features: ['Next.js Architecture', 'SEO Optimization', 'Fast Load Times', 'Automation Native'],
    image: '/images/service-seo.png'
  },
  {
    title: "Strategic Partnership",
    description: "Have a vision to reshape an industry? We partner with ambitious minds to build groundbreaking automated solutions. If you're ready to build the future, let's talk.",
    icon: '🤝',
    features: ['Co-Building Visionary Projects', 'Revenue Share Models', 'Industry Transformation', 'Long-term Partnership'],
    image: '/images/service-partner.png'
  }
]

const ServiceTile = ({ service, index }) => {
  const isEven = index % 2 === 0
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20 py-16`}
    >
      {/* Content Side */}
      <div className="flex-1 space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center text-2xl shadow-inner">
            {service.icon}
          </div>
          <span className="text-sm font-mono text-slate-500 uppercase tracking-widest">
            0{index + 1} / Capability
          </span>
        </div>

        <div>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            {service.title}
          </h3>
          <p className="text-slate-400 text-lg font-light leading-relaxed">
            {service.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {service.features.map((feature, i) => (
            <div 
              key={i}
              className="flex items-center gap-2 text-sm text-slate-300 bg-white/5 border border-white/5 rounded-lg px-3 py-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              {feature}
            </div>
          ))}
        </div>
      </div>

      {/* Image Side */}
      <div className="flex-1 w-full">
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
          {/* Glass Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent z-10 pointer-events-none" />
          
          {/* Hover Glow */}
          <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl z-20 pointer-events-none mix-blend-overlay" />

          {/* Image */}
          <div className="relative w-full h-full transform transition-transform duration-700 group-hover:scale-105">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const ServicesPage = () => {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Global Background Preserved (Transparent) */}
      
      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-32"
        >
          <div className="inline-block mb-6">
             <span className="py-1 px-4 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-mono tracking-widest uppercase">
               Our Capabilities
             </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            Built for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Infinite Scale
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            We don't just sell software. We architect and deploy complete automation ecosystems 
            that operate your business infrastructure with machine-like precision.
          </p>
        </motion.div>

        {/* Vertical Services Stack */}
        <div className="space-y-12">
          {services.map((service, index) => (
            <ServiceTile key={index} service={service} index={index} />
          ))}
        </div>

      </div>
    </section>
  )
}

export default ServicesPage
