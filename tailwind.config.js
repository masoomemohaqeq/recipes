/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        md: "1rem",
        lg: "3rem",
        xl: "12rem",
        "2xl": "12rem",
      },
    },
    extend: {
      boxShadow: {
        "3xl": "6px 6px 0px -1px #ffd977",
      },
    },
  },
  plugins: [],
};
