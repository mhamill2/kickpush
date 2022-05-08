const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['"Open Sans"', ...defaultTheme.fontFamily.sans]
    },
    extend: {
      colors: {
        primary: colors.red['600'],
        primaryDark: colors.red['700'],
        secondary: colors.gray['300'],
        secondaryDark: colors.gray['400'],
        googleBlue: '#4285f4',
        facebookBlue: '#3b5998'
      },
      boxShadow: {
        activeIcon: 'inset 0 2px ' + colors.red['600']
      },
      lineHeight: {
        1: '0.1rem'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('tailwind-scrollbar-hide')]
};
