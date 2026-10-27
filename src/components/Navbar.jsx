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
