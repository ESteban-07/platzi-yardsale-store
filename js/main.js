const navbarEmail = document.querySelector('.navbar-email');
const desktopMenu = document.querySelector('.desktop-menu');
const mobileMenu = document.querySelector('.mobile-menu');
const burguerMenu = document.querySelector('.burguer-menu');
const closeButton = document.querySelector('#close-button');

navbarEmail.addEventListener('click', toggleDesktopMenu);

function toggleDesktopMenu() {
    desktopMenu.classList.toggle('inactive');
}

burguerMenu.addEventListener('click', showMobileMenu);

function showMobileMenu() {
    mobileMenu.classList.remove('menu-inactive');
    mobileMenu.classList.add('menu-active');
}

closeButton.addEventListener('click', closeMobileMenu);

function closeMobileMenu() {
    mobileMenu.classList.remove('menu-active');
    mobileMenu.classList.add('menu-inactive');
}
