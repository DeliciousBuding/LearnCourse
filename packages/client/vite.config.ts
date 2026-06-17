import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5299,
    strictPort: true,
    fs: { allow: ['..', '../..'] },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/mermaid')) return 'mermaid';
          if (id.includes('node_modules/katex')) return 'katex';
        },
      },
    },
  },
})
