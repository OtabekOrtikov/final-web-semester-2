import { showSlides } from "./slide.js";
import { fetchSchedule, fetchGallery } from "./service/service.js";
import { renderSchedule } from "./schedule.js";
import { renderGallery, updateCategory, updateSearch } from "./gallery.js";

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

(async () => {
  const scheduleData = await fetchSchedule();
  await renderSchedule(scheduleData);
})();

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
