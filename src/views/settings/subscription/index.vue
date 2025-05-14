<template>
  <div>
    <div class="flex items-center whitespace-nowrap">
      <h5
        class="font-semibold capitalize text-lg dark:text-white-light">
        {{ router.currentRoute.value.meta.title }}
      </h5>

      <div
        class="flex items-center space-x-3 ltr:ml-auto rtl:mr-auto">
        
      </div>
    </div>
    
    <div class="mt-[24px]">
      <div class="flex-1 grid grid-cols-1 sm:grid-cols-7 gap-6 mb-6 h-[320px]">
        <div class="panel p-0 w-full h-full shadow-none rounded-xl overflow-hidden col-span-5">
          <div class="w-full h-full">
            <img
              src="/assets/images/dashboard/new/banner_promo.svg"
              alt=""
              class="w-full h-full object-cover" />
          </div>
        </div>

        <div class="col-span-2">
          <div class="panel shadow-none rounded-xl h-full">
            <ul class="space-y-6">
              <li>
                <div class="text-base font-semibold mb-2">
                  Units
                </div>

                <div class="flex items-center">
                  <IconArrowForward class="w-4 h-4 transform scale-y-[-1] mr-1" />

                  4873
                </div>
              </li>

              <li>
                <div class="text-base font-semibold mb-2">
                  Active Feature
                </div>

                <div class="flex items-center">
                  <IconArrowForward class="w-4 h-4 transform scale-y-[-1] mr-1" />

                  5
                </div>
              </li>

              <li>
                <div class="text-base font-semibold mb-2">
                  Monthly Bill
                </div>

                <div class="flex items-center">
                  <IconArrowForward class="w-4 h-4 transform scale-y-[-1] mr-1" />

                  {{ $format.currency(9999) }}
                </div>
              </li>

              <li>
                <div class="text-base font-semibold mb-2">
                  Last Payment
                </div>

                <div class="flex items-center">
                  <IconArrowForward class="w-4 h-4 transform scale-y-[-1] mr-1" />

                  {{ $format.date() }}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 h-[calc(100vh_-_572px)]">
        <div class="panel p-4 w-full h-full shadow-none rounded-xl overflow-hidden">
          <div class="flex items-center justify-center w-full h-full">
            CONTENT
          </div>
        </div>

        <div class="panel p-4 w-full h-full shadow-none rounded-xl overflow-hidden">
          <div class="flex items-center justify-center w-full h-full">
            CONTENT
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { defineComponent, onMounted, watch, reactive, ref, computed } from "vue";

  import { useMeta } from '@/composables/use-meta';
  import { useApi, useApiWithAuth } from "@/modules/api";
  import { useAuth } from "@/modules/auth";
  import { useAppStore } from '@/stores/index';
  import { useRouter } from 'vue-router';
  import { useValid } from "@/modules/valid";

  import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay, TabGroup, TabList, Tab } from '@headlessui/vue';

  import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
  import IconEye from '@/components/icon/icon-eye.vue';
  import IconArrowForward from '@/components/icon/icon-arrow-forward.vue';

  import uploadImage from '@/components/upload/Image.vue';
  import Maska from "@/components/basic/input/Maska.vue";

  import BtnPrivate from "@/components/basic/button/BtnPrivate.vue";
  import Error from '@/components/basic/Error.vue';

  import { GoogleMap, Marker, MarkerCluster, InfoWindow } from 'vue3-google-map';

  import { ColorPicker } from "vue3-colorpicker";
  import "vue3-colorpicker/style.css";

  const router = useRouter();
  const store = useAppStore();

  useMeta({ title: router.currentRoute.value.meta.title });
</script>
