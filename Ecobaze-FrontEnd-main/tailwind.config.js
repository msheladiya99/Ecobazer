/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        footer: "repeat(auto-fit, minmax(200px, 1fr))",
        cart: "1fr 300px",
        table: "2fr 1fr 1fr 1fr 0.5fr",
        about: "repeat(auto-fit, minmax(280px, 1fr))",
        userDashboard: "250px 1fr",
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        sm: { max: "426px" },
        md: { min: "426px", max: "769px" },
        lg: { min: "769px" },
      },
    },
  },
  plugins: [],
};
