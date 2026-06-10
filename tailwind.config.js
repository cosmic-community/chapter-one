/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#faf6f0',
        ink: '#2b2620',
        sepia: '#6b5d4f',
        accent: '#8b5e3c',
        'accent-dark': '#6e4a2e',
        paper: '#fffdfa',
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        prose: '680px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}