/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        netflix: ['"Netflix Sans"'],
        tilt: ['"Tilt Prism"', ...defaultTheme.fontFamily.tilt],
      },
    },
  },
  plugins: [],
};
