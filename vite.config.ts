import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // غيّريه لـ '/اسم-الريبو/' لو الريبو مش username.github.io
  server: {
    port: 5173
  }
})
