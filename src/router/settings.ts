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
]
