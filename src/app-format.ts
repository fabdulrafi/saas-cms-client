import moment from 'moment'

export default {
  date (value) {
    return moment(value).format('DD MMM, YYYY');
  },
  time (value) {
    return moment(value).format('HH:mm');
  },
  datetime (value) {
    return moment(value).format('DD MMM, YYYY HH:mm');
  },
  daterange (value) {
    const [start, end] = value.split(' s/d ');
    return `${moment(start).format('DD MMM, YYYY')} s/d ${moment(end).format('DD MMM, YYYY')}`;
  },

  currency (value) {
    let languages = JSON.parse(window.localStorage.getItem('googtrans') as string)
    let money = eval(value);
    
    // id-ID|IDR en-US|USD ko-KR|KRW ja-JP|JPY
    
    return `${money.toLocaleString(
      languages?.code === 'en|en' ? 'en-US' : languages?.code === 'en|ko' ? 'ko-KR' : languages?.code === 'en|ja' ? 'ja-JP' : 'en-ID', 
      { 
        style: 'currency', 
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        currency: languages?.code === 'en|en' ? 'USD' : languages?.code === 'en|ko' ? 'KRW' : languages?.code === 'en|ja' ? 'JPY' : 'IDR',  
      }
    )}`;
  },

  numeric (value: number) {
    const [integerPart, decimalPart] = value.toString().split('.');
  
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return formattedIntegerPart;
  },

  decimal (value, decimal = 2) {
    const formatter = new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: decimal,
      maximumFractionDigits: decimal
    });
    
    return formatter.format(value);
  },

  email (value) {
    return value.substring(0, 5) + '@xxxx';
  },

  phone (value) {
    return value.substring(0, 4) + ' - xxxx - xxxx';
  },

  age (value) {
    if (!value) return 0
  
    const today = new Date()
    const birthDate = new Date(value)
    
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDifference = today.getMonth() - birthDate.getMonth()
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    return age
  },

  formatsize (value, decimal = 2) {
    const formatter = new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: decimal,
      maximumFractionDigits: decimal
    });

    if (value >= 1_000_000_000_000) {
      return `${formatter.format(value / 1_000_000_000_000)} TB`
    } else if (value >= 1_000_000_000) {
      return `${formatter.format(value / 1_000_000_000)} GB`
    } else if (value >= 1_000_000) {
      return `${formatter.format(value / 1_000_000)} MB`
    } else if (value >= 1_000) {
      return `${formatter.format(value / 1_000)} KB`
    } else {
      return `${value} B`
    }
  }
};
