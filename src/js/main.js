import { loadpageSection } from "./utils.mjs";

const partialFilePath = "/partials";

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
  if (localStorage.getItem('subscribed') !== 'true') {
    showModal();
  }
});

function showModal() {
  const modal = document.querySelector('.modal');
  modal.classList.add('show');
  modal.querySelector('.email-input');
}

function hideModal() {
  document.querySelector('.modal').classList.remove('show');
}

document.querySelector('.modal-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const emailInput = document.querySelector('.email-input');
  const email = emailInput.value;
  const errorMessage = document.querySelector('.error-message');
  const successMessage = document.querySelector('.success-message');

  errorMessage.style.display = 'none';
  successMessage.style.display = 'none';

  if (email) {
    localStorage.setItem('subscribed', 'true');
    successMessage.style.display = 'block';
    setTimeout(hideModal, 2000);
  } else {
    errorMessage.style.display = 'block';
    emailInput.focus();
  }
});

document.querySelector('.close-button').addEventListener('click', hideModal);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && document.querySelector('.modal.show')) {
    hideModal();
  }
});

document.querySelector('.modal').addEventListener('keydown', (event) => {
  if (event.key === 'Tab' && document.querySelector('.modal.show')) {
    const focusableElements = document.querySelectorAll(
      '.modal.show .email-input, .modal.show button'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }
});