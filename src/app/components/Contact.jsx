// src/app/components/Contact.jsx
"use client"
import { motion } from 'framer-motion'

const Contact = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  }

  return (
    // THE FIX IS HERE: add the `relative` class
    <section id="contact" className="relative py-24 px-8 bg-black">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <motion.h2 variants={itemVariants} className="text-5xl font-black mb-4 gradient-text">
            Let's Build Your Automation
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Ready to take your business to the next level? Fill out the form below, and our team of automation experts will be in touch.
          </motion.p>
          <motion.form variants={itemVariants} className="space-y-6 text-left">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Name</label>
                <input type="text" id="name" className="w-full bg-gray-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:outline-none transition-all" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                <input type="email" id="email" className="w-full bg-gray-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:outline-none transition-all" />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">How can we help?</label>
              <textarea id="message" rows="5" className="w-full bg-gray-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:outline-none transition-all"></textarea>
            </div>
            <div className="text-center">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255, 69, 0, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 bg-primary rounded-full text-white text-lg font-bold shadow-lg transition-all duration-300 cursor-pointer"
              >
                Send Message
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact