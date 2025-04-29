<template>
  <button
    :disabled="loadings || disableds"
    :class="`${margins} ${colors} ${shadows} ${!xs ? 'sm:min-w-[80px]' : 'xs:w-9 xs:h-9 xs:p-2'} rounded-${roundeds} ${fonts}`"

    :type="types ? 'submit' : 'button'"
    class="btn text-white !font-semibold border-0">
    <icon-loader v-if="loadings"
      class="animate-[spin_2s_linear_infinite] inline-block align-middle ltr:mr-2 rtl:ml-2 shrink-0" />

    <div :class="{ 'xs:hidden': xs }">
      {{ !loadings ? texts : 'Loading' }}
    </div>

    <icon-plus-circle v-if="xs && icons === 'plus'"
      class="w-5 h-5 sm:hidden" />
    
    <icon-list-check v-if="xs && icons === 'check'"
      class="w-5 h-5 sm:hidden" />
  </button>
</template>

<script lang="ts" setup>
  import IconLoader from '@/components/icon/icon-loader.vue';
  import IconPlusCircle from '@/components/icon/icon-plus-circle.vue';
  import IconListCheck from '@/components/icon/icon-list-check.vue';

  defineProps({
    loadings: {
      type: Boolean,
      default: false
    },

    disableds: {
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

    xs: {
      type: Boolean,
      default: false
    },

    icons: {
      type: String,
      default: 'plus'
    },

    roundeds: {
      type: String,
      default: 'xl'
    },

    fonts: {
      type: String,
      default: 'text-sm'
    }
  });
</script>
