import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Employee-Management-System/',
  plugins: [react()],
  server: {
    port: 5173,
  },
});
