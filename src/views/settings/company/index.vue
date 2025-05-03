<template>
  <div>
    <div class="flex items-center whitespace-nowrap">
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
            Company Name

            <span class="text-danger">*</span>
          </div>
  
          <div class="col-span-4 xs:col-span-5 xs:mb-4">
            <input
              v-model="payload.company_name"

              type="text"
              placeholder="Ex: Smartiv.corp"
              class="form-input" />

            <div v-if="v$.company_name.$error"
              class="validator">
              {{ v$.company_name.$errors[0].$message }}
            </div>
          </div>

          <div class="text-sm font-semibold">
            Address

            <span class="text-danger">*</span>
          </div>
  
          <div class="col-span-4 xs:col-span-5 xs:mb-4">
            <textarea
              v-model="payload.address"

              placeholder="Write address here . . ."
              class="form-textarea min-h-[100px]">
            </textarea>

            <div v-if="v$.address.$error"
              class="validator">
              {{ v$.address.$errors[0].$message }}
            </div>
          </div>

          <div class="text-sm font-semibold">
            Email

            <span class="text-danger">*</span>
          </div>
  
          <div class="col-span-4 xs:col-span-5 xs:mb-4">
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

          <div class="text-sm font-semibold">
            Phone

            <span class="text-danger">*</span>
          </div>
  
          <div class="col-span-4 xs:col-span-5 xs:mb-4">
            <Maska 
              v-model="payload.phone"

              :types="true"
              masks="####-####-####"
              placeholders="Ex: 1999-####-####" />

            <div v-if="v$.phone.$error"
              class="validator">
              {{ v$.phone.$errors[0].$message }}
            </div>
          </div>

          <div class="text-sm font-semibold">
            Password Screen

            <span class="text-danger">*</span>
          </div>
  
          <div class="col-span-4 xs:col-span-5 xs:mb-4">
            <div class="relative text-white-dark">
              <input
                v-model="payload.password_screen"

                :type="!show ? 'password' : 'text'"
                placeholder="Ex: ********"
                class="form-input" />

              <span
                @click="show = !show"

                class="absolute end-4 top-1/2 -translate-y-1/2 cursor-pointer">
                <icon-eye :class="{ 'text-primary': show }" />
              </span>
            </div>

            <div v-if="v$.password_screen.$error"
              class="validator">
              {{ v$.password_screen.$errors[0].$message }}
            </div>
          </div>

          <div class="text-sm font-semibold">
            Country

            <span class="text-danger">*</span>
          </div>
  
          <div class="col-span-4 xs:col-span-5 xs:mb-4">
            <input
              v-model="payload.country"

              type="text"
              placeholder="Ex: United State"
              class="form-input" />

            <div v-if="v$.country.$error"
              class="validator">
              {{ v$.country.$errors[0].$message }}
            </div>
          </div>

          <div class="text-sm font-semibold">
            Location

            <span class="text-danger">*</span>
          </div>

          <div class="col-span-4 xs:col-span-5 xs:mb-4 rounded-xl overflow-hidden">
            <GoogleMap 
              class="gmap"
              api-key="AIzaSyDZjAMqmqMFwnx0yDVkqNAD3sI4S_c91Ps"
              :center="center"
              :zoom="15"
              mapTypeId="hybrid"
              :mapTypeControl="true"
              :streetViewControl="true"
              :style="`height: 260px;`">
              <MarkerCluster>
                <Marker 
                  :options="{ 
                    position: {
                      lat: -7.782709199856285, lng: 110.36706497116414
                    }, 
                    icon: '/assets/images/marker_network.svg',
                    label: {
                      text: payload.company_name,
                      color: 'white',
                      fontSize: '12px',
                      className: 'map-marker-label-red'
                    }
                  }">
                </Marker>
              </MarkerCluster>
            </GoogleMap>
          </div>

          <div class="col-span-5">
            <div class="flex-1 grid grid-cols-1 sm:grid-cols-5 gap-6 xs:gap-2">
              <div class="text-sm font-semibold">
                Base Color

                <span class="text-danger">*</span>
              </div>

              <div class="col-span-4 xs:mb-4">
                <div class="flex-1 grid grid-cols-1 sm:grid-cols-8 gap-6 xs:gap-2">
                  <div class="col-span-2 xs:mb-4">
                    <div>
                      <div
                        @click="modal = true; typeColor = 'base';"
    
                        class="flex items-center justify-start h-[40px] w-full rounded-xl border border-[#e0e6ed] dark:border-[#1b2e4b] bg-[#e0e6ed] dark:bg-[#121e33] cursor-pointer overflow-hidden">
                        <div
                          :style="`background: ${payload.color_base}`"
                          class="h-[40px] w-[40px]">
                        </div>
    
                        <div class="mx-auto">
                          {{ payload.color_base }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="text-sm font-semibold">
                    Text Color
    
                    <span class="text-danger">*</span>
                  </div>
    
                  <div class="col-span-2 xs:mb-4">
                    <div>
                      <div
                        @click="modal = true ; typeColor = 'text';"
    
                        class="flex items-center justify-start h-[40px] w-full rounded-xl border border-[#e0e6ed] dark:border-[#1b2e4b] bg-[#e0e6ed] dark:bg-[#121e33] cursor-pointer overflow-hidden">
                        <div
                          :style="`background: ${payload.color_text}`"
                          class="h-[40px] w-[40px]">
                        </div>
    
                        <div class="mx-auto">
                          {{ payload.color_text }}
                        </div>
                      </div>
                    </div>
                  </div>
    
                  <div class="text-sm font-semibold">
                    Active Color
    
                    <span class="text-danger">*</span>
                  </div>

                  <div class="col-span-2">
                    <div>
                      <div
                        @click="modal = true; typeColor = 'active';"
    
                        class="flex items-center justify-start h-[40px] w-full rounded-xl border border-[#e0e6ed] dark:border-[#1b2e4b] bg-[#e0e6ed] dark:bg-[#121e33] cursor-pointer overflow-hidden">
                        <div
                          :style="`background: ${payload.color_active}`"
                          class="h-[40px] w-[40px]">
                        </div>
    
                        <div class="mx-auto">
                          {{ payload.color_active }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="text-sm font-semibold">
            Logo

            <span class="text-danger">*</span>
          </div>
  
          <div class="col-span-4 xs:col-span-5">
            <div class="relative h-[175px] w-[175px] rounded-xl">
              <div v-if="payload.image_url"
                class="relative">
                <img
                  class="h-[175px] w-[175px] object-contain rounded-xl border border-dashed border-[#e0e6ed] dark:border-[#1b2e4b]"
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
                class="h-[175px] w-[175px]" />
            </div>

            <div v-if="v$.image_url.$error"
              class="validator">
              {{ v$.image_url.$errors[0].$message }}
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

    <!-- modal color picker -->
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
              <DialogPanel class="panel border-0 p-0 rounded-xl overflow-hidden w-full max-w-xs text-black dark:text-white-dark">
                <form @submit.prevent="submit">
                  <button
                    @click="modal = false; typeColor = '';"
  
                    type="button"
                    class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none">
                    <icon-x />
                  </button>
  
                  <div
                    class="text-lg capitalize font-bold bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                    Color Palettes
                  </div>
  
                  <div class="h-px w-full border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>
  
                  <div class="p-5 pb-6">
                    <div class="flex-1 grid grid-cols-1 sm:grid-cols-1 gap-6">
                      <ColorPicker 
                        v-model:pureColor="inputColor"

                        is-widget 
                        picker-type="chrome" 
                        format="hex" />
                    </div>
                  </div>

                  <div class="h-px w-full border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>

                  <div class="p-5">
                    <div class="flex justify-end items-center">
                      <BtnPrivate 
                        @click="setColorPicker"

                        :types="false"
                        texts="Apply"/>

                      <button 
                        @click="modal = false; typeColor = '';"

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
  import { defineComponent, onMounted, watch, reactive, ref, computed } from "vue";

  import { useMeta } from '@/composables/use-meta';
  import { useApi, useApiWithAuth } from "@/modules/api";
  import { useAuth } from "@/modules/auth";
  import { useAppStore } from '@/stores/index';
  import { useRouter } from 'vue-router';
  import { useValid } from "@/modules/valid";

  import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay, TabGroup, TabList, Tab } from '@headlessui/vue';

  import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
  import IconEye from '@/components/icon/icon-eye.vue';

  import uploadImage from '@/components/upload/Image.vue';
  import Maska from "@/components/basic/input/Maska.vue";

  import BtnPrivate from "@/components/basic/button/BtnPrivate.vue";
  import Error from '@/components/basic/Error.vue';

  import { GoogleMap, Marker, MarkerCluster, InfoWindow } from 'vue3-google-map';

  import { ColorPicker } from "vue3-colorpicker";
  import "vue3-colorpicker/style.css";

  const router = useRouter();
  const store = useAppStore();

  useMeta({ title: router.currentRoute.value.meta.title });

  const show = ref(false);
  const modal = ref(false);
  const typeColor = ref('');
  const inputColor = ref('');

  const center = ref({ lat: -7.782709199856285, lng: 110.36706497116414 });

  interface Payload {
    id?: string;
    company_name?: string;
    address?: string;
    email?: string;
    phone?: string;
    password_screen?: string;
    country?: string;
    location?: string;
    color_base?: string;
    color_text?: string;
    color_active?: string;
    image_url?: string;
  };

  const initialState = (): Payload => {
    return {
      id: undefined,
      company_name: '',
      address: '',
      email: '',
      phone: '',
      password_screen: '',
      country: '',
      location: '',
      color_base: '#2A4896',
      color_text: '#FFFFFF',
      color_active: '#F6E103',
      image_url: '',
    }
  };

  const payload = reactive<Payload>(initialState());

  const { v$, swalAlert, swalAlertUpdate, swalAlertConfirm } = useValid(payload, ['id']);
  const { loading, data, post, errorMessage, error } = useApiWithAuth('profile/update');

  const changeImage = (e) => {
    if (e?.fileuri) payload.image_url = e.fileuri;
  };

  const setColorPicker = () => {
    if (typeColor.value === 'base') payload.color_base = inputColor.value;
    if (typeColor.value === 'text') payload.color_text = inputColor.value;
    if (typeColor.value === 'active') payload.color_active = inputColor.value;

    modal.value = false;
  };

  const submit = async () => {
    const isFormCorrect = await v$.value.$validate();

    if (!isFormCorrect) return;

    loading.value = true;
  };
</script>
