import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: '/LearnCourse/',
  plugins: [react()],
  resolve: {
    alias: {
      '@courses': path.resolve(__dirname, '../../courses'),
    },
  },
})
