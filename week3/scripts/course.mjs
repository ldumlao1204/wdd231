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
    }
};

export default byuiCourse;