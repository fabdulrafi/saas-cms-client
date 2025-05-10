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

            <div class="h-[685px] flex justify-center items-center">
              <div class="w-full px-36">
                <div class="mb-5">
                  <div class="flex items-center">
                    <div class="flex-none">
                      <img
                        :src="user?.image_url ? user?.image_url : '/assets/images/profile_default.png'"
                        class="rounded-xl w-[50px] h-[50px] object-cover bg-gray-200 dark:bg-gray-800" alt="" />
                    </div>

                    <div class="ltr:pl-4 rtl:pr-4 truncate">
                      <h1 class="text-2xl font-semibold">
                        {{ user?.name ?? 'Anonymous' }}
                      </h1>

                      <p class="text-gray-400 mt-0.5">
                        Enter password to unlock screen
                      </p>
                    </div>
                  </div>
                </div>

                <form class="space-y-5 dark:text-white" @submit.prevent="submit">
                  <div>
                    <div class="relative text-white-dark modal_placeholder">
                      <input
                        v-model="password"
    
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

                  <BtnPublic :loadings="loading" margins="!mt-8" texts="Unlock Screen"/>
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

<script lang="ts">
  import {
    defineComponent,
    reactive,
    toRefs,
    ref,
    watch
  } from "vue";

  import { useMeta } from '@/composables/use-meta';
  import { useRouter } from 'vue-router';
  import { useApi } from "@/modules/api";
  import { useAuth, AUTH_LOCK, AUTH_EMAIL } from "@/modules/auth";
  import { useAppStore } from '@/stores/index';
  import { useValid } from "@/modules/valid";

  import IconLockDots from '@/components/icon/icon-lock-dots.vue';
  import IconEye from '@/components/icon/icon-eye.vue';
  import IconEyeHide from "@/components/icon/icon-eye-hide.vue";

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
      IconLockDots,
      IconEye,
      IconEyeHide,
      BtnPublic,
      Error
    },

    setup() {
      const store = useAppStore();
      const { setUser, user, setMenu } = useAuth();
      const router = useRouter();
      const show = ref(false);
      
      useMeta({ title: router.currentRoute.value.meta.title });

      const payload = reactive<Payload>({
        email: user?.value?.email.toString() ?? window.localStorage.getItem(AUTH_EMAIL)?.toString() ?? '',
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

      const { v$, swalAlert } = useValid(payload, ['email']);
      const { loading, data, post, errorMessage } = useApi("login");

      const submit = async () => {
        const isFormCorrect = await v$.value.$validate();

        if (!isFormCorrect) return;

        loading.value = true;

        post(payload).then(() => {
          // callback api
          let obj = data.value.data;

          setUser({
            id: obj?.user?.id,
            name: obj?.user?.name,
            email: obj?.user?.email,
            mobile_number: obj?.user?.mobile_number,
            image_url: obj?.user?.image_url,
            role_id: obj?.user?.role_id,
            company_id: obj?.user?.company_id,
            company: obj?.user?.company,
            access_token: obj?.token
          }, payload.rememberMe);

          window.localStorage.removeItem(AUTH_LOCK);

          const { rows, icons } = useMenu();

          watch(rows, (newRows) => {
            setMenu(newRows, icons);

            swalAlert('Successfully unlocked the screen');

            if (router?.currentRoute?.value.query?.redirect) {
              router.push(router?.currentRoute?.value.query?.redirect.toString());
            } else {
              router.push(useFirstCheckedLink().value);
            }
          });
        });
      };

      return {
        user,
        show,
        v$,
        loading,
        submit,
        errorMessage,
        store,
        ...toRefs(payload),
        contents,
        selected_contents
      };
    }
  });
</script>
