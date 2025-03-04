import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/trompoagencia/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@a': '/src/assets',
      '@as': '/src/assets/styles',
      '@ai': '/src/assets/icons',
      '@ap': '/src/assets/portfolioImg',
      '@at': '/src/assets/toolsImg',
    },
  },
})
