<script setup lang="ts">
import type { Footer } from '../injectionTypes'
import { ref } from 'vue'

defineOptions({
  name: 'SubFooter',
})

defineProps<Footer>()

const footerRef = ref<HTMLDivElement>()

defineExpose({ footerRef })
</script>

<template>
  <div ref="footerRef" class="absolute left-0 bottom-0 h-fit w-fit flex flex-col items-start gap-1">
    <p class="text-lg leading-7 font-bold text-gray-800">
      {{ name }}
    </p>
    <div class="*:text-sm *:leading-5 *:font-normal *:text-gray-500">
      <p>{{ address }}</p>
      <p>{{ website }}</p>
      <p>{{ email }}</p>
      <p>{{ phone }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>
