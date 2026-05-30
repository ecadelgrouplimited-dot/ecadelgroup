import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand backgrounds — dark navy/black
        obsidian: "#060608",
        graphite: "#0E1018",
        carbon: "#131720",
        navy: "#141928",
        // Brand accent — gold (replaces green)
        emerald: {
          deep: "#C8A96E",   // primary gold
          glow: "#D4B97E",   // lighter gold
        },
        // Navy graph node color
        indigo: {
          deep: "#0D1220",
        },
        // Text
        platinum: "#C8C4BE",    // secondary text (warm) — lifted from #9A9590 for readability
        softwhite: "#F0EDE6",   // primary text — warm cream
        cream: "#F0EDE6",
        muted: "#7A7670",       // lifted from #5A5650 for readability
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(200,169,110,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.04) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(ellipse at center, rgba(200,169,110,0.10) 0%, transparent 70%)",
      },
      backgroundSize: {
        grid: "60px 60px",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "grid-flow": "grid-flow 20s linear infinite",
        "fade-in-up": "fade-in-up 0.8s ease forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "grid-flow": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "60px 60px" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(200,169,110,0.25)",
        "glow-sm": "0 0 20px rgba(200,169,110,0.15)",
        "glow-lg": "0 0 80px rgba(200,169,110,0.30)",
      },
    },
  },
  plugins: [],
};

export default config;
