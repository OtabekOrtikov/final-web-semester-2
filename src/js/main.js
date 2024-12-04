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

import { fetchGallery, renderGallery, updateCategory, updateSearch } from "./gallery.js";

const galleryContent = document.querySelector(".gallery-content");
const paginationContainer = document.querySelector(".gallery-pagination");
const filterButtons = document.querySelectorAll(".filter-btns .btn");
const searchInput = document.querySelector(".filter-search input");

(async () => {
  const galleryData = await fetchGallery();

  if (!Array.isArray(galleryData)) {
    console.error("Gallery data is not an array:", galleryData);
    return;
  }

  renderGallery(galleryData, galleryContent, paginationContainer);

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      button.classList.add("active");

      const category =
        button.textContent === "All" ? "all" : button.textContent.trim();
      updateCategory(category);

      renderGallery(galleryData, galleryContent, paginationContainer);
    });
  });

  searchInput.addEventListener("input", (e) => {
    updateSearch(e.target.value);
    renderGallery(galleryData, galleryContent, paginationContainer);
  });
})();

import { fetchSchedule, renderSchedule } from "./schedule.js";

(async () => {
  const scheduleData = await fetchSchedule();
  await renderSchedule(scheduleData);
})();