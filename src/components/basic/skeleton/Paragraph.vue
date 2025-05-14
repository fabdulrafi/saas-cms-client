<template>
  <div role="status" class="max-w-full animate-pulse">
    <div
      v-for="(item, index) in rows"
      :class="{ 'mb-6': index < rows - 1 }">
      <div
        class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"
        :style="`width: ${widths - 20}%;`">
      </div>

      <div
        class="flex items-center gap-4 mb-3"
        :style="`width: ${widths}%;`">
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[100%]"></div>
      </div>

      <div
        class="flex items-center gap-4 mb-3"
        :style="`width: ${widths + 20}%;`">
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[100%]"></div>
      </div>

      <div
        class="flex items-center gap-4"
        :style="`width: ${widths + 10}%;`">
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[100%]"></div>
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
