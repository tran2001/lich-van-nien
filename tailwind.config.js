/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        flash: {
          "0%, 100%": {
            boxShadow:
              "0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.5)",
          },
          "50%": {
            boxShadow:
              "0 0 20px rgba(255, 255, 255, 1), 0 0 40px rgba(255, 255, 255, 1)",
          },
        },
      },
      animation: {
        flash: "flash 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
  prefix: "tw-",
};
