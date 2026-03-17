/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    include: ['tests/**/*.test.{js,jsx}'],
    environment: 'jsdom',
    setupFiles: './tests/setupTests.js',
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
  },
});
