import type { Config } from "tailwindcss";
const colors = require('tailwindcss/colors');

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'app-green': {
          'default': '#00e4de',
          800: '#03c4bd'
        },
        'app-grey': {
          100: '#cccccc',
          900: '#0d1829'
        }
      },
    },
  },
  plugins: [],
};
export default config;
