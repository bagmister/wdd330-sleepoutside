// import tentProductData from "../json/tents.json";
// import { loadProducts } from "./product";
import { getProducts } from "./product";
import { loadpageSection} from "./utils.mjs";

let partialFilePath = "./partials";

document.addEventListener("DOMContentLoaded", () => {
  // const tentProducts = getProducts(tentProductData);
  loadpageSection(0, partialFilePath)
  loadpageSection(1, partialFilePath)
  // loadTopProducts(tentProducts);
});
