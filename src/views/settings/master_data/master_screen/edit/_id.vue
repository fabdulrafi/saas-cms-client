<template>
  <div>
    <div class="flex items-center whitespace-nowrap">
      <router-link
        to="/settings/master-data/master-screen"

        class="rounded-full p-1 text-primary hover:text-danger ring-2 ring-primary/30 hover:ring-danger ltr:mr-3 rtl:ml-3">
        <IconArrowBackward class="w-5 h-5" />
      </router-link>

      <h5
        class="font-semibold capitalize text-lg dark:text-white-light">
        <div class="text-sm text-gray-400 font-semibold">
          Settings / Master Data / <span class="capitalize text-black dark:text-white-light">{{ router.currentRoute.value.meta.title }}</span>
        </div>
      </h5>

      <div
        class="flex items-center space-x-3 ltr:ml-auto rtl:mr-auto">
        
      </div>
    </div>

    <div class="panel p- mt-[24px] shadow-none rounded-xl">
      <div class="flex-1 grid grid-cols-1 gap-6">
        <div>
          <div class="text-lg font-semibold dark:text-white-light">
            Detail Screen
          </div>

          <div class="text-sm text-gray-400 font-semibold">
            add a new screen to the Master Unit settings
          </div>
        </div>

        <div>
          <label class="text-sm font-semibold">
            Name

            <span class="text-danger">*</span>
          </label>
  
          <input
            v-model="payload.name"

            type="text"
            placeholder="Ex: TV Tower 1 304"
            class="form-input" />

          <div v-if="v$.name.$error"
            class="validator">
            {{ v$.name.$errors[0].$message }}
          </div>
        </div>

        <div>
          <label class="text-sm font-semibold">
            Type

            <span class="text-danger">*</span>
          </label>

          <SingleSelect
            v-model="payload.type"

            :options="[
              { id: 'UNIT', name: 'UNIT' },
              { id: 'SIGNAGE', name: 'SIGNAGE' },
            ]"

            placeholder="Ex: UNIT"
            opens="bottom" />

          <div v-if="v$.type.$error"
            class="validator">
            {{ v$.type.$errors[0].$message }}
          </div>
        </div>

        <div>
          <label class="text-sm font-semibold">
            Information

            <span class="text-danger">*</span>
          </label>

          <input
            v-model="payload.description"

            type="text"
            placeholder="Ex: Tower 1 on 3rd floor"
            class="form-input" />

          <div v-if="v$.description.$error"
            class="validator">
            {{ v$.description.$errors[0].$message }}
          </div>
        </div>

        <div>
          <label class="text-sm font-semibold mb-2">
            Custom Tag

            <span class="text-danger">*</span>
          </label>

          <div class="flex items-center space-x-4">
            <div v-for="(item, index) in payload.custom_tags" :key="index"
              class="text-sm font-semibold bg-warning/15 text-warning p-[9px] px-4 rounded-xl flex items-center">
              {{ item.name }}

              <IconX @click="payload.custom_tags?.splice(index, 1)"
                class="w-4 h-4 text-danger ml-2 cursor-pointer" />
            </div>

            <BtnPrivate
              @click="modal = true"
              texts="Add New" />
          </div>

          <div v-if="v$.custom_tags.$error"
            class="validator">
            {{ v$.custom_tags.$errors[0].$message }}
          </div>
        </div>

        <div>
          <div class="flex-1 grid grid-cols-1 sm:grid-cols-6 gap-20 xs:gap-6">
            <div class="flex justify-between items-center">
              <div class="text-sm font-semibold">
                Status

                <span class="text-danger">*</span>
              </div>

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
    </div>

    <div class="flex justify-between w-full mt-6">
      <div class="w-full">
        <Error :messages="errorMessage" margins="m-0 w-[50%]" />
      </div>

      <div class="flex justify-end">
        <BtnPrivate
          @click="submit"

          :loadings="loading" />

        <router-link
          to="/settings/master-data/master-screen"
          type="button"
          class="btn btn-outline-danger text-sm !font-semibold w-[80px] ltr:ml-4 rtl:mr-4 rounded-xl">
          Close
        </router-link>
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
              <DialogPanel class="panel border-0 p-0 rounded-xl overflow-hidden w-full max-w-sm text-black dark:text-white-dark">
                <form>
                  <button
                    @click="modal = false"

                    type="button"
                    class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-danger dark:hover:text-danger outline-none">
                    <icon-x />
                  </button>

                  <div
                    class="text-lg capitalize font-bold bg-[#F9FBFE] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                    Custom Tag
                  </div>

                  <div class="h-px w-full border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>

                  <div class="p-5">
                    <div class="flex-1 grid grid-cols-1 gap-6">
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
                      
                      <div v-if="isLoadingOptionsTags">
                        <Accordion :widths="80" />
                      </div>

                      <div v-else>
                        <div class="flex-1 grid grid-cols-1 gap-6">
                          <div v-for="(item, index) in rows_options_tags" :key="index"
                            @click="toggleSelection(item.uuid)"
                            :class="[
                              'relative text-sm border border-dashed p-4 rounded-xl cursor-pointer',
                              selectedItems.includes(item.uuid)
                                ? 'border-primary ring-primary text-primary'
                                : 'dark:border-[#1b2e4b] border-[#e0e6ed]'
                            ]">
                            <div class="flex justify-between">
                              {{ item.name }}

                              <IconChecks
                                v-if="selectedItems.includes(item.uuid)"
                                class="w-4 h-4 text-primary dark:text-white" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div v-if="paginationRows?.total_data > 0"
                        class="flex items-center justify-end text-sm">
                        <p class="ltr:mr-3 rtl:ml-3">
                          <span v-if="paginationRows?.total_data > 0">
                            {{ paginationRows?.start }} - {{ paginationRows?.start + paginationRows?.total_display - 1 }}
                          </span>
  
                          <span v-else>
                            0
                          </span>
  
                          from {{ paginationRows?.total_data }}
                        </p>
  
                        <button
                          @click="params.page --; getOptionsTags();"
  
                          :disabled="params.page < 2"
  
                          type="button"
                          class="bg-white-light rounded-md p-1 enabled:hover:bg-primary enabled:hover:text-white dark:bg-white-dark/20 enabled:dark:hover:bg-white-dark/30 ltr:mr-3 rtl:ml-3 disabled:opacity-60 disabled:cursor-not-allowed">
                          <IconCaretDown class="w-5 h-5 rtl:-rotate-90 rotate-90" />
                        </button>
  
                        <button
                          @click="params.page ++; getOptionsTags();"
  
                          :disabled="params.page >= paginationRows.total_page"
  
                          type="button"
                          class="bg-white-light rounded-md p-1 enabled:hover:bg-primary enabled:hover:text-white dark:bg-white-dark/20 enabled:dark:hover:bg-white-dark/30 disabled:opacity-60 disabled:cursor-not-allowed">
                          <IconCaretDown class="w-5 h-5 rtl:rotate-90 -rotate-90" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="h-px w-full border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>

                  <div class="p-5">
                    <div class="flex justify-end items-center">
                      <BtnPrivate
                        @click="toApply"

                        :types="false"
                        texts="Apply" />

                      <button
                        @click="modal = false"

                        type="button"
                        class="btn btn-outline-danger text-sm !font-semibold w-[80px] ltr:ml-4 rtl:mr-4 rounded-xl">
                        Close
                      </button>
                    </div>
                  </div>
                </form>
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

  import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay, TabGroup, TabList, Tab } from '@headlessui/vue';
  import SingleSelect from '@/components/basic/select/Single.vue';

  import IconSearch from '@/components/icon/icon-search.vue';
  import IconX from '@/components/icon/icon-x.vue';
  import IconArrowBackward from "@/components/icon/icon-arrow-backward.vue";
  import IconCaretDown from '@/components/icon/icon-caret-down.vue';
  import IconChecks from '@/components/icon/icon-checks.vue';

  import Accordion from "@/components/basic/skeleton/Accordion.vue";

  import BtnPrivate from "@/components/basic/button/BtnPrivate.vue";
  import Error from '@/components/basic/Error.vue';

  const router = useRouter();
  const store = useAppStore();

  useMeta({ title: router.currentRoute.value.meta.title });

  const modal = ref(false);

  const isLoadingOptionsTags: any = ref(false);
  const rows_options_tags: any = ref([]);
  
  interface Payload {
    uuid?: string;
    unit_uuid?: string;
    signage_uuid?: string;

    type?: string;
    name?: string;
    description?: string;
    status?: string;
    custom_tags?: any;

    status_view?: boolean;
  };

  const initialState = (): Payload => {
    return {
      uuid: undefined,
      unit_uuid: undefined,
      signage_uuid: undefined,

      type: 'UNIT',
      name: '',
      description: '',
      status: 'ACTIVE',
      custom_tags: [],

      status_view: true,
    }
  };

  const payload = reactive<Payload>(initialState());

  const { v$, swalAlert, swalAlertUpdate, swalAlertConfirm } = useValid(payload, ['uuid', 'unit_uuid', 'signage_uuid']);
  const { loading, data, put, errorMessage, error } = useApiWithAuth('client/information');


  const totalRows = ref(6);
  const paginationRows = ref({
    total_page: 0,
    total_data: 0,
    total_display: 0,
    current_page: 0,
    start: 0,
    end: 0,
    limit: 0
  });

  const params: any = reactive({
    page: 1,
    limit: 5,
    search: '',
    sort: '',
    order_by: '',

    is_custom: true
  });

  const selectedItems = ref<string[]>([]);

  let timer: any;

  const filter = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      getOptionsTags();
    }, 300);
  };

  const getOptionsTags = () => {
    isLoadingOptionsTags.value = true;

    const { loading, data, error, get } = useApiWithAuth("client/tag");

    get(params);

    watch([ loading ], () => {

      isLoadingOptionsTags.value = loading.value;

      rows_options_tags.value = Array.isArray(data.value?.data)
        ? data.value.data.map((item: any) => ({
            uuid: item.uuid,
            name: item.name,
          }))
        : [];
      totalRows.value = data.value?.pagination?.total_data;

      paginationRows.value = data.value?.pagination;

      selectedItems.value = payload.custom_tags.map((item: any) => item.uuid);

    });
  };

  watch(modal, (value) => {
    nextTick(() => {
      if (!value) {
        
      }

      else {
        getOptionsTags();
      }
    });
  });

  const toggleSelection = (uuid: string) => {
    const index = selectedItems.value.indexOf(uuid);
    
    if (index === -1) {
      selectedItems.value.push(uuid);
    } else {
      selectedItems.value.splice(index, 1);
    }
  };

  const toApply = () => {
    const selectedMedia = rows_options_tags.value.filter((item: any) =>
      selectedItems.value.includes(item.uuid)
    );

    payload.custom_tags = selectedMedia;

    selectedItems.value = [];

    modal.value = false;
  };

  const submit = async () => {
    const isFormCorrect = await v$.value.$validate();

    if (!isFormCorrect) return;

    loading.value = true;

    payload.status = payload.status_view ? 'ACTIVE' : 'INACTIVE';

    put(payload).then(() => {
      // callback api
      swalAlert('Successfully saved data', 'success');

      router.push('/settings/master-data/master-screen');
    });
  };

  const getDetail = async () => {
    const { loading, data, error, get } = useApiWithAuth(`client/screen/${router.currentRoute.value.params.uuid}`);

    get();

    watch([ loading ], () => {
      
      let item = data.value?.data

      payload.uuid = item.uuid;
      payload.unit_uuid = undefined;
      payload.signage_uuid = undefined;

      payload.type = item.type;
      payload.name = item.name;
      payload.description = item.description;
      payload.status = item.status;
      payload.custom_tags = item.custom_tags;

      payload.status_view = item.status === 'ACTIVE' ? true : false;
    });
  };
  
  onMounted(() => {
    getDetail();
  });
</script>
