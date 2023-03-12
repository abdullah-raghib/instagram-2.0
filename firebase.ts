// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUtBUXmWDbcNi4-6TVO3GfeH66UtBbfvk",
  authDomain: "instagram-50430.firebaseapp.com",
  projectId: "instagram-50430",
  storageBucket: "instagram-50430.appspot.com",
  messagingSenderId: "35178764134",
  appId: "1:35178764134:web:0bbe04107462f6e5e31aa7"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig): getApp();
const db = getFirestore();
const storage = getStorage();
const auth = getAuth(app);

export {app, db, storage, auth};