// src/app/components/Services.jsx
"use client"
import { motion } from 'framer-motion'

const services = [
  {
    icon: '📞',
    title: 'AI Voice Receptionists',
    description: '24/7 multilingual agents that handle calls, bookings, and FAQs instantly.',
  },
  {
    icon: '⚡',
    title: 'Outreach & Nurture Systems',
    description: 'Automated, personalized follow-ups across SMS & Email to reactivate leads.',
  },
  {
    icon: '💬',
    title: 'Social Media DM Automation',
    description: 'Instant, human-like replies on Instagram & Facebook to qualify leads 24/7.',
  },
  {
    icon: '🧠',
    title: 'Context-Aware Chatbots',
    description: 'Custom-trained bots that guide users and capture high-intent leads.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Services = () => {
  return (
    <section id="services" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Premium Automation Suite
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Scalable AI infrastructure designed to recover time and revenue.
          </p>
        </motion.div>

        {/* Services Grid - Adjusted to 2 cols on medium screens for balance with 4 items */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className="relative rounded-2xl overflow-hidden group p-8 bg-gray-900/40 border border-white/5 backdrop-blur-sm hover:border-white/20 transition-colors duration-300"
            >
              {/* Hover Glow Effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 0%, var(--color-primary), transparent 60%)`,
                  filter: 'blur(40px)',
                  opacity: 0.15 
                }}
              />

              {/* Scanner Line Animation */}
              <div
                className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50"
                style={{
                  animation: `scan 4s ease-in-out infinite`,
                  animationDelay: `${index * 0.5}s`,
                }}
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="text-5xl mb-6 filter drop-shadow-lg">{service.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-lg">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Services
