import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8bGHxsDphfNX1-kjjgke8T-uH1hnhz9o",
  authDomain: "resturantreviewapp-6681a.firebaseapp.com",
  projectId: "resturantreviewapp-6681a",
  storageBucket: "resturantreviewapp-6681a.firebasestorage.app",
  messagingSenderId: "546082047547",
  appId: "1:546082047547:web:188d2144824941f5debe1e",
  measurementId: "G-GZV4YT7C22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

