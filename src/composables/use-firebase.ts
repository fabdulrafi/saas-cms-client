import { FirebaseApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import { inject } from 'vue';

import { useAppStore } from '@/stores/index';

export const useFirebase = () => {
  const fbInitApp = inject('fbInit');
  const store = useAppStore();

  const setRegistrationToken = (): void => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js', {
        scope: 'firebase-cloud-messaging-push-scope'
      })
      .then(() => {
        Notification.requestPermission().then(() => {
          const messaging = getMessaging(<FirebaseApp>fbInitApp);

          getToken(messaging).then((currentToken) => {

            console.log('Token firebase:', currentToken);

          }).catch((err) => { 
            console.log('An error occurred while retrieving token.', err);
          });
        }).catch((e) => console.log(e));
      }).catch((err) => {
        console.log(err);
      });
    };
  };

  return {
    setRegistrationToken
  };
};