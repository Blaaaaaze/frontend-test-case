import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
    globalIgnores(['dist/**']),
    {
        files: ['**/*.{js,jsx,mjs}'],
        extends: [
            js.configs.recommended,
        ],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        rules: {
            indent: ['error', 4],
            eqeqeq: 'error',
            quotes: ['error', 'single', { avoidEscape: true }],
            semi: ['error', 'always'],
            'no-unused-vars': 'warn',
            'no-console': 'warn',
        },
    },
    {
        files: ['src/**/*.{js,jsx}'],
        extends: [
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        plugins: {
            react,
        },
        rules: {
            'react/jsx-uses-vars': 'error',
            'react/jsx-indent': ['error', 4],
            'react/jsx-indent-props': ['error', 4],
            'jsx-quotes': ['error', 'prefer-double'],
        },
    },
]);