import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F6F4F6",
        primary: "#5F1478",
        secondary: "#E76316",
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(to right, #5F1478, #AE276F)",
      },
    },
  },
  plugins: [],
} satisfies Config;
