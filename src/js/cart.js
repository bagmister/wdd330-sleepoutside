import { getLocalStorage, setLocalStorage, loadpageSection } from "./utils.mjs";

const partialFilePath = "../public/partials";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  console.log("Cart items from localStorage:", cartItems);
  const productList = document.querySelector(".product-list");

  if (!productList) {
    console.error("Could not find .product-list container.");
    return;
  }

  if (!cartItems || cartItems.length === 0) {
    productList.innerHTML = "<p>No items in cart</p>";
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join("");

  attachRemoveListeners();
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <span class="remove-item" data-id="${item.Id}">✕</span>
    <a href="../product_pages/product.html?id=${item.Id}&category=${item.Category || 'unknown'}">
      <img src="${item.Images?.PrimaryMedium || ''}" alt="${item.Name || 'Product image'}" />
    </a>
    <a href="../product_pages/product.html?id=${item.Id}&category=${item.Category || 'unknown'}">
      <h2 class="card__name">${item.Name || 'Unknown Product'}</h2>
    </a>
    <p class="cart-card__color">${item.Colors?.[0]?.ColorName || 'N/A'}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice?.toFixed(2) || 'N/A'}</p>
  </li>`;
}

function attachRemoveListeners() {
  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const id = event.target.dataset.id;
      removeItemFromCart(id);
    });
  });
}

function removeItemFromCart(idToRemove) {
  let cartItems = getLocalStorage("so-cart") || [];
  const index = cartItems.findIndex((item) => item.Id === idToRemove);
  if (index !== -1) {
    cartItems.splice(index, 1);
    setLocalStorage("so-cart", cartItems);
    renderCartContents();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const mainContainer = document.querySelector("main.divider");
  if (mainContainer) {
    mainContainer.innerHTML = `
      <section class="cart">
        <h2>My Cart</h2>
        <ul class="product-list"></ul>
      </section>`;
  }

  loadpageSection(0, partialFilePath).then(() => {
    const cartIcon = document.querySelector(".cart");
    if (cartIcon) {
      cartIcon.addEventListener("click", () => {
        window.location.href = "../cart/index.html";
      });
    }
  });
  loadpageSection(1, partialFilePath);
  renderCartContents();
});