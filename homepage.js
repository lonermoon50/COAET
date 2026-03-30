import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
  doc, 
  getDoc, 
  getDocs, 
  collection, 
  where,
  addDoc, 
  serverTimestamp, 
  onSnapshot, 
  orderBy, 
  query 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const studentName = document.getElementById("studentName");
const studentRoll = document.getElementById("studentRoll");
const studentClass = document.getElementById("studentClass");
const studentSemester = document.getElementById("studentSemester");
const logoutBtn = document.getElementById("logout");
// Detect logged in user
onAuthStateChanged(auth, async (user) => {
onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  // 🔐 ADMIN CHECK
  if (user.uid === ADMIN_UID) {
    adminSection.style.display = "block";
  }

  // 🔎 FETCH STUDENT DATA
  const q = query(
    collection(db, "students"),
    where("uid", "==", user.uid)
  );

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const data = querySnapshot.docs[0].data();

    studentName.textContent = data.firstName;
    studentRoll.textContent = data.rollNo;
    studentClass.textContent = data.classYear;
    studentSemester.textContent = data.semester + " Sem";
  }

});



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








