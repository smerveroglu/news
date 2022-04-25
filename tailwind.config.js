module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    // "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      width: {
        sidebar: "350px",
        search: "400px",
      },
      rotate: {
        137: "137deg",
      },
      backgroundColor: {
        packed: "#A9BACC",
        // packed: "#f2f2f2", you can use this color if you like
      },
      colors: {
        primary: "rgb(36 100 167)",
      },
      fontFamily: {
        lexend: "'Lexend', sans-serif",
      },
    },
  },
  plugins: [],
};
