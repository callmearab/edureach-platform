import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        secondary: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        accent: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        surface: {
          light: '#ffffff',
          dark:  '#0a0f1a',
        },
        neutral: {
          925: '#111827',
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body:    ['var(--font-body)', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial':   'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh':     'radial-gradient(at 40% 20%, hsla(150,100%,74%,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(215,100%,74%,0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(40,100%,74%,0.1) 0px, transparent 50%)',
        'gradient-mesh-dark':'radial-gradient(at 40% 20%, hsla(150,60%,20%,0.4) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(215,60%,20%,0.3) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(40,60%,20%,0.2) 0px, transparent 50%)',
      },
      animation: {
        'float':         'float 6s ease-in-out infinite',
        'pulse-slow':    'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up':      'slideUp 0.5s ease-out',
        'slide-down':    'slideDown 0.5s ease-out',
        'fade-in':       'fadeIn 0.5s ease-out',
        'spin-slow':     'spin 8s linear infinite',
        'shimmer':       'shimmer 2s linear infinite',
        'gradient-shift':'gradientShift 8s ease infinite',
        'counter':       'counter 2s ease-out',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        float:         { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-20px)' } },
        slideUp:       { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideDown:     { from: { opacity: '0', transform: 'translateY(-20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:        { from: { opacity: '0' }, to: { opacity: '1' } },
        shimmer:       { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        gradientShift: { '0%, 100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        bounceSubtle:  { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-5px)' } },
      },
      boxShadow: {
        'glow-green':  '0 0 40px rgba(34, 197, 94, 0.25)',
        'glow-blue':   '0 0 40px rgba(59, 130, 246, 0.25)',
        'glow-yellow': '0 0 40px rgba(245, 158, 11, 0.25)',
        'card':        '0 4px 24px rgba(0, 0, 0, 0.06)',
        'card-hover':  '0 8px 48px rgba(0, 0, 0, 0.12)',
        'card-dark':   '0 4px 24px rgba(0, 0, 0, 0.4)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      screens: {
        xs: '480px',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
