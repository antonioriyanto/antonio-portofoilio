import React, { useEffect, useRef } from 'react'

/**
 * AmbientLiquidBackground — WebGL Liquid Glass / Fluid Distortion Shader
 * Ultra-lightweight GPU-accelerated fluid with bilinear downscaling (0.5x),
 * smart sleep engine (0% GPU when idle > 2s), and VisionOS dark technical luxury styling.
 */

const VERTEX_SHADER_SRC = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

const FRAGMENT_SHADER_SRC = `
precision highp float;
varying vec2 v_uv;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_energy;
uniform vec4 u_ripples[6]; // [x, y, birthTime, intensity]

// Fast procedural noise
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100.0);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 3; ++i) {
    v += a * noise(p);
    p = rot * p * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

// Fluid height field simulation
float getLiquidHeight(vec2 uv, float t) {
  vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
  vec2 p = uv * aspect;
  
  // 1. Organic slow fluid drift
  vec2 q = vec2(fbm(p * 1.6 + t * 0.06), fbm(p * 1.6 - t * 0.05));
  float h = fbm(p * 2.0 + q * 1.4 + t * 0.04);

  // 2. Interactive mouse surge (boosted amplitude & smooth falloff)
  vec2 m = u_mouse * aspect;
  float distToMouse = length(p - m);
  float cursorWave = exp(-distToMouse * 3.8) * u_energy * 1.6;
  h += cursorWave;

  // 3. Propagating ripple rings with higher caustic amplitude
  for (int i = 0; i < 6; i++) {
    vec4 rip = u_ripples[i];
    if (rip.w > 0.001) {
      float age = t - rip.z;
      if (age > 0.0 && age < 3.2) {
        vec2 rCenter = rip.xy * aspect;
        float d = length(p - rCenter);
        float radius = age * 0.65;
        float ringDist = abs(d - radius);
        float decay = exp(-age * 1.2) * rip.w;
        float wave = sin(ringDist * 28.0 - age * 7.5) * exp(-ringDist * 12.0) * decay;
        h += wave * 0.85;
      }
    }
  }

  return h;
}

void main() {
  vec2 uv = v_uv;
  float t = u_time;
  
  // Finite difference surface normal with elevated derivative scale
  float eps = 1.8 / min(u_resolution.x, u_resolution.y);
  float hL = getLiquidHeight(uv - vec2(eps, 0.0), t);
  float hR = getLiquidHeight(uv + vec2(eps, 0.0), t);
  float hD = getLiquidHeight(uv - vec2(0.0, eps), t);
  float hU = getLiquidHeight(uv + vec2(0.0, eps), t);
  float hC = getLiquidHeight(uv, t);

  vec3 normal = normalize(vec3((hL - hR) * 6.5, (hD - hU) * 6.5, 1.0));

  // VisionOS Lighting vectors
  vec3 lightDir = normalize(vec3(-0.35, 0.65, 0.8));
  vec3 viewDir = vec3(0.0, 0.0, 1.0);
  vec3 halfDir = normalize(lightDir + viewDir);

  float diff = max(dot(normal, lightDir), 0.0);
  
  // Three-tier specular response (soft silver sheen #555555 up to brilliant mirror glints #fafafa)
  float specBroad = pow(max(dot(normal, halfDir), 0.0), 14.0);
  float specMid   = pow(max(dot(normal, halfDir), 0.0), 38.0);
  float specSharp = pow(max(dot(normal, halfDir), 0.0), 120.0);
  float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);

  // Surface curvature caustic accent
  float curvature = clamp((hL + hR + hD + hU - 4.0 * hC) * 12.0, 0.0, 1.0);
  vec3 caustic = vec3(0.35, 0.36, 0.40) * curvature * (0.3 + u_energy * 0.7);

  // Dark Technical Luxury Palette:
  // Base canvas: #0d0d0d
  vec3 baseColor = vec3(13.0 / 255.0, 13.0 / 255.0, 13.0 / 255.0);
  
  // Elevated liquid body shading
  vec3 liquidTone = mix(vec3(0.06), vec3(0.18), normal.y * 0.5 + 0.5);

  // Chromatic refraction on wave crests
  float caOffset = (normal.x + normal.y) * 0.018;
  vec3 caColor = vec3(
    getLiquidHeight(uv + vec2(caOffset, 0.0), t),
    hC,
    getLiquidHeight(uv - vec2(caOffset, 0.0), t)
  ) * 0.055;

  // Luminous silver / chrome highlights (#555555 to #888888, peaking at #fafafa)
  vec3 specColor = vec3(0.35) * specBroad * 0.5
                 + vec3(0.65) * specMid * 0.8
                 + vec3(0.98) * specSharp * 0.7;

  vec3 rimColor = vec3(0.28) * fresnel;

  vec3 finalColor = baseColor + liquidTone * 0.45 + caustic + caColor + specColor + rimColor;

  // Micro-dither to eliminate color banding
  float dither = (hash(uv * u_resolution + fract(t)) - 0.5) * (1.2 / 255.0);
  finalColor += dither;

  gl_FragColor = vec4(clamp(finalColor, 0.0, 1.0), 1.0);
}
`

