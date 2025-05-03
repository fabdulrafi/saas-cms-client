<template>
  <div>
    <TransitionRoot
      appear
      :show="modal"
      as="template">
      <Dialog
        as="div"
        class="relative z-[51]">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-[black]/60" />
        </TransitionChild>

        <div
          class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center px-4 py-8">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95">
              <DialogPanel class="panel border-0 p-0 rounded-xl overflow-hidden w-full max-w-xl text-black dark:text-white-dark">
                <form>
                  <button
                    @click="modal = false"

                    type="button"
                    class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-danger dark:hover:text-danger outline-none">
                    <IconX />
                  </button>

                  <div
                    class="text-lg capitalize font-bold bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                    Ambil Gambar
                  </div>

                  <div class="h-px w-full border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>

                  <div class="p-5 pb-6">
                    <video
                      ref="videoRef"
                      autoplay
                      playsinline>
                    </video>

                    <canvas
                      ref="canvasRef"
                      style="display:none;">
                    </canvas>
                  </div>

                  <div class="h-px w-full border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>

                  <div class="p-5">
                    <div class="flex justify-center items-center">
                      <button
                        @click="takePhoto"

                        type="button"
                        class="btn btn-primary text-sm !font-semibold">
                        <img
                          src="/assets/images/take_camera.png" alt="Cancel"
                          class="h-4 w-4 inline-block" />

                        <div class="ml-3">
                          Ambil Gambar
                        </div>
                      </button>
                    </div>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onUnmounted } from 'vue';
  import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay, TabGroup, TabList, Tab } from '@headlessui/vue';
  import { useApiWithAuth } from "@/modules/api";
  import { useValid } from "@/modules/valid";
  import IconX from '@/components/icon/icon-x.vue';

  export default defineComponent({
    name: "FileUploadCamera",

    components: {
      TransitionRoot,
      TransitionChild,
      Dialog,
      DialogPanel,
      DialogOverlay,
      IconX
    },

    setup(props, { emit }) {
      const videoRef = ref<HTMLVideoElement | null>(null);
      const canvasRef = ref<HTMLCanvasElement | null>(null);
      const capturedImage = ref<string | null>(null);
      let stream: MediaStream | null = null;

      const modal = ref(false);
      const isLoading: any = ref(false);

      const { swalAlert } = useValid({});

      const startCamera = async () => {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.value) {
            videoRef.value.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
        }
      };

      const takePhoto = () => {
        if (videoRef.value && canvasRef.value) {
          const context = canvasRef.value.getContext('2d');
          if (context) {
            canvasRef.value.width = videoRef.value.videoWidth;
            canvasRef.value.height = videoRef.value.videoHeight;
            context.drawImage(videoRef.value, 0, 0, canvasRef.value.width, canvasRef.value.height);
            capturedImage.value = canvasRef.value.toDataURL('image/jpg');

            console.log(capturedImage.value);

            fetch(capturedImage.value)
              .then(res => res.blob())
              .then(blob => {
                let formData = new FormData();
                let file = new File([blob], 'twc.jpg');
                formData.append('file', file as any);

                isLoading.value = true;

                const { loading, data, error, post } = useApiWithAuth("upload/file", "form-data");

                post(formData)
                  .then(() => {
                    emit('input', data?.value?.data);
                  })
                  .catch(() => {
                    swalAlert(error.value.message, 'error');
                  })
                  .finally(() => {
                    isLoading.value = loading.value;

                    modal.value = false;
                    emit('error');
                  });
              })
          }
        }
      };

      onUnmounted(() => {
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
      });

      return {
        modal,
        videoRef,
        canvasRef,
        capturedImage,
        startCamera,
        takePhoto,
      };
    },
  });
</script>
