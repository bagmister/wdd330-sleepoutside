const topProductList = document.querySelector(".product-list")

import { createProductPages } from './product.js';

async function loadProducts() {
    const response = await fetch('products.json');
    const products = await response.json();

    const app = document.getElementById('app');
    products.forEach(product => {
        const card = createProductCard(product);
        app.appendChild(card);
    });
}

loadProducts();
