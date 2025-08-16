<script setup lang="ts">
import type { Body, Template1Type, XxTemplate1Instance } from '@demo/ui'
import PBody from '@/components/Body.vue'
import PHeader from '@/components/Header.vue'
import data from '@/data/template1.json'
import { XxTemplate1 } from '@demo/ui'
import { ElButton } from 'element-plus'
import { ref, watchEffect, watchPostEffect } from 'vue'

const viewTemplate1 = ref<boolean>(true)
const template1Data = ref<Template1Type[]>([])
const template1Refs = ref<XxTemplate1Instance[]>()

// 数据初始化
watchEffect(() => {
  if (viewTemplate1.value) {
    template1Data.value[0] = data
  }
})

// 在表格溢出时调整数据结构
watchPostEffect(() => {
  if (template1Refs.value?.[0].isIntersected) {
    console.log('开始template1溢出处理')
    const safetyLines = template1Refs.value[0].safetyLines
    const bodyChunk: Body[][] = []
    const bodyData = data.body
    for (let i = 0; i < bodyData.length; i += safetyLines) {
      bodyChunk.push(bodyData.slice(i, i + safetyLines))
    }

    for (let i = 0; i < bodyChunk.length; i++) {
      template1Data.value[i] = { ...data, body: [...bodyChunk[i]] }
    }
  }
})
</script>

<template>
  <div class="h-screen flex flex-col items-center gap-2">
    <PHeader>
      <ElButton type="primary" @click="viewTemplate1 = !viewTemplate1">
        template1
      </ElButton>
    </PHeader>
    <PBody>
      <div v-if="viewTemplate1 && template1Data.length > 0">
        <XxTemplate1
          v-for="(page, index) in template1Data"
          :key="index"
          v-bind="page"
          ref="template1Refs"
        />
      </div>
    </PBody>
  </div>
</template>

<style scoped>

</style>
