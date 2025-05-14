<template>
  <div>
    <div class="flex items-center whitespace-nowrap">
      <h5
        class="font-semibold capitalize text-lg dark:text-white-light">
        {{ router.currentRoute.value.meta.title }}
      </h5>

      <div
        class="flex items-center space-x-3 ltr:ml-auto rtl:mr-auto">
        <BtnPrivate
          texts="Select"
          colors="bg-dark"
          shadows="shadow-dark/50"
          borders="border-dark"
          :xs="true"
          icons="check" />

        <router-link
          to="/settings/unit-setting/emergency/add">
          <BtnPrivate
            texts="Add New"
            :xs="true" />
        </router-link>
      </div>
    </div>
    
    <div class="panel p-0 mt-[24px] shadow-none rounded-xl overflow-hidden">
      <div
        class="flex items-center justify-between p-4">
        <div class="relative modal_placeholder">
          <input
            v-model="params.search"
            @input="filter"

            type="text"
            class="form-input ltr:pr-10 rtl:pl-10 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
            placeholder="Search . . ."/>

          <button type="button" class="absolute w-9 h-9 inset-0 ltr:left-auto rtl:right-auto mx-1 my-0.5 appearance-none peer-focus:text-primary">
            <icon-search class="mx-auto" />
          </button>
        </div>

        <div class="flex items-center space-x-10 ltr:ml-auto rtl:mr-auto">
          <button
            type="button" 
            class="btn p-0 shadow-none border-none text-base font-semibold dark:text-white-light">
            Active
  
            <span class="badge font-bold rounded-full m-0 !px-[6px] bg-gray-100 text-black ltr:ml-2 rtl:mr-2">
              12
            </span>
          </button>
        </div>
      </div>

      <div class="datatable">
        <!-- bh-table-bordered -->
        <vue3-datatable
          :sortable="true"
          :search="params.search"
          :hasCheckbox="false"

          @change="changeServer"
          :loading="isLoading"

          :rows="rows"
          :columns="cols"
          :totalRows="totalRows"

          :isServerMode="true"

          :pageSize="params.limit"
          :pageSizeOptions="[20, 50, 100]"

          :showNumbers="true"
          :showNumbersCount="3"
          :showFirstPage="true"
          :showLastPage="true"

          noDataContent="Data not found"

          :stickyHeader="true"
          :stickyFirstColumn="false"

          :height="totalRows ? `calc(100vh - ${store.menu === 'horizontal' ? '436px' : '383px'})` : `calc(100vh - ${store.menu === 'horizontal' ? '361px' : '308px'})`">
          <template
            v-for="header in cols.filter((header) => header.hasOwnProperty('format'))"
            #[`${header.field}`]="{ value }">
            <template v-if="header.format === 'date'">
              {{ value[header.field] ? $format.date(value[header.field]) : '' }}
            </template>

            <template v-else-if="header.format === 'datetime'">
              {{ value[header.field] ? $format.datetime(value[header.field]) : '' }}
            </template>

            <template v-else-if="header.format === 'currency'">
              {{ value[header.field] ? $format.currency(value[header.field]) : '' }}
            </template>

            <template v-if="header.format === 'desc'">
              <span class="truncate">
                {{ value[header.field].length > 50 ? `${value[header.field].slice(0, 50)}...` : value[header.field] }}
              </span>
            </template>

            <template v-else-if="header.format === 'image'">
              <div
                class="panel bg-grey-light dark:bg-[#121e32] shadow-none w-[50px] !p-2 mx-auto">
                <img
                  class="h-5 w-full max-w-20 object-contain mx-auto"
                  :src="value[header.field] ? value[header.field] : `/assets/images/profile_default.png`" alt="" />
              </div>
            </template>
            
            <template v-else-if="header.format === 'action'">
              <div
                class="flex space-x-2">
                <button
                  type="button"
                  v-tippy="{ content: 'Edit', theme: 'dark' }"
                  class="btn btn-dark w-7 h-7 p-0 rounded-md">
                  <icon-pencil-paper class="w-3 h-3" />
                </button>

                <button
                  type="button"
                  v-tippy="{ content: 'Delete', theme: 'danger' }"
                  class="btn btn-danger w-7 h-7 p-0 rounded-md">
                  <icon-trash-lines class="w-3 h-3" />
                </button>

                <button
                  type="button"
                  v-tippy="{ content: 'Detail', theme: 'primary' }"
                  class="btn btn-primary w-7 h-7 p-0 rounded-md">
                  <IconInfoCircle class="w-3 h-3" />
                </button>
              </div>
            </template>
          </template>
        </vue3-datatable>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { defineComponent, onMounted, watch, reactive, ref, computed } from "vue";

  import { useMeta } from '@/composables/use-meta';
  import { useApi, useApiWithAuth } from "@/modules/api";
  import { useAuth } from "@/modules/auth";
  import { useAppStore } from '@/stores/index';
  import { useRouter } from 'vue-router';
  import { useValid } from "@/modules/valid";
  import { useTable } from "@/modules/table";

  import Vue3Datatable from '@/components/datatable/custom-table.vue';

  import IconSearch from '@/components/icon/icon-search.vue';

  import BtnPrivate from "@/components/basic/button/BtnPrivate.vue";

  const router = useRouter();
  const store = useAppStore();

  useMeta({ title: router.currentRoute.value.meta.title });

  const isLoading: any = ref(true);
  const totalRows = ref(0);

  const params: any = reactive({
    page: 1,
    limit: 20,
    search: '',
    sort: '',
    order_by: '',

    type: 'member',
    status: 'approved',
    active_bool: '',
    deleted_bool: false
  });

  const rows: any = ref(null);

  const cols =
    reactive([
      {
        title: 'Title',
        field: 'title',
        minWidth: '200px',
        freeze: false
      },
      {
        title: 'Description',
        field: 'description',
        minWidth: '200px',
        freeze: false
      },
      {
        title: 'Distribution',
        field: 'distribution',
        minWidth: '200px',
        freeze: false
      },
      {
        title: 'Updated At',
        field: 'updated_at',
        width: '150px',
        minWidth: '150px',
        maxWidth: '150px',
        format: 'date',
        freeze: false
      },
      {
        title: 'Action',
        field: 'id',
        width: '120px',
        minWidth: '120px',
        maxWidth: '120px',
        headerClass: 'justify-center',
        cellClass: 'justify-center',
        format: 'action',
        link: '#',
        sort: false,
        freeze: true
      },
    ]) || [];

  let timer: any;

  const filter = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      getList();
    }, 300);
  };

  const getList = () => {
    isLoading.value = true;

    const { loading, data, error, get } = useApiWithAuth("user/data");

    get(params);

    watch([ loading ], () => {

      isLoading.value = loading.value;

      rows.value = data.value?.data;
      totalRows.value = data.value?.pagination?.total_data;

      colFreezes();

    });
  };

  const changeServer = (data: any) => {
    params.page = data.current_page;
    params.limit = data.pagesize;
    params.sort = data.sort_column;
    params.order_by = data.sort_direction;

    params.search = data.search;

    if (data.change_type === 'search' || data.change_type === 'filter') {
      filter();
    }

    else {
      getList();
    }
  };

  const { colFreezes } = useTable(cols);
</script>
