import { setLocalStorage, loadpageSection } from "../js/utils.mjs";
import ProductData from './ProductData.mjs';

let partialFilePath = "./public/partials";

const headerContainer = document.querySelector(".headerForPage");
const footerContainer = document.querySelector(".footerForPage");
const cartCollection = [];
const topProductList = [];


function addProductToCart(product) {
  cartCollection.push(product);
  setLocalStorage("so-cart", cartCollection);
}

async function addToCartHandler(e) {
  let product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

async function createProductPage(productId, category) {
  headerContainer.innerHTML = "";
  footerContainer.innerHTML = "";
  await loadpageSection(0, partialFilePath)
  await loadpageSection(1, partialFilePath)
  console.log("the category: ", category)
  console.log("the productId: ", productId)
  let dataSource = new ProductData(category);
  console.log("dataSource used for create product page:", dataSource);
  let product = await dataSource.findProductById(productId);
  console.log("Product:", product);
  if (!product) {
    console.error("Product not found for ID:", productId);
    return;
  }
  console.log("product we will use: ", product)
  let newProductPage = `
    <h3>${product.Brand.Name[0]}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img class="divider" src="../${product.Images.PrimaryMedium[0]}" alt="${product.Alt}" />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">${product.DescriptionHtmlSimple}</p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>`;

  let productPageContainer = document.querySelector(".product-detail");
  if (productPageContainer) {
    productPageContainer.innerHTML = newProductPage;

    let addToCartButton = document.getElementById("addToCart");
    if (addToCartButton) {
      addToCartButton.addEventListener("click", addToCartHandler);
    } else {
      console.error("Could not find #addToCart button.");
    }
  } else {
    console.error(
      "Could not find .product-detail for adding product detial for the product page.",
    );
  }

  if (!headerContainer || !footerContainer) {
    console.error("Header or footer container not found.");
    return;
  }
}

export function loadTopProducts(itemList) {
  let productList = [];

  itemList.forEach((item) => {
    if (item.Id === "989CG" || item.Id === "880RT") {
      return;
    }
    let newProduct = `
    <li class="product-card" data-id="${item.Id}">
      <a href="./product_pages/product.html?id=${item.Id}">
        <img src="${item.ImageIndex}" alt="${item.Alt}" />
        <h3 class="card__brand">${item.Brand.Name}</h3>
        <h2 class="card__name">${item.NameWithoutBrand}</h2>
        <p class="product-card__price">$${item.FinalPrice}</p>
        <div class="product-detail__add">
          <button class="addToCartButton" data-id="${item.Id}">Add to Cart</button>
        </div>
      </a>
    </li>
    `;
    productList.push(newProduct);
  });

  const productListContainer = document.querySelector(".product-list");
  if (productListContainer) {
    productListContainer.innerHTML = productList.join("");
  } else {
    console.log("Could not find .product-list to update.");
  }

  if (productListContainer) {
    productListContainer.addEventListener("click", (e) => {
      if (e.target && e.target.classList.contains("addToCartButton")) {
        let productId = e.target.dataset.id;
        addToCartHandler({ target: { dataset: { id: productId } } });
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
    let urlParams = new URLSearchParams(window.location.search);
    let productId = urlParams.get("id");
    let category = urlParams.get("category")
    if (productId) {
      createProductPage(productId, category);
    }
  }
});
