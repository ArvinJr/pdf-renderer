import { Module } from '@nestjs/common'
import { RendererController } from './renderer.controller'

@Module({
  controllers: [RendererController],
})
export class RendererModule {}
