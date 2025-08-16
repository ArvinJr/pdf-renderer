<script setup lang="ts">
import type { Body } from '../injectionTypes'
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'SubTotal',
})

const { body } = defineProps<{
  body: Body[]
}>()

const totalRef = ref<HTMLDivElement>()
const total = ref<number>(0)

onMounted(() => {
  body.forEach((item) => {
    total.value += item.price * item.quantity
  })
})

defineExpose({ totalRef })
</script>

<template>
  <div ref="totalRef" class="px-3.5 py-5 h-fit w-full inline-flex place-content-between items-center border-b-1 border-b-gray-300">
    <p class="text-base leading-6 font-light text-gray-500">
      TOTAL
    </p>
    <p class="text-2xl leading-8 font-normal text-gray-700">
      ${{ total.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
    </p>
  </div>
</template>

<style scoped>

</style>
