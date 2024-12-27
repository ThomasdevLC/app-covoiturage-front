/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': 'var(--primary-dark)',
        primary: 'var(--primary)',
        'primary-light': 'var(--primary-light)',
        'primary-muted': 'var(--primary-muted)',
        'secondary-dark': 'var(--secondary-dark)',
        secondary: 'var(--secondary)',
        'secondary-light': 'var(--secondary-light)',
        'secondary-muted': 'var(--secondary-muted)',
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
