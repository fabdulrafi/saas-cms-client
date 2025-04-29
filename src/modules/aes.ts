export const useAes = () => {
  let keyHex: string = import.meta.env.VITE_AES_KEY as string;
  let ivHex: string = import.meta.env.VITE_AES_IV as string;

  const hexToUint8Array = (hexString: string): Uint8Array => {
    return new Uint8Array(hexString.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
  }

  const base64ToUint8Array = (base64: string): Uint8Array => {
    const binaryString = atob(base64);
    return Uint8Array.from(binaryString, char => char.charCodeAt(0));
  }

  const keyArray = hexToUint8Array(keyHex);
  const ivArray = hexToUint8Array(ivHex);

  let key: CryptoKey;

  const generateKey = async () => {
    key = await window.crypto.subtle.importKey(
      'raw',
      keyArray,
      { name: 'AES-GCM', length: 128 },
      false,
      ['encrypt', 'decrypt']
    );
  };
  
  const encrypt = async (payload: string): Promise<string> => {
    if (!key) await generateKey();
    
    const encodedText = new TextEncoder().encode(payload);

    const encryptedData = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: ivArray,
        tagLength: 128
      },
      key,
      encodedText
    );

    const resultArray = new Uint8Array(ivArray.length + encryptedData.byteLength);
    resultArray.set(ivArray, 0);
    resultArray.set(new Uint8Array(encryptedData), ivArray.length);

    return btoa(String.fromCharCode.apply(null, resultArray as unknown as number[]));
  };

  const decrypt = async (payload: string): Promise<string> => {
    if (!key) await generateKey();
    
    const encryptedArray = base64ToUint8Array(payload);

    const iv = encryptedArray.slice(0, 12);
    const data = encryptedArray.slice(12);

    const decryptedData = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv,
        tagLength: 128
      },
      key,
      data
    );

    return new TextDecoder().decode(decryptedData);
  };

  return {
    encrypt,
    decrypt
  }
};


