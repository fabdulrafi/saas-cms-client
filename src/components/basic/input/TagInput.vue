<template>
  <input
    @change="handleChange"

    ref="inputRef"
    :placeholder="props.placeholders"
    class="form-input" />
</template>

<script lang="ts" setup>
  import { onMounted, ref } from "vue";
  import Tagify from "@yaireo/tagify";
  import "@yaireo/tagify/dist/tagify.css";

  interface Props {
    placeholders?: string;
    modelValue: any;
  };

  const props = withDefaults(defineProps<Props>(), {
    placeholders: 'Ex: 0000'
  });

  const emit = defineEmits<{
    (e: 'update:modelValue', value: any): void
  }>();

  const inputRef = ref();
  let tagify = ref();

  const handleChange = (e) => {
    let str = e.target.value;

    if (!str) emit("update:modelValue", []);
    else {
      let ans = str.split(",");

      emit("update:modelValue", ans);
    }
  }

  onMounted(() => {
    tagify.value = new Tagify(inputRef.value, {
      originalInputValueFormat: (valuesArr) =>
        valuesArr.map((item) => item.value).join(","),
    });

    tagify.value.loadOriginalValues(props.modelValue);
  });
</script>
