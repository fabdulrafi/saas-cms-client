<template>
  <div class="relative flex min-h-screen items-center justify-center overflow-hidden">
    <div
      class="px-6 py-16 text-center font-semibold before:container before:absolute before:left-1/2 before:-translate-x-1/2 before:rounded-full before:bg-[linear-gradient(180deg,#2A4896_0%,rgba(67,97,238,0)_50.73%)] before:aspect-square before:opacity-10 md:py-20">
      <div class="flex justify-center">
        <div class="absolute bottom-2">
          <div class="flex justify-center gap-4">
            <div>
              <img
                src="/assets/images/logo_full.png"
                alt=""
                class="w-[175px] h-[50px] xs:w-[175px] object-contain m-auto" />
            </div>
          </div>
        </div>
      </div>

      <div class="relative">
        <img
          src="/assets/images/500/primary_1.png"
          alt="404"
          class="mx-auto -mt-10 w-full max-w-xs object-cover md:-mt-14 md:max-w-xl" />

        <p
          class="mt-5 text-base dark:text-white">
          An error occurred on the server!
        </p>

        <router-link
          to="/"
          class="btn btn-primary mx-auto !mt-7 w-max border border-primary rounded-xl shadow-none">
          Home Page
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useMeta } from '@/composables/use-meta';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  
  useMeta({ title: router.currentRoute.value.meta.title });
</script>