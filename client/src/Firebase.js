// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDD-F0jPoEM64KOdBFlS7G-2CQMHgqb-lw",
  authDomain: "portfolio-1caa9.firebaseapp.com",
  projectId: "portfolio-1caa9",
  storageBucket: "portfolio-1caa9.appspot.com",
  messagingSenderId: "87140756893",
  appId: "1:87140756893:web:bf4ac46cffd6ccf5e65374",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
