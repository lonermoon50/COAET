
// 🔹 Imports MUST be at the top
import { db } from "./firebase.js";
import { collection, addDoc } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔹 Get elements
const form = document.getElementById("regform");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmpassword");
const passError = document.getElementById("passError");
const confirmError = document.getElementById("confirmError");

// 🔹 Submit handler (ONLY ONE)
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  passError.textContent = "";
  confirmError.textContent = "";

  if (password.value === "") {
    passError.textContent = "Password is required";
    return;
  }

  if (confirmPassword.value === "") {
    confirmError.textContent = "Please confirm your password";
    return;
  }

  if (password.value !== confirmPassword.value) {
    confirmError.textContent = "Passwords do not match";
    return;
  }

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const docRef = await addDoc(collection(db, "students"), {
      ...data,
      createdAt: new Date()
    });

    console.log("Saved with ID:", docRef.id);
    alert("Registration successful ✅");

    form.reset();
    window.location.href = "index.html";

  } catch (error) {
    console.error("Firestore error:", error);
    alert("Error saving data ❌");
  }
});
