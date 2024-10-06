const button = document.querySelector(".start_popup");
const Pop_up = document.querySelector(".PopUp_Container");
const close = document.querySelector(".close-icon");

button.addEventListener("click", (e) => {
  e.stopPropagation();
  Pop_up.classList.add("open");
});

close.addEventListener("click", (e) => {
  Pop_up.classList.remove("open");
});

window.addEventListener("click", () => {
  Pop_up.classList.remove("open");
});

Pop_up.addEventListener("click", (e) => {
  e.stopPropagation();
});

document.getElementById("input_button").addEventListener("click", function () {
  const email = document.getElementById("Email").value;

  if (email.trim() !== "") {
    // Check if email field is non-empty
    Pop_up.classList.remove("open"); // Close the popup window
    document.getElementById("Email").value = "";
  } else {
    alert("Please enter an email address."); // Show an alert if the field is empty
  }
});
