<template>
  <div>
    <div
      class="relative flex h-screen items-center justify-center p-40 bg-[#F0F3FF] dark:bg-[#060818]">
      <div class="flex-1 grid grid-cols-3 gap-6">
        <div class="relative">
          <div class="absolute top-0 text-white text-center p-16">
            <div class="text-2xl font-bold">
              Get Started Now
            </div>

            <div class="mt-0.5 mb-6">
              {{ contents[selected_contents] }}
            </div>

            <div class="flex items-center justify-center space-x-2">
              <div v-for="(item, index) in contents" :key="index"
                @click="selected_contents = index"
                :class="selected_contents === index ? 'w-8 h-2.5 bg-white rounded-full' : 'w-2.5 h-2.5 bg-white/50 rounded-full'"
                class="cursor-pointer transition-all duration-300 ease-in-out">
              </div>
            </div>
          </div>

          <img
            class="w-full h-auto object-contain"
            src="/assets/figma/auth.svg"
            alt="Login Image" />
        </div>

        <div class="col-span-2">
          <div class="panel p-8 shadow-none rounded-2xl">
            <div>
              <img 
                class="h-auto w-full max-w-36" 
                src="/assets/images/logo_full.png"
                alt="" />
            </div>

            <div class="h-[685px] overflow-auto flex justify-center items-center">
              <div class="w-full px-36">
                <div class="text-2xl font-semibold">
                  Register account
                </div>
                
                <div class="text-gray-400 mt-0.5 mb-8">
                  Please enter your information to register your account.
                </div>

                <form class="space-y-5 dark:text-white" @submit.prevent="submit">
                  <div>
                    <label class="dark:text-white-dark">Full Name</label>

                    <div class="relative text-white-dark modal_placeholder">
                      <input
                        v-model="payload.name"

                        type="text"
                        placeholder="Enter your full name"
                        class="form-input ps-10 placeholder:text-white-dark" />

                      <span class="absolute start-4 top-1/2 -translate-y-1/2">
                        <icon-user :fill="true" />
                      </span>
                    </div>

                    <div v-if="v$.name.$error"
                      class="validator">
                      {{ v$.name.$errors[0].$message }}
                    </div>
                  </div>

                  <div class="flex-1 grid grid-cols-2 gap-6">
                    <div>
                      <label class="dark:text-white-dark">Company Name</label>
  
                      <div class="relative text-white-dark modal_placeholder">
                        <input
                          v-model="payload.company_name"
  
                          type="text"
                          placeholder="Enter your company name"
                          class="form-input ps-10 placeholder:text-white-dark" />
  
                        <span class="absolute start-4 top-1/2 -translate-y-1/2">
                          <icon-menu-dashboard :fill="true" />
                        </span>
                      </div>
  
                      <div v-if="v$.company_name.$error"
                        class="validator">
                        {{ v$.company_name.$errors[0].$message }}
                      </div>
                    </div>
  
                    <div>
                      <label class="dark:text-white-dark">Email</label>
  
                      <div class="relative text-white-dark modal_placeholder">
                        <input
                          v-model="payload.email"
  
                          type="email"
                          placeholder="Enter your email"
                          class="form-input ps-10 placeholder:text-white-dark" />
  
                        <span class="absolute start-4 top-1/2 -translate-y-1/2">
                          <icon-mail :fill="true" />
                        </span>
                      </div>
  
                      <div v-if="v$.email.$error"
                        class="validator">
                        {{ v$.email.$errors[0].$message }}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label class="dark:text-white-dark">Phone Number</label>
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
                      
                      <div class="relative text-white-dark modal_placeholder !w-full">
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

                  <div class="flex-1 grid grid-cols-5 gap-6">
                    <div class="col-span-2">
                      <label class="dark:text-white-dark">Promo Code</label>
  
                      <div class="relative text-white-dark modal_placeholder">
                        <input
                          v-model="payload.promo_code"
  
                          type="text"
                          placeholder="Enter your promo code"
                          class="form-input ps-10 placeholder:text-white-dark" />
  
                        <span class="absolute start-4 top-1/2 -translate-y-1/2">
                          <icon-menu-invoice :fill="true" />
                        </span>
                      </div>
                    </div>
  
                    <div class="col-span-3">
                      <label class="dark:text-white-dark">Password</label>
  
                      <div class="flex">
                        <div class="relative text-white-dark modal_placeholder !w-full">
                          <input
                            v-model="payload.password"
    
                            :type="!show ? 'password' : 'text'"
                            placeholder="Enter your password"
                            class="form-input ps-10 placeholder:text-white-dark ltr:rounded-r-none rtl:rounded-l-none flex-1 ltr:rounded-l-xl rtl:rounded-r-xl" />
    
                          <span class="absolute start-4 top-1/2 -translate-y-1/2">
                            <icon-lock-dots :fill="true" />
                          </span>
    
                          <span
                            @click="show = !show"
    
                            class="absolute end-4 top-1/2 -translate-y-1/2 cursor-pointer">
                            <IconEyeHide v-if="!show" />
    
                            <IconEye v-else />
                          </span>
                        </div>
    
                        <div
                          @click="payload.password = generate"
    
                          class="bg-[#eee] flex justify-center items-center rounded-none px-3 font-semibold border border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b] cursor-pointer">
                          <Icon-refresh />
                        </div>

                        <div
                          @click="copy(payload.password)"

                          class="bg-[#eee] flex justify-center items-center ltr:rounded-r-xl rtl:rounded-l-xl px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b] cursor-pointer">
                          <Icon-copy />
                        </div>
                      </div>
  
                      <div v-if="v$.password.$error"
                        class="validator">
                        {{ v$.password.$errors[0].$message }}
                      </div>
                    </div>
                  </div>

                  <BtnPublic :loadings="loading" margins="!my-8" texts="Register"/>
                  
                  <div class="text-center text-gray-400">
                    Have an account?

                    <router-link 
                      to="/"
                      class="text-primary font-semibold">
                      Login Now
                    </router-link>
                  </div>
                </form>

                <Error :messages="errorMessage" />
              </div>
            </div>

            <div class="text-gray-400 text-center">
              ©2025 smartiv. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {
    defineComponent,
    reactive,
    toRefs,
    watch,
    ref,
    onMounted
  } from "vue";

  import { useMeta } from '@/composables/use-meta';
  import { useRouter } from 'vue-router';
  import { useApi } from "@/modules/api";
  import { useAuth } from "@/modules/auth";
  import { useAppStore } from '@/stores/index';
  import { useValid } from "@/modules/valid";
  import { useCountry } from "@/composables/use-country";

  import IconMail from '@/components/icon/icon-mail.vue';
  import IconLockDots from '@/components/icon/icon-lock-dots.vue';
  import IconMenuDashboard from "@/components/icon/menu/icon-menu-dashboard.vue";
  import IconPhoneCall from "@/components/icon/icon-phone-call.vue";
  import IconMenuInvoice from "@/components/icon/menu/icon-menu-invoice.vue";
  import IconUser from "@/components/icon/icon-user.vue";
  import IconRefresh from "@/components/icon/icon-refresh.vue";
  import IconEye from '@/components/icon/icon-eye.vue';
  import IconEyeHide from "@/components/icon/icon-eye-hide.vue";

  import BtnPublic from '@/components/basic/button/BtnPublic.vue';
  import Error from '@/components/basic/Error.vue';

  import Maska from '@/components/basic/input/Maska.vue';

  import { usePassword } from '@/modules/password';
  import IconCopy from '@/components/icon/icon-copy.vue';
  import useClipboard from 'vue-clipboard3';

  const store = useAppStore();
  const { setUser, setMenu } = useAuth();
  const router = useRouter();
  const show = ref(false);
  const { generate } = usePassword();
  const { toClipboard } = useClipboard();
  const {
    currentCountry,
    currentCallingCode,
    currentFlag,
    countryCallingCodes
  } = useCountry()

  useMeta({ title: router.currentRoute.value.meta.title });

  const contents = [
    'We help you to grow & manage your roof company in ONE application.',
    'You can manage your team, customers, and projects all in one place.',
    'Our application is designed to be user-friendly and easy to navigate.',
    'We offer a variety of features to help you manage your business.',
  ];

  const selected_contents = ref(0);

  setInterval(() => {
    if (selected_contents.value === contents.length - 1) {
      selected_contents.value = 0;
    } else {
      selected_contents.value++;
    }
  }, 5000);

  interface Payload {
    name: string;
    company_name: string;
    country: any;
    email: string;
    mobile_number: any;
    password: string;
    promo_code: string;
    rememberMe: boolean;
    
    flag: any;
    code: any;
    mobile_number_view: any;
  };

  const initialState = (): Payload => {
    return {
      name: '',
      company_name: '',
      country: 'Singapore',
      email: '',
      mobile_number: '',
      password: '',
      promo_code: '',
      rememberMe: true,
      
      flag: 'https://cdn.ipwhois.io/flags/sg.svg',
      code: '+65',
      mobile_number_view: '',
    }
  };

  const payload = reactive<Payload>(initialState());

  const { v$, swalAlert } = useValid(payload, ['mobile_number', 'promo_code']);
  const { loading, data, post, errorMessage } = useApi("registration");

  watch(currentCountry, (newVal, oldVal) => {
    if (newVal) {
      payload.country = newVal || 'Singapore';
      payload.flag = currentFlag.value || 'https://cdn.ipwhois.io/flags/sg.svg';
      payload.code = currentCallingCode.value || '+65';
      payload.password = generate.value;
    }
  });

  const copy = async (msg) => {
    if (msg) {
      await toClipboard(msg);
      swalAlert('Successfully copy data to clipboard', 'success');
    }
  };

  const submit = async () => {
    const isFormCorrect = await v$.value.$validate();

    if (!isFormCorrect) return;

    loading.value = true;

    payload.mobile_number = `${payload.code}${payload.mobile_number_view}`;

    post(payload).then(() => {
      // callback api
      swalAlert('Registration success');

      router.push(`/verify-email?email=${data.value?.data?.email}`);
    });
  };
</script>
