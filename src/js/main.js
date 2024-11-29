import { showSlides } from "./slide.js";

showSlides();

const submenu = document.querySelector(".submenu");
const submenuList = document.querySelector(".submenu-list");
const submenuBtn = document.querySelector(".submenu-btn");

submenu.addEventListener("mouseenter", () => {
  submenuList.classList.add("show");
  submenuBtn.classList.add("active-submenu");
});
submenu.addEventListener("mouseleave", () => {
  submenuList.classList.remove("show");
  submenuBtn.classList.remove("active-submenu");
});
submenuList.addEventListener("click", () => {
  submenuList.classList.remove("show");
  submenuBtn.classList.remove("active-submenu");
});

const menu = document.querySelector(".header-nav");
const hamburger = document.querySelector(".header-hamburger");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("show");
  hamburger.classList.toggle("close-burger");
});

const galleryItem = document.querySelectorAll(".gallery-content__item");

galleryItem.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    item.classList.add("show");
  });

  item.addEventListener("mouseleave", () => {
    item.classList.remove("show");
  });
});