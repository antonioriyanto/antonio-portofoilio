import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Capabilities({ t }) {
  const containerRef = useRef(null)

  const capabilities = [
    {
      number: '01',
      category: t.catCreative,
      title: t.creativeTitle,
      copy: t.creativeCopy,
      tags: ['Campaign', 'Graphic Design', 'POSM', 'Print', 'Brand Adaptation'],
      mediaPlaceholder: 'CREATIVE DESIGN SHOWREEL',
      mediaSub: 'Poster → Campaign → POSM → Print',
      overlayLabel: t.selectedWork,
      overlayTitle: 'Creative Design',
      btnLabel: t.viewWork,
      videoSrc: 'videos/creative-design.mp4',
      poster: 'images/creative-design-cover.webp',
      link: '#work',
      reverse: false,
    },
    {
      number: '02',
      category: t.catDigital,
      title: t.contentTitle,
      copy: t.contentCopy,
      tags: ['Social Media', 'Digital Content', 'Motion', 'Video', 'Campaign'],
      mediaPlaceholder: 'CONTENT SHOWREEL',
      mediaSub: 'Feed → Story → Motion → Video',
      overlayLabel: t.digitalWork,
      overlayTitle: 'Content & Motion',
      btnLabel: t.viewWork,
      videoSrc: 'videos/content-digital.mp4',
      poster: 'images/content-digital-cover.webp',
      link: '#work',
      reverse: true,
    },
    {
      number: '03',
      category: t.catRetail,
      title: t.retailTitle,
      copy: t.retailCopy,
      tags: ['40+ Stores', 'Retail', 'POSM', 'Implementation', 'Coordination'],
      mediaPlaceholder: 'RETAIL EXECUTION',
      mediaSub: 'Design → Production → Store Installation',
      overlayLabel: t.storesLabel,
      overlayTitle: t.nationwide,
      btnLabel: t.explore,
      videoSrc: 'videos/retail-execution.mp4',
      poster: 'images/retail-execution-cover.webp',
      link: '#experience',
      reverse: false,
    },
    {
      number: '04',
      category: t.catProduction,
      title: t.vendorTitle,
      copy: t.vendorCopy,
      tags: ['Print Vendor', 'Supplier', 'Production', 'Finishing', 'Quality Control'],
      mediaPlaceholder: 'PRODUCTION PROCESS',
      mediaSub: 'Artwork → Vendor → Production → Final',
      overlayLabel: t.fileReality,
      overlayTitle: 'Production',
      btnLabel: t.explore,
      videoSrc: 'videos/vendor-production.mp4',
      poster: 'images/vendor-production-cover.webp',
      link: '#experience',
      reverse: true,
    },
    {
      number: '05',
      category: t.catTechnology,
      title: t.webTitle,
      copy: t.webCopy,
      tags: ['UI/UX', 'Web Apps', 'Internal Tools', 'AI-Assisted', 'Problem Solving'],
      mediaPlaceholder: 'WEB / APP SHOWREEL',
      mediaSub: 'UI → Interaction → System → Dashboard',
      overlayLabel: t.digitalSolutions,
      overlayTitle: 'Web & Systems',
      btnLabel: t.viewSystems,
      videoSrc: 'videos/web-technology.mp4',
      poster: 'images/web-technology-cover.webp',
      link: '#technology',
      reverse: false,
    },
    {
      number: '06',
      category: t.catOwnership,
      title: t.ownershipTitle,
      copy: t.ownershipCopy,
      tags: ['Brief', 'Planning', 'Coordination', 'Execution', 'Reporting'],
      mediaPlaceholder: 'END-TO-END PROJECT',
      mediaSub: 'Brief → Design → Execution → Result',
      overlayLabel: t.endToEnd,
      overlayTitle: 'Project Ownership',
      btnLabel: t.viewCase,
      videoSrc: 'videos/project-ownership.mp4',
      poster: 'images/project-ownership-cover.webp',
      link: '#case-studies',
      reverse: true,
    },
  ]

  // Dual-Speed Parallax and Border Trace Animations
  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    const ctx = gsap.context(() => {
      // 1. Dual-Speed Parallax on media preview
      const mediaPanels = containerRef.current?.querySelectorAll('.capability-media-inner')
      if (mediaPanels && !isCoarse) {
        mediaPanels.forEach((panel) => {
          gsap.fromTo(
            panel,
            { yPercent: 8 },
            {
              yPercent: -12,
              ease: 'none',
              scrollTrigger: {
                trigger: panel.closest('article'),
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          )
        })
      }

      // 2. Border Trace Animation on dividers
      const dividers = containerRef.current?.querySelectorAll('.capability-border-trace')
      if (dividers) {
        dividers.forEach((divider) => {
          gsap.fromTo(
            divider,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: 'power2.out',
              duration: 1.1,
              scrollTrigger: {
                trigger: divider,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        })
      }
      // 3. 3D Card Unfold on Scroll
      const cards = containerRef.current?.querySelectorAll('.capability-card')
      if (cards) {
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            {
              rotateX: 8,
              y: 40,
              opacity: 0,
              transformPerspective: 1000,
            },
            {
              rotateX: 0,
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
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
    <section ref={containerRef} className="py-24 sm:py-32 border-t border-white/10 bg-[#0d0d0d]/85 backdrop-blur-md relative" id="capabilities">
      <div className="w-[min(calc(100%-48px),1440px)] mx-auto">
        
        {/* Section Header */}
        <div className="pb-16 sm:pb-20">
          <span data-reveal-eyebrow className="block mb-5 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
            {t.whatEyebrow}
          </span>

          <h2 
            data-reveal-title
            className="max-w-[1100px] mb-8 text-[clamp(36px,6.5vw,92px)] font-black leading-[1.14] tracking-[-0.045em] text-[#fafafa] text-specular-glint"
            dangerouslySetInnerHTML={{ __html: t.whatTitle }}
          />
          <p className="max-w-[720px] text-[#8e8e8e] text-[17px] sm:text-[19px] leading-[1.6]">
            {t.whatIntro}
          </p>
        </div>

        {/* 6 Capabilities Bento Panels with Spotlight Glow & Border Trace */}
        <div className="space-y-10">
          {capabilities.map((item, idx) => (
            <div key={item.number} className="group/item">
              {/* Border Trace Divider */}
              <div className="capability-border-trace w-full h-[1px] bg-gradient-to-r from-white/35 via-white/15 to-transparent origin-left mb-8 pointer-events-none" />

              <article
                onMouseMove={handleMouseMove}
                className={`spotlight-card capability-card group relative grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] min-h-[500px] lg:min-h-[580px] rounded-2xl overflow-hidden border border-white/10 bg-[#121212]/80 backdrop-blur-xl transition-all duration-300 hover:border-white/25 will-change-transform ${
                  item.reverse ? 'lg:grid-cols-[1.1fr_0.9fr]' : ''
                }`}
              >
                {/* Dynamic Spotlight Radial Layer */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                  style={{
                    background:
                      'radial-gradient(600px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(255,255,255,0.06), transparent 40%)',
                  }}
                />

                {/* Copy Side */}
                <div
                  className={`relative z-10 p-8 sm:p-12 lg:p-14 flex flex-col justify-between ${
                    item.reverse 
                      ? 'lg:order-2 lg:pl-16' 
                      : 'lg:order-1 lg:pr-16'
                  }`}
                >
                  <div className="flex items-center justify-between gap-5 mb-8">
                    <span className="font-mono text-[14px] font-bold text-white px-2.5 py-1 rounded bg-white/5 border border-white/10">
                      {item.number}
                    </span>
                    <span className="text-[#8e8e8e] text-[11px] font-bold tracking-[0.15em] uppercase font-mono">
                      {item.category}
                    </span>
                  </div>

                  <div className="max-w-[520px] my-4">
                    <h3
                      data-reveal-sub
                      className="mb-5 text-[clamp(32px,4.2vw,68px)] font-black leading-[0.95] tracking-[-0.045em] text-[#fafafa] group-hover:text-white transition-colors"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    />
                    <p className="max-w-[460px] mb-8 text-[#8e8e8e] text-[15px] sm:text-[16px] leading-[1.65]">
                      {item.copy}
                    </p>
                    
                    {/* Technical Tags */}
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3 py-1.5 border border-white/10 rounded-full text-[11px] font-medium text-white/80 bg-white/[0.03] backdrop-blur-sm group-hover:border-white/20 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-[#666666] tracking-wider uppercase pt-6 border-t border-white/[0.06]">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                    <span>Antonio Riyanto — Capability {item.number}</span>
                  </div>
                </div>

                {/* Media Side with Parallax Container */}
                <a
                  href={item.link}
                  data-cursor="magnetic"
                  data-preview-title={item.overlayTitle}
                  data-preview-category={item.category}
                  data-preview-video={item.videoSrc}
                  data-preview-image={item.poster}
                  className={`group/media relative min-h-[340px] sm:min-h-[420px] lg:min-h-[580px] overflow-hidden bg-[#0d0d0d] text-white flex flex-col justify-end border-t lg:border-t-0 ${
                    item.reverse ? 'lg:order-1 lg:border-r border-white/10' : 'lg:order-2 lg:border-l border-white/10'
                  }`}
                >
                  {/* Parallax wrapper element */}
                  <div className="capability-media-inner absolute inset-0 w-full h-[115%] -top-[7%] z-10 will-change-transform">
                    {/* Background placeholder pattern & visual preview */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#1a1a1a] via-[#121212] to-[#0a0a0a] transition-transform duration-700 ease-luxury group-hover/media:scale-[1.03]">
                      {/* Subtle technical grid pattern */}
                      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

                      {/* Brutalist geometric visual frame */}
                      <div className="w-16 h-16 mb-5 border border-white/20 rounded-xl flex items-center justify-center text-white/40 group-hover/media:border-white/60 group-hover/media:text-white transition-all bg-white/[0.02] backdrop-blur-sm shadow-xl">
                        <span className="font-mono text-sm font-bold">{item.number}</span>
                      </div>

                      <span className="relative z-10 text-[12px] font-extrabold tracking-[0.16em] uppercase text-white/90">
                        {item.mediaPlaceholder}
                      </span>
                      <small className="relative z-10 mt-2 text-[#8e8e8e] text-[11px] font-mono">
                        {item.mediaSub}
                      </small>
                    </div>

                    {/* Optional Video with fallback */}
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="none"
                      poster={item.poster}
                      className="absolute inset-0 z-20 w-full h-full object-cover transition-transform duration-700 ease-luxury group-hover/media:scale-105 opacity-0 group-hover/media:opacity-100"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    >
                      <source src={item.videoSrc} type="video/mp4" />
                    </video>
                  </div>

                  {/* Dark Gradient Bottom Overlay */}
                  <div className="relative z-30 pt-24 pb-8 px-8 sm:px-10 flex justify-between items-end gap-5 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none">
                    <div>
                      <small className="block mb-1 text-white/60 text-[10px] font-mono font-bold tracking-[0.14em] uppercase">
                        {item.overlayLabel}
                      </small>
                      <strong className="text-[20px] font-bold text-white tracking-tight">
                        {item.overlayTitle}
                      </strong>
                    </div>

                    <span className="pointer-events-auto px-4 py-2 border border-white/20 rounded-full bg-white/10 backdrop-blur-md text-[12px] font-semibold text-white whitespace-nowrap group-hover/media:bg-white group-hover/media:text-black group-hover/media:border-white transition-all duration-200 shadow-lg">
                      {item.btnLabel} ↗
                    </span>
                  </div>
                </a>
              </article>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
