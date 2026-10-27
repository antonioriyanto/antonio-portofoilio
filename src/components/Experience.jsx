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
      className="py-24 sm:py-32 bg-[#0d0d0d]/85 text-white backdrop-blur-md border-t border-white/10 relative"
      id="experience"
    >
      <div className="w-[min(calc(100%-48px),1440px)] mx-auto">
        
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.5fr] gap-10 lg:gap-14 items-end pb-12 sm:pb-16 border-b border-white/10">
          <div>
            <span data-reveal-eyebrow className="block mb-5 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
              {t.experienceEyebrow}
            </span>

            <h2 
              data-reveal-title
              className="max-w-[1050px] mb-8 text-[clamp(36px,6.5vw,92px)] font-black leading-[0.95] tracking-[-0.045em] text-[#fafafa] text-specular-glint"
            >
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
                <h3 data-reveal-sub className="text-[19px] font-bold text-[#fafafa] mb-2 group-hover:text-white">
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
          <span data-reveal-eyebrow className="block mb-4 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase">
            {t.collaboration}
          </span>

          <h3 data-reveal-sub className="mb-10 text-[clamp(28px,3.5vw,50px)] font-black text-[#fafafa] leading-tight">
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
