import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    manifest: true,
  },
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    hmr: {
      host: 'localhost', // 👈 change this
    },
    watch: {
      usePolling: true,
    },
  },
});
