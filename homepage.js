/* ===============================
   COAE&T Student Corner - JS
   =============================== */

/* 1️⃣ Active navbar link highlight */
const navLinks = document.querySelectorAll(".nav-item");

navLinks.forEach(link => {
  const linkHref = link.getAttribute("href");

  if (linkHref && window.location.href.includes(linkHref)) {
    link.style.backgroundColor = "#2e7d32";
    link.style.color = "white";
  }
});


/* 2️⃣ Functional search bar (section navigation) */

const searchInput = document.querySelector("#searchbar input");
const searchBtn = document.getElementById("nav-button");

searchBtn.addEventListener("click", function () {
  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    alert("Type something to search.");
    return;
  }

  if (query.includes("department")) {
    document.getElementById("departments").scrollIntoView({ behavior: "smooth" });
  }
  else if (query.includes("mission")) {
    document.getElementById("list").scrollIntoView({ behavior: "smooth" });
  }
  else if (query.includes("gallery")) {
    window.location.href = "gallery.html";
  }
  else if (query.includes("scholarship")) {
    window.location.href = "scholarships.html";
  }
  else {
    alert("No result found on this page.");
  }

  searchInput.value = "";
});


/* 3️⃣ Department logo hover animation (CSS-safe) */
const departmentLogos = document.querySelectorAll("#logo img");

departmentLogos.forEach(logo => {
  logo.addEventListener("mouseenter", () => {
    logo.classList.add("zoom");
  });

  logo.addEventListener("mouseleave", () => {
    logo.classList.remove("zoom");
  });
});

/* 4️⃣ Scroll-to-top button */
const topBtn = document.createElement("button");
topBtn.innerText = "↑";
topBtn.style.position = "fixed";
topBtn.style.bottom = "20px";
topBtn.style.right = "20px";
topBtn.style.padding = "10px 14px";
topBtn.style.fontSize = "18px";
topBtn.style.cursor = "pointer";
topBtn.style.display = "none";
topBtn.style.zIndex = "1000";
document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* 5️⃣ Dynamic announcements (replaces marquee content) */
const marquee = document.getElementById("announcement");

const announcements = [
  "🌾 New session starting from 3rd of August",
  "📝 HSTES choice filling starting from 7th July",
  "🏫 Physical counselling will start in September"
];

let announcementIndex = 0;

// Initial load
marquee.textContent = announcements[announcementIndex];

setInterval(() => {
  announcementIndex = (announcementIndex + 1) % announcements.length;
  marquee.textContent = announcements[announcementIndex];
}, 3000);
