// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCx1WlUBklHAAhz0nrGV83KAnF3O9Y3kZM",
  authDomain: "sitima-2186a.firebaseapp.com",
  projectId: "sitima-2186a",
  storageBucket: "sitima-2186a.appspot.com",
  messagingSenderId: "642131371586",
  appId: "1:642131371586:web:3d4d42f0a666c40ca56fdb",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);