import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import WatchClubSimulator from './WatchClubSimulator'
import { Smartphone, Sparkles, ChevronDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function TechSection({ t }) {
  const containerRef = useRef(null)
  const cardRef = useRef(null)
  const phoneFrameRef = useRef(null)
  const [logIndex, setLogIndex] = useState(0)
  const [isBehindDemoOpen, setIsBehindDemoOpen] = useState(false)

  // Live Terminal Log simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % 4)
    }, 3800)
    return () => clearInterval(interval)
  }, [])

  const demoLogs = [
    t.techLogDemoActive,
    t.techLogPrizesLoaded,
    t.techLogWheelReady,
    t.techLogDemoResult,
  ]
  const currentTerminalLog = demoLogs[logIndex] || demoLogs[0]

  // Spotlight surge animation on viewport enter
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardRef.current) {
        ScrollTrigger.create({
          trigger: cardRef.current,
          start: 'top 70%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              cardRef.current,
              { borderColor: 'rgba(255, 255, 255, 0.45)', boxShadow: '0 0 35px rgba(255, 255, 255, 0.15)' },
              { borderColor: 'rgba(255, 255, 255, 0.1)', boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)', duration: 1.4, ease: 'power2.out' }
            )

            if (phoneFrameRef.current) {
              gsap.fromTo(
                phoneFrameRef.current,
                { y: 30, opacity: 0.8 },
                { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
              )
            }
          },
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const tags = [
    'Product Concept',
    'UI/UX',
    'Business Logic',
    'AI-Assisted Development',
    'Retail Operations',
    '40+ Stores',
  ]

  const howItWorksSteps = [
    {
      num: '01',
      title: t.techStep01Title,
      desc: t.techStep01Desc,
    },
    {
      num: '02',
      title: t.techStep02Title,
      desc: t.techStep02Desc,
    },
    {
      num: '03',
      title: t.techStep03Title,
      desc: t.techStep03Desc,
    },
    {
      num: '04',
      title: t.techStep04Title,
      desc: t.techStep04Desc,
    },
  ]

  const behindDemoItems = [
    {
      title: t.techBehindItem1Title,
      desc: t.techBehindItem1Desc,
    },
    {
      title: t.techBehindItem2Title,
      desc: t.techBehindItem2Desc,
    },
    {
      title: t.techBehindItem3Title,
      desc: t.techBehindItem3Desc,
    },
  ]

  const handleMouseMove = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <section ref={containerRef} className="py-24 sm:py-32 bg-[#0d0d0d]/85 backdrop-blur-md border-t border-white/10 relative" id="technology">
      <div className="w-[min(calc(100%-48px),1440px)] mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 sm:mb-16">
          <span data-reveal-eyebrow className="block mb-5 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
            {t.techEyebrow}
          </span>

          <h2
            className="max-w-[1050px] mb-8 text-[clamp(36px,6.5vw,84px)] font-black leading-[1.14] tracking-[-0.04em] text-[#fafafa]"
            dangerouslySetInnerHTML={{ __html: t.techTitle }}
          />
          <p className="max-w-[720px] text-[#8e8e8e] text-[17px] sm:text-[19px] leading-[1.6]">
            {t.techIntro}
          </p>
        </div>

        {/* Interactive Dark Bento Spotlight Panel */}
        <article
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className="spotlight-card group relative grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] min-h-[640px] overflow-hidden bg-[#141414]/90 border border-white/10 rounded-3xl shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-white/25 will-change-transform"
        >
          {/* Dynamic Spotlight Radial Beam */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
            style={{
              background:
                'radial-gradient(600px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(255,255,255,0.06), transparent 40%)',
            }}
          />

          {/* Left Column: Interactive Smartphone Mockup (iPhone 16 Pro Frame) */}
          <div className="relative min-h-[580px] sm:min-h-[680px] bg-gradient-to-br from-[#181818] via-[#121212] to-[#0a0a0a] p-4 sm:p-8 lg:p-10 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden z-10">
            
            {/* Ambient Background Grid */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

            {/* Window Chrome Header Bar with Terminal Log */}
            <div className="w-full flex items-center justify-between text-[11px] font-mono text-[#8e8e8e] border-b border-white/10 pb-3 mb-6">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                <span className="text-[10px] font-mono text-[#8e8e8e] ml-2 hidden sm:inline">
                  simulator.watchclub.internal
                </span>
              </div>
              <span className="text-[10px] font-mono font-medium tracking-wider text-accent-chrome/90 truncate max-w-[240px] sm:max-w-none">
                {currentTerminalLog}
              </span>
            </div>

            {/* iPhone 16 Pro Device Mockup Container */}
            <div
              ref={phoneFrameRef}
              className="relative w-full max-w-[340px] sm:max-w-[360px] h-[580px] sm:h-[620px] rounded-[48px] p-2.5 sm:p-3 bg-gradient-to-b from-[#2b2b2b] via-[#1c1c1c] to-[#121212] border-[4px] border-[#383838] shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.18)] flex flex-col will-change-transform"
            >
              {/* Inner Bezel Screen */}
              <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-[#0c3875] border-2 border-black/50 shadow-inner flex flex-col">
                
                {/* Dynamic Island Notch */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-40 flex items-center justify-between px-2.5 pointer-events-none shadow-md">
                  <div className="w-2 h-2 rounded-full bg-[#181818] border border-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-white/10 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-blue-900/60" />
                  </div>
                </div>

                {/* Smartphone Display Content: Watch Club Simulator */}
                <div
                  data-lenis-prevent
                  className="w-full h-full pt-7 pb-4 flex flex-col relative overflow-hidden overscroll-contain"
                >
                  <WatchClubSimulator />
                </div>

                {/* Bottom Home Indicator Bar */}
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/40 rounded-full z-40 pointer-events-none" />

                {/* Subtle Glass Glare Reflection */}
                <div className="pointer-events-none absolute inset-0 rounded-[38px] bg-gradient-to-tr from-white/[0.04] via-transparent to-transparent z-30" />
              </div>
            </div>

            {/* Hint Beneath Mockup */}
            <div className="mt-5 flex items-center gap-2 text-[11px] text-[#8e8e8e] font-mono">
              <Smartphone className="w-3.5 h-3.5 text-[#fafafa]/60" />
              <span>{t.techDemoHint}</span>
            </div>
          </div>

          {/* Right Column: Copy & Architectural Breakdown */}
          <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between relative z-10">
            <div>
              <span className="inline-block mb-3 text-[#8e8e8e] text-[11px] font-mono font-bold tracking-[0.15em] uppercase">
                {t.techProjectEyebrow}
              </span>

              <h3 data-reveal-sub className="mb-2 text-[clamp(28px,3.8vw,48px)] font-black leading-tight text-[#fafafa]">
                {t.techProjectTitle}
              </h3>

              <p className="text-[13px] sm:text-[14px] font-mono text-[#8e8e8e] mb-5 tracking-wide">
                {t.techProjectSubtitle}
              </p>

              <p className="text-[15px] sm:text-[16px] font-semibold text-[#fafafa] leading-snug mb-3">
                {t.techProjectLead}
              </p>

              <p className="text-[#8e8e8e] text-[13px] sm:text-[14px] leading-relaxed mb-8">
                {t.techProjectDescription}
              </p>

              {/* How It Works - 2x2 Grid */}
              <div className="mb-6">
                <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#fafafa] mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                  {t.techHowItWorksTitle}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {howItWorksSteps.map((step) => (
                    <div
                      key={step.num}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-mono font-bold text-white/70 px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
                          {step.num}
                        </span>
                        <h5 className="text-[12px] font-bold text-white tracking-tight">
                          {step.title}
                        </h5>
                      </div>
                      <p className="text-[11px] text-[#8e8e8e] leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Behind the Demo - Expandable Disclosure */}
              <div className="mb-6 border border-white/10 rounded-xl overflow-hidden bg-white/[0.02]">
                <button
                  type="button"
                  onClick={() => setIsBehindDemoOpen(!isBehindDemoOpen)}
                  aria-expanded={isBehindDemoOpen}
                  aria-controls="behind-demo-panel"
                  id="behind-demo-trigger"
                  className="w-full p-3.5 flex items-center justify-between text-left hover:bg-white/[0.04] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-white/70" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-white">
                      {t.techBehindDemoTitle}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8e8e8e] transition-transform duration-200 ${
                      isBehindDemoOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>

                <div
                  id="behind-demo-panel"
                  role="region"
                  aria-labelledby="behind-demo-trigger"
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-luxury ${
                    isBehindDemoOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="p-4 pt-2 border-t border-white/10 space-y-3">
                      {behindDemoItems.map((item, i) => (
                        <div key={i} className="text-[12px]">
                          <strong className="text-white font-semibold block mb-0.5 text-[12px]">
                            {item.title}
                          </strong>
                          <p className="text-[#8e8e8e] text-[11px] leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      ))}

                      <div className="pt-2 mt-2 border-t border-white/10">
                        <p className="text-[11px] font-mono text-[#8e8e8e] bg-white/5 p-2.5 rounded-lg border border-white/10 leading-relaxed">
                          {t.techDemoDisclaimer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 border border-white/10 rounded-full text-[11px] font-mono font-medium text-white/80 bg-white/[0.03] backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </article>

      </div>
    </section>
  )
}
