/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#FBF6F2',
        blush: '#F6E4E4',
        rose: {
          light: '#F1D3D6',
          DEFAULT: '#E8A3B5',
          dark: '#D97E96',
        },
        plum: {
          DEFAULT: '#2B1220',
          dark: '#1D0B16',
          light: '#3F1E31',
        },
        muted: '#75606B',
        magenta: {
          DEFAULT: '#D6246E',
          glow: '#E0307A',
          dark: '#C21463',
          deep: '#A30F52',
        },
        gold: {
          light: '#E3C176',
          DEFAULT: '#C99E42',
          dark: '#B98A2F',
        },
        success: '#2E9E6B',
        loss: '#C94A4A',
      },
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      borderRadius: {
        'card': '24px',
        'card-lg': '28px',
        'card-sm': '18px',
        'pill': '9999px',
      },
      boxShadow: {
        'rose-soft': '0 10px 30px -10px rgba(214, 36, 110, 0.08)',
        'rose-card': '0 18px 45px -12px rgba(214, 36, 110, 0.12)',
        'rose-hover': '0 25px 60px -15px rgba(214, 36, 110, 0.20)',
        'magenta-glow': '0 0 35px 2px rgba(214, 36, 110, 0.35)',
        'gold-glow': '0 0 25px 2px rgba(227, 193, 118, 0.35)',
        'inner-rose': 'inset 0 1px 2px rgba(255, 255, 255, 0.6), inset 0 -1px 2px rgba(214, 36, 110, 0.08)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #B98A2F 0%, #E3C176 50%, #B98A2F 100%)',
        'cta-gradient': 'linear-gradient(135deg, #E0307A 0%, #C21463 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
        'rose-mesh': 'radial-gradient(circle at 10% 20%, rgba(246, 228, 228, 0.8) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(241, 211, 214, 0.7) 0%, transparent 45%)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'float-delayed': 'floatSlow 7s ease-in-out 2s infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
