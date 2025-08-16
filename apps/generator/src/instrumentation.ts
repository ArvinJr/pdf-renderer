import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { NodeSDK } from '@opentelemetry/sdk-node'

export const sdk = new NodeSDK({
  instrumentations: [
    getNodeAutoInstrumentations(),
  ],
})

process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('SDK shut down successfully'))
    .finally(() => process.exit(0))
})
