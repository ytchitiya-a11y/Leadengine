import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body: ["'Outfit'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        bg: {
          base: "#060810",
          surface: "#0c0f1a",
          elevated: "#111527",
          overlay: "#171c30",
          hover: "#1e2438",
        },
        border: {
          DEFAULT: "#1e2438",
          subtle: "#151929",
          strong: "#2a3250",
          accent: "#3d4f8a",
        },
        accent: {
          DEFAULT: "#4f74ff",
          hover: "#3d62f0",
          muted: "rgba(79,116,255,0.12)",
          glow: "rgba(79,116,255,0.25)",
        },
        emerald: {
          glow: "rgba(52,211,153,0.15)",
        },
        amber: {
          glow: "rgba(251,191,36,0.15)",
        },
        rose: {
          glow: "rgba(251,113,133,0.15)",
        },
        text: {
          primary: "#e8ecf8",
          secondary: "#8892b0",
          muted: "#4a5578",
          inverse: "#060810",
        },
        hot: "#ff4d6a",
        warm: "#f5a623",
        cold: "#4f74ff",
        success: "#34d399",
        warning: "#fbbf24",
        danger: "#f87171",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "mesh-1":
          "radial-gradient(at 20% 20%, rgba(79,116,255,0.08) 0px, transparent 50%), radial-gradient(at 80% 80%, rgba(167,139,250,0.06) 0px, transparent 50%)",
        "card-shine":
          "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease forwards",
        "slide-up": "slideUp 0.4s ease forwards",
        "slide-right": "slideRight 0.3s ease forwards",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        shimmer: "shimmer 1.5s infinite",
        "count-up": "countUp 1s ease forwards",
        "border-flow": "borderFlow 3s linear infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideRight: {
          from: { opacity: "0", transform: "translateX(-16px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        borderFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        glow: "0 0 24px rgba(79,116,255,0.2)",
        "glow-sm": "0 0 12px rgba(79,116,255,0.15)",
        card: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)",
        "card-hover":
          "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
        hot: "0 0 20px rgba(255,77,106,0.25)",
        success: "0 0 20px rgba(52,211,153,0.2)",
      },
    },
  },
  plugins: [],
};
export default config;
