<template>
    <flat-pickr
      v-model="dateValue"
      @on-change="handleDateChange"

      :placeholder="props.placeholders"
      :config="basic"

      class="form-input">
    </flat-pickr>
  </template>

  <script lang="ts" setup>
    import { ref, watch } from 'vue'
    import { useAppStore } from '@/stores/index';

    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';

    import moment from 'moment';

    const store = useAppStore();

    const basic: any = ref({
      dateFormat: 'Y-m-d',
      position: store.rtlClass === 'rtl' ? 'auto right' : 'auto left'
    });

    interface Props {
      placeholders?: string;
      modelValue: string | undefined;
    };

    const props = withDefaults(defineProps<Props>(), {
      placeholders: `Ex: ${moment().format('YYYY-MM-DD')}`
    });

    const dateValue = ref(props.modelValue ?? '');

    const emit = defineEmits<{
      (e: 'update:modelValue', value: string | undefined): void
    }>();

    const handleDateChange = (selectedDates: Date[], dateStr: string) => {
      emit('update:modelValue', dateStr);
    };

    watch(() => props.modelValue, (newValue) => {
      dateValue.value = newValue ?? '';
    });
  </script>
