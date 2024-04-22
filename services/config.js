// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZYKBl9xJK84tVySWxHn1QrYWt2Jqc0WY",
  authDomain: "thank-you-by-ch.firebaseapp.com",
  projectId: "thank-you-by-ch",
  storageBucket: "thank-you-by-ch.appspot.com",
  messagingSenderId: "1050816425028",
  appId: "1:1050816425028:web:823a2576a154a147066011",
  measurementId: "G-25FCTF5ZT1",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
const analytics = getAnalytics(FIREBASE_APP);
