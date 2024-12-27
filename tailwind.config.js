/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neutral: {
          1: "var(--color-neutral-1)",
          2: "var(--color-neutral-2)",
          3: "var(--color-neutral-3)",
          4: "var(--color-neutral-4)",
          5: "var(--color-neutral-5)",
        },
        primary: {
          1: "var(--color-primary-1)",
          2: "var(--color-primary-2)",
          3: "var(--color-primary-3)",
          4: "var(--color-primary-4)",
        },
        secondary: {
          1: "var(--color-secondary-1)",
          2: "var(--color-secondary-2)",
          3: "var(--color-secondary-3)",
          4: "var(--color-secondary-4)",
        },
        tertiary: {
          1: "var(--color-tertiary-1)",
          2: "var(--color-tertiary-2)",
          3: "var(--color-tertiary-3)",
          4: "var(--color-tertiary-4)",
        },
      },
      fontSize: {
        "display-xl": [
          "var(--font-display-xl-size)",
          {
            lineHeight: "var(--font-display-xl-line-height)",
            letterSpacing: "var(--font-display-xl-letter-spacing)",
          },
        ],
        "display-l": [
          "var(--font-display-l-size)",
          {
            lineHeight: "var(--font-display-l-line-height)",
            letterSpacing: "var(--font-display-l-letter-spacing)",
          },
        ],
        "display-m": [
          "var(--font-display-m-size)",
          {
            lineHeight: "var(--font-display-m-line-height)",
            letterSpacing: "var(--font-display-m-letter-spacing)",
          },
        ],
        "display-s": [
          "var(--font-display-s-size)",
          {
            lineHeight: "var(--font-display-s-line-height)",
            letterSpacing: "var(--font-display-s-letter-spacing)",
          },
        ],
        "display-xs": [
          "var(--font-display-xs-size)",
          {
            lineHeight: "var(--font-display-xs-line-height)",
            letterSpacing: "var(--font-display-xs-letter-spacing)",
          },
        ],
        "body-xl": [
          "var(--font-body-xl-size)",
          {
            lineHeight: "var(--font-body-xl-line-height)",
            letterSpacing: "var(--font-body-xl-letter-spacing)",
          },
        ],
        "body-l": [
          "var(--font-body-l-size)",
          {
            lineHeight: "var(--font-body-l-line-height)",
            letterSpacing: "var(--font-body-l-letter-spacing)",
          },
        ],
        "body-m": [
          "var(--font-body-m-size)",
          {
            lineHeight: "var(--font-body-m-line-height)",
            letterSpacing: "var(--font-body-m-letter-spacing)",
          },
        ],
        "body-s": [
          "var(--font-body-s-size)",
          {
            lineHeight: "var(--font-body-s-line-height)",
            letterSpacing: "var(--font-body-s-letter-spacing)",
          },
        ],
      },
    },
  },
  plugins: [],
};
