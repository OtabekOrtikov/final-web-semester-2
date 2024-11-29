export async function renderSchedule(data) {
  const table = document.querySelector("#schedule-table");

  if (!data) {
    table.innerHTML = "<tr><td colspan='4'>No data found</td></tr>";
    return;
  }

  data.schedule.forEach((item) => {
    const headerRow = document.createElement("tr");
    headerRow.classList.add("schedule-table__header");
    headerRow.innerHTML = `
      <th>Start time</th>
      <th colspan="3">${item.days.join(" / ")}</th>
    `;
    table.appendChild(headerRow);

    const hallRow = document.createElement("tr");
    hallRow.classList.add("schedule-table__title");
    hallRow.innerHTML = `
      <td></td>
      <td>Hall 1</td>
      <td>Hall 2</td>
      <td>Hall 3</td>
    `;
    table.appendChild(hallRow);

    const timeSlot = [];
    item.halls.forEach((hall) => {
      hall.classes.forEach((classItem, index) => {
        if (!timeSlot[index]) timeSlot[index] = [];
        timeSlot[index].push(classItem);
      });
    });

    timeSlot.forEach((slot) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${slot[0]?.time || ""}</td>
        ${[0, 1, 2]
          .map((hallIndex) => {
            const classData = slot[hallIndex];
            if (classData) {
              return `
                <td>
                    <div class="class">
                    <div class="class-left">
                        <p>${classData.className}</p>
                        <p>${classData.teacher}</p>
                    </div>
                    <div class="class-right">
                        <p>${classData.totalPlaces}</p>
                        <p>${classData.availablePlaces} availabe</p>
                    </div>
                    </div>
                </td>
              `;
            } else {
              return "<td></td>";
            }
          })
          .join("")}  
      `;
      table.appendChild(row);
    });
  });
}