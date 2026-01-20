import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      "3xs": "350px",
      "2xs": "400px",
      xs: "475px",
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        sketch: ["CabinSketch", ...defaultTheme.fontFamily.mono],
        // Use clean, modern system fonts that match iOS aesthetic
        sans: ["Inter", "SF Pro Display", ...defaultTheme.fontFamily.sans],
      },
      animation: {
        "meteor-effect": "meteor 5s linear infinite",
      },
      keyframes: {
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
      },
      // App-matching color palette
      colors: {
        home: {
          blue: "#007AFF",      // iOS blue - primary accent
          green: "#34C759",     // iOS green - progress/success
          orange: "#FF9500",    // iOS orange - warnings
          red: "#FF3B30",       // iOS red - errors
          gray: "#8E8E93",      // iOS gray - secondary text
          light: "#F2F2F7",     // iOS light background
        },
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    themes: [
      // Clean, modern iOS-inspired theme matching the app
      {
        home: {
          "primary": "#007AFF",           // iOS blue
          "primary-content": "#FFFFFF",   // White text on blue
          "secondary": "#34C759",         // iOS green for progress
          "secondary-content": "#FFFFFF", // White text on green
          "accent": "#FF9500",            // iOS orange
          "accent-content": "#FFFFFF",    // White text on orange
          "neutral": "#1C1C1E",           // iOS dark gray
          "neutral-content": "#FFFFFF",   // White text
          "base-100": "#FFFFFF",          // Pure white background
          "base-200": "#F2F2F7",          // iOS light gray background
          "base-300": "#E5E5EA",          // iOS separator gray
          "base-content": "#1C1C1E",      // Dark text
          "info": "#5AC8FA",              // iOS light blue
          "success": "#34C759",           // iOS green
          "warning": "#FF9500",           // iOS orange
          "error": "#FF3B30",             // iOS red
          "--rounded-box": "1rem",
          "--rounded-btn": "0.75rem",
          "--rounded-badge": "1.5rem",
          "--animation-btn": "0.2s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.98",
          "--border-btn": "0px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem",
        },
      },
      // Dark mode matching iOS dark appearance
      {
        "home-dark": {
          "primary": "#0A84FF",           // iOS blue (dark mode)
          "primary-content": "#FFFFFF",   // White text
          "secondary": "#30D158",         // iOS green (dark mode)
          "secondary-content": "#FFFFFF", // White text
          "accent": "#FF9F0A",            // iOS orange (dark mode)
          "accent-content": "#000000",    // Black text on orange
          "neutral": "#F2F2F7",           // Light for contrast
          "neutral-content": "#1C1C1E",   // Dark text
          "base-100": "#000000",          // Pure black background
          "base-200": "#1C1C1E",          // iOS dark gray
          "base-300": "#2C2C2E",          // iOS elevated dark
          "base-content": "#FFFFFF",      // White text
          "info": "#64D2FF",              // iOS light blue (dark)
          "success": "#30D158",           // iOS green (dark)
          "warning": "#FF9F0A",           // iOS orange (dark)
          "error": "#FF453A",             // iOS red (dark)
          "--rounded-box": "1rem",
          "--rounded-btn": "0.75rem",
          "--rounded-badge": "1.5rem",
          "--animation-btn": "0.2s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.98",
          "--border-btn": "0px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem",
        },
      },
    ],
  },
};
