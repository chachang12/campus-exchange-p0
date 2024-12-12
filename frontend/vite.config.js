// frontend/vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      sourcemap: false,
    },
    server: !isProduction
      ? {
          proxy: {
            '/api': {
              target: 'http://localhost:8080',
              changeOrigin: true,
              secure: false,
            },
          },
        }
      : {},
  };
});