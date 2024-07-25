/** @type {import('tailwindcss').Config} */
const nativewind = require('nativewind/tailwind/native');

module.exports = {
  darkMode: ['class'],
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/screens/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
    colors: {
      gray: {
        50: '#FCFCFC',
        100: '#F8F8F9',
        200: '#E9ECEF',
        300: '#C9CCD1',
        400: '#9EA4AA',
        500: '#72787F',
        600: '#454C53',
      },
      dark: {
        800: '#26282B',
        900: '#1D2002',
      },
      green: {
        50: '#FBFFF5',
        100: '#F2FFE0',
        200: '#E3FCBF',
        300: '#CBFAC4',
        400: '#B8F1B0',
        500: '#84DE77',
        600: '#14C38E',
      },
      white: '#FFFFFF',
      black: '#000000',
      error: '#ff3E3E',
      warning: '#FFB800',
      main: '#00F0A1',
    },
    fontFamily: {
      bold: ['Pretendard-Bold'],
      light: ['Pretendard-Light'],
      medium: ['Pretendard-Medium'],
    },
  },
  plugins: [nativewind()],
};
