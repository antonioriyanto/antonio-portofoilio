import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

gsap.registerPlugin(ScrollTrigger)

export default function Hero({ t }) {
  const containerRef = useRef(null)
  const slabRef = useRef(null)
  const canvasRef = useRef(null)
  const overlayRef = useRef(null)
  const metric40Ref = useRef(null)
  const metric20Ref = useRef(null)
  const [isInView, setIsInView] = useState(true)

  const meshRef = useRef(null)
  const pointLightRef = useRef(null)

  // 1. Kinetic Rolling Number Counter & Scroll Exit Compression
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Rolling number counter for 40+ and 20+
      const counters = [
        { ref: metric40Ref, target: 40, suffix: '+' },
        { ref: metric20Ref, target: 20, suffix: '+' },
      ]

      counters.forEach(({ ref, target, suffix }) => {
        if (!ref.current) return
        const countObj = { val: 0 }
        gsap.to(countObj, {
          val: target,
          duration: 2.2,
          ease: 'power2.out',
          delay: 0.4,
          onUpdate: () => {
            if (ref.current) {
              ref.current.textContent = `${Math.round(countObj.val)}${suffix}`
            }
          },
        })
      })

      // Scroll Exit Compression
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          scale: 0.96,
          yPercent: -15,
          opacity: 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // 2. Viewport Intersection Observer (pause rendering when out of viewport)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.05 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // 3. Three.js WebGL Transmission Glass Engine
  useEffect(() => {
    if (!canvasRef.current || !slabRef.current) return

    const canvas = canvasRef.current
    const slab = slabRef.current

    // Scene & Perspective Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100)
    camera.position.set(0, 0, 5.5)

    // WebGL Renderer with Alpha Transparency
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15

    // Environment Lighting using RoomEnvironment for physical transmission reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    const roomEnvTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = roomEnvTexture

    // Key, Rim, and Ambient Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4)
    keyLight.position.set(3.5, 4.5, 4.0)
    scene.add(keyLight)

    const rimLight = new THREE.DirectionalLight(0x99ccff, 1.5)
    rimLight.position.set(-3.5, -3.0, -2.5)
    scene.add(rimLight)

    // Cursor-driven Specular Point Light
    const pointLight = new THREE.PointLight(0xffffff, 3.8, 12)
    pointLight.position.set(0, 0, 2.8)
    scene.add(pointLight)
    pointLightRef.current = pointLight

    // Backdrop refraction plane inside Three.js for chromatic dispersion optical depth
    const bgCanvas = document.createElement('canvas')
    bgCanvas.width = 256
    bgCanvas.height = 256
    const bgCtx = bgCanvas.getContext('2d')
    const bgGrad = bgCtx.createRadialGradient(128, 128, 10, 128, 128, 128)
    bgGrad.addColorStop(0, 'rgba(255, 255, 255, 0.18)')
    bgGrad.addColorStop(0.4, 'rgba(180, 210, 255, 0.09)')
    bgGrad.addColorStop(1, 'rgba(15, 15, 20, 0.0)')
    bgCtx.fillStyle = bgGrad
    bgCtx.fillRect(0, 0, 256, 256)

    const bgTexture = new THREE.CanvasTexture(bgCanvas)
    const bgGeom = new THREE.PlaneGeometry(8, 6)
    const bgMat = new THREE.MeshBasicMaterial({
      map: bgTexture,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    })
    const bgMesh = new THREE.Mesh(bgGeom, bgMat)
    bgMesh.position.set(0, 0, -1.2)
    scene.add(bgMesh)

    // Physical Glass Material with verbatim requested specifications
    let geometry = null
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.1,
      transmission: 0.95,
      ior: 1.52,
      thickness: 1.2,
      dispersion: 0.05,
      transparent: true,
      clearcoat: 0.35,
      clearcoatRoughness: 0.1,
      attenuationColor: new THREE.Color(0xf0f6ff),
      attenuationDistance: 5.0,
    })

    const mesh = new THREE.Mesh(geometry, material)
    meshRef.current = mesh
    scene.add(mesh)

    // Dynamic Rounded Slab Geometry with Beveled Glass Edges
    const updateGeometry = () => {
      if (geometry) geometry.dispose()

      const fovRad = (camera.fov * Math.PI) / 180
      const visibleHeight = 2 * Math.tan(fovRad / 2) * camera.position.z
      const visibleWidth = visibleHeight * camera.aspect

      const slabW = visibleWidth * 0.98
      const slabH = visibleHeight * 0.98
      const r = Math.min(slabW, slabH) * 0.055
      const depth = 0.22

      const shape = new THREE.Shape()
      const x = -slabW / 2
      const y = -slabH / 2
      shape.moveTo(x, y + r)
      shape.lineTo(x, y + slabH - r)
      shape.quadraticCurveTo(x, y + slabH, x + r, y + slabH)
      shape.lineTo(x + slabW - r, y + slabH)
      shape.quadraticCurveTo(x + slabW, y + slabH, x + slabW, y + slabH - r)
      shape.lineTo(x + slabW, y + r)
      shape.quadraticCurveTo(x + slabW, y, x + slabW - r, y)
      shape.lineTo(x + r, y)
      shape.quadraticCurveTo(x, y, x, y + r)

      geometry = new THREE.ExtrudeGeometry(shape, {
        depth,
        bevelEnabled: true,
        bevelSegments: 5,
        bevelSize: 0.06,
        bevelThickness: 0.06,
      })
      geometry.center()
      mesh.geometry = geometry
    }

    // Resize Observer to adapt WebGL canvas & mesh to card dimensions
    const handleResize = () => {
      const rect = slab.getBoundingClientRect()
      const w = Math.max(rect.width, 100)
      const h = Math.max(rect.height, 100)

      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)
      updateGeometry()
    }

    handleResize()
    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(slab)

    // WebGL Render Loop
    let animId = null
    const renderLoop = () => {
      if (isInView) {
        renderer.render(scene, camera)
      }
      animId = requestAnimationFrame(renderLoop)
    }
    animId = requestAnimationFrame(renderLoop)

    return () => {
      if (animId) cancelAnimationFrame(animId)
      resizeObserver.disconnect()
      pmremGenerator.dispose()
      roomEnvTexture.dispose()
      bgTexture.dispose()
      bgGeom.dispose()
      bgMat.dispose()
      if (geometry) geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [isInView])

  // 4. GSAP quickTo Physics & HTML DOM Overlay Synchronization
  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    if (isCoarse || !isInView || !containerRef.current || !slabRef.current) return

    const container = containerRef.current

    // Synchronized Rotation State
    const rotState = { rotX: 0, rotY: 0, z: 0 }

    const syncTransforms = () => {
      // 1. Three.js mesh rotation (in radians)
      if (meshRef.current) {
        meshRef.current.rotation.x = -rotState.rotX * (Math.PI / 180)
        meshRef.current.rotation.y = rotState.rotY * (Math.PI / 180)
        meshRef.current.position.z = rotState.z * 0.008
      }
      // 2. HTML Text Overlay CSS 3D transform (in degrees)
      if (overlayRef.current) {
        overlayRef.current.style.transform = `perspective(1000px) rotateX(${rotState.rotX}deg) rotateY(${rotState.rotY}deg) translateZ(${rotState.z}px)`
      }
    }

    const setRotateX = gsap.quickTo(rotState, 'rotX', {
      duration: 0.8,
      ease: 'power2.out',
      onUpdate: syncTransforms,
    })
    const setRotateY = gsap.quickTo(rotState, 'rotY', {
      duration: 0.8,
      ease: 'power2.out',
      onUpdate: syncTransforms,
    })
    const setTranslateZ = gsap.quickTo(rotState, 'z', {
      duration: 0.8,
      ease: 'power2.out',
      onUpdate: syncTransforms,
    })

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      // Subtle luxury tilt: max 16 deg
      const rotY = x * 18
      const rotX = -y * 18

      setRotateX(rotX)
      setRotateY(rotY)
      setTranslateZ(16)

      // Move point light to track cursor for real-time specular glints
      if (pointLightRef.current) {
        gsap.to(pointLightRef.current.position, {
          x: x * 3.5,
          y: -y * 3.5,
          z: 2.8,
          duration: 0.5,
          ease: 'power2.out',
        })
      }
    }

    const handleMouseLeave = () => {
      setRotateX(0)
      setRotateY(0)
      setTranslateZ(0)
      if (pointLightRef.current) {
        gsap.to(pointLightRef.current.position, {
          x: 0,
          y: 0,
          z: 2.8,
          duration: 0.8,
          ease: 'power2.out',
        })
      }
    }

    container.addEventListener('mousemove', handleMouseMove, { passive: true })
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      setRotateX(0)
      setRotateY(0)
      setTranslateZ(0)
    }
  }, [isInView])

  return (
    <header
      ref={containerRef}
      className="relative w-[min(calc(100%-48px),1440px)] mx-auto min-h-[calc(100vh-72px)] pt-24 sm:pt-28 pb-12 flex flex-col justify-between overflow-visible"
    >
      {/* Background ambient luxury glow spot */}
      <div
        aria-hidden="true"
        className="absolute -top-32 right-10 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[140px] pointer-events-none"
      />

      {/* Top Grid: Title & Interactive 3D WebGL Transmission Glass Slab */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.18fr_0.82fr] gap-12 lg:gap-16 items-center perspective-1000">
        
        {/* Left: Typography Scale */}
        <div className="relative z-10">
          <span
            data-reveal-eyebrow
            className="block mb-6 text-[#8e8e8e] text-[11px] font-mono font-medium tracking-[0.2em] uppercase"
          >
            {t.heroEyebrow}
          </span>

          <h1 className="text-[clamp(44px,9.5vw,144px)] font-black leading-[1.12] tracking-[-0.05em] text-[#fafafa] uppercase">
            <span className="block">
              {t.heroTitlePart1}
            </span>
            <span className="block">
              {t.heroTitlePart2}
            </span>
          </h1>
        </div>

        {/* Right: Interactive 3D WebGL Transmission Glass Slab (visionOS aesthetic) */}
        <div className="flex justify-end perspective-1000">
          <div
            ref={slabRef}
            className="w-full max-w-[540px] relative rounded-2xl will-change-transform group transition-shadow duration-300 hover:shadow-[0_40px_110px_rgba(255,255,255,0.06)]"
          >
            {/* Three.js WebGL Transmission Glass Canvas */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full rounded-2xl pointer-events-none z-0"
            />

            {/* DOM Overlay: Sharp HTML text & CTAs synchronized with 3D tilt */}
            <div
              ref={overlayRef}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative z-10 w-full p-8 sm:p-10 rounded-2xl border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.65)] pointer-events-auto will-change-transform bg-white/[0.015]"
            >
              {/* Subtle Top Specular Edge Line */}
              <div className="absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

              {/* Technical Glass Header Badge */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20 border border-white/40" />
                  <span className="text-[11px] font-mono tracking-widest text-[#8e8e8e] uppercase">
                    VISION_OS // SPEC_01
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#8e8e8e] px-2 py-0.5 rounded bg-white/5 border border-white/10">
                  ACTIVE
                </span>
              </div>

              {/* Hero Copy */}
              <p className="mb-8 text-[#8e8e8e] text-[clamp(16px,1.8vw,21px)] leading-[1.6]">
                {t.heroCopy}
              </p>

              {/* CTAs with Magnetic Physics hooks */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  href="#work"
                  data-cursor="magnetic"
                  className="min-h-[48px] px-7 inline-flex items-center justify-center border border-white rounded-full text-[13px] font-bold bg-white text-[#0d0d0d] hover:bg-[#e5e5e5] hover:-translate-y-0.5 active:translate-y-0 shadow-[0_4px_20px_rgba(255,255,255,0.15)] transition-all duration-200"
                >
                  {t.exploreWork}
                </a>

                <a
                  href="#contact"
                  data-cursor="magnetic"
                  className="min-h-[48px] px-7 inline-flex items-center justify-center border border-white/20 rounded-full text-[13px] font-semibold bg-white/5 text-[#fafafa] hover:bg-white/10 hover:border-white/40 hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-md transition-all duration-200"
                >
                  {t.downloadCV}
                </a>
              </div>

              {/* Floating ambient badge anchor */}
              <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-[#8e8e8e]">
                <span>JAKARTA, ID</span>
                <span className="text-white/60">40+ STORES DEPLOYED</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 4 Metrics Strip - Verbatim Scale & Rolling Number Counter */}
      <div className="grid grid-cols-2 md:grid-cols-4 mt-16 sm:mt-24 border-t border-b border-white/10 bg-canvas-card/30 backdrop-blur-md">
        
        <div className="py-7 sm:py-8 px-4 sm:px-6 pl-0 sm:pl-4 border-r border-white/10">
          <strong
            ref={metric40Ref}
            className="block mb-1.5 text-[clamp(26px,3vw,44px)] font-black tracking-[-0.04em] text-[#fafafa]"
          >
            0+
          </strong>
          <span className="text-[#8e8e8e] text-[12px] sm:text-[13px] leading-snug block font-medium">
            {t.metricStores}
          </span>
        </div>

        <div className="py-7 sm:py-8 px-4 sm:px-6 md:border-r border-white/10">
          <strong className="block mb-1.5 text-[clamp(26px,3vw,44px)] font-black tracking-[-0.04em] text-[#fafafa]">
            End-to-End
          </strong>
          <span className="text-[#8e8e8e] text-[12px] sm:text-[13px] leading-snug block font-medium">
            {t.metricExecution}
          </span>
        </div>

        <div className="py-7 sm:py-8 px-4 sm:px-6 pl-0 sm:pl-6 border-t md:border-t-0 border-r border-white/10">
          <strong
            ref={metric20Ref}
            className="block mb-1.5 text-[clamp(26px,3vw,44px)] font-black tracking-[-0.04em] text-[#fafafa]"
          >
            0+
          </strong>
          <span className="text-[#8e8e8e] text-[12px] sm:text-[13px] leading-snug block font-medium">
            {t.metricClients}
          </span>
        </div>

        <div className="py-7 sm:py-8 px-4 sm:px-6 pr-0 sm:pr-4 border-t md:border-t-0 border-white/10">
          <strong className="block mb-1.5 text-[clamp(26px,3vw,44px)] font-black tracking-[-0.04em] text-[#fafafa]">
            Multi-Discipline
          </strong>
          <span className="text-[#8e8e8e] text-[12px] sm:text-[13px] leading-snug block font-medium">
            {t.metricMulti}
          </span>
        </div>

      </div>

    </header>
  )
}
