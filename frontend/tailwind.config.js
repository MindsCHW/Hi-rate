/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0D6EFD",
        sidebar: {
          active: "#0056B3"
        },
        pageBg: "#F5F7FA",
        cardBg: "#FFFFFF",
        borderColor: "#E5E7EB",
        textColor: "#374151",
        muted: "#6B7280"
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
