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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#8c7eff",
        "primary-light": "#b8afff",
        "primary-dark": "#6a5dcf",
        "primary-ultralight": "#f5f3ff",
        "text-on-primary": "#ffffff",
        accent: "#ff8cbc",
      },
    },
  },
  plugins: [],
} satisfies Config;
