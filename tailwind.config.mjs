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
        // Archivo: industrial grotesque, used for display sizes only
        display: ["Archivo", "Inter", ...defaultTheme.fontFamily.sans],
        sans: ["Inter", "SF Pro Text", ...defaultTheme.fontFamily.sans],
        // IBM Plex Mono: labels, figures, dimension annotations
        mono: ["IBM Plex Mono", ...defaultTheme.fontFamily.mono],
      },
      letterSpacing: {
        tightest: "-0.035em",
        label: "0.12em",
      },
      colors: {
        // The one signature colour: tape-measure yellow
        tape: "#FFC300",
      },
      keyframes: {
        "rail-fill": {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
      },
      animation: {
        "rail-fill": "rail-fill 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    themes: [
      // "Measured" — drafting ink on paper, App Store blue for actions,
      // tape yellow reserved for the dimension rail.
      {
        home: {
          primary: "#0A6CF1",
          "primary-content": "#FFFFFF",
          secondary: "#1F7A5C",
          "secondary-content": "#FFFFFF",
          accent: "#FFC300",
          "accent-content": "#14181C",
          neutral: "#14181C",
          "neutral-content": "#FBFBF9",
          "base-100": "#FBFBF9",
          "base-200": "#F2F2EF",
          "base-300": "#E3E3DE",
          "base-content": "#14181C",
          info: "#0A6CF1",
          success: "#1F7A5C",
          warning: "#E08600",
          error: "#D9342B",
          "--rounded-box": "0.75rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "0.375rem",
          "--animation-btn": "0.2s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.98",
          "--border-btn": "0px",
        },
      },
      {
        "home-dark": {
          primary: "#4C93FF",
          "primary-content": "#08111F",
          secondary: "#3FBF8F",
          "secondary-content": "#08150F",
          accent: "#FFC300",
          "accent-content": "#14181C",
          neutral: "#1A1F24",
          "neutral-content": "#F0F0EC",
          "base-100": "#0F1215",
          "base-200": "#171B1F",
          "base-300": "#252B31",
          "base-content": "#F0F0EC",
          info: "#4C93FF",
          success: "#3FBF8F",
          warning: "#FFA92E",
          error: "#FF6B60",
          "--rounded-box": "0.75rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "0.375rem",
          "--animation-btn": "0.2s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.98",
          "--border-btn": "0px",
        },
      },
    ],
  },
};
