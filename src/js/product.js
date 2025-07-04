import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
let cartCollection = []

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  cartCollection.push(product)
  setLocalStorage("so-cart", cartCollection);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
