/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF9000",
        secondary: "#1B1B1B",
        accent: "#F1C582 ",
        lightSecond: "#3F3F3F",
      },
    },
    screens: {
      little: "320px",
      sm: "640px",
      md: "768px",
      hamburger: "1000px",
      lg: "1024px",
      car: "1918px",
      xl: "1280px",
    },
  },
  plugins: [],
};
