// Import the functions you need from the SDKs you need

import { getAuth, signOut,  } from "firebase/auth";

import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import {router} from "../router";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxKegFSRQC05-cYUoxfpLE22EYjLeVb_Q",
  authDomain: "to-do-listen-app.firebaseapp.com",
  projectId: "to-do-listen-app",
  storageBucket: "to-do-listen-app.appspot.com",
  messagingSenderId: "1093318005961",
  appId: "1:1093318005961:web:4fe93537938445e0a0e918",
  measurementId: "G-DT9P1PVKLR",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const useAuth = () => useAuthState(auth);
export const user = await new Promise((resolve, reject) => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    unsubscribe();
    resolve(user);
  }, reject);
})

export const logout = async () => {
  await signOut(auth);
  router.options.context.user = null;
  router.invalidate();
};
