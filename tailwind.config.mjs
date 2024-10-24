import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        fontSize: {
            xs: ['0.75rem', '1rem'],
            sm: ['1rem', '1.5rem'],
            base: ['1.25rem', '1.75rem'],
            lg: ['1.5rem', '2rem'],
            xl: ['1.875rem', '2.25rem'],
            '2xl': ['2.25rem', '2.5rem'],
            '3xl': ['3rem', '3.5rem'],
            '4xl': ['3.75rem', '4.25rem'],
            '5xl': ['4.5rem', '5rem'],
            '6xl': ['6rem', '6.5rem'],
            '7xl': ['8rem', '8.5rem'],
        },
        extend: {
            fontFamily: {
                sans: ['Noto Sans', ...defaultTheme.fontFamily.sans],
            },
            colors: {},
        },
    },
    plugins: [require('@tailwindcss/typography')],
}
