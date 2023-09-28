// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWC8lGpaKyEJer5DTr1-kE21llgJLacvE",
  authDomain: "expense-tracker-54193.firebaseapp.com",
  projectId: "expense-tracker-54193",
  storageBucket: "expense-tracker-54193.appspot.com",
  messagingSenderId: "168906158913",
  appId: "1:168906158913:web:6d198dd32b933090a7e7c0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { app, db };
