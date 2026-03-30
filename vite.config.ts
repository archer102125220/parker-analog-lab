/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    analog({
      inlineStylesExtension: 'scss',
      nitro: {
        experimental: {
          openAPI: true
        },
        openAPI: {
          // 修改預設路徑，避免與前端 SPA 路由衝突
          route: '/api/_openapi.json',
          ui: {
            swagger: { route: '/api/_swagger' },
            scalar: { route: '/api/_scalar' }
          },
          meta: {
            title: 'Analog REST API',
            description: 'API documentation for Parker Analog Lab',
            version: '1.0.0',
          }
        }
      }
    }),
    tailwindcss()
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
}));
