<template>
  <div class="panel p-0 bg-white shadow-md rounded-xl overflow-hidden relative w-full h-full">
    <div
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"

      class="image-container bg-white relative overflow-hidden w-full h-full cursor-pointer">
      <img
        :src="imageSrc"
        :style="{ transformOrigin }"

        class="image absolute top-0 left-0 w-full h-full object-contain transition-transform duration-300 ease-in-out"
        alt="" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';

  export default defineComponent({
    name: 'ZoomImage',
    props: {
      imageSrc: {
        type: String,
        required: true,
      },
    },
    setup() {
      const transformOrigin = ref('center center');

      const handleMouseMove = (event: MouseEvent) => {
        const imageContainer = event.currentTarget as HTMLElement;
        const rect = imageContainer.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        transformOrigin.value = `${xPercent}% ${yPercent}%`;
      };

      const handleMouseLeave = () => {
        transformOrigin.value = 'center center';
      };

      return {
        transformOrigin,
        handleMouseMove,
        handleMouseLeave,
      };
    },
  });
</script>

<style scoped>
  .image-container:hover .image {
    transform: scale(2.5);
  }
</style>
