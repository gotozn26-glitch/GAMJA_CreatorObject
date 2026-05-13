import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    /** CHAE_GPT_API_KEY 등 CHAE_ 접두사 env를 import.meta.env에 노출 */
    envPrefix: ['VITE_', 'CHAE_'],
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
