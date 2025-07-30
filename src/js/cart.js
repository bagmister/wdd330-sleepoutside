import { getLocalStorage, setLocalStorage, loadpageSection } from "./utils.mjs";

const partialFilePath = "/partials";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const productList = document.querySelector(".product-list");

  if (!cartItems || cartItems.length === 0) {
    productList.innerHTML = "No items in cart";
    document.querySelector("#cart-total").textContent = "Total: $0.00";
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join("");

  attachRemoveListeners(); // Set up remove buttons

  updateCartTotal(cartItems); // New function to calculate and display total
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
    <p class="cart-card__quantity">qty: ${item.count || 1}</p>
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

function combineDuplicates(cartItems) {
  const itemMap = new Map();
  
  cartItems.forEach(item => {
    if (itemMap.has(item.Id)) {
      const existingItem = itemMap.get(item.Id);
      existingItem.count = (existingItem.count || 1) + (item.count || 1);
    } else {
      itemMap.set(item.Id, { ...item, count: item.count || 1 });
    }
  });

  const consolidatedItems = Array.from(itemMap.values());
  
  setLocalStorage("so-cart", consolidatedItems);
  
  return consolidatedItems;
}

function removeItemFromCart(idToRemove) {
  let cartItems = getLocalStorage("so-cart") || [];
  cartItems = cartItems.filter((item) => item.Id !== idToRemove);
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
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

function updateCartTotal(cartItems) {
  let total = 0;

  cartItems.forEach(item => {
    const quantity = item.Quantity || 1;
    total += item.FinalPrice * quantity;
  });

  document.querySelector("#cart-total").textContent = `Total: $${total.toFixed(2)}`;
}