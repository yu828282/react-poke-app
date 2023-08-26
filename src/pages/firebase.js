// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsQk5FuHu0dGzNqjUKVavvqoXvTn6VE3Q",
  authDomain: "react-poke-app-6e49d.firebaseapp.com",
  projectId: "react-poke-app-6e49d",
  storageBucket: "react-poke-app-6e49d.appspot.com",
  messagingSenderId: "219892815682",
  appId: "1:219892815682:web:c5bc55fd69f5d0771fdadb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;