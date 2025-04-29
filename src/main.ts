import { createApp } from 'vue';
import App from '@/App.vue';

const app = createApp(App);

// pinia store
import { createPinia } from 'pinia';
const pinia = createPinia();
app.use(pinia);

import router from '@/router';
app.use(router);

// main app css
import '@/assets/css/app.css';

// perfect scrollbar
import PerfectScrollbar from 'vue3-perfect-scrollbar';
app.use(PerfectScrollbar);

//vue-meta
import { createHead } from '@vueuse/head';
const head = createHead();
app.use(head);

// set default settings
import appSetting from '@/app-setting';
appSetting.init();

// popper
import Popper from 'vue3-popper';
app.component('Popper', Popper);

// tippy tooltips
import { TippyPlugin } from 'tippy.vue';
app.use(TippyPlugin);

// apply global format
import appFormat from '@/app-format';
app.config.globalProperties.$format = appFormat;

// firebase
import appFirebase from '@/modules/firebase';
app.config.globalProperties.$fbInit = appFirebase;
app.provide('fbInit', appFirebase);

// vue-the-mask
import VueTheMask from 'vue-the-mask';
app.use(VueTheMask);

app.mount('#app');
