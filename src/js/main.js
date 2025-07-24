import tentProductData from "../json/tents.json";
import { loadTopProducts } from "./product";
import { getProducts } from "./product";
import { loadpageSection } from "../js/utils.mjs";

let partialFilePath = "./partials";

document.addEventListener("DOMContentLoaded", () => {
  const tentProducts = getProducts(tentProductData);
  loadpageSection(0, partialFilePath);
  loadpageSection(1, partialFilePath);
  loadTopProducts(tentProducts);
});
