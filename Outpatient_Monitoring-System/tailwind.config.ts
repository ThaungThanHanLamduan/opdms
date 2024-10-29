import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#4E98B8",
        primaryhover: "#67A9C8",
        primartactive: "#3B7A91"
      },
      fontFamily: {
        noto: ["Noto Sans", "sans-serif"]
      }
    },
  },
  plugins: [],
};
export default config;
