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

            <a
              href="https://smartiv.tv/home"
              target="_blank"

              class="text-primary font-semibold">
              Visit Landing Page
            </a>
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
                  :to="`/new-password/${router.currentRoute.value.params.token}`">
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
