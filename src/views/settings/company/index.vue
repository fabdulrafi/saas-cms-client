<template>
  <div>
    <div class="flex items-center whitespace-nowrap">
      <div class="text-sm text-gray-400 font-semibold">
        Settings / <span class="capitalize text-black dark:text-white-light">{{ router.currentRoute.value.name }}</span>
      </div>

      <div
        class="flex items-center space-x-3 ltr:ml-auto rtl:mr-auto">
        
      </div>
    </div>
    
    <div class="panel p- mt-[24px] shadow-none rounded-xl">
      <div class="flex-1 grid grid-cols-1 gap-6">
        <div>
          <div class="text-lg font-semibold dark:text-white-light">
            Settings Default
          </div>

          <div class="text-sm text-gray-400 font-semibold">
            Setting new company
          </div>
        </div>

        <div>
          <label class="text-sm font-semibold">
            Company Name

            <span class="text-danger">*</span>
          </label>
  
          <input
            v-model="payload.corporate_name"

            type="text"
            placeholder="Ex: Smartiv.corp"
            class="form-input" />

          <div v-if="v$.corporate_name.$error"
            class="validator">
            {{ v$.corporate_name.$errors[0].$message }}
          </div>
        </div>

        <div>
          <label class="text-sm font-semibold">
            Address

            <span class="text-danger">*</span>
          </label>

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

        <div class="flex-1 grid grid-cols-2 gap-6">
          <div>
            <label class="text-sm font-semibold">
              Email
  
              <span class="text-danger">*</span>
            </label>
    
            <input
              v-model="payload.billing_email"

              type="email"
              placeholder="Ex: company@mail.com"
              class="form-input" />

            <div v-if="v$.billing_email.$error"
              class="validator">
              {{ v$.billing_email.$errors[0].$message }}
            </div>
          </div>

          <div v-if="!isLoading">
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
                        @click="payload.country = item?.country; payload.flag = item.flag; payload.code = item?.calling_code; payload.currency = item?.currency;">
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

        <div>
          <label class="text-sm font-semibold">
            Pin Screen

            <span class="text-danger">*</span>
          </label>

          <div class="flex">
            <div class="relative text-white-dark modal_placeholder !w-full">
              <input
                v-model="payload.pin_screen"

                :type="!show ? 'password' : 'text'"
                placeholder="Ex: 12345678"
                class="form-input placeholder:text-white-dark ltr:rounded-r-none rtl:rounded-l-none flex-1 ltr:rounded-l-xl rtl:rounded-r-xl" />

              <span
                @click="show = !show"

                class="absolute end-4 top-1/2 -translate-y-1/2 cursor-pointer">
                <IconEyeHide v-if="!show" />

                <IconEye v-else />
              </span>
            </div>

            <div
              @click="payload.pin_screen = generate"

              class="bg-[#eee] flex justify-center items-center rounded-none px-3 font-semibold border border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b] cursor-pointer">
              <Icon-refresh />
            </div>

            <div
              @click="copy(payload.pin_screen)"

              class="bg-[#eee] flex justify-center items-center ltr:rounded-r-xl rtl:rounded-l-xl px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b] cursor-pointer">
              <Icon-copy />
            </div>
          </div>

          <div v-if="v$.pin_screen.$error"
            class="validator">
            {{ v$.pin_screen.$errors[0].$message }}
          </div>
        </div>
      </div>
    </div>

    <div class="panel p- my-6 shadow-none rounded-xl">
      <div class="flex-1 grid grid-cols-1 gap-6">
        <div>
          <div class="text-lg font-semibold dark:text-white-light">
            Location
          </div>

          <div class="text-sm text-gray-400 font-semibold">
            Setting location for company
          </div>
        </div>

        <div class="flex-1 grid grid-cols-2 gap-6">
          <div>
            <label class="text-sm font-semibold">
              Country
    
              <span class="text-danger">*</span>
            </label>
            
            <SingleSelect
              v-model="payload.country"

              :options="countryCallingCodes.map((item) => ({ id: item.country, name: item.country }))"

              placeholders="Contoh: Singapore"
              opens="bottom" />

            <div v-if="v$.country.$error"
              class="validator">
              {{ v$.country.$errors[0].$message }}
            </div>
          </div>

          <div>
            <label class="text-sm font-semibold">
              Currency
    
              <span class="text-danger">*</span>
            </label>
            
            <SingleSelect
              v-model="payload.currency"

              :options="countryCallingCodes.map((item) => ({ id: item.currency, name: item.currency }))"

              placeholders="Contoh: SGD"
              opens="bottom" />

            <div v-if="v$.currency.$error"
              class="validator">
              {{ v$.currency.$errors[0].$message }}
            </div>
          </div>
        </div>

        <div class="rounded-xl overflow-hidden">
          <GoogleMap 
            class="gmap"
            api-key="AIzaSyDZjAMqmqMFwnx0yDVkqNAD3sI4S_c91Ps"
            :center="center"
            :zoom="15"
            mapTypeId="hybrid"
            :mapTypeControl="true"
            :streetViewControl="true"
            :style="`height: 500px;`">
            <MarkerCluster>
              <Marker 
                :options="{ 
                  position: {
                    lat: payload.latitude, 
                    lng: payload.longitude
                  }, 
                  icon: '/assets/images/marker_network.svg',
                  label: {
                    text: payload.corporate_name,
                    color: 'white',
                    fontSize: '12px',
                    className: 'map-marker-label-red'
                  },
                  draggable: true
                }"
                @dragend="onMarkerDragEnd">
              </Marker>
            </MarkerCluster>
          </GoogleMap>
        </div>
      </div>
    </div>

    <div class="panel p- my-6 shadow-none rounded-xl">
      <div class="flex-1 grid grid-cols-1 gap-6">
        <div>
          <div class="text-lg font-semibold dark:text-white-light">
            Display Settings
          </div>

          <div class="text-sm text-gray-400 font-semibold">
            Customize your visual experience
          </div>
        </div>

        <div class="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label class="text-sm font-semibold">
              Base Color

              <span class="text-danger">*</span>
            </label>

            <div>
              <div
                @click="modal = true; typeColor = 'base';"

                class="flex items-center justify-start h-[40px] w-full rounded-xl border border-[#e0e6ed] dark:border-[#1b2e4b] bg-[#e0e6ed] dark:bg-[#121e33] cursor-pointer overflow-hidden">
                <div
                  :style="`background: ${payload.base_color}`"
                  class="h-[40px] w-[40px]">
                </div>

                <div class="mx-auto">
                  {{ payload.base_color }}
                </div>
              </div>
            </div>
          </div>

          <div>
            <label class="text-sm font-semibold">
              Text Color

              <span class="text-danger">*</span>
            </label>

            <div
              @click="modal = true ; typeColor = 'text';"

              class="flex items-center justify-start h-[40px] w-full rounded-xl border border-[#e0e6ed] dark:border-[#1b2e4b] bg-[#e0e6ed] dark:bg-[#121e33] cursor-pointer overflow-hidden">
              <div
                :style="`background: ${payload.text_color}`"
                class="h-[40px] w-[40px]">
              </div>

              <div class="mx-auto">
                {{ payload.text_color }}
              </div>
            </div>
          </div>

          <div>
            <label class="text-sm font-semibold">
              Active Color

              <span class="text-danger">*</span>
            </label>

            <div
              @click="modal = true; typeColor = 'active';"

              class="flex items-center justify-start h-[40px] w-full rounded-xl border border-[#e0e6ed] dark:border-[#1b2e4b] bg-[#e0e6ed] dark:bg-[#121e33] cursor-pointer overflow-hidden">
              <div
                :style="`background: ${payload.active_color}`"
                class="h-[40px] w-[40px]">
              </div>

              <div class="mx-auto">
                {{ payload.active_color }}
              </div>
            </div>
          </div>

          <div>
            <label class="text-sm font-semibold">
              Logo
  
              <span class="text-danger">*</span>
            </label>
  
            <div>
              <div class="relative h-[200px] w-[300px] rounded-xl">
                <div v-if="payload.logo_url"
                  class="relative">
                  <img
                    class="h-[200px] w-[300px] object-contain rounded-xl border border-dashed border-[#e0e6ed] dark:border-[#1b2e4b]"
                    :src="payload.logo_url"
                    alt="" />
  
                  <button
                    @click="toDeleteFile(payload.logo_url)"
  
                    type="button"
                    class="btn btn-danger w-5 h-5 p-0 rounded-md absolute top-[-8px] right-[-8px]">
                    <icon-trash-lines class="w-3.5 h-3.5" />
                  </button>
                </div>
  
                <uploadImage v-else
                  @input="changeImage"
                  class="h-[200px] w-[300px]" />
              </div>
  
              <div v-if="v$.logo_url.$error"
                class="validator">
                {{ v$.logo_url.$errors[0].$message }}
              </div>
            </div>
  
            <div class="text-xs text-gray-400 font-semibold mt-4 w-[300px]"> 
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
                    class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-danger outline-none">
                    <icon-x />
                  </button>
  
                  <div
                    class="text-lg capitalize font-bold bg-[#F9FBFE] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
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
  import { useCountry } from "@/composables/use-country";
  import { usePassword } from '@/modules/password';

  import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay, TabGroup, TabList, Tab } from '@headlessui/vue';
  import SingleSelect from '@/components/basic/select/Single.vue';

  import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
  import IconEye from '@/components/icon/icon-eye.vue';
  import IconEyeHide from "@/components/icon/icon-eye-hide.vue";
  import IconX from '@/components/icon/icon-x.vue';

  import uploadImage from '@/components/upload/Image.vue';
  import Maska from "@/components/basic/input/Maska.vue";

  import BtnPrivate from "@/components/basic/button/BtnPrivate.vue";
  import Error from '@/components/basic/Error.vue';

  import { GoogleMap, Marker, MarkerCluster, InfoWindow } from 'vue3-google-map';

  import { ColorPicker } from "vue3-colorpicker";
  import "vue3-colorpicker/style.css";

  import IconRefresh from "@/components/icon/icon-refresh.vue";
  import IconCopy from '@/components/icon/icon-copy.vue';
  import useClipboard from 'vue-clipboard3';

  const router = useRouter();
  const store = useAppStore();
  const { generate } = usePassword();
  const { toClipboard } = useClipboard();
  const {
    currentCountry,
    currentCallingCode,
    currentFlag,
    countryCallingCodes
  } = useCountry();

  useMeta({ title: router.currentRoute.value.meta.title });

  const show = ref(false);
  const modal = ref(false);
  const typeColor = ref('');
  const inputColor = ref('');

  const center = ref({ lat: 1.3853020989245008, lng: 103.83474516858092 });

  interface Payload {
    corporate_name?: string;
    phone_number?: string;
    billing_email?: string;
    address?: string;
    country?: string;
    city?: string;
    postal_code?: string;
    latitude?: any;
    longitude?: any;
    pin_screen?: string;
    currency?: string;
    base_color?: string;
    active_color?: string;
    text_color?: string;
    timezone?: string;
    logo_url?: string;

    flag: any;
    code: any;
    phone_number_view: any;
  };

  const initialState = (): Payload => {
    return {
      corporate_name: '',
      phone_number: '',
      billing_email: '',
      address: '',
      country: '',
      city: '',
      postal_code: '',
      latitude: 1.3853020989245008,
      longitude: 103.83474516858092,
      pin_screen: '',
      currency: '',
      base_color: '',
      active_color: '',
      text_color: '',
      timezone: '',
      logo_url: '',

      flag: '',
      code: '',
      phone_number_view: '',
    }
  };

  const payload = reactive<Payload>(initialState());

  const { v$, swalAlert, swalAlertUpdate, swalAlertConfirm, deleteFile } = useValid(payload, [
    'city', 'postal_code', 'latitude', 'longitude', 'phone_number', 'timezone', 'flag', 'code'
  ]);
  const { loading, data, post, put, errorMessage, error } = useApiWithAuth('client/settings');

  const copy = async (msg) => {
    if (msg) {
      await toClipboard(msg);
      swalAlert('Successfully copy data to clipboard', 'success');
    }
  };

  const setColorPicker = () => {
    if (typeColor.value === 'base') payload.base_color = inputColor.value;
    if (typeColor.value === 'text') payload.text_color = inputColor.value;
    if (typeColor.value === 'active') payload.active_color = inputColor.value;

    modal.value = false;
  };

  const onMarkerDragEnd = (event) => {
    payload.latitude = event.latLng.lat();
    payload.longitude = event.latLng.lng();
  };

  const changeImage = (e) => {
    if (e?.fileuri) payload.logo_url = e.fileuri;
  };

  const submit = async () => {
    const isFormCorrect = await v$.value.$validate();

    if (!isFormCorrect) return;

    loading.value = true;

    payload.phone_number = `${payload.code}${payload.phone_number_view}`;

    payload.latitude = String(payload.latitude);
    payload.longitude = String(payload.longitude);

    put(payload).then(() => {
      // callback api
      swalAlert('Update company success', 'success');
      
      getDetailCompany();
    });
  };

  const isLoading = ref(false);

  const getDetailCompany = async () => {
    isLoading.value = true;

    const { loading, error, data, get } = useApiWithAuth('client/settings');

    get();

    watch([ loading ], () => {

      if (data.value) {

        let item = data?.value?.data;

        let item_country = countryCallingCodes.find((i) => i.country === item.country);

        payload.corporate_name = item?.corporate_name;
        payload.phone_number = item?.phone_number;
        payload.billing_email = item?.billing_email;
        payload.address = item?.address;
        payload.country = item?.country || 'Singapore';
        payload.city = item?.city;
        payload.postal_code = item?.postal_code;
        payload.latitude = Number(item?.latitude) || 1.3853020989245008;
        payload.longitude = Number(item?.longitude) || 103.83474516858092;
        payload.pin_screen = !item?.pin_screen ? generate.value : item?.pin_screen;
        payload.currency = item?.currency;
        payload.base_color = item?.base_color || '#2A4896';
        payload.active_color = item?.active_color || '#F6E103';
        payload.text_color = item?.text_color || '#FFFFFF';
        payload.timezone = item?.timezone;
        payload.logo_url = item?.logo_url;

        payload.flag = item_country?.flag || 'https://cdn.ipwhois.io/flags/sg.svg';
        payload.code = item_country?.calling_code || '+65';
        payload.phone_number_view = item?.phone_number?.split(item_country?.calling_code)[1] || '';

        center.value = { 
          lat: Number(item?.latitude) || 1.3853020989245008, 
          lng: Number(item?.longitude) || 103.83474516858092 
        };

      };

      isLoading.value = false;

    });
  };

  const toDeleteFile = (url: string) => {
    deleteFile(url)
    .then((res) => {
      if (res) {
        payload.logo_url = '';

        swalAlert('Successfully delete file', 'success');
      }
    });
  };

  onMounted(() => {
    getDetailCompany();
  });
</script>
