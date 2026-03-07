import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.getElementById("regform");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmpassword");
const passError = document.getElementById("passError");
const confirmError = document.getElementById("confirmError");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  passError.textContent = "";
  confirmError.textContent = "";

  if (password.value !== confirmPassword.value) {
    confirmError.textContent = "Passwords do not match";
    return;
  }

  const rollNo = form.rollNo.value.toUpperCase();
  const passwordValue = password.value;

  // Convert roll number into email
  const email = rollNo + "@coaet.edu";

  try {
    // Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, passwordValue);
    const user = userCredential.user;

    // Save student data in Firestore (WITHOUT password)
    await addDoc(collection(db, "students"), {
      uid: user.uid,
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      Gender: form.Gender.value,
      classYear: form.classYear.value,
      semester: form.semester.value,
      password: form.password.value,
      rollNo: rollNo,
      createdAt: new Date()
    });

    alert("Registration successful ✅");
    window.location.href = "index.html";

  } 
  catch (err) {

  if (err.code === "auth/email-already-in-use") {
    alert("This Roll Number is already registered. Please login instead.");
  }

  else if (err.code === "auth/weak-password") {
    alert("Password must be at least 6 characters.");
  }

  else {
    alert("Registration failed: " + err.message);
  }

}

});
