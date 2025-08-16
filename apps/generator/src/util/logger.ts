import type { LogFn, Logger } from 'pino'
import { context, trace } from '@opentelemetry/api'

type PinoArgs = [object, string, ...any[]] | [string, ...any[]]

export function logMethodHook(this: Logger, args: PinoArgs, method: LogFn) {
  const isSingleString = args.length === 1 && typeof args[0] === 'string'
  const isObjAndString = args.length >= 2
    && typeof args[0] === 'object'
    && args[0] !== null
    && typeof args[1] === 'string'

  if (isSingleString || isObjAndString) {
    const span = trace.getSpan(context.active())
    if (span) {
      const { traceId, spanId, traceFlags } = span.spanContext()
      const metadata = {
        trace_id: traceId,
        span_id: spanId,
        trace_flags: traceFlags.toString(16).padStart(2, '0'),
      }

      if (isObjAndString) {
        const existing = args[0] as Record<string, unknown>
        args[0] = { ...existing, ...metadata }
      }
      else {
        const [msg, ...restArgs] = args
        args.length = 0
        args.push(
          metadata,
          ...(typeof msg === 'string' ? [msg, ...restArgs] : []),
        )
      }
    }
  }

  return method.apply(this, args)
}
