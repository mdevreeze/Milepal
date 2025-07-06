import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin(), tailwindcss()],
  base: './',
  server: {
    host: '0.0.0.0', // Accept connections from any IP
    port: 3000,
    hmr: {
      port: 3001,
      host: '0.0.0.0' // Important for HMR on devices
    }
  },
  build: {
    target: 'esnext',
    outDir: '../Resources/Raw/wwwroot/',
  }
});