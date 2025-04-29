importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

try {
  firebase.initializeApp({
    apiKey: "AIzaSyCpSBm0ehBiEr4muaISG3Rgm_UNR6Bfd5M",
    authDomain: "klatenkab-b26a2.firebaseapp.com",
    projectId: "klatenkab-b26a2",
    storageBucket: "klatenkab-b26a2.appspot.com",
    messagingSenderId: "403502709904",
    appId: "1:403502709904:web:bc8056a79daf65930f2c15",
    measurementId: "G-89FHTNM0WW"
  });

  const messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png',
    };

    self.registration.showNotification(notificationTitle,notificationOptions);
  });
} catch (err) {
  console.log(err);
};