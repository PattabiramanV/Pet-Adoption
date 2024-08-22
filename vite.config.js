import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
/** @type {import('tailwindcss').Config} */

// https://vitejs.dev/config/
export default defineConfig({
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    optimizeDeps: {
    exclude: [
      'chunk-HKARQHL6.js',
      'chunk-IE4XGEBL.js'
    ]
  },
  theme: {
    extend: {},
  },
  plugins: [react()],
  server: {
    port: 3000, // Set your desired port number here
  },
})

