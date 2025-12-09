import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['src/**/*.ts', 'src/**/*.tsx', '!src/**/*.stories.*'],
    outDir: 'es',
    format: 'esm',
    bundle: false,
    dts: false,
    sourcemap: true,
    clean: true,
    splitting: false,
    outExtension: () => ({ js: '.js' }),
  },
  {
    entry: ['src/**/*.ts', 'src/**/*.tsx', '!src/**/*.stories.*'],
    outDir: 'lib',
    format: 'cjs',
    bundle: false,
    dts: false,
    sourcemap: true,
    splitting: false,
    outExtension: () => ({ js: '.js' }),
  },
  {
    entry: ['src/index.ts'],
    outDir: 'dist',
    format: 'iife',
    bundle: true,
    globalName: 'GalaceanGUI',
    dts: false,
    sourcemap: true,
    noExternal: ['react', 'react-dom', '@galacean/editor-ui', 'nanoid'],
    minify: true,
    platform: 'browser',
    outExtension: () => ({ js: '.umd.js' }),
    define: {
      'process.env.NODE_ENV': '"production"',
    },
  },
])
