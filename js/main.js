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

navbarEmail.addEventListener('click', toggleDesktopMenu);

function toggleDesktopMenu() {
    const isShoppingCartClosed = shoppingCart.classList.contains('inactive');

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
    const isDesktopMenuClosed = desktopMenu.classList.contains('inactive');

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

const productList = [];
productList.push({
    name: 'Bike',
    price: 120,
    image: 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
});
productList.push({
    name: 'LG TV',
    price: 999.99,
    image: 'https://reviewed-com-res.cloudinary.com/image/fetch/s--zsAlJ0VN--/b_white,c_limit,cs_srgb,f_auto,fl_progressive.strip_profile,g_center,h_668,q_auto,w_1187/https://reviewed-production.s3.amazonaws.com/1632142368000/LG-8K-QNED99-Hero.jpg',
});
productList.push({
    name: 'Macbook Pro',
    price: 620,
    image: 'https://www.cnet.com/a/img/resize/085fe019f07e0f866dac5fcfc76f959f56c6eb67/hub/2021/12/06/537f8843-0daf-4de7-a7fa-36ce916c8e70/20211122-2021-16-inch-apple-macbook-pro-01.jpg?auto=webp&fit=crop&height=1200&width=1200',
});
productList.push({
    name: 'Samsung S23',
    price: 300,
    image: 'https://www.tuexperto.com/wp-content/uploads/2022/06/estos-son-los-primeros-rumores-que-estan-surgiendo-en-torno-al-samsung-galaxy-s23.jpg',
});

// Inserting product cards from js to html

const cardsContainer = document.querySelector('.cards-container');

function formatPrice(price) {
    const numDecimalCommaSeparated = (Math.round(price * 100) / 100)
        .toFixed(2)
        .replace('.', ',');

    return numDecimalCommaSeparated;
}

let productCard = '';

productList.forEach((product) => {
    productCard = `
                <div class="product-card">
                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    />
                    <div class="product-info">
                        <div>
                            <p>
                            $${formatPrice(product.price)}
                            </p>
                            <p>${product.name}</p>
                        </div>
                        <figure>
                            <img
                                src="./assets/icons/bt_add_to_cart.svg"
                                alt="add ${product.name} to cart"
                            />
                        </figure>
                    </div>
                </div>
    `;

    cardsContainer.innerHTML += productCard;
});
