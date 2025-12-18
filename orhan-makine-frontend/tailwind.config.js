// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      /* =========================
         🎨 RENKLER (MARKA ODAKLI)
      ========================== */
      colors: {
        blue: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },

        /* Orhan Makine için semantic renkler */
        primary: {
          DEFAULT: '#1d6fb8',
          light: '#2b8df5',
          dark: '#155a96',
        },

        secondary: {
          DEFAULT: '#f59e0b', // sarı uyarı/CTA
          dark: '#d97706',
        },

        dark: '#0f172a',
      },

      /* =========================
         🔤 FONT
      ========================== */
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },

      /* =========================
         📱 RESPONSIVE (ÇOK ÖNEMLİ)
      ========================== */
      screens: {
        xs: '475px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },

      /* =========================
         📦 CONTAINER
      ========================== */
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2.5rem',
          xl: '4rem',
        },
      },

      /* =========================
         ✨ ANİMASYONLAR
      ========================== */
      animation: {
        fadeIn: 'fadeIn 0.4s ease-out',
        slideUp: 'slideUp 0.4s ease-out',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },

      /* =========================
         🧱 SHADOW & RADIUS
      ========================== */
      boxShadow: {
        nav: '0 4px 20px rgba(0,0,0,0.08)',
        card: '0 10px 30px rgba(0,0,0,0.12)',
      },

      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },

      /* =========================
         🧭 Z-INDEX
      ========================== */
      zIndex: {
        60: '60',
        70: '70',
        80: '80',
        90: '90',
        100: '100',
      },
    },
  },

  plugins: [],
}