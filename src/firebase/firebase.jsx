// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBq9O1FUSt64mjlBAzIjJh3Fe5zxMeM6SU",
  authDomain: "font-pairing-assistant.firebaseapp.com",
  projectId: "font-pairing-assistant",
  storageBucket: "font-pairing-assistant.appspot.com",
  messagingSenderId: "439596995826",
  appId: "1:439596995826:web:67f3eb9426e9408a22ac6b",
  measurementId: "G-7X25ZB6V60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth};