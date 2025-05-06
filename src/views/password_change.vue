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
                  <BtnPublic margins="!mt-8" texts="Login Now"/>
                </router-link>
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
    ref
  } from "vue";

  import { useMeta } from '@/composables/use-meta';
  import { useRouter } from 'vue-router';
  import { useApi } from "@/modules/api";
  import { useAuth } from "@/modules/auth";
  import { useAppStore } from '@/stores/index';
  import { useValid } from "@/modules/valid";

  import BtnPublic from '@/components/basic/button/BtnPublic.vue';

  const store = useAppStore();
  const { setUser, setMenu } = useAuth();
  const router = useRouter();
  const show = ref(false);

  useMeta({ title: router.currentRoute.value.meta.title });
</script>
