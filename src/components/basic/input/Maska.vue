<template>
  <input
    v-model="selectedOptions"

    type="tel"
    v-mask="props.masks"
    :placeholder="props.placeholders"
    class="form-input" />
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';

  interface Props {
    types?: boolean;
    masks?: string;
    placeholders?: string;
    modelValue: string | number | undefined;
  };

  const props = withDefaults(defineProps<Props>(), {
    types: false,
    masks: '####',
    placeholders: 'Ex: 0000'
  });

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number | undefined): void
  }>();

  const selectedOptions = ref(props.modelValue || undefined);

  watch(selectedOptions, (newValue) => {
    emit('update:modelValue',
      !props.types ?
      Number(newValue?.toString().replace(/\./g, '').replace(/[^\d.]/g, '')) :
      newValue?.toString().replace(/\./g, '').replace(/[^\d.]/g, ''));
  }, { deep: true });
</script>
