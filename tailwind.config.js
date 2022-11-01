/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#0095f6",
        facebook: "#385185",
        link: "#00376b",
      },
      backgroundImage: {
        "login-pattern":
          "url('https://static.cdninstagram.com/rsrc.php/v3/yr/r/fzBXVxs22bH.png')",
      },
    },
  },
  plugins: [],
};