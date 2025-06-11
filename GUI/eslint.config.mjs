import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-no-relative-import-paths';

export default defineConfig([
  {
    ignores: [
      '**/dist/**',
      '**/eslint.config.mjs',
      '**/i18next-parser.config.js',
    ],
  },
  eslint.configs.recommended,
  tsEslint.configs.recommended,
  {
    plugins: {
      '@typescript-eslint': tsEslint.plugin,
      'no-relative-import-paths': importPlugin,
    },
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        project: ['./tsconfig.json'],
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      // Enforce using absolute paths
      'no-relative-import-paths/no-relative-import-paths': [
        'error',
        { allowSameFolder: true, rootDir: '', prefix: '' },
      ],
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
  },
]);
