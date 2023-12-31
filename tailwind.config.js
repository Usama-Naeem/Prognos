/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#A94FC9",
        secondaryColor: "#2Fd4db",
        tertiaryColor: "#E68453",
        successColor: "#ED4B9E",
        darkColor: "#09344D",
        textColor: "#4A4A68",
        subtleTextColor: "#8C8CA1",
        accentColor: "#ECF1F4",
        lightColor: "#FAFCFE",
        lightBackgroundColor: "#E5E5E5",
        tableHeaderColor: "#FAFAFA",
        borderColor: "#D9D9D9",
      },
      fontFamily: {
        sans: ["Work Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
