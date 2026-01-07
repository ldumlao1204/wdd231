// Hamburger menu toggle
const menuButton = document.getElementById('menu');
const navigation = document.querySelector('.navigation');

menuButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    menuButton.classList.toggle('open');

    // Update aria-expanded for accessibility
    const isOpen = navigation.classList.contains('open');
    menuButton.setAttribute('aria-expanded', isOpen);
});