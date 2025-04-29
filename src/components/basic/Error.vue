<template>
  <div
    :class="`${margins}`"
    class="text-red-100 py-2 pl-4 border-l-4 border-red-600 rounded-sm bg-red-900"
    v-if="messages"
    v-html="messages">
  </div>
</template>

<script lang="ts" setup>
  defineProps({
    messages: {
      type: String,
      default: ''
    },

    margins: {
      type: String,
      default: 'mt-6'
    }
  });
</script>
