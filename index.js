import { auth, db } from "./firebase.js";

import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { 
  collection, query, where, getDocs 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// 🚀 Auto login
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const q = query(
      collection(db, "students"),
      where("uid", "==", user.uid)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const studentData = querySnapshot.docs[0].data();
      const studentClass = studentData.classYear;

      if (studentClass === "1st Year") {
        window.location.href = "1styear.html";
      } else if (studentClass === "2nd Year") {
        window.location.href = "2ndyear.html";
      } else if (studentClass === "3rd Year") {
        window.location.href = "3rdyear.html";
      } else {
        window.location.href = "homepage.html";
      }
    }
  }
});


// DOM
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login");
const message = document.getElementById("message");


async function validateRoll() {
  const roll = usernameInput.value.trim().toUpperCase();
  const password = passwordInput.value.trim();
  const email = roll + "@coaet.edu";

  message.textContent = "";

  if (!roll || !password) {
    message.style.color = "red";
    message.textContent = "Enter roll number and password";
    message.style.display = "block";
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const q = query(
      collection(db, "students"),
      where("uid", "==", user.uid)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const studentData = querySnapshot.docs[0].data();
      const studentClass = studentData.classYear;

      message.style.color = "green";
      message.textContent = "Login successful";
      message.style.display = "block";

      setTimeout(() => {
        if (studentClass === "1st Year") {
          window.location.href = "1styear.html";
        } else if (studentClass === "2nd Year") {
          window.location.href = "2ndyear.html";
        } else if (studentClass === "3rd Year") {
          window.location.href = "3rdyear.html";
        } else {
          window.location.href = "homepage.html";
        }
      }, 1000);

    } else {
      message.style.color = "red";
      message.textContent = "Student record not found";
      message.style.display = "block";
    }

  } catch (err) {
    console.error(err);
    message.style.color = "red";
    message.textContent = "Invalid Roll Number or Password";
    message.style.display = "block";
  }
}

loginButton.addEventListener("click", validateRoll);
