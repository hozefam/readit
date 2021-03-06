module.exports = {
  purge: ["./**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        body: ["IBM Plex Sans"],
      },
      spacing: {
        70: "17.5rem",
        160: "40rem",
      },
      colors: {
        blue: {
          100: "#cce4f6",
          200: "#99c9ed",
          300: "#66afe5",
          400: "#3394dc",
          500: "#0079d3",
          600: "#0061a9",
          700: "#00497f",
          800: "#003054",
          900: "#00182a",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
