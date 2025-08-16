<script setup lang="ts">
import type { Details } from '../injectionTypes'

defineOptions({
  name: 'HeaderDetail',
})

defineProps<Details>()
</script>

<template>
  <div class="w-fit h-fit inline-flex flex-col items-start gap-4.5">
    <!-- name -->
    <p class="text-4xl leading-10 font-black text-gray-800">
      {{ name }}
    </p>
    <!-- invoice -->
    <div class="w-fit h-fit inline-flex flex-col items-start *:text-xs *:leading-4 *:font-bold *:text-gray-800">
      <p>INVOICE NO.{{ invoice.no }}</p>
      <p>{{ invoice.date }}</p>
    </div>
    <!-- client -->
    <div class="w-fit h-fit inline-flex flex-col items-start *:text-xs *:leading-4 *:font-normal *:text-gray-500">
      <p>BILLED TO:</p>
      <p>{{ client.name }}</p>
      <p>{{ client.phone }}</p>
      <p>{{ client.email }}</p>
      <p>{{ client.address }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>
