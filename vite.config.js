import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.', // radice del progetto
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      // (opzionale) ignora warning su pacchetti esterni, utile se il deploy fallisce
      external: [],
    },
  },
  server: {
    port: 5173,
    open: true
  },
});
