<template>
  <div>
    <div class="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <div class="panel shadow-none rounded-xl h-[280px] mt-[70px] relative">
        <div class="absolute top-[-70px] left-0 right-0 h-1/2">
          <div class="flex flex-col justify-center items-center bg-[#F0F3FF] dark:bg-[#0d1726] border-[6px] border-white dark:border-[#0d1726] rounded-full w-36 h-36 m-auto">
            <img
              :src="user?.image_url ?? `/assets/images/profile_default.png`"
              alt=""
              class="w-36 h-36 rounded-full object-cover" />
          </div>
        </div>
        
        <div class="mt-[70px]">
          <div class="flex flex-col justify-center items-center">
            <p class="font-semibold text-primary text-xl">
              {{ user?.name }}
            </p>
          </div>

          <ul class="mt-6 flex flex-col max-w-[175px] m-auto space-y-4">
            <li class="flex items-center gap-2">
              <icon-award class="shrink-0" />

              <span class="truncate">
                {{ user?.company?.corporate_name ?? 'Not specified' }}
              </span>
            </li>

            <li class="flex items-center gap-2">
              <icon-mail class="w-5 h-5 shrink-0" />

              <span class="truncate">
                {{ user?.email || 'Not specified' }}
              </span>
            </li>

            <li class="flex items-center gap-2">
              <icon-phone />

              <span class="whitespace-nowrap" dir="ltr">
                {{ user?.mobile_number }}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div class="panel shadow-none rounded-xl lg:col-span-2 xl:col-span-3"
        :style="`min-height: calc(100vh - ${store.menu === 'horizontal' ? '230px' : '179px'});`">
        <TabGroup 
          @change="changeTab"
          :selectedIndex="tab_selected"
          as="div">
          <TabList class="flex flex-wrap mb-5 border-b border-white-light dark:border-[#191e3a]">
            <Tab
              v-for="(item, index) in tabs"
              as="template" v-slot="{ selected }">
              <a
                @click="tab_selected = index"
                :key="index"
                href="javascript:;"
                class="p-5 py-3 -mb-[1px] flex items-center relative before:transition-all before:duration-700 before:absolute hover:text-primary before:bottom-0 before:w-0 before:left-0 before:right-0 before:m-auto before:h-[1px] before:bg-primary hover:before:w-full !outline-none transition duration-300"
                :class="{ 'before:!w-full text-primary': selected }">
                {{ item.title }}
              </a>
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <div class="mb-5">
                {{ tabs[tab_selected].description }}
              </div>

              <div v-if="tab_selected === 0">
                <form @submit.prevent="submit_general"
                  class="flex-1 grid grid-cols-1 gap-6">
                  <div>
                    <label class="text-sm font-semibold">
                      Image Profile
          
                      <span class="text-danger">*</span>
                    </label>

                    <div>
                      <div class="relative h-[225px] w-[225px] rounded-xl">
                        <div v-if="payload.image_url"
                          class="relative">
                          <img
                            class="h-[225px] w-[225px] object-contain rounded-xl border border-dashed border-[#e0e6ed] dark:border-[#1b2e4b]"
                            :src="payload.image_url"
                            alt="" />
          
                          <button
                            @click="toDeleteFile(payload.image_url)"
          
                            type="button"
                            class="btn btn-danger w-5 h-5 p-0 rounded-md absolute top-[-8px] right-[-8px]">
                            <icon-trash-lines class="w-3.5 h-3.5" />
                          </button>
                        </div>
          
                        <uploadImage v-else
                          @input="changeImage"
                          class="h-[225px] w-[225px]" />
                      </div>
          
                      <div v-if="v$.image_url.$error"
                        class="validator">
                        {{ v$.image_url.$errors[0].$message }}
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

                  <div class="modal_placeholder">
                    <label class="text-sm font-semibold">
                      Full Name

                      <span class="text-danger">*</span>
                    </label>
            
                    <input
                      v-model="payload.name"

                      type="text"
                      placeholder="Ex: John Doe"
                      class="form-input" />

                    <div v-if="v$.name.$error"
                      class="validator">
                      {{ v$.name.$errors[0].$message }}
                    </div>
                  </div>
                  
                  <div class="modal_placeholder">
                    <label class="dark:text-white-dark">
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
                                @click="payload.country = item?.country; payload.flag = item.flag; payload.code = item?.calling_code">
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
                      
                      <div v-if="payload.mobile_number"
                        class="relative text-white-dark modal_placeholder !w-full">
                        <Maska
                          v-model="payload.mobile_number_view"
  
                          :types="true"
                          masks="####-####-####"
                          placeholders="Enter your phone number"
                          class="form-input placeholder:text-white-dark ltr:rounded-l-none rtl:rounded-r-none" />
                      </div>
                    </div>

                    <div v-if="v$.mobile_number_view.$error"
                      class="validator">
                      {{ v$.mobile_number_view.$errors[0].$message }}
                    </div>
                  </div>

                  <div>
                    <div
                      class="flex items-center space-x-6"
                      :class="errorMessage ? 'justify-between' : 'justify-end'">
                      <Error :messages="errorMessage" margins="m-0 w-full" />

                      <BtnPrivate :loadings="loading" texts="Save"/>
                    </div>
                  </div>
                </form>
              </div>

              <div v-if="tab_selected === 1">
                <form @submit.prevent="submit_email"
                  class="flex-1 grid grid-cols-1 gap-6">
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

                    <div v-if="v$Email.email.$error"
                      class="validator">
                      {{ v$Email.email.$errors[0].$message }}
                    </div>
                  </div>

                  <div>
                    <div
                      class="flex items-center space-x-6"
                      :class="emErrorMessage ? 'justify-between' : 'justify-end'">
                      <Error :messages="emErrorMessage" margins="m-0 w-full" />

                      <BtnPrivate :loadings="emLoading" texts="Save"/>
                    </div>
                  </div>
                </form>
              </div>

              <div v-if="tab_selected === 2">
                <form @submit.prevent="submit_password"
                  class="flex-1 grid grid-cols-1 gap-6">
                  <div>
                    <label class="dark:text-white-dark">Current Password</label>

                    <div class="flex">
                      <div class="relative text-white-dark modal_placeholder !w-full">
                        <input
                          v-model="payload.current_password"
  
                          :type="!show_current ? 'password' : 'text'"
                          placeholder="Ex: 6_Kv&Zkk"
                          class="form-input pe-10 placeholder:text-white-dark ltr:rounded-r-none rtl:rounded-l-none" />
  
                        <span
                          @click="show_current = !show_current"
  
                          class="absolute end-4 top-1/2 -translate-y-1/2 cursor-pointer">
                          <IconEyeHide v-if="!show_current" />
  
                          <IconEye v-else />
                        </span>
                      </div>
                    </div>

                    <div v-if="v$Password.current_password.$error"
                      class="validator">
                      {{ v$Password.current_password.$errors[0].$message }}
                    </div>
                  </div>

                  <div>
                    <label class="dark:text-white-dark">New Password</label>

                    <div class="flex">
                      <div class="relative text-white-dark modal_placeholder !w-full">
                        <input
                          v-model="payload.new_password"
  
                          @input="validatePassword(payload.new_password)"
  
                          :type="!show_new ? 'password' : 'text'"
                          placeholder="Ex: *d72;N2]"
                          class="form-input pe-10 placeholder:text-white-dark ltr:rounded-r-none rtl:rounded-l-none" />
  
                        <span
                          @click="show_new = !show_new"
  
                          class="absolute end-4 top-1/2 -translate-y-1/2 cursor-pointer">
                          <IconEyeHide v-if="!show_new" />
  
                          <IconEye v-else />
                        </span>
                      </div>

                      <div
                        @click="payload.new_password = generate; validatePassword(payload.new_password);"
  
                        class="bg-[#eee] flex justify-center items-center rounded-none px-3 font-semibold border border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b] cursor-pointer">
                        <Icon-refresh />
                      </div>

                      <div
                        @click="copy(payload.new_password)"

                        class="bg-[#eee] flex justify-center items-center ltr:rounded-r-xl rtl:rounded-l-xl px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b] cursor-pointer">
                        <Icon-copy />
                      </div>
                    </div>

                    <div v-if="v$Password.new_password.$error"
                      class="validator">
                      {{ v$Password.new_password.$errors[0].$message }}
                    </div>
                  </div>

                  <div>
                    <div class="flex items-center space-x-2 mb-6">
                      <div v-for="(item, index) in req_passwords" :key="index"
                        :class="item.status ? 'bg-primary' : 'bg-[#F0F3FF]'"
                        class="w-28 h-2.5 rounded-full">
                      </div>
                    </div>

                    <div class="font-semibold mb-3">
                      Password requirements
                    </div>

                    <div v-for="(item, index) in req_passwords" :key="index"
                      class="flex items-center space-x-2 mt-2">
                      <div
                        :class="item.status ? 'bg-primary' : 'bg-[#ACACAC]'"
                        class="w-4 h-4 rounded-full flex items-center justify-center">
                        <IconX v-if="!item.status"
                          class="text-white w-2.5 h-2.5" />

                        <IconChecks v-else
                          class="text-white w-2.5 h-2.5" />
                      </div>

                      <span 
                        :class="item.status ? 'text-black' : 'text-gray-400'"
                        class="ml-1">
                        {{ item.title }}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div
                      class="flex items-center space-x-6"
                      :class="psErrorMessage ? 'justify-between' : 'justify-end'">
                      <Error :messages="psErrorMessage" margins="m-0 w-full" />

                      <BtnPrivate :loadings="psLoading" texts="Save"/>
                    </div>
                  </div>
                </form>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref, watch, nextTick } from "vue";
  import { useMeta } from '@/composables/use-meta';
  import { useAuth } from '@/modules/auth';
  import { useAppStore } from '@/stores/index';
  import { useApiWithAuth } from "@/modules/api";
  import { useRouter } from 'vue-router';

  import { TabGroup, TabList, Tab } from '@headlessui/vue';

  import IconMail from '@/components/icon/icon-mail.vue';
  import IconPhone from '@/components/icon/icon-phone.vue';
  import iconAward from '@/components/icon/icon-award.vue';
  import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
  import IconEye from '@/components/icon/icon-eye.vue';
  import IconEyeHide from "@/components/icon/icon-eye-hide.vue";
  import IconRefresh from "@/components/icon/icon-refresh.vue";
  import IconChecks from '@/components/icon/icon-checks.vue';
  import IconX from '@/components/icon/icon-x.vue';

  import { useValid } from "@/modules/valid";
  import { useCountry } from "@/composables/use-country";
  import { usePassword } from '@/modules/password';

  import uploadImage from '@/components/upload/Image.vue';

  import BtnPrivate from "@/components/basic/button/BtnPrivate.vue";
  import Error from '@/components/basic/Error.vue';

  import IconPencilPaper from '@/components/icon/icon-pencil-paper.vue';
  import IconCopy from '@/components/icon/icon-copy.vue';
  import useClipboard from 'vue-clipboard3';

  import Maska from '@/components/basic/input/Maska.vue';

  const { user, getUser } = useAuth();
  const store = useAppStore();
  const router = useRouter();
  const show_current = ref(false);
  const show_new = ref(false);
  const { generate } = usePassword();
  const { toClipboard } = useClipboard();
  const {
    currentCountry,
    currentCallingCode,
    currentFlag,
    countryCallingCodes
  } = useCountry();
  
  useMeta({ title: router.currentRoute.value.meta.title });

  const tabs = ref([
    {
      title: 'General',
      description: 'Please fill in your personal data correctly, so that we can provide better service.'
    },
    {
      title: 'Email',
      description: 'Change your email if there is any activity that you are not aware of or that is suspicious.'
    },
    {
      title: 'Password',
      description: 'Change your password every 3 months, to keep your account secure.'
    },
  ]);

  const tab_selected = ref(0);

  // ====================================== modal form ====================================== //
  interface Payload {
    name?: string;
    mobile_number?: string;
    image_url?: string;
    
    email?: string;
  
    current_password?: string;
    new_password?: string;

    mobile_number_view?: string;
    country?: string;
    flag?: string;
    code?: string;
  };

  const initialState = (): Payload => {
    return {
      name: '',
      mobile_number: '',
      image_url: '',
      
      email: '',

      current_password: '',
      new_password: '',

      mobile_number_view: '',
      flag: '',
      code: '',
    }
  };

  const payload = reactive<Payload>(initialState());

  const { v$, swalAlert, swalAlertUpdate, swalAlertConfirm, deleteFile } = useValid(payload, [
    'email', 'current_password', 'new_password', 'mobile_number', 'flag', 'code'
  ]);
  const { loading, data, put, errorMessage, error } = useApiWithAuth('client/profile');

  const changeImage = (e) => {
    if (e?.fileuri) payload.image_url = e.fileuri;
  };

  const toDeleteFile = (url: string) => {
    deleteFile(url)
    .then((res) => {
      if (res) {
        payload.image_url = '';

        swalAlert('Successfully delete file', 'success');
      }
    });
  };

  const submit_general = async () => {
    const isFormCorrect = await v$.value.$validate();

    if (!isFormCorrect) return;

    loading.value = true;

    payload.mobile_number = `${payload.code}${payload.mobile_number_view}`;

    put(payload).then(() => {
      // callback api
      getUser();

      swalAlert('Successfully update your profile', 'success');
    });
  };


  const {
    v$: v$Email,
  } = useValid(payload, [
    'name', 'mobile_number', 'image_url', 'current_password', 'new_password', 'mobile_number_view', 'flag', 'code'
  ]);
  const {
    loading: emLoading,
    data: emData,
    put: emPut,
    errorMessage: emErrorMessage,
    error: emError
  } = useApiWithAuth('client/profile/email');

  const submit_email = async () => {
    const isFormCorrect = await v$Email.value.$validate();

    if (!isFormCorrect) return;

    emLoading.value = true;

    emPut(payload).then(() => {
      // callback api
      getUser();

      swalAlert('Successfully update your email', 'success');
    });
  };


  const {
    v$: v$Password,
  } = useValid(payload, [
    'name', 'mobile_number', 'image_url', 'email', 'mobile_number_view', 'flag', 'code'
  ]);
  const {
    loading: psLoading,
    data: psData,
    put: psPut,
    errorMessage: psErrorMessage,
    error: psError
  } = useApiWithAuth('client/profile/password');

  const req_passwords = ref([
    {
      title: 'Contain 8-16 characters',
      status: false
    },
    {
      title: 'Contain both lower & uppercase',
      status: false
    },
    {
      title: 'Contain 1 number',
      status: false
    },
    {
      title: 'Contain 1 special character ()!@#$%^&*',
      status: false
    }
  ]);

  const validatePassword = (pwd: any) => {
    if (pwd === '') {
      req_passwords.value.forEach(rule => (rule.status = false));
      return;
    }
    
    req_passwords.value[0].status = /^.{8,16}$/.test(pwd);
    req_passwords.value[1].status = /[a-z]/.test(pwd) && /[A-Z]/.test(pwd);
    req_passwords.value[2].status = /\d/.test(pwd);
    req_passwords.value[3].status = /[()!@#$%^&*]/.test(pwd);
  };

  const copy = async (msg) => {
    if (msg) {
      await toClipboard(msg);
      swalAlert('Successfully copy data to clipboard', 'success');
    }
  };

  const submit_password = async () => {
    const isFormCorrect = await v$Password.value.$validate();

    if (!isFormCorrect) return;

    const req = req_passwords.value.find(item => item.status === false);
    
    if (req) {
      swalAlert('Please make sure your password fulfill the requirements', 'warning');
      return;
    }

    psLoading.value = true;

    psPut(payload).then(() => {
      // callback api
      getUser();

      Object.assign(payload, initialState());

      v$Password.value.$reset();

      psError.value = '';

      req_passwords.value.forEach(rule => (rule.status = false));

      swalAlert('Successfully update your password', 'success');
    });
  };


  const getDetail = () => {
    let item_country = countryCallingCodes.find((i) => i.country === user?.value?.company?.country);

    payload.name = user?.value?.name;
    payload.mobile_number = user?.value?.mobile_number;
    payload.image_url = user?.value?.image_url;
    
    payload.email = user?.value?.email;

    payload.mobile_number_view = item_country?.calling_code ? user?.value?.mobile_number?.split(item_country.calling_code)[1] || '' : '';
    payload.flag = item_country?.flag || 'https://cdn.ipwhois.io/flags/sg.svg';
    payload.code = item_country?.calling_code || '+65';
  };

  const changeTab = (index: number) => {
    tab_selected.value = index;

    getDetail();
  };

  onMounted(() => {
    getDetail();
  });
</script>
