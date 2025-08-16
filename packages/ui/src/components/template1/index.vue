<script setup lang="ts">
import type { MaybeComputedElementRef } from '@vueuse/core'
import type { Template1Type } from './injectionTypes'
import { useElementBounding } from '@vueuse/core'
import { nextTick, onMounted, ref, watchSyncEffect } from 'vue'
import { useGap } from '../../utils/composables'
import SubFooter from './subComponents/SubFooter.vue'
import SubHeader from './subComponents/SubHeader.vue'
import SubNote from './subComponents/SubNote.vue'
import SubTable from './subComponents/SubTable.vue'
import SubTotal from './subComponents/SubTotal.vue'

defineOptions({
  name: 'XxTemplate1',
})

defineProps<Template1Type>()

const upRef = ref<HTMLDivElement>()
const downRef = ref<InstanceType<typeof SubFooter>>()
const tableRef = ref<InstanceType<typeof SubTable>>()
const totalRef = ref<InstanceType<typeof SubTotal>>()
const noteRef = ref<InstanceType<typeof SubNote>>()

const isIntersected = ref<boolean>(false)

// 安全行数
const safetyLines = ref<number>(0)

onMounted(async () => {
  await nextTick()

  const { gap } = useGap(upRef, downRef, upRef.value!, downRef.value!.footerRef!)
  isIntersected.value = gap.value < 0
})

// 计算元素总高度
function getElementTotalHeight(ref: MaybeComputedElementRef, refValue: Element): number {
  const { height } = useElementBounding(ref)
  const { marginTop, marginBottom } = window.getComputedStyle(refValue)

  return height.value + Number.parseFloat(marginTop) + Number.parseFloat(marginBottom)
}

// 相交时计算body最大行数
watchSyncEffect(() => {
  if (isIntersected.value) {
    console.log('table空间不足，开始计算安全行数！')
    const { gap: tableLineGap, top: tableBodyTop } = tableRef.value!.getLineItemHeight()

    const totalHeight = getElementTotalHeight(totalRef, totalRef.value!.totalRef!)
    const noteHeight = getElementTotalHeight(noteRef, noteRef.value!.noteRef!)

    const { top: downTop } = useElementBounding(downRef)
    const { marginTop: downMarginTop } = window.getComputedStyle(downRef.value!.footerRef!)

    const bodySpace = downTop.value - Number.parseFloat(downMarginTop) - noteHeight - totalHeight - tableBodyTop.value

    safetyLines.value = Math.floor(bodySpace / tableLineGap.value)
    console.log('安全行数：', safetyLines.value)
  }
})

defineExpose({
  isIntersected,
  safetyLines,
})
</script>

<template>
  <div class="size-a4 p-9 print:print-page">
    <div class="h-full w-full relative">
      <!-- 上半部分 -->
      <div ref="upRef">
        <SubHeader v-if="header" v-bind="{ ...header }" />
        <SubTable ref="tableRef" :body />
        <SubTotal ref="totalRef" :body />
        <SubNote ref="noteRef" :note />
      </div>
      <!-- 下半部分 -->
      <SubFooter
        v-if="footer"
        v-bind="{ ...footer }"
        ref="downRef"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
