// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD5fuCkhhHzg9D7V44iOxD8XGr5_0AkXG0",
    authDomain: "weekdays230pmreact-6ebef.firebaseapp.com",
    projectId: "weekdays230pmreact-6ebef",
    storageBucket: "weekdays230pmreact-6ebef.appspot.com",
    messagingSenderId: "458273906610",
    appId: "1:458273906610:web:c512d34d828b946d600eab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);