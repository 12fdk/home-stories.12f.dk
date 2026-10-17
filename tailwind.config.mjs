import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,mjs,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      "3xs": "350px",
      "2xs": "400px",
      xs: "475px",
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        // One family does all the work. Inter covers the scripts General Sans
        // lacks (Cyrillic for /ru/); CJK falls through to the system face.
        display: ["General Sans", "Inter", ...defaultTheme.fontFamily.sans],
        sans: ["General Sans", "Inter", ...defaultTheme.fontFamily.sans],
      },
      letterSpacing: {
        tightest: "-0.035em",
        label: "0.12em",
      },
      colors: {
        // The homepage fields, as utilities for the components that paint them
        graphite: "#18191B",
        "graphite-2": "#222427",
        mist: "#EBEBE7",
        "mist-2": "#DEDEDA",
        ply: "#DCC095",
        signal: "#FF4A1F",
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
      // "Graphite and orange" — the app icon's orange on a cool graphite and a
      // cool light grey. Orange is for the action; everything else is ink on
      // ground. The homepage paints its own fields (styles.scss, --hs-*), so
      // these two themes are what the blog, guides and legal pages read.
      {
        home: {
          primary: "#FF4A1F",
          "primary-content": "#18191B",
          secondary: "#18191B",
          "secondary-content": "#EBEBE7",
          accent: "#FF4A1F",
          "accent-content": "#18191B",
          neutral: "#18191B",
          "neutral-content": "#EBEBE7",
          "base-100": "#EBEBE7",
          "base-200": "#DEDEDA",
          "base-300": "#CFCFCA",
          "base-content": "#18191B",
          info: "#2F6FDE",
          success: "#1F7A5C",
          warning: "#C2410C",
          error: "#C8261B",
          "--rounded-box": "0",
          "--rounded-btn": "0",
          "--rounded-badge": "0",
          "--animation-btn": "0.2s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.98",
          "--border-btn": "0px",
        },
      },
      {
        "home-dark": {
          primary: "#FF4A1F",
          "primary-content": "#18191B",
          secondary: "#EBEBE7",
          "secondary-content": "#18191B",
          accent: "#FF4A1F",
          "accent-content": "#18191B",
          neutral: "#222427",
          "neutral-content": "#EBEBE7",
          "base-100": "#18191B",
          "base-200": "#222427",
          "base-300": "#303236",
          "base-content": "#EBEBE7",
          info: "#7AA7FF",
          success: "#3FBF8F",
          warning: "#FF8A5C",
          error: "#FF6B60",
          "--rounded-box": "0",
          "--rounded-btn": "0",
          "--rounded-badge": "0",
          "--animation-btn": "0.2s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.98",
          "--border-btn": "0px",
        },
      },
    ],
  },
};
