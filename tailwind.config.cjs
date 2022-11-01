/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",'./node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {
    xsm:'400px',
    sm:'640px',
    md:'768px',
    lg:'1024px',
    xl:'1280px',
    '2xl':'1536px',
    extend:{
      fontFamily:{
        'burtons' : "burtons",
        'poppins': ['Poppins', 'sans-serif'],
        'Roboto_Mono': ['Roboto Mono', 'monospace'],
        'Gemini_Libre': ['Gemunu Libre', 'sans-serif'],
      }
    }
    
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}