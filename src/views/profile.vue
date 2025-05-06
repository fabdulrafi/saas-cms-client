<template>
  <div>
    
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref, watch, nextTick } from "vue";
  import { useMeta } from '@/composables/use-meta';
  import { useAuth } from '@/modules/auth';
  import { useAppStore } from '@/stores/index';
  import { useApiWithAuth } from "@/modules/api";
  import { useRouter } from 'vue-router';

  import { TabGroup, TabList, Tab } from '@headlessui/vue';

  import IconMail from '@/components/icon/icon-mail.vue';
  import IconPhone from '@/components/icon/icon-phone.vue';
  import iconAward from '@/components/icon/icon-award.vue';
  import IconTrashLines from '@/components/icon/icon-trash-lines.vue';

  import { useValid } from "@/modules/valid";

  import Maska from '@/components/basic/input/Maska.vue';

  import { usePassword } from '@/modules/password';

  import uploadImage from '@/components/upload/Image.vue';

  import BtnPrivate from "@/components/basic/button/BtnPrivate.vue";
  import Error from '@/components/basic/Error.vue';

  import IconPencilPaper from '@/components/icon/icon-pencil-paper.vue';
  import IconCopy from '@/components/icon/icon-copy.vue';
  import useClipboard from 'vue-clipboard3';

  const { user, getUser } = useAuth();
  const store = useAppStore();
  const router = useRouter();
  
  useMeta({ title: router.currentRoute.value.meta.title });
</script>
