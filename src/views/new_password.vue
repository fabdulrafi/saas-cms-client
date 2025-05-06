<template>
  <div>
    <div
      class="relative flex h-screen items-center justify-center bg-[#F0F3FF] dark:bg-[#060818]">
      <div class="flex justify-center">
        <div class="w-[1000px]">
          <div class="panel p-8 shadow-none rounded-2xl overflow-hidden">
            <div class="bg-primary p-4 rounded-full w-[70px] h-[70px] border-4 border-[#CCD8FF]">
              <img
                class="h-auto w-full"
                src="/assets/figma/send.svg"
                alt="" />
            </div>
            
            <div class="mt-4">
              <div class="w-full">
                <div class="text-2xl font-semibold">
                  Enter your new password
                </div>

                <div class="text-gray-400 mt-0.5 mb-6">
                  Enter your new password & make sure your new password fulfill the requirements.
                </div>

                <form class="space-y-5 dark:text-white" @submit.prevent="submit">
                  <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label class="dark:text-white-dark">New Password</label>
  
                      <div class="flex">
                        <div class="relative text-white-dark modal_placeholder !w-full">
                          <input
                            v-model="payload.new_password"
    
                            @input="validatePassword(payload.new_password)"
    
                            :type="!show ? 'password' : 'text'"
                            placeholder="Enter your new password"
                            class="form-input ps-10 pe-10 placeholder:text-white-dark ltr:rounded-r-none rtl:rounded-l-none" />
    
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
                          @click="payload.new_password = generate"
    
                          class="bg-[#eee] flex justify-center items-center rounded-none px-3 font-semibold border border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b] cursor-pointer">
                          <Icon-refresh />
                        </div>
  
                        <div
                          @click="copy(payload.new_password)"
  
                          class="bg-[#eee] flex justify-center items-center ltr:rounded-r-xl rtl:rounded-l-xl px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b] cursor-pointer">
                          <Icon-copy />
                        </div>
                      </div>
  
                      <div v-if="v$.new_password.$error"
                        class="validator">
                        {{ v$.new_password.$errors[0].$message }}
                      </div>
                    </div>
  
                    <div>
                      <label class="dark:text-white-dark">Confirm Password</label>
  
                      <div class="relative text-white-dark modal_placeholder">
                        <input
                          v-model="payload.confirm_password"
  
                          :type="!show_confirm ? 'password' : 'text'"
                          placeholder="Confirm your confirm password"
                          class="form-input ps-10 pe-10 placeholder:text-white-dark" />
  
                        <span class="absolute start-4 top-1/2 -translate-y-1/2">
                          <icon-lock-dots :fill="true" />
                        </span>
  
                        <span
                          @click="show_confirm = !show_confirm"
  
                          class="absolute end-4 top-1/2 -translate-y-1/2 cursor-pointer">
                          <IconEyeHide v-if="!show_confirm" />
  
                          <IconEye v-else />
                        </span>
                      </div>
  
                      <div v-if="v$.confirm_password.$error"
                        class="validator">
                        {{ v$.confirm_password.$errors[0].$message }}
                      </div>
                    </div>

                    <div class="">
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
                  </div>

                  <BtnPublic :loadings="loading" margins="!mt-8" texts="Confirm"/>  
                </form>
                

                <Error :messages="errorMessage" />
              </div>
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

  import IconMail from '@/components/icon/icon-mail.vue';
  import IconLockDots from '@/components/icon/icon-lock-dots.vue';
  import IconEye from '@/components/icon/icon-eye.vue';
  import IconEyeHide from "@/components/icon/icon-eye-hide.vue";
  import IconX from '@/components/icon/icon-x.vue';
  import IconChecks from '@/components/icon/icon-checks.vue';
  import IconRefresh from "@/components/icon/icon-refresh.vue";

  import BtnPublic from '@/components/basic/button/BtnPublic.vue';
  import Error from '@/components/basic/Error.vue';

  import { usePassword } from '@/modules/password';
  import IconCopy from '@/components/icon/icon-copy.vue';
  import useClipboard from 'vue-clipboard3';

  const store = useAppStore();
  const { setUser, setMenu } = useAuth();
  const router = useRouter();
  const show = ref(false);
  const show_confirm = ref(false);
  const { generate } = usePassword();
  const { toClipboard } = useClipboard();

  useMeta({ title: router.currentRoute.value.meta.title });

  interface Payload {
    secret_code: string;
    new_password: string;
    confirm_password: string;
  };

  const initialState = (): Payload => {
    return {
      secret_code: router.currentRoute.value.params.token as string || '',
      new_password: '',
      confirm_password: '',
    }
  };

  const payload = reactive<Payload>(initialState());

  const { v$, swalAlert } = useValid(payload);
  const { loading, data, post, errorMessage } = useApi("forgot-password/new-password");

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

  const validatePassword = (pwd: string) => {
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

  const submit = async () => {
    const isFormCorrect = await v$.value.$validate();

    if (!isFormCorrect) return;

    const req = req_passwords.value.find(item => item.status === false);
    
    if (req) {
      swalAlert('Please make sure your password fulfill the requirements', 'warning');
      return;
    }

    loading.value = true;

    post(payload).then(() => {
      // callback api
      swalAlert('Reset Password successful, please login to your account');

      router.push('/password-change');
    });
  };

  onMounted(() => {
    payload.new_password = generate.value;

    validatePassword(payload.new_password);
  });
</script>
