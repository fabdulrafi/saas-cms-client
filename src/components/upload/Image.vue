<template>
  <div>
    <div
      @click="onFileLaunch()"

      :class="onProgress ? 'p-0 px-8' : 'p-0'"
      class="panel !rounded-xl bg-[#e0e6ed] dark:bg-[#121e32] h-full w-full flex items-center justify-center shadow-none cursor-pointer">
      <IconLoader v-if="isLoading && !onProgress"
        class="animate-[spin_2s_linear_infinite] h-auto w-6 inline-block align-middle shrink-0" />

      <IconCamera v-if="!isLoading && !onProgress"
        class="h-auto w-10 text-primary dark:text-white-dark" />

      <div v-if="onProgress"
        class="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
        <div
          :style="{ width: `${onProgress}%` }"
          class="bg-primary h-4 rounded-full text-center text-white text-xs">
          {{ onProgress }}%
        </div>
      </div>
    </div>

    <input
      @change="onFileChanged($event)"

      ref="inputFile"
      type="file"

      accept="image/png, image/gif, image/jpg, image/jpeg"

      class="hidden" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue";
  import { useValid } from "@/modules/valid";
  import { AUTH_KEY } from '@/modules/auth';

  import IconPlusCircle from '@/components/icon/icon-plus-circle.vue';
  import IconLoader from '@/components/icon/icon-loader.vue';
  import IconCamera from '@/components/icon/icon-camera.vue';

  export default defineComponent({
    name: "FileUploadImage",

    components: {
      IconPlusCircle,
      IconLoader,
      IconCamera
    },

    setup(props, { emit }) {
      const token = window.localStorage.getItem(AUTH_KEY);

      const file = ref<File | null>();
      const formData = new FormData();

      const inputFile = ref();
      const isLoading: any = ref(false);

      const onProgress = ref<number | null>(null);

      const { swalAlert } = useValid({});

      const onFileLaunch = () => {
        inputFile.value.click();
      };

      const onFileChanged = ($event: Event) => {
        const target = $event.target as HTMLInputElement;

        if (target && target.files) {
          file.value = target.files[0];

          if (file.value.type !== 'image/jpg' && file.value.type !== 'image/jpeg' && file.value.type !== 'image/png' && file.value.type !== 'image/gif' && file.value.type !== 'image/svg') {
            swalAlert('Image type .jpg/.jpeg/.png/.gif/.svg', 'error');
          }

          // 5 Mb => 5242880, 10 Mb => 10485760, 20 => 20971520
          else if (file.value.size > 10485760) {
            swalAlert('Maximum file 10 Mb', 'error');
          }

          else {
            if (file.value) {
              formData.append('image', file.value as any);
              formData.append('key', 'image');

              save();
            }
          }
        }
      };

      const save = () => {
        isLoading.value = true;

        const xhr = new XMLHttpRequest();

        xhr.open('POST', `${import.meta.env.VITE_API_CDN}image.php`, true);
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            onProgress.value = Math.round((event.loaded / event.total) * 100);
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200) {
            let data = JSON.parse(xhr.response);

            if (data.status === 200) {
              emit('input', data?.data);
            } else {
              swalAlert(data?.message, 'error');
            }

            onProgress.value = null;

            isLoading.value = false;

            inputFile.value.value = null;

            console.log(inputFile)

          } else {
            swalAlert('Upload failed', 'error');

            onProgress.value = null;

            isLoading.value = false;

            inputFile.value.value = null;

            console.log(inputFile)
          }
        };

        xhr.onerror = () => {
          swalAlert('Upload error', 'error');

          onProgress.value = null;

          isLoading.value = false;

          inputFile.value.value = null;
        };

        xhr.send(formData);
      };

      return {
        inputFile,
        isLoading,
        onProgress,
        onFileChanged,
        onFileLaunch
      }
    }
  });
</script>
