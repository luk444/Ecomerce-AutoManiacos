// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAohShqIRa-QjUlnu9RL6gLNjvXmNf1A4o",
  authDomain: "automaniacos-36e9b.firebaseapp.com",
  projectId: "automaniacos-36e9b",
  storageBucket: "automaniacos-36e9b.appspot.com",
  messagingSenderId: "1005417606042",
  appId: "1:1005417606042:web:941d82a327890c4e066823"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }