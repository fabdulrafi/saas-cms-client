<template>
  <flat-pickr
    v-model="timeValue"
    @on-change="handleTimeChange"

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
    noCalendar: true,
    enableTime: true,
    dateFormat: 'H:i',
    position: store.rtlClass === 'rtl' ? 'auto right' : 'auto left'
  });

  interface Props {
    placeholders?: string;
    modelValue: string | undefined;
  };

  const props = withDefaults(defineProps<Props>(), {
    placeholders: `Ex: ${moment().format('hh:mm')}`
  });

  const timeValue = ref(props.modelValue ?? '');

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string | undefined): void
  }>();

  const handleTimeChange = (selectedTimes: Date[], timeStr: string) => {
    emit('update:modelValue', timeStr);
  };

  watch(() => props.modelValue, (newValue) => {
    timeValue.value = newValue ?? '';
  });
</script>
