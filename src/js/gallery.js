async function fetchGallery() {
  try {
    const response = await fetch("http://127.0.0.1:3000/gallery");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    return data.gallery;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return null;
  }
}

let currentPage = 1;
const itemsPerPage = 9;
let currentCategory = "all";
let searchQuery = "";

function renderGallery(galleryData, galleryContent, paginationContainer) {
  const filteredData = galleryData.filter((item) => {
    const matchesCategory =
      currentCategory === "all" ||
      item.category.toLowerCase() === currentCategory.toLowerCase();
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filteredData.length === 0) {
    galleryContent.innerHTML = "<p>No items found.</p>";
    paginationContainer.innerHTML = "";
    return;
  }

  const start = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(start, start + itemsPerPage);

  galleryContent.innerHTML = "";

  paginatedData.forEach((item) => {
    const article = document.createElement("article");
    article.classList.add("gallery-content__item");
    article.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="gallery-content__item-caption">
          <h3>${item.title}</h3>
          <p>${item.category}</p>
        </div>
      `;
    galleryContent.appendChild(article);
  });

  renderPagination(
    filteredData.length,
    paginationContainer,
    galleryData,
    galleryContent
  );
}

function renderPagination(
  totalItems,
  paginationContainer,
  galleryData,
  galleryContent
) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  paginationContainer.innerHTML = "";

  const prevButton = document.createElement("button");
  prevButton.type = "button";
  prevButton.classList.add("pagination-btn", "btn-primary");
  prevButton.disabled = currentPage === 1;
  prevButton.innerHTML = "<i class=\"icon-arrow-left\"></i>";
  prevButton.addEventListener("click", () => {
    currentPage--;
    renderGallery(galleryData, galleryContent, paginationContainer);
  });
  paginationContainer.appendChild(prevButton);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.type = "button";
    pageButton.classList.add("pagination-btn", "btn-primary");
    if (i === currentPage) {
      pageButton.classList.add("active");
    }
    pageButton.textContent = i;
    pageButton.addEventListener("click", () => {
      currentPage = i;
      renderGallery(galleryData, galleryContent, paginationContainer);
    });
    paginationContainer.appendChild(pageButton);
  }

  const nextButton = document.createElement("button");
  nextButton.type = "button";
  nextButton.classList.add("pagination-btn", "btn-primary");
  nextButton.disabled = currentPage === totalPages;
  nextButton.innerHTML = "<i class=\"icon-arrow-right\"></i>";
  nextButton.addEventListener("click", () => {
    currentPage++;
    renderGallery(galleryData, galleryContent, paginationContainer);
  });
  paginationContainer.appendChild(nextButton);
}

function updateCategory(category) {
  currentCategory = category.toLowerCase();
  currentPage = 1;
}

function updateSearch(search) {
  searchQuery = search.toLowerCase();
  currentPage = 1;
}

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