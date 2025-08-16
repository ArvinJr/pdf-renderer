import type { MaybeComputedElementRef } from '@vueuse/core'
import type { Ref } from 'vue'
import { useElementBounding } from '@vueuse/core'
import { ref } from 'vue'

/**
 * 计算两个元素之间的间距
 * 必须在onMounted中使用，且在调用前需要使用nextTick
 *
 * @param aRef A元素的ref
 * @param bRef B元素的ref
 * @param aElement A元素本身
 * @param bElement B元素本身
 */
export function useGap(aRef: MaybeComputedElementRef, bRef: MaybeComputedElementRef, aElement: Element, bElement: Element): {
  gap: Ref<number>
} {
  const gap = ref<number>(0)

  // 获取上半/下半部分顶部到视窗的距离 上半部分的高
  const { top: aTop, height: aHeight } = useElementBounding(aRef, { updateTiming: 'sync' })
  const { top: bTop } = useElementBounding(bRef, { updateTiming: 'sync' })

  // 获取上半部分的margin-bottom 下半部分的margin-top
  const { marginBottom: aMargin } = window.getComputedStyle(aElement)
  const { marginTop: bMargin } = window.getComputedStyle(bElement)

  gap.value = (bTop.value - Number.parseFloat(bMargin)) - (aTop.value + aHeight.value + Number.parseFloat(aMargin))

  return { gap }
}
