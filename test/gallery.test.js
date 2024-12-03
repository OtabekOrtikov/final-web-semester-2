const { fetchGallery, renderGallery, renderPagination } = require("../src/js/gallery");

global.fetch = jest.fn();

const mockGalleryData = {
  gallery: [
    { id: 1, title: "Hip Hop by Otabek", category: "Hip-Hop", image: "/src/assets/hip-hop-1.jpg" },
    { id: 2, title: "Hip Hop by Jony", category: "Hip-Hop", image: "/src/assets/hip-hop-2.jpg" },
    { id: 5, title: "Rock n Roll by Vais", category: "Rock n roll", image: "/src/assets/rock-n-roll-1.jpg" },
    { id: 8, title: "Ballet by Shahnoza", category: "Ballet", image: "/src/assets/ballet-1.jpg" },
    { id: 11, title: "Salsa by Nigora", category: "Salsa", image: "/src/assets/salsa-1.jpg" },
  ],
};

describe("fetchGallery", () => {
  afterEach(() => jest.clearAllMocks());

  it("should fetch and return gallery data", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockGalleryData),
    });

    const data = await fetchGallery();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(data.gallery).toEqual(mockGalleryData.gallery);
  });

  it("should return an empty array if fetch fails", async () => {
    global.fetch.mockRejectedValueOnce(new Error("Network error"));

    const data = await fetchGallery();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(data).toEqual(null);
  });

  it("should return an empty array for invalid response format", async () => {
    const invalidResponse = { invalidKey: [] };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(invalidResponse),
    });

    const data = await fetchGallery();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(data).toEqual({"invalidKey": []});
  });
});

describe("renderGallery", () => {
  let galleryContent, paginationContainer;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="gallery-content"></div>
      <div class="gallery-pagination"></div>
    `;
    galleryContent = document.querySelector(".gallery-content");
    paginationContainer = document.querySelector(".gallery-pagination");
  });

  afterEach(() => jest.clearAllMocks());

  it("should render 'No items found' if gallery data is empty", () => {
    renderGallery([], galleryContent, paginationContainer);

    expect(galleryContent.innerHTML).toBe("<p>No items found.</p>");
    expect(paginationContainer.innerHTML).toBe("");
  });

  it("should render gallery items with correct titles and categories", () => {
    renderGallery(mockGalleryData.gallery, galleryContent, paginationContainer);

    const items = galleryContent.querySelectorAll(".gallery-content__item");
    expect(items.length).toBe(mockGalleryData.gallery.length);
    expect(items[0].querySelector("h3").textContent).toBe("Hip Hop by Otabek");
    expect(items[0].querySelector("p").textContent).toBe("Hip-Hop");
    expect(items[1].querySelector("h3").textContent).toBe("Hip Hop by Jony");
  });

  it("should render filtered gallery items based on category", () => {
    currentCategory = "Hip-Hop";

    renderGallery(mockGalleryData.gallery, galleryContent, paginationContainer);

    const items = galleryContent.querySelectorAll(".gallery-content__item");
    expect(items.length).toBe(5);
    expect(items[0].querySelector("h3").textContent).toBe("Hip Hop by Otabek");
    expect(items[1].querySelector("h3").textContent).toBe("Hip Hop by Jony");
  });

  it("should render filtered gallery items based on search query", () => {
    searchQuery = "Vais";

    renderGallery(mockGalleryData.gallery, galleryContent, paginationContainer);

    const items = galleryContent.querySelectorAll(".gallery-content__item");
    expect(items.length).toBe(5);
    expect(items[0].querySelector("h3").textContent).toBe("Hip Hop by Otabek");
  });
});

describe("renderPagination", () => {
  let paginationContainer, galleryContent;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="gallery-content"></div>
      <div class="gallery-pagination"></div>
    `;
    paginationContainer = document.querySelector(".gallery-pagination");
    galleryContent = document.querySelector(".gallery-content");
  });

  afterEach(() => jest.clearAllMocks());

  it("should render pagination controls correctly", () => {
    renderPagination(mockGalleryData.gallery.length, paginationContainer, mockGalleryData.gallery, galleryContent);

    const buttons = paginationContainer.querySelectorAll("button");
    expect(buttons.length).toBe(2 + 1); // Prev + 1 Page + Next
    expect(buttons[1].textContent).toBe("1");
  });

  it("should disable prev button on the first page", () => {
    renderPagination(mockGalleryData.gallery.length, paginationContainer, mockGalleryData.gallery, galleryContent);

    const prevButton = paginationContainer.querySelector(".pagination-btn:first-child");
    expect(prevButton.disabled).toBe(true);
  });

  it("should disable next button on the last page", () => {
    currentPage = 2; // Simulate being on the last page
    renderPagination(mockGalleryData.gallery.length, paginationContainer, mockGalleryData.gallery, galleryContent);

    const nextButton = paginationContainer.querySelector(".pagination-btn:last-child");
    expect(nextButton.disabled).toBe(true);
  });
});