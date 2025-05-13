<template>
  <div>
    <div class="flex items-center whitespace-nowrap">
      <h5
        class="font-semibold capitalize text-lg dark:text-white-light">
        {{ router.currentRoute.value.name }}
      </h5>

      <div
        class="flex items-center space-x-3 ltr:ml-auto rtl:mr-auto">
        <BtnPrivate
          @click="payload.uuid = ''; modal = true;"

          texts="Add New"
          :xs="true" />
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

          :height="totalRows ? `calc(100vh - ${store.menu === 'horizontal' ? '436px' : '383px'})` : `calc(100vh - ${store.menu === 'horizontal' ? '361px' : '308px'})`"
          skin="whitespace-nowrap">
          <template
            v-for="header in cols.filter((header) => header.hasOwnProperty('format'))"
            #[`${header.field}`]="{ value }">
            <template v-if="header.format === 'date'">
              {{ value[header.field] ? $format.date(value[header.field]) : '' }}
            </template>

            <template v-if="header.format === 'tag'">
              {{ value[header.field]?.name }}
            </template>
            
            <template v-else-if="header.format === 'action'">
              <div
                class="flex space-x-2">
                <button
                  @click="toUpdate(value)"
                  type="button"
                  v-tippy="{ content: 'Edit', theme: 'primary' }"
                  class="btn bg-[#2A48961F] dark:bg-dark/40 hover:bg-[#2A48961F]/20 dark:hover:bg-dark/60 w-8 h-8 p-0 rounded-lg text-white shadow-none border-none">
                  <div class="bg-primary rounded-full p-1">
                    <icon-pencil-paper class="w-3 h-3" />
                  </div>
                </button>

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

    <!-- modal -->
    <TransitionRoot
      appear
      :show="modal"
      as="template">
      <Dialog
        as="div"
        class="relative z-[51]">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-[black]/60" />
        </TransitionChild>

        <div
          class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center px-4 py-8">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95">
              <DialogPanel class="panel border-0 p-0 rounded-xl overflow-hidden w-full max-w-xl text-black dark:text-white-dark">
                <form @submit.prevent="submit">
                  <button
                    @click="modal = false"

                    type="button"
                    class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-danger dark:hover:text-danger outline-none">
                    <icon-x />
                  </button>

                  <div
                    class="text-lg capitalize font-bold bg-[#F9FBFE] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                    {{ router.currentRoute.value.name }} {{ payload.uuid ? 'Edit' : 'Add' }}
                  </div>

                  <div class="h-px w-full border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>

                  <div class="p-5 py-6">
                    <div class="flex-1 grid grid-cols-1 gap-6">
                      <div class="modal_placeholder">
                        <label class="text-sm font-semibold">
                          Name
  
                          <span class="text-danger">*</span>
                        </label>
                
                        <input
                          v-model="payload.name"

                          type="text"
                          placeholder="Ex: Luxury"
                          class="form-input" />

                        <div v-if="v$.name.$error"
                          class="validator">
                          {{ v$.name.$errors[0].$message }}
                        </div>
                      </div>

                      <div class="modal_placeholder">
                        <label class="text-sm font-semibold">
                          Description
                        </label>
  
                        <textarea
                          v-model="payload.description"

                          placeholder="Write a description here . . ."

                          class="form-textarea min-h-[100px]">
                        </textarea>
                      </div>
                    </div>
                  </div>

                  <div class="h-px w-full border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>

                  <div class="p-5">
                    <div class="flex justify-end items-center">
                      <BtnPrivate 
                        :loadings="loading" />

                      <button
                        @click="modal = false"

                        type="button"
                        class="btn btn-outline-danger text-sm !font-semibold w-[80px] ltr:ml-4 rtl:mr-4 rounded-xl">
                        Close
                      </button>
                    </div>
                  </div>
                </form>

                <Error :messages="errorMessage" margins="m-0" />
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script lang="ts" setup>
  import { defineComponent, onMounted, watch, reactive, ref, computed, nextTick } from "vue";

  import { useMeta } from '@/composables/use-meta';
  import { useApi, useApiWithAuth } from "@/modules/api";
  import { useAuth } from "@/modules/auth";
  import { useAppStore } from '@/stores/index';
  import { useRouter } from 'vue-router';
  import { useValid } from "@/modules/valid";
  import { useTable } from "@/modules/table";

  import Vue3Datatable from '@/components/datatable/custom-table.vue';
  import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay, TabGroup, TabList, Tab } from '@headlessui/vue';

  import IconSearch from '@/components/icon/icon-search.vue';
  import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
  import IconX from '@/components/icon/icon-x.vue';
  import IconPencilPaper from '@/components/icon/icon-pencil-paper.vue';

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
  });

  const rows: any = ref(null);

  const cols =
    reactive([
      {
        title: 'Name',
        field: 'name',
        minWidth: '200px',
        freeze: false
      },
      {
        title: 'Tag',
        field: 'tag',
        minWidth: '200px',
        format: 'tag',
        freeze: false
      },
      {
        title: 'Description',
        field: 'description',
        minWidth: '200px',
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
        width: '80px',
        minWidth: '80px',
        maxWidth: '80px',
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

    const { loading, data, error, get } = useApiWithAuth("client/unit-type");

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

  // ====================================== modal form ====================================== //
  const modal = ref(false);

  interface Payload {
    uuid?: string;
    name?: string;
    description?: string;
  };

  const initialState = (): Payload => {
    return {
      uuid: undefined,
      name: '',
      description: '',
    }
  };

  const payload = reactive<Payload>(initialState());

  const { v$, swalAlert, swalAlertUpdate, swalAlertConfirm, checkExistAct } = useValid(payload, ['uuid', 'description']);
  const { loading, data, post, put, errorMessage, error } = useApiWithAuth('client/unit-type');

  watch(modal, (value) => {
    nextTick(() => {
      if (!value) {
        Object.assign(payload, initialState());

        v$.value.$reset();

        error.value = '';
      }

      else {
        
      }
    });
  });
  
  const submit = async () => {
    const isFormCorrect = await v$.value.$validate();

    if (!isFormCorrect) return;

    loading.value = true;

    if (!payload.uuid) {
      post(payload).then(() => {
        // callback api
        modal.value = false;

        swalAlert('Successfully saved data', 'success');

        getList();
      });
    } else {
      put(payload).then(() => {
        // callback api
        modal.value = false;

        swalAlert('Successfully saved data', 'success');

        getList();
      });
    }
  };

  const toUpdate = (item: any) => {
    payload.uuid = item.uuid;
    payload.name = item.name;
    payload.description = item.description;

    modal.value = true;
  };

  const toDelete = (item: any) => {
    swalAlertConfirm(`Are you sure you want to delete data ${item.name}?`, 'warning', 'client/unit-type', item.uuid)
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
