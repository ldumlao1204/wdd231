/* ==================================================
   NAVIGATION SCRIPT
   Handles mobile menu toggle and navigation interactions
   ================================================== */

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.navigation');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
    });
});
