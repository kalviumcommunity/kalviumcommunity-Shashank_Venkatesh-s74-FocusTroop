// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJU5GKdvKzMf61ly8mV5IIHj6Weg_sy8Y",
  authDomain: "focustroop-e1380.firebaseapp.com",
  projectId: "focustroop-e1380",
  storageBucket: "focustroop-e1380.firebasestorage.app",
  messagingSenderId: "42070080344",
  appId: "1:42070080344:web:5800918f2cf9bed0acc32d",
  measurementId: "G-63Z02SPJY4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);