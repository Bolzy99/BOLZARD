// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-instrument-sans)', 'sans-serif'],
      },
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
      },
      animation: {
        'gradient-flow': 'gradient-flow 5s linear infinite',
        scan: 'scan 4s ease-in-out infinite',
        // ADD THIS LINE
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
      },
      keyframes: {
        'gradient-flow': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        scan: {
          '0%': { transform: 'translateY(-1rem)', opacity: '0' },
          '20%': { transform: 'translateY(2rem)', opacity: '1' },
          '80%': { transform: 'translateY(18rem)', opacity: '1' },
          '100%': { transform: 'translateY(22rem)', opacity: '0' },
        },
        // ADD THIS ENTIRE BLOCK
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
};