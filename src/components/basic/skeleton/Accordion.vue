<template>
  <div role="status" class="max-w-full animate-pulse">
    <div
      v-for="(item, index) in rows"
      :class="{ 'mb-6': index < rows }">
      <div
        class="flex items-center gap-4"
        :style="`width: ${widths + 20}%;`">
        <div class="h-14 bg-gray-200 rounded-md dark:bg-gray-700 w-[100%]"></div>
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
