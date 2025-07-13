import tentProductData from "../json/tents.json"
import { createProductPages } from './product';
import { loadTopProducts } from './product';
import { getProducts } from './product';

document.addEventListener('DOMContentLoaded', () => {
  const tentProducts = getProducts(tentProductData);
  createProductPages(tentProducts);

  loadTopProducts(tentProducts);
});
