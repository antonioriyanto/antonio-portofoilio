import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

/**
 * CustomFollowerCursor with Magnetic Physics & Floating Media Preview Bridge
 * Includes strict mobile/touch guard to avoid overhead on coarse pointer devices.
 */
export default function CustomCursor() {
  const [isCoarse, setIsCoarse] = useState(true)
  const [previewData, setPreviewData] = useState({
    active: false,
    title: '',
    category: '',
    image: null,
    video: null,
  })

  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const previewRef = useRef(null)

  const mousePos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const previewPos = useRef({ x: -100, y: -100 })
  const velocity = useRef({ x: 0, y: 0 })
  const isHovered = useRef(false)
  const isMagnetic = useRef(false)
  const magneticTarget = useRef(null)

  useEffect(() => {
    // Strict Mobile Guard: pointer coarse detection
    const mediaQuery = window.matchMedia('(pointer: coarse)')
    const checkCoarse = () => {
      const coarse = mediaQuery.matches || !window.matchMedia('(pointer: fine)').matches
      setIsCoarse(coarse)
      return coarse
    }

    if (checkCoarse()) {
      return
    }

    const handleMediaChange = () => {
      checkCoarse()
    }
    mediaQuery.addEventListener?.('change', handleMediaChange)

    // Mouse Move Coordinator
    const onMouseMove = (e) => {
      const { clientX, clientY } = e
      velocity.current = {
        x: (clientX - mousePos.current.x) * 0.4,
        y: (clientY - mousePos.current.y) * 0.4,
      }
      mousePos.current = { x: clientX, y: clientY }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`
      }
    }

    // Magnetic Attraction & Hover Targets
    const onMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor="magnetic"], [data-cursor="hover"]')
      if (target) {
        isHovered.current = true
        if (target.matches('[data-cursor="magnetic"], a, button')) {
          isMagnetic.current = true
          magneticTarget.current = target
        }
      }

      // Check for preview data attributes
      const previewEl = e.target.closest('[data-preview-title]')
      if (previewEl) {
        setPreviewData({
          active: true,
          title: previewEl.dataset.previewTitle || '',
          category: previewEl.dataset.previewCategory || '',
          image: previewEl.dataset.previewImage || null,
          video: previewEl.dataset.previewVideo || null,
        })
      }
    }

    const onMouseOut = (e) => {
      const target = e.target.closest('a, button, [data-cursor="magnetic"], [data-cursor="hover"]')
      if (target) {
        isHovered.current = false
        isMagnetic.current = false
        magneticTarget.current = null
      }

      const previewEl = e.target.closest('[data-preview-title]')
      if (previewEl) {
        // If relatedTarget is not inside the preview element
        if (!previewEl.contains(e.relatedTarget)) {
          setPreviewData((prev) => ({ ...prev, active: false }))
        }
      }
    }

    // Custom Event Listener for custom hover preview payload bridge
    const onCustomPreview = (e) => {
      const detail = e.detail || {}
      setPreviewData({
        active: !!detail.active,
        title: detail.title || '',
        category: detail.category || '',
        image: detail.image || null,
        video: detail.video || null,
      })
    }

    // Render loop with lerp: 0.15
    let animationFrameId
    const lerp = (start, end, factor) => start + (end - start) * factor

    const render = () => {
      let targetX = mousePos.current.x
      let targetY = mousePos.current.y

      // Magnetic pull physics
      if (isMagnetic.current && magneticTarget.current) {
        const rect = magneticTarget.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const pull = 0.35
        targetX = lerp(targetX, centerX, pull)
        targetY = lerp(targetY, centerY, pull)
      }

      ringPos.current.x = lerp(ringPos.current.x, targetX, 0.15)
      ringPos.current.y = lerp(ringPos.current.y, targetY, 0.15)

      if (ringRef.current) {
        const scale = previewData.active ? 0.3 : isHovered.current ? 1.7 : 1
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) scale(${scale})`
      }

      // Floating Media Preview Capsule Tracking & Tilt
      if (previewRef.current && previewData.active) {
        previewPos.current.x = lerp(previewPos.current.x, mousePos.current.x + 24, 0.12)
        previewPos.current.y = lerp(previewPos.current.y, mousePos.current.y - 120, 0.12)

        const tiltX = Math.max(-15, Math.min(15, -velocity.current.y * 1.5))
        const tiltY = Math.max(-15, Math.min(15, velocity.current.x * 1.5))

        previewRef.current.style.transform = `translate3d(${previewPos.current.x}px, ${previewPos.current.y}px, 0) perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
      }

      animationFrameId = requestAnimationFrame(render)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseover', onMouseOver, { passive: true })
    document.addEventListener('mouseout', onMouseOut, { passive: true })
    window.addEventListener('cursor-preview', onCustomPreview)

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      window.removeEventListener('cursor-preview', onCustomPreview)
      mediaQuery.removeEventListener?.('change', handleMediaChange)
    }
  }, [previewData.active])

  if (isCoarse) return null

  return (
    <>
      {/* Central Precise Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference will-change-transform"
      />

      {/* Trailing Spring Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-white pointer-events-none z-[9998] mix-blend-difference will-change-transform transition-opacity duration-200"
      />

      {/* Floating Thumbnail Preview Capsule */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 w-[280px] aspect-[16/10] rounded-xl overflow-hidden pointer-events-none z-[9990] backdrop-blur-xl bg-canvas-card/90 border border-white/20 shadow-2xl transition-opacity duration-300 ${
          previewData.active ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Subtle radial inner glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />

        {/* Video or Image or Aesthetic Fallback */}
        {previewData.video ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            src={previewData.video}
            className="w-full h-full object-cover"
          />
        ) : previewData.image ? (
          <img
            src={previewData.image}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col justify-between p-4 bg-gradient-to-br from-[#1c1c1c] to-[#0f0f0f]">
            <div className="flex items-center justify-between text-[10px] font-mono text-text-muted">
              <span>PROJECT PREVIEW</span>
              <span className="w-2 h-2 rounded-full bg-white/40 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-accent-chrome/60 block">
                {previewData.category || 'CASE STUDY'}
              </span>
              <strong className="text-[14px] font-bold text-text-primary tracking-tight line-clamp-1">
                {previewData.title || 'Technical Project'}
              </strong>
            </div>
          </div>
        )}

        {/* Minimalist Lower Overlay Label when media is displayed */}
        {(previewData.image || previewData.video) && (
          <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            <span className="text-[9px] uppercase font-bold tracking-wider text-white/70 block">
              {previewData.category}
            </span>
            <strong className="text-[12px] font-semibold text-white tracking-tight line-clamp-1">
              {previewData.title}
            </strong>
          </div>
        )}
      </div>
    </>
  )
}
