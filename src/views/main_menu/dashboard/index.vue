<template>
  <div>
    <div class="flex items-center whitespace-nowrap">
      <h5
        class="font-semibold capitalize text-lg dark:text-white-light">
        Hi, <span class="font-bold">John Doe</span> welcome to Smartiv
      </h5>
    </div>

    <div class="mt-[24px]">
      <div class="flex-1 grid grid-cols-1 sm:grid-cols-5 gap-6 mb-6">
        <div class="panel p-4 pb-3 shadow-sm rounded-xl overflow-hidden">
          <div class="w-12 h-12 bg-[#E1F1FF] dark:bg-[#1a2941] rounded-br-xl absolute top-0 left-0">
            <div class="w-12 h-12 flex items-center justify-center">
              <img
                src="/assets/images/dashboard/new/total_device.svg"
                alt=""
                class="w-6 h-6 mx-auto" />
            </div>
          </div>

          <div class="text-base font-semibold ml-12 mb-4">
            Total Device
          </div>

          <div class="text-right">
            <div class="mb-0.5 text-transparent">
              -
            </div>

            <div class="text-lg font-bold">
              127
            </div>
          </div>
        </div>

        <div class="panel p-4 pb-3 shadow-sm rounded-xl overflow-hidden">
          <div class="w-12 h-12 bg-[#E1F1FF] dark:bg-[#1a2941] rounded-br-xl absolute top-0 left-0">
            <div class="w-12 h-12 flex items-center justify-center">
              <img
                src="/assets/images/dashboard/new/billing.svg"
                alt=""
                class="w-6 h-6 mx-auto" />
            </div>
          </div>

          <div class="text-base font-semibold ml-12 mb-4">
            Billing
          </div>

          <div class="text-right">
            <div class="mb-0.5">
              Overdue
            </div>

            <div class="text-lg font-bold">
              {{ $format.currency(127000) }}
            </div>
          </div>
        </div>

        <div class="panel p-4 pb-3 shadow-sm rounded-xl overflow-hidden">
          <div class="w-12 h-12 bg-[#E1F1FF] dark:bg-[#1a2941] rounded-br-xl absolute top-0 left-0">
            <div class="w-12 h-12 flex items-center justify-center">
              <img
                src="/assets/images/dashboard/new/app_in_app.svg"
                alt=""
                class="w-6 h-6 mx-auto" />
            </div>
          </div>

          <div class="text-base font-semibold ml-12 mb-4">
            App In App
          </div>

          <div class="text-right">
            <div class="flex justify-end space-x-6">
              <div>
                <div class="mb-0.5">
                  Total
                </div>

                <div class="text-lg font-bold">
                  14
                </div>
              </div>

              <div>
                <div class="mb-0.5">
                  Active
                </div>

                <div class="text-lg font-bold">
                  8
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="panel p-4 pb-3 shadow-sm rounded-xl overflow-hidden">
          <div class="w-12 h-12 bg-[#E1F1FF] dark:bg-[#1a2941] rounded-br-xl absolute top-0 left-0">
            <div class="w-12 h-12 flex items-center justify-center">
              <img
                src="/assets/images/dashboard/new/occupancy.svg"
                alt=""
                class="w-6 h-6 mx-auto" />
            </div>
          </div>

          <div class="text-base font-semibold ml-12 mb-4">
            Occupancy
          </div>

          <div class="text-right">
            <div class="flex justify-end space-x-6">
              <div>
                <div class="mb-0.5">
                  Occupied
                </div>

                <div class="text-lg font-bold">
                  3
                </div>
              </div>

              <div>
                <div class="mb-0.5">
                  Ready
                </div>

                <div class="text-lg font-bold">
                  8
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="panel p-4 pb-3 shadow-sm rounded-xl overflow-hidden">
          <div class="w-12 h-12 bg-[#E1F1FF] dark:bg-[#1a2941] rounded-br-xl absolute top-0 left-0">
            <div class="w-12 h-12 flex items-center justify-center">
              <img
                src="/assets/images/dashboard/new/device_status.svg"
                alt=""
                class="w-6 h-6 mx-auto" />
            </div>
          </div>

          <div class="text-base font-semibold ml-12 mb-4">
            Device Status
          </div>

          <div class="text-right">
            <div class="flex justify-end space-x-6">
              <div>
                <div class="mb-0.5 text-success">
                  On
                </div>

                <div class="text-lg font-bold">
                  100
                </div>
              </div>

              <div>
                <div class="mb-0.5 text-danger">
                  Off
                </div>

                <div class="text-lg font-bold">
                  27
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex-1 grid grid-cols-1 sm:grid-cols-5 gap-6 mb-6">
        <div class="panel p-4 w-full h-[300px] shadow-sm rounded-xl overflow-hidden col-span-2">
          <div class="flex items-center justify-center w-full h-full">
            BANNER
          </div>
        </div>

        <div class="panel p-4 w-full h-[300px] shadow-sm rounded-xl overflow-hidden col-span-3">
          <div class="w-12 h-12 bg-[#E1F1FF] dark:bg-[#1a2941] rounded-br-xl absolute top-0 left-0">
            <div class="w-12 h-12 flex items-center justify-center">
              <img
                src="/assets/images/dashboard/new/chart.svg"
                alt=""
                class="w-6 h-6 mx-auto" />
            </div>
          </div>

          <div class="flex justify-between ml-12 mb-4">
            <div class="text-base font-semibold">
              Usage Statistic
            </div>

            <div class="dropdown">
              <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'" offsetDistance="0">
                <button
                  type="button"
                  class="flex justify-center items-center hover:text-primary">
                  Last 12 Day

                  <IconCaretDown class="w-4 h-4 ml-1.5" />
                </button>

                <template #content="{ close }">
                  <ul @click="close()" class="whitespace-nowrap">
                    <li>
                      <a href="javascript:;">
                        Content Here
                      </a>
                    </li>
                  </ul>
                </template>
              </Popper>
            </div>
          </div>

          <div class="flex items-center justify-center w-full h-[190px]">
            CHART
          </div>
        </div>
      </div>

      <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div class="panel p-4 w-full h-[300px] shadow-sm rounded-xl overflow-hidden">
          <div class="w-12 h-12 bg-[#E1F1FF] dark:bg-[#1a2941] rounded-br-xl absolute top-0 left-0">
            <div class="w-12 h-12 flex items-center justify-center">
              <img
                src="/assets/images/dashboard/new/notif.svg"
                alt=""
                class="w-6 h-6 mx-auto" />
            </div>
          </div>

          <div class="flex justify-between ml-12 mb-4">
            <div class="text-base font-semibold">
              Today Food Order
            </div>

            <div class="text-primary">
              See all
            </div>
          </div>

          <div class="flex items-center justify-center w-full h-[190px]">
            TODAY FOOD ORDER
          </div>
        </div>

        <div class="panel p-4 w-full h-[300px] shadow-sm rounded-xl overflow-hidden">
          <div class="w-12 h-12 bg-[#E1F1FF] dark:bg-[#1a2941] rounded-br-xl absolute top-0 left-0">
            <div class="w-12 h-12 flex items-center justify-center">
              <img
                src="/assets/images/dashboard/new/notif.svg"
                alt=""
                class="w-6 h-6 mx-auto" />
            </div>
          </div>

          <div class="flex justify-between ml-12 mb-4">
            <div class="text-base font-semibold">
              Today Service Order
            </div>

            <div class="text-primary">
              See all
            </div>
          </div>

          <div class="flex items-center justify-center w-full h-[190px]">
            TODAY SERVICE ORDER
          </div>
        </div>
      </div>

      <div class="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div class="panel p-4 w-full h-[300px] shadow-sm rounded-xl overflow-hidden">
          <div class="w-12 h-12 bg-[#E1F1FF] dark:bg-[#1a2941] rounded-br-xl absolute top-0 left-0">
            <div class="w-12 h-12 flex items-center justify-center">
              <img
                src="/assets/images/dashboard/new/notif.svg"
                alt=""
                class="w-6 h-6 mx-auto" />
            </div>
          </div>

          <div class="flex justify-between ml-12 mb-4">
            <div class="text-base font-semibold">
              Notifications
            </div>

            <div class="text-primary">
              See all
            </div>
          </div>

          <div class="flex items-center justify-center w-full h-[190px]">
            NOTIFICATIONS
          </div>
        </div>

        <div class="panel p-4 w-full h-[300px] shadow-sm rounded-xl overflow-hidden">
          <div class="w-12 h-12 bg-[#E1F1FF] dark:bg-[#1a2941] rounded-br-xl absolute top-0 left-0">
            <div class="w-12 h-12 flex items-center justify-center">
              <img
                src="/assets/images/dashboard/new/clock.svg"
                alt=""
                class="w-6 h-6 mx-auto" />
            </div>
          </div>

          <div class="flex justify-between ml-12 mb-4">
            <div class="text-base font-semibold">
              Last Active Device
            </div>

            <div class="text-primary">
              See all
            </div>
          </div>

          <div class="flex items-center justify-center w-full h-[190px]">
            LAST ACTIVE DEVICE
          </div>
        </div>

        <div class="panel p-4 w-full h-[300px] shadow-sm rounded-xl overflow-hidden">
          <div class="w-12 h-12 bg-[#E1F1FF] dark:bg-[#1a2941] rounded-br-xl absolute top-0 left-0">
            <div class="w-12 h-12 flex items-center justify-center">
              <img
                src="/assets/images/dashboard/new/list.svg"
                alt=""
                class="w-6 h-6 mx-auto" />
            </div>
          </div>

          <div class="flex justify-between ml-12 mb-4">
            <div class="text-base font-semibold">
              Log Activity
            </div>

            <div class="text-primary">
              See all
            </div>
          </div>

          <div class="flex items-center justify-center w-full h-[190px]">
            LOG ACTIVITY
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

  import IconCaretDown from '@/components/icon/icon-caret-down.vue';

  const router = useRouter();
  const store = useAppStore();

  useMeta({ title: router.currentRoute.value.meta.title });
</script>
