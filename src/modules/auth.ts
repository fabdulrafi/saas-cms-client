import { reactive, toRefs, watch } from 'vue';
import { useApiWithAuth } from './api';
import { useRouter } from 'vue-router';
import { useMenu } from '@/composables/use-menu';

export const AUTH_KEY = 'smartiv_token';
export const AUTH_TOKEN = 'access_token';
export const AUTH_LOCK = 'smartiv_lock';
export const AUTH_EMAIL = 'smartiv_email';

interface User {
  id: string;
  name: string;
  email: string;
  mobile_number: string;
  image_url?: string;
  role_id?: string;
  company_id?: string;
  company?: any
  [ AUTH_TOKEN ]: string;
}

interface Menu {
  id?: string;
  parent_id?: string;
  name?: string;
  type?: string;
  icon?: string;
  icon_active?: string;
  link?: string;
  permission?: Array<any>;
  children?: Array<Menu>;
  checked?: boolean;
};

interface AuthState {
  authenticating: boolean;
  user?: User;
  error?: Error;
  menu?: Array<Menu>;
  icon?: any;
  icon_active?: any;
}

const state = reactive<AuthState>({
  authenticating: false,
  user: undefined,
  error: undefined,
  menu: undefined,
  icon: undefined,
  icon_active: undefined,
}) || undefined;

// Read access token from local storage?
const token = window.localStorage.getItem(AUTH_KEY);
state.authenticating = token ? true : false;

const { rows, icons } = useMenu();

watch(rows, (newRows) => {
  state.menu = newRows
  state.icon = icons
});

const getUser = () => {
  const { loading, error, data, get } = useApiWithAuth('client/profile');

  state.authenticating = true;

  get();

  watch([ loading ], () => {
    if ( error.value ) {
      window.localStorage.removeItem(AUTH_KEY);
    }

    else if ( data.value ) {
      // callback from api
      let obj = data?.value;

      state.user = {
        id: obj.data.id,
        name: obj.data.name,
        email: obj.data.email,
        mobile_number: obj.data.mobile_number,
        image_url: obj.data?.image_url,
        role_id: obj.data.role_id,
        company_id: obj.data.company_id,
        company: obj.data.company,
        access_token: token ?? ''
      };
    };

    state.authenticating = false;
  });
};

if ( token ) getUser();

export const useAuth = () => {
  const router = useRouter();

  const setUser = (payload: User, remember: boolean): void => {
    if ( remember ) {
      window.localStorage.setItem(AUTH_KEY, payload[ AUTH_TOKEN ]);

      window.localStorage.setItem(AUTH_EMAIL, payload[ 'email' ]);
    }

    state.user = payload;
    state.error = undefined;
  };

  const setMenu = (menus: any, icons: any): void => {
    state.menu = menus
    state.icon = icons
  };

  const logout = async (): Promise<void> => {
    const { loading, error, data, post } = useApiWithAuth('client/logout');

    await post();

    window.localStorage.removeItem(AUTH_KEY);

    window.localStorage.removeItem(AUTH_LOCK);

    router.push({ name: "login" });

    return Promise.resolve(state.user = undefined);
  };

  const lock = () => {
    window.localStorage.setItem(AUTH_LOCK, 'locked');

    router.push({ name: "lockscreen", query: { redirect: router.currentRoute.value.fullPath } });
  };

  return {
    getUser,
    setUser,
    setMenu,
    logout,
    lock,
    ...toRefs(state)
  };
};
