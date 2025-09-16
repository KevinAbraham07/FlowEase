/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",          // important for vite
    "./src/**/*.{js,ts,jsx,tsx}", // all js/jsx/ts/tsx files inside src
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
