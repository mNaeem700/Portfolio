import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Repo is "mnaeem700.github.io", so the site is served from the root.
// If you publish to a different repo name (e.g. "portfolio"), change base to '/portfolio/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          gsap: ['gsap', 'lenis'],
        },
      },
    },
  },
})
