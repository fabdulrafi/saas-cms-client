<template>
  <multiselect
    v-model="selectedOptions"

    :loading="props.loadings"
    :options="props.options"

    :searchable="true"
    @search-change=""
    :multiple="false"

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
  import { ref, watch } from 'vue'
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
    modelValue: Option[] | undefined;
  };

  const props = withDefaults(defineProps<Props>(), {
    loadings: false,
    placeholders: 'Ex: Fabdulrafi',
    opens: 'top',
    labels: 'name',
    tracks: 'id'
  });

  const emit = defineEmits(['update:modelValue']);

  const selectedOptions = ref<Option[]>(props.modelValue || []);

  watch(selectedOptions, (newValue) => {
    emit('update:modelValue', newValue);
  }, { deep: true });
</script>
