import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // Hapus "src/" karena folder app dan components kamu ada di luar (root)
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'sag-blue': '#013599', 
        'sag-white': '#ffffff',
      },
    },
  },
  plugins: [],
};
export default config;