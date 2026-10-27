/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Charcoal & Technical Luxury accents
        canvas: {
          DEFAULT: '#0d0d0d',
          subtle: '#121212',
          card: '#141414',
          elevated: '#1a1a1a',
        },
        'surface-card': 'rgba(20, 20, 20, 0.75)',
        'surface-glass': 'rgba(255, 255, 255, 0.04)',
        'border-glass': 'rgba(255, 255, 255, 0.10)',
        'border-glow': 'rgba(255, 255, 255, 0.25)',
        'text-primary': '#fafafa',
        'text-muted': '#8e8e8e',
        'accent-chrome': '#e5e5e5',

        // Unified dark luxury palette
        bg: '#0d0d0d',
        surface: '#141414',
        'surface-muted': '#1a1a1a',
        text: '#fafafa',
        muted: '#8e8e8e',
        line: 'rgba(255, 255, 255, 0.10)',
        dark: {
          DEFAULT: '#141414',
          soft: '#1c1c1c',
          line: '#2c2c2c',
          muted: '#8e8e8e',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      },
      transitionTimingFunction: {
        'brutal': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'luxury': 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      maxWidth: {
        'container': '1440px',
      },
      backdropBlur: {
        xs: '2px',
        xl: '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
