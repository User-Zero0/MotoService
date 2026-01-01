/** @type {import('postcss-load-config').Config} */
const config = {
    plugins: {
        '@tailwindcss/postcss': {}, // Используем новый пакет вместо просто 'tailwindcss'
    },
};

export default config;