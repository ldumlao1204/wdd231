// Course data array
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming...',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web...',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized...',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes...',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals...',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals...',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];

// Get DOM elements
const coursesContainer = document.getElementById('courses');
const totalCreditsSpan = document.getElementById('total-credits');
const allButton = document.getElementById('all');
const cseButton = document.getElementById('cse');
const wddButton = document.getElementById('wdd');

// Display courses function
function displayCourses(filteredCourses) {
    coursesContainer.innerHTML = '';

    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = `course-card ${course.completed ? 'completed' : ''}`;
        courseCard.textContent = `${course.subject} ${course.number}`;
        coursesContainer.appendChild(courseCard);
    });

    // Calculate and display total credits
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsSpan.textContent = totalCredits;
}

// Filter courses function
function filterCourses(subject) {
    // Remove active class from all buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    if (subject === 'all') {
        allButton.classList.add('active');
        displayCourses(courses);
    } else {
        const filtered = courses.filter(course => course.subject === subject);
        if (subject === 'CSE') {
            cseButton.classList.add('active');
        } else {
            wddButton.classList.add('active');
        }
        displayCourses(filtered);
    }
}

// Event listeners
allButton.addEventListener('click', () => filterCourses('all'));
cseButton.addEventListener('click', () => filterCourses('CSE'));
wddButton.addEventListener('click', () => filterCourses('WDD'));

// Initial display - show all courses
displayCourses(courses);