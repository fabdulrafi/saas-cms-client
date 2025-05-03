import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAppStore } from '@/stores/index';
import appSetting from '@/app-setting';

import { useAuth, AUTH_KEY, AUTH_LOCK } from '@/modules/auth';
import { useValidRouter, useFirstCheckedLink } from '@/composables/use-menu';

import Login from '@/views/index.vue';
import Dashboard from '@/views/main_menu/dashboard/index.vue';

import { useRouterMainMenu } from '@/router/main_menu';
import { useRouterSettings } from '@/router/settings';
// import { useRouterSupport } from '@/router/support';

const routes: RouteRecordRaw[] = [
  // authenticating
  {
    path: '/',
    name: 'login',
    component: Login ,
    meta: { requiresAuth: false, title: 'Login' }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '@/views/register.vue'),
    meta: { requiresAuth: false, title: 'Register' }
  },
  {
    path: '/verify-email/:token',
    name: 'verify email',
    component: () => import(/* webpackChunkName: "verify-email" */ '@/views/verify_email.vue'),
    meta: { requiresAuth: false, title: 'Verify Email' }
  },
  {
    path: '/forgot-password',
    name: 'forgot password',
    component: () => import(/* webpackChunkName: "forgot" */ '@/views/forgot.vue'),
    meta: { requiresAuth: false, title: 'Forgot Password' }
  },
  {
    path: '/reset-link',
    name: 'reset link',
    component: () => import(/* webpackChunkName: "reset-link" */ '@/views/reset_link.vue'),
    meta: { requiresAuth: false, title: 'Reset Link' }
  },
  {
    path: '/reset-password',
    name: 'reset password',
    component: () => import(/* webpackChunkName: "reset-password" */ '@/views/reset_password.vue'),
    meta: { requiresAuth: false, title: 'Reset Password' }
  },
  {
    path: '/new-password',
    name: 'new password',
    component: () => import(/* webpackChunkName: "new-password" */ '@/views/new_password.vue'),
    meta: { requiresAuth: false, title: 'New Password' }
  },
  {
    path: '/password-change',
    name: 'password change',
    component: () => import(/* webpackChunkName: "password-change" */ '@/views/password_change.vue'),
    meta: { requiresAuth: false, title: 'Password Change' }
  },
  {
    path: '/lockscreen',
    name: 'lockscreen',
    component: () => import(/* webpackChunkName: "lockscreen" */ '@/views/lockscreen.vue'),
    meta: { requiresAuth: true, title: 'Lockscreen' }
  },


  // error
  {
    path: '/404',
    name: 'error 404',
    component: () => import(/* webpackChunkName: "error-404" */ '@/views/error/error404.vue'),
    meta: { requiresAuth: false, title: 'Error 404' }
  },
  {
    path: '/500',
    name: 'error 500',
    component: () => import(/* webpackChunkName: "error-500" */ '@/views/error/error500.vue'),
    meta: { requiresAuth: false, title: 'Error 500' }
  },


  {
    path: '/main-menu/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true, title: 'Dashboard' }
  },


  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '@/views/profile.vue'),
    meta: { requiresAuth: true, title: 'Profile' }
  },

  ...useRouterMainMenu(),
  ...useRouterSettings(),
  // ...useRouterSupport(),
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: 'active',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0 };
    }
  }
});

const initRoutes = (to, from, next, authenticating) => {
  const token = window.localStorage.getItem(AUTH_KEY);
  const lock = window.localStorage.getItem(AUTH_LOCK);

  const store = useAppStore();
  store.setMainLayout(!token || lock ? 'auth' : 'app');

  const { validRoute } = useValidRouter();
  const vr = validRoute(to.path);

  // Not logged into a guarded route ==> !user?.value | user!.value
  if ( !authenticating.value && to.meta.requiresAuth && !token && !lock ) {
    console.log('requires auth, redirect to login');

    next({ name: 'login', query: { redirect: to.fullPath } });
  }

  // Lockscreen
  else if ( to.name !== 'lockscreen' && token && lock ) {
    console.log('locked, redirect to lockscreen');

    next({ name: 'lockscreen', query: { redirect: to.fullPath } });
  }

  // Logged in for an auth route
  else if ( (to.name === 'login' || to.name === 'lockscreen') && token && !lock ) {
    console.log('login, has a user so send home');

    next(useFirstCheckedLink().value);
  }

  // Not valid route
  else if ( 
    to.name !== 'error 404' && to.name !== 'error 500' && to.name !== 'profile' && 
    to.name !== 'screen saver add' && to.name !== 'digital signage add' && to.name !== 'facility add' && 
    to.name !== 'direct notification add' && to.name !== 'wallpaper add' && to.name !== 'theme add' &&
    to.name !== 'cctv add' &&
    to.name !== 'guest control messages' && to.name !== 'guest control request' &&
    !vr.value && token && !lock ) {
    console.log('not valid route');

    next({ name: 'error 404' });
  }

  else next();
};

router.beforeEach((to, from, next) => {
  const { authenticating, menu } = useAuth();

  if ( !menu?.value ) {
    setTimeout(() => {
      initRoutes(to, from, next, authenticating);
    }, 1000);

    return;
  }

  initRoutes(to, from, next, authenticating);
});

router.afterEach((to, from, next) => {
  appSetting.changeAnimation();
});

export default router;
