import { ComponentCustomProperties } from "vue";
import { date, time, datetime, currency, numeric, email, phone } from '@/app-format';

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $format: {
      date: typeof date,
      time: typeof time,
      datetime: typeof datetime,
      daterange: typeof daterange,
      currency: typeof currency,
      numeric: typeof numeric,
      decimal: typeof decimal,
      email: typeof email,
      phone: typeof phone,
      age: typeof age
    };
  }
}

declare global {
  interface Window { 
    doGTranslate: any;
  }
}