/** @type {import("prettier").Config} */
export default {
    singleQuote: true,
    semi: false,
    trailingComma: 'es5',
    printWidth: 100,
    tabWidth: 4,
    htmlWhitespaceSensitivity: 'ignore',
    plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
    overrides: [
        {
            files: '*.astro',
            options: {
                parser: 'astro',
            },
        },
    ],
}
