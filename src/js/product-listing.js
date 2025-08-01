import ExternalServices from './ExternalServices.mjs';
import { loadpageSection, getLocalStorage, setLocalStorage } from "./utils.mjs";

const partialFilePath = "/partials";
const headerContainer = document.querySelector(".headerForPage");
const footerContainer = document.querySelector(".footerForPage");

async function addToCartHandler(e) {
  const productId = e.target.dataset.id;
  const category = e.target.dataset.category;
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

async function createProductListingPage(productCategoryId) {
  const mainContainer = document.querySelector("main.divider");
  if (mainContainer) {
    mainContainer.innerHTML = `
      <div class="logo logo--square">
        <img src="../images/noun_Tent_2517.svg" alt="tent image for logo" />
        <div>Sleep<span class="highlight">Outside</span></div>
      </div>
      <section class="products">
        <h2>Products</h2>
        <ul class="product-list"></ul>
      </section>`;
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

  let category;
  if (productCategoryId === 1) {
    category = "tents";
  } else if (productCategoryId === 2) {
    category = "backpacks";
  } else if (productCategoryId === 3) {
    category = "sleeping-bags";
  } else if (productCategoryId === 4) {
    category = "hammocks";
  } else {
    console.error("Invalid product category ID:", productCategoryId);
    return;
  }

  const dataSource = new ExternalServices(category);
  const productList = await dataSource.getData(category);
  console.log("Products fetched for category:", category, productList);

  return loadProducts(productList, category);
}

export function loadProducts(itemList, category) {
  const productList = [];
  itemList.forEach(item => {
    if (item.Id === "989CG" || item.Id === "880RT") {
      return;
    }
    const newProduct = `
      <li class="product-card" data-id="${item.Id}">
        <a href="../product_pages/product.html?id=${item.Id}&category=${category}">
          <img src="${item.Images?.PrimaryMedium || ''}" alt="${item.Name || 'Product image'}" />
          <h3 class="card__brand">${item.Brand?.Name || 'Unknown Brand'}</h3>
          <h2 class="card__name">${item.NameWithoutBrand || item.Name}</h2>
          <p class="product-card__price">$${item.FinalPrice?.toFixed(2) || 'N/A'}</p>
          <div class="product-detail__add">
            <button class="addToCartButton" data-id="${item.Id}" data-category="${category}">Add to Cart</button>
          </div>
        </a>
      </li>`;
    productList.push(newProduct);
  });

  const productListContainer = document.querySelector(".product-list");
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


document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("productListing.html")) {
    const urlParams = new URLSearchParams(window.location.search);
    const productCategory = urlParams.get("product-list-id");
    if (productCategory) {
      createProductListingPage(Number(productCategory));
    }
  }
});