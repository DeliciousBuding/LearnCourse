import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/LearnCourse/' : '/',
  resolve: {
    alias: {
      '@learncourse/framework': path.resolve(__dirname, '../framework/src'),
      '@learncourse/framework/types': path.resolve(__dirname, '../framework/src/types.ts'),
    },
  },
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
}));
