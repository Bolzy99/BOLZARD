"use client"
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const services = [
  {
    title: "Social Media Autopilot",
    description: "Our AI learns your brand's unique voice to engage potential clients across all platforms. It answers questions, qualifies leads, and guides them towards booking a call—all without you lifting a finger.",
    imageUrl: "/images/service-social.png",
  },
  {
    title: "Websites with an AI Brain",
    description: "We build more than websites; we build intelligent digital experiences. Each site and Progressive Web App (PWA) comes with a powerful, integrated chatbot at its core, creating immersive and unforgettable user journeys.",
    imageUrl: "/images/service-website.png",
  },
  {
    title: "Automated Outreach Engine",
    description: "Define your ideal client, and let Bolzard do the rest. Our system handles everything from hyper-personalized cold outreach to intelligent follow-ups, warming up leads so you can focus on closing.",
    imageUrl: "/images/service-outreach.png",
  },
  {
    title: "Next-Gen SEO Dominance",
    description: "Build a brand that's impossible to ignore. We deploy a sophisticated, multi-faceted SEO strategy that elevates your presence, ensuring you appear everywhere your ideal clients are looking.",
    imageUrl: "/images/service-seo.png",
  },
  {
    title: "Unified Analytics Dashboard",
    description: "Clarity in a single click. Get a bird's-eye view of your entire business, from client acquisition metrics to real-time revenue, all presented in one beautiful, intuitive dashboard.",
    imageUrl: "/images/service-analytics.png",
  },
  {
    title: "Strategic Partnership",
    description: "Have a vision to reshape an industry? We partner with ambitious minds to build groundbreaking automated solutions. If you're ready to build the future, let's talk.",
    imageUrl: "/images/service-partner.png",
  },
];

const ServiceCard = ({ title, description, imageUrl, index }) => (
  <motion.div 
    className="bg-black/50 border border-white/10 rounded-2xl p-8 grid md:grid-cols-2 gap-8 items-center"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <div className={`relative h-64 rounded-lg overflow-hidden ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
      <Image src={imageUrl} alt={title} fill style={{ objectFit: 'cover' }} sizes="50vw" />
    </div>
    <div className={`flex flex-col justify-center ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
      <h3 className="text-3xl font-bold mb-4 gradient-text">{title}</h3>
      <p className="text-lg text-slate-300">{description}</p>
    </div>
  </motion.div>
);

const ServicesPage = () => {
  return (
    <main className="text-white bg-black min-h-screen">
      <Navbar />
      <div className="pt-40 pb-20 px-8 text-center">
        <h1 className="text-6xl font-black gradient-text mb-4">Our Services</h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          We transform complex problems into elegant, intelligent automations. Explore how we can build your future.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-8 space-y-16 pb-24">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} index={index} />
        ))}

        <div className="text-center border-t border-white/10 pt-16">
          <h3 className="text-4xl font-bold mb-4">Have a Different Challenge?</h3>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">If you can describe it, we can automate it. Let's discuss your unique needs and build a custom solution from the ground up.</p>
          <Link href="/book-call">
            <motion.div 
              className="inline-block px-10 py-4 bg-primary rounded-full text-lg font-bold text-white cursor-pointer shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255, 69, 0, 0.7)"}}
            >
              Book a Free Consultation
            </motion.div>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ServicesPage;