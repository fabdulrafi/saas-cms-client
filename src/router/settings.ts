export const useRouterSettings = () => [
  {
    path: '/settings/company',
    name: 'company',
    component: () => import(/* webpackChunkName: "settings/company" */ '@/views/settings/company/index.vue'),
    meta: { requiresAuth: true, title: 'Company' }
  },
  {
    path: '/settings/subscription',
    name: 'subscription',
    component: () => import(/* webpackChunkName: "settings/subscription" */ '@/views/settings/subscription/index.vue'),
    meta: { requiresAuth: true, title: 'Subscription' }
  },
  {
    path: '/settings/master-unit',
    name: 'master unit',
    component: () => import(/* webpackChunkName: "settings/master-unit" */ '@/views/settings/master_unit/index.vue'),
    meta: { requiresAuth: true, title: 'Master Unit' }
  },
  {
    path: '/settings/master-screen',
    name: 'master screen',
    component: () => import(/* webpackChunkName: "settings/master-screen" */ '@/views/settings/master_screen/index.vue'),
    meta: { requiresAuth: true, title: 'Master Screen' }
  },
  {
    path: '/settings/master-tag',
    name: 'master tag',
    component: () => import(/* webpackChunkName: "settings/master-tag" */ '@/views/settings/master_tag/index.vue'),
    meta: { requiresAuth: true, title: 'Master Tag' }
  },


  // unit settings wallpaper
  {
    path: '/settings/unit-setting/wallpaper',
    name: 'wallpaper',
    component: () => import(/* webpackChunkName: "settings/unit-setting/wallpaper" */ '@/views/settings/unit_setting/wallpaper/index.vue'),
    meta: { requiresAuth: true, title: 'Wallpaper' }
  },
  {
    path: '/settings/unit-setting/wallpaper/add',
    name: 'wallpaper add',
    component: () => import(/* webpackChunkName: "settings/unit-setting/wallpaper/add" */ '@/views/settings/unit_setting/wallpaper/add/index.vue'),
    meta: { requiresAuth: true, title: 'Wallpaper Add' }
  },


  // unit settings theme
  {
    path: '/settings/unit-setting/theme',
    name: 'theme',
    component: () => import(/* webpackChunkName: "settings/unit-setting/theme" */ '@/views/settings/unit_setting/theme/index.vue'),
    meta: { requiresAuth: true, title: 'Theme' }
  },
  {
    path: '/settings/unit-setting/theme/add',
    name: 'theme add',
    component: () => import(/* webpackChunkName: "settings/unit-setting/theme/add" */ '@/views/settings/unit_setting/theme/add/index.vue'),
    meta: { requiresAuth: true, title: 'Theme Add' }
  },
  

  // unit settings running text
  {
    path: '/settings/unit-setting/running-text',
    name: 'running text',
    component: () => import(/* webpackChunkName: "settings/unit-setting/running-text" */ '@/views/settings/unit_setting/running_text/index.vue'),
    meta: { requiresAuth: true, title: 'Running Text' }
  },
  {
    path: '/settings/unit-setting/running-text/add',
    name: 'running text add',
    component: () => import(/* webpackChunkName: "settings/unit-setting/running-text/add" */ '@/views/settings/unit_setting/running_text/add/index.vue'),
    meta: { requiresAuth: true, title: 'Running Text Add' }
  },


  // unit settings wifi
  {
    path: '/settings/unit-setting/wifi',
    name: 'wifi',
    component: () => import(/* webpackChunkName: "settings/unit-setting/wifi" */ '@/views/settings/unit_setting/wifi/index.vue'),
    meta: { requiresAuth: true, title: 'Wifi' }
  },
  {
    path: '/settings/unit-setting/wifi/add',
    name: 'wifi add',
    component: () => import(/* webpackChunkName: "settings/unit-setting/wifi/add" */ '@/views/settings/unit_setting/wifi/add/index.vue'),
    meta: { requiresAuth: true, title: 'Wifi Add' }
  },


  // unit settings emergency
  {
    path: '/settings/unit-setting/emergency',
    name: 'emergency',
    component: () => import(/* webpackChunkName: "settings/unit-setting/emergency" */ '@/views/settings/unit_setting/emergency/index.vue'),
    meta: { requiresAuth: true, title: 'Emergency' }
  },
  {
    path: '/settings/unit-setting/emergency/add',
    name: 'emergency add',
    component: () => import(/* webpackChunkName: "settings/unit-setting/emergency/add" */ '@/views/settings/unit_setting/emergency/add/index.vue'),
    meta: { requiresAuth: true, title: 'Emergency Add' }
  },


  // unit settings casting
  {
    path: '/settings/unit-setting/casting',
    name: 'casting',
    component: () => import(/* webpackChunkName: "settings/unit-setting/casting" */ '@/views/settings/unit_setting/casting/index.vue'),
    meta: { requiresAuth: true, title: 'Casting' }
  },
  {
    path: '/settings/unit-setting/casting/add',
    name: 'casting add',
    component: () => import(/* webpackChunkName: "settings/unit-setting/casting/add" */ '@/views/settings/unit_setting/casting/add/index.vue'),
    meta: { requiresAuth: true, title: 'Casting Add' }
  },


  // media
  {
    path: '/settings/media',
    name: 'media',
    component: () => import(/* webpackChunkName: "settings/media" */ '@/views/settings/media/index.vue'),
    meta: { requiresAuth: true, title: 'Media' }
  },
]
