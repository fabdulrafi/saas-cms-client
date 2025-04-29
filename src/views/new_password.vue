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

                <div class="flex-1 grid grid-cols-2 gap-6">
                  <div>
                    <label class="dark:text-white-dark">Password</label>

                    <div class="relative text-white-dark modal_placeholder">
                      <input
                        v-model="password"

                        @input="validatePassword(password)"

                        :type="!show ? 'password' : 'text'"
                        placeholder="Enter your password"
                        class="form-input ps-10 pe-10 placeholder:text-white-dark" />

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

                    <div v-if="v$.password.$error"
                      class="validator">
                      {{ v$.password.$errors[0].$message }}
                    </div>
                  </div>

                  <div>
                    <label class="dark:text-white-dark">Confirm Password</label>

                    <div class="relative text-white-dark modal_placeholder">
                      <input
                        v-model="password"

                        @input="validatePassword(password)"

                        :type="!show ? 'password' : 'text'"
                        placeholder="Confirm your password"
                        class="form-input ps-10 pe-10 placeholder:text-white-dark" />

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

                    <div v-if="v$.password.$error"
                      class="validator">
                      {{ v$.password.$errors[0].$message }}
                    </div>
                  </div>

                  <div class="mt-2">
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

                      <span class="ml-1">
                        {{ item.title }}
                      </span>
                    </div>
                  </div>
                </div>

                <router-link
                  to="password-change">
                  <BtnPublic :loadings="loading" margins="!mt-8" texts="Confirm"/>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    reactive,
    toRefs,
    watch,
    ref
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

  import BtnPublic from '@/components/basic/button/BtnPublic.vue';
  import Error from '@/components/basic/Error.vue';

  import { useMenu, useFirstCheckedLink } from '@/composables/use-menu';

  interface Payload {
    email: string;
    password: string;
    rememberMe: boolean;
  };

  export default defineComponent({
    components: {
      IconMail,
      IconLockDots,
      IconEye,
      IconX,
      IconChecks,
      IconEyeHide,
      BtnPublic,
      Error
    },

    setup() {
      const store = useAppStore();
      const { setUser, setMenu } = useAuth();
      const router = useRouter();
      const show = ref(false);

      useMeta({ title: router.currentRoute.value.meta.title });

      const payload = reactive<Payload>({
        email: '',
        password: '',
        rememberMe: true
      });

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

      const req_passwords = ref([
        {
          title: 'Contain 8-30 characters',
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
          title: 'Contain 1 special character ()!#$%^&*',
          status: false
        }
      ]);

      const validatePassword = (pwd: string) => {
        if (pwd === '') {
          req_passwords.value.forEach(rule => (rule.status = false));
          return;
        }
        
        req_passwords.value[0].status = /^.{8,30}$/.test(pwd);
        req_passwords.value[1].status = /[a-z]/.test(pwd) && /[A-Z]/.test(pwd);
        req_passwords.value[2].status = /\d/.test(pwd);
        req_passwords.value[3].status = /[()!#$%^&*]/.test(pwd);
      };

      const { v$, swalAlert } = useValid(payload);
      const { loading, data, post, errorMessage } = useApi("auth/login");

      const submit = async () => {
        const isFormCorrect = await v$.value.$validate();

        if (!isFormCorrect) return;

        loading.value = true;

        post(payload).then(() => {
          // callback api
          let obj = data.value;

          setUser({
            id: obj.data?.id,
            name: obj.data?.name,
            email: obj.data?.email,
            mobilephone: obj.data?.mobilephone,
            image_url: obj.data?.image_url,
            role_id: obj.data?.role_id,
            type: obj.data?.type ?? '',
            access_token: obj.token
          }, payload.rememberMe);

          const { rows, icons } = useMenu();

          watch(rows, (newRows) => {
            setMenu(newRows, icons);
            
            swalAlert('Welcome to Smartiv');

            if (router?.currentRoute?.value.query?.redirect) {
              router.push(router?.currentRoute?.value.query?.redirect.toString());
            } else {
              router.push(useFirstCheckedLink().value);
            }
          });
        });
      };

      return {
        show,
        v$,
        loading,
        submit,
        errorMessage,
        store,
        ...toRefs(payload),
        contents,
        selected_contents,
        req_passwords,
        validatePassword
      };
    }
  });
</script>
