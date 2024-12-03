const {
  fetchGallery,
  renderGallery,
  renderPagination,
} = require("../src/js/gallery");

global.fetch = jest.fn();

describe("fetchGallery", () => {
  afterEach(() => jest.clearAllMocks());

  it("should fetch and return gallery data", async () => {
    const mockResponse = {
      gallery: [
        { title: "Item 1", category: "Category A", image: "image1.jpg" },
        { title: "Item 2", category: "Category B", image: "image2.jpg" },
      ],
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const data = await fetchGallery();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(data).toEqual(mockResponse.gallery);
  });

  it("should return an empty array if fetch fails", async () => {
    global.fetch.mockRejectedValueOnce(new Error("Network error"));

    const data = await fetchGallery();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(data).toEqual([]);
  });

  it("should return an empty array for invalid response format", async () => {
    const invalidResponse = { invalidKey: [] };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(invalidResponse),
    });

    const data = await fetchGallery();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(data).toEqual([]);
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

  it("should render 'No items found' if gallery data is empty", () => {
    renderGallery([], galleryContent, paginationContainer);

    expect(galleryContent.innerHTML).toBe("<p>No items found.</p>");
    expect(paginationContainer.innerHTML).toBe("");
  });

  it("should render gallery items and pagination", () => {
    const mockGalleryData = [
      { title: "Item 1", category: "Category A", image: "image1.jpg" },
      { title: "Item 2", category: "Category B", image: "image2.jpg" },
      { title: "Item 3", category: "Category C", image: "image3.jpg" },
    ];

    renderGallery(mockGalleryData, galleryContent, paginationContainer);

    const items = galleryContent.querySelectorAll(".gallery-content__item");
    expect(items.length).toBe(3);
    expect(items[0].querySelector("h3").textContent).toBe("Item 1");
    expect(items[1].querySelector("h3").textContent).toBe("Item 2");
    expect(items[2].querySelector("h3").textContent).toBe("Item 3");
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

  it("should render pagination controls correctly", () => {
    const mockGalleryData = Array.from({ length: 18 }, (_, i) => ({
      title: `Item ${i + 1}`,
      category: "Category A",
      image: `image${i + 1}.jpg`,
    }));

    renderPagination(
      mockGalleryData.length,
      paginationContainer,
      mockGalleryData,
      galleryContent
    );

    const buttons = paginationContainer.querySelectorAll("button");
    expect(buttons.length).toBe(4); // Prev, 2 pages, Next
    expect(buttons[1].textContent).toBe("1");
    expect(buttons[2].textContent).toBe("2");
  });

  it("should disable prev button on the first page", () => {
    const mockGalleryData = Array.from({ length: 18 }, (_, i) => ({
      title: `Item ${i + 1}`,
      category: "Category A",
      image: `image${i + 1}.jpg`,
    }));

    renderPagination(
      mockGalleryData.length,
      paginationContainer,
      mockGalleryData,
      galleryContent
    );

    const prevButton = paginationContainer.querySelector(
      ".pagination-btn:first-child"
    );
    expect(prevButton.disabled).toBe(true);
  });

  it("should disable next button on the last page", () => {
    currentPage = 2; // Simulate being on the last page
    const mockGalleryData = Array.from({ length: 18 }, (_, i) => ({
      title: `Item ${i + 1}`,
      category: "Category A",
      image: `image${i + 1}.jpg`,
    }));

    renderPagination(
      mockGalleryData.length,
      paginationContainer,
      mockGalleryData,
      galleryContent
    );

    const nextButton = paginationContainer.querySelector(
      ".pagination-btn:last-child"
    );
    expect(nextButton.disabled).toBe(true);
  });
});
