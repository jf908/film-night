import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  esbuild: {
    target: 'es6',
  },
  build: {
    lib: {
      entry: [resolve(__dirname, './main.ts'), resolve(__dirname, './movieDb.ts')],
      fileName: (format, name) => {
        if (name === 'main') return 'pb-hooks.pb.js';
        else return `${name}.js`;
      },
      formats: ['cjs'],
    },
    outDir: resolve(__dirname, '../../pb/pb_hooks'),
  },
});
