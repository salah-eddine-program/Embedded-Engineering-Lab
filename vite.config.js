import { defineConfig } from 'vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)));

export default defineConfig({
  root: resolve(projectRoot, 'src'),
  publicDir: resolve(projectRoot, 'public'),
  appType: 'spa',
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
  },
  build: {
    outDir: resolve(projectRoot, 'dist'),
    emptyOutDir: true,
    sourcemap: true,
  },
});
