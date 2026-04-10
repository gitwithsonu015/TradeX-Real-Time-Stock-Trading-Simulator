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
        target: 'https://tradex-real-time-stock-trading-simulator-zao0.onrender.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
