const navButton = document.querySelector('#ham-btn');
const navList = document.querySelector('.navigation');

// Toggle the show class on both button and navigation list
navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navList.classList.toggle('show');
});
