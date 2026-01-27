// Course object with sections and methods
const byuiCourse = {
    code: "WDD231",
    name: "Web Frontend Development I",
    sections: [
        {
            sectionNum: 1,
            instructor: 'Brother Bingham',
            enrolled: 88,
            capacity: 30
        },
        {
            sectionNum: 2,
            instructor: 'Sister Schultz',
            enrolled: 81,
            capacity: 30
        },
        {
            sectionNum: 3,
            instructor: 'Sister Smith',
            enrolled: 95,
            capacity: 30
        },

    ],
    changeEnrollment: function (sectionNum, add = true) {
        const section = this.sections.find(s => s.sectionNum == sectionNum);

        if (section) {
            if (add) {
                section.enrolled++;
            } else if (!add && section.enrolled > 0) {
                section.enrolled--;
            }
        }
    }
};

export default byuiCourse;