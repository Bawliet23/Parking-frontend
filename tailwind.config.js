/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontFamily: {
      netflixSans: 'Netflix Sans',
      tiltPrism: 'Tilt Prism',
    },
  },
  plugins: [],
};
