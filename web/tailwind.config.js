const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--sans-font)', ...fontFamily.sans],
        sans: ['var(--sans-font)', ...fontFamily.sans],
      },
      colors: {
        primary: '#1ca086'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
