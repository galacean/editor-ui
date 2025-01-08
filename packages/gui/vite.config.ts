/// <reference types="vite/client" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import dts from 'vite-plugin-dts';
import { resolve } from 'node:path'

const rootDir = resolve(__dirname, 'examples')
const publicDir = resolve(__dirname, 'dist')
const outputDir = resolve(__dirname, 'dist')

const env = process.env.NODE_ENV === 'production' ? '"production"' : '"development"'

export default defineConfig({
  plugins: [react()],
  publicDir,
  root: rootDir,
  define: {
    'process.env.NODE_ENV': env,
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'GalaceanGUI',
      formats: ['umd'],
      fileName: (format) => `index.${format}.js`,
    },
    emptyOutDir: true,
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        dir: outputDir,
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react/jsx-runtime'],
  },
})
