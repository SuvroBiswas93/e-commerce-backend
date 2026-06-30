import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'],
  format: 'esm',
  outDir: 'dist',
  dts: true,
  clean: true,
  splitting: false,
  sourcemap: true,
  alias: {
    '@': './src',
    '@app': './src/app',
    '@config': './src/app/config',
    '@middleware': './src/app/middleware',
    '@modules': './src/app/modules',
    '@utils': './src/utils',
    '@types': './src/types',
    '@lib': './src/lib',
    '@db': './src/lib/database',
    '@constants': './src/constants',
    '@helpers': './src/helpers',
  },
});
