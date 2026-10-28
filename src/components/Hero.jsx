import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero({ t }) {
  const containerRef = useRef(null)
  const slabRef = useRef(null)
  const metric40Ref = useRef(null)
  const metric20Ref = useRef(null)

  // 1. Kinetic Rolling Number Counter & Scroll Exit Compression
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Rolling number counter for 40+ and 20+
      const counters = [
        { ref: metric40Ref, target: 40, suffix: '+' },
        { ref: metric20Ref, target: 20, suffix: '+' },
      ]

      counters.forEach(({ ref, target, suffix }) => {
        if (!ref.current) return
        const countObj = { val: 0 }
        gsap.to(countObj, {
          val: target,
          duration: 2.2,
          ease: 'power2.out',
          delay: 0.4,
          onUpdate: () => {
            if (ref.current) {
              ref.current.textContent = `${Math.round(countObj.val)}${suffix}`
            }
          },
        })
      })

      // Scroll Exit Compression
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          scale: 0.96,
          yPercent: -15,
          opacity: 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // 2. Pure Hardware-Accelerated CSS 3D Spring Tilt
  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    if (isCoarse || !slabRef.current) return

    const slab = slabRef.current
    const rotState = { rotX: 0, rotY: 0 }

    const setRotX = gsap.quickTo(rotState, 'rotX', {
      duration: 0.6,
      ease: 'power2.out',
      onUpdate: () => {
        slab.style.transform = `perspective(1000px) rotateX(${rotState.rotX}deg) rotateY(${rotState.rotY}deg)`
      },
    })

    const setRotY = gsap.quickTo(rotState, 'rotY', {
      duration: 0.6,
      ease: 'power2.out',
      onUpdate: () => {
        slab.style.transform = `perspective(1000px) rotateX(${rotState.rotX}deg) rotateY(${rotState.rotY}deg)`
      },
    })

    const handleMouseMove = (e) => {
      const rect = slab.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      // Dynamic specular sheen tracking
      slab.style.setProperty('--hero-mouse-x', `${e.clientX - rect.left}px`)
      slab.style.setProperty('--hero-mouse-y', `${e.clientY - rect.top}px`)

      // Fluid luxury 3D tilt up to ±12 degrees
      setRotX(-y * 14)
      setRotY(x * 14)
    }

    const handleMouseLeave = () => {
      setRotX(0)
      setRotY(0)
    }

    slab.addEventListener('mousemove', handleMouseMove, { passive: true })
    slab.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      slab.removeEventListener('mousemove', handleMouseMove)
      slab.removeEventListener('mouseleave', handleMouseLeave)
      setRotX(0)
      setRotY(0)
    }
  }, [])

  return (
    <header
      ref={containerRef}
      className="relative w-[min(calc(100%-48px),1440px)] mx-auto h-screen min-h-[640px] max-h-[1080px] pt-20 sm:pt-24 pb-4 sm:pb-6 flex flex-col justify-between overflow-hidden"
    >
      {/* Background ambient luxury glow spot */}
      <div
        aria-hidden="true"
        className="absolute -top-32 right-10 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[140px] pointer-events-none"
      />

      {/* Top Grid: Title & Interactive Pure CSS Crystal Glass Slab */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.18fr_0.82fr] gap-8 lg:gap-12 items-center my-auto perspective-1000">
        
        {/* Left: Typography Scale */}
        <div className="relative z-10">
          <span
            data-reveal-eyebrow
            className="block mb-4 sm:mb-6 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase"
          >
            {t.heroEyebrow}
          </span>

          <h1 className="text-[clamp(38px,7.5vw,118px)] font-black leading-[1.12] tracking-[-0.05em] text-[#fafafa] uppercase">
            <span className="block">
              {t.heroTitlePart1}
            </span>
            <span className="block">
              {t.heroTitlePart2}
            </span>
          </h1>
        </div>

        {/* Right: Ultra-Light VisionOS Crystal Glass Slab */}
        <div className="flex justify-end perspective-1000">
          <div
            ref={slabRef}
            className="w-full max-w-[540px] relative rounded-2xl crystal-glass will-change-transform group transition-shadow duration-300 hover:shadow-[0_40px_110px_rgba(255,255,255,0.08)] p-6 sm:p-8 pointer-events-auto"
          >
            {/* Top Specular Bevel Highlight Line */}
            <div className="glass-bevel-line" />

            {/* Dynamic Specular Sheen Layer */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
              style={{
                background:
                  'radial-gradient(500px circle at var(--hero-mouse-x, -500px) var(--hero-mouse-y, -500px), rgba(255, 255, 255, 0.08), transparent 50%)',
              }}
            />

            {/* Technical Glass Header Badge */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-white/20 border border-white/40" />
                <span className="text-[11px] font-mono tracking-widest text-[#8e8e8e] uppercase">
                  VISION_OS // SPEC_01
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#8e8e8e] px-2 py-0.5 rounded bg-white/5 border border-white/10">
                ACTIVE
              </span>
            </div>

            {/* Hero Copy */}
            <p className="mb-5 sm:mb-6 text-[#8e8e8e] text-[clamp(14px,1.4vw,18px)] leading-[1.5] relative z-10">
              {t.heroCopy}
            </p>

            {/* CTAs with Magnetic Physics hooks */}
            <div className="flex flex-wrap items-center gap-3 pt-1 relative z-10">
              <a
                href="#work"
                data-cursor="magnetic"
                className="min-h-[44px] px-6 inline-flex items-center justify-center border border-white rounded-full text-[12px] sm:text-[13px] font-bold bg-white text-[#0d0d0d] hover:bg-[#e5e5e5] hover:-translate-y-0.5 active:translate-y-0 shadow-[0_4px_20px_rgba(255,255,255,0.15)] transition-all duration-200"
              >
                {t.exploreWork}
              </a>

              <a
                href="#contact"
                data-cursor="magnetic"
                className="min-h-[44px] px-6 inline-flex items-center justify-center border border-white/20 rounded-full text-[12px] sm:text-[13px] font-semibold bg-white/5 text-[#fafafa] hover:bg-white/10 hover:border-white/40 hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-md transition-all duration-200"
              >
                {t.downloadCV}
              </a>
            </div>

            {/* Floating ambient badge anchor */}
            <div className="mt-5 sm:mt-6 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-[#8e8e8e] relative z-10">
              <span>JAKARTA, ID</span>
              <span className="text-white/60">40+ STORES DEPLOYED</span>
            </div>
          </div>
        </div>

      </div>

      {/* 4 Metrics Strip - Docked cleanly to bottom with crystal-glass styling */}
      <div className="grid grid-cols-2 md:grid-cols-4 mt-auto border-t border-b border-white/10 crystal-glass py-2 sm:py-3 relative">
        <div className="glass-bevel-line" />
        
        <div className="py-2 sm:py-2.5 px-4 sm:px-6 pl-0 sm:pl-4 border-r border-white/10">
          <strong
            ref={metric40Ref}
            className="block mb-0.5 text-[clamp(22px,2.4vw,34px)] font-black tracking-[-0.04em] text-[#fafafa]"
          >
            0+
          </strong>
          <span className="text-[#8e8e8e] text-[11px] sm:text-[12px] leading-tight block font-medium">
            {t.metricStores}
          </span>
        </div>

        <div className="py-2 sm:py-2.5 px-4 sm:px-6 md:border-r border-white/10">
          <strong className="block mb-0.5 text-[clamp(22px,2.4vw,34px)] font-black tracking-[-0.04em] text-[#fafafa]">
            End-to-End
          </strong>
          <span className="text-[#8e8e8e] text-[11px] sm:text-[12px] leading-tight block font-medium">
            {t.metricExecution}
          </span>
        </div>

        <div className="py-2 sm:py-2.5 px-4 sm:px-6 pl-0 sm:pl-6 border-t md:border-t-0 border-r border-white/10">
          <strong
            ref={metric20Ref}
            className="block mb-0.5 text-[clamp(22px,2.4vw,34px)] font-black tracking-[-0.04em] text-[#fafafa]"
          >
            0+
          </strong>
          <span className="text-[#8e8e8e] text-[11px] sm:text-[12px] leading-tight block font-medium">
            {t.metricClients}
          </span>
        </div>

        <div className="py-2 sm:py-2.5 px-4 sm:px-6 pr-0 sm:pr-4 border-t md:border-t-0 border-white/10">
          <strong className="block mb-0.5 text-[clamp(22px,2.4vw,34px)] font-black tracking-[-0.04em] text-[#fafafa]">
            Multi-Discipline
          </strong>
          <span className="text-[#8e8e8e] text-[11px] sm:text-[12px] leading-tight block font-medium">
            {t.metricMulti}
          </span>
        </div>

      </div>

    </header>
  )
}
