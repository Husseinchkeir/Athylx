import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    {
      name: 'jsx-in-js',
      enforce: 'pre',
      async transform(source, id) {
        const file = id.replace(/\\/g, '/').split('?')[0];
        if (!file.includes('/src/') || !file.endsWith('.js')) return null;
        return transformWithEsbuild(source, id, { loader: 'jsx', jsx: 'automatic' });
      }
    },
    react()
  ],
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' }
    }
  }
});
