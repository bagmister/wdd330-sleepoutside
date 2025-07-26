import { loadpageSection } from "./utils.mjs";

const partialFilePath = "../public/partials";

document.addEventListener("DOMContentLoaded", () => {
  loadpageSection(0, partialFilePath);
  loadpageSection(1, partialFilePath);

  window.addEventListener("popstate", () => {
    const pathname = window.location.pathname;
    if (pathname.includes("product.html")) {
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get("id");
      const category = urlParams.get("category");
      if (productId) {
        createProductPage(productId, category);
      }
    } else if (pathname.includes("productListing.html")) {
      const urlParams = new URLSearchParams(window.location.search);
      const productCategory = urlParams.get("product-list-id");
      if (productCategory) {
        createProductListingPage(Number(productCategory));
      }
    } else {
      const mainContainer = document.querySelector("main.divider");
      if (mainContainer) {
        mainContainer.innerHTML = `
          <div class="hero">
            <img src="images/banner-sm.jpg" srcset="images/banner-sm.jpg 500w, images/banner.jpg" alt="image of a high mountain lake" />
            <div class="logo logo--square">
              <img src="images/noun_Tent_2517.svg" alt="tent image for logo" />
              <div>Sleep<span class="highlight">Outside</span></div>
            </div>
            <div class="product-category-list">
              <a href="product_listing/productListing.html?product-list-id=1">
                <img src="images/category-tents.svg" alt="Tent products icon" />
              </a>
              <a href="product_listing/productListing.html?product-list-id=2">
                <img src="images/category-backpacks.svg" alt="Backpack products icon" />
              </a>
              <a href="product_listing/productListing.html?product-list-id=3">
                <img src="images/category-sleepingbags.svg" alt="Sleepingbag products icon" />
              </a>
              <a href="product_listing/productListing.html?product-list-id=4">
                <img src="images/category-hammocks.svg" alt="Hammock products icon" />
              </a>
            </div>
            <div class="mission">
              <p>
                Our mission is to provide you with everything you need to sleep
                outside comfortably at an affordable price.
              </p>
            </div>
          </div>
          <section class="products">
            <h2>Top Products</h2>
            <ul class="top-product-list"></ul>
          </section>`;
        loadpageSection(0, partialFilePath).then(() => {
          const cartIcon = document.querySelector(".cart");
          if (cartIcon) {
            cartIcon.addEventListener("click", () => {
              window.location.href = "../cart/index.html";
            });
          }
        });
        loadpageSection(1, partialFilePath);
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  loadpageSection(0, partialFilePath).then(() => {
    const cartIcon = document.querySelector(".cart");
    if (cartIcon) {
      cartIcon.addEventListener("click", () => {
        window.location.href = "../cart/index.html";
      });
    }
  });
  loadpageSection(1, partialFilePath);
});
