/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customblue: '#675bc8',
        customGray: '0px 0px 2px gray'
      },
    },
  },
  plugins: [],
}
