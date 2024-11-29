let currentPage = 1;
const itemsPerPage = 9;
let currentCategory = "all";
let searchQuery = "";

// Render the gallery
export function renderGallery(galleryData, galleryContent, paginationContainer) {
  // Filter the data based on category and search query
  const filteredData = galleryData.filter((item) => {
    const matchesCategory =
      currentCategory === "all" || item.category.toLowerCase() === currentCategory.toLowerCase();
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle case where no items match
  if (filteredData.length === 0) {
    galleryContent.innerHTML = "<p>No items found.</p>";
    paginationContainer.innerHTML = "";
    return;
  }

  // Paginate the filtered data
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(start, start + itemsPerPage);

  // Clear existing gallery content
  galleryContent.innerHTML = "";

  // Render paginated items
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

  // Render pagination controls
  renderPagination(filteredData.length, paginationContainer, galleryData, galleryContent);
}

// Render pagination controls
export function renderPagination(
  totalItems,
  paginationContainer,
  galleryData,
  galleryContent
) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  paginationContainer.innerHTML = "";

  // Create the "Previous" button
  const prevButton = document.createElement("button");
  prevButton.type = "button";
  prevButton.classList.add("btn", "btn-primary");
  prevButton.disabled = currentPage === 1;
  prevButton.innerHTML = "<i class=\"icon-arrow-left\"></i>";
  prevButton.addEventListener("click", () => {
    currentPage--;
    renderGallery(galleryData, galleryContent, paginationContainer);
  });
  paginationContainer.appendChild(prevButton);

  // Create the page number buttons
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

  // Create the "Next" button
  const nextButton = document.createElement("button");
  nextButton.type = "button";
  nextButton.classList.add("btn", "btn-primary");
  nextButton.disabled = currentPage === totalPages;
  nextButton.innerHTML = "<i class=\"icon-arrow-right\"></i>";
  nextButton.addEventListener("click", () => {
    currentPage++;
    renderGallery(galleryData, galleryContent, paginationContainer);
  });
  paginationContainer.appendChild(nextButton);
}

// Update the current category for filtering
export function updateCategory(category) {
  currentCategory = category.toLowerCase(); // Normalize to lowercase for consistency
  currentPage = 1; // Reset to the first page
}

// Update the current search query for filtering
export function updateSearch(search) {
  searchQuery = search.toLowerCase(); // Normalize to lowercase for consistency
  currentPage = 1; // Reset to the first page
}
