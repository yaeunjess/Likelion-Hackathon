/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.js', './src/**/*.jsx', './src/**/*.js', './src/**/*.ts', './src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily : {
        'Jeju' : ['Jeju'],
      },
      colors: {
        brown: '#7F4F1F',
        yellow:'#F8BF40',
        beige : '#EBE5DD',
        red: '#CF584A',
        darkred: '#A9411D',
        pink: '#CF584A',
      },
    },
  },
  plugins: [],
}
