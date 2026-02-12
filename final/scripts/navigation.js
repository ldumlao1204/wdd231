const navButton = document.querySelector('#ham-btn');

//Toggle the show class off and on
navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
})