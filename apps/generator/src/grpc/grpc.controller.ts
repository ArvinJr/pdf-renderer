import type { Cache } from '@nestjs/cache-manager'
import { StaticTemplateServiceController, StaticTemplateServiceControllerMethods } from '@demo/grpc-proto'
import { PdfStream, Template1Data } from '@demo/grpc-proto/src'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Controller, Inject } from '@nestjs/common'
import { PinoLogger } from 'nestjs-pino'
import { defer, mergeMap, Observable } from 'rxjs'
import { PdfService } from '../pdf/pdf.service'
import { getTraceId } from '../util/otlp-tools'

const CHUNK_SIZE = 4 * 1024 * 1024

@Controller()
@StaticTemplateServiceControllerMethods()
export class GrpcController implements StaticTemplateServiceController {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly logger: PinoLogger,
    private readonly pdfService: PdfService,
  ) {
    this.logger.setContext(GrpcController.name)
  }

  template2(request: Template1Data): Observable<PdfStream> {
    this.logger.info('grpc收到消息开始生成pdf文件')

    return defer(async () => {
      try {
        const id = getTraceId()
        await this.cacheManager.set(id, request, 5000)
        const data = await this.pdfService.generatePDF(`template1/${id}`)
        this.logger.info(`生成pdf文件成功，大小：${data.byteLength} byte`)

        return data
      }
      catch (error) {
        this.logger.error('生成pdf文件失败', error)
        throw error
      }
    }).pipe(
      mergeMap(data => new Observable<PdfStream>((observer) => {
        try {
          let chunkCount = 0
          for (let offset = 0; offset < data.byteLength; offset += CHUNK_SIZE) {
            const end = Math.min(offset + CHUNK_SIZE, data.byteLength)
            const chunk = data.slice(offset, end)

            observer.next({ chunk })
            chunkCount++
            this.logger.info(`发送文件第${chunkCount}片`)
          }

          observer.next({ count: chunkCount })
          observer.complete()
          this.logger.info('发送pdf文件完成')
        }
        catch (error) {
          observer.error(error)
          this.logger.error('发送文件失败', error)
        }
      }),
      ),
    )
  }
}
