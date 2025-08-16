import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: {
    resolve: true,
  },
  minify: true,
  treeshake: true,
  external: [
    '@grpc/grpc-js',
    '@nestjs/microservices',
    'rxjs',
  ],
  publicDir: 'src/proto',
})
