function packageItems(items) {

  const simplifiedItems = items.map((item) => {

    console.log(item);

    return {

      id: item.Id,

      price: item.FinalPrice,

      name: item.Name,

      quantity: 1,

    };

  });

  return simplifiedItems;

}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0.06;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }

  calculateItemSubTotal(array) {
    let total = 0
    array.forEach(element => {
      let quantity = element.count
      let price = element.FinalPrice
      total += quantity * price
    }); 
    return total
  }

   calculateTax(valueToBeTaxed) {
    let tax= valueToBeTaxed * this.tax
    return tax
   }


  calculateOrderTotal() {
    // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
    this.tax = (this.itemTotal)
    this.shipping =
    this.orderTotal =

    // display the totals.
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    const orderTotal = document.querySelector(`${this.outputSelector} #order-total`);
    this.shipping = 10 + (this.list.length - 1) * 2;

    tax.innerText = `$${this.tax.toFixed(2)}`;
  }

}



