import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { context, propagation, trace } from '@opentelemetry/api'
import { PinoLogger } from 'nestjs-pino'
import { Cluster } from 'puppeteer-cluster'

@Injectable()
export class PdfService implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext(PdfService.name)
  }

  private cluster: Cluster

  async onModuleInit() {
    // 初始化集群
    this.cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_CONTEXT,
      maxConcurrency: Number.parseInt(process.env.PUPPETEER_MAX_CURRENCY || '4'),
      retryLimit: 2,
      workerCreationDelay: 1000,
      timeout: 3000,
      puppeteerOptions: {
        headless: true,
        devtools: false,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage', // 解决内存不足问题
        ],
      },
    })

    this.cluster.on('taskerror', (err, data) => {
      this.logger.error(`puppeteer处理错误：${err.message}`, data)
    })

    // 任务处理逻辑
    await this.cluster.task(async ({ page, data: { url } }) => {
      const tracer = trace.getTracer('puppeteer-trace')
      return tracer.startActiveSpan('puppeteer-span', async (span) => {
        try {
          // 从当前 Context 中取出 traceparent
          const headers: Record<string, string> = {}
          propagation.inject(context.active(), headers)

          // 将 traceparent 添加到浏览器请求中
          await page.setExtraHTTPHeaders(headers)
          await page.goto(`http://127.0.0.1:3000/${url}`, {
            waitUntil: 'networkidle0',
          })
          return await page.pdf({
            format: 'A4',
            printBackground: true,
          })
        }
        finally {
          span.end()
        }
      })
    })
  }

  async generatePDF(url: string): Promise<Uint8Array> {
    return await this.cluster.execute({ url })
  }

  async onModuleDestroy() {
    await this.cluster.idle()
    await this.cluster.close()
  }
}
