// Function to set the course title
export function setTitle(course) {
    const titleElement = document.querySelector("#courseTitle");
    titleElement.textContent = `${course.code}: ${course.name}`;
}

// Function to render all sections
export function renderSections(sections) {
    const sectionsContainer = document.querySelector("#sections");
    sectionsContainer.innerHTML = "";

    sections.forEach(section => {
        const sectionDiv = document.createElement("div");
        sectionDiv.className = "section";

        const remaining = section.capacity - section.enrolled;

        sectionDiv.innerHTML = `
            <h3>Section ${section.sectionNum}</h3>
            <p><strong>Room:</strong> ${section.roomNum}</p>
            <p><strong>Enrolled:</strong> <span class="enrolled">${section.enrolled}</span></p>
            <p><strong>Remaining:</strong> <span class="available">${remaining}</span></p>
        `;

        sectionsContainer.appendChild(sectionDiv);
    });
}