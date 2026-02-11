// Import Firebase modules
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPC_w5FdNTcJANB0jjVoA2zD5Xc_5y3ZM",
  authDomain: "coaet-student-registration.firebaseapp.com",
  projectId: "coaet-student-registration",
  storageBucket: "coaet-student-registration.firebasestorage.app",
  messagingSenderId: "1040439166639",
  appId: "1:1040439166639:web:6f1b8a66644bbbdc53765a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
export const auth = getAuth(app);


