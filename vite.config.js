import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ?  '/assets/dist' : undefined,
  build: {
    manifest: true
  },
  plugins: [react()]
})
