import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.taxRate = 0.06;
    this.taxAmount = 0;
    this.shipping = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.itemTotal = this.calculateItemSubTotal(this.list);
    this.displayItemSubtotal();

    const zipInput = document.querySelector("#zip");
    if (zipInput) {
      zipInput.addEventListener("change", () => {
        this.calculateOrderTotal();
      });
    }
  }

  calculateItemSubTotal(cart) {
    return cart.reduce((acc, item) => acc + (item.FinalPrice * (item.count || 1)), 0);
  }

  calculateTax(subtotal) {
    return subtotal * this.taxRate;
  }

  calculateShipping(cart) {
    const totalItems = cart.reduce((acc, item) => acc + (item.count || 1), 0);
    return 10 + (totalItems - 1) * 2;
  }

  calculateOrderTotal() {
    this.taxAmount = this.calculateTax(this.itemTotal);
    this.shipping = this.calculateShipping(this.list);
    this.orderTotal = this.itemTotal + this.taxAmount + this.shipping;

    this.displayOrderTotals();
  }

displayItemSubtotal() {
  const subtotalElem = document.querySelector("#sub-total");
  const taxElem = document.querySelector("#tax-total");
  const shippingElem = document.querySelector("#shipping-total");
  const finalTotalElem = document.querySelector("#finalCheckout-total");

  const quantity = this.list.reduce((acc, item) => acc + (item.count || 1), 0);
  const shippingCost = 10 + (quantity - 1) * 2;
  const taxAmount = this.itemTotal * 0.06;
  const finalTotal = this.itemTotal + taxAmount + shippingCost;

  if (subtotalElem) {
    subtotalElem.innerText = `Sub Total: $${this.itemTotal.toFixed(2)}`;
    taxElem.innerText = `Tax: $${taxAmount.toFixed(2)}`;
    shippingElem.innerText = `Shipping: $${shippingCost.toFixed(2)}`;
    finalTotalElem.innerText = `Final Total: $${finalTotal.toFixed(2)}`;
  }
}

  displayOrderTotals() {
    document.querySelector("#tax-total").innerText = `Tax: $${this.taxAmount.toFixed(2)}`;
    document.querySelector("#shipping-total").innerText = `Shipping: $${this.shipping.toFixed(2)}`;
    document.querySelector("#finalCheckout-total").innerText = `Total: $${this.orderTotal.toFixed(2)}`;
  }



  prepareItems() {
  return this.list.map(item => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: item.count || 1
  }));
}

async checkout(event) {
  event.preventDefault(); // Prevent form submit

  const form = document.forms['checkout-form']; 

  const items = this.prepareItems();
  const quantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const taxAmount = +(this.itemTotal * 0.06).toFixed(2);
  const shippingAmount = 10 + (quantity - 1) * 2;
  const total = +(this.itemTotal + taxAmount + shippingAmount).toFixed(2);

  const order = {
    orderDate: new Date().toISOString(),
    fname: form.fname.value,
    lname: form.lname.value,
    street: form.street.value,
    city: form.city.value,
    state: form.state.value,
    zip: form.zip.value,
    cardNumber: form.cardNumber.value || '1234123412341234',
    expiration: form.expiration.value || '12/30',
    code: form.code.value || '123',
    items: items,
    orderTotal: total.toFixed(2),
    shipping: shippingAmount,
    tax: taxAmount.toFixed(2)
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(order)
  };

  try {
    const response = await fetch('https://wdd330-backend.onrender.com:3000/checkout', options);
    const result = await response.json();
    console.log('Order success:', result);
    return result;
  } catch (err) {
    console.error('Checkout failed:', err);
  }
}
}


