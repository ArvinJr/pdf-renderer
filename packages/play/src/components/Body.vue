<script setup lang="ts">
defineOptions({
  name: 'PBody',
})
</script>

<template>
  <div class="flex-1 w-full min-h-0 border-t-2 border-gray-300">
    <div class="h-full overflow-y-auto">
      <div class="flex flex-col items-center p-2 *:border-2 *:border-blue-400">
        <slot>
          <div class="h-20 w-20 bg-red-700">
            Body
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
