import { defineConfig } from 'vite';
import react from '@vitejs/plugin-ract-swc';
import path from 'path';

export default defineConfig({
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
  build: {
    outDir: path.resolve(__dirname, './dist')
  }
})
