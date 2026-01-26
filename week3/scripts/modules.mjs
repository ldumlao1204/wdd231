// Course object with sections and methods
const byuiCourse = {
    code: "CSE 121B",
    name: "Javascript Language",
    sections: [
        {
            sectionNum: 1,
            roomNum: 'SB 236',
            enrolled: 26,
            capacity: 30
        },
        {
            sectionNum: 2,
            roomNum: 'SB 100',
            enrolled: 20,
            capacity: 30
        },
        {
            sectionNum: 3,
            roomNum: 'SB 202',
            enrolled: 25,
            capacity: 30
        },
        {
            sectionNum: 4,
            roomNum: 'SB 205',
            enrolled: 22,
            capacity: 30
        }
    ],
    changeEnrollment: function (sectionNum, add = true) {
        const section = this.sections.find(s => s.sectionNum == sectionNum);

        if (section) {
            if (add && section.enrolled < section.capacity) {
                section.enrolled++;
            } else if (!add && section.enrolled > 0) {
                section.enrolled--;
            }
        }

        renderSections(this.sections);
    }
};

// Function to set the course title
function setTitle(course) {
    const titleElement = document.querySelector("#courseTitle");
    titleElement.textContent = `${course.code}: ${course.name}`;
}

// Function to render all sections
function renderSections(sections) {
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

// Function to populate section selection dropdown
function setSectionSelection(sections) {
    const sectionSelect = document.querySelector("#sectionNumber");
    sections.forEach(section => {
        const option = document.createElement("option");
        option.value = section.sectionNum;
        option.textContent = `Section ${section.sectionNum}`;
    });
}

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
    setTitle(byuiCourse);
    renderSections(byuiCourse.sections);
    setSectionSelection(byuiCourse.sections);
});

// Event listeners
document.querySelector("#enrollStudent").addEventListener("click", function () {
    const sectionNum = Number(document.querySelector("#sectionNumber").value);
    byuiCourse.changeEnrollment(sectionNum);
});

document.querySelector("#dropStudent").addEventListener("click", function () {
    const sectionNum = Number(document.querySelector("#sectionNumber").value);
    byuiCourse.changeEnrollment(sectionNum, false);
});
