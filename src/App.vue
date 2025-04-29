<template>
  <div
    class="main-section antialiased relative font-nunito text-sm font-normal"
    :class="[store.sidebar ? 'toggle-sidebar' : '', store.menu, store.layout, store.rtlClass]">
    <component v-bind:is="mainLayout"></component>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, computed, watch } from 'vue';

  import appLayout from '@/layouts/app-layout.vue';
  import authLayout from '@/layouts/auth-layout.vue';

  import { useAppStore } from '@/stores/index';
  import { useMeta } from '@/composables/use-meta';
  import { useFirebase } from '@/composables/use-firebase';
  import { useAuth, AUTH_KEY } from '@/modules/auth';
  import { useCursorDetection } from '@/composables/use-cursor-detection';
  import { useRouter } from 'vue-router';

  const store = useAppStore();
  const auth = useAuth();
  const router = useRouter();

  // meta
  useMeta({ title: 'Smartiv Client' });

  const mainLayout = computed(() => {
    return store.mainLayout === 'auth' ? authLayout : appLayout;
  });

  const { setRegistrationToken } = useFirebase();
  const token = window.localStorage.getItem(AUTH_KEY);

  onMounted(() => {
    if (token) setRegistrationToken();
  });

  // lock screen after 5 minutes of inactivity
  const { cursorStatus } = useCursorDetection(1000 * 60 * 10); // 10 minutes

  watch(cursorStatus, (newStatus) => {
    if (
      newStatus === 'Stopped' && 
      router.currentRoute.value.name !== 'login' && 
      router.currentRoute.value.name !== 'forgot password' && 
      router.currentRoute.value.name !== 'reset link' && 
      router.currentRoute.value.name !== 'reset password' && 
      router.currentRoute.value.name !== 'new password' && 
      router.currentRoute.value.name !== 'password change' && 
      router.currentRoute.value.name !== 'lockscreen'
    ) {
      auth.lock();
    }
  });
</script>