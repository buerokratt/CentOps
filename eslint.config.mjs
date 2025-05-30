import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-no-relative-import-paths';

export default defineConfig([
  { ignores: ['**/dist/**', '**/eslint.config.mjs'] },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'no-relative-import-paths': importPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json', './GUI.*/tsconfig.json'],
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
