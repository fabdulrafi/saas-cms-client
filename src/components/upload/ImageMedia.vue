<template>
  <div>
    <div
      @click="onFileLaunch()"

      :class="onProgress ? 'p-0 px-8' : 'p-0'"
      class="panel !rounded-xl bg-[#e0e6ed] dark:bg-[#121e32] h-full w-full flex items-center justify-center shadow-none cursor-pointer">
      <IconLoader v-if="isLoading && !onProgress"
        class="animate-[spin_2s_linear_infinite] h-auto w-6 inline-block align-middle shrink-0" />
        
        
      <div v-if="!isLoading && !onProgress"
        class="text-center">
        <img 
          src="/assets/figma/icon_upload.svg"
          class="h-auto w-8 inline-block align-middle shrink-0 rounded-full" />

        <div class="text-sm text-gray-500 dark:text-white-dark mt-2">
          Upload Image
        </div>
      </div>

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

      accept="image/png, image/jpg, image/jpeg"

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

      const getSimulatedDuration = (file: File): number => {
        const sizeMB = file.size / (1024 * 1024);

        if (sizeMB < 0.5) return 300;
        if (sizeMB < 1) return 500;
        if (sizeMB < 3) return 700;
        if (sizeMB < 5) return 1000;
        if (sizeMB < 8) return 1300;

        return 1600;
      };

      const simulateProgress = (duration: number, stepCallback: (value: number) => void): Promise<void> => {
        return new Promise((resolve) => {
          const steps = 20;
          let current = 0;
          const interval = duration / steps;

          const timer = setInterval(() => {
            current++;
            const progress = Math.min((current / steps) * 50, 50); // cap at 50%
            stepCallback(progress);
            if (current >= steps) {
              clearInterval(timer);
              resolve();
            }
          }, interval);
        });
      };

      const convertToWebP = async (file: File): Promise<Blob | null> => {
        const duration = getSimulatedDuration(file);
        await simulateProgress(duration, (progress) => {
          onProgress.value = Math.round(progress); // simulate 0–50%
        });

        return new Promise((resolve) => {
          const reader = new FileReader()
          reader.onload = (e) => {
            const img = new Image()
            img.onload = () => {
              const canvas = document.createElement('canvas')
              canvas.width = img.width
              canvas.height = img.height
              const ctx = canvas.getContext('2d')
              if (!ctx) return resolve(null)
              ctx.drawImage(img, 0, 0)
              canvas.toBlob((blob) => resolve(blob), 'image/webp', 0.5) // convert to 50%
            }
            img.src = e.target?.result as string
          }
          reader.readAsDataURL(file)
        })
      };

      const onFileChanged = async ($event: Event) => {
        const target = $event.target as HTMLInputElement;

        if (target && target.files) {
          file.value = target.files[0];

          if (file.value.type !== 'image/jpg' && file.value.type !== 'image/jpeg' && file.value.type !== 'image/png') {
            swalAlert('Image type .jpg/.jpeg/.png', 'error');
          }

          else if (file.value.size > 10485760) {
            swalAlert('Maximum file 10 Mb', 'error');
          }

          else {
            if (file.value) {
              onProgress.value = 0;
              
              const convertedWebP = await convertToWebP(file.value)

              if (convertedWebP) {
                await uploadToServer(convertedWebP)
              }
            }
          }
        }
      };

      const uploadToServer = async (blob: Blob) => {
        formData.append('file', blob, 'image.webp');

        isLoading.value = true;

        const xhr = new XMLHttpRequest();

        xhr.open('POST', `${import.meta.env.VITE_API_URL}client/storage-media/upload`, true);
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const realProgress = event.loaded / event.total;
            onProgress.value = 50 + Math.round(realProgress * 50); // from 50% to 100%
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200) {
            let data = JSON.parse(xhr.response);
            
            if (data.status === 200) {
              emit('input', data?.results?.data);
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
