/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-light': 'var(--primary-light)',
        secondary: 'var(--secondary)',
        'secondary-light': 'var(--secondary-light)',
        border: 'var(--border)',
        background: 'var(--background)',
        text: 'var(--text)',
        error: 'var(--error)',
        neutral: 'var(--neutral)',

      },
      fontFamily: {
        sans: ['var(--font-family-base)', 'sans-serif'], // Pour `font-sans`
      },
    },
  },
}
