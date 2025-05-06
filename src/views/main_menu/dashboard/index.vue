<template>
  <div>
    <!-- <div class="flex items-center whitespace-nowrap">
      <h5
        class="font-semibold capitalize text-lg dark:text-white-light">
        Hi, <span class="font-bold">{{ auth?.user?.value?.name }}</span> welcome to Smartiv
      </h5>
    </div> -->

    <div class="">
      <div class="flex-1 grid grid-cols-1 sm:grid-cols-5 gap-6 mb-6">
        <div class="panel p-4 pb-3 shadow-none rounded-xl overflow-hidden h-[150px]">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-[#E9EDF9] dark:bg-[#1a2941] rounded-full">
              <div class="w-10 h-10 flex items-center justify-center">
                <img
                  src="/assets/images/dashboard/new/total_device.svg"
                  alt=""
                  class="w-5 h-5 mx-auto" />
              </div>
            </div>
  
            <div class="text-base font-semibold">
              Total Device
            </div>
          </div>

          <div class="absolute bottom-3 right-4">
            <div class="text-xl font-bold">
              127
            </div>
          </div>
        </div>

        <div class="panel p-4 pb-3 shadow-none rounded-xl overflow-hidden h-[150px]">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-[#E9EDF9] dark:bg-[#1a2941] rounded-full">
              <div class="w-10 h-10 flex items-center justify-center">
                <img
                  src="/assets/images/dashboard/new/billing.svg"
                  alt=""
                  class="w-5 h-5 mx-auto" />
              </div>
            </div>

            <div class="text-base font-semibold">
              Billing
            </div>
          </div>

          <div class="absolute bottom-3 right-4">
            <div class="mb-0.5 text-gray-400 font-semibold">
              Overdue
            </div>

            <div class="text-xl font-bold">
              {{ $format.currency(127000) }}
            </div>
          </div>
        </div>

        <div class="panel p-4 pb-3 shadow-none rounded-xl overflow-hidden h-[150px]">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-[#E9EDF9] dark:bg-[#1a2941] rounded-full">
              <div class="w-10 h-10 flex items-center justify-center">
                <img
                  src="/assets/images/dashboard/new/app_in_app.svg"
                  alt=""
                  class="w-5 h-5 mx-auto" />
              </div>
            </div>

            <div class="text-base font-semibold">
              App In App
            </div>
          </div>

          <div class="absolute bottom-3 right-4">
            <div class="flex justify-end space-x-6">
              <div class="flex items-center space-x-2.5">
                <div class="mb-0.5 text-gray-400 font-semibold">
                  Total
                </div>

                <div class="text-xl font-bold">
                  14
                </div>
              </div>

              <div class="flex items-center space-x-2.5">
                <div class="mb-0.5 text-gray-400 font-semibold">
                  Active
                </div>

                <div class="text-xl font-bold">
                  8
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="panel p-4 pb-3 shadow-none rounded-xl overflow-hidden h-[150px]">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-[#E9EDF9] dark:bg-[#1a2941] rounded-full">
              <div class="w-10 h-10 flex items-center justify-center">
                <img
                  src="/assets/images/dashboard/new/occupancy.svg"
                  alt=""
                  class="w-5 h-5 mx-auto" />
              </div>
            </div>

            <div class="text-base font-semibold">
              Occupancy
            </div>
          </div>

          <div class="absolute bottom-3 right-4">
            <div class="flex justify-end space-x-6">
              <div class="flex items-center space-x-2.5">
                <div class="mb-0.5 text-gray-400 font-semibold">
                  Occupied
                </div>

                <div class="text-xl font-bold">
                  3
                </div>
              </div>

              <div class="flex items-center space-x-2.5">
                <div class="mb-0.5 text-gray-400 font-semibold">
                  Ready
                </div>

                <div class="text-xl font-bold">
                  8
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="panel p-4 pb-3 shadow-none rounded-xl overflow-hidden">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-[#E9EDF9] dark:bg-[#1a2941] rounded-full">
              <div class="w-10 h-10 flex items-center justify-center">
                <img
                  src="/assets/images/dashboard/new/device_status.svg"
                  alt=""
                  class="w-5 h-5 mx-auto" />
              </div>
            </div>

            <div class="text-base font-semibold">
              Device Status
            </div>
          </div>

          <div class="absolute bottom-3 right-4">
            <div class="flex justify-end space-x-6">
              <div class="flex items-center space-x-2.5">
                <div class="mb-0.5 text-success font-semibold">
                  On
                </div>

                <div class="text-xl font-bold">
                  100
                </div>
              </div>

              <div class="flex items-center space-x-2.5">
                <div class="mb-0.5 text-danger font-semibold">
                  Off
                </div>

                <div class="text-xl font-bold">
                  27
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex-1 grid grid-cols-1 sm:grid-cols-5 gap-6 mb-6">
        <div class="panel p-0 w-full h-[300px] shadow-none rounded-xl overflow-hidden col-span-2">
          <div class="flex items-center justify-center w-full h-full">
            <img
              src="/assets/images/dashboard/new/banner_promo.svg"
              alt=""
              class="w-full h-full object-cover" />
          </div>
        </div>

        <div class="panel p-0 w-full h-[300px] shadow-none rounded-xl overflow-hidden col-span-3">
          <div class="flex justify-between p-4 pb-0">
            <div class="text-base font-semibold">
              Usage Statistic
            </div>

            <div class="dropdown p-1.5 px-2 border border-gray-200 dark:border-gray-700 rounded-lg">
              <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'" offsetDistance="0">
                <button
                  type="button"
                  class="flex justify-center items-center hover:text-primary">
                  Last 12 Days

                  <IconCaretDown class="w-3.5 h-3.5 ml-1.5" />
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

          <div class="!w-full h-[190px]">
            <apexchart 
              height="245" :options="uniqueVisitor" :series="uniqueVisitorSeries" class="overflow-hidden">
              <div class="min-h-[245px] grid place-content-center bg-gray-100 dark:bg-dark dark:bg-opacity-[0.08]">
                <span class="animate-spin border-2 border-black dark:border-white !border-l-transparent rounded-full w-5 h-5 inline-flex"></span>
              </div>
            </apexchart>
          </div>
        </div>
      </div>

      <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div class="panel p-4 w-full min-h-[300px] shadow-none rounded-xl overflow-hidden">
          <div class="flex justify-between mb-4">
            <div class="text-base font-semibold">
              Today Food Order
            </div>

            <div class="text-primary">
              See all
            </div>
          </div>

          <div class="w-full">
            <div class="flex-1 grid grid-cols-1 sm:grid-cols-5 gap-6">
              <div class="col-span-2">
                <apexchart
                  height="200"
                  :options="order"
                  :series="orderSeries"
                  class="bg-white dark:bg-black rounded-lg overflow-hidden">
                  <div class="min-h-[200px] grid place-content-center bg-gray-100 dark:bg-dark dark:bg-opacity-[0.08]">
                    <span
                      class="animate-spin border-2 border-black dark:border-white !border-l-transparent rounded-full w-5 h-5 inline-flex">
                    </span>
                  </div>
                </apexchart>

                <div>
                  <div class="flex-1 grid grid-cols-3 gap-3 mt-6">
                    <div v-for="(item, index) in order.labels" :key="index" class="flex justify-center items-center space-x-2">
                      <div class="w-2 h-2 rounded-full" :style="`background: ${order.colors[index]}`"></div>

                      <div>
                        <span class="text-xs font-semibold line-clamp-1">
                          {{ item }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-span-3 sm:pl-6">
                <table>
                  <thead class="bh-sticky bh-top-0 bh-z-10">
                    <tr>
                      <th class="!w-[100px] !font-semibold">
                        Room
                      </th>
                      <th class="!w-[200px] !font-semibold">
                        Date Time
                      </th>
                      <th class="!w-[100px] !font-semibold">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="(item, index) in 4"
                      class="!border-none">
                      <td class="text-xs">
                        {{ `50${index + 1}` }}
                      </td>
                      <td class="text-xs">
                        {{ $format.date('2023-11-01 12:00:00') }} - {{ $format.time('2023-11-01 12:00:00') }}
                      </td>
                      <td class="text-xs">
                        <div 
                          class="w-full text-xs font-semibold rounded-md text-center py-1"
                          :class="(index + 1) % 2 !== 0 ? 'bg-warning/20 text-warning' : 'bg-success/20 text-success'">
                          {{ (index + 1) % 2 !== 0 ? 'Pending' : 'Success' }}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="panel p-4 w-full min-h-[300px] shadow-none rounded-xl overflow-hidden">
          <div class="flex justify-between mb-4">
            <div class="text-base font-semibold">
              Today Service Order
            </div>

            <div class="text-primary">
              See all
            </div>
          </div>

          <div class="w-full">
            <div class="flex-1 grid grid-cols-1 sm:grid-cols-5 gap-6">
              <div class="col-span-2">
                <apexchart
                  height="200"
                  :options="order"
                  :series="orderSeries"
                  class="bg-white dark:bg-black rounded-lg overflow-hidden">
                  <div class="min-h-[200px] grid place-content-center bg-gray-100 dark:bg-dark dark:bg-opacity-[0.08]">
                    <span
                      class="animate-spin border-2 border-black dark:border-white !border-l-transparent rounded-full w-5 h-5 inline-flex">
                    </span>
                  </div>
                </apexchart>

                <div>
                  <div class="flex-1 grid grid-cols-3 gap-3 mt-6">
                    <div v-for="(item, index) in order.labels" :key="index" class="flex justify-center items-center space-x-2">
                      <div class="w-2 h-2 rounded-full" :style="`background: ${order.colors[index]}`"></div>

                      <div>
                        <span class="text-xs font-semibold line-clamp-1">
                          {{ item }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-span-3 sm:pl-6">
                <table>
                  <thead class="bh-sticky bh-top-0 bh-z-10">
                    <tr>
                      <th class="!w-[100px] !font-semibold">
                        Room
                      </th>
                      <th class="!w-[200px] !font-semibold">
                        Date Time
                      </th>
                      <th class="!w-[100px] !font-semibold">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="(item, index) in 4"
                      class="!border-none">
                      <td class="text-xs">
                        {{ `50${index + 1}` }}
                      </td>
                      <td class="text-xs">
                        {{ $format.date('2023-11-01 12:00:00') }} - {{ $format.time('2023-11-01 12:00:00') }}
                      </td>
                      <td class="text-xs">
                        <div 
                          class="w-full text-xs font-semibold rounded-md text-center py-1"
                          :class="(index + 1) % 2 !== 0 ? 'bg-warning/20 text-warning' : 'bg-success/20 text-success'">
                          {{ (index + 1) % 2 !== 0 ? 'Pending' : 'Success' }}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div class="panel p-4 w-full min-h-[300px] shadow-none rounded-xl overflow-hidden">
          <div class="flex justify-between mb-4">
            <div class="text-base font-semibold">
              Notifications
            </div>

            <div class="text-primary">
              See all
            </div>
          </div>

          <div class="w-full min-h-[190px]">
            <table>
              <thead class="bh-sticky bh-top-0 bh-z-10">
                <tr>
                  <th class="!w-[100px] !font-semibold">
                    Device
                  </th>
                  <th class="!w-[200px] !font-semibold">
                    Date Time
                  </th>
                  <th class="!w-[200px] !font-semibold">
                    Description
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(item, index) in 5"
                  class="!border-none">
                  <td class="text-xs">
                    {{ `50${index + 1}` }}
                  </td>
                  <td class="text-xs">
                    {{ $format.date('2023-11-01 12:00:00') }} - {{ $format.time('2023-11-01 12:00:00') }}
                  </td>
                  <td class="text-xs">
                    <div class="w-full">
                      <span class="line-clamp-1">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="panel p-4 w-full min-h-[300px] shadow-none rounded-xl overflow-hidden">
          <div class="flex justify-between mb-4">
            <div class="text-base font-semibold">
              Last Active Device
            </div>

            <div class="text-primary">
              See all
            </div>
          </div>

          <div class="w-full min-h-[190px]">
            <table>
              <thead class="bh-sticky bh-top-0 bh-z-10">
                <tr>
                  <th class="!w-[100px] !font-semibold">
                    Device
                  </th>
                  <th class="!w-[200px] !font-semibold">
                    Start Time
                  </th>
                  <th class="!w-[200px] !font-semibold">
                    End Time
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(item, index) in 5"
                  class="!border-none">
                  <td class="text-xs">
                    <div class="flex items-center space-x-2">
                      <div class="w-2 h-2 rounded-full" :class="(index + 1) % 2 !== 0 ? 'bg-success' : 'bg-danger'"></div>

                      <div>
                        {{ `50${index + 1}` }}
                      </div>
                    </div>
                  </td>
                  <td class="text-xs">
                    {{ $format.date('2023-11-01 12:00:00') }} - {{ $format.time('2023-11-01 12:00:00') }}
                  </td>
                  <td class="text-xs">
                    {{ $format.date('2023-11-01 12:00:00') }} - {{ $format.time('2023-11-01 12:00:00') }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="panel p-4 w-full min-h-[300px] shadow-none rounded-xl overflow-hidden">
          <div class="flex justify-between mb-4">
            <div class="text-base font-semibold">
              Log Activity
            </div>

            <div class="text-primary">
              See all
            </div>
          </div>

          <div class="w-full min-h-[190px]">
            <table>
              <thead class="bh-sticky bh-top-0 bh-z-10">
                <tr>
                  <th class="!w-[100px] !font-semibold">
                    Device
                  </th>
                  <th class="!w-[200px] !font-semibold">
                    Date Time
                  </th>
                  <th class="!w-[200px] !font-semibold">
                    Description
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(item, index) in 5"
                  class="!border-none">
                  <td class="text-xs">
                    {{ `50${index + 1}` }}
                  </td>
                  <td class="text-xs">
                    {{ $format.date('2023-11-01 12:00:00') }} - {{ $format.time('2023-11-01 12:00:00') }}
                  </td>
                  <td class="text-xs">
                    <div class="w-full">
                      <span class="line-clamp-1">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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

  import apexchart from 'vue3-apexcharts';

  import moment, { months } from "moment";
  import appFormat from "@/app-format";

  const auth = useAuth();
  const store = useAppStore();
  const router = useRouter();

  useMeta({ title: router.currentRoute.value.meta.title });


  const uniqueVisitor = computed(() => {
    const isDark: boolean = store.theme === 'dark' || store.isDarkMode ? true : false;
    const isRtl = store.rtlClass === 'rtl' ? true : false;

    return {
      chart: {
        height: 245,
        type: 'line',
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: false,
        },
        stacked: false, // group bar true / false
      },
      dataLabels: {
        enabled: false,
        // enabledOnSeries: [1]
      },
      stroke: {
        // width: [0, 4], // or width: 2,
        // colors: ['transparent'],
        width: 2,
        colors: ['transparent'],
      },
      colors: ['#1C5991', '#71A6C0'],
      dropShadow: {
        enabled: true,
        blur: 3,
        color: '#515365',
        opacity: 0.4,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%',
          borderRadius: 2,
        },
      },
      legend: {
        show: false,
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '14px',
        itemMargin: {
          horizontal: 8,
          vertical: 8,
        },
      },
      grid: {
        borderColor: isDark ? '#191e3a' : '#e0e6ed',
        padding: {
          left: 20,
          right: 20,
        },
      },
      xaxis: {
        categories: ['20-11', '21-11', '22-11', '23-11', '24-11', '25-11', '26-11', '27-11', '28-11', '29-11', '30-11', '01-12'],
        axisBorder: {
          show: true,
          color: isDark ? '#3b3f5c' : '#e0e6ed',
        },
      },
      yaxis: {
        // tickAmount: 6,
        // opposite: isRtl ? true : false,
        // labels: {
        //   offsetX: isRtl ? -10 : 0,
        // },
        tickAmount: 7,
        labels: {
          formatter: (value: number) => {
            return `${appFormat.numeric(value)}`;
          },
          offsetX: isRtl ? -10 : 0,
          offsetY: 0,
          style: {
            // fontSize: '12px',
            // cssClass: 'apexcharts-yaxis-title',
          },
        },
        opposite: isRtl ? true : false,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: isDark ? 'dark' : 'light',
          type: 'vertical',
          shadeIntensity: 0.3,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 0.8,
          stops: [100, 100],
        },
      },
      tooltip: {
        shared: true, // group tooltip
        intersect: false,
        marker: {
          show: true,
        },
        y: {
          formatter: (val: number) => {
            return `${appFormat.numeric(val)}`;
          },
        },
      },
    };
  });

  const uniqueVisitorSeries = ref([
    {
      name: 'Dark',
      data: [10, 20, 15, 25, 30, 35, 40, 45, 50, 55, 60, 65],
      type: 'column',
    },
    {
      name: 'Light',
      data: [20, 30, 25, 35, 40, 45, 50, 55, 60, 65, 70, 75],
      type: 'column',
    },
  ]);


  const order = computed(() => {
    const isDark = store.theme === 'dark' || store.isDarkMode ? true : false;
    return {
      chart: {
        type: 'donut',
        height: 200,
        fontFamily: 'Nunito, sans-serif',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 5,
        colors: isDark ? 'transparent' : 'transparent',
      },
      colors: isDark ? ['#07DBFA', '#6FD195', '#FFAE4C', '#7086FD', '#1F93FF', '#C94D45'] : ['#07DBFA', '#6FD195', '#FFAE4C', '#7086FD', '#1F93FF', '#C94D45'],
      legend: {
        show: false,
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '14px',
        markers: {
          width: 10,
          height: 10,
          offsetX: -2,
        },
        height: 50,
        offsetY: 10,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '75%',
            background: 'transparent',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '20px',
                offsetY: -10,
              },
              value: {
                show: true,
                fontSize: '24px',
                color: isDark ? '#bfc9d4' : undefined,
                offsetY: 12,
                formatter: (val: any) => {
                  return val;
                },
              },
              total: {
                show: true,
                label: 'Total Order',
                color: '#888ea8',
                fontSize: '20px',
                formatter: (w: any) => {
                  return w.globals.seriesTotals.reduce(function (a: any, b: any) {
                    return a + b;
                  }, 0);
                },
              },
            },
          },
        },
      },
      labels: ['Dessert', 'Snack', 'Beverages', 'Main Course', 'Appertizer', 'AfterEffect'],
      states: {
        hover: {
          filter: {
            type: 'none',
            value: 0.15,
          },
        },
        active: {
          filter: {
            type: 'none',
            value: 0.15,
          },
        },
      },
    };
  });

  const orderSeries = ref([30, 20, 30, 40, 20, 10]);
</script>
