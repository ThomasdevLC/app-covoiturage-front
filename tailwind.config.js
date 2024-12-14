/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)', // La classe Tailwind `bg-primary` utilisera `--primary-color`
        'primary-light': 'var(--primary-light-color)', // Pour `bg-primary-light`
        secondary: 'var(--secondary-color)', // Pour `bg-secondary`
        'secondary-light': 'var(--secondary-light-color)',
        border: 'var(--border-color)',
        background: 'var(--background-color)',
        text: 'var(--text-color)',
      },
      fontFamily: {
        sans: ['var(--font-family-base)', 'sans-serif'], // Pour `font-sans`
      },
    },
  },
}
