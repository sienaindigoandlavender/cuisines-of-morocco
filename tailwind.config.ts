import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          DEFAULT: "#C2410C",
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          500: "#E85D26",
          600: "#C2410C",
          700: "#9A3412",
        },
        ink: {
          DEFAULT: "#1a1a1a",
          light: "#404040",
          muted: "#737373",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        body: ['"DM Sans"', '"Helvetica Neue"', "Arial", "sans-serif"],
        mono: ['"Space Mono"', "monospace"],
      },
      fontSize: {
        "display-xl": ["5rem", { lineHeight: "0.9", letterSpacing: "-0.02em" }],
        "display-lg": ["3.5rem", { lineHeight: "0.95", letterSpacing: "-0.01em" }],
        "display-md": ["2.25rem", { lineHeight: "1.1" }],
        "body-lg": ["1.0625rem", { lineHeight: "1.85" }],
        "body": ["0.9375rem", { lineHeight: "1.85" }],
        "caption": ["0.625rem", { lineHeight: "1.5", letterSpacing: "0.2em" }],
        "label": ["0.6875rem", { lineHeight: "1.5", letterSpacing: "0.15em" }],
      },
    },
  },
  plugins: [],
};

export default config;
