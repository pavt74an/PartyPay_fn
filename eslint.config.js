import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
     theme: {
    extend: {
      colors: {
        party: {
          dark: 'rgb(2, 0, 36)',
          light: 'rgba(9, 121, 94, 1)',
          accent: '#1DB954',
          'accent-hover': '#1ed760',
          'text-light': '#a2facf',
        },
        glass: {
          DEFAULT: 'rgba(255, 255, 255, 0.1)',
          dark: 'rgba(255, 255, 255, 0.05)',
          light: 'rgba(255, 255, 255, 0.15)',
          border: 'rgba(255, 255, 255, 0.2)',
        },
      },
      backgroundImage: {
        'party-gradient': 'linear-gradient(90deg, rgb(2, 0, 36) 15%, rgba(9, 121, 94, 1) 73%)',
        'text-gradient': 'linear-gradient(to right, #ffffff, #a2facf)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 15px 30px rgba(0, 0, 0, 0.3)',
      }
    },
  },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]
