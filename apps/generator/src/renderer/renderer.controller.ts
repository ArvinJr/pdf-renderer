import type { Cache } from '@nestjs/cache-manager'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Controller, Get, Inject, Param } from '@nestjs/common'
import { PinoLogger } from 'nestjs-pino'

@Controller()
export class RendererController {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(RendererController.name)
  }

  @Get('template1/:id')
  async getData(@Param('id') id: string) {
    return await this.cacheManager.get(id)
    // return data
  }
}
