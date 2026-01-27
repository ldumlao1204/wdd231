// Function to populate section selection dropdown
export function setSectionSelection(sections) {
    const sectionSelect = document.querySelector("#sectionNumber");
    const allOption = document.createElement("option");
    allOption.value = "all";
    allOption.textContent = "All Sections";
    sectionSelect.appendChild(allOption);

    sections.forEach(section => {
        const option = document.createElement("option");
        option.value = section.sectionNum;
        option.textContent = `Section ${section.sectionNum}`;
        sectionSelect.appendChild(option);
    });
}