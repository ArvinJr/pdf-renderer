<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'SubNote',
})

defineProps<{
  note?: string
}>()

const noteRef = ref<HTMLDivElement>()

defineExpose({ noteRef })
</script>

<template>
  <div ref="noteRef" class="w-full p-3.5">
    <p
      class="text-xs leading-4 font-normal text-gray-500"
      v-html="note?.replace(/\n/g, '<br>')"
    />
  </div>
</template>

<style scoped>

</style>
