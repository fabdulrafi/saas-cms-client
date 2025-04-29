<template>
  <multiselect
    v-model="selectedOptions"

    :loading="props.loadings"
    :options="props.options"

    :searchable="true"
    @search-change=""
    :multiple="true"

    :close-on-select="true"
    :clear-on-select="false"
    :preserve-search="true"

    class="custom-multiselect modal_placeholder"
    :placeholder="props.placeholders"

    :open-direction="props.opens"

    :label="props.labels"
    :track-by="props.tracks"

    selected-label=""
    select-label=""
    deselect-label="">
  </multiselect>
</template>

<script lang="ts" setup>
  import { ref, watch, computed } from 'vue'
  import Multiselect from '@suadelabs/vue3-multiselect';
  import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';

  interface Option {
    id?: string;
    name?: string;
  };

  interface Props {
    options: Option[];
    loadings?: boolean;
    placeholders?: string;
    opens?: string;
    labels?: string;
    tracks?: string;
    modelValue: string[] | undefined;
  };

  const props = withDefaults(defineProps<Props>(), {
    loadings: false,
    placeholders: 'Ex: Fabdulrafi',
    opens: 'top',
    labels: 'name',
    tracks: 'id'
  });

  const emit = defineEmits(['update:modelValue']);

  const selectedOptions = ref<Option[]>([]);

  const selectedIds = computed(() => selectedOptions.value.map(option => option.id));

  watch(selectedOptions, (newValue) => {
    emit('update:modelValue', selectedIds.value);
  }, { deep: true });

  if (props.modelValue) {
    selectedOptions.value = props.modelValue.map(id => {
      const option = props.options.find(option => option.id === id);
      return option ? option : { id, name: '' };
    });
  }
</script>
