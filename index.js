// import { db } from "./firebase.js";
// import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// // 🔹 Grab elements
// const usernameInput = document.getElementById("username"); // roll number input
// const passwordInput = document.getElementById("password");
// const loginButton = document.getElementById("login");
// const message = document.getElementById("message");

// // 🔹 Function to validate login
// async function validateRoll() {
//     const roll = usernameInput.value.trim();
//     const password = passwordInput.value.trim();

//     // Reset message
//     message.textContent = "";
//     message.style.color = "red";

//     // Basic validation
//     if (!roll) {
//         message.textContent = "Please enter your Roll number";
//         return;
//     }
//     if (!password) {
//         message.textContent = "Please enter your password";
//         return;
//     }

//     try {
//         const studentsRef = collection(db, "students");
//         const q = query(
//             studentsRef,
//             where("rollNo", "==", roll),       // matches the registration field
//             where("password", "==", password)  // matches the registration field
//         );

//         const querySnapshot = await getDocs(q);

//         if (querySnapshot.empty) {
//             message.textContent = "Invalid Roll number or password";
//             return;
//         }

//         // ✅ Successful login
//         message.style.color = "green";
//         message.textContent = "Login successful";

//         // Optional: save user info to localStorage/sessionStorage
//         const userData = querySnapshot.docs[0].data();
//         localStorage.setItem("student", JSON.stringify(userData));

//         // Redirect to dashboard or student page
//         setTimeout(() => {
//             window.location.href = "homepage.html"; // create this page for logged-in students
//         }, 1000);

//     } catch (error) {
//         console.error("Login error:", error);
//         message.textContent = "Something went wrong. Try again ";
//     }
// }

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
        return;
    }

    try {
        const studentsRef = collection(db, "students");
        const q = query(studentsRef, where("rollNo", "==", roll));

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            message.textContent = "Roll number not found";
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
