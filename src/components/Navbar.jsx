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
    <header className="fixed top-4 sm:top-6 inset-x-0 z-50 pointer-events-none flex items-center justify-between px-6 sm:px-12 max-w-[1440px] mx-auto">
      {/* Island 1 (Brand Pill - Left) */}
      <a
        href="#"
        data-cursor="magnetic"
        className="pointer-events-auto h-11 sm:h-12 px-5 rounded-full flex items-center gap-2.5 crystal-glass-pill hover:border-white/35 transition-all duration-300"
        aria-label="Antonio Riyanto Portfolio Home"
      >
        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <span className="text-[12px] sm:text-[13px] font-mono font-bold tracking-tight text-white uppercase">
          ANTONIO RIYANTO
        </span>
      </a>

      {/* Island 2 (Navigation & Switcher Pill - Right) */}
      <nav
        aria-label="Navigation & Switcher"
        className="pointer-events-auto relative h-11 sm:h-12 px-4 sm:px-6 rounded-full flex items-center gap-5 sm:gap-7 crystal-glass-pill"
      >
        {/* Desktop Links with subtle hover opacity */}
        <div className="hidden md:flex items-center gap-5 sm:gap-6 text-[13px] font-medium">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-cursor="magnetic"
              className="text-[#8e8e8e] hover:text-white transition-opacity duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Segmented Language Capsule (EN | ID) */}
        <div
          className="flex items-center rounded-full bg-white/5 border border-white/10 p-[2px]"
          role="group"
          aria-label="Language selection"
        >
          <button
            type="button"
            data-cursor="magnetic"
            onClick={() => setLang('en')}
            className={`min-w-[30px] sm:min-w-[32px] h-[22px] sm:h-[24px] px-2 rounded-full text-[10px] font-mono font-bold tracking-wider transition-all duration-200 ${
              lang === 'en'
                ? 'bg-white text-black shadow-sm'
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
            className={`min-w-[30px] sm:min-w-[32px] h-[22px] sm:h-[24px] px-2 rounded-full text-[10px] font-mono font-bold tracking-wider transition-all duration-200 ${
              lang === 'id'
                ? 'bg-white text-black shadow-sm'
                : 'text-[#8e8e8e] hover:text-white'
            }`}
            aria-pressed={lang === 'id'}
          >
            ID
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-7 h-7 border border-white/20 rounded-full gap-1 p-1 bg-white/5 cursor-pointer hover:border-white/40 transition-colors"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span
            className={`w-3.5 h-[1.5px] bg-white transition-transform duration-200 ${
              mobileMenuOpen ? 'rotate-45 translate-y-[2.5px]' : ''
            }`}
          />
          <span
            className={`w-3.5 h-[1.5px] bg-white transition-transform duration-200 ${
              mobileMenuOpen ? '-rotate-45 -translate-y-[2.5px]' : ''
            }`}
          />
        </button>

        {/* Mobile Floating Dropdown Card with Crystal Glass */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-[calc(100%+8px)] right-0 w-[220px] crystal-glass rounded-2xl p-3 flex flex-col gap-1 z-50 pointer-events-auto">
            <div className="glass-bevel-line" />
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 text-[13px] font-medium text-[#8e8e8e] hover:text-white hover:bg-white/5 rounded-xl transition-colors"
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
