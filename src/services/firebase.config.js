// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

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
  measurementId: "G-DT9P1PVKLR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

