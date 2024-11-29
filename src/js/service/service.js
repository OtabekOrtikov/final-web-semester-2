export async function fetchSchedule() {
  try {
    const response = await fetch("http://127.0.0.1:3000/schedule");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return null;
  }
}
export async function fetchGallery() {
    try {
      const response = await fetch("http://127.0.0.1:3000/gallery");
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      
      const data = await response.json();
      if (!data || !Array.isArray(data.gallery)) {
        throw new Error("Gallery data is not in the expected format");
      }
      
      return data.gallery;
    } catch (error) {
      console.error("There has been a problem with your fetch operation:", error);
      return [];
    }
  }
  