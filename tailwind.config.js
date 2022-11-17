/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    
    extend: {
      backgroundImage: {
        'light-pattern': "url('./images/pattern-light.svg')",
        'dark-pattern': "url('./images/pattern-dark.svg')",
        'stars': "url('./images/stars.svg')",
        'cloud': "url('./images/cloud.svg')",
      },
      screens: {
        '3xl': '1850px',
      },
      colors: {
        'black': '#1D1D1D',
        'white': '#f0f0f0',
        'midnight': '#462CB0',
        'midnight-light': '#5E579F',
        'green-light': '#63B1AD',
      },
      fontFamily: {
        'italiana': ['Italiana']
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
