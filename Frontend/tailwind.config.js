/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    mode: "jit",
    theme: {
      extend: {
        fontFamily: {
          sans: ["Monospace", "monospace"],
          poppins: ["Poppins", "sans-serif"],
        },
        screens: {
          "400px": "400px",
          "800px": "800px",
          "1000px": "1050px",
          "1100px": "1110px",
          "1300px": "1300px"
        },
      },
    },
    plugins: [],
  }
  