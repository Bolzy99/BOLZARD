"use client"
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Services from './components/Services'
import Marquee from './components/Marquee'
import CustomCursor from './components/CustomCursor'
import BeforeAfter from './components/BeforeAfter'
import TrustedBy from './components/TrustedBy'
import AutomationFeatures from './components/AutomationFeatures'

// 1. Import the two new components
import Features from './components/Features'
import CallToAction from './components/CallToAction'

export default function Home() {
    return (
        <main className="text-white bg-black cursor-none">
            <CustomCursor />
            <Navbar />
            <Hero />
            <Marquee />
            <Services />
            <AutomationFeatures />
            <BeforeAfter />

            {/* 2. Add the new components here, in order */}
            <Features />
            <CallToAction />

            <TrustedBy />
        </main>
    )
}