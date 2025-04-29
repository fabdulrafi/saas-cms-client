<template>
  <multiselect
    ref="inputValue"

    :modelValue="selectedOption"

    :loading="props.loadings"
    :options="props.options"

    :searchable="true"
    @search-change=""
    :multiple="false"

    :close-on-select="false"
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
    <template #option="{ option }">
      <ul class="font-semibold">
        <li>
          <div class="grid grid-cols-4">
            <div class="col-span-3">
              <button
                @click="toggleTreeview(option)"

                type="button"
                class="nav-link group w-full">
                <div class="flex items-center">
                  <IconFolder class="group-hover:!text-primary shrink-0 max-w-5 max-h-5" />

                  <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-white-dark group-hover:!text-primary flex relative">
                    {{ option[props.labels] }}

                    <span v-if="option.children.length > 0"
                      class="badge ltr:-right-6 rtl:-left-6 absolute -top-2 bg-success rounded-full !p-0 w-[16px] h-[16px] !text-[10px] flex items-center justify-center">
                      {{ option.children.length }}
                    </span>
                  </span>
                </div>
              </button>
            </div>
          </div>

          <vue-collapsible :isOpen="treeview.includes(option.id)">
            <ul>
              <li
                v-for="(item_sub, index_sub) in option.children"
                :class="index_sub < 1 ? 'pt-3 pb-1.5' : index_sub >= option.children.length - 1 ? 'pt-1.5' : 'py-1.5'">
                <div class="grid grid-cols-4">
                  <div class="col-span-3">
                    <button
                      @click="toggleTreeview(item_sub)"

                      type="button"
                      class="ltr:pl-[30px] rtl:pr-[30px] nav-link group w-full">
                      <div class="flex items-center">
                        <IconBox class="group-hover:!text-primary shrink-0 max-w-5 max-h-5" />

                        <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-white-dark group-hover:text-primary flex relative">
                          {{ item_sub[props.labels] }}

                          <span v-if="item_sub.children.length > 0"
                            class="badge ltr:-right-6 rtl:-left-6 absolute -top-2 bg-primary rounded-full !p-0 w-[16px] h-[16px] !text-[10px] flex items-center justify-center">
                            {{ item_sub.children.length }}
                          </span>
                        </span>
                      </div>
                    </button>
                  </div>
                </div>

                <vue-collapsible :isOpen="treeview.includes(item_sub.id)">
                  <ul>
                    <li
                      v-for="(item_sub_child, index_sub_child) in item_sub.children"
                      :class="index_sub_child < 1 ? 'pt-3 pb-1.5' : index_sub_child >= item_sub.children.length - 1 ? 'pt-1.5' : 'py-1.5'">
                      <div class="grid grid-cols-4">
                        <div class="col-span-3">
                          <button
                            @click="toggleTreeview(item_sub_child)"

                            type="button"
                            class="ltr:pl-[60px] rtl:pr-[60px] nav-link group w-full">
                            <div class="flex items-center">
                              <IconMinus class="group-hover:!text-primary shrink-0 max-w-5 max-h-5" />

                              <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-white-dark group-hover:text-primary">
                                {{ item_sub_child[props.labels] }}
                              </span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </li>
                  </ul>
                </vue-collapsible>
              </li>
            </ul>
          </vue-collapsible>
        </li>
      </ul>
    </template>
  </multiselect>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import Multiselect from '@suadelabs/vue3-multiselect';
  import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
  import VueCollapsible from 'vue-height-collapsible/vue3';

  import IconFolder from "@/components/icon/icon-folder.vue";
  import IconBox from "@/components/icon/icon-box.vue";
  import IconMinus from "@/components/icon/icon-minus.vue";

  interface Option {
    id: string | number;
    name: string;
    children: Option[];
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
    (e: 'update:modelValue', value: string | undefined): void
  }>();

  const inputValue = ref();
  const treeview: any = ref([]);

  const selectedOption = computed(() => {
    if (props.modelValue === null) return undefined;

    const findOption = (options: Option[]): Option | undefined => {
      for (const opt of options) {
        if (opt.id === props.modelValue) return opt;
        if (opt.children) {
          const found = findOption(opt.children);
          if (found) return found;
        }
      }
      return undefined;
    };

    return findOption(props.options);
  });

  const toggleTreeview = (item: any) => {
    if (treeview.value.includes(item.id as never)) {
      treeview.value = treeview.value.filter((d) => d != item.id);
    } else {
      treeview.value.push(item.id as never);
    }

    if (item.children.length === 0) {
      emit('update:modelValue', item.id);

      inputValue.value.deactivate();
    }
  };
</script>
