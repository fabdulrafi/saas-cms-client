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
        {{ router.currentRoute.value.meta.title }}
      </h5>

      <div
        class="flex items-center space-x-3 ltr:ml-auto rtl:mr-auto">
        
      </div>
    </div>
    
    <div class="panel p-0 mt-[24px] shadow-none rounded-xl sm:overflow-auto relative">
      <div class="p-5 sm:h-[calc(100vh-333px)]">
        <div class="flex-1 grid grid-cols-1 sm:grid-cols-5 gap-6 xs:gap-2">
          <div class="text-sm font-semibold">
            Title

            <span class="text-danger">*</span>
          </div>
  
          <div class="col-span-4 xs:mb-4">
            <input
              v-model="payload.title"

              type="text"
              placeholder="Ex: Luxury Room"
              class="form-input" />

            <div v-if="v$.title.$error"
              class="validator">
              {{ v$.title.$errors[0].$message }}
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
            Category

            <span class="text-danger">*</span>
          </div>

          <div class="col-span-4 xs:mb-4">
            <div class="flex items-center gap-6 xs:gap-4">
              <div class="w-full">
                <SingleSelect
                  v-model="payload.category"
                  :options="[
                    { id: 'VVIP', name: 'VVIP' },
                    { id: 'VIP', name: 'VIP' },
                    { id: 'Regular', name: 'Regular' }
                  ]"
                  placeholder="Ex: VVIP"
                  opens="bottom" />
    
                <div v-if="v$.category.$error"
                  class="validator">
                  {{ v$.category.$errors[0].$message }}
                </div>
              </div>

              <div>
                <button
                  type="button"
                  v-tippy="{ content: 'Add Category', theme: 'dark' }"
                  class="btn btn-dark w-[38px] h-[38px] p-0 rounded-xl">
                  <IconPlus class="w-5 h-5" />
                </button>
              </div>
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
          
          <div>
            <div class="text-sm font-semibold mb-2 xs:mb-1">
              Contents

              <span class="text-danger">*</span>
            </div>
  
            <div class="text-sm text-black/50 dark:text-white/50">
              Your contents must be a JPEG up to 5 MB or Video up to 250 MB, and 1,920 px by 1,080 px a 16:9 ratio.
            </div>
          </div>

          <div class="col-span-4 xs:mb-4">
            <div class="p-4 font-semibold rounded-xl border border-[#e0e6ed] dark:border-[#17263c]">
              <div class="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6 xs:gap-4">
                <div v-for="(item, index) in payload.attachment_json_array" :key="index"
                  class="relative">
                  <img
                    @click="toImage(item, 'empty')"

                    class="w-full h-[200px] object-contain rounded-xl border border-dashed border-[#e0e6ed] dark:border-[#1b2e4b] cursor-pointer"
                    :src="item"
                    alt="" />

                  <button
                    @click="payload.attachment_json_array?.splice(index, 1)"

                    type="button"
                    class="btn btn-danger w-5 h-5 p-0 rounded-md absolute top-[-8px] right-[-8px]">
                    <icon-trash-lines class="w-3.5 h-3.5" />
                  </button>
                </div>

                <uploadImage
                  @input="changeImageArray"
                  class="w-full h-[200px]" />
              </div>
            </div>
          </div>

          <div class="text-sm font-semibold">
            QR Code

            <span class="text-danger">*</span>
          </div>

          <div class="col-span-4">
            <div class="flex-1 grid grid-cols-1 sm:grid-cols-8 gap-6 :xs:gap-2">
              <div class="flex items-center">
                <label class="w-12 h-6 relative mb-0">
                  <input
                    v-model="payload.qr"
                    
                    type="checkbox"
                    class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                    id="custom_switch_checkbox7" />

                  <span
                    for="custom_switch_checkbox7"
                    class="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300">
                  </span>
                </label>

                <div
                  @click="payload.qr = !payload.qr"

                  class="text-sm cursor-pointer ml-3">
                  {{ payload.qr ? 'Yes' : 'No' }}
                </div>
              </div>

              <div v-if="payload.qr"
                class="col-span-7">
                <div class="flex-1 grid grid-cols-1 sm:grid-cols-8 gap-6 xs:gap-2">
                  <div class="text-sm font-semibold flex justify-end xs:justify-start">
                    QR Url
    
                    <span class="text-danger">*</span>
                  </div>
    
                  <div class="col-span-7">
                    <input
                      v-model="payload.qr_value"

                      type="text"
                      placeholder="Ex: SMTV001"
                      class="form-input" />

                    <div v-if="v$.qr_value.$error"
                      class="validator">
                      {{ v$.qr_value.$errors[0].$message }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
      <div class="w-full p-5 xs:pt-0">
        <div class="flex-1 grid grid-cols-1 sm:grid-cols-5 gap-6 sm:mt-6">
          <div class="col-span-5 grid grid-cols-subgrid">
            <div class="col-start-2 col-span-3">
              <Error :messages="errorMessage" margins="m-0 w-[50%]" />
            </div>

            <div class="flex justify-end">
              <BtnPrivate
                @click="submit" />
            </div>
          </div>
        </div>
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
  import SingleSelect from '@/components/basic/select/Single.vue';
  import MultiSelect from '@/components/basic/select/Multi.vue';
  import Date from "@/components/basic/picker/Date.vue";

  import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
  import IconArrowBackward from "@/components/icon/icon-arrow-backward.vue";
  import IconPlus from '@/components/icon/icon-plus.vue';

  import uploadImage from '@/components/upload/Image.vue';

  import BtnPrivate from "@/components/basic/button/BtnPrivate.vue";
  import Error from '@/components/basic/Error.vue';

  const router = useRouter();
  const store = useAppStore();

  useMeta({ title: router.currentRoute.value.meta.title });

  const rows_options_types: any = ref([
    {
      id: 'slider',
      name: 'Slider'
    },
    {
      id: 'webview',
      name: 'Webview'
    },
    {
      id: 'tv',
      name: 'TV'
    }
  ]);

  interface Payload {
    id?: string;
    title?: string;
    description?: string;
    category?: string;
    status?: boolean;
    attachment_json_array?: any[];
    qr?: boolean;
    qr_value?: string;
  };

  const initialState = (): Payload => {
    return {
      id: undefined,
      title: '',
      description: '',
      category: '',
      status: true,
      attachment_json_array: [],
      qr: false,
      qr_value: ''
    }
  };

  const payload = reactive<Payload>(initialState());

  const { v$, swalAlert, swalAlertUpdate, swalAlertConfirm } = useValid(payload, ['id']);
  const { loading, data, post, errorMessage, error } = useApiWithAuth('profile/update');

  const changeImageArray = (e) => {
    if (e?.fileuri)  payload.attachment_json_array?.push(e.fileuri);
  };

  const modal_img = ref(false);

  const imgVal = ref('');
  const imgEmptyVal = ref('');

  const toImage = (item: any, img: string) => {
    imgVal.value = item;
    imgEmptyVal.value = img;

    modal_img.value = true;
  };

  const submit = async () => {
    const isFormCorrect = await v$.value.$validate();

    if (!isFormCorrect) return;

    loading.value = true;
  };
</script>
