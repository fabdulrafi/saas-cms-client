<template>
  <div :class="{ 'dark text-white-dark': store.semidark }">
    <nav class="sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-none z-50 transition-all duration-300">
      <div class="bg-white dark:bg-[#0e1726] h-full">
        <div class="flex justify-between items-center px-4 py-3 bg-white dark:bg-[#0e1726]">
          <router-link
            to="/">
            <!-- <img
              class="h-auto w-full max-w-28 ml-[5px]"
              :src="`/assets/images/${store.theme === 'light' ? 'logo_full' : 'logo_full_white'}.png`"
              alt="" /> -->
              
            <img 
              class="h-auto w-full max-w-32 ml-[5px]"
              src="/assets/images/logo_full.png"
              alt="" />
          </router-link>

          <a
            href="javascript:;"
            class="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180 hover:text-primary"
            @click="store.toggleSidebar()">
            <icon-carets-down class="m-auto rotate-90" />
          </a>
        </div>
        
        <perfect-scrollbar
          :options="{
              swipeEasing: true,
              wheelPropagation: false,
          }"
          class="h-[calc(100vh-80px)] relative">
          <ul class="relative font-semibold space-y-0.5 p-4 pl-0 py-0">
            <One v-if="!menus"
              :rows="6"
              :widths="100" />

            <template
              v-for="(item, index) in menus"
              :key="index">
              <li v-if="item.children && item.children.length < 1 && item.checked"
                class="nav-item">
                <router-link
                  :to="item.link?.toString() ?? ''"
                  @click="toggleMobileMenu; activeDropdown = null; activeDropdownChild = null; store.sidebar = isMobile ? false : false;"

                  :class="{ active: router?.currentRoute?.value?.fullPath.includes(item.link?.toString() ?? '') }"
                  class="group">
                  <div class="flex items-center pl-4">
                    <!-- <component 
                      :is="icons[item.icon?.toString() ?? '']" 
                      :class="{ '!text-primary': router?.currentRoute?.value?.fullPath.includes(item.link?.toString() ?? '') }"

                      class="group-hover:!text-primary shrink-0" /> -->
                    <img 
                      :src="router?.currentRoute?.value?.fullPath.includes(item.link?.toString() ?? '') ? icons[item.icon_active?.toString() ?? ''] : icons[item.icon?.toString() ?? '']"
                      class="h-4 w-4" />

                    <span
                      class="ltr:pl-3 rtl:pr-3 text-gray-400 dark:text-[#506690] group-hover:text-primary">
                      {{ item.name }}
                    </span>
                  </div>
                </router-link>
              </li>

              <template v-if="item.children && item.children.length > 0 && item.checked">
                <h2 
                  @click="toggleTreeview(index)"

                  class="py-3 px-7 flex items-center pl-11 uppercase font-extrabold bg-white dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1 cursor-pointer relative">
                  <icon-minus class="w-4 h-5 flex-none hidden" />

                  <span class="text-gray-500">
                    {{ item.name }}
                  </span>

                  <!-- <icon-caret-down 
                    :class="{ 'rtl:rotate-90 -rotate-90': !treeview.includes(index) }"
                    class="m-auto absolute right-[26px]" /> -->
                </h2>

                <vue-collapsible :isOpen="treeview.includes(index)">
                  <template
                    v-for="(item_sub, index_sub) in item.children"
                    :key="index_sub">
                    <li v-if="item_sub.children && item_sub.children.length < 1 && item_sub.checked"
                      class="nav-item">
                      <router-link
                        :to="item_sub.link?.toString() ?? ''"
                        @click="toggleMobileMenu; activeDropdown = null; activeDropdownChild = null; store.sidebar = isMobile ? false : false;"
  
                        :class="{ active: router?.currentRoute?.value?.fullPath.includes(item_sub.link?.toString() ?? '') }"
                        class="group">
                        <div class="flex items-center pl-4">
                          <!-- h-8 w-8 border-[2px] border-primary bg-primary-light rounded-md p-1.5 -->
                          <!-- <component 
                            :is="icons[item_sub.icon?.toString() ?? '']" 
                            :class="{ '!text-primary': router?.currentRoute?.value?.fullPath.includes(item_sub.link?.toString() ?? '') }"
  
                            class="group-hover:!text-primary shrink-0" /> -->
                          <img 
                            :src="router?.currentRoute?.value?.fullPath.includes(item_sub.link?.toString() ?? '') ? icons[item_sub.icon_active?.toString() ?? ''] : icons[item_sub.icon?.toString() ?? '']"
                            class="h-4 w-4" />
  
                          <span class="ltr:pl-3 rtl:pr-3 text-gray-400 dark:text-[#506690] group-hover:text-primary">
                            {{ item_sub.name }}
                          </span>
                        </div>
                      </router-link>
                    </li>
  
                    <template v-if="item_sub.children && item_sub.children.length > 0 && item_sub.checked">
                      <li class="menu nav-item">
                        <button
                          @click="activeDropdown === item_sub.name ? (activeDropdown = null) : (activeDropdown = item_sub.name)"
  
                          :class="{ active: activeDropdown === item_sub.name }"
                          type="button"
                          class="nav-link group w-full">
                          <div class="flex items-center pl-4">
                            <!-- <component 
                              :is="icons[item_sub.icon?.toString() ?? '']" 
                              :class="{ '!text-primary': activeDropdown === item_sub.name }"
                              
                              class="group-hover:!text-primary shrink-0" /> -->
                            <img 
                              :src="activeDropdown === item_sub.name ? icons[item_sub.icon_active?.toString() ?? ''] : icons[item_sub.icon?.toString() ?? '']"
                              class="h-4 w-4" />
  
                            <span class="ltr:pl-3 rtl:pr-3 text-gray-400 dark:text-[#506690] group-hover:text-primary">
                              {{ item_sub.name }}
                            </span>
                          </div>
  
                          <div :class="{ 'rtl:rotate-90 -rotate-90': activeDropdown !== item_sub.name }">
                            <icon-caret-down />
                          </div>
                        </button>
  
                        <vue-collapsible :isOpen="activeDropdown === item_sub.name">
                          <template 
                            v-for="(item_sub_child, index_sub_child) in item_sub.children"
                            :key="index_sub_child">
                            <ul v-if="item_sub_child.children && item_sub_child.children.length > 0 && item_sub_child.checked"
                              class="text-gray-500 dark:text-[#506690]">
                              <li 
                                class="nav-item">
                                <button
                                  @click="activeDropdownChild === item_sub_child.name ? (activeDropdownChild = null) : (activeDropdownChild = item_sub_child.name)"
    
                                  :class="{ active: activeDropdownChild === item_sub_child.name }"
                                  type="button"
                                  class="ltr:!pl-[20px] rtl:!pr-[20px] nav-link group w-full">
                                  <div class="flex items-center group pl-4">
                                    <!-- <component 
                                      :is="icons[item_sub_child.icon?.toString() ?? '']" 
                                      :class="{ '!text-primary': activeDropdownChild === item_sub_child.name }"
  
                                      class="group-hover:!text-primary shrink-0" /> -->

                                    <div 
                                      class="absolute h-10 flex items-center justify-center">
                                      <div v-if="activeDropdownChild === item_sub_child.name"
                                        :class="{ 
                                          '!border-[#E1F1FF]': activeDropdownChild === item_sub_child.name,
                                          'group-hover:!border-primary': activeDropdownChild !== item_sub_child.name,
                                        }"
                                        class="border-r-2 border-[#E1F1FF] dark:border-[#2f405c] h-10 absolute"></div>
                                      <div 
                                        :class="{ 
                                          '!bg-[#E1F1FF]': activeDropdownChild === item_sub_child.name,'group-hover:!bg-primary': activeDropdownChild !== item_sub_child.name
                                        }"
                                        class="h-2.5 w-2.5 bg-[#E1F1FF] dark:bg-[#2f405c] rounded-full absolute"></div>
                                    </div>
    
                                    <span class="ltr:pl-[22px] rtl:pr-[22px] text-gray-400 dark:text-[#506690] group-hover:text-primary">
                                      {{ item_sub_child.name }}
                                    </span>
                                  </div>
    
                                  <div :class="{ 'rtl:rotate-90 -rotate-90': activeDropdownChild !== item_sub_child.name }">
                                    <icon-caret-down />
                                  </div>
                                </button>
  
                                <vue-collapsible :isOpen="activeDropdownChild === item_sub_child.name">
                                  <ul class="sub-menu text-gray-500 dark:text-[#506690]">
                                    <li
                                      v-for="(item_sub_child_great, index_sub_child_great) in item_sub_child.children" 
                                      :key="index_sub_child_great"
                                      v-show="item_sub_child_great.checked">
                                      <router-link 
                                        :to="item_sub_child_great.link?.toString() ?? ''" 
                                        @click="toggleMobileMenu; store.sidebar = isMobile ? false : false;"
                                        
                                        class="ltr:!pl-[0px] rtl:!pr-[0px] group"
                                        :class="{ 'text-primary before:bg-primary': router?.currentRoute?.value?.fullPath.includes(item_sub_child_great.link?.toString() ?? '') }">
                                        <div class="flex items-center group pl-4">
                                          <!-- <component 
                                            :is="icons[item_sub_child_great.icon?.toString() ?? '']" 
                                            :class="{ '!text-primary': router?.currentRoute?.value?.fullPath.includes(item_sub_child_great.link?.toString() ?? '') }"
                                            class="group-hover:!text-primary shrink-0" /> -->
                                          
                                          <div 
                                            class="absolute h-10 flex items-center justify-center pl-[12px]">
                                            <div v-if="router?.currentRoute?.value?.fullPath.includes(item_sub_child_great.link?.toString() ?? '')"
                                              :class="{ 
                                                '!border-[#E1F1FF]': router?.currentRoute?.value?.fullPath.includes(item_sub_child_great.link?.toString() ?? ''),
                                                'group-hover:!border-primary': !router?.currentRoute?.value?.fullPath.includes(item_sub_child_great.link?.toString() ?? ''),
                                              }"
                                              class="border-r-2 border-[#E1F1FF] dark:border-[#2f405c] h-10 absolute"></div>
                                            <div 
                                              :class="{ 
                                                '!bg-[#E1F1FF]': router?.currentRoute?.value?.fullPath.includes(item_sub_child_great.link?.toString() ?? ''),'group-hover:!bg-primary': !router?.currentRoute?.value?.fullPath.includes(item_sub_child_great.link?.toString() ?? '') 
                                              }"
                                              class="h-2.5 w-2.5 bg-[#E1F1FF] dark:bg-[#2f405c] rounded-full absolute"></div>
                                          </div>
          
                                          <span class="ltr:pl-[34px] rtl:pr-[34px]">
                                            {{ item_sub_child_great.name }}
                                          </span>
                                        </div>
                                      </router-link>
                                    </li>
                                  </ul>
                                </vue-collapsible>
                              </li>
                            </ul>
  
                            <ul v-if="item_sub_child.children && item_sub_child.children.length < 1 && item_sub_child.checked"
                              class="sub-menu dark:text-[#506690]">
                              <li>
                                <router-link 
                                  :to="item_sub_child.link?.toString() ?? ''" 
                                  @click="toggleMobileMenu; activeDropdownChild = null; store.sidebar = isMobile ? false : false;"
                                  
                                  :class="{ 'text-white bg-primary hover:!bg-primary hover:!text-white': router?.currentRoute?.value?.fullPath.includes(item_sub_child.link?.toString() ?? '') }"
                                  class="group">
                                  <div class="flex items-center group pl-4">
                                    <!-- <component 
                                      :is="icons[item_sub_child.icon?.toString() ?? '']" 
                                      :class="{ '!text-primary': router?.currentRoute?.value?.fullPath.includes(item_sub_child.link?.toString() ?? '') }"
  
                                      class="group-hover:!text-primary shrink-0" /> -->

                                    <div 
                                      class="absolute h-10 flex items-center justify-center pl-[12px]">
                                      <div v-if="router?.currentRoute?.value?.fullPath.includes(item_sub_child.link?.toString() ?? '')"
                                        :class="{ 
                                          '!border-[#E1F1FF]': router?.currentRoute?.value?.fullPath.includes(item_sub_child.link?.toString() ?? ''),
                                          'group-hover:!border-primary': !router?.currentRoute?.value?.fullPath.includes(item_sub_child.link?.toString() ?? ''),
                                        }"
                                        class="border-r-2 border-[#E1F1FF] dark:border-[#2f405c] h-10 absolute"></div>
                                      <div 
                                        :class="{ 
                                          '!bg-[#E1F1FF]': router?.currentRoute?.value?.fullPath.includes(item_sub_child.link?.toString() ?? ''),'group-hover:!bg-primary': !router?.currentRoute?.value?.fullPath.includes(item_sub_child.link?.toString() ?? '') 
                                        }"
                                        class="h-2.5 w-2.5 bg-[#E1F1FF] dark:bg-[#2f405c] rounded-full absolute"></div>
                                    </div>
    
                                    <span 
                                      :class="{ 'hover:!bg-primary hover:!text-white': router?.currentRoute?.value?.fullPath.includes(item_sub_child.link?.toString() ?? '') }"
                                      class="ltr:pl-[34px] rtl:pr-[34px]">
                                      {{ item_sub_child.name }}
                                    </span>
                                  </div>
                                </router-link>
                              </li>
                            </ul>
                          </template>
                        </vue-collapsible>
                      </li>
                    </template>
                  </template>
                </vue-collapsible>
              </template>
            </template>
          </ul>
        </perfect-scrollbar>
      </div>
    </nav>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';

  import { useRouter } from 'vue-router';
  import { useAppStore } from '@/stores/index';
  import { useAuth } from "@/modules/auth";
  import { useMediaQuery } from "@/composables/use-media-query";

  import VueCollapsible from 'vue-height-collapsible/vue3';

  import IconCaretsDown from '@/components/icon/icon-carets-down.vue';
  import IconMinus from '@/components/icon/icon-minus.vue';
  import IconCaretDown from '@/components/icon/icon-caret-down.vue';

  import One from '@/components/basic/skeleton/One.vue';

  const auth = useAuth();
  const store = useAppStore();
  const router = useRouter();
  const treeview: any = ref([0, 1, 2, 3, 5, 6]);
  const activeDropdown: any = ref(null);
  const activeDropdownChild: any = ref(null);

  const menus = auth?.menu;
  const icons = auth?.icon;

  const isMobile = useMediaQuery('(max-width: 460px)');

  onMounted(() => {
    const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
    if (selector) {
      selector.classList.add('active');
      const ul: any = selector.closest('ul.sub-menu');
      if (ul) {
        let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
        if (ele.length) {
          ele = ele[0];
          setTimeout(() => {
            ele.click();
          });
        }
      }
    }
  });

  const toggleMobileMenu = () => {
    if (window.innerWidth < 1024) {
      store.toggleSidebar();
    }
  };

  const toggleTreeview = (index: number) => {
    if (treeview.value.includes(index as never)) {
      treeview.value = treeview.value.filter((d) => d != index);
    } else {
      treeview.value.push(index as never);
    }
  };
</script>
