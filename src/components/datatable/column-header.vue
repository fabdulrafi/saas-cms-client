<template>
  <tr key="hdrrow">
    <th
      v-if="props.all.hasCheckbox"
      :key="'chkall'"
      class="bh-w-px"
      :class="{
        'bh-sticky bh-bg-blue-light bh-z-[1]': props.all.stickyHeader || props.all.stickyFirstColumn,
        'bh-top-0': props.all.stickyHeader,
        'bh-left-0': props.all.stickyFirstColumn,
      }">
      <div class="bh-checkbox">
        <input ref="selectedAll" type="checkbox" @click.stop="emit('selectAll',
          // @ts-ignore
          $event.target.checked)" />
        <div>
          <icon-check class="check" />
          <icon-dash class="intermediate" />
        </div>
      </div>
    </th>

    <template v-for="(col, j) in props.all.columns">
      <th
        v-if="!col.hide"
        :key="col.field"
        class="bh-select-none bh-z-[1]"
        :class="[
          props.all.sortable && col.sort ? 'bh-cursor-pointer' : '',
          j === 0 && props.all.stickyFirstColumn ? 'bh-sticky bh-left-0 bh-bg-blue-light' : '',
          props.all.hasCheckbox && j === 0 && props.all.stickyFirstColumn ? 'bh-left-[52px]' : '',
        ]"
        :style="{
          width: col.width,
          'min-width': col.minWidth,
          'max-width': col.maxWidth,
        }">
        <div class="bh-flex bh-items-center" :class="[col.headerClass ? col.headerClass : '']" @click="props.all.sortable && col.sort && emit('sortChange', col.field)">
          {{ col.title }}
          <span v-if="props.all.sortable && col.sort" class="bh-ml-3 bh-sort bh-flex bh-items-center" :class="[props.currentSortColumn, props.currentSortDirection]">
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
              <polygon
                points="3.11,6.25 10.89,6.25 7,1.75 "
                fill="currentColor"
                class="bh-text-black/20"
                :class="[currentSortColumn === col.field && currentSortDirection === 'asc' ? '!bh-text-primary' : '']">
              </polygon>

              <polygon
                points="7,12.25 10.89,7.75 3.11,7.75 "
                fill="currentColor"
                class="bh-text-black/20"
                :class="[currentSortColumn === col.field && currentSortDirection === 'desc' ? '!bh-text-primary' : '']">
              </polygon>
            </svg>
          </span>
        </div>

        <template v-if="props.all.columnFilter && !props.isFooter">
          <div v-if="col.filter" class="bh-filter bh-relative">
            <input v-if="col.type === 'string'"
              v-model.trim="col.value" type="text"

              class="bh-form-control rounded-[4px]"
              @keyup="emit('filterChange')" />

            <input v-if="col.type === 'number'"
              v-model.number.trim="col.value" type="number"

              class="bh-form-control rounded-[4px]"
              @keyup="emit('filterChange')" />

            <input v-else-if="col.type === 'date'"
              v-model="col.value" type="date"

              class="bh-form-control rounded-[4px]"
              @change="emit('filterChange')" />

            <select v-else-if="col.type === 'bool'" v-model="col.value" class="bh-form-control" @change="emit('filterChange')"
              @click="
                // @ts-ignore
                props.isOpenFilter = null">
              <option :value="undefined">All</option>
              <option :value="true">True</option>
              <option :value="false">False</option>
            </select>

            <multiselect v-else-if="col.type === 'select'"
              :modelValue="selectedOptions[j]"
              @update:modelValue="(value) => handleUpdate(j, value)"

              :options="col.option"

              :searchable="true"
              @search-change=""
              :multiple="false"

              :close-on-select="true"
              :clear-on-select="false"
              :preserve-search="true"

              class="custom-multiselect-table"
              placeholder="Semua"

              open-direction="bottom"

              label="title"
              track-by="id"

              selected-label=""
              select-label=""
              deselect-label="">
            </multiselect>

            <multiselect v-else-if="col.type === 'select_tree'"
              ref="inputValue"

              :modelValue="selectedOptionTree[j]"

              :options="col.option"

              :searchable="true"
              @search-change=""
              :multiple="false"

              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"

              class="custom-multiselect-table"
              placeholder="Semua"

              open-direction="bottom"

              label="title"
              track-by="id"

              selected-label=""
              select-label=""
              deselect-label="">
              <template #option="{ option }">
                <ul class="font-semibold">
                  <li>
                    <div class="grid grid-cols-4">
                      <div class="col-span-3">
                        <button
                          @click="toggleTreeview(option, j)"

                          type="button"
                          class="nav-link group w-full">
                          <div class="flex items-center">
                            <IconFolder class="group-hover:!text-primary shrink-0 max-w-5 max-h-5" />

                            <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-white-dark group-hover:!text-primary flex relative">
                              {{ option['title'] }}

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
                          :class="index_sub < 1 ? 'pt-4 pb-2' : index_sub >= option.children.length - 1 ? 'pt-2' : 'py-2'">
                          <div class="grid grid-cols-4">
                            <div class="col-span-3">
                              <button
                                @click="toggleTreeview(item_sub, j)"

                                type="button"
                                class="ltr:pl-[30px] rtl:pr-[30px] nav-link group w-full">
                                <div class="flex items-center">
                                  <IconBox class="group-hover:!text-primary shrink-0 max-w-5 max-h-5" />

                                  <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-white-dark group-hover:text-primary flex relative">
                                    {{ item_sub['title'] }}

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
                                :class="index_sub_child < 1 ? 'pt-4 pb-2' : index_sub_child >= item_sub.children.length - 1 ? 'pt-2' : 'py-2'">
                                <div class="grid grid-cols-4">
                                  <div class="col-span-3">
                                    <button
                                      @click="toggleTreeview(item_sub_child, j)"

                                      type="button"
                                      class="ltr:pl-[60px] rtl:pr-[60px] nav-link group w-full">
                                      <div class="flex items-center">
                                        <IconMinus class="group-hover:!text-primary shrink-0 max-w-5 max-h-5" />

                                        <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-white-dark group-hover:text-primary">
                                          {{ item_sub_child['title'] }}
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

            <!-- onfocus='this.size=10;' onblur='this.size=1;' onchange='this.size=1; this.blur();' -->

            <!-- <button v-if="col.type !== 'bool' && col.type !== 'select'" type="button" @click.stop="emit('toggleFilterMenu', col)">
              <icon-filter class="bh-w-4" />
            </button>

            <column-filter
              v-show="props.isOpenFilter === col.field"
              :column="col"
              :type="col.type"
              :columnFilterLang="props.columnFilterLang"
              @close="emit('toggleFilterMenu', null)"
              @filterChange="emit('filterChange')" /> -->
          </div>
        </template>
      </th>
    </template>
  </tr>
