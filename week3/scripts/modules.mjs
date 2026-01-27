import byuiCourse from "./course.mjs";
import { setSectionSelection } from "./sections.mjs";
import { setTitle, renderSections } from "./output.mjs";

document.querySelector("#enrollStudent").addEventListener("click", function () {
    const sectionNum = document.querySelector("#sectionNumber").value;
    if (sectionNum != "all") {
        byuiCourse.changeEnrollment(Number(sectionNum));
        const section = byuiCourse.sections.filter((section) => section.sectionNum == sectionNum);
        renderSections(section);
    }
});
document.querySelector("#dropStudent").addEventListener("click", function () {
    const sectionNum = document.querySelector("#sectionNumber").value;
    if (sectionNum != "all") {
        byuiCourse.changeEnrollment(Number(sectionNum), false);
        const section = byuiCourse.sections.filter((section) => section.sectionNum == sectionNum);
        renderSections(section);
    }
});

document.querySelector("#sectionNumber").addEventListener("change", function () {
    const sectionNum = document.querySelector("#sectionNumber").value;
    if (sectionNum == "all") {
        renderSections(byuiCourse.sections);
    } else {
        const section = byuiCourse.sections.filter((section) => section.sectionNum == sectionNum);
        renderSections(section);
    }
});

setTitle(byuiCourse);
setSectionSelection(byuiCourse.sections);
renderSections(byuiCourse.sections);