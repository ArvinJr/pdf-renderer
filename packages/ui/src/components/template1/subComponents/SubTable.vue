<script setup lang="ts">
import type { Ref } from 'vue'
import type { Body } from '../injectionTypes'
import { useElementBounding } from '@vueuse/core'
import { ref } from 'vue'
import { useGap } from '../../../utils/composables'

defineOptions({
  name: 'SubTable',
})

defineProps<{
  body: Body[]
}>()

const trRefs = ref<HTMLTableRowElement[]>()
const theadRef = ref<HTMLTableCellElement>()

function getLineItemHeight(): { gap: Ref<number>, top: Ref<number> } {
  const { gap } = useGap(theadRef, trRefs.value![1], theadRef.value!, trRefs.value![1])
  const { top } = useElementBounding(trRefs.value![0], { updateTiming: 'sync' })
  return { gap, top }
}

defineExpose({ getLineItemHeight })
</script>

<template>
  <div class="px-3.5 py-5 border-b-1 border-b-gray-300">
    <table class="table-auto w-full">
      <thead ref="theadRef">
        <tr class="*:pb-4 *:text-sm *:leading-5 *:font-black *:text-gray-800">
          <td class="text-left">
            DESCRIPTION
          </td>
          <td class="text-center">
            PRICE
          </td>
          <td class="text-center">
            QTY
          </td>
          <td class="text-right">
            AMOUNT
          </td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in body"
          :key="index"
          ref="trRefs"
          class="*:text-sm *:leading-5 *:font-light *:text-gray-500"
          :class="index !== body!.length - 1 ? '*:pb-3' : '*:pb-0'"
        >
          <td class="text-left">
            {{ item.description }}
          </td>
          <td class="text-center">
            ${{ item.price.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
          </td>
          <td class="text-center">
            {{ item.quantity }}
          </td>
          <td class="text-right">
            ${{ (item.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>
