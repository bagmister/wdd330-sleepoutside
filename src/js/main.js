import tentProductData from "../json/tents.json";
import { createProductPage } from './product';
import { loadTopProducts } from './product';
import { getProducts } from './product';

document.addEventListener('DOMContentLoaded', () => {
  const tentProducts = getProducts(tentProductData);
  loadTopProducts(tentProducts);

  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach(card => {
    card.addEventListener('click', (e) => {

      const target = e.target.closest('[data-id]');
      const productId = target ? target.getAttribute('data-id') : null;

      if (productId) {
        createProductPage(productId);
      } else {
        console.error("No product found in element.");
      }
    });
  });
});