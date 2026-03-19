/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // Tambahkan @ di depannya
    autoprefixer: {},
  },
};

export default config;