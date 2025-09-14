import Link from 'next/link';
import { Twitter, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    // Reverted to a solid background, removed translucency and blur
    <footer className="relative z-40 w-full bg-black border-t border-white/10 py-16">
      
      <div className="w-full px-8 sm:px-12 md:px-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-slate-300">
          {/* Column 1: Brand */}
          <div>
            <h2 className="text-2xl font-bold mb-3 text-white">BOLZARD</h2>
            <p className="text-slate-400">Your Vision, Automated.</p>
          </div>

          {/* Column 2: Navigate */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Navigate</h3>
            <ul className="space-y-3">
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/our-process" className="hover:text-white transition-colors">Our Process</Link></li>
              <li><Link href="/book-call" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              {/* Blog link has been removed */}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-slate-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} BOLZARD. All rights reserved.
          </p>
          <div className="flex gap-6 text-slate-400">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-white transition-colors">
              <Twitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white transition-colors">
              <Facebook size={20} />
            </a>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;