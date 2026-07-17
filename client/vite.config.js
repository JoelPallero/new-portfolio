import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
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
    outDir: path.resolve(__dirname, '../dist'),
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-framer': ['framer-motion'],
        },
      },
    }
  }
})
