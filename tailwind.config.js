/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        spaceGrotesk: ['Space Grotesk', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
      colors: {
        'black' : "#000000",
        "b-black": "#191919",
        "white": "#FFFFFF",
        "l-white": "#D4D4D4",
        "t-white": "#9C9C9C",
        "orange": "#FF4C00",
        'light-orange': '#FFD580',
      }
    },
  },
  plugins: [],
}