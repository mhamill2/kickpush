const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: colors.red['600']
      },
      boxShadow: {
        activeIcon: 'inset 0 2px ' + colors.red['600']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
