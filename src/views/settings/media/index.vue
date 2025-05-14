<template>
  <div>
    <div class="flex items-center whitespace-nowrap">
      <div class="text-sm text-gray-400 font-semibold">
        Settings / <span class="capitalize text-black dark:text-white-light">{{ router.currentRoute.value.meta.title }}</span>
      </div>

      <div
        class="flex items-center space-x-3 ltr:ml-auto rtl:mr-auto">
        
      </div>
    </div>
    
    <div class="panel p- mt-[24px] shadow-none rounded-xl min-h-[calc(100vh-225px)]">
      <div class="flex-1 grid grid-cols-1 gap-6">
        <div class="flex-1 grid grid-cols-3 gap-6">
          <div>
            <BtnPrivate
              @click="modal = true"
              texts="Add New" />
          </div>
          
          <div class="col-start-3">
            <div class="flex justify-between items-end">
              <div class="text-sm font-semibold">
                Storage
              </div>

              <div class="w-[75%]">
                <div class="flex items-center justify-between mb-1.5">
                  <div class="text-xs">
                    Total Use 
                    
                    <span class="font-bold">
                      {{ $format.formatsize(dataSummary.total_storage_used) }}
                    </span>
                  </div>

                  <div class="text-xs capitalize font-bold">
                   {{ dataSummary.total_storage_capacity === 'unlimited' ? dataSummary.total_storage_capacity : $format.numeric(dataSummary.total_storage_capacity) }} {{ dataSummary.total_storage_capacity === 'unlimited' ? '' : 'Gb' }}
                  </div>
                </div>
                
                <div class="w-full h-4 bg-[#2A48961F] dark:bg-dark/40 rounded-full flex overflow-hidden">
                  <!-- Progress Normal (<= 50%) -->
                  <div v-if="progress <= 50"
                    :style="{ width: progress + '%' }"
                    class="bg-primary h-4 ltr:rounded-l-full rtl:rounded-r-full flex items-center justify-center text-[8px] text-white font-semibold">
                    {{ progress }}%
                  </div>

                  <!-- Progress Warning (>50% && <=85%) -->
                  <div v-else-if="progress > 50 && progress <= 85"
                    :style="{ width: progress + '%' }"
                    class="bg-warning h-4 flex items-center justify-center text-[8px] text-white font-semibold">
                    {{ progress }}%
                  </div>

                  <!-- Progress Overused (>85%) -->
                  <div v-else
                    :style="{ width: '100%' }"
                    class="bg-danger h-4 ltr:rounded-r-full rtl:rounded-l-full flex items-center justify-center text-[8px] text-white font-semibold">
                    100%+
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="isLoading"
          class="flex-1 grid grid-cols-8 gap-6">
          <div v-for="i in 16" :key="i"
            class="rounded-xl overflow-hidden">
            <Image
              :heights="150" />
          </div>
        </div>

        <div v-else
          class="flex-1 grid grid-cols-8 gap-6">
          <div v-for="(item, index) in rows" :key="index">
            <div class="relative rounded-xl border border-dashed border-[#e0e6ed] dark:border-[#1b2e4b] overflow-hidden">
              <img
                @click="toImage(item.url, 'empty')"

                class="h-[125px] w-full object-contain cursor-pointer"
                :src="item.url"
                alt="" />

                
              <div class="text-xs bg-[#2A48961F] text-primary dark:text-white-light font-semibold p-1.5 mt-2 flex justify-between items-center">
                {{ $format.formatsize(item.sizebytes) }}

                <div
                  @click="toDelete(item)">
                  <icon-trash-lines class="w-3.5 h-3.5 text-danger cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="paginationRows?.total_data > 0"
          class="flex items-center justify-center sm:justify-end sm:flex-auto flex-1 absolute bottom-4 left-4 right-4">
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
            @click="params.page --; getList();"

            :disabled="params.page < 2"

            type="button"
            class="bg-white-light rounded-md p-1 enabled:hover:bg-primary enabled:hover:text-white dark:bg-white-dark/20 enabled:dark:hover:bg-white-dark/30 ltr:mr-3 rtl:ml-3 disabled:opacity-60 disabled:cursor-not-allowed">
            <IconCaretDown class="w-5 h-5 rtl:-rotate-90 rotate-90" />
          </button>

          <button
            @click="params.page ++; getList();"

            :disabled="params.page >= paginationRows.total_page"

            type="button"
            class="bg-white-light rounded-md p-1 enabled:hover:bg-primary enabled:hover:text-white dark:bg-white-dark/20 enabled:dark:hover:bg-white-dark/30 disabled:opacity-60 disabled:cursor-not-allowed">
            <IconCaretDown class="w-5 h-5 rtl:rotate-90 -rotate-90" />
          </button>
        </div>
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
                    class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-danger outline-none">
                    <icon-x />
                  </button>
  
                  <div
                    class="text-lg capitalize font-bold bg-[#F9FBFE] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                    Upload Media
                  </div>
  
                  <div class="h-px w-full border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>
  
                  <div class="p-5">
                    <div>
                      <div class="relative h-[225px] w-full rounded-xl">
                        <div v-if="payload.file"
                          class="relative">
                          <img
                            class="h-[225px] w-full object-contain rounded-xl border border-dashed border-[#e0e6ed] dark:border-[#1b2e4b]"
                            :src="payload.file"
                            alt="" />
                        </div>
          
                        <uploadImageMedia v-else
                          @input="changeImage"
                          class="h-[225px] w-full" />
                      </div>
                    </div>

                    <div class="text-xs text-gray-400 font-semibold mt-4"> 
                      <ul class="text-xs text-gray-400 !font-thin leading-relaxed">
                        <li>
                          *Your image must be a .jpg/.jpeg/.png
                        </li>

                        <li>
                          *Reduce image size
            
                          <a
                            href="https://www.iloveimg.com/resize-image/resize-svg"
                            target="_blank"
                            class="text-primary">
                            click here
                          </a>
                        </li>
            
                        <li>
                          *Cropping or cutting images
            
                          <a
                            href="https://www.iloveimg.com/crop-image"
                            target="_blank"
                            class="text-primary">
                            click here
                          </a>
                        </li>
            
                        <li>
                          *Remove image background
            
                          <a
                            href="https://www.iloveimg.com/remove-background"
                            target="_blank"
                            class="text-primary">
                            click here
                          </a>
                        </li>
            
                        <li>
                          *Maximum image file is 10 Mb
                        </li>
                      </ul>
                    </div>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- preview image -->
    <vue-easy-lightbox
      :visible="modal_img"
      :imgs="imgVal ? imgVal : `/assets/images/${imgEmptyVal}.png`"

      @hide="modal_img = false">
    </vue-easy-lightbox>
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
  import VueEasyLightbox from 'vue-easy-lightbox';

  import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
  import IconX from '@/components/icon/icon-x.vue';
  import IconCaretDown from '@/components/icon/icon-caret-down.vue';

  import uploadImageMedia from '@/components/upload/ImageMedia.vue';

  import BtnPrivate from "@/components/basic/button/BtnPrivate.vue";
  import Error from '@/components/basic/Error.vue';

  import Image from "@/components/basic/skeleton/Image.vue";

  import appFormat from "@/app-format";

  const router = useRouter();
  const store = useAppStore();

  useMeta({ title: router.currentRoute.value.meta.title });

  const isLoadingSummary: any = ref(true);
  const isLoading: any = ref(true);
  
  const dataSummary: any = ref({
    total_files: 0,
    total_storage_capacity: 100,
    total_storage_used: 0,
    total_storage_available: 0,
  });
  const progress = ref(Math.round((dataSummary.value.total_storage_used / dataSummary.value.total_storage_capacity) * 100));

  const rows: any = ref(null);

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
    limit: 24,
    search: '',
    sort: '',
    order_by: '',
  });

  const getSummary = () => {
    isLoadingSummary.value = true;

    const { loading, data, error, get } = useApiWithAuth("client/storage-media/summary");

    get();
        
    watch([ loading ], () => {

      isLoadingSummary.value = loading.value;
      
      const summary = data.value?.data;

      if (!summary) return;

      const used = summary.total_storage_used;
      const capacity = summary.total_storage_capacity === 'unlimited'
        ? 1_000_000_000_000 // fallback 1TB jika unlimited
        : summary.total_storage_capacity;

      dataSummary.value = {
        ...summary,
        usedFormatted: appFormat.formatsize(used),
        capacityFormatted: appFormat.formatsize(capacity),
      };

      progress.value = Math.round((used / capacity) * 100);

    });
  };

  const getList = () => {
    isLoading.value = true;

    const { loading, data, error, get } = useApiWithAuth("client/storage-media");

    get(params);
        
    watch([ loading ], () => {
      
      isLoading.value = loading.value;

      rows.value = data.value?.data;
      totalRows.value = data.value?.pagination?.total_data;

      paginationRows.value = data.value?.pagination;

    });
  };


  const modal = ref(false);

  interface Payload {
    file?: string;
  };

  const initialState = (): Payload => {
    return {
      file: '',
    }
  };

  const payload = reactive<Payload>(initialState());

  const { swalAlert, swalAlertConfirm } = useValid({});

  const changeImage = (e) => {
    if (e?.url) payload.file = e.url;

    if (payload.file) {
      setTimeout(() => {
        modal.value = false;

        payload.file = '';
    
        swalAlert('Upload media success', 'success');
          
        getSummary();
    
        getList();
      }, 1000);
    }

  };

  const toDelete = (item: any) => {
    swalAlertConfirm(`Are you sure you want to delete this data?`, 'warning', 'client/storage-media', item.uuid)
    .then((res) => {
      if (res) {
        swalAlert('Successfully delete data', 'success');

        getSummary();

        getList();
      }
    });
  };

  const modal_img = ref(false);

  const imgVal = ref('');
  const imgEmptyVal = ref('');

  const toImage = (item: any, img: string) => {
    imgVal.value = item;
    imgEmptyVal.value = img;

    modal_img.value = true;
  };

  onMounted(() => {
    getSummary();

    getList();
  });
</script>
