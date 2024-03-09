import path from 'path';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@services': path.resolve(__dirname, './src/services/'),
      '@components': path.resolve(__dirname, './src/components'),
      '@common': path.resolve(__dirname, './src/common/'),
      '@theme': path.resolve(__dirname, './src/theme'),
      '@screens': path.resolve(__dirname, './src/screens/'),
      '@config': path.resolve(__dirname, './src/config/'),
    },
  },
});
