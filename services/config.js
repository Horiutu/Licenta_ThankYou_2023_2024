import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
s;

export const firebaseConfig = {
  apiKey: "AIzaSyBZYKBl9xJK84tVySWxHn1QrYWt2Jqc0WY",
  authDomain: "thank-you-by-ch.firebaseapp.com",
  projectId: "thank-you-by-ch",
  storageBucket: "thank-you-by-ch.appspot.com",
  messagingSenderId: "1050816425028",
  appId: "1:1050816425028:web:823a2576a154a147066011",
  measurementId: "G-25FCTF5ZT1",
  databaseURL:
    "https://thank-you-by-ch-default-rtdb.europe-west1.firebasedatabase.app",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_ST = getStorage(FIREBASE_APP);
export const FIRESTORE_DBDB = getDatabase(FIREBASE_APP);
const analytics = getAnalytics(FIREBASE_APP);
