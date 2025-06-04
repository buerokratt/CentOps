import 'dotenv/config';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 8057,
  },
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
    tsconfigPaths(),
  ],
  define: {
    'process.env': {},
    'import.meta.env.REACT_APP_SERVICE_ID': JSON.stringify(
      process.env.REACT_APP_SERVICE_ID
    ),
    'import.meta.env.REACT_APP_API_URL': JSON.stringify(
      process.env.REACT_APP_API_URL
    ),
    'import.meta.env.REACT_APP_PUBLIC_URL': JSON.stringify(
      process.env.REACT_APP_PUBLIC_URL
    ),
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '',
        loadPaths: [resolve(__dirname, 'src')],
      },
    },
  },
});
