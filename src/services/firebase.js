import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyB8Tq7msEK_PU1jx1gk0NQ0rNbd3ryp48g',
  authDomain: 'projeto-apis-cb67d.firebaseapp.com',
  projectId: 'projeto-apis-cb67d',
  storageBucket: 'projeto-apis-cb67d.appspot.com',
  messagingSenderId: '112581464124',
  appId: '1:112581464124:web:3775337d78223b4f407339',
  measurementId: 'G-H3P9JTDCCH',
});

export const db = initializeFirestore(firebaseApp, {
  experimentalForceLongPolling: true,
});
export const auth = getAuth(firebaseApp);
export const firebase = firebaseApp;
