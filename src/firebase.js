// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBaxxfMV8t1s4e3Lmm9ltx7BYrqBfzuFOk",
  authDomain: "imessage-clone-74727.firebaseapp.com",
  projectId: "imessage-clone-74727",
  storageBucket: "imessage-clone-74727.appspot.com",
  messagingSenderId: "702747111475",
  appId: "1:702747111475:web:520b28e83ff3a053f0f346",
  measurementId: "G-ECCW0PK11K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth()
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db