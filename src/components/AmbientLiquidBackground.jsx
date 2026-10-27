import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * AmbientLiquidBackground
 * GPU-accelerated ambient liquid layer with SVG micro-noise,
 * floating organic gradient blobs, and velocity-stretched cursor surge.
 */
export default function AmbientLiquidBackground() {
  const surgeBlobRef = useRef(null)
  const pos = useRef({ x: -500, y: -500 })
  const targetPos = useRef({ x: -500, y: -500 })
  const vel = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Disable interactive cursor surge on coarse/touch devices
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    if (isCoarse || !surgeBlobRef.current) return

    const blob = surgeBlobRef.current
    let animId = null

    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY }
    }

    const render = () => {
      // Dampened GSAP lerp (0.08)
      const prevX = pos.current.x
      const prevY = pos.current.y

      pos.current.x += (targetPos.current.x - pos.current.x) * 0.08
      pos.current.y += (targetPos.current.y - pos.current.y) * 0.08

      // Velocity calculation
      vel.current.x = pos.current.x - prevX
      vel.current.y = pos.current.y - prevY

      const speed = Math.sqrt(vel.current.x * vel.current.x + vel.current.y * vel.current.y)
      const angle = Math.atan2(vel.current.y, vel.current.x) * (180 / Math.PI)

      // Velocity stretching
      const stretch = Math.min(1.4, 1 + speed * 0.015)
      const squeeze = Math.max(0.75, 1 - speed * 0.008)

      blob.style.transform = `translate3d(${pos.current.x - 200}px, ${
        pos.current.y - 200
      }px, 0) rotate(${angle}deg) scale(${stretch}, ${squeeze})`

      animId = requestAnimationFrame(render)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    animId = requestAnimationFrame(render)

    return () => {
      if (animId) cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#0d0d0d]"
    >
      {/* Layer 1: Subtle SVG Noise Texture (eradicates gradient banding) */}
      <svg
        className="fixed inset-0 w-full h-full opacity-[0.04] pointer-events-none z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="liquidNoiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#liquidNoiseFilter)" />
      </svg>

      {/* Layer 2: Organic Floating Radial Blobs */}
      <div className="absolute inset-0 w-full h-full overflow-hidden filter blur-[105px] transform-gpu">
        {/* Blob 1: 650px diameter, from-[#242424] via-[#2c2c2c] to-transparent, 25s elliptical float */}
        <div
          className="absolute -top-[10%] -left-[10%] w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-[#242424] via-[#2c2c2c] to-transparent opacity-90 will-change-transform"
          style={{
            animation: 'ambientBlob1 25s infinite ease-in-out',
          }}
        />

        {/* Blob 2: 550px diameter, from-[#2e2e2e] via-[#222222] to-transparent, 32s counter-clockwise float */}
        <div
          className="absolute top-[45%] -right-[12%] w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[#2e2e2e] via-[#222222] to-transparent opacity-80 will-change-transform"
          style={{
            animation: 'ambientBlob2 32s infinite ease-in-out',
          }}
        />

        {/* Blob 3: 450px diameter, #353535, 25% opacity, 28s ambient float */}
        <div
          className="absolute -bottom-[15%] left-[25%] w-[450px] h-[450px] rounded-full bg-[#353535] opacity-[0.25] will-change-transform"
          style={{
            animation: 'ambientBlob3 28s infinite ease-in-out',
          }}
        />

        {/* Layer 3: Interactive Cursor Surge Blob (400px diameter, #363636, 25% opacity) */}
        <div
          ref={surgeBlobRef}
          className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#3a3a3a] via-[#363636] to-transparent opacity-[0.25] pointer-events-none will-change-transform"
        />
      </div>
    </div>
  )
}
