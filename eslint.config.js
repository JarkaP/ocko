import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import globals from 'globals'

export default [
    js.configs.recommended,
    eslintConfigPrettier,
    {
        languageOptions: {
            ecmaVersion: 'latest',
            globals: {
                route: 'readonly',
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            indent: ['error', 4],
            'linebreak-style': ['error', 'unix'],
            quotes: ['error', 'single'],
            'space-in-parens': ['error', 'never'],
            yoda: ['error', 'never'],
            semi: ['error', 'never'],
            'no-console': 1,
            'vue/multi-word-component-names': 0,
        },
        ignores: ['min.js', '**/vendor/*.js'],
    },
]
