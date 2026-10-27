import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function JackOfAllTrades({ t }) {
  const sectionRef = useRef(null)
  const watermarkRef = useRef(null)
  const headlineRef = useRef(null)
  const highlightRef = useRef(null)

  // Subtle Parallax Watermark, Atmospheric Dim, & Headline Pop
  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches

    const ctx = gsap.context(() => {
      // 1. Watermark horizontal drift
      if (watermarkRef.current && sectionRef.current && !isCoarse) {
        gsap.fromTo(
          watermarkRef.current,
          { x: '-12%' },
          {
            x: '10%',
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

      // 2. Atmospheric Dim to rgba(7, 7, 7, 0.90)
      if (sectionRef.current) {
        gsap.fromTo(
          sectionRef.current,
          { backgroundColor: 'rgba(13, 13, 13, 0.85)' },
          {
            backgroundColor: 'rgba(7, 7, 7, 0.90)',
            ease: 'power1.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'center center',
              scrub: true,
            },
          }
        )
      }

      // 3. Headline Pop and contrast intensification
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { scale: 0.94, opacity: 0.5 },
          {
            scale: 1,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              end: 'center 45%',
              scrub: true,
            },
          }
        )
      }

      if (highlightRef.current) {
        gsap.fromTo(
          highlightRef.current,
          { opacity: 0.7, filter: 'drop-shadow(0 0 0px rgba(255,255,255,0))' },
          {
            opacity: 1,
            filter: 'drop-shadow(0 0 25px rgba(255,255,255,0.25))',
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'center 45%',
              scrub: true,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-32 sm:py-40 bg-[#0d0d0d]/85 backdrop-blur-md border-t border-white/10 text-center relative overflow-hidden transition-colors duration-500"
    >
      {/* Subtle Parallax Outline Watermark */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap text-[clamp(100px,18vw,260px)] font-black uppercase text-transparent select-none pointer-events-none z-0 tracking-tighter will-change-transform opacity-[0.03]"
        style={{ WebkitTextStroke: '1.5px #ffffff' }}
      >
        JACK OF ALL TRADES · MASTER OF SYNTHESIS · CREATIVE
      </div>

      {/* Background ambient luxury spotlight */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-white/[0.025] rounded-full blur-[130px] pointer-events-none"
      />

      <div className="w-[min(calc(100%-48px),1440px)] mx-auto relative z-10">
        
        <span data-reveal-eyebrow className="block mb-6 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
          {t.oneMoreThing}
        </span>

        <h2
          ref={headlineRef}
          className="mb-8 text-[clamp(40px,7vw,96px)] font-black leading-none tracking-[-0.05em] text-[#fafafa] will-change-transform"
        >
          {t.jackTitle}
        </h2>

        <div className="max-w-[720px] mx-auto text-[#8e8e8e] text-[18px] sm:text-[20px] leading-[1.8]">
          <p
            className="mb-8"
            dangerouslySetInnerHTML={{ __html: t.jackCopy1 }}
          />

          <strong
            ref={highlightRef}
            className="block font-extrabold text-[20px] sm:text-[24px] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e5e5e5] to-[#999999] will-change-transform"
            dangerouslySetInnerHTML={{ __html: t.jackHighlight }}
          />
        </div>

      </div>
    </section>
  )
}
