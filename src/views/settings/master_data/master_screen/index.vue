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

            <template v-else-if="header.format === 'status'">
              <div class="flex items-center space-x-2.5">
                <img
                  :src="`/assets/figma/${value[header.field] === 'ACTIVE' ? 'icon_online' : 'icon_offline'}.svg`"
                  alt="Online"
                  class="w-6 h-6" />

                <div>
                  <div class="text-xs mb-0.5">
                    {{ $format.dateslash(value.last_seen_at) }} - {{ $format.time(value.last_seen_at) }}
                  </div>

                  <div class="text-xs text-gray-400">
                    {{ value.up_time }} min {{ value[header.field] === 'ACTIVE' ? 'online' : 'offline' }}
                  </div>
                </div>
              </div>
            </template>

            <template v-else-if="header.format === 'ip'">
              <div>
                <div class="text-xs flex items-center mb-0.5">
                  Public : {{ value.public_ip_address }}
                </div>

                <div class="text-xs flex items-center">
                  Local : {{ value.local_ip_address }}
                </div>
              </div>
            </template>

            <template v-else-if="header.format === 'os'">
              {{ value.os }} {{ value.os_version }}
            </template>
            
            <template v-else-if="header.format === 'action'">
              <div
                class="flex space-x-2">
                <router-link
                  :to="`/settings/master-data/master-screen/edit/${value.uuid}`"
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
              <DialogPanel class="panel border-0 p-0 rounded-xl overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                <form>
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
                      <div>
                        <div 
                          id="reader" 
                          class="h-[350px] xs:h-[335px] w-full rounded-xl overflow-hidden bg-[#e0e6ed] dark:bg-[#121e32]">
                        </div>
                      </div>

                      <div> 
                        <ol class="text-xs text-gray-400 !font-semibold leading-relaxed list-decimal list-inside">
                          <li>
                            Install the Smartiv App on the TV

                            <ul class="!font-thin list-disc ml-[26px] my-1">
                              <li>
                                Turn on your Google TV or Android TV
                              </li>
                              <li>
                                Open the Play Store and search for Smartiv Hospitality
                              </li>
                              <li>
                                Download and install the app
                              </li>
                            </ul>
                          </li>

                          <li>
                            Open the App

                            <ul class="!font-thin list-disc ml-[26px] my-1">
                              <li>
                                Launch the Smartiv Hospitality app
                              </li>
                              <li>
                                A QR code and a 6-digit code will appear on the screen
                              </li>
                            </ul>
                          </li>
              
                          <li>
                            Register the Screen

                            <ul class="!font-thin list-disc ml-[26px] my-1">
                              <li>
                                Open your phone camera and scan the QR code on the TV
                              </li>
                              <li>
                                This will open the registration page in your browser
                              </li>
                            </ul>
                          </li>
              
                          <li>
                            Fill in the required details and submit
                          </li>
                        </ol>
                      </div>
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
  import IconX from '@/components/icon/icon-x.vue';
  import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
  import IconPencilPaper from '@/components/icon/icon-pencil-paper.vue';
  import IconInfoCircle from "@/components/icon/icon-info-circle.vue";

  import { Html5Qrcode } from 'html5-qrcode';

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
        title: 'Screen',
        field: 'name',
        minWidth: '200px',
        freeze: false
      },
      {
        title: 'MAC Address',
        field: 'mac_address',
        minWidth: '175px',
        freeze: false
      },
      {
        title: 'Online / Offline',
        field: 'status',
        minWidth: '200px',
        format: 'status',
        freeze: false
      },
      {
        title: 'Ip Address',
        field: 'local_ip_address',
        width: '150px',
        minWidth: '150px',
        maxWidth: '150px',
        format: 'ip',
        freeze: false
      },
      {
        title: 'Type',
        field: 'type',
        width: '120px',
        minWidth: '120px',
        maxWidth: '120px',
        freeze: false
      },
      {
        title: 'OS',
        field: 'os',
        width: '120px',
        minWidth: '120px',
        maxWidth: '120px',
        format: 'os',
        freeze: false
      },
      {
        title: 'Version App',
        field: 'app_version',
        width: '150px',
        minWidth: '150px',
        maxWidth: '150px',
        freeze: false
      },
      {
        title: 'Model',
        field: 'model',
        width: '120px',
        minWidth: '120px',
        maxWidth: '120px',
        freeze: false
      },
      {
        title: 'Internet',
        field: 'internet_speed',
        width: '120px',
        minWidth: '120px',
        maxWidth: '120px',
        freeze: false
      },
      {
        title: 'Signal',
        field: 'signal_strength',
        width: '120px',
        minWidth: '120px',
        maxWidth: '120px',
        freeze: false
      },
      {
        title: 'Last At',
        field: 'last_seen_at',
        minWidth: '150px',
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

    const { loading, data, error, get } = useApiWithAuth("client/screen");

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
    code?: string;
  };

  const initialState = (): Payload => {
    return {
      uuid: undefined,
      code: '',
    }
  };

  const payload = reactive<Payload>(initialState());

  const { v$, swalAlert, swalAlertUpdate, swalAlertConfirm, checkExistAct } = useValid(payload, ['uuid']);
  const { loading, data, post, put, errorMessage, error } = useApiWithAuth('client/screen');

  const scannedResult = ref<string | null>(null);
  const isScanning = ref(false);
  let html5Qrcode: Html5Qrcode | null = null;
  
  const startScan = () => {
    if (html5Qrcode) {
      html5Qrcode.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText: string) => {
          scannedResult.value = decodedText;

          payload.code = JSON.parse(scannedResult.value as string)?.code;

          if (loading.value) return;

          submit();
        },
        (errorMessage: string) => {
          console.error(errorMessage);
        }
      ).then(() => {
        isScanning.value = true;
      }).catch((err) => {
        console.error('Error starting QR code scanner:', err);
      });
    }
  };

  const stopScan = () => {
    if (html5Qrcode) {
      html5Qrcode.stop().then(() => {
        console.log('QR code scanner stopped');
        
        isScanning.value = false;

        scannedResult.value = null;

        modal.value = false;
      }).catch((err) => {
        console.error('Error starting QR code scanner:', err);
      });
    }
  };

  watch(modal, (value) => {
    nextTick(() => {
      if (!value) {
        Object.assign(payload, initialState());

        v$.value.$reset();

        error.value = '';

        stopScan();

        if (html5Qrcode) {
          html5Qrcode.clear();
        }
      }

      else {
        html5Qrcode = new Html5Qrcode('reader');

        startScan();
      }
    });
  });

  const submit = async () => {
    const isFormCorrect = await v$.value.$validate();

    if (!isFormCorrect) return;

    loading.value = true;

    post(payload).then(() => {
      // callback api
      swalAlert('Successfully saved data', 'success');

      stopScan();
  
      router.push({
        name: 'master screen edit',
        params: {
          uuid: data.value?.data?.uuid
        }
      });
    }).catch(() => {
      if (error.value?.status === 404) {
        swalAlert('Failed to save data', 'error');

        stopScan();
      }
    });
  };

  const toDelete = (item: any) => {
    swalAlertConfirm(`Are you sure you want to delete data ${item.name}?`, 'warning', 'client/screen', item.uuid)
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
