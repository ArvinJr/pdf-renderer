import * as path from 'node:path'

export function resolveProtoPath(filenames: string[]): string[] {
  const protoBase = require.resolve('@demo/grpc-proto')
  const distDir = path.dirname(protoBase)
  return filenames.map(filename => path.join(distDir, filename))
}
