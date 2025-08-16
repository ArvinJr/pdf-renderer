<script setup lang="ts">
import type { Body, Template1Type, XxTemplate1Instance } from '@demo/ui'
import { getTemplate1Data } from '@/api/template'
import { XxTemplate1 } from '@demo/ui'
import { onMounted, ref, watchPostEffect } from 'vue'

const props = defineProps<{
  id: string
}>()

const template1Data = ref<Template1Type[]>([])
const template1Refs = ref<XxTemplate1Instance[]>()

// 数据初始化
onMounted(async () => {
  template1Data.value = [await getTemplate1Data(props.id)]
})

// 在表格溢出时调整数据结构
watchPostEffect(() => {
  if (template1Refs.value?.[0].isIntersected) {
    // 缓存模版数据
    const templateData = template1Data.value[0]

    // 开始template1溢出处理
    const safetyLines = template1Refs.value[0].safetyLines
    const bodyChunk: Body[][] = []
    const bodyData = templateData.body
    for (let i = 0; i < bodyData.length; i += safetyLines) {
      bodyChunk.push(bodyData.slice(i, i + safetyLines))
    }

    for (let i = 0; i < bodyChunk.length; i++) {
      template1Data.value[i] = { ...templateData, body: [...bodyChunk[i]] }
    }
  }
})
</script>

<template>
  <div>
    <XxTemplate1
      v-for="(page, index) in template1Data"
      :key="index"
      v-bind="page"
      ref="template1Refs"
    />
  </div>
</template>

<style scoped>

</style>
