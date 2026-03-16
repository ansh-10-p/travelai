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
        background: "#F8F7F3",
        surface: "#EFEDE6",
        accent: "#A67C52",
        "accent-light": "#C4A07A",
        "accent-dark": "#8B6340",
        text: {
          DEFAULT: "#1A1A1A",
          muted: "#6B6B6B",
          light: "#9B9B9B",
        },
        border: "#E5E3DC",
        card: "#FAFAF8",
        white: "#FFFFFF",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 1px 3px 0 rgba(0,0,0,0.04), 0 1px 2px -1px rgba(0,0,0,0.04)",
        card: "0 4px 16px 0 rgba(26,26,26,0.06), 0 1px 4px 0 rgba(26,26,26,0.04)",
        "card-hover": "0 8px 32px 0 rgba(26,26,26,0.10), 0 2px 8px 0 rgba(26,26,26,0.06)",
        float: "0 16px 48px 0 rgba(26,26,26,0.12), 0 4px 16px 0 rgba(26,26,26,0.08)",
        glass: "0 8px 32px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "float-medium": "float 4s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        shimmer: "shimmer 2s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
