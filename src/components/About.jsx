import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About({ t }) {
  const sectionRef = useRef(null)
  const watermarkRef = useRef(null)
  const statementRef = useRef(null)

  const details = [
    {
      label: t.background,
      text: t.backgroundCopy,
    },
    {
      label: t.education,
      text: t.educationPlace,
    },
    {
      label: t.experienceLabel,
      text: t.aboutExperience,
    },
    {
      label: t.creativeTools,
      text: t.creativeToolsCopy,
    },
    {
      label: 'DIGITAL',
      text: t.digitalSkills,
    },
  ]

  // Subtle Parallax Watermark & Line-by-Line Gradient Wipe
  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches

    const ctx = gsap.context(() => {
      // 1. Watermark horizontal drift
      if (watermarkRef.current && sectionRef.current && !isCoarse) {
        gsap.fromTo(
          watermarkRef.current,
          { x: '8%' },
          {
            x: '-14%',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        )
      }

      // 2. Line-by-line / Word gradient opacity wipe on scroll
      const wipeWords = statementRef.current?.querySelectorAll('.about-wipe-word')
      if (wipeWords && statementRef.current) {
        gsap.fromTo(
          wipeWords,
          { opacity: 0.15, y: 12 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statementRef.current,
              start: 'top 82%',
              end: 'bottom 60%',
              scrub: 0.8,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [t.aboutStatement])

  return (
    <section
      ref={sectionRef}
      className="py-24 sm:py-32 border-t border-white/10 bg-[#0d0d0d]/85 backdrop-blur-md relative overflow-hidden"
      id="about"
    >
      {/* Subtle Parallax Outline Watermark */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap text-[clamp(100px,18vw,260px)] font-black uppercase text-transparent select-none pointer-events-none z-0 tracking-tighter will-change-transform opacity-[0.03]"
        style={{ WebkitTextStroke: '1.5px #ffffff' }}
      >
        ABOUT · ALL-ROUNDER · HYBRID · DISCIPLINE
      </div>

      <div className="w-[min(calc(100%-48px),1440px)] mx-auto relative z-10">
        
        {/* Eyebrow */}
        <span data-reveal-eyebrow className="block mb-8 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
          {t.aboutEyebrow}
        </span>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Statement with Line-by-Line Gradient Wipe */}
          <div
            ref={statementRef}
            className="text-[clamp(26px,3.5vw,46px)] font-black leading-[1.2] tracking-[-0.04em] text-[#fafafa]"
          >
            {t.aboutStatement.split(/\s+/).map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.28em] pb-1">
                <span className="about-wipe-word inline-block opacity-15 will-change-transform">
                  {word}
                </span>
              </span>
            ))}
          </div>

          {/* Details Table */}
          <div className="border-t border-white/10">
            {details.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-3 sm:gap-5 py-6 border-b border-white/10 hover:bg-white/[0.02] transition-colors"
              >
                <small className="text-[#8e8e8e] font-mono font-bold text-[11px] tracking-[0.1em] uppercase">
                  {row.label}
                </small>
                <p className="text-[#e5e5e5] text-[15px] sm:text-[16px] leading-relaxed">
                  {row.text}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
