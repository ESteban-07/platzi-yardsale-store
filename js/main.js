const openMobileMenuBtn = document.querySelector('.burguer-menu');

const navbarEmail = document.querySelector('.navbar-email');
const navbarCart = document.querySelector('.navbar-shopping-cart');

const desktopMenu = document.querySelector('.desktop-menu');

const mobileMenu = document.querySelector('.mobile-menu');
const closeMobileMenuBtn = document.querySelector('#close-button');

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
const slider = document.querySelector('.slider');

const cartItemsContainer = document.querySelector('.cart-items');
const cartItemsArray = [];
const cart = document.querySelector('.cart');
let cartValue = parseInt(cart.innerText);

window.addEventListener('DOMContentLoaded', function () {
    renderCategoryButtons();
    renderProducts(productList);
});

navbarEmail.addEventListener('click', toggleDesktopMenu);

openMobileMenuBtn.addEventListener('click', toggleMobileMenu);
closeMobileMenuBtn.addEventListener('click', toggleMobileMenu);

openShoppingCartBtn.addEventListener('click', toggleShoppingCart);
exitShoppingCartBtn.addEventListener('click', toggleShoppingCart);
mobileMediaQuery.addEventListener('change', toggleShoppingCartTitle);

productDetailCloseBtn.addEventListener('click', exitProductDetail);

yardSaleLogo.addEventListener('click', redirectToHomePage);

window.addEventListener('resize', verticallyResizeMainContainer);
mobileMediaQuery.addEventListener('change', verticallyResizeMainContainer);

function toggleDesktopMenu() {
    toggleDisplayedViews(desktopMenu, [shoppingCart, productDetail]);
}

function toggleMobileMenu() {
    if (mobileMediaQuery.matches) {
        toggleDisplayedViews(mobileMenu);
    } else {
        toggleDisplayedViews(mobileMenu, [productDetail]);
    }
}

function toggleShoppingCart() {
    if (mobileMediaQuery.matches) {
        toggleDisplayedViews(shoppingCart);
        toggleShoppingCartTitle();
    } else {
        toggleDisplayedViews(shoppingCart, [desktopMenu, productDetail]);
    }
}

function toggleShoppingCartTitle() {
    const isShoppingCartClosed = shoppingCart.classList.contains('inactive');

    if (!isShoppingCartClosed && mobileMediaQuery.matches) {
        yardSaleLogo.classList.add('inactive');
        shoppingTitle.classList.remove('inactive');
        document.body.classList.add('no-scroll');
    } else {
        // console.log('shopping cart closed');
        yardSaleLogo.classList.remove('inactive');
        shoppingTitle.classList.add('inactive');
        document.body.classList.remove('no-scroll');
    }
}

function toggleProductDetail(e) {
    const open = e.currentTarget.classList.contains('product-card');

    toggleDisplayedViews(productDetail, [shoppingCart, desktopMenu], open);
}

function toggleDisplayedViews(
    elementToDisplay,
    elementsToHide = [],
    justOpenIt = false
) {
    for (let element of elementsToHide) {
        const isElementDisplayed = !element.classList.contains('inactive');

        if (isElementDisplayed) {
            element.classList.add('inactive');
        }
    }

    if (justOpenIt) {
        elementToDisplay.classList.remove('inactive');
        return;
    }

    elementToDisplay.classList.toggle('inactive');
}

function exitProductDetail() {
    toggleDisplayedViews(productDetail, [desktopMenu]);
    verticallyResizeMainContainer();
    clearSlider();
}

function renderProducts(products) {
    const productCards = products
        .map((product) => {
            return `
            <div class="product-card" data-id=${product.id}>
                <div
                    class="product-image"
                    style="background-image: url(${product.images[0]})">
                </div>
                <div class="product-info">
                    <div>
                        <p>${product.price}</p>
                        <p>${product.name}</p>
                    </div>
                    <button class="add-to-cart-btn" data-id=${product.id}>
                        <img 
                        src="./assets/icons/bt_add_to_cart.svg" 
                        alt="Add ${product.name} to cart" 
                        />
                    </button>
                </div>
            </div>
            `;
        })
        .join('');

    cardsContainer.innerHTML = productCards;

    const productCardsHTML = [...document.querySelectorAll('.product-card')];

    productCardsHTML.forEach((card) => {
        card.addEventListener('click', function (e) {
            const producImage = card.querySelector('.product-image');
            if (e.target == producImage) {
                renderCurrentItemDetails(e);
            }
        });
    });

    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');

    addToCartBtns.forEach((btn) => {
        btn.addEventListener('click', toggleAddToCartBtn);
    });
}

