import { computed, ref } from 'vue';

export const usePassword = (length: number = 8) => {
  const numbers = '0123456789';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

  const allChars = numbers + lowercase + uppercase + specialChars;

  const password = ref();

  const generate = computed(() => {
    password.value = '';
    password.value += numbers[Math.floor(Math.random() * numbers.length)];
    password.value += lowercase[Math.floor(Math.random() * lowercase.length)];
    password.value += uppercase[Math.floor(Math.random() * uppercase.length)];
    password.value += specialChars[Math.floor(Math.random() * specialChars.length)];

    for (let i = password.value.length; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      password.value += allChars[randomIndex];
    }

    if (password.value) {
      return password.value.split('').sort(() => Math.random() - 0.5).join('');
    }
  });

  return {
    generate
  }
};

// untuk singkatan kata / kalimat
export const  useAbbreviation = (text: string): string => {
  const words = text.split(' ');
  
  const abbreviation = words.map(word => word[0].toUpperCase()).join('');
  
  return abbreviation;
};