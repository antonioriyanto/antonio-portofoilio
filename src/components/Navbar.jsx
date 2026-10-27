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
    <header className="fixed top-3 sm:top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto relative w-full max-w-[1240px] h-14 sm:h-16 px-5 sm:px-8 rounded-full sm:rounded-2xl flex items-center justify-between bg-[#141414]/70 backdrop-blur-2xl border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.65)] transition-all duration-300 after:absolute after:top-0 after:inset-x-6 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent">
        
        {/* Logo */}
        <a 
          href="#" 
          data-cursor="magnetic"
          className="font-extrabold text-[13px] sm:text-[14px] tracking-[-0.02em] uppercase text-white hover:opacity-80 transition-opacity flex-shrink-0 flex items-center gap-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
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
                className="relative py-1 text-[#8e8e8e] hover:text-white transition-colors group drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
              >
                {link.label}
                <span className="absolute left-0 right-full bottom-0 h-[1.5px] bg-white transition-all duration-300 ease-luxury group-hover:right-0" />
              </a>
            ))}
          </div>

          {/* Language Switch Capsule */}
          <div 
            className="flex items-center p-[2px] sm:p-[3px] bg-white/[0.04] border border-white/10 rounded-full backdrop-blur-md shadow-sm drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            role="group"
            aria-label="Language selection"
          >
            <button
              type="button"
              data-cursor="magnetic"
              onClick={() => setLang('en')}
              className={`min-w-[34px] sm:min-w-[36px] h-6 sm:h-7 px-2 sm:px-2.5 rounded-full text-[10px] font-mono font-extrabold tracking-[0.08em] transition-all duration-200 ${
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
              className={`min-w-[34px] sm:min-w-[36px] h-6 sm:h-7 px-2 sm:px-2.5 rounded-full text-[10px] font-mono font-extrabold tracking-[0.08em] transition-all duration-200 ${
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
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 sm:w-9 sm:h-9 border border-white/20 rounded-full gap-1 p-2 bg-white/5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <span className={`w-3.5 h-[1.5px] bg-white transition-transform duration-200 ${mobileMenuOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
            <span className={`w-3.5 h-[1.5px] bg-white transition-transform duration-200 ${mobileMenuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
          </button>
        </div>

        {/* Mobile Dropdown Attached Underneath the Capsule */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-[calc(100%+8px)] inset-x-0 bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col gap-2 animate-fadeIn after:absolute after:top-0 after:inset-x-4 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 text-[13px] font-semibold text-[#fafafa] hover:bg-white/5 rounded-xl transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}
