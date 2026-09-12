import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // ... your other config
  server: {
    watch: {
      usePolling: true, // Forces Vite to actively check for file modifications
    },
  },
});