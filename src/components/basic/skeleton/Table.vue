<template>
  <div role="status" class="max-w-full animate-pulse">
    <div
      v-for="i in rows"
      :class="{ 'mb-6': i < rows - 1 }">
      <div
        class="flex items-center gap-4"
        :style="`width: ${widths}%;`">
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-[100%]"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  defineProps({
    rows: {
      type: Number,
      default: 3
    },

    widths: {
      type: Number,
      default: 25
    }
  });
</script>
