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
    <section ref={containerRef} className="py-24 sm:py-32 border-t border-white/10 bg-[#0d0d0d]/85 backdrop-blur-md relative" id="archive">
      <div className="w-[min(calc(100%-48px),1440px)] mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <span data-reveal-eyebrow className="block mb-5 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
            {t.archiveEyebrow}
          </span>

          <h2 
            data-reveal-title
            className="max-w-[1050px] mb-8 text-[clamp(36px,6.5vw,92px)] font-black leading-[1.14] tracking-[-0.045em] text-[#fafafa] text-specular-glint"
          >
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
