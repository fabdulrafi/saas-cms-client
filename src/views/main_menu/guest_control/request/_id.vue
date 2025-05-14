<template>
  <div>
    <div class="flex items-center whitespace-nowrap">
      <router-link
        to="/main-menu/guest-control"

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
    
    <div class="panel p- mt-[24px] shadow-none rounded-xl overflow-hidden">
      <div class="">
        <div class="flex-1 grid grid-cols-1 sm:grid-cols-5 gap-6 xs:gap-2">
          <div class="text-sm font-semibold">
            Resident Name

            <span class="text-danger">*</span>
          </div>
  
          <div class="col-span-4 xs:col-span-5 xs:mb-4">
            <input
              v-model="payload.resident_name"

              type="text"
              placeholder="Ex: John Smith"
              class="form-input" />

            <div v-if="v$.resident_name.$error"
              class="validator">
              {{ v$.resident_name.$errors[0].$message }}
            </div>
          </div>

          <div class="text-sm font-semibold">
            Phone Number

            <span class="text-danger">*</span>
          </div>
  
          <div class="col-span-4 xs:col-span-5 xs:mb-4">
            <Maska 
              v-model="payload.phone_number"

              :types="true"
              masks="####-####-####"
              placeholders="Ex: 1999-####-####" />

            <div v-if="v$.phone_number.$error"
              class="validator">
              {{ v$.phone_number.$errors[0].$message }}
            </div>
          </div>

          <div class="text-sm font-semibold">
            Resident Email

            <span class="text-danger">*</span>
          </div>
  
          <div class="col-span-4 xs:col-span-5 xs:mb-4">
            <input
              v-model="payload.resident_email"

              type="email"
              placeholder="Ex: john@mail.com"
              class="form-input" />

            <div v-if="v$.resident_email.$error"
              class="validator">
              {{ v$.resident_email.$errors[0].$message }}
            </div>
          </div>

          <div class="text-sm font-semibold">
            Arrival Date

            <span class="text-danger">*</span>
          </div>
          
          <div class="col-span-4 xs:col-span-5 xs:mb-4">
            <Date
              v-model="payload.arrival_date" />

            <div v-if="v$.arrival_date.$error"
              class="validator">
              {{ v$.arrival_date.$errors[0].$message }}
            </div>
          </div>

          <div class="text-sm font-semibold">
            Departure Date

            <span class="text-danger">*</span>
          </div>

          <div class="col-span-4 xs:col-span-5 xs:mb-4">
            <div class="flex-1 grid grid-cols-1 gap-6">
              <div>
                <Date
                  v-model="payload.arrival_date" />
    
                <div v-if="v$.arrival_date.$error"
                  class="validator">
                  {{ v$.arrival_date.$errors[0].$message }}
                </div>
              </div>

              <div class="flex items-center">
                <label class="w-12 h-6 relative mb-0">
                  <input
                    v-model="payload.apply"
                    
                    type="checkbox"
                    class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                    id="custom_switch_checkbox7" />

                  <span
                    for="custom_switch_checkbox7"
                    class="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300">
                  </span>
                </label>

                <div
                  @click="payload.apply = !payload.apply"

                  class="text-sm cursor-pointer ml-3">
                  {{ payload.apply ? 'Apply for other unit' : 'Not apply' }}
                </div>
              </div>

              <div>
                <MultiSelect
                  v-model="payload.unit"

                  :options="[
                    { id: '#tag_1', name: 'Tag 1' },
                    { id: '#tag_2', name: 'Tag 2' },
                    { id: '#tag_3', name: 'Tag 3' },
                    { id: '#tag_4', name: 'Tag 4' },
                    { id: '#tag_5', name: 'Tag 5' },
                  ]"

                  placeholders="Ex: #tag_1"
                  opens="bottom" />

                <div v-if="v$.unit.$error"
                  class="validator">
                  {{ v$.unit.$errors[0].$message }}
                </div>
              </div>
            </div>
          </div>

          <div class="text-sm font-semibold">
            Themes Greeting

            <span class="text-danger">*</span>
          </div>
  
          <div class="col-span-4 xs:col-span-5 xs:mb-4">
            <div class="flex-1 grid grid-cols-1 sm:grid-cols-5 xs:grid-cols-2 gap-6 xs:gap-4">
              <div v-for="option in rows_options_themes" :key="option.id">
                <div 
                  @click="payload.type = option.id"
  
                  :class="{ '!border-primary' : payload.type === option.id }"
                  class="relative p-4 border border-[#e0e6ed] dark:border-[#1b2e4b] rounded-xl cursor-pointer">
                  <div class="text-center">
                    <div class="flex items-center justify-center space-x-4">
                      <div v-if="option.id === 'text_image'">
                        <div :class="{ '!border-primary' : payload.type === option.id }" 
                          class="w-[40px] border-t-2 border-[#0d1726] dark:border-[#888ea8] my-1.5"></div>
                        <div :class="{ '!border-primary' : payload.type === option.id }" 
                          class="w-[25px] border-t-2 border-[#0d1726] dark:border-[#888ea8] my-1.5"></div>
                        <div :class="{ '!border-primary' : payload.type === option.id }" 
                          class="w-[40px] border-t-2 border-[#0d1726] dark:border-[#888ea8] my-1.5"></div>
                        <div :class="{ '!border-primary' : payload.type === option.id }" 
                          class="w-[25px] border-t-2 border-[#0d1726] dark:border-[#888ea8] my-1.5"></div>
                      </div>
  
                      <IconGallery :class="{ '!text-primary' : payload.type === option.id }" class="w-[38px] h-[38px]" />
                    </div>
  
                    <div 
                      :class="{ '!text-primary' : payload.type === option.id }"
                      class="text-sm font-semibold mt-2">
                      {{ option.name }}
                    </div>
                  </div>
  
                  <div v-if="payload.type === option.id"
                    class="absolute top-1 right-1">
                    <img src="/assets/images/check.svg" alt="" class="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            <div v-if="v$.type.$error"
              class="validator">
              {{ v$.type.$errors[0].$message }}
            </div>
          </div>
  
          <div class="col-span-5">
            <div v-if="payload.type === 'image'" 
              class="flex-1 grid grid-cols-1 sm:grid-cols-5 gap-6 xs:gap-2">
              <div>
                <div class="text-sm font-semibold mb-2 xs:mb-1">
                  Main Image

                  <span class="text-danger">*</span>
                </div>
      
                <div class="text-sm text-black/50 dark:text-white/50">
                  Your Background must be a JPEG, up to 5 MB, and 1,920 px by 1,080 px a 16:9 ratio.
                </div>
              </div>
      
              <div class="col-span-4">
                <div>
                  <div v-if="payload.image_url"
                    class="relative">
                    <img
                      @click="toImage(payload.image_url, 'empty')"

                      class="h-[505px] w-full object-contain rounded-md border border-dashed border-[#e0e6ed] dark:border-[#1b2e4b] cursor-pointer"
                      :src="payload.image_url"
                      alt="" />
      
                    <button
                      @click="payload.image_url = ''"
      
                      type="button"
                      class="btn btn-danger w-5 h-5 p-0 rounded-md absolute top-[-8px] right-[-8px]">
                      <icon-trash-lines class="w-3.5 h-3.5" />
                    </button>
                  </div>
      
                  <uploadImage v-else
                    @input="changeImage"
                    class="h-[505px]" />
                </div>

                <div v-if="v$.image_url.$error"
                  class="validator">
                  {{ v$.image_url.$errors[0].$message }}
                </div>
              </div>
            </div>
            
            <div v-if="payload.type === 'text_image'" 
              class="flex-1 grid grid-cols-1 sm:grid-cols-5 gap-6">
              <div>
                <div class="text-sm font-semibold mb-2 xs:mb-1">
                  Background

                  <span class="text-danger">*</span>
                </div>
      
                <div class="text-sm text-black/50 dark:text-white/50">
                  Your Background must be a JPEG, up to 5 MB, and 1,920 px by 1,080 px a 16:9 ratio.
                </div>
              </div>
  
              <div class="col-span-4">
                <div>
                  <div v-if="payload.image_url"
                    class="relative">
                    <img
                      @click="toImage(payload.image_url, 'empty')"

                      class="h-[505px] w-full object-contain rounded-md border border-dashed border-[#e0e6ed] dark:border-[#1b2e4b] cursor-pointer"
                      :src="payload.image_url"
                      alt="" />
      
                    <button
                      @click="payload.image_url = ''"
      
                      type="button"
                      class="btn btn-danger w-5 h-5 p-0 rounded-md absolute top-[-8px] right-[-8px]">
                      <icon-trash-lines class="w-3.5 h-3.5" />
                    </button>
                  </div>
      
                  <uploadImage v-else
                    @input="changeImage"
                    class="h-[505px]" />
                </div>

                <div v-if="v$.image_url.$error"
                  class="validator">
                  {{ v$.image_url.$errors[0].$message }}
                </div>
              </div>
  
              <div>
                <div class="text-sm font-semibold">
                  Description

                  <span class="text-danger">*</span>
                </div>
              </div>
              
              <div class="col-span-4">
                <div class="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-6">
                  <div class="col-span-3">
                    <quillEditor 
                      ref="editor" 
                      v-model:value="payload.content" 
                      :options="options"
                      style="max-height: 439px;">
                    </quillEditor>

                    <div v-if="v$.content.$error"
                      class="validator">
                      {{ v$.content.$errors[0].$message }}
                    </div>
                  </div>
  
                  <div>
                    <div>
                      <div v-if="payload.photo_image_url"
                        class="relative">
                        <img
                          @click="toImage(payload.photo_image_url, 'empty')"

                          class="h-[505px] w-full object-contain rounded-md border border-dashed border-[#e0e6ed] dark:border-[#1b2e4b] cursor-pointer"
                          :src="payload.photo_image_url"
                          alt="" />
          
                        <button
                          @click="payload.photo_image_url = ''"
          
                          type="button"
                          class="btn btn-danger w-5 h-5 p-0 rounded-md absolute top-[-8px] right-[-8px]">
                          <icon-trash-lines class="w-3.5 h-3.5" />
                        </button>
                      </div>
          
                      <uploadImage v-else
                        @input="changeImagePhoto"
                        class="h-[505px]" />
                    </div>

                    <div v-if="v$.photo_image_url.$error"
                      class="validator">
                      {{ v$.photo_image_url.$errors[0].$message }}
                    </div>
                  </div>
                </div>
              </div>
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
              @click="submit" />
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
  import Date from "@/components/basic/picker/Date.vue";
  import MultiSelect from '@/components/basic/select/Multi.vue';

  import IconGallery from '@/components/icon/icon-gallery.vue';
  import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
  import IconArrowBackward from "@/components/icon/icon-arrow-backward.vue";

  import uploadImage from '@/components/upload/Image.vue';
  import Maska from "@/components/basic/input/Maska.vue";

  import { quillEditor } from 'vue3-quill';
  import 'vue3-quill/lib/vue3-quill.css';

  import BtnPrivate from "@/components/basic/button/BtnPrivate.vue";
  import Error from '@/components/basic/Error.vue';

  const router = useRouter();
  const store = useAppStore();

  useMeta({ title: router.currentRoute.value.meta.title });
  
  const rows_options_themes: any = ref([
    {
      id: 'image',
      name: 'Image Only'
    },
    {
      id: 'text_image',
      name: 'Text & Image'
    }
  ]);

  const options = ref({
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ header: 1 }, { header: 2 }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ direction: 'rtl' }],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ['clean'],
        ['link', 'image', 'video']
      ],
    },
    placeholder: 'Write a description here . . .',
  });

  interface Payload {
    id?: string;
    resident_name?: string;
    phone_number?: string;
    resident_email?: string;
    arrival_date?: string;
    departure_date?: string;
    apply?: boolean;
    unit?: any;
    type?: string;
    image_url?: string;
    content?: string;
    photo_image_url?: string;
  };

  const initialState = (): Payload => {
    return {
      id: undefined,
      resident_name: '',
      phone_number: '',
      resident_email: '',
      arrival_date: '',
      departure_date: '',
      apply: true,
      unit: [],
      type: 'image',
      image_url: '',
      content: undefined,
      photo_image_url: undefined
    }
  };

  const payload = reactive<Payload>(initialState());

  const { v$, swalAlert, swalAlertUpdate, swalAlertConfirm } = useValid(payload, ['id']);
  const { loading, data, post, errorMessage, error } = useApiWithAuth('profile/update');

  const changeImage = (e) => {
    if (e?.fileuri) payload.image_url = e.fileuri;
  };

  const changeImagePhoto = (e) => {
    if (e?.fileuri) payload.photo_image_url = e.fileuri;
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
