<template>
  <div role="status" class="max-w-full animate-pulse">
    <div
      class="bg-gray-200 dark:bg-gray-700"
      :class="`rounded-${roundeds}`"
      :style="`height: ${heights}px; width: ${widths}%;`">
    </div>
  </div>
</template>

<script lang="ts" setup>
  defineProps({
    heights: {
      type: Number,
      default: 100
    },

    widths: {
      type: Number,
      default: 100
    },

    roundeds: {
      type: String,
      default: 'sm'
    }
  });
</script>
