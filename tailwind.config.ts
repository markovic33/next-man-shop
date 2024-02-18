import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#178626",
          secondary: "#2edc46",
          neutral: "#e2f6e1",
          error: "#d91b15",
          body: {
            "background-color": "#6b7453",
          },
        },
      },
      "dark",
      "cupcake",
    ],
  },
};
export default config;
