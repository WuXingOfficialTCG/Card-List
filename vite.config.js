import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.', // radice del progetto
  build: {
    outDir: 'dist', // cartella di output
    emptyOutDir: true
  },
  server: {
    port: 5173,
    open: true
  }
})
