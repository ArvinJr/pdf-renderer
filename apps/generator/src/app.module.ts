import * as path from 'node:path'
import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { LoggerModule } from 'nestjs-pino'
import { GrpcModule } from './grpc/grpc.module'
import { PdfModule } from './pdf/pdf.module'
import { RendererModule } from './renderer/renderer.module'
import { logMethodHook } from './util/logger'

@Module({
  imports: [
    // 日志框架
    LoggerModule.forRoot({
      pinoHttp: {
        hooks: {
          logMethod: logMethodHook,
        },
        transport: {
          targets: [
            {
              target: 'pino-opentelemetry-transport',
              options: {
                severityNumberMap: {},
              },
            },
            {
              target: 'pino-pretty',
              options: {
                colorize: true,
              },
            },
          ],
        },
      },
    }),
    // 内存缓存
    CacheModule.register({
      isGlobal: true,
    }),
    // 静态服务
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', '..', 'renderer', 'dist'),
    }),
    /* 自定义module */
    // 全局组件
    PdfModule,
    // 普通组件
    RendererModule,
    GrpcModule,
  ],
})
export class AppModule {}
