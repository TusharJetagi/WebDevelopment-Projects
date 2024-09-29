const threedot = document.querySelector(".hamburger-icon");
const headerContent = document.querySelector(".header-content");
const closeIcon = document.querySelector(".close-icon");
const Scroll_up = document.querySelector(".pg-up");
const top_page = document.querySelector(".project-start");

threedot.addEventListener("click", () => {
  headerContent.classList.add("menu-open");
});

headerContent.addEventListener("click", (e) => {
  e.stopPropagation();
});

closeIcon.addEventListener("click", () => {
  headerContent.classList.remove("menu-open");
});

window.addEventListener("click", () => {
  headerContent.classList.remove("menu-open");
});

Scroll_up.addEventListener("click", () => {
  top_page.scrollTo(0, 0);
});
