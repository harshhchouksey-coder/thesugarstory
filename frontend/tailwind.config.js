/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6B3F2A",  // Burnt caramel
        cream: "#F6EFE3",    // Ivory backdrop
        cocoa: "#1F1410",    // Rich headings/footer
        gold: "#C9962B",     // Accents
        stone: "#A8A095",    // Borders/muted
        rose: "#D08A7E",     // Festival/sale accent
        success: "#5C7F5A",  // Success
        error: "#A53F2B"     // Error
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