</template>

<script setup lang="ts">
  import { watch, ref, computed } from 'vue';
  import columnFilter from './column-filter.vue';
  import iconCheck from './icon-check.vue';
  import iconDash from './icon-dash.vue';
  import iconFilter from './icon-filter.vue';

  import Multiselect from '@suadelabs/vue3-multiselect';
  import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
  import VueCollapsible from 'vue-height-collapsible/vue3';

  import IconFolder from "@/components/icon/icon-folder.vue";
  import IconBox from "@/components/icon/icon-box.vue";
  import IconMinus from "@/components/icon/icon-minus.vue";

  const selectedAll: any = ref(null);

  const props = defineProps(['all', 'currentSortColumn', 'currentSortDirection', 'isOpenFilter', 'isFooter', 'checkAll', 'columnFilterLang']);

  const emit = defineEmits(['selectAll', 'sortChange', 'filterChange', 'toggleFilterMenu']);

  const checkboxChange = () => {
    if (selectedAll.value) {
      selectedAll.value.indeterminate = props.checkAll !== 0 ? !props.checkAll : false;
      selectedAll.value.checked = props.checkAll;
    }
  };

  watch(() => props.checkAll, checkboxChange);

  // SINGLE SELECT
  const selectedOptions = ref(props.all.columns.map(() => null));

  const handleUpdate = (index: number, value: any) => {
    selectedOptions.value[index] = value;
    props.all.columns[index].value = value.id;

    emit('filterChange');
  };


  // TREE SELECT
  const inputValue = ref();
  const treeview: any = ref([]);

  const selectedOptionTree = ref(props.all.columns.map(() => null));

  const toggleTreeview = (item: any, index: number) => {
    if (treeview.value.includes(item.id as never)) {
      treeview.value = treeview.value.filter((d: any) => d != item.id);
    } else {
      treeview.value.push(item.id as never);
    }

    if (item.children.length === 0) {
      console.log(item.id, index);

      selectedOptionTree.value[index] = item;
      props.all.columns[index].value = item.id;

      emit('filterChange');

      inputValue.value[0].deactivate();
    }
  };
</script>
