<template>
  <div>
    <div @click="modal = true"
      class="panel p-0 !rounded-xl bg-[#e0e6ed] dark:bg-[#121e32] h-full w-full flex items-center justify-center shadow-none cursor-pointer">
      <div class="text-center">
        <img 
          src="/assets/figma/icon_upload.svg"
          class="h-auto w-8 inline-block align-middle shrink-0 rounded-full" />

        <div class="text-sm text-gray-500 dark:text-white-dark mt-2">
          Upload Image
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
              <DialogPanel class="panel border-0 p-0 rounded-xl overflow-hidden w-full max-w-5xl text-black dark:text-white-dark">
                <form>
                  <button
                    @click="modal = false"
  
                    type="button"
                    class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-danger outline-none">
                    <icon-x />
                  </button>
  
                  <div
                    class="text-lg capitalize font-bold bg-[#F9FBFE] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                    Choose Image
                  </div>
  
                  <div class="h-px w-full border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>
  
                  <div class="p-5">
                    <div v-if="isLoading"
                      class="flex-1 grid grid-cols-6 gap-6">
                      <div v-for="i in 12" :key="i"
                        class="rounded-xl overflow-hidden">
                        <Image
                          :heights="150" />
                      </div>
                    </div>

                    <div v-else
                      class="flex-1 grid grid-cols-6 gap-6">
                      <div v-for="(item, index) in rows" :key="index">
                        <div 
                          @click="toggleSelection(item.uuid)"
                          :class="[
                            'relative rounded-xl border border-dashed overflow-hidden cursor-pointer',
                            selectedItems.includes(item.uuid)
                              ? 'border-primary ring-primary'
                              : 'dark:border-[#1b2e4b] border-[#e0e6ed]'
                          ]">
                          <img
                            class="h-[125px] w-full object-contain"
                            :src="item.url"
                            alt="" />

                          <div class="text-xs bg-[#2A48961F] text-primary dark:text-white-light font-semibold p-1.5 mt-2 flex justify-between items-center">
                            {{ $format.formatsize(item.sizebytes) }}

                            <IconChecks
                              v-if="selectedItems.includes(item.uuid)"
                              class="w-4 h-4 text-primary" />
                          </div>
                        </div>
                      </div>

                      <uploadImageMedia 
                        @input="changeImage"
                        class="h-[163px] w-full" />
                    </div>

                    <div v-if="paginationRows?.total_data > 0"
                      class="flex justify-between mt-6">
                      <div class="flex items-center text-sm">
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

                      <div>
                        <BtnPrivate
                          @click="toApply"
                          :types="false"
                          texts="Add to Contens" />
                      </div>
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
  import { onMounted, watch, reactive, ref, nextTick } from "vue";
  import { useApi, useApiWithAuth } from "@/modules/api";
  import { useValid } from "@/modules/valid";

  import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay, TabGroup, TabList, Tab } from '@headlessui/vue';

  import IconX from '@/components/icon/icon-x.vue';
  import IconCaretDown from '@/components/icon/icon-caret-down.vue';
  import IconChecks from '@/components/icon/icon-checks.vue';

  import uploadImageMedia from '@/components/upload/ImageMedia.vue';
  import Image from "@/components/basic/skeleton/Image.vue";
  import BtnPrivate from "@/components/basic/button/BtnPrivate.vue";

  interface Props {
    contents?: any;
  };

  const props = withDefaults(defineProps<Props>(), {
    contents: []
  });

  const emit = defineEmits(['update:contents']);

  const selectedItems = ref<string[]>([]);

  const modal = ref(false);

  const isLoading: any = ref(true);

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
    limit: 23,
    search: '',
    sort: '',
    order_by: '',
  });

  const getList = (load: boolean = true) => {
    isLoading.value = load;

    const { loading, data, error, get } = useApiWithAuth("client/storage-media");

    get(params);
        
    watch([ loading ], () => {
      
      isLoading.value = loading.value;

      rows.value = Array.isArray(data.value?.data)
        ? data.value.data.map((item: any) => ({
            uuid: item.uuid,
            filename: item.filename,
            mime_type: item.mime_type,
            extension: item.extension,
            url: item.url,
            sizebytes: item.sizebytes,
          }))
        : [];
      totalRows.value = data.value?.pagination?.total_data;

      paginationRows.value = data.value?.pagination;

      selectedItems.value = props.contents.map((item: any) => item.uuid);

    });
  };

  watch(modal, (value) => {
    nextTick(() => {
      if (!value) {
        
      }

      else {
        getList();

        selectedItems.value = props.contents.map((item: any) => item.uuid);
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
    const selectedMedia = rows.value.filter((item: any) =>
      selectedItems.value.includes(item.uuid)
    );

    emit('update:contents', selectedMedia);

    selectedItems.value = [];

    modal.value = false;
  };

  const { swalAlert } = useValid({});

  const changeImage = (e) => {
    if (e?.url) {
      swalAlert('Upload media success', 'success');
  
      getList(false);
    }
  };
</script>
