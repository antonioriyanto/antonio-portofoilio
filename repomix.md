This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
`````
src/
  components/
    About.jsx
    AmbientLiquidBackground.jsx
    Capabilities.jsx
    CapabilityMap.jsx
    CareerJourney.jsx
    CaseStudies.jsx
    Contact.jsx
    CreativeArchive.jsx
    CustomCursor.jsx
    Experience.jsx
    Hero.jsx
    JackOfAllTrades.jsx
    Navbar.jsx
    SelectedWork.jsx
    TechSection.jsx
    WatchClubSimulator.jsx
  data/
    translations.js
  App.jsx
  index.css
  main.jsx
index.html
package.json
postcss.config.js
README.md
repomix-web-porto-aan.md
tailwind.config.js
vite.config.js
`````

# Files

## File: src/components/About.jsx
`````javascript
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
      className="py-24 sm:py-32 border-t border-white/10 bg-canvas relative overflow-hidden"
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
        <span className="block mb-8 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
          {t.aboutEyebrow}
        </span>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Statement with Line-by-Line Gradient Wipe */}
          <div
            ref={statementRef}
            className="text-[clamp(26px,3.5vw,46px)] font-black leading-[1.18] tracking-[-0.04em] text-[#fafafa]"
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
`````

## File: src/components/AmbientLiquidBackground.jsx
`````javascript
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * AmbientLiquidBackground
 * GPU-accelerated ambient liquid layer with SVG micro-noise,
 * floating organic gradient blobs, and velocity-stretched cursor surge.
 */
export default function AmbientLiquidBackground() {
  const surgeBlobRef = useRef(null)
  const pos = useRef({ x: -500, y: -500 })
  const targetPos = useRef({ x: -500, y: -500 })
  const vel = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Disable interactive cursor surge on coarse/touch devices
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    if (isCoarse || !surgeBlobRef.current) return

    const blob = surgeBlobRef.current
    let animId = null

    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY }
    }

    const render = () => {
      // Dampened GSAP lerp (0.08)
      const prevX = pos.current.x
      const prevY = pos.current.y

      pos.current.x += (targetPos.current.x - pos.current.x) * 0.08
      pos.current.y += (targetPos.current.y - pos.current.y) * 0.08

      // Velocity calculation
      vel.current.x = pos.current.x - prevX
      vel.current.y = pos.current.y - prevY

      const speed = Math.sqrt(vel.current.x * vel.current.x + vel.current.y * vel.current.y)
      const angle = Math.atan2(vel.current.y, vel.current.x) * (180 / Math.PI)

      // Velocity stretching
      const stretch = Math.min(1.4, 1 + speed * 0.015)
      const squeeze = Math.max(0.75, 1 - speed * 0.008)

      blob.style.transform = `translate3d(${pos.current.x - 200}px, ${
        pos.current.y - 200
      }px, 0) rotate(${angle}deg) scale(${stretch}, ${squeeze})`

      animId = requestAnimationFrame(render)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    animId = requestAnimationFrame(render)

    return () => {
      if (animId) cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#0d0d0d]"
    >
      {/* Layer 1: Subtle SVG Noise Texture (eradicates gradient banding) */}
      <svg
        className="fixed inset-0 w-full h-full opacity-[0.025] pointer-events-none z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="liquidNoiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#liquidNoiseFilter)" />
      </svg>

      {/* Layer 2: Organic Floating Radial Blobs */}
      <div className="absolute inset-0 w-full h-full overflow-hidden filter blur-[140px] transform-gpu">
        {/* Blob 1: 650px diameter, #161616, 25s elliptical float */}
        <div
          className="absolute -top-[10%] -left-[10%] w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-[#161616] via-[#1c1c1c] to-transparent opacity-80 will-change-transform"
          style={{
            animation: 'ambientBlob1 25s infinite ease-in-out',
          }}
        />

        {/* Blob 2: 550px diameter, #202020, 32s counter-clockwise float */}
        <div
          className="absolute top-[45%] -right-[12%] w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[#202020] via-[#181818] to-transparent opacity-60 will-change-transform"
          style={{
            animation: 'ambientBlob2 32s infinite ease-in-out',
          }}
        />

        {/* Blob 3: 450px diameter, #2b2b2b, 5% subtle ambient foundation */}
        <div
          className="absolute -bottom-[15%] left-[25%] w-[450px] h-[450px] rounded-full bg-[#2b2b2b] opacity-[0.05] will-change-transform"
          style={{
            animation: 'ambientBlob3 28s infinite ease-in-out',
          }}
        />

        {/* Layer 3: Interactive Cursor Surge Blob (400px diameter, #242424, 5% opacity) */}
        <div
          ref={surgeBlobRef}
          className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-[#242424] opacity-[0.05] pointer-events-none will-change-transform"
        />
      </div>
    </div>
  )
}
`````

## File: src/components/Capabilities.jsx
`````javascript
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
    <section ref={containerRef} className="py-24 sm:py-32 border-t border-white/10 bg-canvas relative" id="capabilities">
      <div className="w-[min(calc(100%-48px),1440px)] mx-auto">
        
        {/* Section Header */}
        <div className="pb-16 sm:pb-20">
          <span className="block mb-5 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
            {t.whatEyebrow}
          </span>

          <h2 
            className="max-w-[1100px] mb-8 text-[clamp(36px,6.5vw,92px)] font-black leading-[0.95] tracking-[-0.045em] text-[#fafafa]"
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
`````

