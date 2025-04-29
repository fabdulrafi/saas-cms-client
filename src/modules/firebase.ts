
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDZjAMqmqMFwnx0yDVkqNAD3sI4S_c91Ps",
  authDomain: "amanata-e46ee.firebaseapp.com",
  projectId: "amanata-e46ee",
  storageBucket: "amanata-e46ee.appspot.com",
  messagingSenderId: "272603181136",
  appId: "1:272603181136:web:1051b3e4422b451fe16155"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const onAuth = onAuthStateChanged;
export const db = getFirestore(app);

export default app;
