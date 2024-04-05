/* eslint-disable comma-dangle */
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      host: '0.0.0.0',
    },
    watch: {
      usePolling: true,
    },
  },
})
