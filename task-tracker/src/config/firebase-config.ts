// import firebase from "firebase/app";
// import  "firebase/firestore";
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";
//import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB9Q9Hl1d3z34QL_uf_8vhYWcWwusF5mTU",
  authDomain: "task-tracker-3f178.firebaseapp.com",
  projectId: "task-tracker-3f178",
  storageBucket: "task-tracker-3f178.appspot.com",
  messagingSenderId: "319907180698",
  appId: "1:319907180698:web:53447e5614106903f0ef23",
  measurementId: "G-N4PDEWCXPD"
};
const app= initializeApp(firebaseConfig)
const db= getFirestore(app)
export {db};