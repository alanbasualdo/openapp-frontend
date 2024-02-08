/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customGreen: "#cdeda1", // Puedes ajustar el valor del color según tus preferencias
      },
    },
  },
  plugins: [],
};
