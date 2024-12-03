let slideIndex = 0;

function showSlides() {
  let i;
  const slides = document.querySelectorAll(".hero-slide img");
  const slidesText = document.querySelectorAll(".hero-item");

  if (slides.length !== slidesText.length) {
    console.error("Slides and slidesText arrays have different lengths.");
    return;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active-slide");
    slidesText[i].classList.remove("active-text");
  }

  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].classList.add("active-slide");
  slidesText[slideIndex - 1].classList.add("active-text");
  setTimeout(showSlides, 6000);
}

showSlides();

const submenu = document.querySelector(".submenu");
const submenuList = document.querySelector(".submenu-list");
const submenuBtn = document.querySelector(".submenu-btn");

if (submenu && submenuList && submenuBtn) {
  submenu.addEventListener("mouseenter", () => toggleSubmenu(true));
  submenu.addEventListener("mouseleave", () => toggleSubmenu(false));
  submenuList.addEventListener("click", () => toggleSubmenu(false));
}

function toggleSubmenu(show) {
  submenuList.classList.toggle("show", show);
  submenuBtn.classList.toggle("active-submenu", show);
}

const menu = document.querySelector(".header-nav");
const hamburger = document.querySelector(".header-hamburger");

if (menu && hamburger) {
  hamburger.addEventListener("click", () => {
    menu.classList.toggle("show");
    hamburger.classList.toggle("close-burger");
  });
}
