import * as path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    dts({ tsconfigPath: './tsconfig.app.json' }),
  ],
  build: {
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'demo-ui',
      formats: ['es', 'umd', 'cjs'],
      fileName: (format) => {
        if (format === 'cjs') {
          return 'demo-ui.cjs'
        }
        if (format === 'es') {
          return 'demo-ui.es.js'
        }
        return 'demo-ui.umd.js'
      },
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
      onwarn(warning, warn) {
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT'
          && warning.exporter === 'vue'
          && warning.names?.includes('guardReactiveProps')) {
          return
        }
        warn(warning)
      },
    },
  },
})
