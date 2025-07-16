import tentProductData from "../json/tents.json";
import { loadTopProducts } from './product';
import { getProducts } from './product';

document.addEventListener('DOMContentLoaded', () => {
  const tentProducts = getProducts(tentProductData);
  loadTopProducts(tentProducts);
});