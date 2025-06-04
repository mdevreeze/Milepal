import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { resolve } from 'path';
import autoprefixer from 'autoprefixer';
import tailwindcss from '@tailwindcss/postcss';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
    cors: true,
    hmr: {
      overlay: false // Reduces visual noise in hybrid container
    }
  },
  build: {
    target: 'esnext',
    outDir: '../Resources/Raw/wwwroot',
    emptyOutDir: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        // Optimize for mobile performance
        passes: 2,
        drop_console: true,
        ecma: 2020
      }
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
        manualChunks: (id) => {
          // Split chunks for better caching
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    },
    cssCodeSplit: true,
    assetsInlineLimit: 4096, // Inline small assets
    sourcemap: false, // Disable sourcemaps for production
    reportCompressedSize: false // Improve build performance
  },
  publicDir: 'public',
  optimizeDeps: {
    include: ['solid-js', 'solid-js/web']
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer()
      ]
    }
  }
});