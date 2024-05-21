/// <reference types="vitest" />
/// <reference types="vite/client" />

import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills(), svgr()],
  server: {
    proxy: {
      '/graphql': 'http://localhost:5000',
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src'),
    },
  },
});
