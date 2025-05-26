// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFf_0n74hGJWEN1-e1KhSPffSci7pJhi8",
  authDomain: "wu-xing-cards-6dfa6.firebaseapp.com",
  projectId: "wu-xing-cards-6dfa6",
  storageBucket: "wu-xing-cards-6dfa6.appspot.com",
  messagingSenderId: "124161312980",
  appId: "1:124161312980:web:8589a5474727d973ca5341",
  measurementId: "G-NN9WE59FQR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
