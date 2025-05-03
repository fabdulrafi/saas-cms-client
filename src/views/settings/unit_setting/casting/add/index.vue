<template>
  <div>
    <div class="flex items-center whitespace-nowrap">
      <router-link
        to="/settings/unit-setting/casting"

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
    
    <div class="panel p-0 mt-[24px] shadow-sm sm:h-[calc(100vh-227px)] sm:overflow-auto relative">
      <div class="p-5">
        <div class="flex-1 grid grid-cols-1 sm:grid-cols-5 gap-6 xs:gap-2">
          <div class="text-sm font-semibold">
            Title

            <span class="text-danger">*</span>
          </div>
  
          <div class="col-span-4 xs:mb-4">
            <input
              v-model="payload.title"

              type="text"
              placeholder="Ex: Casting"
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
              placeholder="Ex: This casting cant be remove for default"
              class="form-input" />

            <div v-if="v$.information.$error"
              class="validator">
              {{ v$.information.$errors[0].$message }}
            </div>
          </div>

          <div class="text-sm font-semibold">
            Unit Tag

            <span class="text-danger">*</span>
          </div>
  
          <div class="col-span-4 xs:mb-4">
            <MultiSelect
              v-model="payload.unit_tag"

              :options="[
                { id: '#tag_1', name: 'Tag 1' },
                { id: '#tag_2', name: 'Tag 2' },
                { id: '#tag_3', name: 'Tag 3' },
                { id: '#tag_4', name: 'Tag 4' },
                { id: '#tag_5', name: 'Tag 5' },
              ]"

              placeholders="Ex: #tag_1"
              opens="bottom" />

            <div v-if="v$.unit_tag.$error"
              class="validator">
              {{ v$.unit_tag.$errors[0].$message }}
            </div>
          </div>

          <div class="text-sm font-semibold">
            Custom Tag

            <span class="text-danger">*</span>
          </div>
  
          <div class="col-span-4 xs:mb-4">
            <MultiSelect
              v-model="payload.custom_tag"

              :options="[
                { id: '#tag_1', name: 'Tag 1' },
                { id: '#tag_2', name: 'Tag 2' },
                { id: '#tag_3', name: 'Tag 3' },
                { id: '#tag_4', name: 'Tag 4' },
                { id: '#tag_5', name: 'Tag 5' },
              ]"

              placeholders="Ex: #tag_1"
              opens="bottom" />

            <div v-if="v$.custom_tag.$error"
              class="validator">
              {{ v$.custom_tag.$errors[0].$message }}
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
            Wifi Type / Security

            <span class="text-danger">*</span>
          </div>

          <div class="col-span-4 xs:mb-4">
            <SingleSelect
              v-model="payload.type"

              :options="rows_options_types"
              placeholder="Ex: WPA"
              opens="bottom" />

            <div v-if="v$.type.$error"
              class="validator">
              {{ v$.type.$errors[0].$message }}
            </div>
          </div>

          <div class="text-sm font-semibold">
            SSID / Network

            <span class="text-danger">*</span>
          </div>
  
          <div class="col-span-4 xs:mb-4">
            <input
              v-model="payload.ssid"

              type="text"
              placeholder="Ex: GMEDIA"
              class="form-input" />

            <div v-if="v$.ssid.$error"
              class="validator">
              {{ v$.ssid.$errors[0].$message }}
            </div>
          </div>

          <div class="text-sm font-semibold">
            Password Casting

            <span class="text-danger">*</span>
          </div>
  
          <div class="col-span-4 xs:mb-4">
            <div class="flex">
              <input
                v-model="payload.password"

                type="text"
                placeholder="Ex: ********"
                class="form-input ltr:rounded-r-none rtl:rounded-l-none flex-1 ltr:rounded-l-md rtl:rounded-r-md" />

              <div
                @click="payload.password = generate"

                class="bg-[#eee] flex justify-center items-center rounded-none px-3 font-semibold border border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b] cursor-pointer">
                <IconPencilPaper />
              </div>

              <div
                @click="copy(payload.password)"

                class="bg-[#eee] flex justify-center items-center ltr:rounded-r-xl rtl:rounded-l-xl px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b] cursor-pointer">
                <IconCopy />
              </div>
            </div>

            <div v-if="v$.password.$error"
              class="validator">
              {{ v$.password.$errors[0].$message }}
            </div>
          </div>
        </div>
      </div>
      
      <div class="sm:absolute sm:bottom-0 w-full p-5 xs:pt-0">
        <div class="flex-1 grid grid-cols-1 sm:grid-cols-5 gap-6 sm:mt-6">
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
    </div>
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

  import { usePassword } from '@/modules/password';
  import IconPencilPaper from '@/components/icon/icon-pencil-paper.vue';
  import IconCopy from '@/components/icon/icon-copy.vue';
  import useClipboard from 'vue-clipboard3';

  const router = useRouter();
  const store = useAppStore();

  useMeta({ title: router.currentRoute.value.meta.title });

  const rows_options_types: any = ref([
    {
      id: 'WPA',
      name: 'WPA'
    },
    {
      id: 'WPA2',
      name: 'WPA2'
    },
    {
      id: 'WPA3',
      name: 'WPA3'
    },
    {
      id: 'WEP',
      name: 'WEP'
    },
  ]);

  interface Payload {
    id?: string;
    title?: string;
    information?: string;
    unit_tag?: any[];
    custom_tag?: any[];
    status?: boolean;
    type?: string;
    ssid?: string;
    password?: string;
  };

  const initialState = (): Payload => {
    return {
      id: undefined,
      title: '',
      information: '',
      unit_tag: [],
      custom_tag: [],
      status: true,
      type: '',
      ssid: '',
      password: ''
    }
  };

  const payload = reactive<Payload>(initialState());

  const { v$, swalAlert, swalAlertUpdate, swalAlertConfirm } = useValid(payload, ['id']);
  const { loading, data, post, errorMessage, error } = useApiWithAuth('profile/update');

  const { generate } = usePassword();

  onMounted(() => {
    payload.password = generate.value;
  });

  const { toClipboard } = useClipboard();
  const copy = async (msg) => {
    if (msg) {
      await toClipboard(msg);
      swalAlert('Berhasil mengkopi data');
    }
  };

  const submit = async () => {
    const isFormCorrect = await v$.value.$validate();

    if (!isFormCorrect) return;

    loading.value = true;
  };
</script>