function toggleAddToCartBtn(e) {
    const itemID = e.currentTarget.dataset.id;

    const productCard = document.querySelector(`div[data-id="${itemID}"`);
    const productCardBtn = productCard.querySelector('button');

    const currentItem = productList.find((product) => {
        return product.id == itemID;
    });

    updateState(currentItem);

    const isProductAddedToCart = currentItem.state;

    if (isProductAddedToCart) {
        addItemToCart(currentItem, cartItemsArray);
    } else {
        removeItemFromCart(currentItem, cartItemsArray);
    }

    updateAddToCartBtnStyles(currentItem, productCardBtn);

    // Updating styles for product detail button when product detail is opened already
    const isProductDetailOpened = !productDetail.classList.contains('inactive');

    if (isProductDetailOpened) {
        const productDetailBtn = productDetail.querySelector('button');

        updateAddToCartBtnStyles(currentItem, productDetailBtn);
    }

    alertNotification(isProductAddedToCart);
    renderCartItems(cartItemsArray);
}

// FALTA AGREGAR ESTILOS

function updateAddToCartBtnStyles(item, btn) {
    const isProductAddedToCart = item.state;

    if (btn.classList.contains('primary-button')) {
        // PRODUCT DETAIL BUTTON VARIABLES
        const productDetailBtn = btn;
        const productDetailBtnIcon = productDetailBtn.querySelector('img');
        const productDetailBtnSpan = productDetailBtn.querySelector('span');

        if (isProductAddedToCart) {
            // ADD STYLES FOR PRODUCT DETAIL BTN
            productDetailBtn.style.backgroundColor = 'var(--white)';
            productDetailBtn.style.color = 'var(--hospital-green)';
            productDetailBtn.style.border = '1px solid var(--hospital-green)';

            productDetailBtnIcon.src = 'assets/icons/bt_added_to_cart.svg';
            productDetailBtnIcon.style.transform = 'none';
            productDetailBtnIcon.style.filter = 'none';

            productDetailBtnSpan.innerText = 'Added to cart';
        } else {
            // REMOVE STYLES FOR PRODUCT DETAIL BTN
            productDetailBtn.style.backgroundColor = 'var(--hospital-green)';
            productDetailBtn.style.color = 'var(--white)';
            productDetailBtn.style.border = 'none';

            productDetailBtnIcon.src = 'assets/icons/bt_add_to_cart.svg';
            productDetailBtnIcon.style.transform = 'none';
            productDetailBtnIcon.style.filter = 'none';

            productDetailBtnSpan.innerText = 'Add to cart';
        }

        // Updating Styles for product card btn when clicking product detail btn
        const productCard = document.querySelector(`div[data-id="${item.id}"`);
        const productCardBtn = productCard.querySelector('button');

        updateAddToCartBtnStyles(item, productCardBtn);
    } else {
        // PRODUCT CARD BUTTON VARIABLES
        const productCardBtn = btn;
        const productCardBtnIcon = productCardBtn.querySelector('img');

        if (isProductAddedToCart) {
            // ADD STYLES FOR PRODUCT CARD BUTTON
            productCardBtnIcon.src = 'assets/icons/bt_added_to_cart.svg';
            productCardBtnIcon.style.transform = 'scale(1.3)';
        } else {
            // REMOVE STYLES FOR PRODUCT CARD BUTTON
            productCardBtnIcon.src = 'assets/icons/bt_add_to_cart.svg';
            productCardBtnIcon.style.transform = 'none';
        }
    }
}

function updateState(item) {
    // Toggling boolean expression
    return (item.state = !item.state);
}

function addItemToCart(item, array) {
    updateCartItemsCounter('increase');
    updateTotalPayment(item, 'sum');

    const itemAdded = array.push(item);

    return itemAdded;
}

function removeItemFromCart(item, array) {
    updateCartItemsCounter('decrease');
    updateTotalPayment(item, 'rest');

    const index = array.indexOf(item);

    const itemRemoved = array.splice(index, 1);

    return itemRemoved;
}

function updateTotalPayment(item, operation) {
    const total = document.querySelector('#payment');
    let totalPayment = undoFormmattedPrice(total.innerText);
    let price = undoFormmattedPrice(item.price);

    if (operation == 'sum') {
        totalPayment += price;
    } else if (operation == 'rest') {
        totalPayment -= price;
    }

    total.innerText = formatter.format(totalPayment);
}

function undoFormmattedPrice(price) {
    const regex = /[$,]/g;
    return parseFloat(price.replace(regex, ''));
}

function updateCartItemsCounter(expression) {
    if (expression == 'increase') {
        cart.innerText = ++cartValue;
    } else if (expression == 'decrease') {
        cart.innerText = --cartValue;
    }
}

function renderCartItems(itemsArray) {
    const cartItems = itemsArray
        .map((item) => {
            return `
        <div class="cart-item">
            <figure>
                <img 
                src=${item.images[0]} 
                alt=${item.name} 
                />
                <figcaption>${item.name}</figcaption>
            </figure>

            <div>
                <p class="item-price">${item.price}</p>
                <button class="delete-item" data-id="${item.id}">
                    <img 
                        src="./assets/icons/icon_close.png" 
                        alt="Delete ${item.name} from cart"
                </button>
            </div>
        </div>
        `;
        })
        .join('');

    cartItemsContainer.innerHTML = cartItems;

    const deleteItemsFromCartBtns = document.querySelectorAll('.delete-item');

    deleteItemsFromCartBtns.forEach((btn) => {
        btn.addEventListener('click', toggleAddToCartBtn);
    });
}

