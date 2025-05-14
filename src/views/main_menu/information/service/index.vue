<template>
  <div>
    <div class="flex items-center whitespace-nowrap">
      <h5
        class="font-semibold capitalize text-lg dark:text-white-light">
        {{ router.currentRoute.value.meta.title }}
      </h5>

      <div
        class="flex items-center space-x-3 ltr:ml-auto rtl:mr-auto">
        <router-link
          to="/main-menu/information/service/add">
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

            <template v-else-if="header.format === 'image'">
              <div
                class="panel bg-grey-light dark:bg-[#121e32] shadow-none w-[50px] !p-2 mx-auto">
                <img
                  class="h-5 w-full max-w-20 object-contain mx-auto"
                  :src="value[header.field] ? value[header.field][0].url : `/assets/images/empty.png`" alt="" />
              </div>
            </template>

            <template v-if="header.format === 'desc'">
              <span class="truncate">
                {{ value[header.field].length > 50 ? `${value[header.field].slice(0, 50)}...` : value[header.field] }}
              </span>
            </template>

            <template v-else-if="header.format === 'status'">
              <div 
                @click="toggleStatus(value)"
                class="w-10 h-5 relative cursor-pointer">
                <input
                  :checked="value[header.field] === 'ACTIVE'"
                  
                  type="checkbox"
                  class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                  :id="`custom_switch_checkbox${value.id}`" />

                <span
                  :for="`custom_switch_checkbox${value.id}`"
                  class="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-3 before:h-3 before:rounded-full peer-checked:before:left-6 peer-checked:bg-primary before:transition-all before:duration-300">
                </span>
              </div>
            </template>
            
            <template v-else-if="header.format === 'action'">
              <div
                class="flex space-x-2">
                <router-link
                  :to="`/main-menu/information/service/edit/${value.uuid}`"
                  type="button"
                  v-tippy="{ content: 'Edit', theme: 'primary' }"
                  class="btn bg-[#2A48961F] dark:bg-dark/40 hover:bg-[#2A48961F]/20 dark:hover:bg-dark/60 w-8 h-8 p-0 rounded-lg text-white shadow-none border-none">
                  <div class="bg-primary rounded-full p-1">
                    <icon-pencil-paper class="w-3 h-3" />
                  </div>
                </router-link>

                <button
                  @click="toDelete(value)"
                  type="button"
                  v-tippy="{ content: 'Delete', theme: 'danger' }"
                  class="btn bg-[#2A48961F] dark:bg-dark/40 hover:bg-[#2A48961F]/20 dark:hover:bg-dark/60 w-8 h-8 p-0 rounded-lg text-white shadow-none border-none">
                  <div class="bg-danger rounded-full p-1">
                    <icon-trash-lines class="w-3 h-3" />
                  </div>
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
  import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
  import IconPencilPaper from '@/components/icon/icon-pencil-paper.vue';
  import IconInfoCircle from "@/components/icon/icon-info-circle.vue";

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

    type: 'SERVICE',
  });

  const rows: any = ref(null);

  const cols =
    reactive([
      {
        title: 'Contents',
        field: 'contents_limit1',
        width: '100px',
        minWidth: '100px',
        maxWidth: '100px',
        format: 'image',
        freeze: false
      },
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
        format: 'desc',
        freeze: false
      },
      {
        title: 'Status',
        field: 'status',
        width: '120px',
        minWidth: '120px',
        maxWidth: '120px',
        format: 'status',
        freeze: false
      },
      {
        title: 'Created At',
        field: 'created_at',
        width: '150px',
        minWidth: '150px',
        maxWidth: '150px',
        format: 'date',
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

    const { loading, data, error, get } = useApiWithAuth("client/information");

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

  const { swalAlert, swalAlertUpdate, swalAlertConfirm } = useValid({});
  const { loading, data, post, put, errorMessage, error } = useApiWithAuth('client/information');

  const toggleStatus = (item: any) => {
    const { loading, data, error, get } = useApiWithAuth(`client/information/${item.uuid}`);

    get(params);

    watch([ loading ], () => {

      const current = data.value?.data;

      if (!current) return;

      const payload: any = {
        uuid: current.uuid,
        type: current.type,
        title: current.title,
        description: current.description,
        status: current.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
        qr: current.qr,
        qr_code_url: current.qr_code_url,
        contents: current.contents,
      };

      payload.status_view = payload.status === 'ACTIVE' ? false : true;

      swalAlertUpdate(`Are you sure you want to ${payload.status_view ? 'activate' : 'deactivate'} data ${current.title}?`, 'warning')
      .then((res) => {
        if (res) {
          put(payload)
            .then(() => {
              // callback api
              swalAlert('Successfully saved data');

              getList();
            })
            .catch(() => {
              swalAlert('Failed saved data', 'error');
            });
        }

        else {
          
        }
      });

    });
  };

  const toDelete = (item: any) => {
    swalAlertConfirm(`Are you sure you want to delete data ${item.title}?`, 'warning', 'client/information', item.uuid)
    .then((res) => {
      if (res) {
        swalAlert('Successfully delete data', 'success');

        getList();
      }
    });
  };

  onMounted(() => {
    getList();
  });
</script>
