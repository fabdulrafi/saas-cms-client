<template>
  <div>
    <div class="flex items-center whitespace-nowrap">
      <router-link
        to="/main-menu/information/facility"

        class="rounded-full p-1 text-primary hover:text-danger ring-2 ring-primary/30 hover:ring-danger ltr:mr-3 rtl:ml-3">
        <IconArrowBackward class="w-5 h-5" />
      </router-link>

      <h5
        class="font-semibold capitalize text-lg dark:text-white-light">
        <div class="text-sm text-gray-400 font-semibold">
          Information / Facility / <span class="capitalize text-black dark:text-white-light">{{ router.currentRoute.value.meta.title }}</span>
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
            Detail Facility
          </div>

          <div class="text-sm text-gray-400 font-semibold">
            Add and customize a new facility according to your preferences
          </div>
        </div>

        <div>
          <label class="text-sm font-semibold">
            Title

            <span class="text-danger">*</span>
          </label>
  
          <input
            v-model="payload.title"

            type="text"
            placeholder="Ex: Promo Potrait TV Depan Lift"
            class="form-input" />

          <div v-if="v$.title.$error"
            class="validator">
            {{ v$.title.$errors[0].$message }}
          </div>
        </div>

        <div>
          <label class="text-sm font-semibold">
            Description
          </label>

          <textarea
            v-model="payload.description"

            placeholder="Write a description here . . ."
            class="form-textarea min-h-[100px]">
          </textarea>
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

            <div class="flex justify-between items-center">
              <div class="text-sm font-semibold">
                QR Code

                <span class="text-danger">*</span>
              </div>

              <div class="w-12 h-6 relative">
                <input
                  v-model="payload.qr"
                  
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

        <div v-if="payload.qr">
          <div>
            <label class="text-sm font-semibold">
              QR Code Url
  
              <span class="text-danger">*</span>
            </label>
    
            <input
              v-model="payload.qr_code_url"
  
              type="text"
              placeholder="Ex: Your link QR Code"
              class="form-input" />

            <div v-if="v$.qr_code_url.$error"
              class="validator">
              {{ v$.qr_code_url.$errors[0].$message }}
            </div>
          </div>
  
          <div class="text-sm text-gray-400 mt-4">
            Your link will be auto generate from system.
          </div>
        </div>
      </div>
    </div>
    
    <div class="panel p- my-6 shadow-none rounded-xl">
      <div class="flex-1 grid grid-cols-1 gap-6">
        <div>
          <div class="text-lg font-semibold dark:text-white-light">
            Media Information
          </div>

          <div class="text-sm text-gray-400 font-semibold">
            Media information of your facility
          </div>
        </div>

        <div>
          <label class="text-sm font-semibold">
            Contents

            <span class="text-danger">*</span>
          </label>

          <div class="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-6">
            <div v-for="(item, index) in payload.contents" :key="index"
              class="relative">
              <img
                @click="toImage(item.url, 'empty')"

                class="w-full h-[200px] object-contain rounded-xl border border-dashed border-[#e0e6ed] dark:border-[#1b2e4b] cursor-pointer"
                :src="item.url"
                alt="" />

              <button
                @click="payload.contents?.splice(index, 1)"

                type="button"
                class="btn btn-danger w-5 h-5 p-0 rounded-md absolute top-[-8px] right-[-8px]">
                <icon-trash-lines class="w-3.5 h-3.5" />
              </button>
            </div>
            
            <takeOrMedia
              v-model:contents="payload.contents"
              class="w-full h-[200px]" />
          </div>

          <div v-if="v$.contents.$error"
            class="validator">
            {{ v$.contents.$errors[0].$message }}
          </div>

          <div class="text-sm bg-[#2A48961F] p-2 px-4 rounded-xl text-primary dark:text-gray-400 mt-6 flex items-center">
            <img
              class="w-4 h-4 inline-block mr-2"
              src="/assets/figma/icon_information.svg"
              alt="" />

            Your contents must be a JPEG up to 5 MB or Video up to 250 MB, and 1,920 px by 1,080 px a 16:9 ratio.
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-between w-full">
      <div class="w-full">
        <Error :messages="errorMessage" margins="m-0 w-[50%]" />
      </div>

      <div class="flex justify-end">
        <BtnPrivate
          @click="submit"

          :loadings="loading" />

        <router-link
          to="/main-menu/information/facility"
          type="button"
          class="btn btn-outline-danger text-sm !font-semibold w-[80px] ltr:ml-4 rtl:mr-4 rounded-xl">
          Close
        </router-link>
      </div>
    </div>

    <!-- preview image -->
    <vue-easy-lightbox
      :visible="modal_img"
      :imgs="imgVal ? imgVal : `/assets/images/${imgEmptyVal}.png`"

      @hide="modal_img = false">
    </vue-easy-lightbox>
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

  import VueEasyLightbox from 'vue-easy-lightbox';

  import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
  import IconArrowBackward from "@/components/icon/icon-arrow-backward.vue";

  import takeOrMedia from '@/components/upload/TakeOrMedia.vue';

  import BtnPrivate from "@/components/basic/button/BtnPrivate.vue";
  import Error from '@/components/basic/Error.vue';

  const router = useRouter();
  const store = useAppStore();

  useMeta({ title: router.currentRoute.value.meta.title });

  interface Payload {
    uuid?: string;
    type?: string;
    title?: string;
    description?: string;
    status?: string;
    qr?: boolean;
    qr_code_url?: string;
    contents?: any[];

    status_view?: boolean;
  };

  const initialState = (): Payload => {
    return {
      uuid: undefined,
      type: 'FACILITY',
      title: '',
      description: '',
      status: 'ACTIVE',
      qr: false,
      qr_code_url: '',
      contents: [],

      status_view: true,
    }
  };

  const payload = reactive<Payload>(initialState());

  const { v$, swalAlert, swalAlertUpdate, swalAlertConfirm } = useValid(payload, ['uuid', 'description']);
  const { loading, data, put, errorMessage, error } = useApiWithAuth('client/information');

  const modal_img = ref(false);

  const imgVal = ref('');
  const imgEmptyVal = ref('');

  const toImage = (item: any, img: string) => {
    imgVal.value = item;
    imgEmptyVal.value = img;

    modal_img.value = true;
  };

  watch(() => payload.qr, (val) => {
    if (!val) payload.qr_code_url = '';
  });

  const submit = async () => {
    const isFormCorrect = await v$.value.$validate();

    if (!isFormCorrect) return;

    loading.value = true;

    payload.status = payload.status_view ? 'ACTIVE' : 'INACTIVE';

    put(payload).then(() => {
      // callback api
      swalAlert('Successfully saved data', 'success');

      router.push('/main-menu/information/facility');
    });
  };

  const getDetail = async () => {
    const { loading, data, error, get } = useApiWithAuth(`client/information/${router.currentRoute.value.params.uuid}`);

    get();

    watch([ loading ], () => {
      
      let item = data.value?.data

      payload.uuid = item.uuid;
      payload.title = item.title;
      payload.description = item.description;
      payload.status_view = item.status === 'ACTIVE';
      payload.qr = item.qr_code_url ? true : false;
      payload.qr_code_url = item.qr_code_url;
      payload.contents = item.contents;
    });

  };
  
  onMounted(() => {
    getDetail();
  });
</script>
