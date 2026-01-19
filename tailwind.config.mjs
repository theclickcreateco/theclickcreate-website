
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Enable class-based dark mode for next-themes
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#264653',
          teal: '#2A9D8F',
          yellow: '#E9C46A',
          orange: '#F4A261',
          red: '#E76F51',
        }
      }
    },
  },
  plugins: [],
};
