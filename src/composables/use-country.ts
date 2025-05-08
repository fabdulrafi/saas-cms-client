import { ref, onMounted } from 'vue'

export const countryCallingCodes = [
  { country: 'Australia', country_code: 'AU', calling_code: '+61', flag: 'https://cdn.ipwhois.io/flags/au.svg', currency: 'AUD' },
  { country: 'China', country_code: 'CN', calling_code: '+86', flag: 'https://cdn.ipwhois.io/flags/cn.svg', currency: 'CNY' },
  { country: 'India', country_code: 'IN', calling_code: '+91', flag: 'https://cdn.ipwhois.io/flags/in.svg', currency: 'INR' },
  { country: 'Indonesia', country_code: 'ID', calling_code: '+62', flag: 'https://cdn.ipwhois.io/flags/id.svg', currency: 'IDR' },
  { country: 'Japan', country_code: 'JP', calling_code: '+81', flag: 'https://cdn.ipwhois.io/flags/jp.svg', currency: 'JPY' },
  { country: 'Korea, Republic of', country_code: 'KR', calling_code: '+82', flag: 'https://cdn.ipwhois.io/flags/kr.svg', currency: 'KRW' },
  { country: 'Malaysia', country_code: 'MY', calling_code: '+60', flag: 'https://cdn.ipwhois.io/flags/my.svg', currency: 'MYR' },
  { country: 'Philippines', country_code: 'PH', calling_code: '+63', flag: 'https://cdn.ipwhois.io/flags/ph.svg', currency: 'PHP' },
  { country: 'Saudi Arabia', country_code: 'SA', calling_code: '+966', flag: 'https://cdn.ipwhois.io/flags/sa.svg', currency: 'SAR' },
  { country: 'Singapore', country_code: 'SG', calling_code: '+65', flag: 'https://cdn.ipwhois.io/flags/sg.svg', currency: 'SGD' },
  { country: 'Thailand', country_code: 'TH', calling_code: '+66', flag: 'https://cdn.ipwhois.io/flags/th.svg', currency: 'THB' },
  { country: 'United Kingdom', country_code: 'GB', calling_code: '+44', flag: 'https://cdn.ipwhois.io/flags/gb.svg', currency: 'GBP' },
  { country: 'United States', country_code: 'US', calling_code: '+1', flag: 'https://cdn.ipwhois.io/flags/us.svg', currency: 'USD' },
  { country: 'Viet Nam', country_code: 'VN', calling_code: '+84', flag: 'https://cdn.ipwhois.io/flags/vn.svg', currency: 'VND' },
];

export const useCountry = () => {
  const currentCountry = ref<string | null>(null)
  const currentCallingCode = ref<string | null>(null)
  const currentFlag = ref<string | null>(null)

  const detectCountry = async () => {
    try {
      const res = await fetch('https://ipwho.is')
      const data = await res.json()

      if (data.success) {
        currentCountry.value = data.country
        
        const found = countryCallingCodes.find(c => c.country_code === data.country_code)
        
        currentCallingCode.value = found?.calling_code ?? `+${data.calling_code}`
        currentFlag.value = found?.flag ?? `https://cdn.ipwhois.io/flags/${data.country_code.toLowerCase()}.svg`
      } else {
        console.error('Failed to detect country:', data.message)
      }
    } catch (error) {
      console.error('Error detecting country:', error)
    }
  }

  onMounted(() => {
    detectCountry()
  })

  return {
    currentCountry,
    currentCallingCode,
    currentFlag,
    countryCallingCodes
  }
}
