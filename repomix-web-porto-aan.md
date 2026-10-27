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
