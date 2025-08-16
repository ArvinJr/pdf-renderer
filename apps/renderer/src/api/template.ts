import type { Template1Type } from '@demo/ui'
import request from '../util/request'

export async function getTemplate1Data(id: string): Promise<Template1Type> {
  return await request.get(`/template1/${id}`)
}
