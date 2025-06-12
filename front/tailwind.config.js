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
                sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                serif: ['Merriweather', 'serif'],
            },
            fontSize: {
                xs: '0.75rem',
                sm: '0.875rem',
                base: '1rem',
                lg: '1.125rem',
                xl: '1.25rem',
                '2xl': '1.5rem',
                '3xl': '1.875rem',
            }
        }
    },
    plugins: [],
};