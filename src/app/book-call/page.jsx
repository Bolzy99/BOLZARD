"use client"
import { InlineWidget } from 'react-calendly';
import Navbar from '../components/Navbar';

const BookCallPage = () => {
  return (
    <main className="text-white bg-black min-h-screen">
      <Navbar />
      <div className="pt-32 pb-16 px-8 text-center">
        <h1 className="text-5xl font-black gradient-text mb-4">Book Your Free Consultation</h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Choose a time that works for you. Let's discuss how Bolzard can revolutionize your business with AI automation.
        </p>
      </div>

      {/* Calendly Inline Widget */}
      <div className="max-w-4xl mx-auto">
        <InlineWidget 
          url="https://calendly.com/skynetautommation/30min"
          styles={{
            height: '800px',
            borderRadius: '1rem',
          }}
          pageSettings={{
            backgroundColor: '000000',
            hideEventTypeDetails: false,
            hideLandingPageDetails: false,
            primaryColor: 'ff4500',
            textColor: 'ffffff'
          }}
        />
      </div>
    </main>
  );
};

export default BookCallPage;