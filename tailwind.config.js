/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eefdf8',
          100: '#d6f8ed',
          200: '#b1efdc',
          300: '#7ee0c5',
          400: '#45c8a5',
          500: '#21a98a',
          600: '#168871',
          700: '#136d5d',
          800: '#12574c',
          900: '#10483f',
        },
        carbon: {
          50: '#f7f8f8',
          100: '#e9ecec',
          200: '#d3d9d9',
          300: '#aebaba',
          400: '#829394',
          500: '#627575',
          600: '#4d5f60',
          700: '#3f4e4f',
          800: '#364244',
          900: '#30393a',
          950: '#1b2223',
        },
        warning: {
          50: '#fff8eb',
          100: '#fdebc8',
          200: '#fbd68d',
          300: '#f8ba52',
          400: '#f59c20',
          500: '#e77f12',
          600: '#c65e0d',
          700: '#9e4210',
          800: '#813415',
          900: '#6c2d14',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 45px -30px rgba(27, 34, 35, 0.35)',
      },
    },
  },
  plugins: [],
};
