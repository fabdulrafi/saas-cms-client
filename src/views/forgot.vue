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
                <div class="text-2xl font-semibold">
                  Forgot password
                </div>
                
                <div class="text-gray-400 mt-0.5 mb-8">
                  Please enter your email address to reset your password.
                </div>

                <form class="space-y-5 dark:text-white" @submit.prevent="submit">
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

                  <BtnPublic :loadings="loading" margins="!mt-8" texts="Send a Reset Password Link"/>
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
    ref
  } from "vue";

  import { useMeta } from '@/composables/use-meta';
  import { useRouter } from 'vue-router';
  import { useApi } from "@/modules/api";
  import { useAuth } from "@/modules/auth";
  import { useAppStore } from '@/stores/index';
  import { useValid } from "@/modules/valid";

  import IconMail from '@/components/icon/icon-mail.vue';

  import BtnPublic from '@/components/basic/button/BtnPublic.vue';
  import Error from '@/components/basic/Error.vue';

  const store = useAppStore();
  const { setUser, setMenu } = useAuth();
  const router = useRouter();
  const show = ref(false);

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
    email: string;
  };

  const initialState = (): Payload => {
    return {
      email: '',
    }
  };

  const payload = reactive<Payload>(initialState());

  const { v$, swalAlert } = useValid(payload);
  const { loading, data, post, errorMessage } = useApi("forgot-password");

  const submit = async () => {
    const isFormCorrect = await v$.value.$validate();

    if (!isFormCorrect) return;

    loading.value = true;

    post(payload).then(() => {
      // callback api
      swalAlert('A forgot password link has been sent to your email address');

      router.push(`/reset-link?email=${payload.email}`);
    });
  };
</script>
