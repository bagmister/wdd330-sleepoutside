import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems == null) {
    return document.querySelector(".product-list").innerHTML = "No items in cart";
  }
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `    <main class="divider">
      <section class="product-detail">
        <h3>The North Face</h3>

        <h2 class="divider">${item.NameWithoutBrand}</h2>

        <img
          class="divider"
          src="${item.Image}"
          alt="${item.Alt}"
        />

        <p class="product-card__price">$${item.ListPrice}</p>

        <p class="product__color">${item.Colors[0].ColorName}</p>

        <p class="product__description">
          ${item.DescriptionHtmlSimple}
        </p>

        <div class="product-detail__add">
          <button id="addToCart" data-id="${item.Brand[0].Id}">Add to Cart</button>
        </div>
      </section>
    </main>`;

  return newItem;
}

renderCartContents();
