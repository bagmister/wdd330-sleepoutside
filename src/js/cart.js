import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const productList = document.querySelector(".product-list");

  if (!cartItems || cartItems.length === 0) {
    productList.innerHTML = "No items in cart";
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join("");

  attachRemoveListeners(); // Attach listeners after rendering
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <span class="remove-item" data-id="${item.Id}">✕</span>
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
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
    // Optional: Support quantity if needed
    if (cartItems[index].Quantity > 1) {
      cartItems[index].Quantity -= 1;
    } else {
      cartItems.splice(index, 1);
    }
  }

  setLocalStorage("so-cart", cartItems);
  renderCartContents(); // Correct name
}

// Initial render
renderCartContents();
