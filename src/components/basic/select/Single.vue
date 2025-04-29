<template>
  <multiselect
    :modelValue="selectedOption"
    @update:modelValue="handleUpdate"

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
  import { computed } from 'vue'
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
    modelValue: string | undefined;
  };

  const props = withDefaults(defineProps<Props>(), {
    loadings: false,
    placeholders: 'Ex: Fabdulrafi',
    opens: 'top',
    labels: 'name',
    tracks: 'id'
  });

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string | undefined): void,
    (e: 'change',  value: string | undefined): void
  }>();

  const selectedOption = computed(() =>
    props.options.find(opt => opt.id === props.modelValue) || undefined
  );

  const handleUpdate = (newValue: { id: string; name: string } | undefined) => {
    emit('update:modelValue', newValue ? newValue.id : undefined);

    emit('change', newValue ? newValue.id : undefined);
  };
</script>
