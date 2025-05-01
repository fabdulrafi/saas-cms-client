<template>
  <button
    @click="getExport()"

    type="button"
    v-tippy:success
    class="btn btn-success w-9 h-9 p-2 rounded-xl mx-auto">
    <icon-loader v-if="isLoading"
      class="animate-[spin_2s_linear_infinite] inline-block align-middle shrink-0" />

    <IconPrinter v-else
      class="w-5 h-5" />
  </button>

  <tippy target="success" :extra="{ theme: 'success' }">
    Print
  </tippy>
</template>

<script lang="ts" setup>
  import { reactive, ref } from "vue";
  import axios from 'axios';
  import { useValid } from "@/modules/valid";
  import { AUTH_KEY } from '@/modules/auth';

  import IconLoader from '@/components/icon/icon-loader.vue';
  import IconPrinter from "@/components/icon/icon-printer.vue";

  interface Props {
    urls?: string;
    filenames?: string;
    params?: any;
  };

  const props = withDefaults(defineProps<Props>(), {
    urls: '',
    filenames: 'export',
    params: {}
  });

  const isLoading = ref(false);

  const { swalAlert } = useValid({});

  const getExport = async () => {
    isLoading.value = true;

    await axios.get(`${import.meta.env.VITE_API_URL}${props.urls}`, {
      params: props.params,
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem(AUTH_KEY)}`
      }
    })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');

      link.href = url;
      link.setAttribute('download', `${props.filenames}.xlsx`);

      document.body.appendChild(link);
      link.click();

      swalAlert('Berhasil export data', 'success');
    })
    .catch((error) => {
      console.log(error);

      swalAlert('Berhasil export data', 'error');
    })
    .finally(() => isLoading.value = false);
  };
</script>
