import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAT90PpKBRES5cVWRe2Ku1rSDb1_Cczn7s",
  authDomain: "chitchat-b1d7f.firebaseapp.com",
  projectId: "chitchat-b1d7f",
  storageBucket: "chitchat-b1d7f.appspot.com",
  messagingSenderId: "81835527944",
  appId: "1:81835527944:web:f0786ee4e4486f7ed026bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)