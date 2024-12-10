// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       // 'auth': 'http://localhost:8080'
//     },
//     cors: {
//       origin: 'http://localhost:5173',
//       credentials: true,
//     },
//     headers: {
//       'Cross-Origin-Opener-Policy': 'same-origin',
//       'Cross-Origin-Embedder-Policy': 'require-corp',
//     },
//   },
// });


// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, './cert/localhost+2-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, './cert/localhost+2.pem')),
    },
    port: 5173, // Optional: specify the port
    cors: {
      origin: 'https://localhost:5173',
      credentials: true,
    },
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
});