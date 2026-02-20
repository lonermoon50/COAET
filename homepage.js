import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
  doc, 
  getDoc, 
  collection, 
  addDoc, 
  serverTimestamp, 
  onSnapshot, 
  orderBy, 
  query 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const adminSection = document.getElementById("admin-section");
const noticeList = document.getElementById("notice-list");
const noticeForm = document.getElementById("notice-form");

const ADMIN_UID = "f7xRFBRyZkbRo5ACkQZewfeTNPG3";

onAuthStateChanged(auth, (user) => {
  if (user && user.uid === ADMIN_UID) {
    adminSection.style.display = "block";
  }
});


  try {
    const studentRef = doc(db, "students", user.uid);
    const studentSnap = await getDoc(studentRef);

    if (studentSnap.exists()) {
      const data = studentSnap.data();

      if (data.role === "admin") {
        if (adminSection) adminSection.style.display = "block";
      }
    }

  } catch (error) {
    console.error("Role check error:", error);
  }
;

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
      alert("Notice posted successfully ");

    } catch (error) {
      console.error("Error adding notice:", error);
      alert("Failed to post notice ");
    }
  });
}

if (noticeList) {

  const q = query(
    collection(db, "notices"),
    orderBy("createdAt", "desc")
  );

  onSnapshot(q, (snapshot) => {

    noticeList.innerHTML = "";

    snapshot.forEach((doc) => {
      const data = doc.data();

      const div = document.createElement("div");
      div.classList.add("notice-card");

      div.innerHTML = `
        <h2 class="notice-title" >${data.title}</h2>
        <p id="notice-para">${data.message || ""}</p>
        ${data.link ? 
      `<a href="${data.link}" id="notice-link">
        Open Link 🔗
      </a>`: ""}
      <hr>
      `;

      noticeList.appendChild(div);
    });

  });
}


