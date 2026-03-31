import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { 
  getDocs, 
  collection, 
  where,
  addDoc, 
  serverTimestamp, 
  onSnapshot, 
  orderBy, 
  query 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// 🔹 DOM Elements
const studentName = document.getElementById("studentName");
const studentRoll = document.getElementById("studentRoll");
const studentClass = document.getElementById("studentClass");
const studentSemester = document.getElementById("studentSemester");
const logoutBtn = document.getElementById("logout");

const adminSection = document.getElementById("admin-section");
const noticeForm = document.getElementById("notice-form");
const noticeList = document.getElementById("notic-list");

// 🔹 Replace with your actual admin UID
const ADMIN_UID = "f7xRFBRyZkbRo5ACkQZewfeTNPG3";


// 🔐 Detect logged-in user
onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  // 🔐 Admin access
  if (user.uid === ADMIN_UID && adminSection) {
    adminSection.style.display = "block";
  }

  // 🔎 Fetch student data
  try {
    const q = query(
      collection(db, "students"),
      where("uid", "==", user.uid)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const data = querySnapshot.docs[0].data();

      studentName.textContent = data.firstName || "-";
      studentRoll.textContent = data.rollNo || "-";
      studentClass.textContent = data.classYear || "-";
      studentSemester.textContent = data.semester + " Sem" || "-";
    }

  } catch (err) {
    console.error("Error fetching student data:", err);
  }

});


// 🚪 Logout
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      window.location.href = "index.html";
    } catch (err) {
      console.error("Logout error:", err);
    }
  });
}


// 📝 Add Notice (Admin)
if (noticeForm) {
  noticeForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const message = document.getElementById("message").value;
    const link = document.getElementById("link").value;

    try {
      await addDoc(collection(db, "notices"), {
        title: title,
        message: message,
        link: link || "",
        createdAt: serverTimestamp()
      });

      noticeForm.reset();
      alert("Notice posted successfully");

    } catch (error) {
      console.error("Error adding notice:", error);
      alert("Failed to post notice");
    }
  });
}


// 📢 Show Notices (Realtime)
if (noticeList) {

  const q = query(
    collection(db, "notices"),
    orderBy("createdAt", "desc")
  );

  onSnapshot(q, (snapshot) => {

    noticeList.innerHTML = "";

    snapshot.forEach((docItem) => {
      const data = docItem.data();

      const div = document.createElement("div");
      div.classList.add("notice-card");

      div.innerHTML = `
        <h2 class="notice-title">${data.title}</h2>
        <p class="notice-para">${data.message || ""}</p>
        ${data.link ? 
          `<a href="${data.link}" target="_blank" class="notice-link">
            Open Link 🔗
          </a>` : ""
        }
        <hr>
      `;

      noticeList.appendChild(div);
    });

  });
}
