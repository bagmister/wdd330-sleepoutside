import ProductData from './ProductData.mjs';
import { loadpageSection} from "./utils.mjs";
let partialFilePath = "./public/partials";
const headerContainer = document.querySelector(".headerForPage");
const footerContainer = document.querySelector(".footerForPage");


async function createProductListingPage(productCategoryId) {
  headerContainer.innerHTML = "";
  footerContainer.innerHTML = "";
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

  const dataSource = new ProductData(category);
  // Fetch the actual product data
  const productList = await dataSource.getData(category);
  console.log("Products fetched for category:", category, productList);

  return loadProducts(productList);
}

export function loadProducts(itemList) {
  const productList = [];

  itemList.forEach(item => {
    if (item.Id === "989CG" || item.Id === "880RT") {
      return;
    }
    const newProduct = `
      <li class="product-card" data-id="${item.Id}">
        <a href="./product_pages/product.html?id=${item.Id}&category=${item.Category}">
          <img src="${item.Images.PrimaryMedium}" alt="${item.Name || 'Product image'}" />
          <h3 class="card__brand">${item.Brand?.Name || 'Unknown Brand'}</h3>
          <h2 class="card__name">${item.NameWithoutBrand || item.Name}</h2>
          <p class="product-card__price">$${item.FinalPrice.toFixed(2)}</p>
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
    console.error("Could not find .product-list to update.");
  }

  if (productListContainer) {
    productListContainer.addEventListener("click", (e) => {
      if (e.target && e.target.classList.contains("addToCartButton")) {
        const productId = e.target.dataset.id;
        addToCartHandler({ target: { dataset: { id: productId } } });
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
    } else {
      console.error("No product-list-id found in URL.");
    }
  }
});