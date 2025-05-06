<template>
  <button
    @click="getExport()"

    :class="`${props.sizes}`"

    type="button"
    v-tippy:warning
    class="btn btn-warning rounded-xl mx-auto">
    <div v-if="props.types === 'icon'">
      <icon-loader v-if="isLoading"
        class="animate-[spin_2s_linear_infinite] inline-block align-middle shrink-0" />

      <IconDownload v-else
        class="w-5 h-5" />
    </div>

    <div v-else>
      <div v-if="isLoading">
        <icon-loader
          class="animate-[spin_2s_linear_infinite] inline-block align-middle shrink-0" />

        <span
          class="ml-2">
          Loading
        </span>
      </div>

      <div v-else
        class="flex">
        <IconDownload
          class="w-5 h-5" />

        <span
          class="ml-2">
          Dowload QR Kode
        </span>
      </div>
    </div>
  </button>

  <tippy v-if="props.types === 'icon'"
    target="warning" :extra="{ theme: 'warning' }">
    Download QR Kode
  </tippy>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import axios from 'axios';
  import { useValid } from "@/modules/valid";
  import { AUTH_KEY } from '@/modules/auth';

  import IconLoader from '@/components/icon/icon-loader.vue';
  import IconDownload from "@/components/icon/icon-download.vue";

  interface Props {
    urls?: string;
    filenames?: string;
    params?: any;
    sizes?: string;
    types?: string;
  };

  const props = withDefaults(defineProps<Props>(), {
    urls: '',
    filenames: 'export',
    params: {},
    sizes: 'w-9 h-9 p-0',
    types: 'icon'
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
      link.setAttribute('download', `${props.filenames}.pdf`);

      document.body.appendChild(link);
      link.click();

      swalAlert('Successfully export data', 'success');
    })
    .catch((error) => {
      console.log(error);

      swalAlert('Failed export data', 'error');
    })
    .finally(() => isLoading.value = false);
  };
</script>
