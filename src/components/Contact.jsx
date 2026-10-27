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
