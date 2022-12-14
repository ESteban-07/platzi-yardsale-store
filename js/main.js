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

const mainContainer = document.querySelector('.main-container');
const cardsContainer = document.querySelector('.cards-container');

const productDetail = document.querySelector('.product-detail');
let productDetailHeight = 0;
const productDetailCloseBtn = document.querySelector('.product-detail-close');
const slider = document.querySelector('.slider');

navbarEmail.addEventListener('click', toggleDesktopMenu);
burguerMenu.addEventListener('click', showMobileMenu);
closeButton.addEventListener('click', closeMobileMenu);
openShoppingCartBtn.addEventListener('click', toggleShoppingCart);
exitShoppingCartBtn.addEventListener('click', exitShoppingCart);
productDetailCloseBtn.addEventListener('click', exitProductDetail);
window.addEventListener('resize', function () {
    productDetailHeight = productDetail.offsetHeight;
    // console.log(productDetailHeight);

    return (mainContainer.style.top = `${productDetailHeight + 40}px`);
});

function toggleDesktopMenu() {
    const isShoppingCartClosed = shoppingCart.classList.contains('inactive');

    if (!isShoppingCartClosed) {
        shoppingCart.classList.add('inactive');
    }

    desktopMenu.classList.toggle('inactive');
}

function showMobileMenu() {
    mobileMenu.classList.add('menu-active');
}

function closeMobileMenu() {
    mobileMenu.classList.remove('menu-active');
}

function toggleShoppingCart() {
    const isDesktopMenuClosed = desktopMenu.classList.contains('inactive');
    const isProductDetailClosed = productDetail.classList.contains('inactive');

    if (!isDesktopMenuClosed) {
        desktopMenu.classList.add('inactive');
    }

    if (!isProductDetailClosed && !mobileMediaQuery.matches) {
        productDetail.classList.add('inactive');
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
        document.body.classList.add('no-scroll');
    } else {
        yardSaleLogo.classList.remove('inactive');
        shoppingTitle.classList.add('inactive');
        document.body.classList.remove('no-scroll');
    }
}

function exitShoppingCart() {
    shoppingCart.classList.add('inactive');
}

function exitProductDetail() {
    productDetail.classList.add('inactive');
    mainContainer.classList.remove('--product-detail-view');
    clearSlider();
}

function renderProducts(arr) {
    for (let product of arr) {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const productImg = document.createElement('img');
        productImg.setAttribute('src', product.images[0]);
        productImg.setAttribute('alt', product.name);

        const productInfo = document.createElement('div');
        productInfo.classList.add('product-info');

        const productInfoDiv = document.createElement('div');

        const productPrice = document.createElement('p');
        productPrice.innerText = product.price;

        const productName = document.createElement('p');
        productName.innerText = product.name;

        productInfoDiv.append(productPrice, productName);

        const productInfoFigure = document.createElement('figure');

        const addToCartIcon = document.createElement('img');
        addToCartIcon.setAttribute('src', './assets/icons/bt_add_to_cart.svg');
        addToCartIcon.setAttribute('alt', `add ${product.name} to cart`);

        productInfoFigure.appendChild(addToCartIcon);

        productInfo.append(productInfoDiv, productInfoFigure);

        productCard.append(productImg, productInfo);

        cardsContainer.appendChild(productCard);
    }
}

renderProducts(productList);

// Renderizando los detalles del producto seleccionado

const productCards = [...document.querySelectorAll('.product-card')];

productCards.forEach((productCard) => {
    productCard.addEventListener('click', renderCurrentItemDetails);
});

function renderCurrentItemDetails(e) {
    productDetail.classList.remove('inactive');

    const currentCardIndex = productCards.indexOf(e.currentTarget);

    const currentItem = productList.find((product, productIndex) => {
        if (productIndex == currentCardIndex) {
            return product;
        }
    });

    const itemPrice = document.querySelector('#item-price');
    itemPrice.innerText = currentItem.price;

    const productName = document.querySelector('#item-name');
    productName.innerText = currentItem.name;

    const itemDescription = document.querySelector('#item-description');
    itemDescription.innerText = currentItem.description;

    clearSlider();
    renderSlider(currentItem);

    productDetailHeight = productDetail.offsetHeight;
    // console.log(productDetailHeight);

    toggleProductDetailMobileView();

    mobileMediaQuery.addEventListener('change', toggleProductDetailMobileView);
}

function renderSlider(currentItem) {
    slider.classList.add('--displayed');

    const slidesContainer = document.createElement('div');
    slidesContainer.setAttribute('class', 'slides-container');

    let slides = '';

    currentItem.images.forEach((image) => {
        slides += `
        <div class="slide">
            <img
                src="${image}"
                alt="${currentItem.name}"
            />
        </div>
        `;
    });

    slidesContainer.innerHTML += slides;

    slider.appendChild(slidesContainer);

    const slidesArray = document.querySelectorAll('.slide');

    const buttonsHTML = Array.from(slidesArray, () => {
        return `<span class="slide-btn"></span>`;
    });

    const slidesNav = document.createElement('div');
    slidesNav.setAttribute('class', 'slides-nav');

    slidesNav.innerHTML = buttonsHTML.join('');

    slider.appendChild(slidesNav);

    const buttonsArray = slider.querySelectorAll('.slide-btn');

    buttonsArray.forEach((button, i) => {
        button.addEventListener('click', () => {
            // un-select all items
            slidesArray.forEach((item) =>
                item.classList.remove('--slide-selected')
            );
            buttonsArray.forEach((button) =>
                button.classList.remove('--btn-selected')
            );

            // select item cliked
            slidesArray[i].classList.add('--slide-selected');
            button.classList.add('--btn-selected');
        });
    });

    // Select the first item on page load
    slidesArray[0].classList.add('--slide-selected');
    buttonsArray[0].classList.add('--btn-selected');
}

function clearSlider() {
    if (slider.classList.contains('--displayed')) {
        slider.classList.remove('--displayed');
        slider.innerHTML = '';
    }
}

function toggleProductDetailMobileView() {
    const isProductDetailClosed = productDetail.classList.contains('inactive');

    const isShoppingCartClosed = shoppingCart.classList.contains('inactive');

    if (!isShoppingCartClosed) {
        shoppingCart.classList.add('inactive');
    } else {
        productDetail.classList.remove('inactive');
    }

    if (!isProductDetailClosed && mobileMediaQuery.matches) {
        mainContainer.style.top = `${productDetailHeight + 40}px`;
        smoothScrollToTop();
        mainContainer.classList.add('--product-detail-view');
    } else {
        mainContainer.classList.remove('--product-detail-view');
    }
}

function smoothScrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
