<template>
  <div role="status" class="max-w-full animate-pulse">
    <div
      v-for="i in rows"
      v-show="!grids"
      :class="{ 'mb-6': i < rows - 1 }">
      <div
        class="flex items-center gap-4"
        :style="`width: ${widths}%;`">
        <div class="h-11 bg-gray-200 rounded-md dark:bg-gray-700 w-[20%]"></div>
        <div class="w-[80%]">
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-[80%] mb-3"></div>
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-[100%]"></div>
        </div>
      </div>
    </div>

    <div
      v-if="grids"
      class="grid grid-cols-6 gap-6 p-4">
      <div
        v-for="i in rows">
        <div
          class="flex items-center gap-4"
          :style="`width: ${widths}%;`">
          <div class="h-11 bg-gray-200 rounded-md dark:bg-gray-700 w-[20%]"></div>
          <div class="w-[80%]">
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-[80%] mb-3"></div>
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-[100%]"></div>
          </div>
        </div>
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
    },

    grids: {
      type: Boolean,
      default: false
    }
  });
</script>
