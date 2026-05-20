import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCX63m_Xjn0KPPzI632bAO4_Y-EMf_0xyI",
  authDomain: "rich-canopy.firebaseapp.com",
  projectId: "rich-canopy",
  storageBucket: "rich-canopy.firebasestorage.app",
  messagingSenderId: "170136151994",
  appId: "1:170136151994:web:4a299a795e528245d45f83"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);