/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#08090C",
        panel: "#11141A",
        steel: "#1C2129",
        line: "#2A3140",
        bone: "#F2EFE8",
        ember: "#F97316",
        signal: "#3DB8A6",
      },
      fontFamily: {
        display: ["Outfit", "Inter", "Poppins", "sans-serif"],
        sans: ["Inter", "Poppins", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
