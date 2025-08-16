<script setup lang="ts">
import type { Header } from '../injectionTypes'
import HeaderDetail from './HeaderDetail.vue'

defineOptions({
  name: 'SubSubHeader',
})

defineProps<Header>()
</script>

<template>
  <div class="h-fit w-full px-3.5 pb-3 inline-flex place-content-between gap-32 border-b-1 border-b-gray-300">
    <div
      v-if="logo"
      class="h-auto w-fit inline-flex flex-col justify-end items-center mb-6"
    >
      <img
        :src="logo"
        alt="company logo"
      >
    </div>
    <HeaderDetail
      v-if="details"
      v-bind="{ ...details }"
    />
  </div>
</template>

<style scoped>

</style>
