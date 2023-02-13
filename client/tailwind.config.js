/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark : "var(--dark)",
        highlight : "var(--highlight)",
        primary: "var(--primary)",
        primaryHover: "var(--primary-hover)"
      }
    },
  },
  plugins: [],
}
