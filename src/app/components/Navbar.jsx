"use client"
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

const NavLink = ({ text, href }) => {
  const [isHovered, setHovered] = useState(false);

  return (
    <Link 
      href={href} 
      className="relative text-lg font-medium text-slate-300 py-1"
      onMouseEnter={() => setHovered(true)} 
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-6 overflow-hidden"> 
        <motion.span 
          className="block" 
          animate={{ y: isHovered ? '-100%' : '0%' }} 
          transition={{ ease: 'circOut', duration: 0.5 }}
        >
          {text}
        </motion.span>
        <motion.span 
          className="absolute inset-0 text-white"
          animate={{ y: isHovered ? '0%' : '100%' }} 
          transition={{ ease: 'circOut', duration: 0.5 }}
        >
          {text}
        </motion.span>
      </div>
    </Link>
  );
};

const Navbar = () => {
  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* 
        This div is now full-width with padding, allowing content to spread out.
        The max-w-7xl and mx-auto classes have been removed.
      */}
      <div className="w-full px-8 sm:px-12 md:px-16 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold gradient-text">
          BOLZARD
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <NavLink text="Services" href="/services" />
          <NavLink text="Features" href="/#automation-features" />
          <NavLink text="Our Process" href="/our-process" />
          <NavLink text="Contact" href="/book-call" />
        </div>
        
        <Link href="/book-call">
          <motion.div 
            className="px-6 py-2 bg-primary rounded-full font-bold text-white cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            Book a Call
          </motion.div>
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
