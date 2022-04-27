import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

import eslintPlugin from './plugins/vite-plugin-eslint';
import stylelintPlugin from './plugins/vite-plugin-stylelint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin(), stylelintPlugin()],
  css: {
    // css modules
    modules: {
      scopeBehaviour: 'local',
      generateScopedName: '[local]_[hash:base64:6]',
    },
    postcss: {
      plugins: [],
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': __dirname,
    },
  },
});
