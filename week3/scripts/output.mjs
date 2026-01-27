// Function to set the course title
export function setTitle(course) {
    document.querySelector("#courseName").textContent = course.name;
    document.querySelector("#courseCode").textContent = course.code;
}

// Function to render all sections
export function renderSections(sections) {
    const html = sections.map(
        (section) => `<tr>
    <td>${section.sectionNum}</td>
    <td>${section.enrolled}</td>
    <td>${section.roomNum}</td></tr>`
    );
    document.querySelector("#sections").innerHTML = html.join("");
}