import { defineConfig } from 'tsup'

export default defineConfig([
  // build ES Module spec
  {
    entry: ['src', '!src/**/*.stories.*'],
    outDir: 'dist/es',
    format: 'esm',
    bundle: false,
    target: 'esnext',
    dts: false,
    outExtension: () => {
      return {
        js: '.js',
      }
    },
    splitting: false,
    sourcemap: true,
    clean: true,
  },
  // build CommonJS spec
  {
    entry: ['src', '!src/**/*.stories.*'],
    outDir: 'dist/cjs',
    format: 'cjs',
    bundle: false,
    target: 'esnext',
    dts: false,
    splitting: false,
    sourcemap: true,
    clean: true,
  },
])
