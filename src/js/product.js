import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import fs from 'fs';
import path from 'path';

let cartCollection = [];
let topProductList = [];

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  cartCollection.push(product)
  setLocalStorage("so-cart", cartCollection);
}
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

document
  .getElementById("addToCart");

export function createProductPages(itemList) {
  itemList.forEach(item => {
    const newItem = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Sleep Outside | ${item.Name}</title>
        <link rel="stylesheet" href="../css/style.css" />
        <script src="../js/product.js" type="module"></script>
      </head>
      <body>
        <header class="divider">
          <div class="logo">
            <img src="/images/noun_Tent_2517.svg" alt="tent image for logo" />
            <a href="../index.html"> Sleep<span class="highlight">Outside</span></a>
          </div>
          <div class="cart">
            <a href="../cart/">
              <!-- SVG code for cart icon -->
            </a>
          </div>
        </header>
        <main class="divider">
          <section class="product-detail">
            <h3>${item.Brand.Name[0]}</h3>
            <h2 class="divider">${item.NameWithoutBrand}</h2>
            <img class="divider" src="../images/tents/${item.ImageIndex}" alt="${item.Alt}" />
            <p class="product-card__price">$${item.FinalPrice}</p>
            <p class="product__color">${item.Colors[0].ColorName}</p>
            <p class="product__description">${item.DescriptionHtmlSimple}</p>
            <div class="product-detail__add">
              <button id="addToCart" data-id="${item.Brand.Id[0]}">Add to Cart</button>
            </div>
          </section>
        </main>
        <footer>&copy; NOT a real business</footer>
      </body>
    </html>`;

    if (typeof window === "undefined") {
      const filename = path.join(__dirname, 'output', `${item.NameWithoutBrand}.html`);
      fs.writeFile(filename, newItem, 'utf8', (error) => {
        if (error) {
          console.log("Error writing file:", error);
        } else {
          console.log(`File for ${item.NameWithoutBrand} has been generated: ${filename}`);
        }
      });
    }
  });
}

export function loadTopProducts(itemList) {
  console.log("item list", itemList);
  const productList = [];

  // Create the list items for each product
  itemList.forEach(item => {
    const newProduct = `
      <li class="product-card">
        <a href="product_pages/${item.NameWithoutBrand}.html">
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

  const productListContainer = document.querySelector('.product-list');
  if (productListContainer) {
    console.log("Inserting products into .product-list");
    productListContainer.innerHTML = productList.join('');
  } else {
    console.log("Could not find .product-list container.");
  }

  // Add event listener for Add to Cart buttons using event delegation
  if (productListContainer) {
    productListContainer.addEventListener('click', (e) => {
      if (e.target && e.target.classList.contains('addToCartButton')) {
        const productId = e.target.dataset.id;
        addToCartHandler({ target: { dataset: { id: productId } } });
      }
    });
  }
}

export function getProducts(dataSource) {
  console.log("getProducts", dataSource)
  let productArray = [];
  dataSource.forEach(item => {
    productArray.push(item)
  });
  console.log("productArray", productArray)
  return productArray
}
