<template>
  <div>
    <div class="flex items-center whitespace-nowrap">
      <router-link
        to="/settings/unit-setting/theme"

        class="rounded-full p-1 text-primary hover:text-danger ring-2 ring-primary/30 hover:ring-danger ltr:mr-3 rtl:ml-3">
        <IconArrowBackward class="w-5 h-5" />
      </router-link>

      <h5
        class="font-semibold capitalize text-lg dark:text-white-light">
        {{ router.currentRoute.value.name }}
      </h5>

      <div
        class="flex items-center space-x-3 ltr:ml-auto rtl:mr-auto">
        
      </div>
    </div>
    
    <div class="panel p- mt-[24px] shadow-none rounded-xl">
      <div class="">
        <div class="flex-1 grid grid-cols-1 sm:grid-cols-5 gap-6 xs:gap-2">
          <div class="text-sm font-semibold">
            Title

            <span class="text-danger">*</span>
          </div>
  
          <div class="col-span-4 xs:mb-4">
            <input
              v-model="payload.title"

              type="text"
              placeholder="Ex: Base Wallpaper"
              class="form-input" />

            <div v-if="v$.title.$error"
              class="validator">
              {{ v$.title.$errors[0].$message }}
            </div>
          </div>

          <div class="text-sm font-semibold">
            Information

            <span class="text-danger">*</span>
          </div>
  
          <div class="col-span-4 xs:mb-4">
            <input
              v-model="payload.information"

              type="text"
              placeholder="Ex: This wallpaper is the base wallpaper"
              class="form-input" />

            <div v-if="v$.information.$error"
              class="validator">
              {{ v$.information.$errors[0].$message }}
            </div>
          </div>

          <div class="text-sm font-semibold">
            Distribution Tag

            <span class="text-danger">*</span>
          </div>
  
          <div class="col-span-4 xs:mb-4">
            <MultiSelect
              v-model="payload.distribution_tag"

              :options="[
                { id: '#tag_1', name: 'Tag 1' },
                { id: '#tag_2', name: 'Tag 2' },
                { id: '#tag_3', name: 'Tag 3' },
                { id: '#tag_4', name: 'Tag 4' },
                { id: '#tag_5', name: 'Tag 5' },
              ]"

              placeholders="Ex: #tag_1"
              opens="bottom" />

            <div v-if="v$.distribution_tag.$error"
              class="validator">
              {{ v$.distribution_tag.$errors[0].$message }}
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
                  class="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-success before:transition-all before:duration-300">
                </span>
              </label>

              <div
                @click="payload.status = !payload.status"

                class="text-sm cursor-pointer ml-3">
                {{ payload.status ? 'Active' : 'Not Active' }}
              </div>
            </div>
          </div>

          <div class="text-sm font-semibold">
            Theme

            <span class="text-danger">*</span>
          </div>

          <div class="col-span-4 xs:mb-4">
            <SingleSelect
              v-model="payload.theme"

              :options="[
                { id: 'default', name: 'Default' },
                { id: 'ice_blue', name: 'Ice Blue' },
              ]"
              placeholder="Ex: Default"
              opens="bottom" />

            <div v-if="v$.theme.$error"
              class="validator">
              {{ v$.theme.$errors[0].$message }}
            </div>
          </div>

          <div>
            <div class="text-sm font-semibold mb-2 xs:mb-1">
              Theme Preview

              <span class="text-danger">*</span>
            </div>
  
            <div class="text-sm text-black/50 dark:text-white/50">
              Your contents must be a JPEG up to 5 MB, and 1,920 px by 1,080 px a 16:9 ratio.
            </div>
          </div>

          <div class="col-span-4">
            <div class="p-4 font-semibold rounded-xl border border-[#e0e6ed] dark:border-[#17263c] min-h-[500px] xs:min-h-[200px]">
              
            </div>
          </div>
        </div>
      </div>
      
      <div class="flex-1 grid grid-cols-1 sm:grid-cols-5 gap-6 mt-6">
        <div class="col-span-5 grid grid-cols-subgrid">
          <div class="col-start-2 col-span-3">
            <Error :messages="errorMessage" margins="m-0 w-[50%]" />
          </div>

          <div class="flex justify-end">
            <BtnPrivate
              @click="submit"

              colors="bg-success"
              shadows="shadow-primary/50" />
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
    information?: string;
    distribution_tag?: any[];
    status?: boolean;
    theme?: string;
    attachment_json_array?: any[];
  };

  const initialState = (): Payload => {
    return {
      id: undefined,
      title: '',
      information: '',
      distribution_tag: [],
      status: true,
      theme: '',
      attachment_json_array: [],
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
