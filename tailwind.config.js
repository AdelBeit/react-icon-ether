/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/.dev_deps/App.tsx"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
