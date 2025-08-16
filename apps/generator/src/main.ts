import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { sdk } from './instrumentation'
import { resolveProtoPath } from './util/proto-path'

sdk.start()

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    logger: false,
  })

  // grpc服务
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${process.env.GRPC_PORT ?? 5001}`,
      package: 'template',
      protoPath: resolveProtoPath(['template.proto']),
      loader: {
        longs: Number,
      },
    },
  })

  app.setGlobalPrefix('api')
  await app.startAllMicroservices()
  await app.listen(process.env.PORT ?? 3000, '127.0.0.1')

  console.log(`Restful is running on: 3000`)
  console.log(`grpc is running on: 5001`)
}
bootstrap()
