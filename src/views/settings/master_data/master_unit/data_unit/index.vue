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
          texts="Select"
          colors="bg-dark"
          shadows="shadow-dark/50"
          :xs="true"
          icons="check" />

        <BtnPrivate
          @click="payload.id = ''; modal = true;"

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
          <button
            type="button" 
            class="btn p-0 shadow-none border-none text-base font-semibold dark:text-white-light">
            Unit
  
            <span class="badge font-bold rounded-full m-0 !px-[6px] bg-gray-100 text-black ltr:ml-2 rtl:mr-2">
              390
            </span>
          </button>

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

          :height="totalRows ? `calc(100vh - ${store.menu === 'horizontal' ? '433px' : '380px'})` : `calc(100vh - ${store.menu === 'horizontal' ? '358px' : '305px'})`"
          skin="whitespace-nowrap">
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
              <DialogPanel class="panel border-0 p-0 rounded-xl overflow-hidden w-full max-w-3xl text-black dark:text-white-dark">
                <form @submit.prevent="submit">
                  <button
                    @click="modal = false"

                    type="button"
                    class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-danger dark:hover:text-danger outline-none">
                    <icon-x />
                  </button>

                  <div
                    class="text-lg capitalize font-bold bg-[#F9FBFE] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                    {{ router.currentRoute.value.name }} {{ payload.id ? 'Edit' : 'Add' }}
                  </div>

                  <div class="h-px w-full border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>

                  <div class="p-5 py-6">
                    <div class="flex-1 grid grid-cols-1 sm:grid-cols-5 gap-6 xs:gap-2">
                      <div class="text-sm font-semibold">
                        Title

                        <span class="text-danger">*</span>
                      </div>
              
                      <div class="col-span-4 xs:mb-4">
                        <input
                          v-model="payload.title"

                          type="text"
                          placeholder="Ex: 301"
                          class="form-input" />

                        <div v-if="v$.title.$error"
                          class="validator">
                          {{ v$.title.$errors[0].$message }}
                        </div>
                      </div>

                      <div class="text-sm font-semibold">
                        Tag

                        <span class="text-danger">*</span>
                      </div>
              
                      <div class="col-span-4 xs:mb-4">
                        <input
                          v-model="payload.tag"

                          disabled
                          type="text"
                          placeholder="Ex: #unit_301"
                          class="form-input" />

                        <div v-if="v$.tag.$error"
                          class="validator">
                          {{ v$.tag.$errors[0].$message }}
                        </div>
                      </div>

                      <div class="text-sm font-semibold">
                        Description

                        <span class="text-danger">*</span>
                      </div>

                      <div class="col-span-4 xs:mb-4">
                        <textarea
                          v-model="payload.description"

                          placeholder="Write a description here . . ."

                          class="form-textarea min-h-[100px]">
                        </textarea>

                        <div v-if="v$.description.$error"
                          class="validator">
                          {{ v$.description.$errors[0].$message }}
                        </div>
                      </div>

                      <div class="text-sm font-semibold">
                        Type

                        <span class="text-danger">*</span>
                      </div>

                      <div class="col-span-4 xs:mb-4">
                        <div class="flex items-center gap-6 xs:gap-4">
                          <div class="w-full">
                            <SingleSelect
                              v-model="payload.type_tag"

                              :options="rows_options_types"

                              placeholder="Ex: VVIP"
                              opens="bottom" />
                
                            <div v-if="v$.type_tag.$error"
                              class="validator">
                              {{ v$.type_tag.$errors[0].$message }}
                            </div>
                          </div>

                          <div>
                            <button
                              type="button"
                              v-tippy="{ content: 'Add Type', theme: 'dark' }"
                              class="btn btn-dark w-[38px] h-[38px] p-0 rounded-xl">
                              <IconPlus class="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div class="text-sm font-semibold">
                        Type Tag

                        <span class="text-danger">*</span>
                      </div>

                      <div class="col-span-4 xs:mb-4">
                        <input
                          v-model="payload.type_tag"

                          disabled
                          type="text"
                          placeholder="Ex: #unittype_vvip"
                          class="form-input" />

                        <div v-if="v$.type_tag.$error"
                          class="validator">
                          {{ v$.type_tag.$errors[0].$message }}
                        </div>
                      </div>
                      
                      <div class="text-sm font-semibold">
                        Status

                        <span class="text-danger">*</span>
                      </div>

                      <div class="col-span-4 xs:mb-4">
                        <div class="flex items-center">
                          <label class="w-12 h-6 relative mb-0">
                            <input
                              v-model="payload.status"
                              
                              type="checkbox"
                              class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                              id="custom_switch_checkbox7" />

                            <span
                              for="custom_switch_checkbox7"
                              class="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300">
                            </span>
                          </label>

                          <div
                            @click="payload.status = !payload.status"

                            class="text-sm cursor-pointer ml-3">
                            {{ payload.status ? 'Active' : 'Not Active' }}
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
  import IconPlus from '@/components/icon/icon-plus.vue';

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
        title: 'Description',
        field: 'description',
        minWidth: '200px',
        freeze: false
      },
      {
        title: 'Screen Paired',
        field: 'screen_paired',
        minWidth: '200px',
        freeze: false
      },
      {
        title: 'Type',
        field: 'type',
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
        title: 'Status',
        field: 'category',
        width: '120px',
        minWidth: '120px',
        maxWidth: '120px',
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

  // ====================================== modal form ====================================== //
  const modal = ref(false);

  const isLoadingOptionsTypes: any = ref(false);
  const rows_options_types: any = ref([]);

  interface Payload {
    id?: string;
    title?: string;
    tag?: string;
    description?: string;
    type?: string;
    type_tag?: string;
    status?: boolean;
  };

  const initialState = (): Payload => {
    return {
      id: undefined,
      title: '',
      tag: '',
      description: '',
      type: '',
      type_tag: '',
      status: true
    }
  };

  const payload = reactive<Payload>(initialState());

  const { v$, swalAlert, swalAlertUpdate, swalAlertConfirm, checkExistAct } = useValid(payload, ['id']);
  const { loading, data, post, put, errorMessage, error } = useApiWithAuth('post');

  const getOptionsTypes = () => {
    rows_options_types.value = [
      { id: '#unittype_reguler', name: 'Reguler' },
      { id: '#unittype_vip', name: 'VIP' },
      { id: '#unittype_vvip', name: 'VVIP' },
      { id: '#unittype_luxury', name: 'Luxury' },
    ];
  };

  watch(modal, (value) => {
    nextTick(() => {
      if (!value) {
        Object.assign(payload, initialState());

        v$.value.$reset();

        error.value = '';
      }

      else {
        getOptionsTypes();
      }
    });
  });
  
  const submit = async () => {
    const isFormCorrect = await v$.value.$validate();

    if (!isFormCorrect) return;

    loading.value = true;

  };
</script>
