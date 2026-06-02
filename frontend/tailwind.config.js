/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#C4956A",  // Warm caramel
        cream: "#F6EFE3",    // Ivory backdrop
        cocoa: "#5D4037",    // Deep cocoa text
        gold: "#C9962B"      // Gold accents
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "sans-serif"],
        signature: ["Allison", "cursive"]
      }
    },
  },
  plugins: [],
}
