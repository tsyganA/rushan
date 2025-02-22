const config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}', // для Next.js (App Router)
        './pages/**/*.{js,ts,jsx,tsx}', // для Next.js (Pages Router)
        './components/**/*.{js,ts,jsx,tsx}', // для кастомных компонентов
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};

export default config;
