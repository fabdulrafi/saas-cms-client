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

          :height="totalRows ? `calc(100vh - ${store.menu === 'horizontal' ? '436px' : '383px'})` : `calc(100vh - ${store.menu === 'horizontal' ? '361px' : '308px'})`">
          <template
            v-for="header in cols.filter((header) => header.hasOwnProperty('format'))"
            #[`${header.field}`]="{ value }">
            <template v-if="header.format === 'date'">
              {{ value[header.field] ? $format.date(value[header.field]) : '' }}
            </template>

            <template v-else-if="header.format === 'tag'">
              {{ value[header.field]?.name }}
            </template>

            <template v-else-if="header.format === 'type'">
              {{ value[header.field]?.name }}
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
                    {{ router.currentRoute.value.meta.title }} {{ payload.uuid ? 'Edit' : 'Add' }}
                  </div>

                  <div class="h-px w-full border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>

                  <div class="p-5">
                    <div class="flex-1 grid grid-cols-1 gap-6">
                      <div class="modal_placeholder">
                        <label class="text-sm font-thin">
                          Unit Name
  
                          <span class="text-danger">*</span>
                        </label>
                
                        <input
                          v-model="payload.name"

                          type="text"
                          placeholder="Ex: 301"
                          class="form-input" />

                        <div v-if="v$.name.$error"
                          class="validator">
                          {{ v$.name.$errors[0].$message }}
                        </div>
                      </div>

                      <div class="modal_placeholder">
                        <label class="text-sm font-thin">
                          Description
                        </label>
  
                        <textarea
                          v-model="payload.description"

                          placeholder="Write a description here . . ."

                          class="form-textarea min-h-[100px]">
                        </textarea>
                      </div>

                      <div class="modal_placeholder">
                        <label class="text-sm font-thin">
                          Unit Type
  
                          <span class="text-danger">*</span>
                        </label>
  
                        <div>
                          <div class="flex items-center gap-6 xs:gap-4">
                            <div class="w-full">
                              <SingleSelect
                                v-model="payload.unit_type_uuid"
  
                                :loadings="isLoadingOptionsTypes"
                                :options="rows_options_types"
  
                                placeholder="Ex: VVIP"
                                opens="bottom"
                                
                                tracks="uuid"
                                labels="name" />
                  
                              <div v-if="v$.unit_type_uuid.$error"
                                class="validator">
                                {{ v$.unit_type_uuid.$errors[0].$message }}
                              </div>
                            </div>
  
                            <div>
                              <button
                                @click="payload_type.uuid = ''; modal_type = true; modal = false;"

                                type="button"
                                v-tippy="{ content: 'Add Type', theme: 'primary' }"
                                class="btn btn-primary w-[38px] h-[38px] p-0 rounded-xl">
                                <IconPlus class="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div class="modal_placeholder flex items-center space-x-12">
                        <div class="text-sm font-thin">
                          Status
  
                          <span class="text-danger">*</span>
                        </div>
  
                        <div>
                          <div class="flex items-center">
                            <div class="w-12 h-6 relative">
                              <input
                                v-model="payload.status_view"
                                
                                type="checkbox"
                                class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                                id="custom_switch_checkbox7" />

                              <span
                                for="custom_switch_checkbox7"
                                class="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300">
                              </span>
                            </div>
                          </div>
                        </div>
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

    <!-- modal unit type -->
    <TransitionRoot
      appear
      :show="modal_type"
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
                <form @submit.prevent="submit_type">
                  <button
                    @click="modal_type = false; modal = true;"

                    type="button"
                    class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-danger dark:hover:text-danger outline-none">
                    <icon-x />
                  </button>

                  <div
                    class="text-lg capitalize font-bold bg-[#F9FBFE] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                    Unit Type {{ payload_type.uuid ? 'Edit' : 'Add' }}
                  </div>

                  <div class="h-px w-full border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>

                  <div class="p-5">
                    <div class="flex-1 grid grid-cols-1 gap-6">
                      <div class="modal_placeholder">
                        <label class="text-sm font-thin">
                          Unit Type Name
  
                          <span class="text-danger">*</span>
                        </label>
                
                        <input
                          v-model="payload_type.name"

                          type="text"
                          placeholder="Ex: Luxury"
                          class="form-input" />

                        <div v-if="v$Type.name.$error"
                          class="validator">
                          {{ v$Type.name.$errors[0].$message }}
                        </div>
                      </div>

                      <div class="modal_placeholder">
                        <label class="text-sm font-thin">
                          Description
                        </label>
  
                        <textarea
                          v-model="payload_type.description"

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
                        :loadings="tyLoading" />

                      <button
                        @click="modal_type = false; modal = true;"

                        type="button"
                        class="btn btn-outline-danger text-sm !font-semibold w-[80px] ltr:ml-4 rtl:mr-4 rounded-xl">
                        Close
                      </button>
                    </div>
                  </div>
                </form>

                <Error :messages="tyErrorMessage" margins="m-0" />
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
  import SingleSelect from '@/components/basic/select/Single.vue';

  import IconSearch from '@/components/icon/icon-search.vue';
  import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
  import IconX from '@/components/icon/icon-x.vue';
  import IconPencilPaper from '@/components/icon/icon-pencil-paper.vue';
  import IconPlus from '@/components/icon/icon-plus.vue';

  import BtnPrivate from "@/components/basic/button/BtnPrivate.vue";
  import Error from '@/components/basic/Error.vue';

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
        title: 'Unit Name',
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
        title: 'Unit Type',
        field: 'unit_type',
        minWidth: '200px',
        format: 'type',
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
        field: 'uuid',
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

    const { loading, data, error, get } = useApiWithAuth("client/unit");

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

  const isLoadingOptionsTypes: any = ref(false);
  const rows_options_types: any = ref([]);

  interface Payload {
    uuid?: string;
    unit_type_uuid?: string;

    name?: string;
    description?: string;
    status?: string;

    status_view?: boolean;
  };

  const initialState = (): Payload => {
    return {
      uuid: undefined,
      unit_type_uuid: undefined,

      name: '',
      description: '',
      status: 'ACTIVE',

      status_view: true,
    }
  };

  const payload = reactive<Payload>(initialState());

  const { v$, swalAlert, swalAlertUpdate, swalAlertConfirm, checkExistAct } = useValid(payload, ['uuid', 'description']);
  const { loading, data, post, put, errorMessage, error } = useApiWithAuth('client/unit');

  const getOptionsTypes = () => {
    isLoadingOptionsTypes.value = true;

    const { loading, data, error, get } = useApiWithAuth("client/unit-type");

    get({ limit: 10000 });

    watch([ loading ], () => {

      isLoadingOptionsTypes.value = loading.value;

      rows_options_types.value = data.value?.data;

    });
  };

  watch(modal, (value) => {
    nextTick(() => {
      if (!modal_type.value) {
        if (!value) {
          Object.assign(payload, initialState());

          v$.value.$reset();

          error.value = '';
        }

        else {
          getOptionsTypes();
        }
      }
    });
  });
  
  const submit = async () => {
    const isFormCorrect = await v$.value.$validate();

    if (!isFormCorrect) return;

    loading.value = true;

    payload.status = payload.status_view ? 'ACTIVE' : 'INACTIVE';

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
    payload.unit_type_uuid = item.unit_type.uuid;

    payload.name = item.name;
    payload.description = item.description;
    payload.status = item.status;

    payload.status_view = item.status === 'ACTIVE' ? true : false;

    modal.value = true;
  };

  const toDelete = (item: any) => {
    swalAlertConfirm(`Are you sure you want to delete data ${item.name}?`, 'warning', 'client/unit', item.uuid)
    .then((res) => {
      if (res) {
        swalAlert('Successfully delete data', 'success');

        getList();
      }
    });
  };

  const toggleStatus = (item: any) => {
    const { put: stPut } = useApiWithAuth(`client/unit/status/${item.uuid}`);

    const current = rows.value.find((i: any) => i.id === item.id);

    if (!current) return;
    
    swalAlertUpdate(`Are you sure you want to ${current.status === 'ACTIVE' ? 'activate' : 'deactivate'} data ${item.name}?`, 'warning')
    .then((res) => {
      if (res) {
        stPut({ status: current.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' })
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
  };


  // ====================================== modal form unit type ====================================== //
  const modal_type = ref(false);

  interface PayloadType {
    uuid?: string;
    name?: string;
    description?: string;
  };

  const initialStateType = (): PayloadType => {
    return {
      uuid: undefined,
      name: '',
      description: '',
    }
  };

  const payload_type = reactive<PayloadType>(initialStateType());

  const { v$: v$Type } = useValid(payload_type, ['uuid', 'description']);
  const { 
    loading: tyLoading, 
    data: tyData, 
    post: tyPost, 
    errorMessage: tyErrorMessage, 
    error: tyError } = useApiWithAuth('client/unit-type');

  watch(modal_type, (value) => {
    nextTick(() => {
      if (!value) {
        Object.assign(payload_type, initialStateType());

        v$Type.value.$reset();

        tyError.value = '';
      }

      else {
        
      }
    });
  });

  const submit_type = async () => {
    const isFormCorrect = await v$Type.value.$validate();

    if (!isFormCorrect) return;

    tyLoading.value = true;

    tyPost(payload_type).then(() => {
      // callback api
      modal_type.value = false;

      modal.value = true;

      swalAlert('Successfully saved data', 'success');

      getOptionsTypes();
    });
  };

  onMounted(() => {
    getList();
  });
</script>
