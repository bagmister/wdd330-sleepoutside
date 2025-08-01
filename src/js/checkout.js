import CheckoutProcess from "./CheckoutProcess.mjs";
import { getLocalStorage, loadpageSection } from "./utils.mjs";

let cart = getLocalStorage("so-cart", []);
let subDocSelector = document.querySelector("#sub-total")
let taxDocSelector = document.querySelector("#tax-total")
let shippingDocSelector = document.querySelector("#shipping-total")
let finalPriceDocSelector = document.querySelector("#finalCheckout-total")

const checkoutprocess = new CheckoutProcess(cart, ".checkout-summary")

let subtotal = checkoutprocess.calculateItemSubTotal(cart)
subDocSelector.innerHTML = `
      <div id="sub-total">Sub Total: $${subtotal.toFixed(2)}</div>
    `
let taxTotal = checkoutprocess.calculateTax(subtotal)
taxDocSelector.innerHTML = `
      <div id="tax-total">Tax: $${taxTotal.toFixed(2)}</div>
    `
let shippingTotal = checkoutprocess.calculateshipping(cart)
shippingDocSelector.innerHTML = `
      <div id="shipping-total">Shipping: $${shippingTotal.toFixed(2)}</div>
    `
let totalPrice = checkoutprocess.calculateOrderTotal(subtotal, taxTotal, shippingTotal)