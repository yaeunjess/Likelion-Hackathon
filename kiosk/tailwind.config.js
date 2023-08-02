/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.js', './src/**/*.jsx', './src/**/*.js', './src/**/*.ts', './src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily : {
        'Jeju' : ['Jeju'], //font-Jeju
      },
      colors: {
        brown: '#7F4F1F',
        yellow:'#F8BF40',
        beige : '#EBE5DD',
        red: '#CF584A',
        darkred: '#A9411D',
        pink: '#CF584A',
<<<<<<< HEAD
        darkbrown: '#663D15',
        ivory: '#FFF8EE',
        gray: '#5B5B5B',
=======
        darkbrown: '#443010',
        whiteandgray: '#EFEFEF',
        mint:'#00F3B8'
>>>>>>> yaeun2
      },
    },
  },
  plugins: [],
}

