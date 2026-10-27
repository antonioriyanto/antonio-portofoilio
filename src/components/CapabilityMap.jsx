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
    <section ref={containerRef} className="py-24 sm:py-32 border-t border-white/10 bg-[#0d0d0d]/85 backdrop-blur-md relative">
      <div className="w-[min(calc(100%-48px),1440px)] mx-auto">
        
        {/* Header */}
        <div className="mb-14 sm:mb-16">
          <span data-reveal-eyebrow className="block mb-5 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
            {t.mapEyebrow}
          </span>

          <h2 className="max-w-[1050px] text-[clamp(36px,6.5vw,84px)] font-black leading-[1.14] tracking-[-0.04em] text-[#fafafa]">
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
                <h3 data-reveal-sub className="mb-6 text-[20px] sm:text-[22px] font-black text-[#fafafa] group-hover:text-white transition-colors">
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
