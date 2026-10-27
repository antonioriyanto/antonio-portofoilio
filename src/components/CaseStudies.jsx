import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CaseStudies({ t }) {
  const containerRef = useRef(null)
  const [activeCase, setActiveCase] = useState(null)

  const cases = [
    {
      num: '01',
      title: t.caseRetail,
      category: 'Creative → Vendor → 40+ Stores',
      challenge:
        'Distributing campaign materials synchronously to 40+ stores nationwide while maintaining brand consistency and print quality under tight timelines.',
      solution:
        'Developed standardized POSM production specs, managed direct print vendor proofs, and created store-level installation guidelines with clear area manager reporting pipelines.',
      impact: '100% on-time campaign rollout across all branches with zero reprint error rates.',
      poster: 'images/retail-execution-cover.webp',
      video: 'videos/retail-execution.mp4',
    },
    {
      num: '02',
      title: t.caseLuckyDipTitle,
      category: t.caseLuckyDipCategory,
      challenge: t.caseLuckyDipChallenge,
      solution: t.caseLuckyDipSolution,
      impact: t.caseLuckyDipImpact,
      poster: 'images/web-technology-cover.webp',
      video: 'videos/web-technology.mp4',
    },
    {
      num: '03',
      title: t.casePrint,
      category: 'Artwork → Production → Retail',
      challenge:
        'Color shifts and material mismatches across different large-format printing vendors and acrylic fabrication workshops.',
      solution:
        'Implemented precise prepress color profiles (CMYK calibrated), exact material density specs, and physical proofing checkoffs before mass production runs.',
      impact: 'Elevated premium luxury brand perception across luxury timepiece storefronts nationwide.',
      poster: 'images/vendor-production-cover.webp',
      video: 'videos/vendor-production.mp4',
    },
    {
      num: '04',
      title: t.caseWorkflow,
      category: 'Operations → Digital Solution',
      challenge:
        'Fragmented communications between store supervisors, regional area managers, and design team causing bottlenecks during promo activations.',
      solution:
        'Built streamlined digital submission workflows and centralized cloud asset depots paired with AI-accelerated copy and adaptation templates.',
      impact: 'Reduced turnaround time from brief approval to store dispatch by over 40%.',
      poster: 'images/project-ownership-cover.webp',
      video: 'videos/project-ownership.mp4',
    },
  ]

  // Alternating Slide Reveal Animation on scroll entry
  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = containerRef.current?.querySelectorAll('.case-study-row')
      if (rows) {
        rows.forEach((row, i) => {
          const fromX = i % 2 === 0 ? -25 : 25
          gsap.fromTo(
            row,
            { x: fromX, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleMouseEnter = (cs) => {
    window.dispatchEvent(
      new CustomEvent('cursor-preview', {
        detail: {
          active: true,
          title: cs.title,
          category: cs.category,
          image: cs.poster,
          video: cs.video,
        },
      })
    )
  }

  const handleMouseLeave = () => {
    window.dispatchEvent(
      new CustomEvent('cursor-preview', {
        detail: { active: false },
      })
    )
  }

  return (
    <section ref={containerRef} className="py-24 sm:py-32 border-t border-white/10 bg-[#0d0d0d]/85 backdrop-blur-md relative" id="case-studies">
      <div className="w-[min(calc(100%-48px),1440px)] mx-auto">
        
        {/* Header */}
        <div className="mb-14 sm:mb-16">
          <span data-reveal-eyebrow className="block mb-5 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
            {t.caseEyebrow}
          </span>

          <h2
            className="max-w-[1050px] mb-8 text-[clamp(36px,6.5vw,84px)] font-black leading-[1.14] tracking-[-0.04em] text-[#fafafa]"
            dangerouslySetInnerHTML={{ __html: t.caseTitle }}
          />
          <p className="max-w-[720px] text-[#8e8e8e] text-[17px] sm:text-[19px] leading-[1.6]">
            {t.caseIntro}
          </p>
        </div>

        {/* Case Studies List (Deep Charcoal Reskin + Alternating Slide Reveal + Focus Dimming) */}
        <div className="border-t border-white/10">
          {cases.map((cs, idx) => {
            const isExpanded = activeCase === idx
            const isDimmed = activeCase !== null && !isExpanded

            return (
              <div
                key={cs.num}
                onMouseEnter={() => handleMouseEnter(cs)}
                onMouseLeave={handleMouseLeave}
                data-cursor="magnetic"
                data-preview-title={cs.title}
                data-preview-category={cs.category}
                data-preview-image={cs.poster}
                data-preview-video={cs.video}
                className={`case-study-row border-b border-white/10 overflow-hidden transition-[opacity,border-color] duration-300 will-change-transform ${
                  isDimmed ? 'opacity-35 hover:opacity-75' : 'opacity-100'
                }`}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveCase(isExpanded ? null : idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveCase(isExpanded ? null : idx)
                    }
                  }}
                  className={`group w-full py-8 sm:py-9 px-4 sm:px-6 flex items-center justify-between text-left cursor-pointer transition-all duration-300 ${
                    isExpanded ? 'bg-white/[0.04] pl-8' : 'hover:bg-white/[0.02] hover:pl-8'
                  }`}
                >
                  {/* Left: Number and Title */}
                  <div className="flex items-baseline sm:items-center gap-5 sm:gap-10 flex-1">
                    <span className="text-[#8e8e8e] text-[12px] sm:text-[13px] font-mono font-bold">
                      {cs.num}
                    </span>
                    <h3 data-reveal-sub className="text-[clamp(20px,2.5vw,36px)] font-black tracking-tight text-[#fafafa] group-hover:text-white transition-colors">
                      {cs.title}
                    </h3>
                  </div>

                  {/* Middle: Category Pipeline */}
                  <span className="hidden md:block text-[#8e8e8e] text-[13px] font-mono pr-8">
                    {cs.category}
                  </span>

                  {/* Right: Interactive Arrow */}
                  <span
                    className={`w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-[16px] text-[#fafafa] bg-white/5 transition-all duration-300 ${
                      isExpanded
                        ? 'rotate-90 bg-white text-black border-white'
                        : 'group-hover:bg-white group-hover:text-black group-hover:border-white group-hover:translate-x-1 group-hover:-translate-y-1'
                    }`}
                  >
                    ↗
                  </span>
                </div>

                {/* Smooth Height Interpolated Collapsible Details Drawer */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-luxury ${
                    isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 sm:px-12 pb-10 pt-4 bg-[#141414]/90 border-t border-white/10">
                      {/* Kinetic Staggered Drawer Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[14px]">
                        <div
                          style={{
                            transitionDelay: isExpanded ? '60ms' : '0ms',
                          }}
                          className={`p-6 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-lg transform transition-all duration-400 ease-out ${
                            isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                          }`}
                        >
                          <span className="block text-[11px] font-mono font-extrabold uppercase tracking-wider text-[#8e8e8e] mb-3">
                            {t.caseLabelChallenge}
                          </span>
                          <p className="text-[#e5e5e5] leading-relaxed">
                            {cs.challenge}
                          </p>
                        </div>

                        <div
                          style={{
                            transitionDelay: isExpanded ? '140ms' : '0ms',
                          }}
                          className={`p-6 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-lg transform transition-all duration-400 ease-out ${
                            isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                          }`}
                        >
                          <span className="block text-[11px] font-mono font-extrabold uppercase tracking-wider text-[#8e8e8e] mb-3">
                            {t.caseLabelSolution}
                          </span>
                          <p className="text-[#e5e5e5] leading-relaxed">
                            {cs.solution}
                          </p>
                        </div>

                        <div
                          style={{
                            transitionDelay: isExpanded ? '220ms' : '0ms',
                          }}
                          className={`p-6 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-lg transform transition-all duration-400 ease-out ${
                            isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                          }`}
                        >
                          <span className="block text-[11px] font-mono font-extrabold uppercase tracking-wider text-[#8e8e8e] mb-3">
                            {t.caseLabelImpact}
                          </span>
                          <p className="text-white leading-relaxed font-semibold">
                            {cs.impact}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
