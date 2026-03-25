import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  },
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  },
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
