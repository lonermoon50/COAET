import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.getElementById("feedback-form");
const thanksMessage = document.getElementById("thanksMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = form.firstName.value;
  const rollNo = form.rollNo.value;
  const rating = form.rating.value;
  const feedbackType = form.feedbackType.value;
  const message = form.message.value;

  try {
    await addDoc(collection(db, "feedback"), {
      firstName,
      rollNo,
      rating,
      feedbackType,
      message,
      createdAt: serverTimestamp()
    });

    form.reset();

    // Show thank you message
    thanksMessage.style.display = "block";

    // Hide after 5 seconds
    setTimeout(() => {
      thanksMessage.style.display = "none";
    }, 3000);

  } catch (error) {
    console.error("Error:", error);
    alert("Failed to submit feedback ❌");
  }
});


