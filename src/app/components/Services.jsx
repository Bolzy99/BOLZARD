// src/app/components/Services.jsx
"use client"
import { motion } from 'framer-motion'

// ... (services array and cardVariants remain the same)
const services = [
  { icon: '💬', title: 'Chatbot Integration', description: '24/7 intelligent chatbots for Instagram, WhatsApp, and more.' },
  { icon: '🚀', title: 'Cold Outreach Automation', description: 'Scale outreach with personalized, automated messaging sequences.' },
  { icon: '🔄', title: 'Workflow Automation', description: 'Connect your apps and automate repetitive business tasks seamlessly.' },
];

const cardVariants = { /* same as before */ };

const Services = () => {
  return (
    <section id="services" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* ... (h2 remains the same) */}
        <h2 className="text-5xl font-bold text-center mb-16 gradient-text">
          Automation Services
        </h2>

        <motion.div
          // ... (motion.div props are the same)
          className="grid md:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className="relative rounded-xl overflow-hidden group p-8 bg-gray-900/50 border border-white/10"
            >
              {/* Previous glowing background effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, var(--color-primary), transparent 70%)`,
                  filter: 'blur(30px)',
                }}
              />
              
              {/* NEW: Scanner Line */}
              <div 
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"
                style={{
                  animation: `scan 4s ease-in-out infinite`,
                  animationDelay: `${index * 0.3}s`,
                }}
              />

              <div className="relative z-10">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-slate-400">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Services