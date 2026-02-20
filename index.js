import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
    await signInWithEmailAndPassword(auth, email, password);
    message.style.color = "green";
    message.textContent = "Login successful";
    message.style.display = "block";

    setTimeout(() => {
      window.location.href = "homepage.html";
    }, 1000);

  } catch (err) {
    message.style.color = "red";
    message.textContent = "Invalid Roll Number or Password ";
    message.style.display = "block";
  }
}

loginButton.addEventListener("click", validateRoll);

