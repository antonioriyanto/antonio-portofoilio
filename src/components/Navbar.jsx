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
    <header className="fixed top-3 sm:top-5 inset-x-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
      <div className="w-full max-w-[1340px] flex items-center justify-between pointer-events-none">
        
        {/* Left Island: Compact Rounded Pill with Pulsing Logo */}
        <nav
          aria-label="Brand"
          className="pointer-events-auto relative h-12 sm:h-14 px-4 sm:px-5 rounded-full flex items-center bg-[#141414]/75 backdrop-blur-2xl border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.65)] hover:border-white/20 transition-all duration-300 after:absolute after:top-0 after:inset-x-4 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent"
        >
          <a
            href="#"
            data-cursor="magnetic"
            className="font-extrabold text-[12px] sm:text-[13px] tracking-[-0.02em] uppercase text-white hover:opacity-80 transition-opacity flex items-center gap-2.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="font-mono tracking-tight">ANTONIO RIYANTO</span>
          </a>
        </nav>

        {/* Right Island: Navigation Links & Language Switcher Pill */}
        <nav
          aria-label="Primary Navigation"
          className="pointer-events-auto relative h-12 sm:h-14 px-3.5 sm:px-5 rounded-full flex items-center gap-4 sm:gap-7 bg-[#141414]/75 backdrop-blur-2xl border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.65)] hover:border-white/20 transition-all duration-300 after:absolute after:top-0 after:inset-x-4 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent"
        >
          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-[13px] font-medium">
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
            className="flex items-center p-[2px] sm:p-[2.5px] bg-white/[0.04] border border-white/10 rounded-full backdrop-blur-md shadow-sm"
            role="group"
            aria-label="Language selection"
          >
            <button
              type="button"
              data-cursor="magnetic"
              onClick={() => setLang('en')}
              className={`min-w-[32px] sm:min-w-[34px] h-6 sm:h-[26px] px-2 rounded-full text-[10px] font-mono font-extrabold tracking-[0.08em] transition-all duration-200 ${
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
              className={`min-w-[32px] sm:min-w-[34px] h-6 sm:h-[26px] px-2 rounded-full text-[10px] font-mono font-extrabold tracking-[0.08em] transition-all duration-200 ${
                lang === 'id'
                  ? 'bg-white text-black shadow-md'
                  : 'text-[#8e8e8e] hover:text-white'
              }`}
              aria-pressed={lang === 'id'}
            >
              ID
            </button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 border border-white/20 rounded-full gap-1 p-2 bg-white/5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] cursor-pointer hover:border-white/40 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span
              className={`w-3.5 h-[1.5px] bg-white transition-transform duration-200 ${
                mobileMenuOpen ? 'rotate-45 translate-y-[3px]' : ''
              }`}
            />
            <span
              className={`w-3.5 h-[1.5px] bg-white transition-transform duration-200 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-[3px]' : ''
              }`}
            />
          </button>

          {/* Mobile Dropdown Menu Attached Below Right Island */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-[calc(100%+8px)] right-0 w-[240px] bg-[#141414]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-3 shadow-2xl flex flex-col gap-1 animate-fadeIn after:absolute after:top-0 after:inset-x-4 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 text-[13px] font-semibold text-[#fafafa] hover:bg-white/10 rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </nav>

      </div>
    </header>
  )
}
