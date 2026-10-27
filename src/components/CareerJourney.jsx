import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CareerJourney({ t, lang }) {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const beamRef = useRef(null)
  const sparkRef = useRef(null)
  const nodeRefs = useRef([])

  const careerStages = [
    {
      num: '01',
      period: '2019 — 2020',
      company: 'Liberates Creative Colony',
      role: 'Graphic Designer Internship',
      evolution: t.liberatesEvolution,
      copy: t.liberatesCopy,
      tags: ['Social Content', 'Copywriting', 'Digital Design'],
      isCurrent: false,
    },
    {
      num: '02',
      period: '2020 — 2021',
      company: 'PT. Mindo Management Solutions',
      role: 'Graphic Designer',
      evolution: t.mindoEvolution,
      copy: t.mindoCopy,
      tags: ['20+ Clients', 'Agency', 'Brand Adaptation', 'Social Media', 'Print', 'Art Direction'],
      isCurrent: false,
    },
    {
      num: '03',
      period: '2021 — 2022',
      company: 'Rata Kanan Creative',
      role: 'Freelance Graphic Designer',
      evolution: t.rataEvolution,
      copy: t.rataCopy,
      tags: ['Client Communication', 'Branding', 'Marketing', 'Creative Strategy'],
      isCurrent: false,
    },
    {
      num: '04',
      period: '2022',
      company: 'PT Sahabat Petmu Indonesia',
      role: 'Creative Designer',
      evolution: t.petmuEvolution,
      copy: t.petmuCopy,
      tags: ['Content', 'Social Media', 'Motion', 'Video', 'Print', 'Web Design', 'HTML / CSS'],
      isCurrent: false,
    },
    {
      num: '05',
      period: '2023 — PRESENT',
      company: 'Watch Club Indonesia',
      role: 'Creative All-Rounder',
      evolution: t.watchEvolution,
      copy: t.watchCopy,
      tags: [
        'Creative',
        'Retail',
        '40+ Stores',
        'Vendor',
        'Production',
        'Digital',
        'Web / Systems',
        'Project Ownership',
        'Management',
      ],
      isCurrent: true,
    },
  ]

  // Setup GSAP ScrollTrigger timeline scrub beam, laser spark lead, node flash expansions, and word reveals
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Dynamic Vertical Scrub Indicator Beam + Laser Spark Lead
      if (beamRef.current && containerRef.current && trackRef.current) {
        gsap.fromTo(
          beamRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              end: 'bottom 85%',
              scrub: true,
              onUpdate: (self) => {
                if (sparkRef.current && trackRef.current) {
                  const trackHeight = trackRef.current.offsetHeight
                  const currentY = self.progress * trackHeight
                  sparkRef.current.style.transform = `translate3d(0, ${currentY}px, 0)`
                  sparkRef.current.style.opacity = self.progress > 0.01 ? '1' : '0'
                }
              },
            },
          }
        )
      }

      // 2. Node Flash Expansion & Active Highlights
      nodeRefs.current.forEach((node) => {
        if (!node) return
        ScrollTrigger.create({
          trigger: node,
          start: 'top 75%',
          onEnter: () => {
            node.classList.remove('border-white/20', 'bg-[#141414]', 'text-white/60')
            node.classList.add(
              'border-white',
              'bg-white',
              'text-[#111111]',
              'shadow-[0_0_22px_rgba(255,255,255,0.7)]'
            )
            // Kinetic node flash expansion & milestone velocity pulse
            gsap.fromTo(
              node,
              { scale: 1.25 },
              { scale: 1, duration: 0.45, ease: 'back.out(2)' }
            )

            const pulseLine = node.parentElement?.querySelector('.milestone-pulse-line')
            if (pulseLine) {
              gsap.fromTo(
                pulseLine,
                { scaleX: 0.2, opacity: 0.95 },
                { scaleX: 1.6, opacity: 0, duration: 0.85, ease: 'power2.out' }
              )
            }
          },
          onLeaveBack: () => {
            node.classList.remove(
              'border-white',
              'bg-white',
              'text-[#111111]',
              'shadow-[0_0_22px_rgba(255,255,255,0.7)]'
            )
            node.classList.add('border-white/20', 'bg-[#141414]', 'text-white/60')
            gsap.to(node, { scale: 1, duration: 0.2 })
          },
        })
      })

      // 3. Staggered Word Reveal Animation
      const revealElements = containerRef.current?.querySelectorAll('.scroll-reveal-text')
      if (revealElements) {
        revealElements.forEach((el) => {
          const words = el.querySelectorAll('.word')
          if (!words || words.length === 0) return

          gsap.fromTo(
            words,
            { y: '110%', opacity: 0 },
            {
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
              y: '0%',
              opacity: 1,
              stagger: 0.02,
              duration: 0.6,
              ease: 'power2.out',
            }
          )
        })
      }

      ScrollTrigger.refresh()
    }, containerRef)

    return () => ctx.revert()
  }, [lang, t])

  // Helper function to split text into animated words
  const renderWords = (text) => {
    return text.split(/\s+/).map((word, i) => (
      <span key={i} className="word-wrap inline-block overflow-hidden align-bottom pb-[3px] mr-[0.28em]">
        <span className="word inline-block transform translate-y-[110%] opacity-0 will-change-transform">
          {word}
        </span>
      </span>
    ))
  }

  return (
    <section ref={containerRef} className="py-24 sm:py-32 bg-[#0d0d0d]/85 backdrop-blur-md border-t border-white/10 relative" id="journey">
      <div className="w-[min(calc(100%-48px),1440px)] mx-auto">
        
        {/* Section Header */}
        <div>
          <span data-reveal-eyebrow className="block mb-5 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
            {t.journeyEyebrow}
          </span>

          <h2
            className="max-w-[1050px] mb-8 text-[clamp(36px,6.5vw,84px)] font-black leading-[1.14] tracking-[-0.04em] text-[#fafafa]"
            dangerouslySetInnerHTML={{ __html: t.journeyTitle }}
          />
          <p className="max-w-[720px] mb-14 text-[#8e8e8e] text-[17px] sm:text-[19px] leading-[1.6] scroll-reveal-text">
            {renderWords(t.journeyIntro)}
          </p>
        </div>

        {/* Timeline */}
        <div ref={trackRef} className="relative mt-12 sm:mt-16">
          
          {/* Continuous Timeline Hairline Track */}
          <div className="absolute top-0 bottom-0 left-[18px] sm:left-[31px] w-[1px] bg-white/10 pointer-events-none" />

          {/* Active Animated Scrubbed Beam */}
          <div
            ref={beamRef}
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-[18px] sm:left-[31px] w-[1px] bg-gradient-to-b from-white via-white/80 to-transparent origin-top scale-y-0 pointer-events-none z-10"
          />

          {/* Laser Spark Lead Indicator */}
          <div
            ref={sparkRef}
            aria-hidden="true"
            className="absolute top-0 left-[18px] sm:left-[31px] -ml-[3.5px] -mt-[3.5px] w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#ffffff,0_0_20px_rgba(255,255,255,0.8)] pointer-events-none z-30 opacity-0 transition-opacity duration-150 will-change-transform"
          />

          <div className="flex flex-col gap-12 sm:gap-16">
            {careerStages.map((stage, idx) => (
              <article
                key={stage.num}
                className={`relative grid grid-cols-[38px_1fr] sm:grid-cols-[64px_160px_1fr] gap-4 sm:gap-8 pb-12 sm:pb-16 border-b border-white/10 last:border-b-0 last:pb-0 ${
                  stage.isCurrent ? 'career-current' : ''
                }`}
              >
                {/* Marker Circle Node */}
                <div className="relative z-20 w-[38px] sm:w-[64px] flex justify-center items-center">
                  {/* Faint Horizontal Radial Glow Line on Milestone Velocity Pulse */}
                  <div
                    aria-hidden="true"
                    className="milestone-pulse-line absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-48 sm:w-72 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none opacity-0 z-0 origin-center will-change-transform"
                  />
                  <span
                    ref={(el) => (nodeRefs.current[idx] = el)}
                    className="relative z-10 w-9 sm:w-[40px] h-9 sm:h-[40px] flex items-center justify-center rounded-full text-[12px] font-mono font-bold border border-white/20 bg-[#141414] text-white/60 transition-colors duration-300 will-change-transform"
                  >
                    {stage.num}
                  </span>
                </div>

                {/* Period & Badge */}
                <div className="sm:pt-2">
                  <span className="block text-[#8e8e8e] text-[12px] font-mono font-bold tracking-[0.06em]">
                    {stage.period}
                  </span>
                  {stage.isCurrent && (
                    <strong className="inline-block mt-2 px-2.5 py-1 bg-white text-black rounded-full text-[9px] font-mono font-bold tracking-[0.1em] uppercase shadow-md">
                      {t.now}
                    </strong>
                  )}
                </div>

                {/* Company & Evolution Description */}
                <div className="col-span-2 sm:col-span-1 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-6 lg:gap-14 pt-2 sm:pt-0">
                  {/* Left: Company & Role */}
                  <div>
                    <h3
                      data-reveal-sub
                      className={`font-black text-[#fafafa] leading-tight mb-2 ${
                        stage.isCurrent
                          ? 'text-[clamp(26px,3.5vw,52px)]'
                          : 'text-[clamp(22px,2.5vw,38px)]'
                      }`}
                    >
                      {stage.company}
                    </h3>
                    <p className="text-[#8e8e8e] text-[14px] sm:text-[15px] font-medium">
                      {stage.role}
                    </p>
                  </div>

                  {/* Right: Evolution Label, Animated Copy, & Skill Tags */}
                  <div>
                    <span className="block mb-3 text-[11px] font-mono font-bold tracking-[0.14em] uppercase text-accent-chrome">
                      {stage.evolution}
                    </span>
                    <p className="max-w-[600px] mb-6 text-[#8e8e8e] text-[15px] sm:text-[16px] leading-[1.65] scroll-reveal-text">
                      {renderWords(stage.copy)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {stage.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3 py-1.5 border border-white/10 rounded-full text-[11px] font-medium text-white/80 bg-white/[0.03] backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </article>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
