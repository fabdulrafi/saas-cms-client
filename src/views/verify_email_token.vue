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
                <div class="bg-primary p-4 rounded-full w-[70px] h-[70px] border-4 border-[#CCD8FF]">
                  <img
                    class="h-auto w-full"
                    src="/assets/figma/send.svg"
                    alt="" />
                </div>

                <div class="text-2xl font-semibold mt-4">
                  You are verifying your email
                </div>

                <div class="text-gray-400 mt-0.5">
                  You are verifying your email account, please wait a moment. Once successful, you will be redirected to the login page, thank you.
                </div>

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
    computed,
    onMounted
  } from "vue";

  import { useMeta } from '@/composables/use-meta';
  import { useRouter } from 'vue-router';
  import { useApi } from "@/modules/api";
  import { useAuth } from "@/modules/auth";
  import { useAppStore } from '@/stores/index';
  import { useValid } from "@/modules/valid";

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
    secret_code: string;
  };

  const initialState = (): Payload => {
    return {
      secret_code: router.currentRoute.value.params.token as string || '',
    }
  };

  const payload = reactive<Payload>(initialState());

  const { v$, swalAlert } = useValid(payload);
  const { loading,  data, post, errorMessage } = useApi("registration/verify");

  const submit = () => {
    post(payload).then(() => {
      // callback api
      swalAlert('Verification successful, please login to your account');

      router.push('/');
    });
  };

  onMounted(() => {
    submit();
  });
</script>
