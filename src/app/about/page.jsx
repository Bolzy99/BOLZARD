import Image from 'next/image';

const AboutPage = () => {
  return (
    //  This wrapper lifts the content in front of the particle background
    <div className="relative z-10">
      {/* This container is now transparent to let the background show through */}
      <div className="text-white min-h-screen">
        <div className="max-w-6xl mx-auto py-24 px-6 text-center">

          {/* --- Header --- */}
          <h1 className="text-5xl md:text-6xl font-bold uppercase mb-4">
            <span className="text-white">THE ARCHITECTS BEHIND </span>
            <span className="bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text">
              THE AUTOMATION
            </span>
          </h1>
          <p className="text-lg text-slate-400 mb-20">
            Meet the minds dedicated to building your digital future.
          </p>

          {/* --- Founders Grid --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 align-top">
            
            {/* ==================== YASH (FOUNDER) ==================== */}
            <div className="bg-neutral-900/50 border border-white/10 rounded-3xl p-8 md:p-10 text-left shadow-2xl h-full flex flex-col">
              
              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center p-1">
                  <div className="w-full h-full rounded-full bg-neutral-900 relative overflow-hidden">
                    <Image
                      src="/images/yash-avatar.jpg" 
                      layout="fill"
                      objectFit="cover"
                      alt="Yash"
                    />
                  </div>
                </div>
              </div>

              {/* Name and Role */}
              <div className="text-center mb-6">
                <h2 className="text-4xl font-bold text-white">Yash</h2>
                <p className="text-lg text-cyan-400 font-medium">Founder</p>
              </div>

              {/* Bio */}
              <div className="space-y-6 text-slate-300 leading-relaxed flex-grow">
                <p>
                  "Hey, I'm Yash — the mind behind BOLZARD and the architect who turns wild ideas into powerful, automated reality. I lead the strategy, systems, and innovations that keep BOLZARD ahead of the curve"
                </p>
                <p>
                  "I build automation that actually moves businesses forward: AI Voice Receptionists that handle bookings and FAQs in any language, outreach and nurture machines that run across Instagram, WhatsApp, SMS, Facebook, and Gmail, smart chatbots that feel human, and SEO-ready websites and apps that work 24/7."
                </p>
                <p className="text-white italic text-center text-lg pt-4">
                  "IF YOU CAN DESCRIBE IT, WE CAN AUTOMATE IT."
                </p>
              </div>
            </div>

            {/* ==================== ETHAN (CO-FOUNDER) ==================== */}
            <div className="bg-neutral-900/50 border border-white/10 rounded-3xl p-8 md:p-10 text-left shadow-2xl h-full flex flex-col">
              
              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center p-1">
                  <div className="w-full h-full rounded-full bg-neutral-900 relative overflow-hidden">
                    {/* IMPORTANT: Add Ethan's image to /public/images/ */}
                    <Image
                      src="/images/ethan-avatar.jpg" 
                      layout="fill"
                      objectFit="cover"
                      alt="Ethan"
                    />
                  </div>
                </div>
              </div>

              {/* Name and Role */}
              <div className="text-center mb-6">
                <h2 className="text-4xl font-bold text-white">Ethan</h2>
                <p className="text-lg text-purple-400 font-medium">Co-Founder & Systems Architect</p>
              </div>

              {/* Bio */}
              <div className="space-y-6 text-slate-300 leading-relaxed flex-grow">
                <p>
                  "I’m Ethan—a systems thinker, growth strategist, and automation builder dedicated to helping businesses operate smarter, faster, and more profitably. I specialize in architecting real-world workflows that eliminate manual work, unify communication channels, and turn chaotic processes into clean, scalable systems."
                </p>
                <p>
                  "From AI-powered CRM pipelines to end-to-end business automation across WhatsApp, Instagram, Messenger, email, and internal operations—I bridge the gap between business logic and technical execution, ensuring every flow delivers measurable results."
                </p>
                <p className="text-white italic text-center text-lg pt-4">
                  "BUILDING SYSTEMS THAT SCALE WITH YOUR AMBITION."
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
