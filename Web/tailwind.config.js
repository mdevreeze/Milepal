/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./wwwroot/**/*.{html,js}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#4f46e5',
          secondary: '#7e22ce',
        },
      },
    },
  },
  plugins: [],
};
