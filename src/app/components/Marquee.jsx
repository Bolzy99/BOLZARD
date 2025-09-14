"use client"
import { motion } from 'framer-motion'

const marqueeVariants = {
  animate: {
    x: [0, -1035], // This value may need to be adjusted based on text length
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 20, // Feel free to adjust for speed
        ease: "linear",
      },
    },
  },
}

const Marquee = () => {
  const text = "INTELLIGENT AUTOMATION • SEAMLESS WORKFLOWS • 24/7 AI AGENTS • SCALABLE GROWTH •"
  
  return (
    <div className="w-full py-8 overflow-x-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        variants={marqueeVariants}
        animate="animate"
      >
        <span className="text-xl font-bold uppercase gradient-text pr-16">{text}</span>
        <span className="text-xl font-bold uppercase gradient-text pr-16">{text}</span>
      </motion.div>
    </div>
  )
}

export default Marquee