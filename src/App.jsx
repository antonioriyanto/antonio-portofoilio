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

  // Unified "Liquid Titanium" Typography Reveal Engine
  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeoutId = setTimeout(() => {
        // 1. Primary Headings (h1, h2, [data-reveal-title])
        const titleElements = document.querySelectorAll(
          '[data-reveal-title], h1[data-reveal-title], h2[data-reveal-title]'
        )
        titleElements.forEach((heading) => {
          // If not already structured with reveal-mask-line / inner, wrap lines
          if (!heading.querySelector('.reveal-mask-inner')) {
            const rawHTML = heading.innerHTML
            const lines = rawHTML.split(/<br\s*\/?>/i)
            if (lines.length > 1) {
              heading.innerHTML = lines
                .map(
                  (line) =>
                    `<span class="reveal-mask-line"><span class="reveal-mask-inner text-specular-glint">${line.trim()}</span></span>`
                )
                .join('')
            } else {
              heading.innerHTML = `<span class="reveal-mask-line"><span class="reveal-mask-inner text-specular-glint">${rawHTML}</span></span>`
            }
          }

          const inners = heading.querySelectorAll('.reveal-mask-inner')
          if (inners.length > 0) {
            // Masked Slide-up from y: 115% to 0%
            gsap.fromTo(
              inners,
              { y: '115%', opacity: 0 },
              {
                y: '0%',
                opacity: 1,
                duration: 1.0,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: heading,
                  start: 'top 88%',
                  once: true,
                },
              }
            )

            // Specular gradient sweep from 100% 0 to -100% 0
            gsap.fromTo(
              inners,
              { backgroundPosition: '100% 0%' },
              {
                backgroundPosition: '-100% 0%',
                duration: 1.35,
                delay: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: heading,
                  start: 'top 88%',
                  once: true,
                },
              }
            )
          }
        })

        // 2. Sub-Headings & Cards (h3, h4, [data-reveal-sub])
        const subHeadings = document.querySelectorAll('[data-reveal-sub]')
        subHeadings.forEach((sub) => {
          gsap.fromTo(
            sub,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sub.closest('article, .spotlight-card') || sub,
                start: 'top 88%',
                once: true,
              },
            }
          )
        })

        // 3. Eyebrows (span[data-reveal-eyebrow])
        const eyebrows = document.querySelectorAll('[data-reveal-eyebrow]')
        eyebrows.forEach((eyebrow) => {
          gsap.fromTo(
            eyebrow,
            { opacity: 0, letterSpacing: '0.25em' },
            {
              opacity: 1,
              letterSpacing: '0.14em',
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: eyebrow,
                start: 'top 90%',
                once: true,
              },
            }
          )
        })

        ScrollTrigger.refresh()
      }, 60)

      return () => clearTimeout(timeoutId)
    })

    return () => ctx.revert()
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
