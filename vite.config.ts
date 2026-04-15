/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';
import mkcert from 'vite-plugin-mkcert';
import tsconfigPaths from 'vite-tsconfig-paths';
import autoprefixer from 'autoprefixer';
import postcssPxtorem from 'postcss-pxtorem';
import { VitePWA } from 'vite-plugin-pwa';
import glsl from 'vite-plugin-glsl';

const postcssPlugins: import('postcss').Plugin[] = [
  autoprefixer(),
  postcssPxtorem({
    rootValue: 16, // 1rem 對應的 px
    minPixelValue: 2
  }) as import('postcss').Plugin,
  // https://github.com/cuth/postcss-pxtorem/blob/master/index.js#L119C37-L119C37
  // https://juejin.cn/post/7033773414363955230#heading-3
  {
    postcssPlugin: 'postcss-zerorem',
    Declaration(decl: { value: string; }) {
      if (/\+\s0\)/gi.test(decl.value)) {
        decl.value = decl.value.replace(/\+\s0\)/gi, '+ 0rem)');
      }
    }
  } as import('postcss').Plugin
];

// https://vitejs.dev/config/
export default defineConfig(() => {
  const isHttps = process.env['HTTPS'] === 'true';

  return {
    build: {
      target: ['es2020']
    },
    resolve: {
      mainFields: ['module']
    },
    css: {
      postcss: {
        plugins: postcssPlugins
      }
    },
    plugins: [
      isHttps ? mkcert() : undefined,
      glsl(),
      analog({
        inlineStylesExtension: 'scss',
        nitro: {
          experimental: {
            openAPI: true,
          },
          openAPI: {
            // 修改預設路徑，避免與前端 SPA 路由衝突
            route: '/api/_openapi.json',
            ui: {
              swagger: { route: '/api/_swagger' },
              scalar: { route: '/api/_scalar' },
            },
            meta: {
              title: 'Analog REST API',
              description: 'API documentation for Parker Analog Lab',
              version: '1.0.0',
            },
          },
        },
      }),
      tailwindcss(),
      tsconfigPaths(),
      VitePWA({
        // devOptions: {
        //   enabled: process.env['NODE_ENV'] === 'development',
        // },
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
          name: 'Parker Chen 的Analog實驗室',
          short_name: 'Parker Chen\'s Analog Lab',
          description: 'Parker Chen\'s Analog Lab',
          theme_color: '#ffffff',
          background_color: '#ffffff',
          display: 'standalone',
          icons: [
            {
              src: "/img/ico/web-app-manifest-192x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "maskable"
            },
            {
              src: "/img/ico/web-app-manifest-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable"
            }
          ]
        }
      })
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['**/*.spec.ts'],
      reporters: ['default']
    }
  };
});