## File: src/components/CapabilityMap.jsx
`````javascript
import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CapabilityMap({ t }) {
  const containerRef = useRef(null)
  const gridRef = useRef(null)
  const [hoveredSkill, setHoveredSkill] = useState(null)

  const groups = [
    {
      title: 'Creative',
      skills: [
        'Graphic Design',
        'Campaign',
        'Brand Adaptation',
        'Print',
        'POSM',
      ],
    },
    {
      title: 'Content',
      skills: [
        'Social Media',
        'Motion Graphics',
        'Video',
        'Photography',
        'Copywriting',
      ],
    },
    {
      title: 'Digital',
      skills: [
        'Web Design',
        'UI/UX',
        'HTML / CSS',
        'Responsive Design',
        'Digital Experience',
      ],
    },
    {
      title: t.operations,
      skills: [
        'Retail Execution',
        'Multi-Store Coordination',
        'Vendor Management',
        'Production',
        'Project Management',
      ],
    },
    {
      title: t.problemSolving,
      skills: [
        'Internal Tools',
        'AI-Assisted Development',
        'Workflow Improvement',
        'System Prototyping',
        'Troubleshooting',
      ],
    },
  ]

  // Cross-Matrix skill relationships
  const skillRelations = {
    'Web Design': ['UI/UX', 'HTML / CSS', 'Responsive Design', 'Digital Experience', 'System Prototyping'],
    'UI/UX': ['Web Design', 'Digital Experience', 'Internal Tools', 'System Prototyping'],
    'HTML / CSS': ['Web Design', 'Responsive Design', 'Troubleshooting'],
    'Responsive Design': ['Web Design', 'HTML / CSS', 'Digital Experience'],
    'Digital Experience': ['Web Design', 'UI/UX', 'Motion Graphics'],
    'Graphic Design': ['Campaign', 'Brand Adaptation', 'Print', 'POSM', 'Social Media'],
    'Campaign': ['Graphic Design', 'Social Media', 'Retail Execution', 'Multi-Store Coordination', 'Copywriting'],
    'Brand Adaptation': ['Graphic Design', 'Print', 'Vendor Management', 'Production'],
    'Print': ['POSM', 'Retail Execution', 'Vendor Management', 'Production'],
    'POSM': ['Print', 'Retail Execution', 'Multi-Store Coordination', 'Vendor Management'],
    'Social Media': ['Motion Graphics', 'Video', 'Photography', 'Copywriting', 'Campaign'],
    'Motion Graphics': ['Video', 'Social Media', 'Digital Experience'],
    'Video': ['Motion Graphics', 'Photography', 'Social Media'],
    'Photography': ['Video', 'Social Media'],
    'Copywriting': ['Campaign', 'Social Media', 'Project Management'],
    'Retail Execution': ['Multi-Store Coordination', 'Vendor Management', 'Production', 'POSM'],
    'Multi-Store Coordination': ['Retail Execution', 'Project Management', 'Workflow Improvement'],
    'Vendor Management': ['Print', 'Production', 'Project Management', 'Brand Adaptation'],
    'Production': ['Print', 'POSM', 'Vendor Management'],
    'Project Management': ['Multi-Store Coordination', 'Workflow Improvement', 'Troubleshooting'],
    'Internal Tools': ['AI-Assisted Development', 'Workflow Improvement', 'System Prototyping', 'UI/UX'],
    'AI-Assisted Development': ['Internal Tools', 'System Prototyping', 'Troubleshooting'],
    'Workflow Improvement': ['Internal Tools', 'Project Management', 'Troubleshooting'],
    'System Prototyping': ['Internal Tools', 'UI/UX', 'Web Design'],
    'Troubleshooting': ['System Prototyping', 'Internal Tools', 'HTML / CSS'],
  }

  // Matrix Column Lock on scroll entry
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.matrix-column-card',
        { y: -30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const isRelated = (skill) => {
    if (!hoveredSkill) return true
    if (skill === hoveredSkill) return true
    return skillRelations[hoveredSkill]?.includes(skill)
  }

  return (
    <section ref={containerRef} className="py-24 sm:py-32 border-t border-white/10 bg-canvas relative">
      <div className="w-[min(calc(100%-48px),1440px)] mx-auto">
        
        {/* Header */}
        <div className="mb-14 sm:mb-16">
          <span className="block mb-5 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
            {t.mapEyebrow}
          </span>

          <h2 className="max-w-[1050px] text-[clamp(36px,6.5vw,92px)] font-black leading-[0.95] tracking-[-0.045em] text-[#fafafa]">
            {t.mapTitle}
          </h2>
        </div>

        {/* 5-Column Dark Technical Card Skill Map with Matrix Column Lock & Cross-Matrix Highlighting */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-t border-l border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          {groups.map((group, idx) => (
            <article
              key={idx}
              className="matrix-column-card group min-h-[320px] sm:min-h-[340px] p-7 sm:p-8 border-r border-b border-white/10 flex flex-col justify-between bg-[#141414]/90 hover:bg-[#1a1a1a] backdrop-blur-xl transition-[border-color,background-color,box-shadow] duration-300 ease-luxury relative will-change-transform"
            >
              {/* Subtle top edge glow on hover */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/0 group-hover:via-white/40 to-transparent transition-all duration-300" />

              <div>
                <span className="text-[11px] font-mono text-[#8e8e8e] block mb-2 font-bold tracking-wider group-hover:text-white transition-colors">
                  [0{idx + 1}]
                </span>
                <h3 className="mb-6 text-[20px] sm:text-[22px] font-black text-[#fafafa] group-hover:text-white transition-colors">
                  {group.title}
                </h3>
                <ul className="space-y-3 text-[14px]">
                  {group.skills.map((skill, sIdx) => {
                    const active = isRelated(skill)
                    const isDirect = skill === hoveredSkill

                    return (
                      <li
                        key={sIdx}
                        onMouseEnter={() => setHoveredSkill(skill)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className={`flex items-center gap-2.5 cursor-pointer py-0.5 transition-all duration-200 ${
                          active
                            ? 'text-[#fafafa] opacity-100'
                            : 'text-[#6e6e6a] opacity-30 hover:opacity-75'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full inline-block transition-all duration-200 ${
                            isDirect
                              ? 'bg-white shadow-[0_0_10px_#ffffff] scale-150'
                              : active && hoveredSkill
                              ? 'bg-white/80 shadow-[0_0_6px_rgba(255,255,255,0.6)]'
                              : 'bg-white/30'
                          }`}
                        />
                        <span className={isDirect ? 'font-semibold text-white' : ''}>
                          {skill}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#555555] group-hover:text-accent-chrome mt-8 pt-4 border-t border-white/[0.06] transition-colors">
                ACTIVE CAPABILITY
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
`````

## File: src/components/CareerJourney.jsx
`````javascript
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
    <section ref={containerRef} className="py-24 sm:py-32 bg-[#0d0d0d] border-t border-white/10 relative" id="journey">
      <div className="w-[min(calc(100%-48px),1440px)] mx-auto">
        
        {/* Section Header */}
        <div>
          <span className="block mb-5 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
            {t.journeyEyebrow}
          </span>

          <h2
            className="max-w-[1050px] mb-8 text-[clamp(36px,6.5vw,92px)] font-black leading-[0.95] tracking-[-0.045em] text-[#fafafa]"
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
`````

## File: src/components/CaseStudies.jsx
`````javascript
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
      title: 'Watch Club Lucky Spin',
      category: 'Problem → UI/UX → Internal System',
      challenge:
        'Manual promotional raffle draws at retail outlets were vulnerable to fraud, difficult to audit, and lacked customer excitement.',
      solution:
        'Designed and engineered an interactive digital Lucky Spin web application with rule-based probability engines, tamper-proof voucher verification, and real-time backend synchronization.',
      impact:
        'Engaged thousands of retail customers, boosted campaign conversions, and provided HQ with instant real-time audit logs.',
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
    <section ref={containerRef} className="py-24 sm:py-32 border-t border-white/10 bg-canvas relative" id="case-studies">
      <div className="w-[min(calc(100%-48px),1440px)] mx-auto">
        
        {/* Header */}
        <div className="mb-14 sm:mb-16">
          <span className="block mb-5 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
            {t.caseEyebrow}
          </span>

          <h2
            className="max-w-[1050px] mb-8 text-[clamp(36px,6.5vw,92px)] font-black leading-[0.95] tracking-[-0.045em] text-[#fafafa]"
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
                    <h3 className="text-[clamp(20px,2.5vw,36px)] font-black tracking-tight text-[#fafafa] group-hover:text-white transition-colors">
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
                            01 / The Challenge
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
                            02 / The Solution
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
                            03 / Real Impact
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
`````

## File: src/components/Contact.jsx
`````javascript
import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact({ t }) {
  const containerRef = useRef(null)
  const buttonsRef = useRef(null)
  const [timeStr, setTimeStr] = useState('')
  const [copied, setCopied] = useState(false)

  // Real-Time Jakarta Clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date()
        const options = {
          timeZone: 'Asia/Jakarta',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }
        const formatted = new Intl.DateTimeFormat('en-GB', options).format(now)
        setTimeStr(formatted)
      } catch {
        setTimeStr('09:00:00')
      }
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Magnetic Float Cluster Reveal Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-action-btn',
        { y: 30, opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: buttonsRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleCopyEmail = () => {
    try {
      navigator.clipboard?.writeText('antonio.riyanto07@gmail.com')
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // fallback
    }
  }

  return (
    <section
      ref={containerRef}
      className="pt-24 sm:pt-32 pb-12 bg-[#0a0a0a] text-white border-t border-white/10 relative"
      id="contact"
    >
      {/* Background ambient luxury glow spot */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none"
      />

      <div className="w-[min(calc(100%-48px),1440px)] mx-auto relative z-10">
        
        {/* Eyebrow */}
        <span className="block mb-6 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
          {t.contactEyebrow}
        </span>

        {/* Title */}
        <h2 className="max-w-[1050px] mb-12 text-[clamp(36px,6.5vw,92px)] font-black leading-[0.95] tracking-[-0.045em] text-[#fafafa]">
          {t.contactTitle}
        </h2>

        {/* Action Buttons with Magnetic Micro-Interactions, Float Cluster & One-Click Copy */}
        <div
          ref={buttonsRef}
          className="flex flex-wrap items-center gap-4 mb-24 sm:mb-32"
        >
          <div className="contact-action-btn relative inline-flex will-change-transform">
            <a
              href="mailto:antonio.riyanto07@gmail.com"
              onClick={handleCopyEmail}
              data-cursor="magnetic"
              className="min-h-[50px] px-8 inline-flex items-center justify-center rounded-full text-[13px] font-bold bg-white text-[#0d0d0d] border border-white hover:bg-neutral-200 hover:-translate-y-0.5 active:translate-y-0 shadow-[0_4px_25px_rgba(255,255,255,0.18)] transition-all duration-200"
            >
              {t.emailMe} ↗
            </a>
          </div>

          <div className="contact-action-btn will-change-transform">
            <a
              href="https://wa.me/6281903987051"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="magnetic"
              className="min-h-[50px] px-8 inline-flex items-center justify-center rounded-full text-[13px] font-semibold text-white border border-white/20 hover:border-white/50 hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-md transition-all duration-200"
            >
              {t.whatsApp} ↗
            </a>
          </div>

          <div className="contact-action-btn will-change-transform">
            <a
              href="https://www.linkedin.com/in/antonio-riyanto-928203186/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="magnetic"
              className="min-h-[50px] px-8 inline-flex items-center justify-center rounded-full text-[13px] font-semibold text-white border border-white/20 hover:border-white/50 hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-md transition-all duration-200"
            >
              {t.linkedIn} ↗
            </a>
          </div>
        </div>

        {/* Floating Toast Notification on Copy */}
        {copied && (
          <div
            role="status"
            className="fixed bottom-8 right-6 sm:right-10 z-[10000] flex items-center gap-2.5 px-5 py-3 rounded-full bg-white text-black font-mono text-[12px] font-bold shadow-[0_10px_35px_rgba(0,0,0,0.8)] border border-white animate-fadeIn"
          >
            <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
            <span>Copied to clipboard (antonio.riyanto07@gmail.com)</span>
          </div>
        )}

        {/* Footer with Real-Time Jakarta Clock */}
        <footer className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[#8e8e8e] text-[12px] font-mono">
          <div className="flex flex-wrap items-center gap-4">
            <span>{t.footerCopyright}</span>
            <span className="text-[#444444]">•</span>
            {/* Live Jakarta Clock */}
            <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/90">
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
              <span>JAKARTA, ID — {timeStr || 'LIVE'} WIB</span>
            </span>
          </div>

          <span className="text-[#666666]">
            {t.footerRole}
          </span>
        </footer>

      </div>
    </section>
  )
}
`````

## File: src/components/CreativeArchive.jsx
`````javascript
import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CreativeArchive({ t }) {
  const [selectedFilter, setSelectedFilter] = useState('All')
  const containerRef = useRef(null)
  const gridRef = useRef(null)

  const filterCategories = [
    'All',
    'Branding',
    'Campaign',
    'Social',
    'Print',
    'Retail',
    'Motion',
    'Digital',
    'UI / Web',
  ]

  const archiveItems = [
    { id: '01', title: 'Brand Identity Concept', category: 'Branding', format: 'Vector & Guidelines' },
    { id: '02', title: 'Seasonal Sale POSM', category: 'Retail', format: 'Large Format Print' },
    { id: '03', title: 'Social Motion Teaser', category: 'Motion', format: '1080x1920 Reel' },
    { id: '04', title: 'Luxury Timepiece Brochure', category: 'Print', format: 'Offset & Foil Stamp' },
    { id: '05', title: 'Storefront Display Graphics', category: 'Retail', format: 'Window Decal & Lightbox' },
    { id: '06', title: 'Interactive Campaign Wheel', category: 'UI / Web', format: 'React + Canvas App' },
    { id: '07', title: 'Multichannel Ad Campaign', category: 'Campaign', format: 'Social & OOH Ads' },
    { id: '08', title: 'Digital Asset Dashboard', category: 'Digital', format: 'Web App Prototype' },
    { id: '09', title: 'Product Launch 3D Motion', category: 'Motion', format: '3D & Compositing' },
    { id: '10', title: 'Corporate Stationery Suite', category: 'Branding', format: 'Identity System' },
    { id: '11', title: 'Influencer Media Kit', category: 'Social', format: 'Editorial PDF & Assets' },
    { id: '12', title: 'Multi-Store Display Banner', category: 'Print', format: 'Nationwide POSM' },
  ]

  const filteredItems = selectedFilter === 'All'
    ? archiveItems
    : archiveItems.filter((item) => item.category === selectedFilter)

  // Cascade Grid Fall on Scroll Entry
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.archive-card-cascade',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: {
            grid: [3, 4],
            from: 'start',
            amount: 0.4,
          },
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Fast smooth re-stagger on filter category change
  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        '.archive-card-cascade',
        { scale: 0.96, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, stagger: 0.025, ease: 'power2.out' }
      )
    }
  }, [selectedFilter])

  return (
    <section ref={containerRef} className="py-24 sm:py-32 border-t border-white/10 bg-canvas relative" id="archive">
      <div className="w-[min(calc(100%-48px),1440px)] mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <span className="block mb-5 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
            {t.archiveEyebrow}
          </span>

          <h2 className="max-w-[1050px] mb-8 text-[clamp(36px,6.5vw,92px)] font-black leading-[0.95] tracking-[-0.045em] text-[#fafafa]">
            {t.archiveTitle}
          </h2>
          <p className="max-w-[720px] text-[#8e8e8e] text-[17px] sm:text-[19px] leading-[1.6]">
            {t.archiveIntro}
          </p>
        </div>

        {/* Dark Glass Filter Pills with White Active States */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {filterCategories.map((cat) => {
            const isActive = selectedFilter === cat
            const label = cat === 'All' ? t.all : cat

            return (
              <button
                key={cat}
                type="button"
                data-cursor="magnetic"
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 border rounded-full text-[12px] font-medium backdrop-blur-md transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-[#0d0d0d] border-white shadow-[0_2px_15px_rgba(255,255,255,0.2)] font-bold'
                    : 'bg-white/[0.04] text-[#8e8e8e] border-white/10 hover:text-white hover:border-white/30 hover:bg-white/[0.08]'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>

        {/* Archive Technical Grid with Cascade Fall */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              data-cursor="magnetic"
              className="archive-card-cascade group aspect-[4/5] p-5 sm:p-6 flex flex-col justify-between bg-[#141414]/80 border border-white/10 rounded-xl text-[#8e8e8e] backdrop-blur-xl transition-[border-color,background-color,box-shadow,transform] duration-300 ease-luxury hover:-translate-y-1 hover:border-white/30 hover:bg-[#1a1a1a] hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] relative overflow-hidden will-change-transform"
            >
              {/* Subtle top header */}
              <div className="flex justify-between items-center z-10">
                <span className="text-[10px] font-mono font-bold text-[#8e8e8e]">
                  #{item.id}
                </span>
                <span className="px-2 py-0.5 bg-white/10 rounded text-[9px] font-mono font-bold text-white uppercase tracking-wider border border-white/10">
                  {item.category}
                </span>
              </div>

              {/* Center icon / placeholder emblem */}
              <div className="my-auto text-center z-10">
                <div className="w-12 h-12 mx-auto mb-3 border border-white/15 rounded-xl grid place-items-center group-hover:border-white/40 group-hover:bg-white/5 transition-all text-white font-mono shadow-sm">
                  <span className="text-[12px] font-bold font-mono text-white/90">
                    {item.id}
                  </span>
                </div>
                <strong className="block text-[14px] sm:text-[15px] font-bold text-[#fafafa] leading-snug group-hover:text-white transition-colors">
                  {item.title}
                </strong>
                <span className="block mt-1 text-[11px] font-mono text-[#8e8e8e]">
                  {item.format}
                </span>
              </div>

              {/* Bottom footer hover label */}
              <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[10px] uppercase font-mono font-bold text-[#6e6e6a] group-hover:text-white transition-colors z-10">
                <span>Exploration</span>
                <span>↗</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
`````

## File: src/components/CustomCursor.jsx
`````javascript
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

/**
 * CustomFollowerCursor with Magnetic Physics & Floating Media Preview Bridge
 * Includes strict mobile/touch guard to avoid overhead on coarse pointer devices.
 */
export default function CustomCursor() {
  const [isCoarse, setIsCoarse] = useState(true)
  const [previewData, setPreviewData] = useState({
    active: false,
    title: '',
    category: '',
    image: null,
    video: null,
  })

  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const previewRef = useRef(null)

  const mousePos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const previewPos = useRef({ x: -100, y: -100 })
  const velocity = useRef({ x: 0, y: 0 })
  const isHovered = useRef(false)
  const isMagnetic = useRef(false)
  const magneticTarget = useRef(null)

  useEffect(() => {
    // Strict Mobile Guard: pointer coarse detection
    const mediaQuery = window.matchMedia('(pointer: coarse)')
    const checkCoarse = () => {
      const coarse = mediaQuery.matches || !window.matchMedia('(pointer: fine)').matches
      setIsCoarse(coarse)
      return coarse
    }

    if (checkCoarse()) {
      return
    }

    const handleMediaChange = () => {
      checkCoarse()
    }
    mediaQuery.addEventListener?.('change', handleMediaChange)

    // Mouse Move Coordinator
    const onMouseMove = (e) => {
      const { clientX, clientY } = e
      velocity.current = {
        x: (clientX - mousePos.current.x) * 0.4,
        y: (clientY - mousePos.current.y) * 0.4,
      }
      mousePos.current = { x: clientX, y: clientY }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`
      }
    }

    // Magnetic Attraction & Hover Targets
    const onMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor="magnetic"], [data-cursor="hover"]')
      if (target) {
        isHovered.current = true
        if (target.matches('[data-cursor="magnetic"], a, button')) {
          isMagnetic.current = true
          magneticTarget.current = target
        }
      }

      // Check for preview data attributes
      const previewEl = e.target.closest('[data-preview-title]')
      if (previewEl) {
        setPreviewData({
          active: true,
          title: previewEl.dataset.previewTitle || '',
          category: previewEl.dataset.previewCategory || '',
          image: previewEl.dataset.previewImage || null,
          video: previewEl.dataset.previewVideo || null,
        })
      }
    }

    const onMouseOut = (e) => {
      const target = e.target.closest('a, button, [data-cursor="magnetic"], [data-cursor="hover"]')
      if (target) {
        isHovered.current = false
        isMagnetic.current = false
        magneticTarget.current = null
      }

      const previewEl = e.target.closest('[data-preview-title]')
      if (previewEl) {
        // If relatedTarget is not inside the preview element
        if (!previewEl.contains(e.relatedTarget)) {
          setPreviewData((prev) => ({ ...prev, active: false }))
        }
      }
    }

    // Custom Event Listener for custom hover preview payload bridge
    const onCustomPreview = (e) => {
      const detail = e.detail || {}
      setPreviewData({
        active: !!detail.active,
        title: detail.title || '',
        category: detail.category || '',
        image: detail.image || null,
        video: detail.video || null,
      })
    }

    // Render loop with lerp: 0.15
    let animationFrameId
    const lerp = (start, end, factor) => start + (end - start) * factor

    const render = () => {
      let targetX = mousePos.current.x
      let targetY = mousePos.current.y

      // Magnetic pull physics
      if (isMagnetic.current && magneticTarget.current) {
        const rect = magneticTarget.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const pull = 0.35
        targetX = lerp(targetX, centerX, pull)
        targetY = lerp(targetY, centerY, pull)
      }

      ringPos.current.x = lerp(ringPos.current.x, targetX, 0.15)
      ringPos.current.y = lerp(ringPos.current.y, targetY, 0.15)

      if (ringRef.current) {
        const scale = previewData.active ? 0.3 : isHovered.current ? 1.7 : 1
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) scale(${scale})`
      }

      // Floating Media Preview Capsule Tracking & Tilt
      if (previewRef.current && previewData.active) {
        previewPos.current.x = lerp(previewPos.current.x, mousePos.current.x + 24, 0.12)
        previewPos.current.y = lerp(previewPos.current.y, mousePos.current.y - 120, 0.12)

        const tiltX = Math.max(-15, Math.min(15, -velocity.current.y * 1.5))
        const tiltY = Math.max(-15, Math.min(15, velocity.current.x * 1.5))

        previewRef.current.style.transform = `translate3d(${previewPos.current.x}px, ${previewPos.current.y}px, 0) perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
      }

      animationFrameId = requestAnimationFrame(render)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseover', onMouseOver, { passive: true })
    document.addEventListener('mouseout', onMouseOut, { passive: true })
    window.addEventListener('cursor-preview', onCustomPreview)

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      window.removeEventListener('cursor-preview', onCustomPreview)
      mediaQuery.removeEventListener?.('change', handleMediaChange)
    }
  }, [previewData.active])

  if (isCoarse) return null

  return (
    <>
      {/* Central Precise Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference will-change-transform"
      />

      {/* Trailing Spring Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-white pointer-events-none z-[9998] mix-blend-difference will-change-transform transition-opacity duration-200"
      />

      {/* Floating Thumbnail Preview Capsule */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 w-[280px] aspect-[16/10] rounded-xl overflow-hidden pointer-events-none z-[9990] backdrop-blur-xl bg-canvas-card/90 border border-white/20 shadow-2xl transition-opacity duration-300 ${
          previewData.active ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Subtle radial inner glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />

        {/* Video or Image or Aesthetic Fallback */}
        {previewData.video ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            src={previewData.video}
            className="w-full h-full object-cover"
          />
        ) : previewData.image ? (
          <img
            src={previewData.image}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col justify-between p-4 bg-gradient-to-br from-[#1c1c1c] to-[#0f0f0f]">
            <div className="flex items-center justify-between text-[10px] font-mono text-text-muted">
              <span>PROJECT PREVIEW</span>
              <span className="w-2 h-2 rounded-full bg-white/40 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-accent-chrome/60 block">
                {previewData.category || 'CASE STUDY'}
              </span>
              <strong className="text-[14px] font-bold text-text-primary tracking-tight line-clamp-1">
                {previewData.title || 'Technical Project'}
              </strong>
            </div>
          </div>
        )}

        {/* Minimalist Lower Overlay Label when media is displayed */}
        {(previewData.image || previewData.video) && (
          <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            <span className="text-[9px] uppercase font-bold tracking-wider text-white/70 block">
              {previewData.category}
            </span>
            <strong className="text-[12px] font-semibold text-white tracking-tight line-clamp-1">
              {previewData.title}
            </strong>
          </div>
        )}
      </div>
    </>
  )
}
`````

## File: src/components/Experience.jsx
`````javascript
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Experience({ t }) {
  const containerRef = useRef(null)

  const steps = [
    {
      num: '01',
      title: t.flowCreative,
      copy: t.flowCreativeCopy,
    },
    {
      num: '02',
      title: t.flowProduction,
      copy: t.flowProductionCopy,
    },
    {
      num: '03',
      title: t.flowVendor || 'Vendor',
      copy: t.flowVendorCopy,
    },
    {
      num: '04',
      title: t.flowStores,
      copy: t.flowStoresCopy,
    },
    {
      num: '05',
      title: t.flowMonitoring,
      copy: t.flowMonitoringCopy,
    },
    {
      num: '06',
      title: t.flowManagement,
      copy: t.flowManagementCopy,
    },
  ]

  const responsibilities = [
    {
      num: '01',
      title: t.respCreative,
      items: [
        'Campaign Visual',
        'Graphic Design',
        'POSM',
        'Print',
        'Digital Assets',
        'Brand Adaptation',
      ],
    },
    {
      num: '02',
      title: t.respRetail,
      items: [
        '40+ Store Support',
        'Area Manager Coordination',
        'Supervisor Coordination',
        'Store Communication',
        'Implementation',
        'Monitoring',
      ],
    },
    {
      num: '03',
      title: t.respVendor,
      items: [
        'Print Vendor',
        'Web Vendor',
        'Supplier Coordination',
        'Production Preparation',
        'Revision',
        'Quality Control',
      ],
    },
    {
      num: '04',
      title: t.respDigital,
      items: [
        'UI/UX',
        'Web Projects',
        'Internal Tools',
        'AI-Assisted Development',
        'Workflow Improvement',
        'Troubleshooting',
      ],
    },
    {
      num: '05',
      title: t.respOwnership,
      items: [
        'Brief',
        'Planning',
        'Execution',
        'Revision',
        'Delivery',
        'Follow-up',
      ],
    },
    {
      num: '06',
      title: t.respManagement,
      items: [
        'Progress Updates',
        'Issue Resolution',
        'Stakeholder Coordination',
        'Result Reporting',
        'General Manager Communication',
      ],
    },
  ]

  const stakeholders = [
    {
      role: 'General Manager',
      copy: t.gmCopy,
    },
    {
      role: 'Area Managers',
      copy: t.amCopy,
    },
    {
      role: 'Supervisors & Stores',
      copy: t.storeCopy,
    },
    {
      role: 'Print / Web Vendors',
      copy: t.vendorStakeholderCopy,
    },
    {
      role: 'Suppliers / Partners',
      copy: t.supplierCopy,
    },
  ]

  // Sequential Pipeline Activation & Matrix Height Expansion
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Sequential Pipeline Activation flash across steps 01-06
      const workflowSteps = containerRef.current?.querySelectorAll('.workflow-step-card')
      if (workflowSteps) {
        gsap.fromTo(
          workflowSteps,
          { borderColor: 'rgba(255, 255, 255, 0.1)', backgroundColor: 'transparent' },
          {
            borderColor: 'rgba(255, 255, 255, 0.45)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            stagger: 0.12,
            duration: 0.4,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: '.workflow-grid-container',
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // 2. Matrix Height Expansion on responsibility cards
      const respCards = containerRef.current?.querySelectorAll('.resp-matrix-card')
      if (respCards) {
        gsap.fromTo(
          respCards,
          { scaleY: 0.95, opacity: 0.4, borderColor: 'rgba(255, 255, 255, 0.04)' },
          {
            scaleY: 1,
            opacity: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
            stagger: 0.1,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.resp-matrix-container',
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="py-24 sm:py-32 bg-[#0c0c0c] text-white border-t border-white/10 relative"
      id="experience"
    >
      <div className="w-[min(calc(100%-48px),1440px)] mx-auto">
        
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.5fr] gap-10 lg:gap-14 items-end pb-12 sm:pb-16 border-b border-white/10">
          <div>
            <span className="block mb-5 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
              {t.experienceEyebrow}
            </span>

            <h2 className="max-w-[1050px] mb-8 text-[clamp(36px,6.5vw,92px)] font-black leading-[0.95] tracking-[-0.045em] text-[#fafafa]">
              Watch Club Indonesia.
            </h2>
            <p className="max-w-[720px] text-[#8e8e8e] text-[17px] sm:text-[19px] leading-[1.6]">
              {t.experienceIntro}
            </p>
          </div>

          {/* Stat with Live Network Monochrome Radar */}
          <div className="lg:text-right">
            <div className="inline-flex items-center gap-3 lg:justify-end">
              {/* Refined Monochrome Radar Ring Ping */}
              <div className="relative flex items-center justify-center w-6 h-6">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/20 opacity-70" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white shadow-[0_0_10px_#ffffff]" />
              </div>
              <strong className="block text-[clamp(54px,9vw,130px)] font-black leading-[0.85] tracking-[-0.06em] text-transparent bg-clip-text bg-gradient-to-br from-white via-[#e5e5e5] to-[#777777]">
                40+
              </strong>
            </div>
            <div className="flex items-center lg:justify-end gap-2 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span className="text-[#8e8e8e] text-[13px] font-mono tracking-wide block">
                {t.retailLocations}
              </span>
            </div>
          </div>
        </div>

        {/* 6-Step Workflow with Sequential Pipeline Activation */}
        <div className="workflow-grid-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 mt-14 sm:mt-16 border-t border-b border-white/10">
          {steps.map((step, idx) => (
            <article
              key={idx}
              className="workflow-step-card relative p-6 sm:p-7 min-h-[190px] sm:min-h-[220px] border-b sm:border-b-0 sm:border-r border-white/10 last:border-b-0 lg:last:border-r-0 flex flex-col justify-between group hover:bg-[#161616] transition-colors duration-200"
            >
              <div className="flex justify-between items-center">
                <span className="text-[#8e8e8e] text-[12px] font-bold font-mono group-hover:text-white transition-colors">
                  {step.num}
                </span>
                {idx < 5 && (
                  <span
                    className="hidden lg:block text-xs font-mono circuit-pulse-arrow"
                    style={{ animationDelay: `${idx * 0.4}s` }}
                  >
                    →
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-[19px] font-bold text-[#fafafa] mb-2 group-hover:text-white">
                  {step.title}
                </h3>
                <p className="text-[#8e8e8e] text-[12px] leading-relaxed">
                  {step.copy}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Responsibility Grid (6 Cards) with Matrix Height Expansion */}
        <div className="resp-matrix-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16 sm:mt-24 border-t border-l border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          {responsibilities.map((resp, idx) => (
            <article
              key={idx}
              className="resp-matrix-card p-8 sm:p-9 min-h-[290px] border-r border-b border-white/10 flex flex-col justify-between bg-[#121212]/90 hover:bg-[#181818] transition-all duration-300 ease-luxury group origin-top will-change-transform"
            >
              <small className="text-[#8e8e8e] font-bold text-[11px] font-mono group-hover:text-white transition-colors">
                [SCOPE_{resp.num}]
              </small>

              <div className="my-8">
                <h3 className="text-[23px] sm:text-[25px] font-extrabold text-[#fafafa] mb-4 group-hover:text-white transition-colors">
                  {resp.title}
                </h3>
                <ul className="space-y-2 text-[#8e8e8e] text-[14px]">
                  {resp.items.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 bg-white/30 rounded-full inline-block group-hover:bg-white transition-colors" />
                      <span className="group-hover:text-[#e5e5e5] transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-[10px] uppercase font-mono tracking-widest text-[#555555] group-hover:text-accent-chrome transition-colors">
                SCOPE OF WORK
              </div>
            </article>
          ))}
        </div>

        {/* Stakeholder Map */}
        <div className="mt-16 sm:mt-24 pt-14 sm:pt-16 border-t border-white/10">
          <span className="block mb-4 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
            {t.collaboration}
          </span>

          <h3 className="mb-10 text-[clamp(28px,3.5vw,50px)] font-black text-[#fafafa] leading-tight">
            {t.collaborationTitle}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {stakeholders.map((sh, idx) => (
              <article
                key={idx}
                className="p-6 min-h-[160px] border border-white/10 rounded-xl bg-[#141414] hover:border-white/30 hover:bg-[#1a1a1a] transition-all duration-200"
              >
                <strong className="block mb-2.5 text-[15px] font-bold text-[#fafafa]">
                  {sh.role}
                </strong>
                <p className="text-[#8e8e8e] text-[12px] leading-relaxed">
                  {sh.copy}
                </p>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
`````

## File: src/components/Hero.jsx
`````javascript
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
      // Kinetic masked slide-up
      gsap.fromTo(
        '.hero-title-line',
        { y: '115%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 1.15,
          stagger: 0.14,
          ease: 'power3.out',
          delay: 0.1,
        }
      )

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
      className="relative w-[min(calc(100%-48px),1440px)] mx-auto min-h-[calc(100vh-72px)] pt-12 sm:pt-20 pb-12 flex flex-col justify-between overflow-visible"
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
          <span className="block mb-6 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
            {t.heroEyebrow}
          </span>

          <h1 className="text-[clamp(44px,9.5vw,144px)] font-black leading-[0.92] tracking-[-0.05em] text-[#fafafa] uppercase">
            <span className="block overflow-hidden pb-1">
              <span className="hero-title-line block transform translate-y-[115%] will-change-transform">
                {t.heroTitlePart1}
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="hero-title-line block transform translate-y-[115%] will-change-transform text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e5e5e5] to-[#888888]">
                {t.heroTitlePart2}
              </span>
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
`````

## File: src/components/JackOfAllTrades.jsx
`````javascript
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

      // 2. Atmospheric Dim to #070707
      if (sectionRef.current) {
        gsap.fromTo(
          sectionRef.current,
          { backgroundColor: '#0d0d0d' },
          {
            backgroundColor: '#070707',
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
      className="py-32 sm:py-40 bg-[#0d0d0d] border-t border-white/10 text-center relative overflow-hidden transition-colors duration-500"
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
        
        <span className="block mb-6 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
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
`````

## File: src/components/Navbar.jsx
`````javascript
import React, { useState } from 'react'

export default function Navbar({ lang, setLang, t }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '#work', label: t.navWork },
    { href: '#journey', label: t.navJourney },
    { href: '#experience', label: t.navExperience },
    { href: '#about', label: t.navAbout },
    { href: '#contact', label: t.navContact },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-[#0d0d0d]/80 backdrop-blur-xl border-b border-white/10 transition-colors duration-200">
      <div className="w-[min(calc(100%-48px),1440px)] mx-auto min-h-[72px] flex items-center justify-between gap-6">
        
        {/* Logo */}
        <a 
          href="#" 
          data-cursor="magnetic"
          className="font-extrabold text-[14px] tracking-[-0.02em] uppercase text-white hover:opacity-80 transition-opacity flex-shrink-0 flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span>ANTONIO RIYANTO</span>
        </a>

        {/* Desktop Nav Links & Controls */}
        <div className="flex items-center gap-6 lg:gap-8">
          
          <div className="hidden md:flex items-center gap-8 text-[13px] font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-cursor="magnetic"
                className="relative py-1 text-[#8e8e8e] hover:text-white transition-colors group"
              >
                {link.label}
                <span className="absolute left-0 right-full bottom-0 h-[1.5px] bg-white transition-all duration-300 ease-luxury group-hover:right-0" />
              </a>
            ))}
          </div>

          {/* Language Switch Capsule */}
          <div 
            className="flex items-center p-[3px] bg-white/[0.04] border border-white/10 rounded-full backdrop-blur-md shadow-sm"
            role="group"
            aria-label="Language selection"
          >
            <button
              type="button"
              data-cursor="magnetic"
              onClick={() => setLang('en')}
              className={`min-w-[36px] h-7 px-2.5 rounded-full text-[10px] font-mono font-extrabold tracking-[0.08em] transition-all duration-200 ${
                lang === 'en'
                  ? 'bg-white text-black shadow-md'
                  : 'text-[#8e8e8e] hover:text-white'
              }`}
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
            <button
              type="button"
              data-cursor="magnetic"
              onClick={() => setLang('id')}
              className={`min-w-[36px] h-7 px-2.5 rounded-full text-[10px] font-mono font-extrabold tracking-[0.08em] transition-all duration-200 ${
                lang === 'id'
                  ? 'bg-white text-black shadow-md'
                  : 'text-[#8e8e8e] hover:text-white'
              }`}
              aria-pressed={lang === 'id'}
            >
              ID
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 border border-white/20 rounded-full gap-1 p-2 bg-white/5"
            aria-label="Toggle navigation menu"
          >
            <span className={`w-4 h-[1.5px] bg-white transition-transform duration-200 ${mobileMenuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
            <span className={`w-4 h-[1.5px] bg-white transition-transform duration-200 ${mobileMenuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0d0d0d]/95 backdrop-blur-2xl px-6 py-4 flex flex-col gap-3 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 text-[14px] font-semibold text-[#fafafa] border-b border-white/10"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
`````

## File: src/components/SelectedWork.jsx
`````javascript
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SelectedWork({ t }) {
  const containerRef = useRef(null)
  const gridRef = useRef(null)

  const projects = [
    {
      title: 'Watch Club Retail Campaign',
      tags: 'Campaign · Retail · Print · Execution',
      placeholder: t.placeholderFeatured,
      size: 'large', // span 8
      poster: 'images/retail-execution-cover.webp',
      video: 'videos/retail-execution.mp4',
    },
    {
      title: 'Brand Identity Project',
      tags: 'Branding · Graphic Design',
      placeholder: t.placeholderBrand,
      size: 'medium', // span 4
      poster: 'images/creative-design-cover.webp',
      video: 'videos/creative-design.mp4',
    },
    {
      title: 'Digital Campaign',
      tags: 'Social · Content · Digital',
      placeholder: t.placeholderSocial,
      size: 'medium', // span 4
      poster: 'images/content-digital-cover.webp',
      video: 'videos/content-digital.mp4',
    },
    {
      title: 'Retail Experience',
      tags: 'POSM · Print · Production',
      placeholder: t.placeholderRetail,
      size: 'half', // span 6
      poster: 'images/vendor-production-cover.webp',
      video: 'videos/vendor-production.mp4',
    },
    {
      title: 'Digital Experience',
      tags: 'Web · UI/UX · Technology',
      placeholder: t.placeholderWeb,
      size: 'half', // span 6
      poster: 'images/web-technology-cover.webp',
      video: 'videos/web-technology.mp4',
    },
  ]

  const getColSpanClass = (size) => {
    switch (size) {
      case 'large':
        return 'col-span-12 lg:col-span-8 min-h-[440px] sm:min-h-[540px] lg:min-h-[600px]'
      case 'medium':
        return 'col-span-12 lg:col-span-4 min-h-[380px] sm:min-h-[440px]'
      case 'half':
        return 'col-span-12 lg:col-span-6 min-h-[400px] sm:min-h-[460px]'
      default:
        return 'col-span-12 min-h-[380px]'
    }
  }

  // Inertial Skew Entrance & Progressive Bottom-Up Elevation Reveal
  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    const ctx = gsap.context(() => {
      // 1. Progressive bottom-up elevation reveal
      gsap.fromTo(
        '.work-card-reveal',
        { y: 55, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // 2. Inertial velocity skew on grid
      if (gridRef.current && !isCoarse) {
        let proxy = { skew: 0 }
        let skewSetter = gsap.quickSetter(gridRef.current, 'skewY', 'deg')
        let clamp = gsap.utils.clamp(-1.5, 1.5)

        ScrollTrigger.create({
          trigger: gridRef.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            let skew = clamp(self.getVelocity() / -450)
            if (Math.abs(skew) > Math.abs(proxy.skew)) {
              proxy.skew = skew
              gsap.to(proxy, {
                skew: 0,
                duration: 0.75,
                ease: 'power3.out',
                overwrite: true,
                onUpdate: () => skewSetter(proxy.skew),
              })
            }
          },
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleMouseEnter = (proj) => {
    window.dispatchEvent(
      new CustomEvent('cursor-preview', {
        detail: {
          active: true,
          title: proj.title,
          category: proj.tags,
          image: proj.poster,
          video: proj.video,
        },
      })
    )
  }

  const handleMouseLeave = (e) => {
    window.dispatchEvent(
      new CustomEvent('cursor-preview', {
        detail: { active: false },
      })
    )
    const card = e.currentTarget
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)'
  }

  const handleMouseMove = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    // Subtle 3D tilt: max 6deg
    const rotX = -y * 6
    const rotY = x * 6
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`

    card.style.setProperty('--card-mouse-x', `${e.clientX - rect.left}px`)
    card.style.setProperty('--card-mouse-y', `${e.clientY - rect.top}px`)
  }

  return (
    <section ref={containerRef} className="py-24 sm:py-32 border-t border-white/10 bg-canvas relative" id="work">
      <div className="w-[min(calc(100%-48px),1440px)] mx-auto">
        
        {/* Header */}
        <div className="mb-14 sm:mb-16">
          <span className="block mb-5 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
            {t.workEyebrow}
          </span>

          <h2 className="max-w-[1050px] mb-8 text-[clamp(36px,6.5vw,92px)] font-black leading-[0.95] tracking-[-0.045em] text-[#fafafa]">
            {t.workTitle}
          </h2>
          <p className="max-w-[720px] text-[#8e8e8e] text-[17px] sm:text-[19px] leading-[1.6]">
            {t.workIntro}
          </p>
        </div>

        {/* 12-Column Responsive Work Grid with Inertial Skew */}
        <div ref={gridRef} className="grid grid-cols-12 gap-5 will-change-transform">
          {projects.map((proj, idx) => (
            <article
              key={idx}
              onMouseEnter={() => handleMouseEnter(proj)}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
              data-cursor="magnetic"
              data-preview-title={proj.title}
              data-preview-category={proj.tags}
              data-preview-image={proj.poster}
              data-preview-video={proj.video}
              style={{ transformStyle: 'preserve-3d' }}
              className={`work-card-reveal group relative p-6 sm:p-8 flex flex-col justify-between bg-[#141414]/80 border border-white/10 rounded-2xl backdrop-blur-xl transition-[border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white/30 hover:shadow-[0_25px_60px_rgba(0,0,0,0.7)] ${getColSpanClass(
                proj.size
              )}`}
            >
              {/* Card Specular Light Sheen */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                style={{
                  background:
                    'radial-gradient(400px circle at var(--card-mouse-x, -500px) var(--card-mouse-y, -500px), rgba(255,255,255,0.07), transparent 60%)',
                }}
              />

              {/* Media Preview Box (Hover Scale & Specular Light) */}
              <div className="flex-1 w-full grid place-items-center bg-gradient-to-br from-[#1c1c1c] via-[#141414] to-[#0d0d0d] border border-white/[0.06] rounded-xl mb-6 p-6 relative overflow-hidden group-hover:border-white/20 transition-all duration-300 z-10">
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
                
                {/* Scaled Inner Preview Container */}
                <div className="text-center relative z-10 transform group-hover:scale-[1.04] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/50 group-hover:border-white/60 group-hover:text-white transition-colors">
                    <span className="font-mono text-xs font-bold">0{idx + 1}</span>
                  </div>
                  <span className="text-white/90 text-[12px] font-bold tracking-[0.14em] uppercase block mb-1">
                    {proj.placeholder}
                  </span>
                  <span className="text-[11px] font-mono text-[#8e8e8e]">
                    [Project #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}]
                  </span>
                </div>
              </div>

              {/* Project Info Strip */}
              <div className="pt-5 border-t border-white/10 flex items-center justify-between gap-4 relative z-10">
                <div>
                  <strong className="block text-[19px] sm:text-[21px] font-bold text-[#fafafa] mb-1 group-hover:text-white transition-colors">
                    {proj.title}
                  </strong>
                  <span className="text-[#8e8e8e] text-[12px] sm:text-[13px]">
                    {proj.tags}
                  </span>
                </div>
                <div className="w-9 h-9 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-[14px] text-white/70 group-hover:text-black group-hover:bg-white group-hover:border-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200">
                  ↗
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
`````

## File: src/components/TechSection.jsx
`````javascript
import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import WatchClubSimulator from './WatchClubSimulator'
import { Smartphone, Sparkles, Cpu, ShieldCheck } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function TechSection({ t }) {
  const containerRef = useRef(null)
  const cardRef = useRef(null)
  const phoneFrameRef = useRef(null)
  const [terminalLog, setTerminalLog] = useState('> initializing_simulator... OK')

  // Live Terminal Log simulation
  useEffect(() => {
    const logs = [
      '> simulator_mode: ACTIVE [8 SELECTED STORES]',
      '> canvas_render_pipeline: 880x880 RETINA',
      '> audio_synthesis: WEB_AUDIO_API READY',
      '> state_management: DECOUPLED_IN_MEMORY',
      '> anti_tamper_token: VERIFIED [STANDALONE]',
    ]
    let logIdx = 0

    const interval = setInterval(() => {
      logIdx = (logIdx + 1) % logs.length
      setTerminalLog(logs[logIdx])
    }, 3800)

    return () => clearInterval(interval)
  }, [])

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

  const technicalHighlights = [
    {
      title: 'Decoupled In-Memory Engine',
      desc: 'Independent local state architecture operating 100% serverless for zero-latency portfolio inspection.',
    },
    {
      title: 'Procedural Slice Dispersion',
      desc: 'Real-time wheel angle computation aligning dynamic canvas sectors with the golden indicator needle.',
    },
    {
      title: 'Synthesized Haptic Audio',
      desc: 'Web Audio API micro-frequency synthesis generating physical mechanical clicks without audio assets.',
    },
    {
      title: 'Enterprise Multi-Store Quotas',
      desc: 'Individual inventory deductions per branch preventing over-claiming and ensuring fairness.',
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
    <section ref={containerRef} className="py-24 sm:py-32 bg-[#0d0d0d] border-t border-white/10 relative" id="technology">
      <div className="w-[min(calc(100%-48px),1440px)] mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 sm:mb-16">
          <span className="block mb-5 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
            {t.techEyebrow}
          </span>

          <h2
            className="max-w-[1050px] mb-8 text-[clamp(36px,6.5vw,92px)] font-black leading-[0.95] tracking-[-0.045em] text-[#fafafa]"
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
                {terminalLog}
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
                <div className="w-full h-full pt-7 pb-4 flex flex-col relative overflow-hidden">
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
              <span>Interactive Live Demo — Try entering data & spin the wheel</span>
            </div>
          </div>

          {/* Right Column: Copy & Architectural Breakdown */}
          <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between relative z-10">
            <div>
              <span className="inline-block mb-4 text-[#8e8e8e] text-[11px] font-mono font-bold tracking-[0.15em] uppercase">
                {t.internalSystem}
              </span>

              <h3 className="mb-5 text-[clamp(28px,3.8vw,52px)] font-black leading-tight text-[#fafafa]">
                Watch Club Lucky Spin
              </h3>

              <p className="text-[#8e8e8e] text-[15px] sm:text-[17px] leading-relaxed mb-8">
                {t.luckySpinCopy}
              </p>

              {/* Technical Feature Matrix */}
              <div className="space-y-4 mb-8">
                {technicalHighlights.map((feat, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition duration-200"
                  >
                    <h4 className="text-[13px] font-mono font-bold text-white mb-1 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                      {feat.title}
                    </h4>
                    <p className="text-[12px] text-[#8e8e8e] leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                ))}
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
`````

## File: src/components/WatchClubSimulator.jsx
`````javascript
import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  RotateCw,
  RotateCcw,
  Star,
  Store as StoreIcon,
  User,
  Phone,
  Lock,
  Unlock,
  CheckCircle2,
  Package,
  Edit3,
  ChevronDown,
  Gift,
  Check,
  ShieldCheck,
  Tag,
  Search,
  X,
  Sparkles,
} from 'lucide-react'
import confetti from 'canvas-confetti'

// 1. Eight representative Watch Club stores
export const STORES_LIST = [
  { id: 'APJ', name: 'Ambarukmo Plaza Jogja', city: 'Yogyakarta' },
  { id: 'KKJ', name: 'Kota Kasablanka Jakarta', city: 'Jakarta' },
  { id: 'SMB', name: 'Summarecon Mall Bandung', city: 'Bandung' },
  { id: 'PAR', name: 'Paragon Semarang', city: 'Semarang' },
  { id: 'PAN', name: 'Panakukang Makassar', city: 'Makassar' },
  { id: 'EWB', name: 'E-Walk Balikpapan', city: 'Balikpapan' },
  { id: 'AEO', name: 'AEON Sentul', city: 'Bogor' },
  { id: 'DUT', name: 'Duta Mall 1 Banjarmasin', city: 'Banjarmasin' },
]

// 2. Initial prizes catalogue
export const PRIZES_CATALOG = [
  { id: 'prz_jam', text: 'Jam Tangan Eksklusif', displayText: 'Jam Tangan Eksklusif', isGrandPrize: true, defaultStock: 2 },
  { id: 'prz_pouch', text: 'Pouch Serut Premium', displayText: 'Pouch Serut Premium', isGrandPrize: false, defaultStock: 5 },
  { id: 'prz_lap', text: 'Lap Microfiber Jam', displayText: 'Lap Jam Tangan', isGrandPrize: false, defaultStock: 4 },
  { id: 'prz_pulpen', text: 'Pulpen Eksklusif WC', displayText: 'Pulpen Eksklusif', isGrandPrize: false, defaultStock: 6 },
  { id: 'prz_sticker', text: 'Sticker Pack Watch Club', displayText: 'Sticker Pack WC', isGrandPrize: false, defaultStock: 8 },
  { id: 'prz_strap', text: 'Strap Rantai Stainless', displayText: 'Strap Rantai', isGrandPrize: false, defaultStock: 3 },
]

// Preset starting inventories per store
const INITIAL_STORE_STOCKS = {
  APJ: { prz_jam: 2, prz_pouch: 5, prz_lap: 4, prz_pulpen: 6, prz_sticker: 8, prz_strap: 3 },
  KKJ: { prz_jam: 1, prz_pouch: 6, prz_lap: 5, prz_pulpen: 7, prz_sticker: 10, prz_strap: 4 },
  SMB: { prz_jam: 2, prz_pouch: 4, prz_lap: 3, prz_pulpen: 5, prz_sticker: 6, prz_strap: 2 },
  PAR: { prz_jam: 1, prz_pouch: 5, prz_lap: 4, prz_pulpen: 4, prz_sticker: 7, prz_strap: 3 },
  PAN: { prz_jam: 2, prz_pouch: 3, prz_lap: 2, prz_pulpen: 5, prz_sticker: 5, prz_strap: 2 },
  EWB: { prz_jam: 1, prz_pouch: 4, prz_lap: 3, prz_pulpen: 6, prz_sticker: 8, prz_strap: 1 },
  AEO: { prz_jam: 2, prz_pouch: 7, prz_lap: 5, prz_pulpen: 8, prz_sticker: 9, prz_strap: 4 },
  DUT: { prz_jam: 1, prz_pouch: 3, prz_lap: 4, prz_pulpen: 4, prz_sticker: 6, prz_strap: 2 },
}

// Watch Club Logo SVG
function WatchClubLogo({ className = 'w-28' }) {
  return (
    <div className={`flex items-center select-none ${className}`}>
      <svg viewBox="0 0 793.3 106.2" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto text-white">
        <path
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M100.3,44.8c0.6-1.5,1.2-3.3,1.9-5.3c0.7-2.1,1.1-3.8,1.4-5c0.3-1.5,0.5-2.6,0.5-3.4c0.1-0.8,0-1.8-0.1-2.9 h16.3c-1.8,2.5-3.7,5.7-5.6,9.5c-1.5,3.1-2.9,6.1-4,9.1l-22.5,59.4H57.6l-0.5-59.4l-22.9,59.4h-31L2.5,47.8c0-5.9-0.2-10-0.6-12.2 c-0.2-1.7-0.9-4.2-1.9-7.4h34.9c-0.5,1.4-0.9,2.5-1.2,3.3c-0.3,0.9-0.5,1.8-0.7,2.8c-0.3,1.6-0.5,3.4-0.5,5.3c0,0.2,0,1.7,0.1,4.4 L33.3,78l19.2-49.8h34.1L87.1,78L100.3,44.8z M188.9,28.2h-54l-5.8,18.6c2.1-1.2,4-2.1,5.8-2.6c1.8-0.5,4-0.7,6.7-0.7h29.6 c2,0,3.2,0.4,3.8,1.1c0.6,0.7,0.7,2,0.3,3.9c-0.4,1.8-1,3.1-1.8,3.9c-0.8,0.7-2.2,1.1-4.2,1.1h-27c-6.5,0-11.4,1.9-14.7,5.7 c-3,3.4-5.3,9.4-7,17.9l-1.1,5.5c-1.6,8.4-1.5,14.4,0.2,18.1c1.8,3.7,5.9,5.5,12.3,5.5h21.1c4.1,0,7.1-0.6,8.9-1.7 c1.8-1.1,3.5-3.4,5.1-7l-0.2,8.7h29.6c-0.7-1.7-1-3.7-1.1-5.8c0-2.1,0.3-5.1,1-8.8l6.6-34.1c2.1-10.7,2-18.3-0.2-22.7 C200.6,30.4,196,28.2,188.9,28.2 M158,68.8h13.2l-2.1,11.1c-1,5-1.9,8.1-2.8,9.3c-0.9,1.2-2.8,1.8-5.6,1.8h-7 c-2.3,0-3.9-0.4-4.6-1.3c-0.8-0.9-0.9-2.6-0.4-5.3l1.7-8.9c0.5-2.8,1.3-4.6,2.3-5.4C153.8,69.2,155.6,68.8,158,68.8 M233.4,12.4 l29.9-1.1l-3.3,17h23.6l-2.9,15.3h-23.6l-7.9,41.1c-0.5,2.6-0.5,4.3,0,5.1c0.5,0.8,2.1,1.2,4.6,1.2h10.5c2.5,0,4.7-0.3,6.5-0.9 c1.8-0.6,3.4-1.3,4.7-2l-5.4,18.3h-37.2c-5.4,0-9.2-1.6-11.4-4.8c-2.8-3.9-3.3-10.5-1.5-19.5l7.4-38.4h-12.7l2.9-15.3h12.7 L233.4,12.4z M311,83l6.1-31.5c1-5.3,3.8-7.9,8.3-7.9h17c7,0,11.4,1.4,13.1,4.1l1.1-19.4h-46.1c-6.5,0-11.7,2.3-15.7,6.8 c-3.6,4.1-6.1,9.8-7.5,17.3l-5.7,29.7c-1.5,7.6-1.1,13.6,1,17.8c2.1,4.2,6.4,6.4,13,6.4h45.9l5.8-19c-2.3,1.2-4.5,2.2-6.6,2.8 c-2.1,0.6-5.4,0.9-9.7,0.9h-14.5C311.7,90.9,309.9,88.3,311,83 M400.3,0l-6.9,35.8c2.1-2.8,3.4-4.5,4-5.2c1.4-1.6,3-2.4,4.8-2.4 h23.1c6.8,0,11.3,2.5,13.5,7.4c2.3,4.9,2.5,11.9,0.8,21l-6.1,31.7c-0.9,4.9-1.4,8.7-1.3,11.4c0.1,1.5,0.4,3.6,1.1,6.5h-36.2 c2-3.2,3.4-6,4.3-8.5c0.9-2.5,1.7-5.6,2.4-9.4l7.4-38.4c0.4-2.3,0.4-4-0.1-5c-0.5-1-1.7-1.5-3.6-1.5h-10.8c-1.8,0-3.2,0.5-4.1,1.4 c-0.9,0.9-1.6,2.6-2,5.1l-7.4,38.4c-0.9,4.9-1.4,8.7-1.3,11.4c0.1,1.5,0.4,3.6,1.1,6.5H347c2-3.2,3.4-6,4.3-8.5 c0.9-2.5,1.7-5.6,2.4-9.4l13.6-70.5c0.9-4.9,1.4-8.7,1.3-11.4c-0.1-1.5-0.4-3.6-1.1-6.5H400.3z M520.3,83c-1,5.3,0.7,7.9,5.3,7.9 H540c4.4,0,7.6-0.3,9.7-0.9c2.1-0.6,4.3-1.5,6.6-2.8l-5.8,19h-45.9c-6.5,0-10.9-2.1-13-6.4c-2.1-4.2-2.4-10.2-1-17.8l5.7-29.7 c1.4-7.5,4-13.3,7.5-17.3c4-4.5,9.2-6.8,15.7-6.8h46.1l-1.1,19.4c-1.7-2.7-6.1-4.1-13.1-4.1h-17c-4.5,0-7.3,2.6-8.3,7.9L520.3,83z M578.4,17.9l-13.6,70.5c-0.7,3.8-1.5,6.9-2.4,9.4c-0.9,2.5-2.3,5.3-4.3,8.5h36.2c-0.7-2.8-1-5-1.1-6.5c-0.1-2.7,0.3-6.5,1.3-11.4 l17-88.3h-32.9c0.7,2.8,1.1,5,1.1,6.5C579.8,9.2,579.4,13,578.4,17.9 M659.6,106.2l0.6-8.1c-1.5,2.6-2.8,4.4-3.9,5.5 c-1.7,1.7-3.5,2.6-5.5,2.6h-24c-6.8,0-11.3-2.5-13.5-7.4c-2.2-4.9-2.4-11.9-0.7-21l6.1-31.7c0.9-4.9,1.4-8.7,1.3-11.4 c-0.1-1.5-0.4-3.6-1.1-6.5h32.9l-10.8,56.3c-0.5,2.5-0.5,4.2,0.1,5.1c0.5,0.9,1.7,1.4,3.5,1.4h10.8c1.9,0,3.3-0.5,4.2-1.4 c0.9-0.9,1.6-2.6,2-5.1l7.4-38.4c0.9-4.9,1.4-8.7,1.3-11.4c-0.1-1.5-0.4-3.6-1.1-6.5H702l-11.6,60.1c-0.9,4.9-1.4,8.7-1.3,11.4 c0.1,1.5,0.4,3.6,1.1,6.5H659.6z M700.1,106.2h29.6l3.5-8.3c0.6,3.2,1.2,5.4,1.8,6.5c0.7,1.2,1.8,1.8,3.3,1.8h25 c6.5,0,11.7-2.3,15.7-6.8c3.6-4.1,6.1-9.8,7.5-17.3l5.7-29.7c1.5-7.6,1.2-13.5-0.8-17.5c-2.2-4.4-6.6-6.6-13.1-6.6h-23.2 c-2.5,0-4.5,0.9-6.2,2.6c-0.9,1-2,2.6-3.2,5L752.7,0h-32.2c0.5,2,0.8,4,0.8,6s-0.4,4.9-1.1,8.6l-14.8,77.1c-0.7,3.7-1.5,6.6-2.4,8.8 C702.2,102.6,701.2,104.5,700.1,106.2 M736.3,85l6.9-35.6c0.8-3.9,2.5-5.9,5.3-5.9h11.8c2.7,0,3.7,2,3,5.9L756.4,85 c-0.8,3.9-2.5,5.9-5.2,5.9h-11.8C736.6,90.9,735.6,89,736.3,85"
        />
      </svg>
    </div>
  )
}

// SpinWheelFrame SVG with Curved Banner Title
function SpinWheelFrameHeader({ className = '' }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 246 127"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2 }}
      className={className}
    >
      <g transform="matrix(1,0,0,1,-517.706334,-81.396972)">
        <g>
          <g transform="matrix(1,0,0,1,240.526342,2.922974)">
            <path
              d="M467.417,86.202C466.547,87.038 466.104,88.166 466.106,89.283C466.104,90.346 466.505,91.422 467.301,92.248C468.341,93.33 469.742,93.88 471.132,93.878C472.454,93.88 473.79,93.382 474.818,92.393C476.187,91.076 476.881,89.307 476.88,87.547C476.881,85.874 476.253,84.186 475.001,82.886C474.18,82.033 473.268,81.355 472.273,80.893C471.28,80.429 470.206,80.187 469.106,80.188C467.051,80.188 464.961,81.013 462.925,82.548L462.927,82.547L443.261,97.324L443.259,97.325C439.52,100.14 436.023,101.407 432.875,101.406C431.178,101.405 429.566,101.043 428.016,100.322C426.466,99.602 424.977,98.516 423.568,97.053C421.72,95.131 420.806,92.668 420.805,90.197C420.806,87.597 421.817,85.014 423.837,83.07C425.192,81.766 426.925,81.124 428.667,81.122C430.5,81.124 432.318,81.835 433.689,83.259C434.589,84.195 435.031,85.388 435.032,86.591C435.031,87.857 434.541,89.109 433.558,90.056C432.932,90.658 432.138,90.952 431.333,90.953C430.486,90.951 429.653,90.626 429.02,89.969C428.513,89.442 427.675,89.426 427.148,89.933C426.621,90.44 426.605,91.278 427.112,91.805C428.258,92.997 429.801,93.603 431.333,93.601C432.79,93.602 434.262,93.055 435.394,91.964C436.912,90.504 437.682,88.543 437.68,86.591C437.681,84.735 436.986,82.865 435.597,81.423C433.713,79.464 431.185,78.473 428.667,78.474C426.272,78.473 423.862,79.369 422.001,81.162C419.446,83.619 418.155,86.912 418.157,90.197C418.155,93.32 419.322,96.46 421.66,98.889C423.261,100.552 425.014,101.846 426.898,102.723C428.781,103.601 430.796,104.055 432.875,104.054C436.75,104.053 440.795,102.497 444.852,99.44L444.851,99.441L464.517,84.664L464.518,84.663C466.237,83.37 467.778,82.835 469.106,82.836C469.824,82.837 470.496,82.987 471.156,83.293C471.815,83.6 472.464,84.069 473.093,84.722C473.856,85.516 474.23,86.526 474.232,87.547C474.23,88.621 473.816,89.681 472.982,90.485C472.461,90.985 471.802,91.229 471.132,91.23C470.427,91.229 469.736,90.959 469.209,90.412C468.902,90.093 468.755,89.694 468.754,89.283C468.755,88.852 468.918,88.433 469.253,88.11C469.78,87.603 469.796,86.764 469.289,86.238C468.782,85.711 467.944,85.695 467.417,86.202Z"
              fill="#f3c032"
            />
          </g>
          <g transform="matrix(1,0,0,1,240.526342,2.922974)">
            <path
              d="M330.74,88.11C331.075,88.433 331.238,88.851 331.24,89.283C331.238,89.694 331.091,90.093 330.785,90.412C330.258,90.959 329.566,91.229 328.861,91.23C328.191,91.229 327.532,90.985 327.011,90.485C326.177,89.681 325.763,88.621 325.762,87.547C325.763,86.526 326.137,85.516 326.9,84.722C327.529,84.069 328.178,83.6 328.837,83.293C329.498,82.987 330.169,82.837 330.887,82.836C332.215,82.835 333.756,83.37 335.475,84.663L335.476,84.664L355.142,99.441L355.141,99.44C359.198,102.497 363.243,104.053 367.118,104.054C369.197,104.055 371.212,103.601 373.095,102.723C374.98,101.846 376.732,100.552 378.333,98.889C380.671,96.46 381.838,93.32 381.837,90.197C381.838,86.912 380.547,83.619 377.993,81.162C376.131,79.369 373.721,78.473 371.326,78.474C368.808,78.473 366.281,79.464 364.396,81.423C363.007,82.865 362.312,84.735 362.313,86.591C362.312,88.543 363.081,90.504 364.599,91.964C365.732,93.055 367.203,93.602 368.66,93.601C370.192,93.603 371.735,92.997 372.882,91.805C373.389,91.278 373.372,90.44 372.846,89.933C372.319,89.426 371.481,89.442 370.974,89.969C370.34,90.626 369.507,90.951 368.66,90.953C367.855,90.952 367.061,90.658 366.435,90.056C365.452,89.109 364.963,87.857 364.961,86.591C364.963,85.388 365.405,84.195 366.304,83.259C367.675,81.835 369.493,81.124 371.326,81.122C373.069,81.124 374.801,81.766 376.157,83.07C378.176,85.014 379.187,87.597 379.189,90.197C379.187,92.668 378.274,95.131 376.425,97.053C375.017,98.516 373.527,99.602 371.978,100.322C370.427,101.043 368.815,101.405 367.118,101.406C363.97,101.407 360.473,100.14 356.734,97.325L356.733,97.324L337.067,82.547L337.068,82.548C335.032,81.013 332.942,80.188 330.887,80.188C329.787,80.187 328.713,80.429 327.72,80.893C326.725,81.355 325.813,82.033 324.992,82.886C323.74,84.186 323.112,85.874 323.114,87.547C323.112,89.307 323.806,91.076 325.175,92.393C326.203,93.382 327.539,93.88 328.861,93.878C330.252,93.88 331.652,93.33 332.693,92.248C333.488,91.422 333.889,90.346 333.888,89.283C333.889,88.166 333.446,87.038 332.577,86.202C332.05,85.695 331.211,85.711 330.704,86.238C330.197,86.764 330.214,87.603 330.74,88.11Z"
              fill="#f3c032"
            />
          </g>
          <g transform="matrix(1,0,0,1,240.526342,2.922974)">
            <path
              d="M521.283,139.822C520.786,139.555 515.87,136.419 504.959,112.255C499.923,101.102 492.35,95.908 481.125,95.908C475.073,95.908 468.355,97.325 461.243,98.827C453.069,100.55 443.806,102.505 434.222,102.505C405.585,102.505 402.247,81.637 402.12,80.757C401.969,79.646 401.069,78.825 400.007,78.82L399.999,78.82C398.941,78.82 398.039,79.642 397.88,80.749C397.752,81.637 394.415,102.505 365.778,102.505C356.195,102.505 346.931,100.55 338.757,98.827C331.645,97.326 324.927,95.908 318.875,95.908C307.65,95.908 300.076,101.102 295.04,112.254C284.128,136.418 279.213,139.555 278.716,139.822C277.816,140.102 277.18,140.98 277.18,141.996C277.18,143.01 277.816,143.889 278.716,144.169C279.213,144.435 284.126,147.571 295.04,171.737C300.076,182.89 307.65,188.084 318.875,188.084C324.927,188.084 331.645,186.667 338.757,185.166C346.93,183.441 356.194,181.486 365.778,181.486C394.375,181.486 397.743,202.296 397.879,203.239C398.033,204.348 398.932,205.167 399.992,205.172L400,205.172C401.059,205.172 401.959,204.35 402.119,203.243C402.247,202.355 405.585,181.486 434.222,181.486C443.805,181.486 453.069,183.441 461.243,185.166C468.355,186.666 475.073,188.084 481.125,188.084L481.126,188.084C492.349,188.084 499.923,182.889 504.959,171.737C515.87,147.575 520.786,144.436 521.283,144.169C522.184,143.889 522.82,143.01 522.82,141.996C522.82,140.98 522.182,140.102 521.283,139.822Z"
              fill="#f3c032"
            />
          </g>
          <g transform="matrix(1,0,0,1,240.526342,2.922974)">
            <path
              d="M365.778,174.705C383.449,174.705 392.953,182.033 397.814,188.18C398.642,189.228 399.367,190.274 400,191.297C400.633,190.274 401.357,189.228 402.186,188.18C407.047,182.033 416.551,174.705 434.222,174.705C444.444,174.705 454.041,176.73 462.508,178.517C469.299,179.95 475.711,181.303 481.125,181.303C489.919,181.303 495.139,177.688 499.141,168.825C504.977,155.901 509.978,146.932 514.089,141.996C509.978,137.06 504.977,128.09 499.141,115.166C495.139,106.304 489.919,102.689 481.125,102.689C475.711,102.689 469.299,104.042 462.509,105.475C454.042,107.261 444.445,109.286 434.222,109.286C416.551,109.286 407.047,101.959 402.186,95.812C401.357,94.764 400.633,93.718 400,92.695C399.367,93.718 398.642,94.764 397.814,95.812C392.953,101.959 383.449,109.286 365.778,109.286C355.555,109.286 345.959,107.261 337.491,105.475C330.701,104.042 324.288,102.689 318.875,102.689C310.08,102.689 304.861,106.304 300.859,115.166C295.022,128.09 290.021,137.06 285.909,141.996C290.021,146.932 295.022,155.901 300.858,168.825C304.861,177.688 310.08,181.303 318.875,181.303C324.288,181.303 330.701,179.95 337.491,178.517C345.957,176.73 355.555,174.705 365.778,174.705Z"
              fill="#e4383d"
            />
          </g>
        </g>
      </g>

      <defs>
        <path id="sim-luckydip-curve" d="M 25, 75 Q 123, 55 221, 75" fill="transparent" />
        <path id="sim-spinwheel-curve" d="M 60, 88 Q 123, 73 186, 88" fill="transparent" />
        <filter id="sim-text-shadow">
          <feDropShadow dx="1" dy="1" stdDeviation="0" floodColor="#991b1b" floodOpacity="1" />
        </filter>
      </defs>
      <text
        fill="#ffffff"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontWeight="900"
        fontSize="30"
        letterSpacing="-1"
        filter="url(#sim-text-shadow)"
      >
        <textPath href="#sim-luckydip-curve" startOffset="50%" textAnchor="middle">
          LUCKYDIP
        </textPath>
      </text>
      <text
        fill="#ffffff"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontWeight="900"
        fontSize="13"
        letterSpacing="1"
        filter="url(#sim-text-shadow)"
      >
        <textPath href="#sim-spinwheel-curve" startOffset="50%" textAnchor="middle">
          SPIN WHEEL
        </textPath>
      </text>
    </svg>
  )
}

export default function WatchClubSimulator() {
  // Store state
  const [selectedStoreId, setSelectedStoreId] = useState('APJ')
  const [storeStocks, setStoreStocks] = useState(INITIAL_STORE_STOCKS)
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false)
  const [storeSearch, setStoreSearch] = useState('')

  // Customer form inputs
  const [customerName, setCustomerName] = useState('Budi Santoso')
  const [customerPhone, setCustomerPhone] = useState('081234567890')
  const [isLocked, setIsLocked] = useState(false)

  // Wheel animation states
  const [isSpinning, setIsSpinning] = useState(false)
  const [spinResult, setSpinResult] = useState(null)
  const [isWinnerModalOpen, setIsWinnerModalOpen] = useState(false)

  // Canvas refs and animation physics
  const canvasRef = useRef(null)
  const angleRef = useRef(0)
  const animFrameRef = useRef(null)
  const audioContextRef = useRef(null)
  const lastSliceIndexRef = useRef(-1)
  const lastTickTimeRef = useRef(0)

  // Current store object & current stocks
  const currentStore = STORES_LIST.find((s) => s.id === selectedStoreId) || STORES_LIST[0]
  const currentStockMap = storeStocks[selectedStoreId] || INITIAL_STORE_STOCKS.APJ

  // Total available stock in selected store
  const totalAvailableStock = Object.values(currentStockMap).reduce((a, b) => a + b, 0)

  // Build active wheel slices based on available stock
  const slices = React.useMemo(() => {
    const raw = []
    PRIZES_CATALOG.forEach((prize) => {
      const stock = currentStockMap[prize.id] || 0
      for (let i = 0; i < stock; i++) {
        raw.push({
          id: `${prize.id}_${i}`,
          prizeId: prize.id,
          text: prize.text,
          displayText: prize.displayText,
          isGrandPrize: prize.isGrandPrize,
        })
      }
    })

    if (raw.length === 0) {
      return [
        {
          id: 'empty',
          prizeId: 'none',
          text: 'STOK KOSONG',
          displayText: 'STOK KOSONG',
          isGrandPrize: false,
        },
      ]
    }

    // Interleave dispersion so identical prizes are distributed around the rim
    const groups = {}
    raw.forEach((s) => {
      if (!groups[s.prizeId]) groups[s.prizeId] = []
      groups[s.prizeId].push(s)
    })
    const keys = Object.keys(groups)
    const interleaved = []
    let added = true
    let idx = 0
    while (added) {
      added = false
      for (const k of keys) {
        if (groups[k][idx]) {
          interleaved.push(groups[k][idx])
          added = true
        }
      }
      idx++
    }
    return interleaved
  }, [currentStockMap])

  // Realistic mechanical click synthesized with Web Audio API
  const playTickSound = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext
        if (AudioCtx) {
          audioContextRef.current = new AudioCtx()
        }
      }
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume()
      }
      if (!audioContextRef.current) return

      const ctx = audioContextRef.current
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(650, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.04)

      gain.gain.setValueAtTime(0.35, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.04)
    } catch {
      // Audio fallback silent
    }
  }, [])

  // Draw wheel on canvas
  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const radius = width / 2

    ctx.clearRect(0, 0, width, height)
    ctx.save()
    ctx.translate(radius, radius)
    ctx.rotate(angleRef.current)

    const totalSlices = slices.length
    const arc = (2 * Math.PI) / totalSlices
    const carnivalColors = ['#d82b2b', '#1e3a8a', '#f4b924']

    for (let i = 0; i < totalSlices; i++) {
      const slice = slices[i]

      // Slice sector
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.arc(0, 0, radius - 20, i * arc, (i + 1) * arc)
      ctx.fillStyle = carnivalColors[i % 3]
      ctx.fill()

      // Slice boundary stroke
      ctx.strokeStyle = '#f4b924'
      ctx.lineWidth = 2
      ctx.stroke()

      // Text inside slice
      ctx.save()
      ctx.rotate(i * arc + arc / 2)
      ctx.textAlign = 'right'
      ctx.textBaseline = 'middle'

      const isYellow = i % 3 === 2
      ctx.fillStyle = isYellow ? '#1e3a8a' : '#ffffff'

      let fontSize = 28
      if (totalSlices > 12) fontSize = 22
      if (totalSlices > 24) fontSize = 16
      if (totalSlices > 45) fontSize = 12

      ctx.font = `bold ${fontSize}px 'Plus Jakarta Sans', system-ui, sans-serif`

      if (!isYellow) {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.6)'
        ctx.shadowBlur = 4
      }

      let label = slice.displayText
      if (label.length > 20) {
        label = label.substring(0, 18) + '...'
      }
      ctx.fillText(label, radius - 45, 0)
      ctx.restore()
    }

    // Outer wheel border ring (Royal Blue with gold trim)
    ctx.beginPath()
    ctx.arc(0, 0, radius - 10, 0, 2 * Math.PI)
    ctx.strokeStyle = '#1e3a8a'
    ctx.lineWidth = 20
    ctx.stroke()

    // Outer gold trim
    ctx.beginPath()
    ctx.arc(0, 0, radius - 2, 0, 2 * Math.PI)
    ctx.strokeStyle = '#f4b924'
    ctx.lineWidth = 4
    ctx.stroke()

    // Inner gold trim
    ctx.beginPath()
    ctx.arc(0, 0, radius - 20, 0, 2 * Math.PI)
    ctx.strokeStyle = '#f4b924'
    ctx.lineWidth = 4
    ctx.stroke()

    // Draw 24 golden 5-point stars around the outer ring
    const numStars = 24
    for (let j = 0; j < numStars; j++) {
      const starAngle = (j * (Math.PI * 2)) / numStars
      ctx.save()
      ctx.rotate(starAngle)
      ctx.translate(radius - 10, 0)

      ctx.beginPath()
      for (let k = 0; k < 5; k++) {
        ctx.lineTo(
          Math.cos(((18 + k * 72) * Math.PI) / 180) * 4,
          -Math.sin(((18 + k * 72) * Math.PI) / 180) * 4
        )
        ctx.lineTo(
          Math.cos(((54 + k * 72) * Math.PI) / 180) * 2,
          -Math.sin(((54 + k * 72) * Math.PI) / 180) * 2
        )
      }
      ctx.closePath()
      ctx.fillStyle = '#f4b924'
      ctx.fill()
      ctx.restore()
    }

    ctx.restore()
  }, [slices])

  useEffect(() => {
    drawWheel()
  }, [drawWheel, slices])

  // Easing function
  const easeOutCubic = (t, b, c, d) => {
    t /= d
    t--
    return c * (t * t * t + 1) + b
  }

  // Handle spin execution
  const handleSpin = () => {
    if (!isLocked || isSpinning || slices.length === 0 || slices[0].prizeId === 'none') {
      return
    }

    setIsSpinning(true)

    // Weighted random selection based on current remaining stock
    const availableSlices = slices.filter((s) => s.prizeId !== 'none')
    const randIdx = Math.floor(Math.random() * availableSlices.length)
    const selectedSlice = availableSlices[randIdx]
    const winningIndex = slices.indexOf(selectedSlice)

    const totalSlices = slices.length
    const arc = (2 * Math.PI) / totalSlices
    const targetSliceCenter = winningIndex * arc + arc / 2
    const pointerAngle = 1.5 * Math.PI

    let targetWheelAngle = pointerAngle - targetSliceCenter
    while (targetWheelAngle < 0) targetWheelAngle += 2 * Math.PI

    const startAngle = angleRef.current
    const duration = 5200 // 5.2 seconds
    const startTime = Date.now()
    const extraSpins = Math.PI * 2 * 4 // 4 full rotations
    const targetNormalized = targetWheelAngle % (Math.PI * 2)

    let currentNormalized = startAngle % (Math.PI * 2)
    if (currentNormalized < 0) currentNormalized += Math.PI * 2

    let angleToTravel = targetNormalized - currentNormalized
    if (angleToTravel <= 0) angleToTravel += Math.PI * 2

    const finalTargetAngle = startAngle + extraSpins + angleToTravel

    const animate = () => {
      const now = Date.now()
      const progress = now - startTime

      if (progress < duration) {
        const newAngle = easeOutCubic(progress, startAngle, finalTargetAngle - startAngle, duration)
        angleRef.current = newAngle

        // Tick audio synchronization
        let normalized = newAngle % (2 * Math.PI)
        if (normalized < 0) normalized += 2 * Math.PI
        const currentSlice = Math.floor(((pointerAngle - normalized + 2 * Math.PI) % (2 * Math.PI)) / arc)

        if (currentSlice !== lastSliceIndexRef.current && now - lastTickTimeRef.current > 35) {
          playTickSound()
          lastSliceIndexRef.current = currentSlice
          lastTickTimeRef.current = now
        }

        drawWheel()
        animFrameRef.current = requestAnimationFrame(animate)
      } else {
        angleRef.current = finalTargetAngle % (Math.PI * 2)
        drawWheel()
        setIsSpinning(false)

        // Decrement local inventory
        setStoreStocks((prev) => {
          const storeStock = { ...(prev[selectedStoreId] || INITIAL_STORE_STOCKS[selectedStoreId]) }
          if (storeStock[selectedSlice.prizeId] > 0) {
            storeStock[selectedSlice.prizeId] -= 1
          }
          return {
            ...prev,
            [selectedStoreId]: storeStock,
          }
        })

        // Generate synthetic SKU
        const randomNum = Math.floor(1000 + Math.random() * 9000)
        const assignedSku = `WC-${selectedStoreId}-${randomNum}`

        // Trigger celebratory confetti
        confetti({
          particleCount: 75,
          spread: 80,
          origin: { y: 0.55 },
          colors: ['#f4b924', '#d82b2b', '#1e3a8a', '#10b981', '#ffffff'],
        })

        // Set result & display modal
        setSpinResult({
          prize: {
            id: selectedSlice.prizeId,
            name: selectedSlice.text,
            displayText: selectedSlice.displayText,
            assignedSku,
          },
          customer: {
            name: customerName,
            phone: customerPhone,
            store: currentStore.name,
          },
        })
        setIsWinnerModalOpen(true)
      }
    }

    animFrameRef.current = requestAnimationFrame(animate)
  }

  // Fast reset feature to restore full stock and try again
  const handleResetDemo = () => {
    setStoreStocks(INITIAL_STORE_STOCKS)
    setIsLocked(false)
    setIsSpinning(false)
    setIsWinnerModalOpen(false)
    setSpinResult(null)
    setCustomerName('Aditya Pratama')
    setCustomerPhone('081298765432')
  }

  // Filtered stores for modal
  const filteredStores = STORES_LIST.filter(
    (s) =>
      s.name.toLowerCase().includes(storeSearch.toLowerCase()) ||
      s.city.toLowerCase().includes(storeSearch.toLowerCase()) ||
      s.id.toLowerCase().includes(storeSearch.toLowerCase())
  )

  return (
    <div className="relative w-full h-full bg-[#0c3875] carnival-bg text-white flex flex-col justify-between overflow-y-auto overflow-x-hidden p-3 sm:p-4 select-none">
      
      {/* 1. App Topbar */}
      <div className="flex items-center justify-between pb-2.5 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <WatchClubLogo className="w-20 sm:w-24" />
          <span className="text-[9px] font-mono font-bold bg-[#f4b924] text-red-900 px-1.5 py-0.5 rounded shadow-sm">
            SIMULATOR
          </span>
        </div>

        {/* Quick Reset Button */}
        <button
          type="button"
          onClick={handleResetDemo}
          title="Reset Stok & Form"
          className="flex items-center gap-1 text-[10px] font-mono font-bold bg-white/10 hover:bg-white/20 text-white/90 px-2 py-1 rounded-md transition border border-white/20 active:scale-95"
        >
          <RotateCcw className="w-3 h-3 text-[#f4b924]" />
          <span>Reset</span>
        </button>
      </div>

      {/* 2. Store Active Badge Pill */}
      <div className="mt-2.5 flex items-center justify-between bg-black/30 backdrop-blur-md rounded-xl px-2.5 py-1.5 border border-white/15">
        <div className="flex items-center gap-1.5 truncate">
          <StoreIcon className="w-3.5 h-3.5 text-[#f4b924] shrink-0" />
          <span className="text-[11px] font-bold text-white truncate max-w-[170px] sm:max-w-[210px]">
            {currentStore.name}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsStoreModalOpen(true)}
          disabled={isLocked || isSpinning}
          className="text-[10px] font-mono font-bold text-[#f4b924] hover:text-yellow-300 underline underline-offset-2 shrink-0 disabled:opacity-40"
        >
          Ganti
        </button>
      </div>

      {/* 3. Curved Lucky Dip Header SVG */}
      <div className="mt-2 mb-1 w-full max-w-[220px] sm:max-w-[240px] mx-auto drop-shadow-lg">
        <SpinWheelFrameHeader className="w-full h-auto" />
      </div>

      {/* 4. Canvas Spin Wheel Area */}
      <div className="relative w-full max-w-[270px] sm:max-w-[290px] mx-auto flex items-center justify-center my-2">
        <canvas
          ref={canvasRef}
          width={880}
          height={880}
          className="rounded-full z-10 w-full h-auto aspect-square block mx-auto touch-none shadow-[0_12px_40px_rgba(0,0,0,0.85)] border-4 border-[#f4b924]"
        />

        {/* Pointer Arrow Top */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
          <div className="bg-[#f4b924] w-8 h-8 rounded-full border-2 border-[#d82b2b] flex items-center justify-center shadow-lg -translate-y-1">
            <Star className="w-4 h-4 text-[#d82b2b] fill-[#d82b2b]" />
          </div>
          <svg width="32" height="22" viewBox="0 0 24 20" fill="none" className="w-6 h-4 mx-auto -mt-2">
            <path d="M12 20L24 0H0L12 20Z" fill="#f4b924" />
          </svg>
        </div>

        {/* Center Hub with Spin Button */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-[#f4b924] rounded-full z-20 border-[4px] border-[#d82b2b] flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.9)]">
          <button
            type="button"
            onClick={handleSpin}
            disabled={!isLocked || isSpinning || totalAvailableStock === 0}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-[#fefce8] to-[#f4b924] hover:from-white hover:to-[#fcd34d] flex items-center justify-center cursor-pointer shadow-[inset_0_2px_6px_rgba(255,255,255,0.7)] transform active:scale-95 disabled:cursor-not-allowed transition border border-white/50"
          >
            {isSpinning ? (
              <RotateCw className="w-5 h-5 animate-spin text-[#d82b2b]" />
            ) : (
              <Star className="w-5 h-5 text-[#d82b2b] fill-[#d82b2b]" />
            )}
          </button>
        </div>
      </div>

      {/* 5. Customer Input Form (Carnival Ticket Style) */}
      <div className="bg-[#fdf6e3] rounded-2xl p-4 shadow-xl relative border-[3px] border-[#d82b2b] carnival-ticket mt-4 mb-2 text-[#1e3a8a]">
        
        {/* Floating Ticket Badge */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-[#d82b2b] px-3.5 py-1 rounded-full border-2 border-[#f4b924] shadow-md flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#f4b924]" />
            <span className="text-white font-black text-[10px] tracking-wide uppercase whitespace-nowrap">
              Buy Once, Win Twice
            </span>
          </div>
        </div>

        {/* Inner dotted outline */}
        <div className="absolute inset-1.5 border-2 border-dotted border-[#f4b924] rounded-xl opacity-60 pointer-events-none" />

        <div className="relative z-10 pt-1 space-y-2.5">
          {/* Customer Name */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-[#1e3a8a]/80 mb-1">
              Nama Customer
            </label>
            <div className="relative">
              <User className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#1e3a8a]/50" />
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                disabled={isLocked}
                placeholder="Contoh: Budi Santoso"
                className="w-full bg-[#fefce8] border border-[#f4b924] rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-[#1e3a8a] font-bold focus:outline-none focus:border-[#1e3a8a] disabled:opacity-60"
              />
            </div>
          </div>

          {/* Customer WhatsApp */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-[#1e3a8a]/80 mb-1">
              Nomor WhatsApp
            </label>
            <div className="relative">
              <Phone className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#1e3a8a]/50" />
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                disabled={isLocked}
                placeholder="081234567890"
                className="w-full bg-[#fefce8] border border-[#f4b924] rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-[#1e3a8a] font-bold focus:outline-none focus:border-[#1e3a8a] disabled:opacity-60"
              />
            </div>
          </div>

          {/* Lock / Spin Trigger */}
          {!isLocked ? (
            <button
              type="button"
              onClick={() => {
                if (customerName.trim() && customerPhone.trim()) {
                  setIsLocked(true)
                }
              }}
              disabled={!customerName.trim() || !customerPhone.trim() || totalAvailableStock === 0}
              className="w-full mt-1 py-2.5 bg-[#f4b924] hover:bg-[#eab308] text-red-900 font-black text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5 transform active:scale-95 disabled:opacity-40"
            >
              <Lock className="w-3.5 h-3.5 fill-current" />
              <span>KUNCI DATA & PUTAR</span>
            </button>
          ) : (
            <div className="space-y-1.5 mt-1">
              <button
                type="button"
                onClick={handleSpin}
                disabled={isSpinning || totalAvailableStock === 0}
                className="w-full py-2.5 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-black text-xs rounded-xl shadow-[0_3px_12px_rgba(220,38,38,0.5)] border-2 border-[#f4b924] transition flex items-center justify-center gap-1.5 transform active:scale-95 disabled:opacity-50"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isSpinning ? 'animate-spin' : ''}`} />
                <span>{isSpinning ? 'SEDANG MEMUTAR...' : 'PUTAR RODA SEKARANG'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsLocked(false)}
                disabled={isSpinning}
                className="w-full py-1 text-[10px] font-bold text-red-700 hover:text-red-900 flex items-center justify-center gap-1"
              >
                <Unlock className="w-3 h-3" />
                <span>Batal & Edit Data</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 6. Live Store Stock Summary Quota */}
      <div className="bg-black/35 rounded-xl p-2.5 border border-white/10 mt-1">
        <div className="flex items-center justify-between text-[10px] font-mono text-white/70 mb-1.5">
          <span className="flex items-center gap-1 font-bold text-[#f4b924]">
            <Package className="w-3 h-3" /> Stok Hadiah Aktif:
          </span>
          <span className="font-bold text-white">{totalAvailableStock} items</span>
        </div>
        <div className="grid grid-cols-3 gap-1 text-[9px] font-mono">
          {PRIZES_CATALOG.map((p) => {
            const stock = currentStockMap[p.id] || 0
            return (
              <div
                key={p.id}
                className={`p-1 rounded text-center border ${
                  stock > 0
                    ? 'bg-white/5 border-white/10 text-white/80'
                    : 'bg-red-950/40 border-red-800/40 text-red-400'
                }`}
              >
                <div className="truncate font-semibold">{p.displayText}</div>
                <div className="font-black text-[10px] text-[#f4b924]">{stock}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 7. Store Selection Modal Pop-Up (Rendered inside the phone viewport) */}
      {isStoreModalOpen && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col p-3 animate-fadeIn">
          <div className="bg-[#fdf6e3] rounded-2xl flex flex-col max-h-full border-2 border-[#d82b2b] shadow-2xl overflow-hidden text-[#1e3a8a]">
            {/* Modal Header */}
            <div className="p-3 bg-[#d82b2b] flex items-center justify-between text-white">
              <h4 className="font-extrabold text-xs flex items-center gap-1.5">
                <StoreIcon className="w-4 h-4 text-[#f4b924]" />
                Pilih Cabang Toko
              </h4>
              <button
                type="button"
                onClick={() => setIsStoreModalOpen(false)}
                className="p-1 hover:bg-black/20 rounded-md transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-2 border-b border-[#d82b2b]/20 bg-[#fefce8]">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={storeSearch}
                  onChange={(e) => setStoreSearch(e.target.value)}
                  placeholder="Cari toko atau kota..."
                  className="w-full bg-white border border-slate-300 rounded-lg pl-7 pr-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-[#d82b2b]"
                />
              </div>
            </div>

            {/* Store List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1.5 max-h-[300px]">
              {filteredStores.map((st) => {
                const isSelected = st.id === selectedStoreId
                const stStock = storeStocks[st.id] || INITIAL_STORE_STOCKS[st.id]
                const totalSt = Object.values(stStock).reduce((a, b) => a + b, 0)
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => {
                      setSelectedStoreId(st.id)
                      setIsStoreModalOpen(false)
                    }}
                    className={`w-full text-left p-2 rounded-xl border transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#d82b2b] text-white border-[#d82b2b]'
                        : 'bg-[#fefce8] hover:bg-yellow-50 text-[#1e3a8a] border-[#f4b924]/60'
                    }`}
                  >
                    <div>
                      <div className="font-black text-xs">{st.name}</div>
                      <div className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                        {st.city} ({st.id})
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-[#1e3a8a] text-[#f4b924]'
                        }`}
                      >
                        {totalSt} item
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* 8. Winner Modal Pop-Up (Rendered inside the phone viewport) */}
      {isWinnerModalOpen && spinResult && (
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-3 animate-fadeIn">
          <div className="w-full bg-white rounded-3xl p-4 sm:p-5 text-center border-[4px] border-[#d82b2b] shadow-2xl text-[#1e3a8a] relative overflow-hidden">
            <div className="w-14 h-14 rounded-full bg-[#d82b2b] border-2 border-[#f4b924] mx-auto flex items-center justify-center shadow-lg mb-3 animate-bounce">
              <Gift className="w-7 h-7 text-[#f4b924]" />
            </div>

            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1e3a8a] text-white text-[9px] font-black uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3 h-3" /> Pemenang Terverifikasi
            </div>

            <h4 className="text-[11px] font-black uppercase text-slate-600">
              Selamat! Anda Mendapatkan:
            </h4>

            <p
              className="text-lg sm:text-xl font-black text-[#d82b2b] my-2 leading-tight"
              style={{
                textShadow: '1px 1px 0px #f4b924, -1px -1px 0 #f4b924, 1px -1px 0 #f4b924, -1px 1px 0 #f4b924',
              }}
            >
              {spinResult.prize.name}
            </p>

            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#1e3a8a] text-white font-mono text-[10px] font-bold mb-3">
              <Tag className="w-3 h-3 text-[#f4b924]" />
              <span>SKU: {spinResult.prize.assignedSku}</span>
            </div>

            {/* Customer Details Box */}
            <div className="bg-[#fffbeb] rounded-xl p-2.5 mb-3 border border-[#fde68a] text-left text-[10px] space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Customer:</span>
                <span className="font-bold text-[#1e3a8a]">{spinResult.customer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">WhatsApp:</span>
                <span className="font-mono font-bold text-slate-700">{spinResult.customer.phone}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-amber-200">
                <span className="text-slate-500">Toko:</span>
                <span className="font-black text-[#d82b2b] truncate max-w-[130px]">
                  {spinResult.customer.store}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <button
              type="button"
              onClick={() => {
                setIsWinnerModalOpen(false)
                setIsLocked(false)
              }}
              className="w-full py-2.5 bg-[#1e3a8a] hover:bg-[#172554] text-white font-black text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5 uppercase tracking-wide cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Klaim & Main Lagi</span>
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
`````

## File: src/data/translations.js
`````javascript
export const translations = {
  en: {
    // Navigation
    navWork: "Work",
    navJourney: "Journey",
    navExperience: "Experience",
    navAbout: "About",
    navContact: "Contact",

    // Hero
    heroEyebrow: "Creative × Digital × Retail × Technology",
    heroTitlePart1: "CREATIVE",
    heroTitlePart2: "ALL-ROUNDER.",
    heroCopy: "I connect creative thinking, digital solutions and real-world execution — taking ideas from concept to something people can actually use.",
    exploreWork: "Explore My Work ↓",
    downloadCV: "Download CV",

    // Metrics
    metricStores: "Retail Stores Supported",
    metricExecution: "Idea → Execution",
    metricClients: "Client Brands — Agency Experience",
    metricMulti: "Creative · Digital · Ops · Tech",

    // 01 / What I Actually Do (Capabilities)
    whatEyebrow: "01 / What I Actually Do",
    whatTitle: "More Than Making<br />Things Look Good.",
    whatIntro: "From visual communication to real-world execution — each discipline represents work I actually handle, build and deliver.",
    catCreative: "Creative",
    catDigital: "Digital",
    catRetail: "Retail",
    catProduction: "Production",
    catTechnology: "Technology",
    catOwnership: "Ownership",
    creativeTitle: "Creative<br />Design.",
    creativeCopy: "Campaigns, graphic design, POSM, print, brand adaptation and visual communication.",
    contentTitle: "Content &<br />Digital.",
    contentCopy: "Social content, digital assets, motion, video and multi-platform creative execution.",
    retailTitle: "Retail<br />Execution.",
    retailCopy: "Translating Head Office requirements into real implementation across 40+ retail locations.",
    vendorTitle: "Vendor &<br />Production.",
    vendorCopy: "Working with print vendors, web vendors and suppliers from production preparation through final implementation.",
    webTitle: "Web &<br />Technology.",
    webCopy: "Web design, UI/UX, internal applications, AI-assisted development and troubleshooting for real operational needs.",
    ownershipTitle: "Project<br />Ownership.",
    ownershipCopy: "From brief and stakeholder coordination to execution, follow-up, problem solving and management reporting.",
    selectedWork: "SELECTED WORK",
    digitalWork: "DIGITAL WORK",
    storesLabel: "40+ STORES",
    nationwide: "Nationwide Execution",
    fileReality: "FROM FILE TO REALITY",
    digitalSolutions: "DIGITAL SOLUTIONS",
    endToEnd: "END-TO-END",
    viewWork: "View Work ↗",
    explore: "Explore ↗",
    viewSystems: "View Systems ↗",
    viewCase: "View Case Study ↗",

    // 02 / Selected Work
    workEyebrow: "02 / Selected Work",
    workTitle: "Work Across Different Disciplines.",
    workIntro: "A selection of work across campaign, branding, retail, print, digital and web.",
    placeholderFeatured: "FEATURED PROJECT IMAGE",
    placeholderBrand: "BRANDING PROJECT",
    placeholderSocial: "SOCIAL PROJECT",
    placeholderRetail: "PRINT / RETAIL PROJECT",
    placeholderWeb: "WEB PROJECT",

    // 03 / Career Journey
    journeyEyebrow: "03 / Career Journey",
    journeyTitle: "From Designer to<br />Creative All-Rounder.",
    journeyIntro: "Every role added a new layer to how I work — from visual execution and agency experience to client communication, digital, retail operations, technology and end-to-end project ownership.",
    liberatesEvolution: "Learning & Execution",
    liberatesCopy: "Built my foundation in visual execution while working on social media content, copywriting and day-to-day creative needs.",
    mindoEvolution: "Agency & Client Work",
    mindoCopy: "Expanded from individual design execution into a fast-paced agency environment, adapting creative work across more than 20 client brands.",
    rataEvolution: "Client & Brand Thinking",
    rataCopy: "Started working closer to clients and their business objectives, connecting creative decisions with branding, marketing and communication needs.",
    petmuEvolution: "Digital Expansion",
    petmuCopy: "Expanded beyond static design into content, social media, motion, video and web — including designing and developing web experiences with HTML and CSS.",
    watchEvolution: "End-to-End Creative Operations",
    watchCopy: "My role evolved beyond creative execution into connecting design, production, vendors, digital solutions, retail operations and management across 40+ stores.",
    now: "NOW",

    // 04 / Featured Experience (Watch Club)
    experienceEyebrow: "04 / Featured Experience",
    experienceIntro: "Beyond design — connecting creative execution, production, vendors, Head Office, management and retail implementation across a nationwide store network.",
    retailLocations: "Retail Locations Supported",
    flowCreative: "Creative",
    flowCreativeCopy: "Brief → Concept → Design → Artwork",
    flowProduction: "Production",
    flowProductionCopy: "Specs → Material → Preparation",
    flowVendor: "Vendor",
    flowVendorCopy: "Briefing → Revision → Production",
    flowStores: "40+ Stores",
    flowStoresCopy: "Distribution → Instruction → Execution",
    flowMonitoring: "Monitoring",
    flowMonitoringCopy: "Follow-up → Issues → Completion",
    flowManagement: "Management",
    flowManagementCopy: "Progress → Result → Reporting",
    respCreative: "Creative & Design",
    respRetail: "Retail Operations",
    respVendor: "Vendor & Production",
    respDigital: "Digital & Technology",
    respOwnership: "Project Ownership",
    respManagement: "Management",
    collaboration: "Cross-Functional Collaboration",
    collaborationTitle: "Working Across Different Levels.",
    gmCopy: "Requirements, progress, issues and result reporting.",
    amCopy: "Retail requirements and operational coordination.",
    storeCopy: "Campaign execution, distribution and implementation.",
    vendorStakeholderCopy: "Briefing, revision, execution and delivery.",
    supplierCopy: "Supporting materials and external project coordination.",

    // 05 / Case Studies
    caseEyebrow: "05 / Case Studies",
    caseTitle: "Not Just What I Made.<br />How I Solved It.",
    caseIntro: "Selected projects where the process, coordination and problem solving matter as much as the final visual.",
    caseRetail: "Retail Campaign Rollout",
    casePrint: "Print & Vendor Execution",
    caseWorkflow: "Digital Workflow Improvement",

    // 06 / Creative Archive
    archiveEyebrow: "06 / Creative Archive",
    archiveTitle: "The Other Things I Make.",
    archiveIntro: "Selected work and explorations from agency, freelance, corporate and personal projects.",
    all: "All",

    // 07 / Web & Technology
    techEyebrow: "07 / Web & Technology",
    techTitle: "I Don't Only Design.<br />I Build Solutions.",
    techIntro: "When an operational problem needs more than a visual solution, I explore digital tools, UI/UX and AI-assisted development.",
    appScreenshot: "APPLICATION / UI SCREENSHOT",
    internalSystem: "Internal Retail System",
    luckySpinCopy: "A digital solution designed around real retail operations and multi-store usage.",

    // 08 / Capability Map
    mapEyebrow: "08 / Capability Map",
    mapTitle: "What I Can Handle.",
    operations: "Operations",
    problemSolving: "Problem Solving",

    // 09 / About
    aboutEyebrow: "09 / About",
    aboutStatement: "I work between creative thinking, execution and problem solving — wherever the project needs me.",
    background: "BACKGROUND",
    backgroundCopy: "Visual Communication Design — Bachelor's Degree",
    education: "EDUCATION",
    educationPlace: "STSRD VISI INDONESIA, Yogyakarta",
    experienceLabel: "EXPERIENCE",
    aboutExperience: "Agency, freelance, digital, corporate retail and technology-driven creative projects.",
    creativeTools: "CREATIVE TOOLS",
    creativeToolsCopy: "Adobe Photoshop, Illustrator, InDesign, Premiere Pro and After Effects.",
    digitalSkills: "Web design, HTML/CSS, UI/UX, AI-assisted development and digital prototyping.",

    // Personality / Jack of All Trades
    oneMoreThing: "One More Thing",
    jackTitle: "Jack of All Trades.",
    jackCopy1: "Design when it needs designing.<br />Coordinate when it needs coordinating.<br />Build when a tool doesn't exist.<br />Solve when something breaks.",
    jackHighlight: "Creative All-Rounder by profession.<br />Jack of All Trades by nature.",

    // Contact & Footer
    contactEyebrow: "Let's Work Together",
    contactTitle: "Have a problem that needs a creative solution?",
    emailMe: "Email Me",
    whatsApp: "WhatsApp",
    linkedIn: "LinkedIn",
    footerCopyright: "© Antonio Riyanto",
    footerRole: "Creative All-Rounder · Jakarta, Indonesia"
  },

  id: {
    // Navigation
    navWork: "Karya",
    navJourney: "Perjalanan",
    navExperience: "Pengalaman",
    navAbout: "Tentang",
    navContact: "Kontak",

    // Hero
    heroEyebrow: "Creative × Digital × Retail × Technology",
    heroTitlePart1: "CREATIVE",
    heroTitlePart2: "ALL-ROUNDER.",
    heroCopy: "Saya menghubungkan ide kreatif, solusi digital, dan eksekusi di lapangan — membawa sebuah ide dari konsep hingga menjadi sesuatu yang benar-benar bisa digunakan.",
    exploreWork: "Lihat Karya Saya ↓",
    downloadCV: "Download CV",

    // Metrics
    metricStores: "Toko Retail yang Didukung",
    metricExecution: "Ide → Eksekusi",
    metricClients: "Brand Client — Pengalaman Agency",
    metricMulti: "Creative · Digital · Ops · Tech",

    // 01 / What I Actually Do (Capabilities)
    whatEyebrow: "01 / Yang Saya Kerjakan",
    whatTitle: "Lebih dari Sekadar<br />Membuat Visual yang Bagus.",
    whatIntro: "Dari komunikasi visual hingga eksekusi di lapangan — setiap bidang di bawah ini merupakan bagian dari pekerjaan yang benar-benar saya tangani, kembangkan, dan selesaikan.",
    catCreative: "Creative",
    catDigital: "Digital",
    catRetail: "Retail",
    catProduction: "Production",
    catTechnology: "Technology",
    catOwnership: "Ownership",
    creativeTitle: "Creative<br />Design.",
    creativeCopy: "Menangani campaign, desain grafis, POSM, kebutuhan print, adaptasi brand, hingga berbagai kebutuhan komunikasi visual.",
    contentTitle: "Content &<br />Digital.",
    contentCopy: "Mengembangkan konten social media, aset digital, motion, video, dan kebutuhan kreatif untuk berbagai platform.",
    retailTitle: "Retail<br />Execution.",
    retailCopy: "Menerjemahkan kebutuhan dari Head Office menjadi eksekusi nyata yang dapat diterapkan secara konsisten di 40+ toko retail.",
    vendorTitle: "Vendor &<br />Production.",
    vendorCopy: "Berkoordinasi dengan vendor print, web, dan supplier mulai dari persiapan produksi, revisi, hingga implementasi dan hasil akhir.",
    webTitle: "Web &<br />Technology.",
    webCopy: "Merancang web, UI/UX, dan aplikasi internal serta memanfaatkan AI-assisted development untuk membantu menyelesaikan kebutuhan operasional.",
    ownershipTitle: "Project<br />Ownership.",
    ownershipCopy: "Menangani project dari brief, perencanaan, koordinasi stakeholder, eksekusi, problem solving, follow-up, hingga reporting ke management.",
    selectedWork: "KARYA PILIHAN",
    digitalWork: "KARYA DIGITAL",
    storesLabel: "40+ TOKO",
    nationwide: "Eksekusi Multi-Cabang",
    fileReality: "DARI FILE KE HASIL NYATA",
    digitalSolutions: "SOLUSI DIGITAL",
    endToEnd: "END-TO-END",
    viewWork: "Lihat Karya ↗",
    explore: "Lihat Detail ↗",
    viewSystems: "Lihat Sistem ↗",
    viewCase: "Lihat Case Study ↗",

    // 02 / Selected Work
    workEyebrow: "02 / Karya Pilihan",
    workTitle: "Berbagai Karya dari Beragam Disiplin.",
    workIntro: "Pilihan karya dari berbagai bidang — mulai dari campaign, branding, retail, print, digital hingga web.",
    placeholderFeatured: "GAMBAR FEATURED PROJECT",
    placeholderBrand: "PROJECT BRANDING",
    placeholderSocial: "PROJECT SOCIAL MEDIA",
    placeholderRetail: "PROJECT PRINT / RETAIL",
    placeholderWeb: "PROJECT WEB",

    // 03 / Career Journey
    journeyEyebrow: "03 / Perjalanan Karier",
    journeyTitle: "From Designer to<br />Creative All-Rounder.",
    journeyIntro: "Setiap tempat saya bekerja menambahkan kemampuan baru — mulai dari eksekusi visual dan pengalaman agency, menangani client, masuk lebih jauh ke dunia digital, hingga retail operations, technology, dan project secara end-to-end.",
    liberatesEvolution: "Fondasi & Eksekusi",
    liberatesCopy: "Membangun fondasi saya sebagai designer melalui berbagai kebutuhan creative harian, mulai dari social media content, copywriting hingga eksekusi visual.",
    mindoEvolution: "Agency & Client Work",
    mindoCopy: "Berkembang dari eksekusi desain individual ke lingkungan agency yang cepat dan dinamis, sekaligus beradaptasi dengan kebutuhan creative dari lebih dari 20 brand client.",
    rataEvolution: "Client & Brand Thinking",
    rataCopy: "Mulai bekerja lebih dekat dengan client dan memahami tujuan bisnis mereka, sehingga keputusan creative tidak hanya soal visual tetapi juga branding, marketing, dan komunikasi.",
    petmuEvolution: "Ekspansi ke Digital",
    petmuCopy: "Memperluas kemampuan dari static design ke content, social media, motion, video, dan web — termasuk merancang serta mengembangkan pengalaman web menggunakan HTML dan CSS.",
    watchEvolution: "End-to-End Creative Operations",
    watchCopy: "Peran saya berkembang jauh melampaui eksekusi creative — menghubungkan desain, produksi, vendor, solusi digital, operasional retail, dan management di jaringan 40+ toko.",
    now: "SEKARANG",

    // 04 / Featured Experience (Watch Club)
    experienceEyebrow: "04 / Pengalaman Utama",
    experienceIntro: "Lebih dari sekadar desain — saya menghubungkan proses creative, produksi, vendor, Head Office, management, hingga implementasi di jaringan toko retail.",
    retailLocations: "Lokasi Retail yang Didukung",
    flowCreative: "Creative",
    flowCreativeCopy: "Brief → Konsep → Desain → Artwork",
    flowProduction: "Production",
    flowProductionCopy: "Spesifikasi → Material → Persiapan",
    flowVendor: "Vendor",
    flowVendorCopy: "Briefing → Revisi → Produksi",
    flowStores: "40+ Toko",
    flowStoresCopy: "Distribusi → Instruksi → Eksekusi",
    flowMonitoring: "Monitoring",
    flowMonitoringCopy: "Follow-up → Kendala → Penyelesaian",
    flowManagement: "Management",
    flowManagementCopy: "Progress → Hasil → Reporting",
    respCreative: "Creative & Design",
    respRetail: "Retail Operations",
    respVendor: "Vendor & Production",
    respDigital: "Digital & Technology",
    respOwnership: "Project Ownership",
    respManagement: "Management",
    collaboration: "Kolaborasi Lintas Fungsi",
    collaborationTitle: "Bekerja dengan Berbagai Level dan Tim.",
    gmCopy: "Menyampaikan kebutuhan project, progress, kendala, hingga hasil kepada General Manager.",
    amCopy: "Berkoordinasi terkait kebutuhan area, implementasi retail, dan kebutuhan operasional.",
    storeCopy: "Mendukung distribusi, implementasi campaign, komunikasi, dan eksekusi di toko.",
    vendorStakeholderCopy: "Menangani briefing, revisi, kebutuhan teknis, produksi, hingga delivery.",
    supplierCopy: "Berkoordinasi terkait material pendukung dan kebutuhan project dengan partner eksternal.",

    // 05 / Case Studies
    caseEyebrow: "05 / Case Studies",
    caseTitle: "Bukan Hanya Apa yang Saya Buat.<br />Tapi Bagaimana Saya Menyelesaikannya.",
    caseIntro: "Pilihan project yang menunjukkan bahwa proses, koordinasi, dan problem solving sama pentingnya dengan hasil visual akhirnya.",
    caseRetail: "Implementasi Retail Campaign",
    casePrint: "Eksekusi Print & Vendor",
    caseWorkflow: "Digital Workflow Improvement",

    // 06 / Creative Archive
    archiveEyebrow: "06 / Creative Archive",
    archiveTitle: "Karya Lain yang Saya Buat.",
    archiveIntro: "Kumpulan karya dan eksplorasi dari pengalaman agency, freelance, corporate, hingga personal project.",
    all: "Semua",

    // 07 / Web & Technology
    techEyebrow: "07 / Web & Technology",
    techTitle: "Saya Tidak Hanya Mendesain.<br />Saya Juga Membangun Solusi.",
    techIntro: "Ketika sebuah masalah operasional membutuhkan lebih dari sekadar solusi visual, saya mengeksplorasi digital tools, UI/UX, dan AI-assisted development untuk menyelesaikannya.",
    appScreenshot: "SCREENSHOT APLIKASI / UI",
    internalSystem: "Internal Retail System",
    luckySpinCopy: "Solusi digital yang dirancang berdasarkan kebutuhan operasional retail nyata dan digunakan dalam lingkungan multi-store.",

    // 08 / Capability Map
    mapEyebrow: "08 / Peta Kemampuan",
    mapTitle: "Hal yang Bisa Saya Tangani.",
    operations: "Operations",
    problemSolving: "Problem Solving",

    // 09 / About
    aboutEyebrow: "09 / Tentang Saya",
    aboutStatement: "Saya bekerja di antara creative thinking, eksekusi, dan problem solving — menyesuaikan diri dengan apa pun yang dibutuhkan sebuah project.",
    background: "LATAR BELAKANG",
    backgroundCopy: "Visual Communication Design — Bachelor's Degree",
    education: "PENDIDIKAN",
    educationPlace: "STSRD VISI INDONESIA, Yogyakarta",
    experienceLabel: "PENGALAMAN",
    aboutExperience: "Agency, freelance, digital, corporate retail, hingga berbagai creative project berbasis technology.",
    creativeTools: "CREATIVE TOOLS",
    creativeToolsCopy: "Adobe Photoshop, Illustrator, InDesign, Premiere Pro, dan After Effects.",
    digitalSkills: "Web design, HTML/CSS, UI/UX, AI-assisted development, dan digital prototyping.",

    // Personality / Jack of All Trades
    oneMoreThing: "Satu Hal Lagi",
    jackTitle: "Jack of All Trades.",
    jackCopy1: "Mendesain ketika project membutuhkan desain.<br />Berkoordinasi ketika project membutuhkan koordinasi.<br />Membangun ketika tools yang dibutuhkan belum tersedia.<br />Mencari solusi ketika sesuatu tidak berjalan sebagaimana mestinya.",
    jackHighlight: "Creative All-Rounder by profession.<br />Jack of All Trades by nature.",

    // Contact & Footer
    contactEyebrow: "Mari Berkolaborasi",
    contactTitle: "Punya masalah yang membutuhkan solusi creative?",
    emailMe: "Hubungi via Email",
    whatsApp: "WhatsApp",
    linkedIn: "LinkedIn",
    footerCopyright: "© Antonio Riyanto",
    footerRole: "Creative All-Rounder · Jakarta, Indonesia"
  }
};
`````

## File: src/App.jsx
`````javascript
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
    const tId = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 120)
    return () => clearTimeout(tId)
  }, [lang])

  const t = translations[lang] || translations.en

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#fafafa] font-sans antialiased selection:bg-[#fafafa] selection:text-[#0d0d0d] relative overflow-x-hidden">
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
`````

## File: src/index.css
`````css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --bg: #0d0d0d;
    --canvas: #0d0d0d;
    --canvas-subtle: #121212;
    --surface: #141414;
    --surface-muted: #1c1c1c;
    --surface-card: rgba(20, 20, 20, 0.75);
    --surface-glass: rgba(255, 255, 255, 0.04);
    --border-glass: rgba(255, 255, 255, 0.10);
    --border-glow: rgba(255, 255, 255, 0.25);
    --text: #fafafa;
    --text-primary: #fafafa;
    --muted: #8e8e8e;
    --text-muted: #8e8e8e;
    --line: rgba(255, 255, 255, 0.10);
    --accent-chrome: #e5e5e5;

    --dark: #0d0d0d;
    --dark-soft: #141414;
    --dark-line: rgba(255, 255, 255, 0.10);
    --dark-muted: #8e8e8e;

    --radius: 16px;
    --radius-sm: 8px;
    --max: 1440px;
    --ease: cubic-bezier(0.16, 1, 0.3, 1);
    --ease-luxury: cubic-bezier(0.23, 1, 0.32, 1);
  }

  html {
    scroll-behavior: auto;
    background-color: #0d0d0d;
    color: #fafafa;
  }

  /* Lenis CSS standard recommended rules */
  html.lenis, html.lenis body {
    height: auto;
  }

  .lenis.lenis-smooth {
    scroll-behavior: auto !important;
  }

  .lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
  }

  .lenis.lenis-stopped {
    overflow: hidden;
  }

  .lenis.lenis-scrolling iframe {
    pointer-events: none;
  }

  body {
    background-color: var(--bg);
    color: var(--text);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }
}

/* Scroll Word Reveal Animation Classes */
.word-wrap {
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
  padding-bottom: 3px;
  margin-right: 0.28em;
}

.word {
  display: inline-block;
  transform: translateY(110%);
  opacity: 0;
  will-change: transform, opacity;
}

/* Spotlight Bento Box utility */
.spotlight-card {
  position: relative;
  background-color: rgba(20, 20, 20, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.spotlight-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: radial-gradient(
    600px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px),
    rgba(255, 255, 255, 0.18),
    transparent 40%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 1;
}

.spotlight-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    600px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px),
    rgba(255, 255, 255, 0.04),
    transparent 40%
  );
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 0;
}

.spotlight-card:hover::before,
.spotlight-card:hover::after {
  opacity: 1;
}

/* Dark Mode Technical Scrollbar */
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: #0d0d0d;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.35);
}

/* Perspective & 3D transformations */
.perspective-1000 {
  perspective: 1000px;
}
.transform-style-3d {
  transform-style: preserve-3d;
}

/* Circuit Pulse on Workflow Arrows */
@keyframes circuitPulse {
  0%, 100% {
    opacity: 0.25;
    transform: translateX(0);
    color: rgba(255, 255, 255, 0.3);
  }
  50% {
    opacity: 1;
    transform: translateX(4px);
    color: #ffffff;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.85);
  }
}

.circuit-pulse-arrow {
  animation: circuitPulse 2.4s infinite ease-in-out;
}

/* Ambient Liquid Background Organic Float Keyframes */
@keyframes ambientBlob1 {
  0%, 100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  33% {
    transform: translate3d(90px, -70px, 0) scale(1.08);
  }
  66% {
    transform: translate3d(-60px, 90px, 0) scale(0.94);
  }
}

@keyframes ambientBlob2 {
  0%, 100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  33% {
    transform: translate3d(-80px, 80px, 0) scale(0.92);
  }
  66% {
    transform: translate3d(70px, -60px, 0) scale(1.06);
  }
}

@keyframes ambientBlob3 {
  0%, 100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(50px, -40px, 0) scale(1.05);
  }
}

/* Carnival App Styling for Watch Club Simulator */
.carnival-bg {
  background-color: #0c3875;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%230a2c5c' fill-rule='evenodd'/%3E%3C/svg%3E");
}

.carnival-ticket {
  background-color: #fdf6e3;
  background-image: url("data:image/svg+xml,%3Csvg width='8' height='8' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f5ecc5' fill-opacity='0.6' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
}
`````

## File: src/main.jsx
`````javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`````

## File: index.html
`````html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0d0d0d" />
    <title>Antonio Riyanto — Creative All-Rounder</title>
    <meta
      name="description"
      content="Portfolio of Antonio Riyanto — Creative All-Rounder working across creative design, digital, retail operations, production and technology."
    />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90' font-weight='900' fill='white'>AR</text></svg>" />
  </head>
  <body class="bg-[#0d0d0d] text-[#fafafa] font-sans antialiased selection:bg-white selection:text-black overflow-x-hidden">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`````

## File: package.json
`````json
{
  "name": "antonio-riyanto-portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@studio-freight/lenis": "^1.0.42",
    "@types/three": "^0.186.0",
    "canvas-confetti": "^1.9.4",
    "clsx": "^2.1.1",
    "gsap": "^3.15.0",
    "lenis": "^1.3.27",
    "lucide-react": "^0.475.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^3.7.0",
    "three": "^0.186.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "vite": "^6.2.0"
  }
}
`````

## File: postcss.config.js
`````javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`````

## File: README.md
`````markdown
# Antonio Riyanto — Creative All-Rounder Portfolio (React + Vite + Tailwind CSS)

Portofolio web modular dan modern berbasis **React (Vite)**, **Tailwind CSS**, dan **GSAP ScrollTrigger** berdasarkan desain dan profil "Creative All-Rounder" milik **Antonio Riyanto**.

---

## 🚀 Fitur Utama

- **Aesthetic "Brutalist / Technical Luxury"**:
  - Warna kanvas dominan off-white (`#f3f3ef`), permukaan kartu putih (`#ffffff`), serta section teknikal berlatar dark brutalist (`#141414`).
  - Border tipis presisi (`#cecec7` dan `#2c2c2c`), radius konsisten, serta tipografi tebal minimalis modern.
- **Dua Bahasa Reaktif (EN / ID)**:
  - Toggle bahasa instan di sticky navbar dengan state tersimpan di `localStorage`.
  - Kamus terjemahan lengkap di `src/data/translations.js`.
- **GSAP + ScrollTrigger Word Reveal Animation**:
  - Animasi pembacaan teks per kata (*word-by-word reveal*) pada section **Career Journey** saat discroll.
  - Lifecycle hook yang otomatis me-refresh posisi ScrollTrigger saat berganti bahasa.
- **Komponen Interaktif**:
  - *Navbar*: Sticky header dengan backdrop blur, hover underline effect, dan responsive drawer menu untuk mobile.
  - *Capabilities (What I Actually Do)*: 6 baris interaktif dengan showcase video / brutalist placeholder visual & badges.
  - *Selected Work*: Grid 12 kolom responsif (large, medium, half) dengan efek hover elevasi.
  - *Experience (Watch Club Indonesia)*: Alur kerja 6 tahap, matriks 6 tanggung jawab, dan peta kolaborasi stakeholder lintas fungsi.
  - *Case Studies*: Akordeon interaktif expandable menampilkan *The Challenge*, *The Solution*, dan *Real Impact*.
  - *Creative Archive*: Filter kategori interaktif (*All, Branding, Campaign, Social, Print, Retail, Motion, Digital, UI / Web*).
  - *Web & Technology*: Demo interaktif *Watch Club Lucky Spin* dengan simulator putaran dan kalkulasi probabilitas hadiah.
  - *Capability Map*: Matriks 5 pilar kemampuan teknis dan operasional.
  - *About & Jack of All Trades*: Statement filosofis dan detail latar belakang.
  - *Contact*: Tombol kontak cepat (Email, WhatsApp, LinkedIn) dan footer.
- **100% Responsif**: Disesuaikan untuk tampilan desktop ultra-wide, laptop, tablet, hingga layar smartphone.

---

## 📁 Struktur Folder Modular

```text
/
├── index.html                  # Entry point HTML untuk Vite
├── package.json                # Dependensi & skrip Vite/React/Tailwind/GSAP
├── vite.config.js              # Konfigurasi bundler Vite
├── tailwind.config.js          # Konfigurasi custom theme & warna brutalist
├── postcss.config.js           # Konfigurasi PostCSS
├── original-index.html         # Backup file statis awal
└── src/
    ├── main.jsx                # React root mount
    ├── App.jsx                 # App root & state bahasa global
    ├── index.css               # Direktif Tailwind CSS & utility GSAP
    ├── data/
    │   └── translations.js     # Kamus teks lengkap (EN & ID)
    └── components/
        ├── Navbar.jsx          # Header sticky, logo, navigasi, toggle EN/ID
        ├── Hero.jsx            # Hero section, title besar, copy, CTA, 4 metrik
        ├── Capabilities.jsx    # "What I Actually Do" 6 baris showcase
        ├── SelectedWork.jsx    # Grid karya pilihan (large/medium/half)
        ├── CareerJourney.jsx   # Timeline karier 5 tahap + GSAP ScrollTrigger
        ├── Experience.jsx      # Watch Club workflow, responsibility, stakeholder map
        ├── CaseStudies.jsx     # Daftar studi kasus interaktif & collapsible drawer
        ├── CreativeArchive.jsx # Arsip kreatif dengan filter kategori
        ├── TechSection.jsx     # Showcase kartu interaktif Lucky Spin
        ├── CapabilityMap.jsx   # Peta kemampuan 5 kolom
        ├── About.jsx           # Statement personal & detail latar belakang
        ├── JackOfAllTrades.jsx # Section kepribadian / quote penutup
        └── Contact.jsx         # Section kontak, email, social links, dan footer
```

---

## 🛠️ Cara Menjalankan Project

### 1. Menjalankan Server Pengembangan (Dev Mode)
```bash
npm run dev
```
Buka browser pada alamat yang ditampilkan di terminal (biasanya `http://localhost:5173`).

### 2. Membangun untuk Production (Build)
```bash
npm run build
```
Output build yang sudah dioptimalkan dan siap di-deploy ke Vercel/Netlify/GitHub Pages akan berada di folder `/dist`.

### 3. Menguji Hasil Build (Preview)
```bash
npm run preview
```
`````

## File: repomix-web-porto-aan.md
`````markdown
This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
````
src/
  components/
    About.jsx
    Capabilities.jsx
    CapabilityMap.jsx
    CareerJourney.jsx
    CaseStudies.jsx
    Contact.jsx
    CreativeArchive.jsx
    CustomCursor.jsx
    Experience.jsx
    Hero.jsx
    JackOfAllTrades.jsx
    Navbar.jsx
    SelectedWork.jsx
    TechSection.jsx
  data/
    translations.js
  App.jsx
  index.css
  main.jsx
index.html
package.json
postcss.config.js
README.md
tailwind.config.js
vite.config.js
````

# Files

## File: src/components/About.jsx
````javascript
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About({ t }) {
  const sectionRef = useRef(null)
  const watermarkRef = useRef(null)

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

  // Subtle Parallax Watermark
  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    if (isCoarse) return

    const ctx = gsap.context(() => {
      if (watermarkRef.current && sectionRef.current) {
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 sm:py-32 border-t border-white/10 bg-canvas relative overflow-hidden"
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
        <span className="block mb-8 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
          {t.aboutEyebrow}
        </span>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Statement */}
          <div className="text-[clamp(26px,3.5vw,46px)] font-black leading-[1.15] tracking-[-0.04em] text-[#fafafa]">
            {t.aboutStatement}
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
````

## File: src/components/Capabilities.jsx
````javascript
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
    <section ref={containerRef} className="py-24 sm:py-32 border-t border-white/10 bg-canvas relative" id="capabilities">
      <div className="w-[min(calc(100%-48px),1440px)] mx-auto">
        
        {/* Section Header */}
        <div className="pb-16 sm:pb-20">
          <span className="block mb-5 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
            {t.whatEyebrow}
          </span>

          <h2 
            className="max-w-[1100px] mb-8 text-[clamp(36px,6.5vw,92px)] font-black leading-[0.95] tracking-[-0.045em] text-[#fafafa]"
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
                className={`spotlight-card group relative grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] min-h-[500px] lg:min-h-[580px] rounded-2xl overflow-hidden border border-white/10 bg-[#121212]/80 backdrop-blur-xl transition-all duration-300 hover:border-white/25 ${
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
````

## File: src/components/CapabilityMap.jsx
````javascript
import React, { useState } from 'react'

export default function CapabilityMap({ t }) {
  const [hoveredSkill, setHoveredSkill] = useState(null)

  const groups = [
    {
      title: 'Creative',
      skills: [
        'Graphic Design',
        'Campaign',
        'Brand Adaptation',
        'Print',
        'POSM',
      ],
    },
    {
      title: 'Content',
      skills: [
        'Social Media',
        'Motion Graphics',
        'Video',
        'Photography',
        'Copywriting',
      ],
    },
    {
      title: 'Digital',
      skills: [
        'Web Design',
        'UI/UX',
        'HTML / CSS',
        'Responsive Design',
        'Digital Experience',
      ],
    },
    {
      title: t.operations,
      skills: [
        'Retail Execution',
        'Multi-Store Coordination',
        'Vendor Management',
        'Production',
        'Project Management',
      ],
    },
    {
      title: t.problemSolving,
      skills: [
        'Internal Tools',
        'AI-Assisted Development',
        'Workflow Improvement',
        'System Prototyping',
        'Troubleshooting',
      ],
    },
  ]

  // Cross-Matrix skill relationships
  const skillRelations = {
    'Web Design': ['UI/UX', 'HTML / CSS', 'Responsive Design', 'Digital Experience', 'System Prototyping'],
    'UI/UX': ['Web Design', 'Digital Experience', 'Internal Tools', 'System Prototyping'],
    'HTML / CSS': ['Web Design', 'Responsive Design', 'Troubleshooting'],
    'Responsive Design': ['Web Design', 'HTML / CSS', 'Digital Experience'],
    'Digital Experience': ['Web Design', 'UI/UX', 'Motion Graphics'],
    'Graphic Design': ['Campaign', 'Brand Adaptation', 'Print', 'POSM', 'Social Media'],
    'Campaign': ['Graphic Design', 'Social Media', 'Retail Execution', 'Multi-Store Coordination', 'Copywriting'],
    'Brand Adaptation': ['Graphic Design', 'Print', 'Vendor Management', 'Production'],
    'Print': ['POSM', 'Retail Execution', 'Vendor Management', 'Production'],
    'POSM': ['Print', 'Retail Execution', 'Multi-Store Coordination', 'Vendor Management'],
    'Social Media': ['Motion Graphics', 'Video', 'Photography', 'Copywriting', 'Campaign'],
    'Motion Graphics': ['Video', 'Social Media', 'Digital Experience'],
    'Video': ['Motion Graphics', 'Photography', 'Social Media'],
    'Photography': ['Video', 'Social Media'],
    'Copywriting': ['Campaign', 'Social Media', 'Project Management'],
    'Retail Execution': ['Multi-Store Coordination', 'Vendor Management', 'Production', 'POSM'],
    'Multi-Store Coordination': ['Retail Execution', 'Project Management', 'Workflow Improvement'],
    'Vendor Management': ['Print', 'Production', 'Project Management', 'Brand Adaptation'],
    'Production': ['Print', 'POSM', 'Vendor Management'],
    'Project Management': ['Multi-Store Coordination', 'Workflow Improvement', 'Troubleshooting'],
    'Internal Tools': ['AI-Assisted Development', 'Workflow Improvement', 'System Prototyping', 'UI/UX'],
    'AI-Assisted Development': ['Internal Tools', 'System Prototyping', 'Troubleshooting'],
    'Workflow Improvement': ['Internal Tools', 'Project Management', 'Troubleshooting'],
    'System Prototyping': ['Internal Tools', 'UI/UX', 'Web Design'],
    'Troubleshooting': ['System Prototyping', 'Internal Tools', 'HTML / CSS'],
  }

  const isRelated = (skill) => {
    if (!hoveredSkill) return true
    if (skill === hoveredSkill) return true
    return skillRelations[hoveredSkill]?.includes(skill)
  }

  return (
    <section className="py-24 sm:py-32 border-t border-white/10 bg-canvas relative">
      <div className="w-[min(calc(100%-48px),1440px)] mx-auto">
        
        {/* Header */}
        <div className="mb-14 sm:mb-16">
          <span className="block mb-5 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
            {t.mapEyebrow}
          </span>

          <h2 className="max-w-[1050px] text-[clamp(36px,6.5vw,92px)] font-black leading-[0.95] tracking-[-0.045em] text-[#fafafa]">
            {t.mapTitle}
          </h2>
        </div>

        {/* 5-Column Dark Technical Card Skill Map with Cross-Matrix Highlighting */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-t border-l border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          {groups.map((group, idx) => (
            <article
              key={idx}
              className="group min-h-[320px] sm:min-h-[340px] p-7 sm:p-8 border-r border-b border-white/10 flex flex-col justify-between bg-[#141414]/90 hover:bg-[#1a1a1a] backdrop-blur-xl transition-all duration-300 ease-luxury relative"
            >
              {/* Subtle top edge glow on hover */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/0 group-hover:via-white/40 to-transparent transition-all duration-300" />

              <div>
                <span className="text-[11px] font-mono text-[#8e8e8e] block mb-2 font-bold tracking-wider group-hover:text-white transition-colors">
                  [0{idx + 1}]
                </span>
                <h3 className="mb-6 text-[20px] sm:text-[22px] font-black text-[#fafafa] group-hover:text-white transition-colors">
                  {group.title}
                </h3>
                <ul className="space-y-3 text-[14px]">
                  {group.skills.map((skill, sIdx) => {
                    const active = isRelated(skill)
                    const isDirect = skill === hoveredSkill

                    return (
                      <li
                        key={sIdx}
                        onMouseEnter={() => setHoveredSkill(skill)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className={`flex items-center gap-2.5 cursor-pointer py-0.5 transition-all duration-200 ${
                          active
                            ? 'text-[#fafafa] opacity-100'
                            : 'text-[#6e6e6a] opacity-30 hover:opacity-75'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full inline-block transition-all duration-200 ${
                            isDirect
                              ? 'bg-white shadow-[0_0_10px_#ffffff] scale-150'
                              : active && hoveredSkill
                              ? 'bg-white/80 shadow-[0_0_6px_rgba(255,255,255,0.6)]'
                              : 'bg-white/30'
                          }`}
                        />
                        <span className={isDirect ? 'font-semibold text-white' : ''}>
                          {skill}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#555555] group-hover:text-accent-chrome mt-8 pt-4 border-t border-white/[0.06] transition-colors">
                ACTIVE CAPABILITY
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
````

## File: src/components/CareerJourney.jsx
````javascript
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
            // Kinetic node flash expansion
            gsap.fromTo(
              node,
              { scale: 1.25 },
              { scale: 1, duration: 0.45, ease: 'back.out(2)' }
            )
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
    <section ref={containerRef} className="py-24 sm:py-32 bg-[#0d0d0d] border-t border-white/10 relative" id="journey">
      <div className="w-[min(calc(100%-48px),1440px)] mx-auto">
        
        {/* Section Header */}
        <div>
          <span className="block mb-5 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
            {t.journeyEyebrow}
          </span>

          <h2
            className="max-w-[1050px] mb-8 text-[clamp(36px,6.5vw,92px)] font-black leading-[0.95] tracking-[-0.045em] text-[#fafafa]"
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
                <div className="relative z-20 w-[38px] sm:w-[64px] flex justify-center">
                  <span
                    ref={(el) => (nodeRefs.current[idx] = el)}
                    className="w-9 sm:w-[40px] h-9 sm:h-[40px] flex items-center justify-center rounded-full text-[12px] font-mono font-bold border border-white/20 bg-[#141414] text-white/60 transition-colors duration-300 will-change-transform"
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
````

## File: src/components/CaseStudies.jsx
````javascript
import React, { useState } from 'react'

export default function CaseStudies({ t }) {
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
      title: 'Watch Club Lucky Spin',
      category: 'Problem → UI/UX → Internal System',
      challenge:
        'Manual promotional raffle draws at retail outlets were vulnerable to fraud, difficult to audit, and lacked customer excitement.',
      solution:
        'Designed and engineered an interactive digital Lucky Spin web application with rule-based probability engines, tamper-proof voucher verification, and real-time backend synchronization.',
      impact:
        'Engaged thousands of retail customers, boosted campaign conversions, and provided HQ with instant real-time audit logs.',
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
    <section className="py-24 sm:py-32 border-t border-white/10 bg-canvas relative" id="case-studies">
      <div className="w-[min(calc(100%-48px),1440px)] mx-auto">
        
        {/* Header */}
        <div className="mb-14 sm:mb-16">
          <span className="block mb-5 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
            {t.caseEyebrow}
          </span>

          <h2
            className="max-w-[1050px] mb-8 text-[clamp(36px,6.5vw,92px)] font-black leading-[0.95] tracking-[-0.045em] text-[#fafafa]"
            dangerouslySetInnerHTML={{ __html: t.caseTitle }}
          />
          <p className="max-w-[720px] text-[#8e8e8e] text-[17px] sm:text-[19px] leading-[1.6]">
            {t.caseIntro}
          </p>
        </div>

        {/* Case Studies List (Deep Charcoal Reskin + Focus Dimming) */}
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
                className={`border-b border-white/10 overflow-hidden transition-[opacity,border-color] duration-300 ${
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
                    <h3 className="text-[clamp(20px,2.5vw,36px)] font-black tracking-tight text-[#fafafa] group-hover:text-white transition-colors">
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
                            01 / The Challenge
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
                            02 / The Solution
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
                            03 / Real Impact
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
````

## File: src/components/Contact.jsx
````javascript
import React, { useState, useEffect } from 'react'

export default function Contact({ t }) {
  const [timeStr, setTimeStr] = useState('')
  const [copied, setCopied] = useState(false)

  // Real-Time Jakarta Clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date()
        const options = {
          timeZone: 'Asia/Jakarta',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }
        const formatted = new Intl.DateTimeFormat('en-GB', options).format(now)
        setTimeStr(formatted)
      } catch {
        setTimeStr('09:00:00')
      }
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleCopyEmail = () => {
    try {
      navigator.clipboard?.writeText('antonio.riyanto07@gmail.com')
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // fallback
    }
  }

  return (
    <section className="pt-24 sm:pt-32 pb-12 bg-[#0a0a0a] text-white border-t border-white/10 relative" id="contact">
      {/* Background ambient luxury glow spot */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none"
      />

      <div className="w-[min(calc(100%-48px),1440px)] mx-auto relative z-10">
        
        {/* Eyebrow */}
        <span className="block mb-6 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
          {t.contactEyebrow}
        </span>

        {/* Title */}
        <h2 className="max-w-[1050px] mb-12 text-[clamp(36px,6.5vw,92px)] font-black leading-[0.95] tracking-[-0.045em] text-[#fafafa]">
          {t.contactTitle}
        </h2>

        {/* Action Buttons with Magnetic Micro-Interactions & One-Click Copy */}
        <div className="flex flex-wrap items-center gap-4 mb-24 sm:mb-32">
          <div className="relative inline-flex">
            <a
              href="mailto:antonio.riyanto07@gmail.com"
              onClick={handleCopyEmail}
              data-cursor="magnetic"
              className="min-h-[50px] px-8 inline-flex items-center justify-center rounded-full text-[13px] font-bold bg-white text-[#0d0d0d] border border-white hover:bg-neutral-200 hover:-translate-y-0.5 active:translate-y-0 shadow-[0_4px_25px_rgba(255,255,255,0.18)] transition-all duration-200"
            >
              {t.emailMe} ↗
            </a>
          </div>

          <a
            href="https://wa.me/6281903987051"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="magnetic"
            className="min-h-[50px] px-8 inline-flex items-center justify-center rounded-full text-[13px] font-semibold text-white border border-white/20 hover:border-white/50 hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-md transition-all duration-200"
          >
            {t.whatsApp} ↗
          </a>

          <a
            href="https://www.linkedin.com/in/antonio-riyanto-928203186/"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="magnetic"
            className="min-h-[50px] px-8 inline-flex items-center justify-center rounded-full text-[13px] font-semibold text-white border border-white/20 hover:border-white/50 hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-md transition-all duration-200"
          >
            {t.linkedIn} ↗
          </a>
        </div>

        {/* Floating Toast Notification on Copy */}
        {copied && (
          <div
            role="status"
            className="fixed bottom-8 right-6 sm:right-10 z-[10000] flex items-center gap-2.5 px-5 py-3 rounded-full bg-white text-black font-mono text-[12px] font-bold shadow-[0_10px_35px_rgba(0,0,0,0.8)] border border-white animate-fadeIn"
          >
            <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
            <span>Copied to clipboard (antonio.riyanto07@gmail.com)</span>
          </div>
        )}

        {/* Footer with Real-Time Jakarta Clock */}
        <footer className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[#8e8e8e] text-[12px] font-mono">
          <div className="flex flex-wrap items-center gap-4">
            <span>{t.footerCopyright}</span>
            <span className="text-[#444444]">•</span>
            {/* Live Jakarta Clock */}
            <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/90">
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
              <span>JAKARTA, ID — {timeStr || 'LIVE'} WIB</span>
            </span>
          </div>

          <span className="text-[#666666]">
            {t.footerRole}
          </span>
        </footer>

      </div>
    </section>
  )
}
````

## File: src/components/CreativeArchive.jsx
````javascript
import React, { useState } from 'react'

export default function CreativeArchive({ t }) {
  const [selectedFilter, setSelectedFilter] = useState('All')

  const filterCategories = [
    'All',
    'Branding',
    'Campaign',
    'Social',
    'Print',
    'Retail',
    'Motion',
    'Digital',
    'UI / Web',
  ]

  const archiveItems = [
    { id: '01', title: 'Brand Identity Concept', category: 'Branding', format: 'Vector & Guidelines' },
    { id: '02', title: 'Seasonal Sale POSM', category: 'Retail', format: 'Large Format Print' },
    { id: '03', title: 'Social Motion Teaser', category: 'Motion', format: '1080x1920 Reel' },
    { id: '04', title: 'Luxury Timepiece Brochure', category: 'Print', format: 'Offset & Foil Stamp' },
    { id: '05', title: 'Storefront Display Graphics', category: 'Retail', format: 'Window Decal & Lightbox' },
    { id: '06', title: 'Interactive Campaign Wheel', category: 'UI / Web', format: 'React + Canvas App' },
    { id: '07', title: 'Multichannel Ad Campaign', category: 'Campaign', format: 'Social & OOH Ads' },
    { id: '08', title: 'Digital Asset Dashboard', category: 'Digital', format: 'Web App Prototype' },
    { id: '09', title: 'Product Launch 3D Motion', category: 'Motion', format: '3D & Compositing' },
    { id: '10', title: 'Corporate Stationery Suite', category: 'Branding', format: 'Identity System' },
    { id: '11', title: 'Influencer Media Kit', category: 'Social', format: 'Editorial PDF & Assets' },
    { id: '12', title: 'Multi-Store Display Banner', category: 'Print', format: 'Nationwide POSM' },
  ]

  const filteredItems = selectedFilter === 'All'
    ? archiveItems
    : archiveItems.filter((item) => item.category === selectedFilter)

  return (
    <section className="py-24 sm:py-32 border-t border-white/10 bg-canvas relative" id="archive">
      <div className="w-[min(calc(100%-48px),1440px)] mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <span className="block mb-5 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
            {t.archiveEyebrow}
          </span>

          <h2 className="max-w-[1050px] mb-8 text-[clamp(36px,6.5vw,92px)] font-black leading-[0.95] tracking-[-0.045em] text-[#fafafa]">
            {t.archiveTitle}
          </h2>
          <p className="max-w-[720px] text-[#8e8e8e] text-[17px] sm:text-[19px] leading-[1.6]">
            {t.archiveIntro}
          </p>
        </div>

        {/* Dark Glass Filter Pills with White Active States */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {filterCategories.map((cat) => {
            const isActive = selectedFilter === cat
            const label = cat === 'All' ? t.all : cat

            return (
              <button
                key={cat}
                type="button"
                data-cursor="magnetic"
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 border rounded-full text-[12px] font-medium backdrop-blur-md transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-[#0d0d0d] border-white shadow-[0_2px_15px_rgba(255,255,255,0.2)] font-bold'
                    : 'bg-white/[0.04] text-[#8e8e8e] border-white/10 hover:text-white hover:border-white/30 hover:bg-white/[0.08]'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>

        {/* Archive Technical Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              data-cursor="magnetic"
              className="group aspect-[4/5] p-5 sm:p-6 flex flex-col justify-between bg-[#141414]/80 border border-white/10 rounded-xl text-[#8e8e8e] backdrop-blur-xl transition-all duration-300 ease-luxury hover:-translate-y-1 hover:border-white/30 hover:bg-[#1a1a1a] hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] relative overflow-hidden"
            >
              {/* Subtle top header */}
              <div className="flex justify-between items-center z-10">
                <span className="text-[10px] font-mono font-bold text-[#8e8e8e]">
                  #{item.id}
                </span>
                <span className="px-2 py-0.5 bg-white/10 rounded text-[9px] font-mono font-bold text-white uppercase tracking-wider border border-white/10">
                  {item.category}
                </span>
              </div>

              {/* Center icon / placeholder emblem */}
              <div className="my-auto text-center z-10">
                <div className="w-12 h-12 mx-auto mb-3 border border-white/15 rounded-xl grid place-items-center group-hover:border-white/40 group-hover:bg-white/5 transition-all text-white font-mono shadow-sm">
                  <span className="text-[12px] font-bold font-mono text-white/90">
                    {item.id}
                  </span>
                </div>
                <strong className="block text-[14px] sm:text-[15px] font-bold text-[#fafafa] leading-snug group-hover:text-white transition-colors">
                  {item.title}
                </strong>
                <span className="block mt-1 text-[11px] font-mono text-[#8e8e8e]">
                  {item.format}
                </span>
              </div>

              {/* Bottom footer hover label */}
              <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[10px] uppercase font-mono font-bold text-[#6e6e6a] group-hover:text-white transition-colors z-10">
                <span>Exploration</span>
                <span>↗</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
````

## File: src/components/CustomCursor.jsx
````javascript
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

/**
 * CustomFollowerCursor with Magnetic Physics & Floating Media Preview Bridge
 * Includes strict mobile/touch guard to avoid overhead on coarse pointer devices.
 */
export default function CustomCursor() {
  const [isCoarse, setIsCoarse] = useState(true)
  const [previewData, setPreviewData] = useState({
    active: false,
    title: '',
    category: '',
    image: null,
    video: null,
  })

  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const previewRef = useRef(null)

  const mousePos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const previewPos = useRef({ x: -100, y: -100 })
  const velocity = useRef({ x: 0, y: 0 })
  const isHovered = useRef(false)
  const isMagnetic = useRef(false)
  const magneticTarget = useRef(null)

  useEffect(() => {
    // Strict Mobile Guard: pointer coarse detection
    const mediaQuery = window.matchMedia('(pointer: coarse)')
    const checkCoarse = () => {
      const coarse = mediaQuery.matches || !window.matchMedia('(pointer: fine)').matches
      setIsCoarse(coarse)
      return coarse
    }

    if (checkCoarse()) {
      return
    }

    const handleMediaChange = () => {
      checkCoarse()
    }
    mediaQuery.addEventListener?.('change', handleMediaChange)

    // Mouse Move Coordinator
    const onMouseMove = (e) => {
      const { clientX, clientY } = e
      velocity.current = {
        x: (clientX - mousePos.current.x) * 0.4,
        y: (clientY - mousePos.current.y) * 0.4,
      }
      mousePos.current = { x: clientX, y: clientY }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`
      }
    }

    // Magnetic Attraction & Hover Targets
    const onMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor="magnetic"], [data-cursor="hover"]')
      if (target) {
        isHovered.current = true
        if (target.matches('[data-cursor="magnetic"], a, button')) {
          isMagnetic.current = true
          magneticTarget.current = target
        }
      }

      // Check for preview data attributes
      const previewEl = e.target.closest('[data-preview-title]')
      if (previewEl) {
        setPreviewData({
          active: true,
          title: previewEl.dataset.previewTitle || '',
          category: previewEl.dataset.previewCategory || '',
          image: previewEl.dataset.previewImage || null,
          video: previewEl.dataset.previewVideo || null,
        })
      }
    }

    const onMouseOut = (e) => {
      const target = e.target.closest('a, button, [data-cursor="magnetic"], [data-cursor="hover"]')
      if (target) {
        isHovered.current = false
        isMagnetic.current = false
        magneticTarget.current = null
      }

      const previewEl = e.target.closest('[data-preview-title]')
      if (previewEl) {
        // If relatedTarget is not inside the preview element
        if (!previewEl.contains(e.relatedTarget)) {
          setPreviewData((prev) => ({ ...prev, active: false }))
        }
      }
    }

    // Custom Event Listener for custom hover preview payload bridge
    const onCustomPreview = (e) => {
      const detail = e.detail || {}
      setPreviewData({
        active: !!detail.active,
        title: detail.title || '',
        category: detail.category || '',
        image: detail.image || null,
        video: detail.video || null,
      })
    }

    // Render loop with lerp: 0.15
    let animationFrameId
    const lerp = (start, end, factor) => start + (end - start) * factor

    const render = () => {
      let targetX = mousePos.current.x
      let targetY = mousePos.current.y

      // Magnetic pull physics
      if (isMagnetic.current && magneticTarget.current) {
        const rect = magneticTarget.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const pull = 0.35
        targetX = lerp(targetX, centerX, pull)
        targetY = lerp(targetY, centerY, pull)
      }

      ringPos.current.x = lerp(ringPos.current.x, targetX, 0.15)
      ringPos.current.y = lerp(ringPos.current.y, targetY, 0.15)

      if (ringRef.current) {
        const scale = previewData.active ? 0.3 : isHovered.current ? 1.7 : 1
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) scale(${scale})`
      }

      // Floating Media Preview Capsule Tracking & Tilt
      if (previewRef.current && previewData.active) {
        previewPos.current.x = lerp(previewPos.current.x, mousePos.current.x + 24, 0.12)
        previewPos.current.y = lerp(previewPos.current.y, mousePos.current.y - 120, 0.12)

        const tiltX = Math.max(-15, Math.min(15, -velocity.current.y * 1.5))
        const tiltY = Math.max(-15, Math.min(15, velocity.current.x * 1.5))

        previewRef.current.style.transform = `translate3d(${previewPos.current.x}px, ${previewPos.current.y}px, 0) perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
      }

      animationFrameId = requestAnimationFrame(render)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseover', onMouseOver, { passive: true })
    document.addEventListener('mouseout', onMouseOut, { passive: true })
    window.addEventListener('cursor-preview', onCustomPreview)

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      window.removeEventListener('cursor-preview', onCustomPreview)
      mediaQuery.removeEventListener?.('change', handleMediaChange)
    }
  }, [previewData.active])

  if (isCoarse) return null

  return (
    <>
      {/* Central Precise Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference will-change-transform"
      />

      {/* Trailing Spring Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-white pointer-events-none z-[9998] mix-blend-difference will-change-transform transition-opacity duration-200"
      />

      {/* Floating Thumbnail Preview Capsule */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 w-[280px] aspect-[16/10] rounded-xl overflow-hidden pointer-events-none z-[9990] backdrop-blur-xl bg-canvas-card/90 border border-white/20 shadow-2xl transition-opacity duration-300 ${
          previewData.active ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Subtle radial inner glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />

        {/* Video or Image or Aesthetic Fallback */}
        {previewData.video ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            src={previewData.video}
            className="w-full h-full object-cover"
          />
        ) : previewData.image ? (
          <img
            src={previewData.image}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col justify-between p-4 bg-gradient-to-br from-[#1c1c1c] to-[#0f0f0f]">
            <div className="flex items-center justify-between text-[10px] font-mono text-text-muted">
              <span>PROJECT PREVIEW</span>
              <span className="w-2 h-2 rounded-full bg-white/40 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-accent-chrome/60 block">
                {previewData.category || 'CASE STUDY'}
              </span>
              <strong className="text-[14px] font-bold text-text-primary tracking-tight line-clamp-1">
                {previewData.title || 'Technical Project'}
              </strong>
            </div>
          </div>
        )}

        {/* Minimalist Lower Overlay Label when media is displayed */}
        {(previewData.image || previewData.video) && (
          <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            <span className="text-[9px] uppercase font-bold tracking-wider text-white/70 block">
              {previewData.category}
            </span>
            <strong className="text-[12px] font-semibold text-white tracking-tight line-clamp-1">
              {previewData.title}
            </strong>
          </div>
        )}
      </div>
    </>
  )
}
````

## File: src/components/Experience.jsx
````javascript
import React from 'react'

export default function Experience({ t }) {
  const steps = [
    {
      num: '01',
      title: t.flowCreative,
      copy: t.flowCreativeCopy,
    },
    {
      num: '02',
      title: t.flowProduction,
      copy: t.flowProductionCopy,
    },
    {
      num: '03',
      title: t.flowVendor || 'Vendor',
      copy: t.flowVendorCopy,
    },
    {
      num: '04',
      title: t.flowStores,
      copy: t.flowStoresCopy,
    },
    {
      num: '05',
      title: t.flowMonitoring,
      copy: t.flowMonitoringCopy,
    },
    {
      num: '06',
      title: t.flowManagement,
      copy: t.flowManagementCopy,
    },
  ]

  const responsibilities = [
    {
      num: '01',
      title: t.respCreative,
      items: [
        'Campaign Visual',
        'Graphic Design',
        'POSM',
        'Print',
        'Digital Assets',
        'Brand Adaptation',
      ],
    },
    {
      num: '02',
      title: t.respRetail,
      items: [
        '40+ Store Support',
        'Area Manager Coordination',
        'Supervisor Coordination',
        'Store Communication',
        'Implementation',
        'Monitoring',
      ],
    },
    {
      num: '03',
      title: t.respVendor,
      items: [
        'Print Vendor',
        'Web Vendor',
        'Supplier Coordination',
        'Production Preparation',
        'Revision',
        'Quality Control',
      ],
    },
    {
      num: '04',
      title: t.respDigital,
      items: [
        'UI/UX',
        'Web Projects',
        'Internal Tools',
        'AI-Assisted Development',
        'Workflow Improvement',
        'Troubleshooting',
      ],
    },
    {
      num: '05',
      title: t.respOwnership,
      items: [
        'Brief',
        'Planning',
        'Execution',
        'Revision',
        'Delivery',
        'Follow-up',
      ],
    },
    {
      num: '06',
      title: t.respManagement,
      items: [
        'Progress Updates',
        'Issue Resolution',
        'Stakeholder Coordination',
        'Result Reporting',
        'General Manager Communication',
      ],
    },
  ]

  const stakeholders = [
    {
      role: 'General Manager',
      copy: t.gmCopy,
    },
    {
      role: 'Area Managers',
      copy: t.amCopy,
    },
    {
      role: 'Supervisors & Stores',
      copy: t.storeCopy,
    },
    {
      role: 'Print / Web Vendors',
      copy: t.vendorStakeholderCopy,
    },
    {
      role: 'Suppliers / Partners',
      copy: t.supplierCopy,
    },
  ]

  return (
    <section className="py-24 sm:py-32 bg-[#0c0c0c] text-white border-t border-white/10 relative" id="experience">
      <div className="w-[min(calc(100%-48px),1440px)] mx-auto">
        
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.5fr] gap-10 lg:gap-14 items-end pb-12 sm:pb-16 border-b border-white/10">
          <div>
            <span className="block mb-5 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
              {t.experienceEyebrow}
            </span>

            <h2 className="max-w-[1050px] mb-8 text-[clamp(36px,6.5vw,92px)] font-black leading-[0.95] tracking-[-0.045em] text-[#fafafa]">
              Watch Club Indonesia.
            </h2>
            <p className="max-w-[720px] text-[#8e8e8e] text-[17px] sm:text-[19px] leading-[1.6]">
              {t.experienceIntro}
            </p>
          </div>

          {/* Stat with Live Network Monochrome Radar */}
          <div className="lg:text-right">
            <div className="inline-flex items-center gap-3 lg:justify-end">
              {/* Refined Monochrome Radar Ring Ping */}
              <div className="relative flex items-center justify-center w-6 h-6">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/20 opacity-70" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white shadow-[0_0_10px_#ffffff]" />
              </div>
              <strong className="block text-[clamp(54px,9vw,130px)] font-black leading-[0.85] tracking-[-0.06em] text-transparent bg-clip-text bg-gradient-to-br from-white via-[#e5e5e5] to-[#777777]">
                40+
              </strong>
            </div>
            <div className="flex items-center lg:justify-end gap-2 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span className="text-[#8e8e8e] text-[13px] font-mono tracking-wide block">
                {t.retailLocations}
              </span>
            </div>
          </div>
        </div>

        {/* 6-Step Workflow with Circuit Pulse Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 mt-14 sm:mt-16 border-t border-b border-white/10">
          {steps.map((step, idx) => (
            <article
              key={idx}
              className="relative p-6 sm:p-7 min-h-[190px] sm:min-h-[220px] border-b sm:border-b-0 sm:border-r border-white/10 last:border-b-0 lg:last:border-r-0 flex flex-col justify-between group hover:bg-[#161616] transition-all duration-200"
            >
              <div className="flex justify-between items-center">
                <span className="text-[#8e8e8e] text-[12px] font-bold font-mono group-hover:text-white transition-colors">
                  {step.num}
                </span>
                {idx < 5 && (
                  <span
                    className="hidden lg:block text-xs font-mono circuit-pulse-arrow"
                    style={{ animationDelay: `${idx * 0.4}s` }}
                  >
                    →
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-[19px] font-bold text-[#fafafa] mb-2 group-hover:text-white">
                  {step.title}
                </h3>
                <p className="text-[#8e8e8e] text-[12px] leading-relaxed">
                  {step.copy}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Responsibility Grid (6 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16 sm:mt-24 border-t border-l border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          {responsibilities.map((resp, idx) => (
            <article
              key={idx}
              className="p-8 sm:p-9 min-h-[290px] border-r border-b border-white/10 flex flex-col justify-between bg-[#121212]/90 hover:bg-[#181818] transition-all duration-300 ease-luxury group"
            >
              <small className="text-[#8e8e8e] font-bold text-[11px] font-mono group-hover:text-white transition-colors">
                [SCOPE_{resp.num}]
              </small>

              <div className="my-8">
                <h3 className="text-[23px] sm:text-[25px] font-extrabold text-[#fafafa] mb-4 group-hover:text-white transition-colors">
                  {resp.title}
                </h3>
                <ul className="space-y-2 text-[#8e8e8e] text-[14px]">
                  {resp.items.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 bg-white/30 rounded-full inline-block group-hover:bg-white transition-colors" />
                      <span className="group-hover:text-[#e5e5e5] transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-[10px] uppercase font-mono tracking-widest text-[#555555] group-hover:text-accent-chrome transition-colors">
                SCOPE OF WORK
              </div>
            </article>
          ))}
        </div>

        {/* Stakeholder Map */}
        <div className="mt-16 sm:mt-24 pt-14 sm:pt-16 border-t border-white/10">
          <span className="block mb-4 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
            {t.collaboration}
          </span>

          <h3 className="mb-10 text-[clamp(28px,3.5vw,50px)] font-black text-[#fafafa] leading-tight">
            {t.collaborationTitle}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {stakeholders.map((sh, idx) => (
              <article
                key={idx}
                className="p-6 min-h-[160px] border border-white/10 rounded-xl bg-[#141414] hover:border-white/30 hover:bg-[#1a1a1a] transition-all duration-200"
              >
                <strong className="block mb-2.5 text-[15px] font-bold text-[#fafafa]">
                  {sh.role}
                </strong>
                <p className="text-[#8e8e8e] text-[12px] leading-relaxed">
                  {sh.copy}
                </p>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
````

## File: src/components/Hero.jsx
````javascript
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

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
      // Kinetic masked slide-up
      gsap.fromTo(
        '.hero-title-line',
        { y: '115%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 1.15,
          stagger: 0.14,
          ease: 'power3.out',
          delay: 0.1,
        }
      )

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
      className="relative w-[min(calc(100%-48px),1440px)] mx-auto min-h-[calc(100vh-72px)] pt-12 sm:pt-20 pb-12 flex flex-col justify-between overflow-visible"
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
          <span className="block mb-6 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
            {t.heroEyebrow}
          </span>

          <h1 className="text-[clamp(44px,9.5vw,144px)] font-black leading-[0.92] tracking-[-0.05em] text-[#fafafa] uppercase">
            <span className="block overflow-hidden pb-1">
              <span className="hero-title-line block transform translate-y-[115%] will-change-transform">
                {t.heroTitlePart1}
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="hero-title-line block transform translate-y-[115%] will-change-transform text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e5e5e5] to-[#888888]">
                {t.heroTitlePart2}
              </span>
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
````

## File: src/components/JackOfAllTrades.jsx
````javascript
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function JackOfAllTrades({ t }) {
  const sectionRef = useRef(null)
  const watermarkRef = useRef(null)

  // Subtle Parallax Watermark
  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    if (isCoarse) return

    const ctx = gsap.context(() => {
      if (watermarkRef.current && sectionRef.current) {
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-32 sm:py-40 bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0a0a0a] border-t border-white/10 text-center relative overflow-hidden"
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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-white/[0.03] rounded-full blur-[130px] pointer-events-none"
      />

      <div className="w-[min(calc(100%-48px),1440px)] mx-auto relative z-10">
        
        <span className="block mb-6 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
          {t.oneMoreThing}
        </span>

        <h2 className="mb-8 text-[clamp(40px,7vw,96px)] font-black leading-none tracking-[-0.05em] text-[#fafafa]">
          {t.jackTitle}
        </h2>

        <div className="max-w-[720px] mx-auto text-[#8e8e8e] text-[18px] sm:text-[20px] leading-[1.8]">
          <p
            className="mb-8"
            dangerouslySetInnerHTML={{ __html: t.jackCopy1 }}
          />

          <strong
            className="block font-extrabold text-[20px] sm:text-[24px] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e5e5e5] to-[#999999]"
            dangerouslySetInnerHTML={{ __html: t.jackHighlight }}
          />
        </div>

      </div>
    </section>
  )
}
````

## File: src/components/Navbar.jsx
````javascript
import React, { useState } from 'react'

export default function Navbar({ lang, setLang, t }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '#work', label: t.navWork },
    { href: '#journey', label: t.navJourney },
    { href: '#experience', label: t.navExperience },
    { href: '#about', label: t.navAbout },
    { href: '#contact', label: t.navContact },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-[#0d0d0d]/80 backdrop-blur-xl border-b border-white/10 transition-colors duration-200">
      <div className="w-[min(calc(100%-48px),1440px)] mx-auto min-h-[72px] flex items-center justify-between gap-6">
        
        {/* Logo */}
        <a 
          href="#" 
          data-cursor="magnetic"
          className="font-extrabold text-[14px] tracking-[-0.02em] uppercase text-white hover:opacity-80 transition-opacity flex-shrink-0 flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span>ANTONIO RIYANTO</span>
        </a>

        {/* Desktop Nav Links & Controls */}
        <div className="flex items-center gap-6 lg:gap-8">
          
          <div className="hidden md:flex items-center gap-8 text-[13px] font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-cursor="magnetic"
                className="relative py-1 text-[#8e8e8e] hover:text-white transition-colors group"
              >
                {link.label}
                <span className="absolute left-0 right-full bottom-0 h-[1.5px] bg-white transition-all duration-300 ease-luxury group-hover:right-0" />
              </a>
            ))}
          </div>

          {/* Language Switch Capsule */}
          <div 
            className="flex items-center p-[3px] bg-white/[0.04] border border-white/10 rounded-full backdrop-blur-md shadow-sm"
            role="group"
            aria-label="Language selection"
          >
            <button
              type="button"
              data-cursor="magnetic"
              onClick={() => setLang('en')}
              className={`min-w-[36px] h-7 px-2.5 rounded-full text-[10px] font-mono font-extrabold tracking-[0.08em] transition-all duration-200 ${
                lang === 'en'
                  ? 'bg-white text-black shadow-md'
                  : 'text-[#8e8e8e] hover:text-white'
              }`}
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
            <button
              type="button"
              data-cursor="magnetic"
              onClick={() => setLang('id')}
              className={`min-w-[36px] h-7 px-2.5 rounded-full text-[10px] font-mono font-extrabold tracking-[0.08em] transition-all duration-200 ${
                lang === 'id'
                  ? 'bg-white text-black shadow-md'
                  : 'text-[#8e8e8e] hover:text-white'
              }`}
              aria-pressed={lang === 'id'}
            >
              ID
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 border border-white/20 rounded-full gap-1 p-2 bg-white/5"
            aria-label="Toggle navigation menu"
          >
            <span className={`w-4 h-[1.5px] bg-white transition-transform duration-200 ${mobileMenuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
            <span className={`w-4 h-[1.5px] bg-white transition-transform duration-200 ${mobileMenuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0d0d0d]/95 backdrop-blur-2xl px-6 py-4 flex flex-col gap-3 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 text-[14px] font-semibold text-[#fafafa] border-b border-white/10"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
````

## File: src/components/SelectedWork.jsx
````javascript
import React from 'react'

export default function SelectedWork({ t }) {
  const projects = [
    {
      title: 'Watch Club Retail Campaign',
      tags: 'Campaign · Retail · Print · Execution',
      placeholder: t.placeholderFeatured,
      size: 'large', // span 8
      poster: 'images/retail-execution-cover.webp',
      video: 'videos/retail-execution.mp4',
    },
    {
      title: 'Brand Identity Project',
      tags: 'Branding · Graphic Design',
      placeholder: t.placeholderBrand,
      size: 'medium', // span 4
      poster: 'images/creative-design-cover.webp',
      video: 'videos/creative-design.mp4',
    },
    {
      title: 'Digital Campaign',
      tags: 'Social · Content · Digital',
      placeholder: t.placeholderSocial,
      size: 'medium', // span 4
      poster: 'images/content-digital-cover.webp',
      video: 'videos/content-digital.mp4',
    },
    {
      title: 'Retail Experience',
      tags: 'POSM · Print · Production',
      placeholder: t.placeholderRetail,
      size: 'half', // span 6
      poster: 'images/vendor-production-cover.webp',
      video: 'videos/vendor-production.mp4',
    },
    {
      title: 'Digital Experience',
      tags: 'Web · UI/UX · Technology',
      placeholder: t.placeholderWeb,
      size: 'half', // span 6
      poster: 'images/web-technology-cover.webp',
      video: 'videos/web-technology.mp4',
    },
  ]

  const getColSpanClass = (size) => {
    switch (size) {
      case 'large':
        return 'col-span-12 lg:col-span-8 min-h-[440px] sm:min-h-[540px] lg:min-h-[600px]'
      case 'medium':
        return 'col-span-12 lg:col-span-4 min-h-[380px] sm:min-h-[440px]'
      case 'half':
        return 'col-span-12 lg:col-span-6 min-h-[400px] sm:min-h-[460px]'
      default:
        return 'col-span-12 min-h-[380px]'
    }
  }

  const handleMouseEnter = (proj) => {
    window.dispatchEvent(
      new CustomEvent('cursor-preview', {
        detail: {
          active: true,
          title: proj.title,
          category: proj.tags,
          image: proj.poster,
          video: proj.video,
        },
      })
    )
  }

  const handleMouseLeave = (e) => {
    window.dispatchEvent(
      new CustomEvent('cursor-preview', {
        detail: { active: false },
      })
    )
    const card = e.currentTarget
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)'
  }

  const handleMouseMove = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    // Subtle 3D tilt: max 6deg
    const rotX = -y * 6
    const rotY = x * 6
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`

    card.style.setProperty('--card-mouse-x', `${e.clientX - rect.left}px`)
    card.style.setProperty('--card-mouse-y', `${e.clientY - rect.top}px`)
  }

  return (
    <section className="py-24 sm:py-32 border-t border-white/10 bg-canvas relative" id="work">
      <div className="w-[min(calc(100%-48px),1440px)] mx-auto">
        
        {/* Header */}
        <div className="mb-14 sm:mb-16">
          <span className="block mb-5 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
            {t.workEyebrow}
          </span>

          <h2 className="max-w-[1050px] mb-8 text-[clamp(36px,6.5vw,92px)] font-black leading-[0.95] tracking-[-0.045em] text-[#fafafa]">
            {t.workTitle}
          </h2>
          <p className="max-w-[720px] text-[#8e8e8e] text-[17px] sm:text-[19px] leading-[1.6]">
            {t.workIntro}
          </p>
        </div>

        {/* 12-Column Responsive Work Grid (Deep Charcoal Reskin + 3D Tilt) */}
        <div className="grid grid-cols-12 gap-5">
          {projects.map((proj, idx) => (
            <article
              key={idx}
              onMouseEnter={() => handleMouseEnter(proj)}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
              data-cursor="magnetic"
              data-preview-title={proj.title}
              data-preview-category={proj.tags}
              data-preview-image={proj.poster}
              data-preview-video={proj.video}
              style={{ transformStyle: 'preserve-3d' }}
              className={`group relative p-6 sm:p-8 flex flex-col justify-between bg-[#141414]/80 border border-white/10 rounded-2xl backdrop-blur-xl transition-[border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white/30 hover:shadow-[0_25px_60px_rgba(0,0,0,0.7)] ${getColSpanClass(
                proj.size
              )}`}
            >
              {/* Card Specular Light Sheen */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                style={{
                  background:
                    'radial-gradient(400px circle at var(--card-mouse-x, -500px) var(--card-mouse-y, -500px), rgba(255,255,255,0.07), transparent 60%)',
                }}
              />

              {/* Media Preview Box (Hover Scale & Specular Light) */}
              <div className="flex-1 w-full grid place-items-center bg-gradient-to-br from-[#1c1c1c] via-[#141414] to-[#0d0d0d] border border-white/[0.06] rounded-xl mb-6 p-6 relative overflow-hidden group-hover:border-white/20 transition-all duration-300 z-10">
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
                
                {/* Scaled Inner Preview Container */}
                <div className="text-center relative z-10 transform group-hover:scale-[1.04] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/50 group-hover:border-white/60 group-hover:text-white transition-colors">
                    <span className="font-mono text-xs font-bold">0{idx + 1}</span>
                  </div>
                  <span className="text-white/90 text-[12px] font-bold tracking-[0.14em] uppercase block mb-1">
                    {proj.placeholder}
                  </span>
                  <span className="text-[11px] font-mono text-[#8e8e8e]">
                    [Project #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}]
                  </span>
                </div>
              </div>

              {/* Project Info Strip */}
              <div className="pt-5 border-t border-white/10 flex items-center justify-between gap-4 relative z-10">
                <div>
                  <strong className="block text-[19px] sm:text-[21px] font-bold text-[#fafafa] mb-1 group-hover:text-white transition-colors">
                    {proj.title}
                  </strong>
                  <span className="text-[#8e8e8e] text-[12px] sm:text-[13px]">
                    {proj.tags}
                  </span>
                </div>
                <div className="w-9 h-9 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-[14px] text-white/70 group-hover:text-black group-hover:bg-white group-hover:border-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200">
                  ↗
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
````

## File: src/components/TechSection.jsx
````javascript
import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import confetti from 'canvas-confetti'

export default function TechSection({ t }) {
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [result, setResult] = useState(null)
  const [terminalLog, setTerminalLog] = useState('> initializing_terminal... OK')

  const needleRef = useRef(null)

  const prizes = ['10% OFF', 'EXCLUSIVE MERCH', 'DOUBLE POINTS', 'FREE BATTERY', '5% VOUCHER', 'SPECIAL GIFT']

  // Live Terminal Log simulation
  useEffect(() => {
    const logs = [
      '> initializing_terminal... OK',
      '> audit_ready: TRUE',
      '> crypto_audit_log: SYNCED [40+ STORES]',
      '> verification_pipeline: ACTIVE',
      '> anti_tamper_token: VERIFIED',
    ]
    let logIdx = 0

    const interval = setInterval(() => {
      if (!spinning) {
        logIdx = (logIdx + 1) % logs.length
        setTerminalLog(logs[logIdx])
      }
    }, 3500)

    return () => clearInterval(interval)
  }, [spinning])

  const handleSpin = () => {
    if (spinning) return
    setSpinning(true)
    setResult(null)
    setTerminalLog('> INITIATING_RANDOM_SAMPLE... RUNNING')

    const randomAngle = 1440 + Math.floor(Math.random() * 360)
    const newRotation = rotation + randomAngle
    setRotation(newRotation)

    setTimeout(() => {
      setSpinning(false)
      const index = Math.floor(((newRotation % 360) / 360) * prizes.length)
      const prizeName = prizes[index]
      setResult(prizeName)
      setTerminalLog(`> PRIZE_VERIFIED: [${prizeName}] // RECORD_SAVED`)

      // Haptic Simulation Shake on needle snap
      if (needleRef.current) {
        gsap.fromTo(
          needleRef.current,
          { x: -3 },
          {
            x: 3,
            duration: 0.05,
            repeat: 7,
            yoyo: true,
            ease: 'sine.inOut',
            onComplete: () => {
              gsap.to(needleRef.current, { x: 0, duration: 0.1 })
            },
          }
        )
      }

      // High-End Monochromatic Luxury Confetti
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#ffffff', '#cccccc', '#999999', '#e5e5e5'],
          disableForReducedMotion: true,
        })
      } catch {
        // ignore if unsupported
      }
    }, 3000)
  }

  const tags = [
    'Product Concept',
    'UI/UX',
    'Business Logic',
    'AI-Assisted Development',
    'Retail Operations',
    '40+ Stores',
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
    <section className="py-24 sm:py-32 bg-[#0d0d0d] border-t border-white/10 relative" id="technology">
      <div className="w-[min(calc(100%-48px),1440px)] mx-auto">
        
        {/* Header */}
        <div className="mb-14 sm:mb-16">
          <span className="block mb-5 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
            {t.techEyebrow}
          </span>

          <h2
            className="max-w-[1050px] mb-8 text-[clamp(36px,6.5vw,92px)] font-black leading-[0.95] tracking-[-0.045em] text-[#fafafa]"
            dangerouslySetInnerHTML={{ __html: t.techTitle }}
          />
          <p className="max-w-[720px] text-[#8e8e8e] text-[17px] sm:text-[19px] leading-[1.6]">
            {t.techIntro}
          </p>
        </div>

        {/* Interactive Dark Bento Spotlight Panel */}
        <article
          onMouseMove={handleMouseMove}
          className="spotlight-card group relative grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] min-h-[560px] overflow-hidden bg-[#141414]/90 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-white/25"
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

          {/* Visual Side: Interactive Demo Mockup */}
          <div className="relative min-h-[420px] sm:min-h-[500px] bg-gradient-to-br from-[#181818] via-[#121212] to-[#0d0d0d] p-6 sm:p-10 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden z-10">
            
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

            {/* Window chrome header with Live Terminal Log */}
            <div className="absolute top-5 left-5 right-5 flex items-center justify-between text-[11px] font-mono text-[#8e8e8e] border-b border-white/10 pb-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              </div>
              <span className="text-[10px] font-mono font-medium tracking-wider text-accent-chrome/90 truncate max-w-[280px] sm:max-w-none">
                {terminalLog}
              </span>
            </div>

            {/* Interactive Luxury Wheel Preview */}
            <div className="flex flex-col items-center justify-center text-center mt-10">
              <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-full border-4 border-white/20 bg-[#161616] flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-md">
                
                {/* Spinning Dial Indicator */}
                <div
                  className="absolute inset-0 rounded-full flex items-center justify-center transition-transform duration-[3000ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  {prizes.map((p, i) => (
                    <div
                      key={i}
                      className="absolute top-3 text-[9px] font-mono font-bold text-white uppercase tracking-tighter"
                      style={{
                        transform: `rotate(${(360 / prizes.length) * i}deg) translateY(6px)`,
                        transformOrigin: '50% 102px',
                      }}
                    >
                      {p}
                    </div>
                  ))}
                  <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center text-[12px] font-bold shadow-md">
                    ★
                  </div>
                </div>

                {/* Center Pointer Needle with Haptic Simulation Shake */}
                <div
                  ref={needleRef}
                  className="absolute -top-3.5 z-20 w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-t-[16px] border-t-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)] will-change-transform"
                />
              </div>

              {/* Spin Trigger Button */}
              <button
                type="button"
                onClick={handleSpin}
                disabled={spinning}
                data-cursor="magnetic"
                className="mt-7 px-7 py-3 bg-white text-black rounded-full text-[12px] font-bold uppercase tracking-wider hover:bg-neutral-200 disabled:opacity-50 transition-all duration-200 shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:scale-105 active:scale-95"
              >
                {spinning ? 'SPINNING...' : 'TRY DEMO SPIN'}
              </button>

              {result && (
                <div className="mt-4 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-[12px] font-mono font-bold text-white backdrop-blur-md animate-bounce shadow-lg">
                  🎉 RESULT: {result}
                </div>
              )}
            </div>

            <div className="absolute bottom-3 text-[10px] text-[#6e6e6a] font-mono">
              Designed for touch kiosks & mobile store terminals
            </div>
          </div>

          {/* Copy Side */}
          <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between relative z-10">
            <div>
              <span className="inline-block mb-4 text-[#8e8e8e] text-[11px] font-mono font-bold tracking-[0.15em] uppercase">
                {t.internalSystem}
              </span>

              <h3 className="mb-5 text-[clamp(28px,3.8vw,52px)] font-black leading-tight text-[#fafafa]">
                Watch Club Lucky Spin
              </h3>

              <p className="text-[#8e8e8e] text-[16px] sm:text-[18px] leading-relaxed mb-8">
                {t.luckySpinCopy}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 border border-white/10 rounded-full text-[12px] font-medium text-white/80 bg-white/[0.03] backdrop-blur-sm"
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
````

## File: src/data/translations.js
````javascript
export const translations = {
  en: {
    // Navigation
    navWork: "Work",
    navJourney: "Journey",
    navExperience: "Experience",
    navAbout: "About",
    navContact: "Contact",

    // Hero
    heroEyebrow: "Creative × Digital × Retail × Technology",
    heroTitlePart1: "CREATIVE",
    heroTitlePart2: "ALL-ROUNDER.",
    heroCopy: "I connect creative thinking, digital solutions and real-world execution — taking ideas from concept to something people can actually use.",
    exploreWork: "Explore My Work ↓",
    downloadCV: "Download CV",

    // Metrics
    metricStores: "Retail Stores Supported",
    metricExecution: "Idea → Execution",
    metricClients: "Client Brands — Agency Experience",
    metricMulti: "Creative · Digital · Ops · Tech",

    // 01 / What I Actually Do (Capabilities)
    whatEyebrow: "01 / What I Actually Do",
    whatTitle: "More Than Making<br />Things Look Good.",
    whatIntro: "From visual communication to real-world execution — each discipline represents work I actually handle, build and deliver.",
    catCreative: "Creative",
    catDigital: "Digital",
    catRetail: "Retail",
    catProduction: "Production",
    catTechnology: "Technology",
    catOwnership: "Ownership",
    creativeTitle: "Creative<br />Design.",
    creativeCopy: "Campaigns, graphic design, POSM, print, brand adaptation and visual communication.",
    contentTitle: "Content &<br />Digital.",
    contentCopy: "Social content, digital assets, motion, video and multi-platform creative execution.",
    retailTitle: "Retail<br />Execution.",
    retailCopy: "Translating Head Office requirements into real implementation across 40+ retail locations.",
    vendorTitle: "Vendor &<br />Production.",
    vendorCopy: "Working with print vendors, web vendors and suppliers from production preparation through final implementation.",
    webTitle: "Web &<br />Technology.",
    webCopy: "Web design, UI/UX, internal applications, AI-assisted development and troubleshooting for real operational needs.",
    ownershipTitle: "Project<br />Ownership.",
    ownershipCopy: "From brief and stakeholder coordination to execution, follow-up, problem solving and management reporting.",
    selectedWork: "SELECTED WORK",
    digitalWork: "DIGITAL WORK",
    storesLabel: "40+ STORES",
    nationwide: "Nationwide Execution",
    fileReality: "FROM FILE TO REALITY",
    digitalSolutions: "DIGITAL SOLUTIONS",
    endToEnd: "END-TO-END",
    viewWork: "View Work ↗",
    explore: "Explore ↗",
    viewSystems: "View Systems ↗",
    viewCase: "View Case Study ↗",

    // 02 / Selected Work
    workEyebrow: "02 / Selected Work",
    workTitle: "Work Across Different Disciplines.",
    workIntro: "A selection of work across campaign, branding, retail, print, digital and web.",
    placeholderFeatured: "FEATURED PROJECT IMAGE",
    placeholderBrand: "BRANDING PROJECT",
    placeholderSocial: "SOCIAL PROJECT",
    placeholderRetail: "PRINT / RETAIL PROJECT",
    placeholderWeb: "WEB PROJECT",

    // 03 / Career Journey
    journeyEyebrow: "03 / Career Journey",
    journeyTitle: "From Designer to<br />Creative All-Rounder.",
    journeyIntro: "Every role added a new layer to how I work — from visual execution and agency experience to client communication, digital, retail operations, technology and end-to-end project ownership.",
    liberatesEvolution: "Learning & Execution",
    liberatesCopy: "Built my foundation in visual execution while working on social media content, copywriting and day-to-day creative needs.",
    mindoEvolution: "Agency & Client Work",
    mindoCopy: "Expanded from individual design execution into a fast-paced agency environment, adapting creative work across more than 20 client brands.",
    rataEvolution: "Client & Brand Thinking",
    rataCopy: "Started working closer to clients and their business objectives, connecting creative decisions with branding, marketing and communication needs.",
    petmuEvolution: "Digital Expansion",
    petmuCopy: "Expanded beyond static design into content, social media, motion, video and web — including designing and developing web experiences with HTML and CSS.",
    watchEvolution: "End-to-End Creative Operations",
    watchCopy: "My role evolved beyond creative execution into connecting design, production, vendors, digital solutions, retail operations and management across 40+ stores.",
    now: "NOW",

    // 04 / Featured Experience (Watch Club)
    experienceEyebrow: "04 / Featured Experience",
    experienceIntro: "Beyond design — connecting creative execution, production, vendors, Head Office, management and retail implementation across a nationwide store network.",
    retailLocations: "Retail Locations Supported",
    flowCreative: "Creative",
    flowCreativeCopy: "Brief → Concept → Design → Artwork",
    flowProduction: "Production",
    flowProductionCopy: "Specs → Material → Preparation",
    flowVendor: "Vendor",
    flowVendorCopy: "Briefing → Revision → Production",
    flowStores: "40+ Stores",
    flowStoresCopy: "Distribution → Instruction → Execution",
    flowMonitoring: "Monitoring",
    flowMonitoringCopy: "Follow-up → Issues → Completion",
    flowManagement: "Management",
    flowManagementCopy: "Progress → Result → Reporting",
    respCreative: "Creative & Design",
    respRetail: "Retail Operations",
    respVendor: "Vendor & Production",
    respDigital: "Digital & Technology",
    respOwnership: "Project Ownership",
    respManagement: "Management",
    collaboration: "Cross-Functional Collaboration",
    collaborationTitle: "Working Across Different Levels.",
    gmCopy: "Requirements, progress, issues and result reporting.",
    amCopy: "Retail requirements and operational coordination.",
    storeCopy: "Campaign execution, distribution and implementation.",
    vendorStakeholderCopy: "Briefing, revision, execution and delivery.",
    supplierCopy: "Supporting materials and external project coordination.",

    // 05 / Case Studies
    caseEyebrow: "05 / Case Studies",
    caseTitle: "Not Just What I Made.<br />How I Solved It.",
    caseIntro: "Selected projects where the process, coordination and problem solving matter as much as the final visual.",
    caseRetail: "Retail Campaign Rollout",
    casePrint: "Print & Vendor Execution",
    caseWorkflow: "Digital Workflow Improvement",

    // 06 / Creative Archive
    archiveEyebrow: "06 / Creative Archive",
    archiveTitle: "The Other Things I Make.",
    archiveIntro: "Selected work and explorations from agency, freelance, corporate and personal projects.",
    all: "All",

    // 07 / Web & Technology
    techEyebrow: "07 / Web & Technology",
    techTitle: "I Don't Only Design.<br />I Build Solutions.",
    techIntro: "When an operational problem needs more than a visual solution, I explore digital tools, UI/UX and AI-assisted development.",
    appScreenshot: "APPLICATION / UI SCREENSHOT",
    internalSystem: "Internal Retail System",
    luckySpinCopy: "A digital solution designed around real retail operations and multi-store usage.",

    // 08 / Capability Map
    mapEyebrow: "08 / Capability Map",
    mapTitle: "What I Can Handle.",
    operations: "Operations",
    problemSolving: "Problem Solving",

    // 09 / About
    aboutEyebrow: "09 / About",
    aboutStatement: "I work between creative thinking, execution and problem solving — wherever the project needs me.",
    background: "BACKGROUND",
    backgroundCopy: "Visual Communication Design — Bachelor's Degree",
    education: "EDUCATION",
    educationPlace: "STSRD VISI INDONESIA, Yogyakarta",
    experienceLabel: "EXPERIENCE",
    aboutExperience: "Agency, freelance, digital, corporate retail and technology-driven creative projects.",
    creativeTools: "CREATIVE TOOLS",
    creativeToolsCopy: "Adobe Photoshop, Illustrator, InDesign, Premiere Pro and After Effects.",
    digitalSkills: "Web design, HTML/CSS, UI/UX, AI-assisted development and digital prototyping.",

    // Personality / Jack of All Trades
    oneMoreThing: "One More Thing",
    jackTitle: "Jack of All Trades.",
    jackCopy1: "Design when it needs designing.<br />Coordinate when it needs coordinating.<br />Build when a tool doesn't exist.<br />Solve when something breaks.",
    jackHighlight: "Creative All-Rounder by profession.<br />Jack of All Trades by nature.",

    // Contact & Footer
    contactEyebrow: "Let's Work Together",
    contactTitle: "Have a problem that needs a creative solution?",
    emailMe: "Email Me",
    whatsApp: "WhatsApp",
    linkedIn: "LinkedIn",
    footerCopyright: "© Antonio Riyanto",
    footerRole: "Creative All-Rounder · Jakarta, Indonesia"
  },

  id: {
    // Navigation
    navWork: "Karya",
    navJourney: "Perjalanan",
    navExperience: "Pengalaman",
    navAbout: "Tentang",
    navContact: "Kontak",

    // Hero
    heroEyebrow: "Creative × Digital × Retail × Technology",
    heroTitlePart1: "CREATIVE",
    heroTitlePart2: "ALL-ROUNDER.",
    heroCopy: "Saya menghubungkan ide kreatif, solusi digital, dan eksekusi di lapangan — membawa sebuah ide dari konsep hingga menjadi sesuatu yang benar-benar bisa digunakan.",
    exploreWork: "Lihat Karya Saya ↓",
    downloadCV: "Download CV",

    // Metrics
    metricStores: "Toko Retail yang Didukung",
    metricExecution: "Ide → Eksekusi",
    metricClients: "Brand Client — Pengalaman Agency",
    metricMulti: "Creative · Digital · Ops · Tech",

    // 01 / What I Actually Do (Capabilities)
    whatEyebrow: "01 / Yang Saya Kerjakan",
    whatTitle: "Lebih dari Sekadar<br />Membuat Visual yang Bagus.",
    whatIntro: "Dari komunikasi visual hingga eksekusi di lapangan — setiap bidang di bawah ini merupakan bagian dari pekerjaan yang benar-benar saya tangani, kembangkan, dan selesaikan.",
    catCreative: "Creative",
    catDigital: "Digital",
    catRetail: "Retail",
    catProduction: "Production",
    catTechnology: "Technology",
    catOwnership: "Ownership",
    creativeTitle: "Creative<br />Design.",
    creativeCopy: "Menangani campaign, desain grafis, POSM, kebutuhan print, adaptasi brand, hingga berbagai kebutuhan komunikasi visual.",
    contentTitle: "Content &<br />Digital.",
    contentCopy: "Mengembangkan konten social media, aset digital, motion, video, dan kebutuhan kreatif untuk berbagai platform.",
    retailTitle: "Retail<br />Execution.",
    retailCopy: "Menerjemahkan kebutuhan dari Head Office menjadi eksekusi nyata yang dapat diterapkan secara konsisten di 40+ toko retail.",
    vendorTitle: "Vendor &<br />Production.",
    vendorCopy: "Berkoordinasi dengan vendor print, web, dan supplier mulai dari persiapan produksi, revisi, hingga implementasi dan hasil akhir.",
    webTitle: "Web &<br />Technology.",
    webCopy: "Merancang web, UI/UX, dan aplikasi internal serta memanfaatkan AI-assisted development untuk membantu menyelesaikan kebutuhan operasional.",
    ownershipTitle: "Project<br />Ownership.",
    ownershipCopy: "Menangani project dari brief, perencanaan, koordinasi stakeholder, eksekusi, problem solving, follow-up, hingga reporting ke management.",
    selectedWork: "KARYA PILIHAN",
    digitalWork: "KARYA DIGITAL",
    storesLabel: "40+ TOKO",
    nationwide: "Eksekusi Multi-Cabang",
    fileReality: "DARI FILE KE HASIL NYATA",
    digitalSolutions: "SOLUSI DIGITAL",
    endToEnd: "END-TO-END",
    viewWork: "Lihat Karya ↗",
    explore: "Lihat Detail ↗",
    viewSystems: "Lihat Sistem ↗",
    viewCase: "Lihat Case Study ↗",

    // 02 / Selected Work
    workEyebrow: "02 / Karya Pilihan",
    workTitle: "Berbagai Karya dari Beragam Disiplin.",
    workIntro: "Pilihan karya dari berbagai bidang — mulai dari campaign, branding, retail, print, digital hingga web.",
    placeholderFeatured: "GAMBAR FEATURED PROJECT",
    placeholderBrand: "PROJECT BRANDING",
    placeholderSocial: "PROJECT SOCIAL MEDIA",
    placeholderRetail: "PROJECT PRINT / RETAIL",
    placeholderWeb: "PROJECT WEB",

    // 03 / Career Journey
    journeyEyebrow: "03 / Perjalanan Karier",
    journeyTitle: "From Designer to<br />Creative All-Rounder.",
    journeyIntro: "Setiap tempat saya bekerja menambahkan kemampuan baru — mulai dari eksekusi visual dan pengalaman agency, menangani client, masuk lebih jauh ke dunia digital, hingga retail operations, technology, dan project secara end-to-end.",
    liberatesEvolution: "Fondasi & Eksekusi",
    liberatesCopy: "Membangun fondasi saya sebagai designer melalui berbagai kebutuhan creative harian, mulai dari social media content, copywriting hingga eksekusi visual.",
    mindoEvolution: "Agency & Client Work",
    mindoCopy: "Berkembang dari eksekusi desain individual ke lingkungan agency yang cepat dan dinamis, sekaligus beradaptasi dengan kebutuhan creative dari lebih dari 20 brand client.",
    rataEvolution: "Client & Brand Thinking",
    rataCopy: "Mulai bekerja lebih dekat dengan client dan memahami tujuan bisnis mereka, sehingga keputusan creative tidak hanya soal visual tetapi juga branding, marketing, dan komunikasi.",
    petmuEvolution: "Ekspansi ke Digital",
    petmuCopy: "Memperluas kemampuan dari static design ke content, social media, motion, video, dan web — termasuk merancang serta mengembangkan pengalaman web menggunakan HTML dan CSS.",
    watchEvolution: "End-to-End Creative Operations",
    watchCopy: "Peran saya berkembang jauh melampaui eksekusi creative — menghubungkan desain, produksi, vendor, solusi digital, operasional retail, dan management di jaringan 40+ toko.",
    now: "SEKARANG",

    // 04 / Featured Experience (Watch Club)
    experienceEyebrow: "04 / Pengalaman Utama",
    experienceIntro: "Lebih dari sekadar desain — saya menghubungkan proses creative, produksi, vendor, Head Office, management, hingga implementasi di jaringan toko retail.",
    retailLocations: "Lokasi Retail yang Didukung",
    flowCreative: "Creative",
    flowCreativeCopy: "Brief → Konsep → Desain → Artwork",
    flowProduction: "Production",
    flowProductionCopy: "Spesifikasi → Material → Persiapan",
    flowVendor: "Vendor",
    flowVendorCopy: "Briefing → Revisi → Produksi",
    flowStores: "40+ Toko",
    flowStoresCopy: "Distribusi → Instruksi → Eksekusi",
    flowMonitoring: "Monitoring",
    flowMonitoringCopy: "Follow-up → Kendala → Penyelesaian",
    flowManagement: "Management",
    flowManagementCopy: "Progress → Hasil → Reporting",
    respCreative: "Creative & Design",
    respRetail: "Retail Operations",
    respVendor: "Vendor & Production",
    respDigital: "Digital & Technology",
    respOwnership: "Project Ownership",
    respManagement: "Management",
    collaboration: "Kolaborasi Lintas Fungsi",
    collaborationTitle: "Bekerja dengan Berbagai Level dan Tim.",
    gmCopy: "Menyampaikan kebutuhan project, progress, kendala, hingga hasil kepada General Manager.",
    amCopy: "Berkoordinasi terkait kebutuhan area, implementasi retail, dan kebutuhan operasional.",
    storeCopy: "Mendukung distribusi, implementasi campaign, komunikasi, dan eksekusi di toko.",
    vendorStakeholderCopy: "Menangani briefing, revisi, kebutuhan teknis, produksi, hingga delivery.",
    supplierCopy: "Berkoordinasi terkait material pendukung dan kebutuhan project dengan partner eksternal.",

    // 05 / Case Studies
    caseEyebrow: "05 / Case Studies",
    caseTitle: "Bukan Hanya Apa yang Saya Buat.<br />Tapi Bagaimana Saya Menyelesaikannya.",
    caseIntro: "Pilihan project yang menunjukkan bahwa proses, koordinasi, dan problem solving sama pentingnya dengan hasil visual akhirnya.",
    caseRetail: "Implementasi Retail Campaign",
    casePrint: "Eksekusi Print & Vendor",
    caseWorkflow: "Digital Workflow Improvement",

    // 06 / Creative Archive
    archiveEyebrow: "06 / Creative Archive",
    archiveTitle: "Karya Lain yang Saya Buat.",
    archiveIntro: "Kumpulan karya dan eksplorasi dari pengalaman agency, freelance, corporate, hingga personal project.",
    all: "Semua",

    // 07 / Web & Technology
    techEyebrow: "07 / Web & Technology",
    techTitle: "Saya Tidak Hanya Mendesain.<br />Saya Juga Membangun Solusi.",
    techIntro: "Ketika sebuah masalah operasional membutuhkan lebih dari sekadar solusi visual, saya mengeksplorasi digital tools, UI/UX, dan AI-assisted development untuk menyelesaikannya.",
    appScreenshot: "SCREENSHOT APLIKASI / UI",
    internalSystem: "Internal Retail System",
    luckySpinCopy: "Solusi digital yang dirancang berdasarkan kebutuhan operasional retail nyata dan digunakan dalam lingkungan multi-store.",

    // 08 / Capability Map
    mapEyebrow: "08 / Peta Kemampuan",
    mapTitle: "Hal yang Bisa Saya Tangani.",
    operations: "Operations",
    problemSolving: "Problem Solving",

    // 09 / About
    aboutEyebrow: "09 / Tentang Saya",
    aboutStatement: "Saya bekerja di antara creative thinking, eksekusi, dan problem solving — menyesuaikan diri dengan apa pun yang dibutuhkan sebuah project.",
    background: "LATAR BELAKANG",
    backgroundCopy: "Visual Communication Design — Bachelor's Degree",
    education: "PENDIDIKAN",
    educationPlace: "STSRD VISI INDONESIA, Yogyakarta",
    experienceLabel: "PENGALAMAN",
    aboutExperience: "Agency, freelance, digital, corporate retail, hingga berbagai creative project berbasis technology.",
    creativeTools: "CREATIVE TOOLS",
    creativeToolsCopy: "Adobe Photoshop, Illustrator, InDesign, Premiere Pro, dan After Effects.",
    digitalSkills: "Web design, HTML/CSS, UI/UX, AI-assisted development, dan digital prototyping.",

    // Personality / Jack of All Trades
    oneMoreThing: "Satu Hal Lagi",
    jackTitle: "Jack of All Trades.",
    jackCopy1: "Mendesain ketika project membutuhkan desain.<br />Berkoordinasi ketika project membutuhkan koordinasi.<br />Membangun ketika tools yang dibutuhkan belum tersedia.<br />Mencari solusi ketika sesuatu tidak berjalan sebagaimana mestinya.",
    jackHighlight: "Creative All-Rounder by profession.<br />Jack of All Trades by nature.",

    // Contact & Footer
    contactEyebrow: "Mari Berkolaborasi",
    contactTitle: "Punya masalah yang membutuhkan solusi creative?",
    emailMe: "Hubungi via Email",
    whatsApp: "WhatsApp",
    linkedIn: "LinkedIn",
    footerCopyright: "© Antonio Riyanto",
    footerRole: "Creative All-Rounder · Jakarta, Indonesia"
  }
};
````

## File: src/App.jsx
````javascript
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
    const tId = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 120)
    return () => clearTimeout(tId)
  }, [lang])

  const t = translations[lang] || translations.en

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#fafafa] font-sans antialiased selection:bg-[#fafafa] selection:text-[#0d0d0d] relative overflow-x-hidden">
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
````

## File: src/index.css
````css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --bg: #0d0d0d;
    --canvas: #0d0d0d;
    --canvas-subtle: #121212;
    --surface: #141414;
    --surface-muted: #1c1c1c;
    --surface-card: rgba(20, 20, 20, 0.75);
    --surface-glass: rgba(255, 255, 255, 0.04);
    --border-glass: rgba(255, 255, 255, 0.10);
    --border-glow: rgba(255, 255, 255, 0.25);
    --text: #fafafa;
    --text-primary: #fafafa;
    --muted: #8e8e8e;
    --text-muted: #8e8e8e;
    --line: rgba(255, 255, 255, 0.10);
    --accent-chrome: #e5e5e5;

    --dark: #0d0d0d;
    --dark-soft: #141414;
    --dark-line: rgba(255, 255, 255, 0.10);
    --dark-muted: #8e8e8e;

    --radius: 16px;
    --radius-sm: 8px;
    --max: 1440px;
    --ease: cubic-bezier(0.16, 1, 0.3, 1);
    --ease-luxury: cubic-bezier(0.23, 1, 0.32, 1);
  }

  html {
    scroll-behavior: auto;
    background-color: #0d0d0d;
    color: #fafafa;
  }

  /* Lenis CSS standard recommended rules */
  html.lenis, html.lenis body {
    height: auto;
  }

  .lenis.lenis-smooth {
    scroll-behavior: auto !important;
  }

  .lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
  }

  .lenis.lenis-stopped {
    overflow: hidden;
  }

  .lenis.lenis-scrolling iframe {
    pointer-events: none;
  }

  body {
    background-color: var(--bg);
    color: var(--text);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }
}

/* Scroll Word Reveal Animation Classes */
.word-wrap {
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
  padding-bottom: 3px;
  margin-right: 0.28em;
}

.word {
  display: inline-block;
  transform: translateY(110%);
  opacity: 0;
  will-change: transform, opacity;
}

/* Spotlight Bento Box utility */
.spotlight-card {
  position: relative;
  background-color: rgba(20, 20, 20, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.spotlight-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: radial-gradient(
    600px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px),
    rgba(255, 255, 255, 0.18),
    transparent 40%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 1;
}

.spotlight-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    600px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px),
    rgba(255, 255, 255, 0.04),
    transparent 40%
  );
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 0;
}

.spotlight-card:hover::before,
.spotlight-card:hover::after {
  opacity: 1;
}

/* Dark Mode Technical Scrollbar */
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: #0d0d0d;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.35);
}

/* Perspective & 3D transformations */
.perspective-1000 {
  perspective: 1000px;
}
.transform-style-3d {
  transform-style: preserve-3d;
}

/* Circuit Pulse on Workflow Arrows */
@keyframes circuitPulse {
  0%, 100% {
    opacity: 0.25;
    transform: translateX(0);
    color: rgba(255, 255, 255, 0.3);
  }
  50% {
    opacity: 1;
    transform: translateX(4px);
    color: #ffffff;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.85);
  }
}

.circuit-pulse-arrow {
  animation: circuitPulse 2.4s infinite ease-in-out;
}
````

## File: src/main.jsx
````javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
````

## File: index.html
````html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0d0d0d" />
    <title>Antonio Riyanto — Creative All-Rounder</title>
    <meta
      name="description"
      content="Portfolio of Antonio Riyanto — Creative All-Rounder working across creative design, digital, retail operations, production and technology."
    />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90' font-weight='900' fill='white'>AR</text></svg>" />
  </head>
  <body class="bg-[#0d0d0d] text-[#fafafa] font-sans antialiased selection:bg-white selection:text-black overflow-x-hidden">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
````

## File: package.json
````json
{
  "name": "antonio-riyanto-portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@studio-freight/lenis": "^1.0.42",
    "@types/three": "^0.186.0",
    "canvas-confetti": "^1.9.4",
    "clsx": "^2.1.1",
    "gsap": "^3.15.0",
    "lenis": "^1.3.27",
    "lucide-react": "^0.475.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^3.7.0",
    "three": "^0.186.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "vite": "^6.2.0"
  }
}
````

## File: postcss.config.js
````javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
````

## File: README.md
````markdown
# Antonio Riyanto — Creative All-Rounder Portfolio (React + Vite + Tailwind CSS)

Portofolio web modular dan modern berbasis **React (Vite)**, **Tailwind CSS**, dan **GSAP ScrollTrigger** berdasarkan desain dan profil "Creative All-Rounder" milik **Antonio Riyanto**.

---

## 🚀 Fitur Utama

- **Aesthetic "Brutalist / Technical Luxury"**:
  - Warna kanvas dominan off-white (`#f3f3ef`), permukaan kartu putih (`#ffffff`), serta section teknikal berlatar dark brutalist (`#141414`).
  - Border tipis presisi (`#cecec7` dan `#2c2c2c`), radius konsisten, serta tipografi tebal minimalis modern.
- **Dua Bahasa Reaktif (EN / ID)**:
  - Toggle bahasa instan di sticky navbar dengan state tersimpan di `localStorage`.
  - Kamus terjemahan lengkap di `src/data/translations.js`.
- **GSAP + ScrollTrigger Word Reveal Animation**:
  - Animasi pembacaan teks per kata (*word-by-word reveal*) pada section **Career Journey** saat discroll.
  - Lifecycle hook yang otomatis me-refresh posisi ScrollTrigger saat berganti bahasa.
- **Komponen Interaktif**:
  - *Navbar*: Sticky header dengan backdrop blur, hover underline effect, dan responsive drawer menu untuk mobile.
  - *Capabilities (What I Actually Do)*: 6 baris interaktif dengan showcase video / brutalist placeholder visual & badges.
  - *Selected Work*: Grid 12 kolom responsif (large, medium, half) dengan efek hover elevasi.
  - *Experience (Watch Club Indonesia)*: Alur kerja 6 tahap, matriks 6 tanggung jawab, dan peta kolaborasi stakeholder lintas fungsi.
  - *Case Studies*: Akordeon interaktif expandable menampilkan *The Challenge*, *The Solution*, dan *Real Impact*.
  - *Creative Archive*: Filter kategori interaktif (*All, Branding, Campaign, Social, Print, Retail, Motion, Digital, UI / Web*).
  - *Web & Technology*: Demo interaktif *Watch Club Lucky Spin* dengan simulator putaran dan kalkulasi probabilitas hadiah.
  - *Capability Map*: Matriks 5 pilar kemampuan teknis dan operasional.
  - *About & Jack of All Trades*: Statement filosofis dan detail latar belakang.
  - *Contact*: Tombol kontak cepat (Email, WhatsApp, LinkedIn) dan footer.
- **100% Responsif**: Disesuaikan untuk tampilan desktop ultra-wide, laptop, tablet, hingga layar smartphone.

---

## 📁 Struktur Folder Modular

```text
/
├── index.html                  # Entry point HTML untuk Vite
├── package.json                # Dependensi & skrip Vite/React/Tailwind/GSAP
├── vite.config.js              # Konfigurasi bundler Vite
├── tailwind.config.js          # Konfigurasi custom theme & warna brutalist
├── postcss.config.js           # Konfigurasi PostCSS
├── original-index.html         # Backup file statis awal
└── src/
    ├── main.jsx                # React root mount
    ├── App.jsx                 # App root & state bahasa global
    ├── index.css               # Direktif Tailwind CSS & utility GSAP
    ├── data/
    │   └── translations.js     # Kamus teks lengkap (EN & ID)
    └── components/
        ├── Navbar.jsx          # Header sticky, logo, navigasi, toggle EN/ID
        ├── Hero.jsx            # Hero section, title besar, copy, CTA, 4 metrik
        ├── Capabilities.jsx    # "What I Actually Do" 6 baris showcase
        ├── SelectedWork.jsx    # Grid karya pilihan (large/medium/half)
        ├── CareerJourney.jsx   # Timeline karier 5 tahap + GSAP ScrollTrigger
        ├── Experience.jsx      # Watch Club workflow, responsibility, stakeholder map
        ├── CaseStudies.jsx     # Daftar studi kasus interaktif & collapsible drawer
        ├── CreativeArchive.jsx # Arsip kreatif dengan filter kategori
        ├── TechSection.jsx     # Showcase kartu interaktif Lucky Spin
        ├── CapabilityMap.jsx   # Peta kemampuan 5 kolom
        ├── About.jsx           # Statement personal & detail latar belakang
        ├── JackOfAllTrades.jsx # Section kepribadian / quote penutup
        └── Contact.jsx         # Section kontak, email, social links, dan footer
```

---

## 🛠️ Cara Menjalankan Project

### 1. Menjalankan Server Pengembangan (Dev Mode)
```bash
npm run dev
```
Buka browser pada alamat yang ditampilkan di terminal (biasanya `http://localhost:5173`).

### 2. Membangun untuk Production (Build)
```bash
npm run build
```
Output build yang sudah dioptimalkan dan siap di-deploy ke Vercel/Netlify/GitHub Pages akan berada di folder `/dist`.

### 3. Menguji Hasil Build (Preview)
```bash
npm run preview
```
````

## File: tailwind.config.js
````javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Charcoal & Technical Luxury accents
        canvas: {
          DEFAULT: '#0d0d0d',
          subtle: '#121212',
          card: '#141414',
          elevated: '#1a1a1a',
        },
        'surface-card': 'rgba(20, 20, 20, 0.75)',
        'surface-glass': 'rgba(255, 255, 255, 0.04)',
        'border-glass': 'rgba(255, 255, 255, 0.10)',
        'border-glow': 'rgba(255, 255, 255, 0.25)',
        'text-primary': '#fafafa',
        'text-muted': '#8e8e8e',
        'accent-chrome': '#e5e5e5',

        // Unified dark luxury palette
        bg: '#0d0d0d',
        surface: '#141414',
        'surface-muted': '#1a1a1a',
        text: '#fafafa',
        muted: '#8e8e8e',
        line: 'rgba(255, 255, 255, 0.10)',
        dark: {
          DEFAULT: '#141414',
          soft: '#1c1c1c',
          line: '#2c2c2c',
          muted: '#8e8e8e',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      },
      transitionTimingFunction: {
        'brutal': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'luxury': 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      maxWidth: {
        'container': '1440px',
      },
      backdropBlur: {
        xs: '2px',
        xl: '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
````

## File: vite.config.js
````javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
````
`````

## File: tailwind.config.js
`````javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Charcoal & Technical Luxury accents
        canvas: {
          DEFAULT: '#0d0d0d',
          subtle: '#121212',
          card: '#141414',
          elevated: '#1a1a1a',
        },
        'surface-card': 'rgba(20, 20, 20, 0.75)',
        'surface-glass': 'rgba(255, 255, 255, 0.04)',
        'border-glass': 'rgba(255, 255, 255, 0.10)',
        'border-glow': 'rgba(255, 255, 255, 0.25)',
        'text-primary': '#fafafa',
        'text-muted': '#8e8e8e',
        'accent-chrome': '#e5e5e5',

        // Unified dark luxury palette
        bg: '#0d0d0d',
        surface: '#141414',
        'surface-muted': '#1a1a1a',
        text: '#fafafa',
        muted: '#8e8e8e',
        line: 'rgba(255, 255, 255, 0.10)',
        dark: {
          DEFAULT: '#141414',
          soft: '#1c1c1c',
          line: '#2c2c2c',
          muted: '#8e8e8e',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      },
      transitionTimingFunction: {
        'brutal': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'luxury': 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      maxWidth: {
        'container': '1440px',
      },
      backdropBlur: {
        xs: '2px',
        xl: '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
`````

## File: vite.config.js
`````javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
`````
