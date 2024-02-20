import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBK-eyX-eKy8NvzEoki1lk9nw0OeYXUo9A",
  authDomain: "ecommerce-app-df2fc.firebaseapp.com",
  projectId: "ecommerce-app-df2fc",
  storageBucket: "ecommerce-app-df2fc.appspot.com",
  messagingSenderId: "381596353364",
  appId: "1:381596353364:web:174d237a1900dc07f43ec1",
  measurementId: "G-R14MSM5LPB"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

