import React, { useState, useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { translations } from './data/translations'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Capabilities from './components/Capabilities'
import SelectedWork from './components/SelectedWork'
import CareerJourney from './components/CareerJourney'
import Experience from './components/Experience'
import CaseStudies from './components/CaseStudies'
import CreativeArchive from './components/CreativeArchive'
import TechSection from './components/TechSection'
import CapabilityMap from './components/CapabilityMap'
import About from './components/About'
import JackOfAllTrades from './components/JackOfAllTrades'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import AmbientLiquidBackground from './components/AmbientLiquidBackground'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-language')
      return saved === 'id' ? 'id' : 'en'
    } catch {
      return 'en'
    }
  })

  const setLang = (newLang) => {
    const validLang = newLang === 'id' ? 'id' : 'en'
    setLangState(validLang)
    try {
      localStorage.setItem('portfolio-language', validLang)
    } catch {
      // ignore storage errors
    }
  }

  // Lenis + GSAP ScrollTrigger Synchronization Bridge
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)
    const updateTicker = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(updateTicker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(updateTicker)
      lenis.destroy()
    }
  }, [])

  // Language update and ScrollTrigger coordinate refresh
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const t = translations[lang] || translations.en

  return (
    <div className="min-h-screen bg-transparent text-[#fafafa] font-sans antialiased selection:bg-[#fafafa] selection:text-[#0d0d0d] relative overflow-x-hidden">
      {/* Ambient GPU-Accelerated Liquid Background */}
      <AmbientLiquidBackground />

      {/* Follower Cursor & Hover Media Bridge */}
      <CustomCursor />

      {/* Sticky Navigation with reactive language toggle */}
      <Navbar lang={lang} setLang={setLang} t={t} />

      <main>
        {/* Hero Section with Interactive 3D iOS Glass Slab */}
        <Hero t={t} />

        {/* 01 / What I Actually Do (Capabilities Bento with Spotlight Glow) */}
        <Capabilities t={t} />

        {/* 02 / Selected Work (Deep Charcoal Reskin + Custom Cursor Previews) */}
        <SelectedWork t={t} />

        {/* 03 / Career Journey (Scrubbed Timeline + Word Reveal) */}
        <CareerJourney t={t} lang={lang} />

        {/* 04 / Featured Experience (Watch Club Workflow & Stakeholders) */}
        <Experience t={t} />

        {/* 05 / Case Studies (Interactive Drawer Accordion + Hover Bridge) */}
        <CaseStudies t={t} />

        {/* 06 / Creative Archive (Dark Glass Filter Pills & Cards) */}
        <CreativeArchive t={t} />

        {/* 07 / Web & Technology (Interactive Bento + Lucky Spin Engine) */}
        <TechSection t={t} />

        {/* 08 / Capability Map (Technical Dark Bento Cards) */}
        <CapabilityMap t={t} />

        {/* 09 / About (High Contrast Deep Charcoal Typography) */}
        <About t={t} />

        {/* Personality / Jack of All Trades */}
        <JackOfAllTrades t={t} />
      </main>

      {/* Contact & Footer */}
      <Contact t={t} />
    </div>
  )
}
