import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`
      }
    },
    // copyPublicDir: true,
    outDir: './app/assets/javascripts'
  },
  plugins: [react()]
})
