import CheckoutProcess from "./CheckoutProcess.mjs";
import { getLocalStorage, loadpageSection } from "./utils.mjs";

let cart = getLocalStorage("so-cart", []);

const checkoutprocess = new CheckoutProcess(cart, ".checkout-summary");

ch