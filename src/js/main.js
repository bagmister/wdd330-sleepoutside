import tentProductData from "../json/tents.json"
import { createProductPage } from './product';
import { loadTopProducts } from './product';
import { getProducts } from './product';

document.addEventListener('DOMContentLoaded', () => {
  const tentProducts = getProducts(tentProductData);
  loadTopProducts(tentProducts);
});

let productCard = document.querySelector(".product-card");
 
  productCard = document.addEventListener('click', (e) => {
    const productCardId = e.target.dataset.id;
    createProductPage({ target: { dataset: { id: productCardId } } })
  });

