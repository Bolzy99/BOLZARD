"use client"
import Image from 'next/image';
import { motion } from 'framer-motion';

const brands = [
  { name: "KESHAH", url: "https://www.Keshah.com", logo: "/images/logo-keshah.png" },
  { name: "Indotravo", url: "https://www.Indotravo.com", logo: "/images/logo-indotravo.png" },
  { name: "Frequencies.ai", url: "https://www.frequencies.ai", logo: "/images/logo-frequencies.png" },
];

const TrustedBy = () => {
  return (
    <section className="bg-black py-24">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-sm font-bold uppercase text-slate-400 tracking-widest mb-12">
          TRUSTED BY INNOVATIVE BRANDS
        </h2>
        
        {/* The main container now uses overflow-hidden to clip the content */}
        <div 
          className="w-full inline-flex flex-nowrap overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0, black 128px, black calc(100% - 128px), transparent 100%)'
          }}
        >
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-12 animate-infinite-scroll">
            {brands.map((brand, index) => {
              const isKeshah = brand.name === 'KESHAH';
              return (
                <li key={index} className="flex-shrink-0">
                  <a 
                    href={brand.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center transition-opacity duration-300 hover:opacity-80"
                    style={{ width: '150px', height: '60px' }}
                  >
                    <div className={`relative flex items-center justify-center h-16 ${isKeshah ? 'bg-white rounded-md p-2 w-[150px]' : 'w-[150px]'}`}>
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        width={120}
                        height={48}
                        className="object-contain h-auto w-auto max-h-full"
                      />
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
           <ul className="flex items-center justify-center md:justify-start [&_li]:mx-12 animate-infinite-scroll" aria-hidden="true">
            {brands.map((brand, index) => {
              const isKeshah = brand.name === 'KESHAH';
              return (
                <li key={index} className="flex-shrink-0">
                  <a 
                    href={brand.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center transition-opacity duration-300 hover:opacity-80"
                    style={{ width: '150px', height: '60px' }}
                  >
                    <div className={`relative flex items-center justify-center h-16 ${isKeshah ? 'bg-white rounded-md p-2 w-[150px]' : 'w-[150px]'}`}>
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        width={120}
                        height={48}
                        className="object-contain h-auto w-auto max-h-full"
                      />
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;