// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import fs from 'fs';
// import path from 'path';

// export default defineConfig({
//   plugins: [react()],
//   build: {
//     outDir: 'dist', // Specify the output directory for the build
//     sourcemap: false, // Disable source maps for production
//   },
//   server: {
//     https: {
//       key: fs.readFileSync(path.resolve(__dirname, './cert/localhost+2-key.pem')),
//       cert: fs.readFileSync(path.resolve(__dirname, './cert/localhost+2.pem')),
//     },
//     port: 5173,
//     cors: {
//       origin: process.env.VITE_CORS_ORIGIN || 'https://localhost:5173',
//       credentials: true,
//     },
//     headers: {
//       'Cross-Origin-Opener-Policy': 'same-origin',
//       'Cross-Origin-Embedder-Policy': 'require-corp',
//     },
//   },
// });

// frontend/vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Output directory
    sourcemap: false, // Disable source maps for production
  },
  // Remove or adjust server settings for production
});