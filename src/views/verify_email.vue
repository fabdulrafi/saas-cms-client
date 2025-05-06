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
                  Verify your email
                </div>

                <div class="text-gray-400 mt-0.5">
                  A verify account link has been sent to your email address <span class="text-black dark:text-gray-400">{{ maskedEmail }}</span>, please check your inbox or spam to verify your account.
                </div>

                <div class="text-gray-400 mt-6">
                  Didn’t get a verification link? 

                  <span v-if="!loading && !cooldown"
                    @click="submit"
                    class="text-primary font-semibold cursor-pointer">
                    Resend Verification
                  </span>

                  <span v-else-if="loading"
                    class="animate-pulse text-primary font-semibold">
                    Resending . . .
                  </span>

                  <span v-else
                    class="text-gray-400">
                    Please wait <span class="text-primary font-semibold">{{ countdown }}s</span> to resend verification
                  </span>
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
    email: string;
  };

  const initialState = (): Payload => {
    return {
      email: router.currentRoute.value.query.email as string || '',
    }
  };

  const payload = reactive<Payload>(initialState());

  const { v$, swalAlert } = useValid(payload);
  const { loading, data, post, errorMessage } = useApi("registration/resend-email");

  const maskedEmail = computed(() => {
    const email = router.currentRoute.value.query.email as string;

    if (!email || !email.includes('@')) return '';

    const [username, domain] = email.split('@');
    if (username.length <= 2) {
      return '*@' + domain;
    }

    return (
      username[0] +
      '*'.repeat(username.length - 2) +
      username[username.length - 1] +
      '@' +
      domain
    );
  });

  const cooldown = ref(false);
  const countdown = ref(60);
  let interval: ReturnType<typeof setInterval>;

  const COOLDOWN_DURATION = 60;
  const STORAGE_KEY = 'resend_verification_timestamp';

  const startCooldown = (seconds: number) => {
    cooldown.value = true;
    countdown.value = seconds;

    interval = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) {
        clearInterval(interval);
        cooldown.value = false;
        localStorage.removeItem(STORAGE_KEY);
      }
    }, 1000);
  };

  const submit = async () => {
    const isFormCorrect = await v$.value.$validate();

    if (!isFormCorrect) return;

    loading.value = true;

    post(payload).then(() => {
      // callback api
      swalAlert('A verify account link has been sent to your email address');

      const now = Math.floor(Date.now() / 1000); // seconds
      localStorage.setItem(STORAGE_KEY, now.toString());

      startCooldown(COOLDOWN_DURATION);
    });
  };

  onMounted(() => {
    const savedTimestamp = localStorage.getItem(STORAGE_KEY);

    if (savedTimestamp) {
      const now = Math.floor(Date.now() / 1000);
      const elapsed = now - parseInt(savedTimestamp);
      const remaining = COOLDOWN_DURATION - elapsed;
      if (remaining > 0) {
        startCooldown(remaining);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  });
</script>
