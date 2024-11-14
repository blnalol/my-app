

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2FS-8MdvpY6GbxK-jVKONu-Fb-28GYGA",
  authDomain: "kftestfyp.firebaseapp.com",
  projectId: "kftestfyp",
  storageBucket: "kftestfyp.firebasestorage.app",
  messagingSenderId: "1013459063122",
  appId: "1:1013459063122:web:5c980520bf3f547353aa8b",
  measurementId: "G-EWM8T019E8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const storage = getStorage(app);

export const db = getFirestore()