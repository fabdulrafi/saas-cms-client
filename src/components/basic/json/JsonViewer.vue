<template>
  <div class="json-viewer">
    <div v-if="typeof json === 'object'" @click="toggleExpand">
      <span class="toggle">{{ isExpanded ? '▼' : '▶' }}</span>

      <span v-if="Array.isArray(json)">Array[{{ json.length }}]</span>

      <span v-else>Object</span>
    </div>

    <div v-else>
      <span :class="getValueClass(json)">{{ formatValue(json) }}</span>
    </div>

    <div v-if="isExpanded && typeof json === 'object'" class="nested">
      <div v-for="(value, key) in json" :key="key" class="property">
        <span class="key">{{ key }}:</span>

        <JsonViewer :json="value" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';

  export default defineComponent({
    name: 'JsonViewer',
    props: {
      json: {
        type: [Object, Array, String, Number, Boolean],
        required: true
      }
    },
    setup() {
      const isExpanded = ref(false);

      const toggleExpand = () => {
        isExpanded.value = !isExpanded.value;
      };

      const getValueClass = (value: any): string => {
        if (typeof value === 'string') return 'string';
        if (typeof value === 'number') return 'number';
        if (typeof value === 'boolean') return 'boolean';
        if (value === null) return 'null';
        return '';
      };

      const formatValue = (value: any): string => {
        if (typeof value === 'string') return `"${value}"`;
        if (value === null) return 'null';
        return String(value);
      };

      return {
        isExpanded,
        toggleExpand,
        getValueClass,
        formatValue
      };
    }
  });
</script>

<style scoped>
  .json-viewer {
    font-family: monospace;
    font-size: 14px;
    line-height: 1.5;
  }
  .toggle {
    cursor: pointer;
    margin-right: 5px;
  }
  .nested {
    margin-left: 20px;
  }
  .property {
    margin: 5px 0;
  }
  .key {
    color: #881391;
    margin-right: 5px;
  }
  .string { color: #268bd2; }
  .number { color: #d33682; }
  .boolean { color: #b58900; }
  .null { color: #6c71c4; }
</style>
