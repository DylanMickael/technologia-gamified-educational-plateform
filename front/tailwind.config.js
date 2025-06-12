export default {
    darkMode: 'class',
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                navbg: {
                    light: '#ffffff',
                    dark: '#242438',
                },
                background: {
                    light: '#FCFFF9',
                    dark: '#08071F',
                },
                text: {
                    light: '#1f2937',
                    dark: '#f3f4f6',
                }
            }, 
            fontFamily: {
                space: ['Space Grotesk', 'sans-serif'],
                monument: ['Monument Extended', 'sans-serif'],
                poppins: ['Poppins', 'sans-serif'],
            },
        }
    },
    plugins: [],
};