"use client"
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target;
      setIsPointer(
        target.tagName.toLowerCase() === 'a' ||
        window.getComputedStyle(target).getPropertyValue('cursor') === 'pointer'
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const cursorVariants = {
    default: {
      scale: 1,
      opacity: 1,
      backgroundColor: "rgba(0, 124, 240, 0.2)" // Semi-transparent blue for the glow
    },
    pointer: {
      scale: 1.5,
      opacity: 0.5,
      backgroundColor: "rgba(0, 124, 240, 0.4)" // More intense glow on hover
    }
  };

  const dotVariants = {
    default: {
      scale: 1,
      backgroundColor: "#007cf0" // Solid primary blue
    },
    pointer: {
      scale: 0.5, // Dot shrinks on hover
      backgroundColor: "#00aaff" // Lighter blue on hover
    }
  }

  return (
    <>
      {/* The large, soft glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[1000] rounded-full blur-3xl"
        variants={cursorVariants}
        animate={isPointer ? "pointer" : "default"}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{
          width: 200,
          height: 200,
          x: position.x - 100,
          y: position.y - 100,
        }}
      />

      {/* The small, central dot */}
       <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[1001] rounded-full"
        variants={dotVariants}
        animate={isPointer ? "pointer" : "default"}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        style={{
          width: 8,
          height: 8,
          x: position.x - 4,
          y: position.y - 4,
        }}
      />
    </>
  );
};

export default CustomCursor;