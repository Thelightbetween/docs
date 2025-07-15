/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#B8A99A',
        light: '#F5F1ED',
        dark: '#1A1A1A',
        accent: '#D4B5A0',
        sage: '#8B9A7A',
        mystic: '#7A6B8B'
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(184, 169, 154, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(184, 169, 154, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}