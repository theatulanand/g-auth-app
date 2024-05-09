// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "auth-app-c8915.firebaseapp.com",
  projectId: "auth-app-c8915",
  storageBucket: "auth-app-c8915.appspot.com",
  messagingSenderId: "39814864601",
  appId: "1:39814864601:web:9af1886a155aaabc51a8c8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
