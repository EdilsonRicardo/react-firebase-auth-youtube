// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANta2yxPh3LsCsRO9nXnfwN5HPSd9JGyc",
  authDomain: "book-list-with-firebase-32975.firebaseapp.com",
  projectId: "book-list-with-firebase-32975",
  storageBucket: "book-list-with-firebase-32975.appspot.com",
  messagingSenderId: "854440411121",
  appId: "1:854440411121:web:207cead4e0f9699d5f8e50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);