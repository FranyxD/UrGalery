/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    
    extend: {
      backgroundImage: {
        'light-pattern': "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='72' viewBox='0 0 36 72'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%230f0f0f' fill-opacity='0.3'%3E%3Cpath d='M2 6h12L8 18 2 6zm18 36h12l-6 12-6-12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
        'dark-pattern': "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='72' viewBox='0 0 36 72'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23f0f0f0' fill-opacity='0.19'%3E%3Cpath d='M2 6h12L8 18 2 6zm18 36h12l-6 12-6-12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
      },
      screens: {
        '3xl': '1850px',
      },
      colors: {
        'black': '#0f0f0f',
        'white': '#f0f0f0',
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
