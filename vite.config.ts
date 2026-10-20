import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    minify: 'esbuild',
    cssCodeSplit: true,
    modulePreload: { polyfill: false },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/main.ts'),
        // Code-split per feature
        clustering: resolve(__dirname, 'src/pages/clustering/index.ts'),
        reinforcement: resolve(__dirname, 'src/pages/reinforcement/index.ts'),
        ensemble: resolve(__dirname, 'src/pages/ensemble/index.ts'),
        exercises: resolve(__dirname, 'src/pages/exercises/index.ts'),
      },
      output: {
        manualChunks: {
          'vendor-lucide': ['lucide'],
        },
      },
    },
    // Generate .html files for each route (for GitHub Pages)
    // Note: We'll use a plugin or post-process for this
  },
  server: {
    port: 3000,
    open: true,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  css: {
    devSourcemap: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@core': resolve(__dirname, 'src/core'),
      '@components': resolve(__dirname, 'src/components'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@utils': resolve(__dirname, 'src/core/utils'),
    },
  },
  optimizeDeps: {
    include: ['lucide'],
  },
});