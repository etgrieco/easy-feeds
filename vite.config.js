import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/assets/dist',
  build: {
    manifest: true
  },
  plugins: [react()]
})
