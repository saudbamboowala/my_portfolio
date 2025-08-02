/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",           // Scans the root HTML file (exists in Vite projects)
    "./src/**/*.{js,ts,jsx,tsx}", // Scans all JS/TS/JSX/TSX files in the src directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

