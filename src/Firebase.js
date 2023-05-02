// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import firebase from 'firebase/compat/app';
import {getAuth} from "firebase/auth";
import 'firebase/compat/database'
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPmfPLtDOUVU28FsmhU6mTRmGA-IdcBGI",
  authDomain: "mypuzzle-783c6.firebaseapp.com",
  projectId: "mypuzzle-783c6",
  storageBucket: "mypuzzle-783c6.appspot.com",
  messagingSenderId: "290609499157",
  appId: "1:290609499157:web:b0fe89180d855fdcd1521c",
  measurementId: "G-PJ3LPDK6V0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const datadb=firebase.database();
export const db=getFirestore(app);
export default app;