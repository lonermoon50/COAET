function changeCurriculum() {
  const value = document.getElementById("curriculum").value;

  const fifth = document.getElementById("5th_dean_curriculum");
  const sixth = document.getElementById("6th_dean_curriculum");

  if (value === "5th") {
    fifth.style.display = "block";
    sixth.style.display = "none";
  } 
  else if (value === "6th") {
    sixth.style.display = "block";
    fifth.style.display = "none";
  }
}
