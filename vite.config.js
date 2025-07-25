import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        productPage: resolve(
          __dirname,
          "src/product_pages/product.html",
          "src/product_pages/product.html",
        ),
        product2: resolve(__dirname, "src/product_pages/product.html"),
        product3: resolve(
          __dirname,
          "src/product_pages/product.html",
        ),
        product4: resolve(
          __dirname,
          "src/product_pages/product.html",
        ),
      },
    },
  },
});
