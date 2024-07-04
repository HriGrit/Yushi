/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-bg': "url('/src/assets/Login2.webp')",
      },
      colors: {
        primary: {
          50: '#f7f7e2',
          100: '#efefc6',
          200: '#e5e59d',
          300: '#dbdb74',
          400: '#ccc24d',
          500: '#A1A044', // Base color 1
          600: '#8e8f3b',
          700: '#76782f',
          800: '#5e5e24',
          900: '#4c4b1d',
        },
        secondary: {
          50: '#f1f4f5',
          100: '#dce3e6',
          200: '#c5d0d4',
          300: '#adc0bf',
          400: '#95afb0',
          500: '#4A5D63', // Base color 2
          600: '#425255',
          700: '#394448',
          800: '#30393b',
          900: '#282f30',
        },
        complementary1: {
          500: '#44A1A0',
        },
        complementary2: {
          500: '#A044A1',
        },
        analogous1: {
          500: '#A08C44',
        },
        analogous2: {
          500: '#8CA044',
        },
        light: {
          500: '#C1C07E',
        },
        dark: {
          500: '#737230',
        },
        grayish: {
          500: '#4A5D63',
        },
      },
    },
  },
  plugins: [],
  darkMode: "class"
}