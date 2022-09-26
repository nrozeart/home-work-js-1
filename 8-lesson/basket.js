"use strict";

const basketCounterEl = document.querySelector('.basket-icon span');
const basketIcon = document.querySelector('.basket-icon');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const basketTotalEl = document.querySelector('.basketTotal');
const basketEl = document.querySelector('.basket');
const productsListEl = document.querySelector('.products-list');

basketIcon.addEventListener('click', () => {
    basketEl.classList.toggle('hidden');
})

/**
 * В корзине хранится количество каждого товара
 * Ключ это id продукта, значение это товар в корзине - объект, содержащий
 * id, название товара, цену, и количество штук, например:
 * {
 *    1: {id: 1, name: "product 1", price: 30, count: 2},
 *    3: {id: 3, name: "product 3", price: 25, count: 1},
 * }
 */
const basket = {};

productsListEl.addEventListener('click', event => {
    if (!event.target.closest('.products-item-btn')) {
        return;
    }
    const featuredItem = event.target.closest('.products-item');
    const id = +featuredItem.dataset.id;
    const name = featuredItem.dataset.name;
    const price = +featuredItem.dataset.price;
    // console.log(id, name, price);
    addToCart(id, name, price);
});

function addToCart(id, name, price) {
    if (!(id in basket)) {
        basket[id] = { id, name, price, count: 0 };
    }
    basket[id].count++;
    basketCounterEl.textContent = getTotalBasketCount().toString();
    basketTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);
    renderBasketProduct(id);
}

function getTotalBasketCount() {
    return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
}

function getTotalBasketPrice() {
    return Object.values(basket)
        .reduce((acc, product) => acc + product.price * product.count, 0);
}

function renderBasketProduct(id) {
    const basketRowEl = basketEl
        .querySelector(`.basketRow[data-productId="${id}"]`);
    if (!basketRowEl) {
        renderNewBasketProduct(id);
        return;
    }
    const productCountEl = basketRowEl
        .querySelector(".productCount");
    productCountEl.textContent = basket[id].count;
    const productPriceEl = basketRowEl
        .querySelector(".productTotalRaw");
    productPriceEl.textContent = basket[id].price * basket[id].count;
}

function renderNewBasketProduct(productId) {
    const productRow = `
        <div class="basketRow" data-productId="${productId}">
            <div>${basket[productId].name}</div>
            <div>
                <span class="productCount">${basket[productId].count}</span> шт.
            </div>
            <div>${basket[productId].price}</div>
            <div>
                $<span class="productTotalRaw">${basket[productId].price * basket[productId].count}</span>
            </div>
        </div>
    `;
    basketTotalEl.insertAdjacentHTML('beforebegin', productRow);
}
