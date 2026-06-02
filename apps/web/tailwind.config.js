/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "../../packages/shared/src/**/*.ts"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6B3F2A",  // Deep cocoa-caramel
        cream: "#F6EFE3",    // Warm premium ivory backdrop
        gold: "#C9962B",     // Exquisite metallic accents
        cocoa: "#1F1410",    // Rich text contrast
        stone: "#A8A095",    // Elegant dividers and stone-grey borders
        rose: "#D08A7E",     // Pastel rose icing
        success: "#5C7F5A",  // Sage green
        error: "#A53F2B"     // Premium crimson red
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        signature: ["var(--font-allison)", "cursive"]
      },
      spacing: {
        'section-y': '120px', // section padding 96-160px custom scaling
      }
    },
  },
  plugins: [],
}
