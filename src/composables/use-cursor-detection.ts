import { ref, onMounted, onUnmounted } from 'vue';

export function useCursorDetection(delay: number = 3000) {
  const cursorStatus = ref<string>('Moving');
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const handleMouseMove = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    cursorStatus.value = 'Moving';

    timeoutId = setTimeout(() => {
      cursorStatus.value = 'Stopped';
    }, delay);
  };

  onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove);
  });

  onUnmounted(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    window.removeEventListener('mousemove', handleMouseMove);
  });

  return {
    cursorStatus,
  };
}