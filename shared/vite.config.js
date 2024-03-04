import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

let PORT
if (process.env.NODE_ENV === 'development') {
  PORT = 3000
} else {
  PORT = 80
}

export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    hmr: {
      host: '0.0.0.0'
    },
    watch: {
      usePolling: true,
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: PORT,
    origin: `http://0.0.0.0:3000`,
  }
})
