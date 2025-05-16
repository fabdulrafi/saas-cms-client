<template>
  <div>
    <div class="flex items-center whitespace-nowrap">
      <h5
        class="font-semibold capitalize text-lg dark:text-white-light">
        {{ router.currentRoute.value.meta.title }}
      </h5>

      <div
        class="flex items-center space-x-3 ltr:ml-auto rtl:mr-auto">
        <BtnPrivate @click="modal = true" 
          texts="Add New" />
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

    <!-- modal -->
    <div
      class="fixed inset-0 bg-[black]/60 z-[51] px-4 hidden transition-[display]"
      :class="{ '!block': modal }"
      @click="modal = false">
    </div>

    <nav
      class="bg-white fixed ltr:-right-[700px] rtl:-left-[700px] top-0 bottom-0 w-full max-w-[700px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-300 z-[51] dark:bg-[#0e1726] py-4 rounded-xl rounded-r-none m-2.5 mr-0"
      :class="{ 'ltr:!right-0 rtl:!left-0': modal }">
      <form @submit.prevent="submit">
        <div class="flex justify-between px-4">
          <div class="flex items-center space-x-3">
            <img
              src="/assets/figma/icon_plane.svg"
              alt=""
              class="w-6 h-6" />

            <div class="text-xl font-semibold dark:text-white-light">
              Guest Detail
            </div>
          </div>

          <div class="bg-primary/15 p-2 px-4 rounded-xl">
            <div class="flex items-center space-x-3">
              <img
                src="/assets/figma/icon_door.svg"
                alt=""
                class="w-5 h-5" />

              <div class="text-base font-semibold text-primary dark:text-white-light">
                Unit : 332
              </div>
            </div>
          </div>
        </div>

        <div class="h-px w-full border-b border-[#e0e6ed] dark:border-[#1b2e4b] my-4 px-4"></div>

        <div class="h-[calc(100vh-196px)] overflow-auto">
          <div class="flex-1 grid grid-cols-1 gap-6 px-4">
            <div class="flex-1 grid grid-cols-2 gap-6">
              <div class="modal_placeholder">
                <label class="text-sm font-semibold">
                  Resident Name
  
                  <span class="text-danger">*</span>
                </label>
        
                <input
                  v-model="payload.name"
  
                  type="text"
                  placeholder="Ex: John Smith"
                  class="form-input" />
  
                <div v-if="v$.name.$error"
                  class="validator">
                  {{ v$.name.$errors[0].$message }}
                </div>
              </div>
  
              <div class="modal_placeholder">
                <label class="text-sm font-semibold">
                  Phone Number
      
                  <span class="text-danger">*</span>
                </label>
  
                <div class="flex">
                  <div class="dropdown">
                    <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'" offsetDistance="0">
                      <div 
                        class="bg-[#eee] flex justify-center items-center space-x-2 rounded-none py-2.5 px-6 font-semibold border border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b] ltr:rounded-l-xl rtl:rounded-r-xl cursor-pointer">
                        <img
                          :src="payload.flag"
                          alt=""
                          class="w-5 h-5 rounded-full" />
  
                        <span class="text-white-dark">
                          ({{ payload.code }})
                        </span>
                      </div>
  
                      <template #content="{ close }">
                        <ul @click="close()" class="whitespace-nowrap !rounded-xl overflow-auto h-[200px] w-[50px]">
                          <li v-for="(item, index) in countryCallingCodes" :key="index"
                            @click="payload.country = item?.country; payload.flag = item.flag; payload.code = item?.calling_code;">
                            <a href="javascript:;"
                              class="flex items-center space-x-2 p-2 hover:bg-[#eee] dark:hover:bg-[#1b2e4b]">
                              <img
                                :src="item.flag"
                                alt=""
                                class="w-5 h-5 rounded-full" />
                              
                              <span class="text-white-dark">
                                ({{ item?.calling_code }})
                              </span>
                            </a>
                          </li>
                        </ul>
                      </template>
                    </Popper>
                  </div>
                  
                  <div class="relative text-white-dark modal_placeholder !w-full">
                    <Maska
                      v-model="payload.phone_number_view"
  
                      :types="true"
                      masks="####-####-####"
                      placeholders="Ex: 234-5678-1234"
                      class="form-input placeholder:text-white-dark ltr:rounded-l-none rtl:rounded-r-none" />
                  </div>
                </div>
  
                <div v-if="v$.phone_number_view.$error"
                  class="validator">
                  {{ v$.phone_number_view.$errors[0].$message }}
                </div>
              </div>
            </div>
  
            <div class="modal_placeholder">
              <label class="text-sm font-semibold">
                Email
    
                <span class="text-danger">*</span>
              </label>
      
              <input
                v-model="payload.email"
  
                type="email"
                placeholder="Ex: company@mail.com"
                class="form-input" />
  
              <div v-if="v$.email.$error"
                class="validator">
                {{ v$.email.$errors[0].$message }}
              </div>
            </div>
  
            <div class="flex-1 grid grid-cols-2 gap-6">
              <div class="modal_placeholder">
                <label class="text-sm font-semibold">
                  Arrival Date
  
                  <span class="text-danger">*</span>
                </label>
  
                <Datetime
                  v-model="payload.arrival_at" />
  
                <div v-if="v$.arrival_at.$error"
                  class="validator">
                  {{ v$.arrival_at.$errors[0].$message }}
                </div>
              </div>
  
              <div class="modal_placeholder">
                <label class="text-sm font-semibold">
                  Departure Date
  
                  <span class="text-danger">*</span>
                </label>
  
                <Datetime
                  v-model="payload.departure_at" />
  
                <div v-if="v$.departure_at.$error"
                  class="validator">
                  {{ v$.departure_at.$errors[0].$message }}
                </div>
              </div>
            </div>
  
            <div>
              <div class="flex justify-between items-center w-[35%]">
                <div class="text-sm font-semibold">
                  Apply for other Unit
  
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
  
            <div>
              <div class="flex items-center space-x-4">
                <div v-for="(item, index) in payload.units" :key="index"
                  class="text-sm font-semibold bg-primary/15 text-primary dark:text-white/50 p-[9px] px-4 rounded-xl flex items-center">
                  {{ item.name }}
  
                  <IconX @click="payload.units?.splice(index, 1)"
                    class="w-4 h-4 text-danger ml-2 cursor-pointer" />
                </div>
  
                <BtnPrivate
                  @click="modal_unit_tags = true"
                  :types="false"
                  texts="Add New" />
              </div>

              <div v-if="v$.units.$error"
                class="validator">
                {{ v$.units.$errors[0].$message }}
              </div>
            </div>
  
            <div>
              <label class="text-sm font-semibold">
                Theme Greeting
  
                <span class="text-danger">*</span>
              </label>
  
              <div class="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div v-for="option in rows_options_themes" :key="option.id">
                  <div 
                    @click="payload.greeting_type = option.id; payload.greeting_text = '';"
    
                    :class="{ '!border-primary' : payload.greeting_type === option.id }"
                    class="relative p-4 border border-[#e0e6ed] dark:border-[#1b2e4b] rounded-xl cursor-pointer">
                    <div class="flex items-center justify-center space-x-4">
                      <img
                        :src="option.icon"
                        alt=""
                        class="w-12 h-12" />
    
                      <div 
                        :class="{ '!text-primary' : payload.greeting_type === option.id }"
                        class="text-sm font-semibold">
                        {{ option.name }}
                      </div>
                    </div>
    
                    <div v-if="payload.greeting_type === option.id"
                      class="absolute top-1 right-1">
                      <img src="/assets/images/check.svg" alt="" class="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
  
              <div v-if="v$.greeting_type.$error"
                class="validator">
                {{ v$.greeting_type.$errors[0].$message }}
              </div>
            </div>
  
            <div v-if="payload.greeting_type === 'IMAGE'"
              class="modal_placeholder">
              <label class="text-sm font-semibold">
                Image
  
                <span class="text-danger">*</span>
              </label>
  
              <takeOrMedia
                v-model:contents="payload.greeting_image_url"
                wh="w-[340px] h-[200px]" />
  
              <div v-if="v$.greeting_image_url.$error"
                class="validator">
                {{ v$.greeting_image_url.$errors[0].$message }}
              </div>

              <div class="text-sm bg-[#2A48961F] p-2 px-4 rounded-xl text-primary dark:text-gray-400 mt-6 flex items-center">
                <img
                  class="w-4 h-4 inline-block mr-2"
                  src="/assets/figma/icon_information.svg"
                  alt="" />

                Your contents must be a JPG/JPEG/PNG up to 10 MB, and 1,920 px by 1,080 px a 16:9 ratio.
              </div>
            </div>

            <div v-if="payload.greeting_type === 'TEXT_IMAGE'"
              class="modal_placeholder">
              <label class="text-sm font-semibold">
                Image
  
                <span class="text-danger">*</span>
              </label>
  
              <takeOrMedia
                v-model:contents="payload.greeting_image_url"
                wh="w-[340px] h-[200px]" />
  
              <div v-if="v$.greeting_image_url.$error"
                class="validator">
                {{ v$.greeting_image_url.$errors[0].$message }}
              </div>

              <div class="text-sm bg-[#2A48961F] p-2 px-4 rounded-xl text-primary dark:text-gray-400 mt-6 flex items-center">
                <img
                  class="w-4 h-4 inline-block mr-2"
                  src="/assets/figma/icon_information.svg"
                  alt="" />

                Your contents must be a JPG/JPEG/PNG up to 10 MB, and 1,920 px by 1,080 px a 16:9 ratio.
              </div>
            </div>

            <div v-if="payload.greeting_type === 'TEXT_IMAGE'"
              class="modal_placeholder">
              <label class="text-sm font-semibold">
                Text
  
                <span class="text-danger">*</span>
              </label>
  
              <textarea
                v-model="payload.greeting_text"

                placeholder="Write a text here . . ."
                class="form-textarea min-h-[100px]">
              </textarea>
  
              <div v-if="v$.greeting_text.$error"
                class="validator">
                {{ v$.greeting_text.$errors[0].$message }}
              </div>
            </div>
          </div>
        </div>

        <div class="h-px w-full border-b border-[#e0e6ed] dark:border-[#1b2e4b] my-4 px-4"></div>

        <div class="flex justify-between items-center space-x-16 px-4">
          <div>
            <Error :messages="errorMessage" margins="m-0 w-full" />
          </div>

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
    </nav>

    <!-- modal unit tags -->
    <TransitionRoot
      appear
      :show="modal_unit_tags"
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
                    @click="modal_unit_tags = false"

                    type="button"
                    class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-danger dark:hover:text-danger outline-none">
                    <icon-x />
                  </button>

                  <div
                    class="text-lg capitalize font-bold bg-[#F9FBFE] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                    Unit
                  </div>

                  <div class="h-px w-full border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>

                  <div class="p-5">
                    <div class="flex-1 grid grid-cols-1 gap-6">
                      <div class="relative modal_placeholder">
                        <input
                          v-model="params_unit.search"
                          @input="filterUnit"

                          type="text"
                          class="form-input ltr:pr-10 rtl:pl-10 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                          placeholder="Search . . ."/>

                        <button type="button" class="absolute w-9 h-9 inset-0 ltr:left-auto rtl:right-auto mx-1 my-0.5 appearance-none peer-focus:text-primary">
                          <icon-search class="mx-auto" />
                        </button>
                      </div>
                      
                      <div v-if="isLoadingOptionsUnitTags">
                        <Accordion :widths="80" />
                      </div>

                      <div v-else>
                        <div class="flex-1 grid grid-cols-1 gap-6">
                          <div v-for="(item, index) in rows_options_unit_tags" :key="index"
                            @click="toggleSelectionUnitTags(item.uuid)"
                            :class="[
                              'relative text-sm border border-dashed p-4 rounded-xl cursor-pointer',
                              selectedItemsUnitTags.has(item.uuid)
                                ? 'border-primary ring-primary text-primary dark:text-white-light'
                                : 'dark:border-[#1b2e4b] border-[#e0e6ed]'
                            ]">
                            <div class="flex justify-between">
                              {{ item.name }}

                              <IconChecks
                                v-if="selectedItemsUnitTags.has(item.uuid)"
                                class="w-4 h-4 text-primary dark:text-white" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div v-if="paginationRowsUnit?.total_data > 0"
                        class="flex items-center justify-end text-sm">
                        <p class="ltr:mr-3 rtl:ml-3">
                          <span v-if="paginationRowsUnit?.total_data > 0">
                            {{ paginationRowsUnit?.start }} - {{ paginationRowsUnit?.start + paginationRowsUnit?.total_display - 1 }}
                          </span>
  
                          <span v-else>
                            0
                          </span>
  
                          from {{ paginationRowsUnit?.total_data }}
                        </p>
  
                        <button
                          @click="params_unit.page --; getOptionsUnitTags();"
  
                          :disabled="params_unit.page < 2"
  
                          type="button"
                          class="bg-white-light rounded-md p-1 enabled:hover:bg-primary enabled:hover:text-white dark:bg-white-dark/20 enabled:dark:hover:bg-white-dark/30 ltr:mr-3 rtl:ml-3 disabled:opacity-60 disabled:cursor-not-allowed">
                          <IconCaretDown class="w-5 h-5 rtl:-rotate-90 rotate-90" />
                        </button>
  
                        <button
                          @click="params_unit.page ++; getOptionsUnitTags();"
  
                          :disabled="params_unit.page >= paginationRowsUnit.total_page"
  
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
                        @click="toApplyUnitTags"

                        :types="false"
                        texts="Apply" />

                      <button
                        @click="modal_unit_tags = false"

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
  import { useTable } from "@/modules/table";
  import { useCountry } from "@/composables/use-country";

  import Vue3Datatable from '@/components/datatable/custom-table.vue';
  import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay, TabGroup, TabList, Tab } from '@headlessui/vue';
  import Datetime from "@/components/basic/picker/Datetime.vue";

  import IconSearch from '@/components/icon/icon-search.vue';
  import IconDollarSignCircle from "@/components/icon/icon-dollar-sign-circle.vue";
  import IconX from '@/components/icon/icon-x.vue';
  import IconCaretDown from '@/components/icon/icon-caret-down.vue';
  import IconChecks from '@/components/icon/icon-checks.vue';

  import takeOrMedia from '@/components/upload/TakeOrMedia.vue';
  import Maska from "@/components/basic/input/Maska.vue";

  import BtnPrivate from "@/components/basic/button/BtnPrivate.vue";
  import Error from '@/components/basic/Error.vue';

  const router = useRouter();
  const store = useAppStore();
  const {
    currentCountry,
    currentCallingCode,
    currentFlag,
    countryCallingCodes
  } = useCountry();

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

  const modal_unit_tags = ref(false);
  
  const isLoadingOptionsUnitTags: any = ref(false);
  const rows_options_unit_tags: any = ref([]);

  const rows_options_themes: any = ref([
    {
      id: 'IMAGE',
      name: 'Image',
      icon: '/assets/figma/icon_image.svg'
    },
    {
      id: 'TEXT_IMAGE',
      name: 'Text & Image',
      icon: '/assets/figma/icon_image_text.svg'
    }
  ]);

  interface Payload {
    uuid?: string;
    name?: string;
    phone_number?: string;
    email?: string;
    arrival_at?: string;
    departure_at?: string;
    greeting_type?: string;
    greeting_text?: string;
    greeting_image_url?: string;
    units?: any;

    country?: string;
    flag: any;
    code: any;
    phone_number_view: any;

    status_view?: boolean;
  };

  const initialState = (): Payload => {
    return {
      uuid: undefined,
      name: '',
      phone_number: '',
      email: '',
      arrival_at: '',
      departure_at: '',
      greeting_type: 'IMAGE',
      greeting_text: '',
      greeting_image_url: '',
      units: [],

      // name: 'Fabdulrafi',
      // phone_number: '',
      // email: 'fabdulrafi@gmail.com',
      // arrival_at: '',
      // departure_at: '',
      // greeting_type: 'IMAGE',
      // greeting_text: '',
      // greeting_image_url: 'https://storage.googleapis.com/smartiv1/6C8UFB/image_6826a29facd43.webp',
      // units: [],
      // phone_number_view: '85702656660',

      country: '',
      flag: '',
      code: '',
      phone_number_view: '',

      status_view: false
    }
  };

  const payload = reactive<Payload>(initialState());

  const { v$, swalAlert, swalAlertUpdate, swalAlertConfirm, checkExistAct } = useValid(payload, ['uuid', 'phone_number']);
  const { loading, data, post, put, errorMessage, error } = useApiWithAuth('client/guest');

  const totalRowsUnit = ref(6);
  const paginationRowsUnit = ref({
    total_page: 0,
    total_data: 0,
    total_display: 0,
    current_page: 0,
    start: 0,
    end: 0,
    limit: 0
  });

  const params_unit: any = reactive({
    page: 1,
    limit: 5,
    search: '',
    sort: '',
    order_by: '',

    is_unit: true
  });

  const selectedItemsUnitTags = reactive(new Set<string>());
  const allItemsCacheUnitTags = reactive<Map<string, any>>(new Map());

  let timer_unit: any;

  const filterUnit = () => {
    clearTimeout(timer_unit);
    timer_unit = setTimeout(() => {
      getOptionsUnitTags();
    }, 300);
  };

  const getOptionsUnitTags = () => {
    isLoadingOptionsUnitTags.value = true;

    const { loading, data, error, get } = useApiWithAuth("client/tag");

    get(params_unit);

    watch([ loading ], () => {

      isLoadingOptionsUnitTags.value = loading.value;

      rows_options_unit_tags.value = Array.isArray(data.value?.data)
        ? data.value.data.map((item: any) => {
            allItemsCacheUnitTags.set(item.uuid, item);
            return {
              uuid: item.uuid,
              name: item.name,
            };
          })
        : [];
      totalRowsUnit.value = data.value?.pagination?.total_data;

      paginationRowsUnit.value = data.value?.pagination;

    });
  };

  watch(modal_unit_tags, (value) => {
    nextTick(() => {
      if (!value) {
        
      }

      else {
        getOptionsUnitTags();

        payload.units.forEach((item: any) => {
          selectedItemsUnitTags.add(item.uuid);
        });
      }
    });
  });

  const toggleSelectionUnitTags = (uuid: string) => {
    if (selectedItemsUnitTags.has(uuid)) {
      selectedItemsUnitTags.delete(uuid);
    } else {
      selectedItemsUnitTags.add(uuid);
    }
  };

  const toApplyUnitTags = () => {
    const selectedMedia = Array.from(selectedItemsUnitTags).map((uuid) => allItemsCacheUnitTags.get(uuid)).filter(Boolean);
    
    payload.units = selectedMedia;

    selectedItemsUnitTags.clear();

    modal_unit_tags.value = false;
  };
  
  watch(modal, (value) => {
    nextTick(() => {
      if (!value) {
        Object.assign(payload, initialState());

        v$.value.$reset();

        error.value = '';
      }

      else {
        let item_country = countryCallingCodes.find((i) => i.country === currentCountry.value);

        payload.country = item_country?.country || 'Singapore';
        payload.flag = item_country?.flag || 'https://cdn.ipwhois.io/flags/sg.svg';
        payload.code = item_country?.calling_code || '+65';
      }
    });
  });

  const submit = async () => {
    const isFormCorrect = await v$.value.$validate();

    if (!isFormCorrect) return;

    loading.value = true;

    payload.phone_number = `${payload.code}${payload.phone_number_view}`;

    post(payload).then(() => {
      // callback api
      swalAlert('Successfully saved data', 'success');
      
      getList();
    });
  };

  onMounted(() => {
    getList();
  });
</script>
