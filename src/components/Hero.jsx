import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero({ t }) {
  const containerRef = useRef(null)
  const slabRef = useRef(null)
  const sheenRef = useRef(null)
  const metric40Ref = useRef(null)
  const metric20Ref = useRef(null)
  const [isInView, setIsInView] = useState(true)

  // Kinetic Masked Slide-up & Rolling Number Counter
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

  useEffect(() => {
    // Suspend cursor tracking and tilt rendering when Hero scrolls out of viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.05 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Disable on coarse/touch devices
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    if (isCoarse || !isInView || !slabRef.current || !containerRef.current) return

    const container = containerRef.current
    const slab = slabRef.current

    // GSAP quickTo for luxury dampened spring tilt
    const setRotateX = gsap.quickTo(slab, 'rotateX', { duration: 0.8, ease: 'power2.out' })
    const setRotateY = gsap.quickTo(slab, 'rotateY', { duration: 0.8, ease: 'power2.out' })
    const setTranslateZ = gsap.quickTo(slab, 'z', { duration: 0.8, ease: 'power2.out' })

    let currentMouseX = 0
    let currentMouseY = 0
    let targetMouseX = 0
    let targetMouseY = 0
    let animId = null

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      // Subtle high-end luxury tilt: max 12 deg
      const rotY = x * 18
      const rotX = -y * 18

      setRotateX(rotX)
      setRotateY(rotY)
      setTranslateZ(20)

      const slabRect = slab.getBoundingClientRect()
      targetMouseX = e.clientX - slabRect.left
      targetMouseY = e.clientY - slabRect.top
    }

    // Dampened lerp for specular gradient
    const updateSheen = () => {
      currentMouseX += (targetMouseX - currentMouseX) * 0.1
      currentMouseY += (targetMouseY - currentMouseY) * 0.1

      if (sheenRef.current) {
        sheenRef.current.style.background = `radial-gradient(circle 380px at ${currentMouseX}px ${currentMouseY}px, rgba(255, 255, 255, 0.12), transparent 70%)`
      }
      animId = requestAnimationFrame(updateSheen)
    }
    animId = requestAnimationFrame(updateSheen)

    const handleMouseLeave = () => {
      setRotateX(0)
      setRotateY(0)
      setTranslateZ(0)
      if (sheenRef.current) {
        sheenRef.current.style.background = 'transparent'
      }
    }

    container.addEventListener('mousemove', handleMouseMove, { passive: true })
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      if (animId) cancelAnimationFrame(animId)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      gsap.to(slab, { rotateX: 0, rotateY: 0, z: 0, duration: 0.4 })
    }
  }, [isInView])

  return (
    <header
      ref={containerRef}
      className="relative w-[min(calc(100%-48px),1440px)] mx-auto min-h-[calc(100vh-72px)] pt-24 sm:pt-28 pb-12 flex flex-col justify-between overflow-visible"
    >
      {/* Background ambient luxury glow spot */}
      <div
        aria-hidden="true"
        className="absolute -top-32 right-10 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[140px] pointer-events-none"
      />

      {/* Top Grid: Title & Interactive 3D iOS Glass Slab */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.18fr_0.82fr] gap-12 lg:gap-16 items-center perspective-1000">
        
        {/* Left: Typography Scale Verbatim with Kinetic Masked Slide-up */}
        <div className="relative z-10">
          <span
            data-reveal-eyebrow
            className="block mb-6 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase"
          >
            {t.heroEyebrow}
          </span>

          <h1 className="text-[clamp(44px,9.5vw,144px)] font-black leading-[1.12] tracking-[-0.05em] text-[#fafafa] uppercase">
            <span className="block">
              {t.heroTitlePart1}
            </span>
            <span className="block">
              {t.heroTitlePart2}
            </span>
          </h1>
        </div>

        {/* Right: Interactive 3D Frosted Glass Slab (visionOS / iOS Glass aesthetic) */}
        <div className="flex justify-end transform-style-3d">
          <div
            ref={slabRef}
            style={{ transformStyle: 'preserve-3d' }}
            className="w-full max-w-[540px] relative p-8 sm:p-10 rounded-2xl bg-[#141414]/75 backdrop-blur-2xl border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.65)] will-change-transform group transition-shadow duration-300 hover:shadow-[0_40px_110px_rgba(255,255,255,0.05)]"
          >
            {/* Dynamic Ambient Specular Surface Gradient */}
            <div
              ref={sheenRef}
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-200"
            />

            {/* Subtle Top Specular Edge Line */}
            <div className="absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            {/* Technical Glass Header Badge */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
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
            <p className="mb-8 text-[#8e8e8e] text-[clamp(16px,1.8vw,21px)] leading-[1.6]">
              {t.heroCopy}
            </p>

            {/* CTAs with Magnetic Physics hooks */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#work"
                data-cursor="magnetic"
                className="min-h-[48px] px-7 inline-flex items-center justify-center border border-white rounded-full text-[13px] font-bold bg-white text-[#0d0d0d] hover:bg-[#e5e5e5] hover:-translate-y-0.5 active:translate-y-0 shadow-[0_4px_20px_rgba(255,255,255,0.15)] transition-all duration-200"
              >
                {t.exploreWork}
              </a>

              <a
                href="#contact"
                data-cursor="magnetic"
                className="min-h-[48px] px-7 inline-flex items-center justify-center border border-white/20 rounded-full text-[13px] font-semibold bg-white/5 text-[#fafafa] hover:bg-white/10 hover:border-white/40 hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-md transition-all duration-200"
              >
                {t.downloadCV}
              </a>
            </div>

            {/* Floating ambient badge anchor */}
            <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-[#8e8e8e]">
              <span>JAKARTA, ID</span>
              <span className="text-white/60">40+ STORES DEPLOYED</span>
            </div>
          </div>
        </div>

      </div>

      {/* 4 Metrics Strip - Verbatim Scale & Rolling Number Counter */}
      <div className="grid grid-cols-2 md:grid-cols-4 mt-16 sm:mt-24 border-t border-b border-white/10 bg-canvas-card/30 backdrop-blur-md">
        
        <div className="py-7 sm:py-8 px-4 sm:px-6 pl-0 sm:pl-4 border-r border-white/10">
          <strong
            ref={metric40Ref}
            className="block mb-1.5 text-[clamp(26px,3vw,44px)] font-black tracking-[-0.04em] text-[#fafafa]"
          >
            0+
          </strong>
          <span className="text-[#8e8e8e] text-[12px] sm:text-[13px] leading-snug block font-medium">
            {t.metricStores}
          </span>
        </div>

        <div className="py-7 sm:py-8 px-4 sm:px-6 md:border-r border-white/10">
          <strong className="block mb-1.5 text-[clamp(26px,3vw,44px)] font-black tracking-[-0.04em] text-[#fafafa]">
            End-to-End
          </strong>
          <span className="text-[#8e8e8e] text-[12px] sm:text-[13px] leading-snug block font-medium">
            {t.metricExecution}
          </span>
        </div>

        <div className="py-7 sm:py-8 px-4 sm:px-6 pl-0 sm:pl-6 border-t md:border-t-0 border-r border-white/10">
          <strong
            ref={metric20Ref}
            className="block mb-1.5 text-[clamp(26px,3vw,44px)] font-black tracking-[-0.04em] text-[#fafafa]"
          >
            0+
          </strong>
          <span className="text-[#8e8e8e] text-[12px] sm:text-[13px] leading-snug block font-medium">
            {t.metricClients}
          </span>
        </div>

        <div className="py-7 sm:py-8 px-4 sm:px-6 pr-0 sm:pr-4 border-t md:border-t-0 border-white/10">
          <strong className="block mb-1.5 text-[clamp(26px,3vw,44px)] font-black tracking-[-0.04em] text-[#fafafa]">
            Multi-Discipline
          </strong>
          <span className="text-[#8e8e8e] text-[12px] sm:text-[13px] leading-snug block font-medium">
            {t.metricMulti}
          </span>
        </div>

      </div>

    </header>
  )
}
