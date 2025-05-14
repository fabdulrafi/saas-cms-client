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
          texts="Group Greeting" />

        <BtnPrivate
          texts="PMS Integration" />
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
            Occupied
  
            <span class="badge font-bold rounded-full m-0 !px-[6px] bg-gray-100 text-black ltr:ml-2 rtl:mr-2">
              10
            </span>
          </button>
          
          <button
            type="button" 
            class="btn p-0 shadow-none border-none text-base font-semibold dark:text-white-light">
            Reserved
  
            <span class="badge font-bold rounded-full m-0 !px-[6px] bg-gray-100 text-black ltr:ml-2 rtl:mr-2">
              29
            </span>
          </button>

          <button
            type="button" 
            class="btn p-0 shadow-none border-none text-base font-semibold dark:text-white-light">
            Ready
  
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
            
            <template v-else-if="header.format === 'action'">
              <div
                class="flex space-x-2">
                <button
                  type="button"
                  v-tippy="{ content: 'Billing', theme: 'primary' }"
                  class="btn btn-primary w-7 h-7 p-0 rounded-md">
                  <IconDollarSignCircle class="w-4 h-4" />
                </button>

                <router-link
                  :to="`/main-menu/guest-control/request/1`">
                  <button
                    type="button"
                    v-tippy="{ content: 'Request', theme: value.status === 'Process' ? 'primary' : value.status === 'Arrival' ? 'success' : 'danger' }"
                    :class="value.status === 'Process' ? 'btn-primary' : value.status === 'Arrival' ? 'btn-success' : 'btn-danger'"
                    class="btn btn-sm w-[84px] h-7 p-0 rounded-md">
                    {{ value.status }}
                  </button>
                </router-link>

                <router-link
                  :to="`/main-menu/guest-control/messages/1`">
                  <button
                    type="button"
                    v-tippy="{ content: 'Messages', theme: 'primary' }"
                    :class="value.messages ? 'btn-primary' : 'btn-outline-primary'"
                    class="btn btn-sm w-[110px] h-7 p-0 rounded-md">
                    {{ value.messages ? 'Messages' : 'No Messages' }}
  
                    <span v-if="value.messages"
                      class="text-[10px] font-bold rounded-full !px-[4px] bg-[#FFEB3B] text-black ltr:ml-2 rtl:mr-2">
                      12
                    </span>
                  </button>
                </router-link>
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
  import IconDollarSignCircle from "@/components/icon/icon-dollar-sign-circle.vue";

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
        title: 'Unit',
        field: 'unit',
        width: '120px',
        minWidth: '120px',
        maxWidth: '120px',
        freeze: false
      },
      {
        title: 'Resident Name',
        field: 'resident_name',
        minWidth: '200px',
        freeze: false
      },
      {
        title: 'Arrival',
        field: 'arrival',
        minWidth: '100px',
        format: 'date',
        freeze: false
      },
      {
        title: 'Departure',
        field: 'departure',
        minWidth: '100px',
        format: 'date',
        freeze: false
      },
      {
        title: 'Catagory',
        field: 'category',
        minWidth: '150px',
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

    const { loading, data, error, get } = useApiWithAuth("client/guest");

    get(params);

    watch([ loading ], () => {

      isLoading.value = loading.value;

      // rows.value = data.value?.data;
      // totalRows.value = data.value?.pagination?.total_data;

      rows.value = [
        {
          unit: '301',
          resident_name: 'John Doe',
          arrival: new Date(),
          departure: new Date(),
          category: 'President Suite',
          status: 'Process',
          messages: 0
        },
        {
          unit: '302',
          resident_name: 'Alice Kane',
          arrival: new Date(),
          departure: new Date(),
          category: 'President Suite',
          status: 'Arrival',
          messages: 0
        },
        {
          unit: '303',
          resident_name: 'Jasmine Laute',
          arrival: new Date(),
          departure: new Date(),
          category: 'President Suite',
          status: 'Departure',
          messages: 12
        }
      ];
      totalRows.value = 1;

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

  onMounted(() => {
    getList();
  });
</script>
