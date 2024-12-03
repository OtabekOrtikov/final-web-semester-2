const { renderSchedule, fetchSchedule } = require("../src/js/schedule");

global.fetch = jest.fn();

describe("renderSchedule", () => {
  let table;

  beforeEach(() => {
    // Set up DOM with a table element
    document.body.innerHTML = '<table id="schedule-table"></table>';
    table = document.querySelector("#schedule-table");
  });

  afterEach(() => {
    // Clean up the DOM
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  it('should render "No data found" when data is null', async () => {
    await renderSchedule(null);
    expect(table.innerHTML).toBe("<tbody><tr><td colspan=\"4\">No data found</td></tr></tbody>");
  });

  it('should render "No data found" when schedule is empty', async () => {
    const emptyData = { schedule: [] };
    await renderSchedule(emptyData);
    expect(table.innerHTML).toBe("<tbody><tr><td colspan=\"4\">No data found</td></tr></tbody>");
  });

  it("should render schedule data correctly for multiple days and halls", async () => {
    const mockData = {
      schedule: [
        {
          days: ["Monday", "Wednesday"],
          halls: [
            {
              classes: [
                { time: "10:00", className: "Yoga", teacher: "Alice", totalPlaces: 20, availablePlaces: 10 },
                { time: "11:00", className: "Pilates", teacher: "Bob", totalPlaces: 15, availablePlaces: 5 },
              ],
            },
            {
              classes: [
                { time: "10:00", className: "Zumba", teacher: "Charlie", totalPlaces: 25, availablePlaces: 15 },
              ],
            },
            {
              classes: [],
            },
          ],
        },
      ],
    };

    await renderSchedule(mockData);

    // Check header row content
    const headerRow = table.querySelector(".schedule-table__header th[colspan='3']");
    expect(headerRow.textContent).toBe("Monday / Wednesday");

    // Check title row content
    const titleRow = table.querySelector(".schedule-table__title");
    expect(titleRow.querySelector("td:nth-child(2)").textContent).toBe("Hall 1");
    expect(titleRow.querySelector("td:nth-child(3)").textContent).toBe("Hall 2");
    expect(titleRow.querySelector("td:nth-child(4)").textContent).toBe("Hall 3");

    // Check class details in rows
    const firstClassRow = table.querySelector("tr:nth-child(4)");
    expect(firstClassRow.querySelector("td:nth-child(1)").textContent).toBe("11:00");
    expect(firstClassRow.querySelector("td:nth-child(2) .class-left p:nth-child(1)").textContent).toBe("Pilates");
  });

  it("should handle halls with no classes", async () => {
    const mockData = {
      schedule: [
        {
          days: ["Tuesday"],
          halls: [
            { classes: [] },
            { classes: [] },
            { classes: [] },
          ],
        },
      ],
    };

    await renderSchedule(mockData);

    // Only header and title rows should exist
    expect(table.querySelectorAll("tr").length).toBe(2);

    // Verify no additional rows for classes
    const rows = table.querySelectorAll("tr");
    rows.forEach((row, index) => {
      if (index > 1) {
        expect(row.querySelectorAll("td").forEach((cell) => expect(cell.innerHTML).toBe("")));
      }
    });
  });
});

describe("fetchSchedule", () => {
  afterEach(() => jest.clearAllMocks());

  it("should fetch and return schedule data", async () => {
    const mockResponse = { schedule: [] };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const data = await fetchSchedule();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(data).toEqual(mockResponse);
  });

  it("should return null if fetch fails", async () => {
    global.fetch.mockRejectedValueOnce(new Error("Network error"));

    const data = await fetchSchedule();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(data).toBeNull();
  });

  it("should throw an error for non-OK response", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      statusText: "Internal Server Error",
    });

    const data = await fetchSchedule();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(data).toBeNull();
  });
});
