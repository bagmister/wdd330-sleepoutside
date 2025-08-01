import { setLocalStorage, getLocalStorage, loadpageSection } from "../js/utils.mjs";
import ExternalServices from './ExternalServices.mjs';

const partialFilePath = "/partials";
const headerContainer = document.querySelector(".headerForPage");
const footerContainer = document.querySelector(".footerForPage");

async function addToCartHandler(e) {
  const productId = e.target.dataset.id;
  const category = e.target.dataset.category || new URLSearchParams(window.location.search).get("category");
  if (!category) {
    console.error("No category provided for addToCartHandler");
    return;
  }
  const dataSource = new ExternalServices(category);
  const product = await dataSource.findProductById(productId);
  if (!product) {
    console.error(`Product with ID ${productId} not found in category ${category}`);
    return;
  }
  product.Category = category;
  addProductToCart(product);
}

function addProductToCart(product) {
  let cartCollection = getLocalStorage("so-cart") || [];
  cartCollection.push(product);
  setLocalStorage("so-cart", cartCollection);
  console.log("Cart updated:", cartCollection);
}

async function createProductPage(productId, category) {
  const mainContainer = document.querySelector("main.divider");
  if (mainContainer) {
    mainContainer.innerHTML = '<div class="product-detail"></div>';
  }
  headerContainer.innerHTML = "";
  footerContainer.innerHTML = "";

  await loadpageSection(0, partialFilePath).then(() => {
    const cartIcon = document.querySelector(".cart-icon");
    if (cartIcon) {
      cartIcon.addEventListener("click", () => {
        window.location.href = "../cart/index.html";
      });
    }
  });
  await loadpageSection(1, partialFilePath);

  const dataSource = new ExternalServices(category);
  const product = await dataSource.findProductById(productId);
  if (!product) {
    console.error("Product not found for ID:", productId);
    return;
  }
  product.Category = category;

  let newProductPage = `
    <h3>${product.Brand?.Name || 'Unknown Brand'}</h3>
    <h2 class="divider">${product.NameWithoutBrand || product.Name}</h2>
    <img class="divider" src="${product.Images?.PrimaryMedium || ''}" alt="${product.Name || 'Product image'}" />
    <p class="product-card__price">$${product.FinalPrice?.toFixed(2) || 'N/A'}</p>
    <p class="product__color">${product.Colors?.[0]?.ColorName || 'N/A'}</p>
    <p class="product__description">${product.DescriptionHtmlSimple || 'No description available'}</p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}" data-category="${category}">Add to Cart</button>
    </div>`;

  const productPageContainer = document.querySelector(".product-detail");
  if (productPageContainer) {
    productPageContainer.innerHTML = newProductPage;
    const addToCartButton = document.getElementById("addToCart");
    if (addToCartButton) {
      addToCartButton.addEventListener("click", addToCartHandler);
    }
  }
}

export function loadTopProducts(itemList) {
  const productList = [];
  itemList.forEach((item) => {
    if (item.Id === "989CG" || item.Id === "880RT") {
      return;
    }
    let newProduct = `
    <li class="product-card" data-id="${item.Id}">
      <a href="../product_pages/product.html?id=${item.Id}&category=${item.Category}">
        <img src="${item.Images?.PrimaryMedium || ''}" alt="${item.Name || 'Product image'}" />
        <h3 class="card__brand">${item.Brand?.Name || 'Unknown Brand'}</h3>
        <h2 class="card__name">${item.NameWithoutBrand || item.Name}</h2>
        <p class="product-card__price">$${item.FinalPrice?.toFixed(2) || 'N/A'}</p>
        <div class="product-detail__add">
          <button class="addToCartButton" data-id="${item.Id}" data-category="${item.Category}">Add to Cart</button>
        </div>
      </a>
    </li>`;
    productList.push(newProduct);
  });

  const productListContainer = document.querySelector(".top-product-list");
  if (productListContainer) {
    productListContainer.innerHTML = productList.join("");
  }

  if (productListContainer) {
    productListContainer.addEventListener("click", (e) => {
      if (e.target && e.target.classList.contains("addToCartButton")) {
        addToCartHandler(e);
      }
    });
  }
}

export function getProducts(dataSource) {
  let productArray = [];
  dataSource.forEach((item) => {
    productArray.push(item);
  });
  return productArray;
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("product.html")) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    const category = urlParams.get("category");
    if (productId && category) {
      createProductPage(productId, category);
    }
  }
});
