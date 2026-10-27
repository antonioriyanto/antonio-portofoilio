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
    <section ref={containerRef} className="py-24 sm:py-32 border-t border-white/10 bg-[#0d0d0d]/85 backdrop-blur-md relative" id="work">
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
