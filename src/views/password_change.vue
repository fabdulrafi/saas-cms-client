<template>
  <div>
    <div
      class="relative flex h-screen items-center justify-center bg-[#F0F3FF] dark:bg-[#060818]">
      <div class="flex justify-center">
        <div class="w-[500px]">
          <div class="panel p-0 shadow-none rounded-2xl overflow-hidden">
            <img 
              class="h-auto w-full mt-8" 
              src="/assets/figma/bg_change.svg"
              alt="" />
            
            <div class="p-8">
              <div class="w-full text-center">
                <div class="text-2xl font-semibold">
                  Password changed
                </div>

                <div class="text-gray-400 mt-0.5 mb-6">
                  Your password successfully changed, you can login now with your new password, make sure you remember your password.
                </div>

                <router-link
                  to="/">
                  <BtnPublic :loadings="loading" margins="!mt-8" texts="Login to Flexavi"/>
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
