/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      // eslint-disable-next-line no-undef
      ...require('tailwindcss/colors'),
      neutral: {
        900: '#151515',
        700: '#3c3c3c',
        500: '#8a8a8a',
        300: '#d0d0d0',
        100: '#ffffff',
      },
    },
    extend: {
      colors: {
        danger: '#fa2c5a',
        success: '#df9947',
        warning: '#f9cc00',
        darkblue: {
          900: '#091b6f',
          700: '#0d28a6',
          500: '#5e70c4',
          300: '#aeb7e1',
          100: '#cfd4ed',
        },
        limegreen: {
          900: '#3d7b3f',
          700: '#5cb85f',
          500: '#92d094',
          300: '#c9e7ca',
          100: '#def1df',
        },
      },
      fontFamily: {
        sans: ['Helvetica', 'sans-serif'],
        display: ['Rubik'],
      },
      boxShadow: {
        low: '0px 0px 4px 0px rgba(0, 0, 0, 0.15)',
        high: '0px 0px 10px 0px rgba(0, 0, 0, 0.15)',
      },
      gridTemplateColumns: {
        19: 'repeat(19, minmax(0, 1fr))',
        28: 'repeat(28, minmax(0, 1fr))',
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        'input[type="number"]::-webkit-outer-spin-button': {
          '-webkit-appearance': 'none',
          margin: 0,
        },
        'input[type="number"]::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
          margin: 0,
        },
        'input[type="number"]': {
          '-moz-appearance': 'textfield',
        },
      })
    },
  ],
}
