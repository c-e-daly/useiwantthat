import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "cgo-fibonacci":
          'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'%3E%3Ccircle cx=\'1\' cy=\'1\' r=\'1\' fill=\'black\' fill-opacity=\'0.16\'/%3E%3C/svg%3E")',
      },
      colors: {
        brand: {
          DEFAULT: "#266DF0",
          deep: "#1A4CB0",
          bright: "#4D89F5",
          active: "#0442bf",
        },
        sidebar: {
          bg: "#FFFFFF",
          text: "#334155", // Dark Grey
          hover: "#ffa300", // Accent Orange
          border: "#E2E8F0",
        },
        accent: {
          green: "#80bf9b",
          teal: "#85d9b4",
          orange: "#ffa300",
          blue: "#0442bf",
        },
        neutral: {
          dark: "#000000",
          muted: "#666666",
        },
        surface: {
          canvas: "#FFFFFF",
          card: "#ffffff",
          subtle: "#F5F5F7",
          border: "#E2E8F0",
        },
        stroke: {
          dark: "#000000",
          subtle: "#e5e7eb",
        },
        shopping: {
          DEFAULT: "#266DF0",
          deep: "#1A4CB0",
          bright: "#4D89F5",
          light: "#F6FAE8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-kaushan)", "cursive"],
      },
      borderRadius: {
        askrami: "6px",
        pill: "9999px",
      },
      boxShadow: {
        soft: "4px 4px 12px 0px rgba(0, 0, 0, 0.03)",
        "portal-soft": "4px 4px 12px 0px rgba(0, 0, 0, 0.04)",
        card: "2px 2px 8px 0px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
