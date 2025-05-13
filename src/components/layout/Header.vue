<template>
  <header class="z-40" :class="{ dark: store.semidark && store.menu === 'horizontal' }">
    <div class="shadow-none">
      <div class="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-[#0e1726]">
        <div class="horizontal-logo flex lg:hidden justify-between items-center ltr:mr-2 rtl:ml-2">
          <router-link
            to="/">
            <img 
              class="h-auto w-full max-w-32 ltr:-ml-1 rtl:-mr-1 inline"
              src="/assets/images/logo_full.png"
              alt="" />
          </router-link>

          <a
            href="javascript:;"
            class="collapse-icon flex-none dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex lg:hidden ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
            @click="store.toggleSidebar()">
            <icon-menu class="w-5 h-5" />
          </a>
        </div>

        <div
          class="sm:flex-1 ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex items-center space-x-1.5 lg:space-x-3 rtl:space-x-reverse dark:text-[#d0d2d6]">
          <div class="sm:ltr:mr-auto sm:rtl:ml-auto">
            <div class="flex xs:hidden font-semibold capitalize text-lg dark:text-white-light">
              Hi {{ auth?.user?.value?.name }}!
            </div>

            <!-- <form
              class="sm:relative absolute inset-x-0 sm:top-0 top-1/2 sm:translate-y-0 -translate-y-1/2 sm:mx-0 mx-4 z-10 sm:block hidden"
              :class="{ '!block': search }"
              @submit.prevent="search = false">
              <div class="relative">
                <input
                  type="text"
                  class="form-input ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                  placeholder="Cari..."/>

                <button type="button" class="absolute w-9 h-9 inset-0 ltr:right-auto rtl:left-auto appearance-none peer-focus:text-primary">
                  <icon-search class="mx-auto" />
                </button>

                <button
                  type="button"
                  class="hover:opacity-80 sm:hidden block absolute top-1/2 -translate-y-1/2 ltr:right-2 rtl:left-2"
                  @click="search = false">
                  <icon-x-circle />
                </button>
              </div>
            </form> -->

            <!-- <button
              type="button"
              class="search_btn sm:hidden p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
              @click="search = !search">
              <icon-search class="w-4.5 h-4.5 mx-auto dark:text-[#d0d2d6]" />
            </button> -->
          </div>

          <!-- emergency -->
          <div class="dropdown shrink-0">
            <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'" offsetDistance="8">
              <button
                @click="getNotifs(true)"

                type="button"
                class="flex items-center space-x-2 p-2 px-3 rounded-xl bg-[#FAECEC] dark:bg-dark/40 hover:bg-[#C82B2B]/15 dark:hover:bg-dark/60"
                style="position: relative; top: 0px;">
                <span class="text-xs font-bold text-[#C82B2B]">
                  Emergency
                </span>

                <img 
                  class="h-4 w-4"
                  src="/assets/figma/icon_emergency.svg"
                  alt="" />
              </button>
            </Popper>
          </div>

          <!-- announcement -->
          <div class="dropdown shrink-0">
            <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'" offsetDistance="8">
              <button
                @click="getNotifs(true)"

                type="button"
                class="relative flex items-center space-x-2 p-2 px-3 pr-[38px] rounded-xl bg-[#2A48961F] dark:bg-dark/40 hover:bg-[#2A48961F]/20 dark:hover:bg-dark/60"
                style="position: relative; top: 0px;">
                <img 
                  class="h-4 w-4"
                  src="/assets/figma/icon_announcement.svg"
                  alt="" />

                <span class="text-xs font-bold text-primary">
                  Announcement
                </span>

                <span class="rounded-full bg-[#FFB020] text-black text-[8px] font-semibold w-5 h-5 flex items-center justify-center absolute right-2.5">
                  12
                </span>
              </button>
            </Popper>
          </div>

          <!-- themes -->
          <div class="">
            <a
              href="javascript:;"
              v-show="store.theme === 'light'"
              class="flex items-center p-2 rounded-xl bg-[#2A48961F] dark:bg-dark/40 hover:text-primary hover:bg-[#2A48961F]/20 dark:hover:bg-dark/60"
              @click="store.toggleTheme('dark')">
              <icon-sun class="h-4 w-4" />
            </a>

            <a
              href="javascript:;"
              v-show="store.theme === 'dark'"
              class="flex items-center p-2 rounded-xl bg-[#2A48961F] dark:bg-dark/40 hover:text-primary hover:bg-[#2A48961F]/20 dark:hover:bg-dark/60"
              @click="store.toggleTheme('light')">
              <icon-moon class="h-4 w-4" />
            </a>
          </div>

          <!-- languages -->
          <div class="dropdown shrink-0 xs:hidden">
            <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'" offsetDistance="8">
              <button
                type="button"
                class="relative block p-2 rounded-xl bg-[#2A48961F] dark:bg-dark/40 hover:bg-[#2A48961F]/20 dark:hover:bg-dark/60"
                style="position: relative; top: 3px;">
                <img 
                  :src="currentFlag" 
                  alt="flag" 
                  class="h-4 w-4 object-cover rounded-full" />
              </button>

              <template #content="{ close }">
                <ul class="!px-2 text-dark dark:text-white-dark font-semibold dark:text-white-light/90 w-[200px]">
                  <template
                    v-for="item in countries"
                    :key="item.code">
                    <li>
                      <button
                        @click="doTranslation(item), close()"

                        type="button"
                        class="w-full text-gray-400 hover:text-primary"
                        :class="{ 'text-primary': languages.code === item.code }">
                        <img
                          class="w-5 h-5 object-cover rounded-full"
                          :src="`/assets/images/flags/${item.flag}.svg`"
                          alt="" />

                        <span class="capitalize ltr:ml-3 rtl:mr-3">
                          {{ item.title }}
                        </span>
                      </button>
                    </li>
                  </template>
                </ul>
              </template>
            </Popper>
          </div>

          <!-- email -->
          <div class="dropdown shrink-0 xs:hidden">
            <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'" offsetDistance="8">
              <button
                type="button"
                class="relative block p-2 rounded-xl bg-[#2A48961F] dark:bg-dark/40 hover:bg-[#2A48961F]/20 dark:hover:bg-dark/60"
                style="position: relative; top: 3px;">
                <img 
                  class="h-4 w-4"
                  src="/assets/figma/icon_chat.svg"
                  alt="" />
              </button>

              <template #content="{ close }">
                <ul class="top-11 !py-0 text-dark dark:text-white-dark w-[300px] sm:w-[375px] text-xs">
                  <li class="mb-5">
                    <div class="overflow-hidden relative rounded-t-md !p-5 text-white">
                      <div
                        class="absolute h-full w-full bg-[url('/assets/images/menu-header.jpg')] bg-no-repeat bg-center bg-cover inset-0">
                      </div>

                      <h4 class="font-semibold relative z-10 text-lg">Messages</h4>
                    </div>
                  </li>

                  <template v-for="msg in messages" :key="msg.id">
                    <li>
                      <div class="flex items-center py-3 px-5">
                        <div v-html="msg.image"></div>

                        <span class="px-3 dark:text-gray-500">
                          <div class="font-semibold text-sm dark:text-white-light/90" v-text="msg.title"></div>
                          <div v-text="msg.message"></div>
                        </span>

                        <span
                          class="font-semibold bg-white-dark/20 rounded text-dark/60 px-1 ltr:ml-auto rtl:mr-auto whitespace-pre dark:text-white-dark ltr:mr-2 rtl:ml-2"
                          v-text="msg.time">
                        </span>

                        <button type="button" class="text-neutral-300 hover:text-danger" @click="removeMessage(msg.id)">
                          <icon-x-circle />
                        </button>
                      </div>
                    </li>
                  </template>

                  <template v-if="messages.length">
                    <li class="border-t border-white-light text-center dark:border-white/10 mt-5">
                      <div
                        class="flex items-center py-4 px-5 text-primary font-semibold group dark:text-gray-400 justify-center cursor-pointer"
                        @click="close()">
                        <span class="group-hover:underline ltr:mr-1 rtl:ml-1">VIEW ALL ACTIVITIES</span>

                        <icon-arrow-left class="group-hover:translate-x-1 transition duration-300 ltr:ml-1 rtl:mr-1" />
                      </div>
                    </li>
                  </template>

                  <template v-if="!messages.length">
                    <li class="mb-5">
                      <div class="!grid place-content-center hover:!bg-transparent text-lg min-h-[200px]">
                        <div class="mx-auto ring-4 ring-primary/30 rounded-full mb-4 text-primary">
                          <icon-info-circle :fill="true" class="w-10 h-10" />
                        </div>

                        No data available.
                      </div>
                    </li>
                  </template>
                </ul>
              </template>
            </Popper>
          </div>

          <!-- notification -->
          <div class="dropdown shrink-0">
            <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'" offsetDistance="8">
              <button
                @click="getNotifs(true)"

                type="button"
                class="relative block p-2 rounded-xl bg-[#2A48961F] dark:bg-dark/40 hover:bg-[#2A48961F]/20 dark:hover:bg-dark/60"
                style="position: relative; top: 3px;">
                <img 
                  class="h-4 w-4"
                  src="/assets/figma/icon_bell.svg"
                  alt="" />

                <span class="flex absolute w-3 h-3 ltr:right-[-5px] rtl:left-[-5px] top-[1px]">
                  <span
                    class="animate-ping absolute ltr:-left-[3px] rtl:-right-[3px] -top-[3px] inline-flex h-full w-full rounded-full bg-success/50 opacity-75"></span>
                  <span class="relative inline-flex rounded-full w-[6px] h-[6px] bg-success"></span>
                </span>
              </button>

              <template #content="{ close }">
                <ul class="!py-0 text-dark dark:text-white-dark w-[300px] sm:w-[350px] divide-y dark:divide-white/10">
                  <li>
                    <div class="flex items-center px-4 py-2 justify-between font-semibold">
                      <h4 class="text-lg">Notifikasi</h4>
                      <template v-if="rows_options_notifs.length">
                        <span class="badge bg-primary/80" v-text="rows_options_notifs.length + ' Baru'"></span>
                      </template>
                    </div>
                  </li>

                  <template v-if="isLoadingOptionsNotifs">
                    <div class="p-5">
                      <One :widths="98" />
                    </div>
                  </template>

                  <template v-if="!isLoadingOptionsNotifs">
                    <template v-for="(item, index) in rows_options_notifs" :key="index">
                      <li class="dark:text-white-light/90">
                        <div class="group flex items-center px-4 py-2">
                          <div class="grid place-content-center rounded">
                            <div class="w-12 h-12 relative">
                              <img
                                class="w-12 h-12 rounded-full object-cover"
                                :src="item?.meta_json_object?.image_url ? item?.meta_json_object?.image_url : `/assets/images/profile_default.png`"
                                alt=""/>
  
                              <span class="bg-success w-2 h-2 rounded-full block absolute right-[6px] bottom-0"></span>
                            </div>
                          </div>
  
                          <div class="ltr:pl-3 rtl:pr-3 flex flex-auto">
                            <div class="ltr:pr-3 rtl:pl-3">
                              <h6 v-html="item.message"></h6>
                              <span class="text-xs block font-normal dark:text-gray-500" v-text="item.create_datetime"></span>
                            </div>
  
                            <button
                              @click="toRead(item.id)"
  
                              type="button"
                              class="ltr:ml-auto rtl:mr-auto text-neutral-300 hover:text-danger opacity-0 group-hover:opacity-100">
                              <icon-x-circle />
                            </button>
                          </div>
                        </div>
                      </li>
                    </template>
                  </template>

                  <template v-if="rows_options_notifs.length">
                    <li>
                      <div class="p-4">
                        <button class="btn btn-primary block w-full btn-small" @click="close()">Baca Semua Notifikasi</button>
                      </div>
                    </li>
                  </template>

                  <template v-if="!isLoadingOptionsNotifs && !rows_options_notifs.length">
                    <li>
                      <div class="!grid place-content-center hover:!bg-transparent text-lg min-h-[200px]">
                        <div class="mx-auto ring-4 ring-primary/30 rounded-full mb-4 text-primary">
                            <icon-info-circle :fill="true" class="w-10 h-10" />
                        </div>

                        No data available.
                      </div>
                    </li>
                  </template>
                </ul>
              </template>
            </Popper>
          </div>

          <!-- setting -->
          <div class="dropdown shrink-0">
            <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'" offsetDistance="8">
              <button
                @click="getNotifs(true)"

                type="button"
                class="relative block p-2 rounded-xl bg-[#2A48961F] dark:bg-dark/40 hover:bg-[#2A48961F]/20 dark:hover:bg-dark/60"
                style="position: relative; top: 3px;">
                <img 
                  class="h-4 w-4"
                  src="/assets/figma/icon_setting.svg"
                  alt="" />
              </button>
            </Popper>
          </div>

          <!-- profile -->
          <div class="dropdown shrink-0">
            <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'" offsetDistance="8" class="!block">
              <button type="button" class="relative group block">
                <img
                  class="w-10 h-10 rounded-xl object-cover bg-gray-300 saturate-50 group-hover:saturate-100"
                  :src="auth?.user?.value?.image_url ? auth?.user?.value?.image_url : '/assets/images/profile_default.png'"
                  alt=""/>
              </button>

              <template #content="{ close }">
                <ul class="text-dark dark:text-white-dark !py-0 w-[230px] font-semibold dark:text-white-light/90 !rounded-xl">
                  <li>
                    <div class="flex items-center px-4 py-4">
                      <div class="flex-none">
                        <img
                          :src="auth?.user?.value?.image_url ? auth?.user?.value?.image_url : '/assets/images/profile_default.png'"
                          class="rounded-xl w-10 h-10 object-cover bg-gray-300" alt="" />
                      </div>

                      <div class="ltr:pl-3 rtl:pr-3 truncate">
                        <h4 class="text-base">
                          {{ auth?.user?.value?.name }}<span class="text-xs bg-success-light rounded text-success px-1 ltr:ml-2 rtl:ml-2">Pro</span>
                        </h4>

                        <a class="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white" href="javascript:;">
                          {{ auth?.user?.value?.email }}
                        </a>
                      </div>
                    </div>
                  </li>

                  <li>
                    <router-link
                      to="/profile"

                      class="dark:hover:text-white" @click="close()">
                      <icon-user class="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />

                      Profile
                    </router-link>
                  </li>

                  <li>
                    <router-link to="/apps/mailbox" class="dark:hover:text-white" @click="close()">
                      <icon-mail class="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />

                      Inbox
                    </router-link>
                  </li>

                  <li>
                    <router-link
                      to="#"
                      @click="auth.lock()"

                      class="dark:hover:text-white">
                      <icon-lock-dots class="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />

                      Lock Screen
                    </router-link>
                  </li>

                  <li class="border-t border-white-light dark:border-white-light/10">
                    <router-link
                      to="#"
                      @click="auth.logout()"

                      class="text-danger !py-3">
                      <icon-logout class="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 rotate-90 shrink-0" />

                      Logout
                    </router-link>
                  </li>
                </ul>
              </template>
            </Popper>
          </div>
        </div>
      </div>

      <!-- horizontal menu -->
      <One v-if="store.menu === 'horizontal' && !menus"
        :rows="6"
        :widths="100"
        :grids="true" />

      <ul
        class="horizontal horizontal-menu !shadow-none hidden py-1.5 font-semibold px-6 lg:space-x-1.5 xl:space-x-8 rtl:space-x-reverse bg-white border-t border-[#F0F3FF] dark:border-[#191e3a] dark:bg-[#0e1726] text-black dark:text-white-dark">
        <template
          v-for="(item, index) in menus"
          :key="index">
          <li v-if="item.children && item.children.length < 1 && item.checked"
            class="menu nav-item relative">
            <router-link
              :to="item.link?.toString() ?? ''"

              :class="{ active: router?.currentRoute?.value?.fullPath.includes(item.link?.toString() ?? '') }"
              class="nav-link">
              <div class="flex items-center">
                <!-- <component :is="icons[item.icon?.toString() ?? '']" class="shrink-0" /> -->
                <img 
                  :src="router?.currentRoute?.value?.fullPath.includes(item.link?.toString() ?? '') ? icons[item.icon_active?.toString() ?? ''] : icons[item.icon?.toString() ?? '']"
                  class="h-4 w-4" />

                <span class="px-2">{{ item.name }}</span>
              </div>
            </router-link>
          </li>

          <li v-if="item.children && item.children.length > 0 && item.checked"
            class="menu nav-item relative">
            <a
              href="javascript:;"

              :class="{ active: router?.currentRoute?.value?.fullPath.includes(item.link?.toString() ?? '') }"
              class="nav-link">
              <div class="flex items-center">
                <!-- <component :is="icons[item.icon?.toString() ?? '']" class="shrink-0" /> -->
                <img 
                  :src="router?.currentRoute?.value?.fullPath.includes(item.link?.toString() ?? '') ? icons[item.icon_active?.toString() ?? ''] : icons[item.icon?.toString() ?? '']"
                  class="h-4 w-4" />

                <span class="px-2">{{ item.name }}</span>
              </div>

              <div class="right_arrow">
                <icon-caret-down />
              </div>
            </a>

            <ul class="sub-menu">
              <template
                v-for="(item_sub, index_sub) in item.children"
                :key="index_sub">
                <li v-if="item_sub.children && item_sub.children.length < 1 && item_sub.checked">
                  <router-link
                    :to="item_sub.link?.toString() ?? ''"

                    :class="{ active: router?.currentRoute?.value?.fullPath.includes(item_sub.link?.toString() ?? '') }">
                    {{ item_sub.name }}
                  </router-link>
                </li>

                <template v-if="item_sub.children && item_sub.children.length > 0 && item_sub.checked">
                  <li 
                    :class="{ 'bg-primary text-white': router?.currentRoute?.value?.fullPath.includes(item_sub.link?.toString() ?? '') }"
                    class="relative">
                    <a 
                      :class="{ 'hover:!bg-primary hover:!text-white': router?.currentRoute?.value?.fullPath.includes(item_sub.link?.toString() ?? '') }"
                      href="javascript:;">
                      {{ item_sub.name }}

                      <div class="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
                        <icon-caret-down />
                      </div>
                    </a>

                    <ul
                      class="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
                      <template
                        v-for="(item_sub_child, index_sub_child) in item_sub.children"
                        :key="index_sub_child">
                        <li v-if="item_sub_child.children && item_sub_child.children.length > 0 && item_sub_child.checked"
                          :class="{ 'bg-primary text-white': router?.currentRoute?.value?.fullPath.includes(item_sub_child.link?.toString() ?? '') }"
                          class="relative">
                          <a 
                            :class="{ 'hover:!bg-primary hover:!text-white': router?.currentRoute?.value?.fullPath.includes(item_sub_child.link?.toString() ?? '') }"
                            href="javascript:;">
                            {{ item_sub_child.name }}

                            <div class="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
                              <icon-caret-down />
                            </div>
                          </a>

                          <ul
                            class="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
                            <li
                              v-for="(item_sub_child_great, index_sub_child_great) in item_sub_child.children"
                              :key="index_sub_child_great">
                              <router-link
                                :to="item_sub_child_great.link?.toString() ?? ''"

                                :class="{ 'text-primary': router?.currentRoute?.value?.fullPath.includes(item_sub_child_great.link?.toString() ?? '') }">
                                {{ item_sub_child_great.name }}
                              </router-link>
                            </li>
                          </ul>
                        </li>

                        <li v-if="item_sub_child.children && item_sub_child.children.length < 1 && item_sub_child.checked">
                          <router-link
                            :to="item_sub_child.link?.toString() ?? ''"

                            :class="{ 'text-primary': router?.currentRoute?.value?.fullPath.includes(item_sub_child.link?.toString() ?? '') }">
                            {{ item_sub_child.name }}
                          </router-link>
                        </li>
                      </template>
                    </ul>
                  </li>
                </template>
              </template>
            </ul>
          </li>
        </template>
      </ul>
    </div>
  </header>
