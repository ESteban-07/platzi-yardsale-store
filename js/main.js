const burguerMenu = document.querySelector('.burguer-menu');
const navbarEmail = document.querySelector('.navbar-email');

const desktopMenu = document.querySelector('.desktop-menu');

const mobileMenu = document.querySelector('.mobile-menu');
const closeButton = document.querySelector('#close-button');

const shoppingCart = document.querySelector('.shopping-cart');
const openShoppingCartBtn = document.querySelector('.navbar-shopping-cart');
const exitShoppingCartBtn = document.querySelector('.back-arrow');

const yardSaleLogo = document.querySelector('.logo');
const shoppingTitle = document.querySelector('#shopping-title');
const mobileMediaQuery = window.matchMedia('(max-width: 640px)');

const isShoppingCartClosed = shoppingCart.classList.contains('inactive');
const isDesktopMenuClosed = desktopMenu.classList.contains('inactive');

navbarEmail.addEventListener('click', toggleDesktopMenu);

function toggleDesktopMenu() {
    if (!isShoppingCartClosed) {
        shoppingCart.classList.add('inactive');
    }

    desktopMenu.classList.toggle('inactive');
}

burguerMenu.addEventListener('click', showMobileMenu);

function showMobileMenu() {
    mobileMenu.classList.add('menu-active');
}

closeButton.addEventListener('click', closeMobileMenu);

function closeMobileMenu() {
    mobileMenu.classList.remove('menu-active');
}

openShoppingCartBtn.addEventListener('click', toggleShoppingCart);

function toggleShoppingCart() {
    if (!isDesktopMenuClosed) {
        desktopMenu.classList.add('inactive');
    }

    shoppingCart.classList.toggle('inactive');

    toggleShoppingCartTitle();
    mobileMediaQuery.addEventListener('change', toggleShoppingCartTitle);
}

function toggleShoppingCartTitle() {
    const isShoppingCartClosed = shoppingCart.classList.contains('inactive');

    if (!isShoppingCartClosed && mobileMediaQuery.matches) {
        yardSaleLogo.classList.add('inactive');
        shoppingTitle.classList.remove('inactive');
    } else {
        yardSaleLogo.classList.remove('inactive');
        shoppingTitle.classList.add('inactive');
    }
}

exitShoppingCartBtn.addEventListener('click', exitShoppingCart);

function exitShoppingCart() {
    shoppingCart.classList.add('inactive');
}
