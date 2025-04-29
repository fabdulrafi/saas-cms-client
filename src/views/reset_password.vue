<template>
  <div>
    <div
      class="relative flex h-screen items-center justify-center bg-[#F0F3FF] dark:bg-[#060818]">
      <div class="flex-1 grid grid-cols-3 gap-6">
        <div class="col-start-2">
          <div class="flex justify-between items-end mb-4">
            <div>
              <img 
                class="h-auto w-full max-w-32" 
                src="/assets/images/logo_full.png"
                alt="" />
            </div>

            <router-link
              to="#"
              class="text-primary font-semibold">
              Visit Landing Page
            </router-link>
          </div>

          <div class="panel p-0 shadow-none rounded-2xl overflow-hidden">
            <img 
              class="h-auto w-full" 
              src="/assets/figma/bg_reset.svg"
              alt="" />
              
            <div class="p-12">
              <div class="w-full text-center">
                <div class="text-2xl font-semibold">
                  Reset Password
                </div>

                <div class="mt-0.5">
                  Seem like you forgot your password for Flexavi. If this is true, click below to reset your password
                </div>

                <router-link
                  to="/new-password">
                  <BtnPublic :types="false" witdths="w-auto" margins="!my-8 mx-auto" texts="Reset Password"/>
                </router-link>

                <div>
                  Ignore this email if you did not forgot your password.
                </div>
              </div>
            </div>
          </div>

          <div class="text-center mt-8">
            <div class="text-xl font-semibold">
              Have an Questions?
            </div>

            <div class="mt-0.5 mb-4">
              You can call <span class="text-primary font-semibold">73671267</span> or <span class="text-primary font-semibold">info@smartiv.id</span>
            </div>

            <div class="flex items-center justify-center space-x-6">
              <img
                class="w-12 h-12"
                src="/assets/figma/sosmed_fb.svg"
                alt="" />

              <img
                class="w-12 h-12"
                src="/assets/figma/sosmed_ig.svg"
                alt="" />

              <img
                class="w-12 h-12"
                src="/assets/figma/sosmed_in.svg"
                alt="" />
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
        selected_contents
      };
    }
  });
</script>