</template>

<script lang="ts" setup>
  import {
    onMounted,
    computed,
    ref,
    watch,
  } from "vue";

  import { useRouter } from 'vue-router';
  import { useAppStore } from '@/stores/index';
  import { useAuth } from "@/modules/auth";
  import { useApiWithAuth } from "@/modules/api";

  import IconMenu from '@/components/icon/icon-menu.vue';
  import IconXCircle from '@/components/icon/icon-x-circle.vue';
  import IconSun from '@/components/icon/icon-sun.vue';
  import IconMoon from '@/components/icon/icon-moon.vue';
  import IconLaptop from '@/components/icon/icon-laptop.vue';
  import IconMailDot from '@/components/icon/icon-mail-dot.vue';
  import IconArrowLeft from '@/components/icon/icon-arrow-left.vue';
  import IconInfoCircle from '@/components/icon/icon-info-circle.vue';
  import IconBellBing from '@/components/icon/icon-bell-bing.vue';
  import IconUser from '@/components/icon/icon-user.vue';
  import IconMail from '@/components/icon/icon-mail.vue';
  import IconLockDots from '@/components/icon/icon-lock-dots.vue';
  import IconLogout from '@/components/icon/icon-logout.vue';
  import IconCaretDown from '@/components/icon/icon-caret-down.vue';
  import IconRouter from '@/components/icon/icon-router.vue';

  import One from '@/components/basic/skeleton/One.vue';

  const auth = useAuth();
  const store = useAppStore();
  const router = useRouter();

  const menus = auth?.menu;
  const icons = auth?.icon;

  const languages =
    ref({
      code: "en|en",
      title: "English",
      flag: 'EN'
    });

  const currentFlag = computed(() => {
    return `/assets/images/flags/${languages.value.flag}.svg`;
  });

  const countries = ref([
    {
      code: "en|id",
      title: "Indonesia",
      flag: 'ID'
    },
    {
      code: "en|en",
      title: "English",
      flag: 'EN'
    },
    {
      code: 'en|ko',
      title: 'Korean',
      flag: 'KR'
    },
    {
      code: "en|ja",
      title: "Japanese",
      flag: 'JA'
    }
  ]);

  const doTranslation = (data: any) => {
    languages.value = data

    if (typeof window !== 'undefined') {
      window.doGTranslate(data.code);

      window.localStorage.setItem('googtrans', JSON.stringify(data));
    }
  };

  const notifications = ref([
    {
      id: 1,
      profile: 'user-profile.jpeg',
      message: '<strong class="text-sm mr-1">John Doe</strong>invite you to <strong>Prototyping</strong>',
      time: '45 min ago',
    },
    {
      id: 2,
      profile: 'profile-34.jpeg',
      message: '<strong class="text-sm mr-1">Adam Nolan</strong>mentioned you to <strong>UX Basics</strong>',
      time: '9h Ago',
    },
    {
      id: 3,
      profile: 'profile-16.jpeg',
      message: '<strong class="text-sm mr-1">Anna Morgan</strong>Upload a file',
      time: '9h Ago',
    },
  ]);

  const messages = ref([
    {
      id: 1,
      image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-success-light dark:bg-success text-success dark:text-success-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span>',
      title: 'Congratulations!',
      message: 'Your OS has been updated.',
      time: '1hr',
    },
    {
      id: 2,
      image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-info-light dark:bg-info text-info dark:text-info-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></span>',
      title: 'Did you know?',
      message: 'You can switch between artboards.',
      time: '2hr',
    },
    {
      id: 3,
      image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-danger-light dark:bg-danger text-danger dark:text-danger-light"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>',
      title: 'Something went wrong!',
      message: 'Send Reposrt',
      time: '2days',
    },
    {
      id: 4,
      image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-warning-light dark:bg-warning text-warning dark:text-warning-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">    <circle cx="12" cy="12" r="10"></circle>    <line x1="12" y1="8" x2="12" y2="12"></line>    <line x1="12" y1="16" x2="12.01" y2="16"></line></svg></span>',
      title: 'Warning',
      message: 'Your password strength is low.',
      time: '5days',
    },
  ]);

  onMounted(() => {
    let lang = countries.value.find((d) => d.code === `id|${document?.cookie.split('/')[2]}`);

    languages.value = JSON.parse(window.localStorage.getItem('googtrans') as string) || lang || languages.value;

    setActiveDropdown();
  });

  watch(router, (to, from) => {
    setActiveDropdown();
  });

  const setActiveDropdown = () => {
    const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
    if (selector) {
      selector.classList.add('active');
      const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
      for (let i = 0; i < all.length; i++) {
        all[0]?.classList.remove('active');
      }
      const ul: any = selector.closest('ul.sub-menu');
      if (ul) {
        let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
        if (ele) {
          ele = ele[0];
          setTimeout(() => {
            ele?.classList.add('active');
          });
        }
      }
    }
  };

  const removeNotification = (value: number) => {
    notifications.value = notifications.value.filter((d) => d.id !== value);
  };

  const removeMessage = (value: number) => {
    messages.value = messages.value.filter((d) => d.id !== value);
  };

  // from api
  const total_data: any = ref({
    total_pembudidaya: {
      value: 0
    }
  });

  const getSummary = () => {
    // const { loading, data, error, get } = useApiWithAuth("dashboard/summary");

    // get();
        
    // watch([ loading ], () => {
      
    //   total_data.value = data.value?.data;

    // });
  };

  const isLoadingOptionsNotifs: any = ref(false);
  const rows_options_notifs: any = ref([]);

  const getNotifs = (status) => {
    // isLoadingOptionsNotifs.value = status;

    // const { loading, data, error, get } = useApiWithAuth("notification/data");

    // get({ limit: 10000, is_read_bool: false });
        
    // watch([ loading ], () => {
      
    //   isLoadingOptionsNotifs.value = loading.value;

    //   rows_options_notifs.value = data.value?.data;

    // });
  };

  const toRead = (id: string) => {
    // const { loading, data, error, get } = useApiWithAuth("notification/detail");

    // get({ id: id });
        
    // watch([ loading ], () => {
      
    //   console.log(data.value?.data)

    //   getNotifs(false);

    // });
  };

  onMounted(() => {
    getSummary();
  });
</script>
