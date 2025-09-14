const AboutPage = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-5xl mx-auto py-24 px-6 text-center">

        {/* --- Header --- */}
        <h1 className="text-5xl md:text-6xl font-bold uppercase mb-4">
          <span className="text-white">THE ARCHITECT BEHIND </span>
          <span className="bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text">
            THE AUTOMATION
          </span>
        </h1>
        <p className="text-lg text-slate-400 mb-20">
          Meet the mind dedicated to building your digital future.
        </p>

        {/* --- Founder Card --- */}
        <div className="max-w-2xl mx-auto bg-neutral-900/50 border border-white/10 rounded-3xl p-8 md:p-12 text-left shadow-2xl">
          
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center p-1">
              <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center">
                <span className="text-5xl font-bold text-white">Y</span>
              </div>
            </div>
          </div>

          {/* Name and Role */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white">Yash</h2>
            <p className="text-lg text-cyan-400 font-medium">Founder & Automation Architect</p>
          </div>

          {/* Bio */}
          <div className="space-y-6 text-slate-300 leading-relaxed">
            <p>
              "Hi, I'm Yash—a passionate automation builder and digital architect dedicated to helping individuals and businesses unlock the full power of technology. At BOLZARD, my mission is to transform complex problems into elegant, automated solutions. I specialize in creating AI-powered websites, smart workflows, and seamless integrations that save time, scale operations, and deliver personalized user experiences."
            </p>
            <p>
              "Whether it's automating your social media content, building dynamic chatbots that feel human, syncing calendars and emails across platforms, or crafting entire Progressive Web Apps from the ground up—I bring your digital vision to life with clarity, speed, and intelligence."
            </p>
            <p className="text-white italic text-center text-lg pt-4">
              "If you can describe it, I can automate it."
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AboutPage;