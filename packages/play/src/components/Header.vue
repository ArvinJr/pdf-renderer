<script setup lang="ts">
defineOptions({
  name: 'PHeader',
})
</script>

<template>
  <div class="w-full px-10 py-4 border-b-2 border-gray-600 inline-flex flex-wrap justify-start gap-2">
    <slot>
      <el-button type="primary">
        添加按钮
      </el-button>
    </slot>
  </div>
</template>

<style scoped>

</style>
