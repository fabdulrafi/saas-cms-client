export const useRouterMainMenu = () => [
  {
    path: '/main-menu/guest-control',
    name: 'guest control',
    component: () => import(/* webpackChunkName: "main-menu/guest-control" */ '@/views/main_menu/guest_control/index.vue'),
    meta: { requiresAuth: true, title: 'Guest Control' }
  },
  {
    path: '/main-menu/guest-control/messages/:uuid',
    name: 'guest control messages',
    component: () => import(/* webpackChunkName: "main-menu/guest-control/messages" */ '@/views/main_menu/guest_control/messages/_id.vue'),
    meta: { requiresAuth: true, title: 'Guest Control Messages' }
  },
  {
    path: '/main-menu/guest-control/request/:uuid',
    name: 'guest control request',
    component: () => import(/* webpackChunkName: "main-menu/guest-control/request" */ '@/views/main_menu/guest_control/request/_id.vue'),
    meta: { requiresAuth: true, title: 'Guest Control Request' }
  },



  // promotion
  {
    path: '/main-menu/promotion/screen-saver',
    name: 'screen saver',
    component: () => import(/* webpackChunkName: "main-menu/promotion/screen-saver" */ '@/views/main_menu/promotion/screen_saver/index.vue'),
    meta: { requiresAuth: true, title: 'Screen Saver' }
  },
  {
    path: '/main-menu/promotion/screen-saver/add',
    name: 'screen saver add',
    component: () => import(/* webpackChunkName: "main-menu/promotion/screen-saver/add" */ '@/views/main_menu/promotion/screen_saver/add/index.vue'),
    meta: { requiresAuth: true, title: 'Screen Saver Add' }
  },

  
  {
    path: '/main-menu/promotion/digital-signage',
    name: 'digital signage',
    component: () => import(/* webpackChunkName: "main-menu/promotion/digital-signage" */ '@/views/main_menu/promotion/digital_signage/index.vue'),
    meta: { requiresAuth: true, title: 'Digital Signage' }
  },
  {
    path: '/main-menu/promotion/digital-signage/add',
    name: 'digital signage add',
    component: () => import(/* webpackChunkName: "main-menu/promotion/digital-signage/add" */ '@/views/main_menu/promotion/digital_signage/add/index.vue'),
    meta: { requiresAuth: true, title: 'Digital Signage Add' }
  },


  
  {
    path: '/main-menu/promotion/app-promotion',
    name: 'app promotion',
    component: () => import(/* webpackChunkName: "main-menu/promotion/app-promotion" */ '@/views/main_menu/promotion/app_promotion/index.vue'),
    meta: { requiresAuth: true, title: 'App Promotion' }
  },



  // information
  {
    path: '/main-menu/information/facility',
    name: 'facility',
    component: () => import(/* webpackChunkName: "main-menu/information/facility" */ '@/views/main_menu/information/facility/index.vue'),
    meta: { requiresAuth: true, title: 'Facility' }
  },
  {
    path: '/main-menu/information/facility/add',
    name: 'facility add',
    component: () => import(/* webpackChunkName: "main-menu/information/facility/add" */ '@/views/main_menu/information/facility/add/index.vue'),
    meta: { requiresAuth: true, title: 'Facility Add' }
  },
  {
    path: '/main-menu/information/facility/edit/:uuid',
    name: 'facility edit',
    component: () => import(/* webpackChunkName: "main-menu/information/facility/edit/:uuid" */ '@/views/main_menu/information/facility/edit/_id.vue'),
    meta: { requiresAuth: true, title: 'Facility Edit' }
  },

  {
    path: '/main-menu/information/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "main-menu/information/about" */ '@/views/main_menu/information/about/index.vue'),
    meta: { requiresAuth: true, title: 'About' }
  },
  {
    path: '/main-menu/information/about/add',
    name: 'about add',
    component: () => import(/* webpackChunkName: "main-menu/information/about/add" */ '@/views/main_menu/information/about/add/index.vue'),
    meta: { requiresAuth: true, title: 'About Add' }
  },
  {
    path: '/main-menu/information/about/edit/:uuid',
    name: 'about edit',
    component: () => import(/* webpackChunkName: "main-menu/information/about/edit/:uuid" */ '@/views/main_menu/information/about/edit/_id.vue'),
    meta: { requiresAuth: true, title: 'About Edit' }
  },

  {
    path: '/main-menu/information/nearby',
    name: 'nearby',
    component: () => import(/* webpackChunkName: "main-menu/information/nearby" */ '@/views/main_menu/information/nearby/index.vue'),
    meta: { requiresAuth: true, title: 'Nearby' }
  },
  {
    path: '/main-menu/information/nearby/add',
    name: 'nearby add',
    component: () => import(/* webpackChunkName: "main-menu/information/nearby/add" */ '@/views/main_menu/information/nearby/add/index.vue'),
    meta: { requiresAuth: true, title: 'Nearby Add' }
  },
  {
    path: '/main-menu/information/nearby/edit/:uuid',
    name: 'nearby edit',
    component: () => import(/* webpackChunkName: "main-menu/information/nearby/edit/:uuid" */ '@/views/main_menu/information/nearby/edit/_id.vue'),
    meta: { requiresAuth: true, title: 'Nearby Edit' }
  },


  {
    path: '/main-menu/information/greeting',
    name: 'greeting',
    component: () => import(/* webpackChunkName: "main-menu/information/greeting" */ '@/views/main_menu/information/greeting/index.vue'),
    meta: { requiresAuth: true, title: 'Greeting' }
  },



  // leisure
  {
    path: '/main-menu/leisure/cctv',
    name: 'cctv',
    component: () => import(/* webpackChunkName: "main-menu/leisure/cctv" */ '@/views/main_menu/leisure/cctv/index.vue'),
    meta: { requiresAuth: true, title: 'CCTV' }
  },
  {
    path: '/main-menu/leisure/cctv/add',
    name: 'cctv add',
    component: () => import(/* webpackChunkName: "main-menu/leisure/cctv/add" */ '@/views/main_menu/leisure/cctv/add/index.vue'),
    meta: { requiresAuth: true, title: 'CCTV Add' }
  },



  // direct notification
  {
    path: '/main-menu/direct-notification',
    name: 'direct notification',
    component: () => import(/* webpackChunkName: "main-menu/direct-notification" */ '@/views/main_menu/direct_notification/index.vue'),
    meta: { requiresAuth: true, title: 'Direct Notification' }
  },
  {
    path: '/main-menu/direct-notification/add',
    name: 'direct notification add',
    component: () => import(/* webpackChunkName: "main-menu/direct-notification/add" */ '@/views/main_menu/direct_notification/add/index.vue'),
    meta: { requiresAuth: true, title: 'Direct Notification Add' }
  },
]
