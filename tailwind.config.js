/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#B39B8E',
        secondary: '#2C2C2C',
      },
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [],
}