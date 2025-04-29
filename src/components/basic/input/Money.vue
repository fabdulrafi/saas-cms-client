<template>
  <Money3Component
    v-model.lazy="selectedOptions"

    v-bind="moneyOptions"
    :placeholder="props.placeholders"
    class="form-input" />
</template>

<script lang="ts" setup>
  import { ref, watch, defineProps, defineEmits, withDefaults, computed } from 'vue';
  import { Money3Component } from 'v-money3';

  interface Props {
    placeholders?: string;
    modelValue: any | undefined;
  }

  const props = withDefaults(defineProps<Props>(), {
    placeholders: 'Ex: 0000',
  });

  const emit = defineEmits<{
    (e: 'update:modelValue', value: any | undefined): void;
  }>();

  const selectedOptions = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  });

  const moneyOptions = ref({
    prefix: 'Rp ',
    suffix: '',
    thousands: '.',
    decimal: ',',
    precision: 0,
    masked: false
  });

  watch(selectedOptions, (newValue) => {
    emit('update:modelValue', Number(newValue));
  });
</script>
