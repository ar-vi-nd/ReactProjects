/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // this configuration is specifically for tailwind to tell tailwind
  // that i want you to use this class (dark:bg-gray-800) based on the
  // the class "dark" in the html tag . Because by default it is set to media based
  // i.e. based on light or dark mode in decice settings 
  darkMode:"class",
  theme: {
    extend: {},
  },
  plugins: [],
}

