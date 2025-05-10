<template>
  <div>
    <div>
      <div class="flex modal_placeholder">
        <button
          @click="onFileLaunch()"

          type="button"
          class="btn btn-dark ltr:rounded-r-none rtl:rounded-l-none w-32 shadow-none">
          <icon-loader v-if="isLoading"
            class="animate-[spin_2s_linear_infinite] h-auto w-4 inline-block align-middle shrink-0" />

          <span v-else>
            Pilih File
          </span>
        </button>

        <input
          @click="onFileLaunch()"

          :value="outputFile"
          :class="{ '!rounded-none': outputFile }"

          readonly

          type="text"
          placeholder="No files selected yet"
          class="form-input ltr:rounded-l-none rtl:rounded-r-none" />

        <button v-if="outputFile"
          @click="modal = true"

          type="button"
          class="btn btn-dark ltr:rounded-l-none rtl:rounded-r-none shadow-none px-3">
          <icon-eye
            class="h-auto w-4 inline-block align-middle shrink-0" />
        </button>
      </div>

      <input
        @change="onFileChanged($event)"

        ref="inputFile"
        type="file"

        accept="application/pdf"
        capture

        class="hidden" />
    </div>

    <!-- preview -->
    <vue-easy-lightbox
      :visible="modal"

      zoomDisabled
      rotateDisabled
      scrollDisabled
      maskClosable

      @hide="modal = false"
      class="pdf-preview">
      <template #onerror>
        <div class="vel-img-wrapper">
          <iframe
            :src="outputUrl?.toString() ?? ''"

            class="vel-img"
            width="100%"
            height="1000px"
            frameborder="0">
          </iframe>
        </div>
      </template>
    </vue-easy-lightbox>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from "vue";
  import { useApiWithAuth } from "@/modules/api";
  import { useAuth } from '@/modules/auth';
  import { useValid } from "@/modules/valid";

  import IconPlusCircle from '@/components/icon/icon-plus-circle.vue';
  import IconLoader from '@/components/icon/icon-loader.vue';
  import IconXCircle from '@/components/icon/icon-x-circle.vue';
  import IconEye from '@/components/icon/icon-eye.vue';

  import VueEasyLightbox from 'vue-easy-lightbox';

  const urlStorage = import.meta.env.VITE_STORAGE_CDN;

  export default defineComponent({
    name: "FileUploadDocument",

    props: {
      modelValue: {
        type: String,
        default: ''
      }
    },

    components: {
      IconPlusCircle,
      IconLoader,
      IconXCircle,
      IconEye,
      VueEasyLightbox
    },

    setup(props, { emit }) {
      const file = ref<File | null>();
      const formData = new FormData();

      const inputFile = ref();
      const outputFile = ref<string | null>(null);
      const outputUrl = ref<string | null>(null);
      const isLoading: any = ref(false);

      const modal = ref(false);

      const { user } = useAuth();
      const { swalAlert } = useValid({});

      onMounted(() => {
        outputFile.value = props.modelValue.split('/').pop()?.toString() ?? '';
        outputUrl.value = `${urlStorage}${props.modelValue}`;
      });

      const onFileLaunch = () => {
        inputFile.value.click();
      };

      const onFileChanged = ($event: Event) => {
        const target = $event.target as HTMLInputElement;

        if (target && target.files) {
          file.value = target.files[0];

          if (file.value.type !== 'application/pdf') {
            swalAlert('Tipe file .pdf', 'error');
          }

          // 5 Mb => 5242880, 10 Mb => 10485760, 20 => 20971520
          else if (file.value.size > 10485760) {
            swalAlert('Maximum file 10 Mb', 'error');
          }

          else {
            if (file.value) {
              formData.append('file', file.value as any);

              save();
            }
          }
        }
      };

      const save = async () => {
        isLoading.value = true;

        const { loading, data, error, post } = useApiWithAuth("upload/file", "form-data");

        post(formData)
          .then(() => {
            emit('input', data?.value?.data);

            outputFile.value = data?.value?.data?.filename;
            outputUrl.value = `${urlStorage}${data?.value?.data?.fullpath}`;
          })
          .catch(() => {
            swalAlert(error.value, 'error');
          })
          .finally(() => {
            isLoading.value = loading.value;

            inputFile.value.value = null;
          });
      };

      return {
        modal,
        inputFile,
        outputFile,
        outputUrl,
        isLoading,
        onFileChanged,
        onFileLaunch
      }
    }
  });
</script>
