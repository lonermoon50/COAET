

// loginButton.addEventListener("click", validateRoll);
import { db } from "./firebase.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔹 Grab elements
const usernameInput = document.getElementById("username"); // roll number input
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login");
const message = document.getElementById("message");

// 🔹 Function to validate login
async function validateRoll() {
    const roll = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    message.textContent = "";
    message.style.color = "red";

    if (!roll || !password) {
        message.textContent = "Enter roll number and password";
        message.style.display = "block"; 
        return;
    }

    try {
        const studentsRef = collection(db, "students");
        const q = query(studentsRef, where("rollNo", "==", roll));

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            message.textContent = "Roll number not found";
            message.style.display = "block"; 
            return;
        }

        const studentData = snapshot.docs[0].data();

        // 🔐 Check password manually
        if (studentData.password !== password) {
            message.textContent = "Wrong password";
            return;
        }

        // ✅ Login Success
        message.style.display = "block"; 
        message.style.color = "green";
        message.textContent = "Login successful";

        localStorage.setItem("student", JSON.stringify(studentData));
        setTimeout(() => {
            window.location.href = "homepage.html";
        }, 1000);

    } catch (err) {
        console.error(err);
        message.textContent = "Error connecting to database";
    }
}
loginButton.addEventListener("click", validateRoll);

