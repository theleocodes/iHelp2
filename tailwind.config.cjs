/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,css,scss,sass}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        mon: ["Monsterrat", "sans-serif"],
      },
      colors: {
        vio: "#a87ff3",
      },
    },
    screens: {
      xs: "430px",
      tablet: "768px",
      lessthan900: "900px",
      md: "1025px",
      lg: "1440px",
      xl: "2560px",
    },
  },

  plugins: [],
};
