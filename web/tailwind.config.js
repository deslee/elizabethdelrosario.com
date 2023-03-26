/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1ca086'
      },
      typography: ({ theme }) => {
        return ({
          DEFAULT: {
            css: {
              '--tw-prose-links': theme('colors.primary'),
              'a': {
                'text-decoration': 'none',
              }
            }
          }
        });
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

