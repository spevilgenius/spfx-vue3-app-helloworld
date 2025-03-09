import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { resolve } from 'path'

import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'

// https://vite.dev/config/
export default defineConfig({
  define: {
    __VUE_PROD_DEVTOOLS__: 'true',
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env': {}
  },
  plugins: [
    vue(),
    vueDevTools(),
    Components({
      resolvers: [PrimeVueResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'BaseWidget',
      fileName: () => 'js/base-widget.js',
      formats: ['iife']
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {
          // none needed as we are bundling everything
        },
        manualChunks: undefined,
        extend: true,
        intro: 'var global = typeof window !== "undefined" ? window : this;',
        banner: '/* Base Widget Start */',
        footer: '/* Base Widget End */',
        assetFileNames: () => {
          return '[ext]/base-widget.[ext]'
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      format: {
        comments: false,
        keep_quoted_props: true
      },
      compress: {
        keep_infinity: true,
        drop_console: false
      }
    },
    cssCodeSplit: false
  }
})
