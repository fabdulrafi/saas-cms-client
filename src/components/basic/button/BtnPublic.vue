<template>
  <button
    :disabled="loadings"
    :class="`${margins} ${colors} ${shadows} rounded-${roundeds} ${fonts} ${witdths}`"

    :type="types ? 'submit' : 'button'"
    class="btn text-white !font-semibold border-0 py-3">
    <icon-loader v-if="loadings"
      class="animate-[spin_2s_linear_infinite] inline-block align-middle ltr:mr-2 rtl:ml-2 shrink-0" />

    {{ !loadings ? texts : 'Loading' }}
  </button>
</template>

<script lang="ts" setup>
  import IconLoader from '@/components/icon/icon-loader.vue';

  defineProps({
    loadings: {
      type: Boolean,
      default: false
    },

    types: {
      type: Boolean,
      default: true
    },

    margins: {
      type: String,
      default: ''
    },

    texts: {
      type: String,
      default: 'Save'
    },

    colors: {
      type: String,
      default: 'bg-primary'
    },

    shadows: {
      type: String,
      default: 'shadow-primary/50'
    },

    roundeds: {
      type: String,
      default: 'xl'
    },

    fonts: {
      type: String,
      default: 'text-base'
    },

    witdths: {
      type: String,
      default: 'w-full'
    },
  });
</script>
