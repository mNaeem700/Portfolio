import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Chunking: React must live in its own chunk. If it lands inside the "three" chunk (which
// happens when three is grouped by package list), the entry imports that 1 MB chunk on every
// device and the lazy 3D scene stops being lazy. Only the hero scene should pull in three.
function chunk(id) {
  // Vite's own dynamic-import helper is used by the entry; keep it out of the 3D chunk
  if (id.includes('vite/preload-helper') || id.includes('commonjsHelpers')) return 'react'
  if (!id.includes('node_modules')) return
  if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'react'
  if (/[\\/]node_modules[\\/](gsap|lenis)[\\/]/.test(id)) return 'motion'
  if (/[\\/]node_modules[\\/](three|three-stdlib|@react-three|maath|troika|camera-controls|meshline|stats-gl|@monogrid|suspend-react|its-fine|zustand|use-sync-external-store|detect-gpu|hls\.js|tunnel-rat|@use-gesture)[\\/]/.test(id))
    return 'three'
}

export default defineConfig({
  base: '/Portfolio/',
  plugins: [react()],
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: { manualChunks: chunk },
    },
  },
})