export default function AmbientLiquidBackground() {
  const canvasRef = useRef(null)
  const isSleepingRef = useRef(false)
  const animIdRef = useRef(null)
  const startTimeRef = useRef(performance.now())
  const lastActiveRef = useRef(performance.now())

  // Mouse & Ripple state
  const mouseRef = useRef({ x: 0.5, y: 0.5, prevX: 0.5, prevY: 0.5 })
  const energyRef = useRef(0.2)
  const ripplesRef = useRef([
    { x: 0, y: 0, time: -10, intensity: 0 },
    { x: 0, y: 0, time: -10, intensity: 0 },
    { x: 0, y: 0, time: -10, intensity: 0 },
    { x: 0, y: 0, time: -10, intensity: 0 },
    { x: 0, y: 0, time: -10, intensity: 0 },
    { x: 0, y: 0, time: -10, intensity: 0 },
  ])
  const rippleIdxRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl =
      canvas.getContext('webgl', {
        powerPreference: 'low-power',
        alpha: false,
        depth: false,
        stencil: false,
        antialias: false,
      }) ||
      canvas.getContext('experimental-webgl')

    if (!gl) return

    // Compile Shader helper
    const createShader = (type, source) => {
      const shader = gl.createShader(type)
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vertShader = createShader(gl.VERTEX_SHADER, VERTEX_SHADER_SRC)
    const fragShader = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC)
    if (!vertShader || !fragShader) return

    const program = gl.createProgram()
    gl.attachShader(program, vertShader)
    gl.attachShader(program, fragShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program))
      return
    }

    gl.useProgram(program)

    // Full-screen Quad geometry
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    )

    const aPosition = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(aPosition)
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)

    // Uniform Locations
    const uResolution = gl.getUniformLocation(program, 'u_resolution')
    const uTime = gl.getUniformLocation(program, 'u_time')
    const uMouse = gl.getUniformLocation(program, 'u_mouse')
    const uEnergy = gl.getUniformLocation(program, 'u_energy')
    const uRipples = gl.getUniformLocation(program, 'u_ripples')

    const isTouch = window.matchMedia('(pointer: coarse)').matches

    // Render loop
    function render(now) {
      const elapsedSec = (now - startTimeRef.current) * 0.001
      const idleTime = now - lastActiveRef.current

      // Decay energy with smooth natural momentum
      energyRef.current *= 0.965

      // Check if ripples are still actively undulating (up to 3.2s)
      const hasActiveRipples = ripplesRef.current.some(
        (r) => r.intensity > 0.005 && elapsedSec - r.time < 3.2
      )

      // Smart Sleep Engine Check: 0% GPU when idle > 2s and ripples have settled
      if (!isTouch && idleTime > 2000 && energyRef.current < 0.004 && !hasActiveRipples) {
        isSleepingRef.current = true
        animIdRef.current = null
        return
      }

      // Update WebGL uniforms
      gl.uniform2f(uResolution, canvas.width, canvas.height)
      gl.uniform1f(uTime, elapsedSec)
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y)
      gl.uniform1f(uEnergy, energyRef.current)

      // Flatten ripples array for uniform vec4 u_ripples[6]
      const rippleData = new Float32Array(24)
      for (let i = 0; i < 6; i++) {
        const rip = ripplesRef.current[i]
        rippleData[i * 4 + 0] = rip.x
        rippleData[i * 4 + 1] = rip.y
        rippleData[i * 4 + 2] = rip.time
        rippleData[i * 4 + 3] = rip.intensity
      }
      gl.uniform4fv(uRipples, rippleData)

      // Draw full-screen quad
      gl.drawArrays(gl.TRIANGLES, 0, 6)

      animIdRef.current = requestAnimationFrame(render)
    }

    // Wake Up Smart Sleep Engine
    function wakeUp() {
      lastActiveRef.current = performance.now()
      if (isSleepingRef.current) {
        isSleepingRef.current = false
        if (!animIdRef.current) {
          animIdRef.current = requestAnimationFrame(render)
        }
      }
    }

    // Downscaled Resolution Buffer setup (0.5x for zero GPU lag, max DPR 1.5)
    function handleResize() {
      const width = window.innerWidth
      const height = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

      // Downscaled simulation buffer (0.5x viewport scale)
      const bufferW = Math.max(320, Math.floor(width * dpr * 0.5))
      const bufferH = Math.max(240, Math.floor(height * dpr * 0.5))

      if (canvas.width !== bufferW || canvas.height !== bufferH) {
        canvas.width = bufferW
        canvas.height = bufferH
        gl.viewport(0, 0, bufferW, bufferH)
      }

      wakeUp()
    }

    // Mouse movement handler
    function handleMouseMove(e) {
      const normX = e.clientX / window.innerWidth
      const normY = 1.0 - e.clientY / window.innerHeight

      const dx = normX - mouseRef.current.prevX
      const dy = normY - mouseRef.current.prevY
      const dist = Math.sqrt(dx * dx + dy * dy)

      mouseRef.current.x = normX
      mouseRef.current.y = normY
      mouseRef.current.prevX = normX
      mouseRef.current.prevY = normY

      wakeUp()

      // Add energy based on mouse velocity with elevated responsiveness
      energyRef.current = Math.min(1.0, energyRef.current + dist * 8.0)

      // Spawn ripple pulses with higher caustic displacement
      if (dist > 0.012) {
        const nowSec = (performance.now() - startTimeRef.current) * 0.001
        const idx = rippleIdxRef.current
        ripplesRef.current[idx] = {
          x: normX,
          y: normY,
          time: nowSec,
          intensity: Math.min(1.0, dist * 12.0),
        }
        rippleIdxRef.current = (idx + 1) % 6
      }
    }

    // Scroll wake up
    function handleScroll() {
      wakeUp()
      energyRef.current = Math.min(0.8, energyRef.current + 0.15)
    }

    // Initial setup and event listeners
    window.addEventListener('resize', handleResize)
    handleResize()

    if (!isTouch) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Start initial loop
    animIdRef.current = requestAnimationFrame(render)

    return () => {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      if (gl) {
        gl.deleteProgram(program)
        gl.deleteShader(vertShader)
        gl.deleteShader(fragShader)
        gl.deleteBuffer(positionBuffer)
      }
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#0d0d0d]"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block object-cover will-change-transform"
        style={{ width: '100vw', height: '100vh' }}
      />
    </div>
  )
}
