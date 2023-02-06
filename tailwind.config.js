/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/input.css", "./src/**/**/*.{html,js,php}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: ({ colors }) => ({
        primary: '#4252ff',
        primarydark: '#3643d7',
        primarydarker: '#3944c7',
        secondary: '#e5e7eb',
        secondarydark: '#d1d5db',
        secondarydarker: '#c2c6cb',
      })},
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      animation: {
        spin: 'spin 1s linear infinite',
      }
  },
  plugins: [],
}