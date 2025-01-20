
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDztzDLUmShS9gfoG71F2ugJ3GV9uNZTe0",
  authDomain: "novotel-fcb88.firebaseapp.com",
  projectId: "novotel-fcb88",
  storageBucket: "novotel-fcb88.firebasestorage.app",
  messagingSenderId: "1000361731447",
  appId: "1:1000361731447:web:efb4090a3c607f6fe56d72",
  measurementId: "G-YH6T4ZCLLN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);

export {app, auth};