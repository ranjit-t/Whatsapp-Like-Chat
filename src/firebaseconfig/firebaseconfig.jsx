import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCZ5gn-kDjg3WCwhHmqWLyK0VcKlA0GrH0",
  authDomain: "textapp-7d4a4.firebaseapp.com",
  projectId: "textapp-7d4a4",
  storageBucket: "textapp-7d4a4.appspot.com",
  messagingSenderId: "622088732133",
  appId: "1:622088732133:web:c0653185ec4ee3d703c30c",
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
