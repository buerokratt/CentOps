import 'dotenv/config';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';
import { svgSpritemap } from 'vite-plugin-svg-spritemap';
import * as path from 'path';
import * as fs from 'node:fs';
import chokidar, { FSWatcher } from 'chokidar';

const iconsDir = 'src/icons';

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
    svgSpritemap({
      pattern: `${iconsDir}/*.svg`,
      filename: 'icons.svg',
      currentColor: true,
      emit: true,
    }),
    iconsJsonList(),
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
        loadPaths: [path.resolve(__dirname, 'src')],
      },
    },
  },
});

function iconsJsonList() {
  const absoluteInputPath = path.resolve(process.cwd(), iconsDir);
  const absoluteOutputPath = path.resolve(
    process.cwd(),
    `${iconsDir}/index.json`
  );
  let watcher: FSWatcher;

  function generateJson(filename?: string) {
    if (filename && path.extname(filename) !== '.svg') return;

    if (filename) console.log(path.extname(filename));

    if (!fs.existsSync(absoluteInputPath)) return;

    const svgFiles = fs
      .readdirSync(absoluteInputPath)
      .filter((file) => file.endsWith('.svg'));

    fs.writeFileSync(
      absoluteOutputPath,
      JSON.stringify(
        svgFiles.reduce(
          (acc, filename) => ({
            ...acc,
            [path.basename(filename, '.svg')]: filename,
          }),
          {}
        ),
        null,
        2
      ),
      'utf-8'
    );
    console.log(
      `[vite-plugin-scan-svg] JSON updated: ${svgFiles.length} icons`
    );
  }

  return {
    name: 'icons-dir-to-json',
    apply: 'serve',
    configureServer() {
      watcher = chokidar.watch(absoluteInputPath, {
        ignoreInitial: true,
        depth: 0,
      });
      watcher.on('ready', () => {
        watcher
          .on('add', generateJson)
          .on('unlink', generateJson)
          .on('change', generateJson);
      });
    },
    closeBundle() {
      if (watcher) {
        watcher.close();
      }
    },
    buildStart() {
      generateJson();
    },
  } as const;
}
