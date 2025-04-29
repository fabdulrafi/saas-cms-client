import axios, { AxiosRequestConfig } from 'axios';
import { computed, ref, watch } from 'vue';


interface AddressItem {
  id: string;
  name: string;
}

interface Province extends AddressItem {}
interface City extends AddressItem {
  province_id: string;
}
interface Subdistrict extends AddressItem {
  city_id: string;
}
interface Village extends AddressItem {
  subdistrict_id: string;
}

export const useAddress = () => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_PUBLIC,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });

  // Provinces
  const loadingProvinces = ref(false)
  const dataProvinces = ref<Province[]>([])
  const errorProvinces = ref();

  // Cities
  const loadingCities = ref(false)
  const dataCities = ref<City[]>([])
  const errorCities = ref();

  // Subdistricts
  const loadingSubdistricts = ref(false)
  const dataSubdistricts = ref<Subdistrict[]>([])
  const errorSubdistricts = ref();

  // Villages
  const loadingVillages = ref(false)
  const dataVillages = ref<Village[]>([])
  const errorVillages = ref();

  const provinces = async (query?: Record<string, any>, config?: AxiosRequestConfig) => {
    loadingProvinces.value = true;

    errorProvinces.value = undefined;

    let queryString = '';

    if ( query ) {
      queryString = '?' + Object.entries(query)
        .map(([ key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&')
    }

    return await api.get('ref_address/province/data' + queryString, config)
      .then(res => {
        if (res.data?.status == 200) {
          dataProvinces.value = res.data.results.data;
        }

        else {
          errorProvinces.value = res.data;

          throw res.data;
        }
      })
      .catch(e => {
        errorProvinces.value = e;

        throw e;
      })
      .finally(() => loadingProvinces.value = false);
  };

  const getProvinceNameById = (id: string | undefined): string => {
    const province = dataProvinces.value.find(p => p.id === id);

    return province ? province.name : '';
  };

  const cities = async (query?: Record<string, any>, config?: AxiosRequestConfig) => {
    loadingCities.value = true;

    errorCities.value = undefined;

    let queryString = '';

    if ( query ) {
      queryString = '?' + Object.entries(query)
        .map(([ key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&')
    }

    return await api.get('ref_address/city/data' + queryString, config)
      .then(res => {
        if (res.data?.status == 200) {
          dataCities.value = res.data.results.data;
        }

        else {
          errorCities.value = res.data;

          throw res.data;
        }
      })
      .catch(e => {
        errorCities.value = e;

        throw e;
      })
      .finally(() => loadingCities.value = false);
  };

  const getCityNameById = (id: string | undefined): string => {
    const city = dataCities.value.find(c => c.id === id);

    return city ? city.name : '';
  };

  const subdistricts = async (query?: Record<string, any>, config?: AxiosRequestConfig) => {
    loadingSubdistricts.value = true;

    errorSubdistricts.value = undefined;

    let queryString = '';

    if ( query ) {
      queryString = '?' + Object.entries(query)
        .map(([ key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&')
    }

    return await api.get('ref_address/subdistrict/data' + queryString, config)
      .then(res => {
        if (res.data?.status == 200) {
          dataSubdistricts.value = res.data.results.data;
        }

        else {
          errorSubdistricts.value = res.data;

          throw res.data;
        }
      })
      .catch(e => {
        errorSubdistricts.value = e;

        throw e;
      })
      .finally(() => loadingSubdistricts.value = false);
  };

  const getSubdistrictNameById = (id: string | undefined): string => {
    const subdistrict = dataSubdistricts.value.find(s => s.id === id);

    return subdistrict ? subdistrict.name : '';
  };

  const villages = async (query?: Record<string, any>, config?: AxiosRequestConfig) => {
    loadingVillages.value = true;

    errorVillages.value = undefined;

    let queryString = '';

    if ( query ) {
      queryString = '?' + Object.entries(query)
        .map(([ key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&')
    }

    return await api.get('ref_address/village/data' + queryString, config)
      .then(res => {
        if (res.data?.status == 200) {
          dataVillages.value = res.data.results.data;
        }

        else {
          errorVillages.value = res.data;

          throw res.data;
        }
      })
      .catch(e => {
        errorVillages.value = e;

        throw e;
      })
      .finally(() => loadingVillages.value = false);
  };

  const getVillageNameById = (id: string | undefined): string => {
    const village = dataVillages.value.find(v => v.id === id);

    return village ? village.name : '';
  };

  return {
    provinces,
    getProvinceNameById,
    loadingProvinces,
    dataProvinces,
    errorProvinces,

    cities,
    getCityNameById,
    loadingCities,
    dataCities,
    errorCities,

    subdistricts,
    getSubdistrictNameById,
    loadingSubdistricts,
    dataSubdistricts,
    errorSubdistricts,

    villages,
    getVillageNameById,
    loadingVillages,
    dataVillages,
    errorVillages
  };
}