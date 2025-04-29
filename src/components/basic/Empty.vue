<template>
  <div 
    class="relative flex items-center justify-center overflow-hidden"
    :style="`height: calc(100vh - ${store.menu === 'horizontal' ? '350px' : '300px'});`">
    <div>
      <div>
        <img 
          src="/assets/images/empty.png"
          alt=""
          class="h-full md:w-[100px] xs:w-[30px] object-contain mx-auto" />
      </div>

      <div class="text-center mt-4">
        <div class="text-base font-bold mb-0.5">
          {{ messages }}
        </div>

        <div>
          {{ descriptions }} 
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useAppStore } from '@/stores/index';

  const store = useAppStore();

  defineProps({
    messages: {
      type: String,
      default: 'Data tidak ditemukan'
    },

    descriptions: {
      type: String,
      default: 'Data yang anda cari tidak ditemukan atau belum tersedia.'
    },

    margins: {
      type: String,
      default: ''
    }
  });
</script>

