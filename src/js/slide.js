let slideIndex = 0;

export function showSlides() {
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