function alertNotification(isAddedToCart) {
    if (isAddedToCart) {
        navbarCart.classList.add('--alert-notification');
        setTimeout(() => {
            navbarCart.classList.remove('--alert-notification');
        }, 500);
    } else {
        navbarCart.classList.remove('--alert-notification');
    }
}

function renderCurrentItemDetails(e) {
    toggleProductDetail(e);

    const itemID = e.currentTarget.dataset.id;

    const currentItem = productList.find((product) => {
        return product.id == itemID;
    });

    const itemPrice = document.querySelector('#item-price');
    itemPrice.innerText = currentItem.price;

    const productName = document.querySelector('#item-name');
    productName.innerText = currentItem.name;

    const itemDescription = document.querySelector('#item-description');
    itemDescription.innerText = currentItem.description;

    const productDetailBtn = productDetail.querySelector('button');
    productDetailBtn.setAttribute('data-id', itemID);

    updateAddToCartBtnStyles(currentItem, productDetailBtn);
    clearSlider();
    renderSlider(currentItem);
    verticallyResizeMainContainer();
    smoothScrollToTop();
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
                class="slide-img"
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

            resizeSlideImageX();
        });
    });

    // Select the first item on page load
    slidesArray[0].classList.add('--slide-selected');
    buttonsArray[0].classList.add('--btn-selected');

    resizeSlideImageX();
}

function clearSlider() {
    if (slider.classList.contains('--displayed')) {
        slider.classList.remove('--displayed');
        slider.innerHTML = '';
    }
}

function smoothScrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function productDetailHeight() {
    let height = productDetail.offsetHeight;

    return height;
}

function verticallyResizeMainContainer() {
    const isProductDetailClosed = productDetail.classList.contains('inactive');

    if (!isProductDetailClosed && mobileMediaQuery.matches) {
        mainContainer.style.top = `${productDetailHeight() + 60}px`;
    } else {
        mainContainer.style.top = `auto`;
    }
}

function redirectToHomePage() {
    return (location.href = 'index.html');
}

function resizeSlideImageX() {
    const currentSlide = document.querySelector('.--slide-selected');
    const currentSlideImage = currentSlide.firstElementChild;
    const naturalImageWidth = currentSlideImage.naturalWidth;
    const naturalImageHeight = currentSlideImage.naturalHeight;

    if (
        naturalImageWidth < naturalImageHeight &&
        naturalImageWidth > 900 &&
        naturalImageHeight > 1100
    ) {
        currentSlideImage.style.aspectRatio = 1;
        currentSlideImage.style.objectFit = 'cover';
    }
}

function renderCategoryButtons() {
    const btnContainer = document.querySelectorAll('.btn-container');

    btnContainer.forEach((btnContainer) => {
        const categories = productList.reduce(
            function (values, item) {
                if (!values.includes(item.category)) {
                    values.push(item.category);
                }
                return values;
            },
            ['all']
        );

        let categoryBtns = categories
            .map((category) => {
                return `<button class="filter-btn" type="button" data-id="${category}">${category}</button>`;
            })
            .join('');

        btnContainer.innerHTML = categoryBtns;

        const filterBtns = btnContainer.querySelectorAll('.filter-btn');

        filterBtns.forEach((btn, i, arr) => {
            btn.addEventListener('click', function (e) {
                const currentBtn = arr[i];

                const category = currentBtn.dataset.id;

                const productsByCategory = productList.filter(
                    (item) => item.category == category
                );

                if (category === 'all') {
                    renderProducts(productList);

                    // Updating styles for products added to cart
                    productList.forEach((product) => {
                        const productCardBtn = document.querySelector(
                            `button[data-id="${product.id}"`
                        );

                        updateAddToCartBtnStyles(product, productCardBtn);
                    });
                } else {
                    renderProducts(productsByCategory);

                    // Updating styles for products added to cart
                    productsByCategory.forEach((product) => {
                        const productCardBtn = document.querySelector(
                            `button[data-id="${product.id}"`
                        );
                        updateAddToCartBtnStyles(product, productCardBtn);
                    });
                }

                toggleActiveBtn(currentBtn, arr);

                // Clossing Product Detail if it is opened
                const isProductDetailOpened =
                    !productDetail.classList.contains('inactive');

                if (isProductDetailOpened) {
                    productDetail.classList.add('inactive');
                }

                // Checking if mobile menu is opened to close components when clicking a filter button
                const isMobileMenuOpened =
                    !mobileMenu.classList.contains('inactive');

                if (isMobileMenuOpened) {
                    toggleDisplayedViews(mobileMenu, [
                        productDetail,
                        shoppingCart,
                    ]);
                    mainContainer.style.top = 'auto';
                    document.body.classList.remove('no-scroll');
                }
            });
        });

        // First button active by default
        filterBtns[0].classList.add('--active-btn');
    });
}

function toggleActiveBtn(currentBtn, arrayBtns) {
    arrayBtns.forEach((btn) => {
        btn.classList.remove('--active-btn');
    });

    currentBtn.classList.add('--active-btn');
}
