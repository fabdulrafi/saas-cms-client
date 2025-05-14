import { ComponentCustomProperties } from "vue";
import { date, dateslash, time, datetime, daterange, currency, numeric, decimal, email, phone, age, formatsize } from '@/app-format';

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $format: {
      date: typeof date,
      dateslash: typeof dateslash,
      time: typeof time,
      datetime: typeof datetime,
      daterange: typeof daterange,
      currency: typeof currency,
      numeric: typeof numeric,
      decimal: typeof decimal,
      email: typeof email,
      phone: typeof phone,
      age: typeof age,
      formatsize: typeof formatsize,
    };
  }
}

declare global {
  interface Window { 
    doGTranslate: any;
  }
}