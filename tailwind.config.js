/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customPurple: '#2E256F',
        customGreen: '#00FF00', 
        lightPurpule:'#675BC8'
      },

    },
  },
  plugins: [],
}

