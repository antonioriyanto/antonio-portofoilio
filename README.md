# Antonio Riyanto — Creative All-Rounder Portfolio

Digital portfolio showcasing multidisciplinary work across creative design, digital content, retail operations (40+ nationwide stores), and technology-driven problem solving.

Designed with a brutalist dark technical luxury aesthetic, featuring high-performance micro-interactions, smooth scrolling, and an interactive embedded smartphone simulator.

---

## ⚡ Tech Stack & Highlights
* **Core:** React 18, Vite, Tailwind CSS
* **Animation & Motion:** GSAP (ScrollTrigger, quickTo, quickSetter), Lenis Smooth Scroll
* **Interactive Features:** 
  * 3D visionOS-inspired frosted glass hero slab with specular light tracking
  * Standalone 1:1 Watch Club Spinwheel Simulator embedded in an iPhone mockup (HTML5 Canvas rendering + Web Audio API synthesizer + Canvas Confetti)
  * GPU-accelerated ambient liquid background with SVG micro-noise and interactive cursor surge
  * Real-time Jakarta time zone clock & reactive bilingual engine (EN / ID)

---

## 📁 Project Structure
```text
/
├── index.html                  # Entry point HTML untuk Vite
├── package.json                # Dependencies & scripts
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Custom theme & brutalist design tokens
└── src/
    ├── main.jsx                # React root mount
    ├── App.jsx                 # App root, smooth scroll & global lang state
    ├── index.css               # Tailwind directives & animation keyframes
    ├── data/
    │   └── translations.js     # Bilingual text dictionary (EN / ID)
    └── components/
        ├── Navbar.jsx          # Sticky header, logo, nav & lang toggle
        ├── Hero.jsx            # 3D interactive glass slab & metrics
        ├── AmbientLiquidBackground.jsx # Dynamic liquid backdrop & cursor surge
        ├── CustomCursor.jsx    # Follower cursor with media preview bridge
        ├── Capabilities.jsx    # 6 core capability bento showcase
        ├── SelectedWork.jsx    # 12-column responsive project grid
        ├── CareerJourney.jsx   # Timeline with scrubbed beam & word reveal
        ├── Experience.jsx      # Watch Club nationwide retail workflow
        ├── CaseStudies.jsx     # Accordion drawer case studies
        ├── CreativeArchive.jsx # Filterable exploration archive
        ├── TechSection.jsx     # iPhone mockup container for Lucky Spin
        ├── WatchClubSimulator.jsx # Standalone canvas spinwheel simulator
        ├── CapabilityMap.jsx   # Technical skills matrix
        ├── About.jsx           # Background & personal statement
        ├── JackOfAllTrades.jsx # Personality & philosophy section
        └── Contact.jsx         # Real-time Jakarta clock & contact links
```

---

## 🛠️ Getting Started

### 1. Development Mode

```bash
npm run dev
```

### 2. Build for Production

```bash
npm run build
```
