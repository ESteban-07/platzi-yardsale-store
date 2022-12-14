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
const productDetailCloseBtn = document.querySelector('.product-detail-close');
const sliderBtns = [...document.querySelectorAll('input[name="radio-btn"]')];
const slides = [...document.querySelectorAll('.slide')];
const imagesContainer = document.querySelector('.images-container');
let counter = 0;
let scrollPosition = 0;
let slideWith = 0;

let automaticSliderInterval;

function automaticSlider() {
    // console.log('auto scroll on');
    automaticSliderInterval = setInterval(() => {
        // console.log(counter);
        sliderBtns[counter].checked = true;

        counter++;

        if (counter > 2) {
            counter = 0;
        }
    }, 3000);
}

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

navbarEmail.addEventListener('click', toggleDesktopMenu);
burguerMenu.addEventListener('click', showMobileMenu);
closeButton.addEventListener('click', closeMobileMenu);
openShoppingCartBtn.addEventListener('click', toggleShoppingCart);
exitShoppingCartBtn.addEventListener('click', exitShoppingCart);
productDetailCloseBtn.addEventListener('click', exitProductDetail);
sliderBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        const firstSlide = imagesContainer.firstElementChild;

        if (!firstSlide.classList.contains('first')) {
            firstSlide.classList.add('first');
        }

        if (imagesContainer.classList.contains('auto-scroll-on')) {
            imagesContainer.classList.remove('auto-scroll-on');
        }

        // console.log('auto scroll off');
        clearInterval(automaticSliderInterval);
    });
});

// FALTA ARREGLAR
imagesContainer.addEventListener('scroll', (e) => {
    const firstSlide = imagesContainer.firstElementChild;

    scrollPosition = e.currentTarget.scrollLeft;

    slideWith = e.currentTarget.offsetWidth;

    validateScrollPosition(scrollPosition, slideWith);

    if (imagesContainer.classList.contains('auto-scroll-on')) {
        imagesContainer.classList.remove('auto-scroll-on');
    }

    firstSlide.classList.remove('first');
    // console.log('auto scroll off');
    clearInterval(automaticSliderInterval);
});

function validateScrollPosition(scrollPosition, slideWidth) {
    // console.log(slideWidth);
    if (scrollPosition >= 0 && scrollPosition < slideWidth) {
        // primer slide
        sliderBtns[0].checked = true;
    } else if (
        scrollPosition >= slideWidth &&
        scrollPosition < slideWidth * 2
    ) {
        // segunda slide
        sliderBtns[1].checked = true;
    } else {
        //tercera slide
        sliderBtns[2].checked = true;
    }
}

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
}

const productList = [];
productList.push({
    name: 'Bike',
    price: formatter.format(1270),
    image: 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum accusamus eius reprehenderit quos, perferendis vel!',
});
productList.push({
    name: 'Bicycle helmet',
    price: formatter.format(1200),
    image: 'https://assets.specialized.com/i/specialized/60821-104_HLMT_ALIGN-II-HLMT-MIPS-CE-BLK-BLKREFL-S-M_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto',
    description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum accusamus eius reprehenderit quos, perferendis vel!',
});
productList.push({
    name: 'Bicycle helmet',
    price: formatter.format(1600),
    image: 'https://m.media-amazon.com/images/I/61eExL-rIAL._AC_SL1001_.jpg',
    description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum accusamus eius reprehenderit quos, perferendis vel!',
});
productList.push({
    name: 'Bicycle helmet',
    price: formatter.format(1500),
    image: 'https://assets.specialized.com/i/specialized/60822-140_HLMT_CHAMONIX-HLMT-MIPS-CE-MRN-M-L_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto',
    description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum accusamus eius reprehenderit quos, perferendis vel!',
});
productList.push({
    name: 'Seat',
    price: formatter.format(300),
    image: 'https://m.media-amazon.com/images/I/61e+sZ9rgNL._AC_SL1500_.jpg',
    description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum accusamus eius reprehenderit quos, perferendis vel!',
});
productList.push({
    name: 'Tennis Montain Bike',
    price: formatter.format(2200),
    image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/8ea578f6c07847fca2d0ac85011d7f1f_9366/Tenis_para_Mountain_Bike_Five_Ten_Freerider_Negro_FW2835_01_standard.jpg',
    description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum accusamus eius reprehenderit quos, perferendis vel!',
});
productList.push({
    name: 'Sunglasses',
    price: formatter.format(800),
    image: 'https://cdn.siroko.com/s/files/1/1220/6874/products/gafas-siroko-tech-k3s-london-lateral/1200x/crop_center.jpg?v=1635209602',
    description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum accusamus eius reprehenderit quos, perferendis vel!',
});
productList.push({
    name: 'Sunglasses',
    price: formatter.format(600),
    image: 'https://cdn.siroko.com/s/files/1/1220/6874/products/siroko-tech-k3s-clearfog-lente-antiniebla-frontal/1200x/crop_center.jpg?v=1635209603',
    description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum accusamus eius reprehenderit quos, perferendis vel!',
});
productList.push({
    name: 'Bicycle seat bag',
    price: formatter.format(876),
    image: 'https://m.media-amazon.com/images/I/81k2Gmal+VL._AC_SL1500_.jpg',
    description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum accusamus eius reprehenderit quos, perferendis vel!',
});
productList.push({
    name: 'Phone waterproof bag',
    price: formatter.format(876),
    image: 'https://m.media-amazon.com/images/I/510VNwidLHL._AC_SY1000_.jpg',
    description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum accusamus eius reprehenderit quos, perferendis vel!',
});

function renderProducts(arr) {
    for (let product of arr) {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const productImg = document.createElement('img');
        productImg.setAttribute('src', product.image);
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

    toggleProductDetailMobileView();

    mobileMediaQuery.addEventListener('change', toggleProductDetailMobileView);

    const currentCardIndex = productCards.indexOf(e.currentTarget);

    const currentItem = productList.find((product, productIndex) => {
        if (productIndex == currentCardIndex) {
            return product;
        }
    });

    const slideImages = [...document.querySelectorAll('.slide-img')];
    slideImages.forEach((img) => {
        img.setAttribute('src', currentItem.image);
        img.setAttribute('alt', currentItem.name);
    });

    const itemPrice = document.querySelector('#item-price');
    itemPrice.innerText = currentItem.price;

    const productName = document.querySelector('#item-name');
    productName.innerText = currentItem.name;

    const itemDescription = document.querySelector('#item-description');
    itemDescription.innerText = currentItem.description;

    displayFirstSlide();
    noTransition();

    imagesContainer.classList.add('auto-scroll-on');
    automaticSlider();
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
        smoothScrollToTop();
        mainContainer.classList.add('--product-detail-view');
    } else {
        mainContainer.classList.remove('--product-detail-view');
    }
}

function displayFirstSlide() {
    slides.forEach((slide) => slide.classList.add('no-transition'));

    counter = 0;

    // first radio button checked
    sliderBtns[0].checked = true;
}

function noTransition() {
    setTimeout(() => {
        slides.forEach((slide) => slide.classList.remove('no-transition'));
    }, 1000);
}

function smoothScrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
