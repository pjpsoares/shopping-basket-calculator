class Product {
  constructor(name, unitPrice, offer = 0) {
    this.name = name;
    this.unitPrice = unitPrice;
    this.offer = offer;
    this.count = 0;
  }

  setCount(count) {
    this.count = count;
  }

  getDiscount() {
    if (!this.offer) {
      return 0;
    }

    const numberOfOffers = Math.floor(this.count / (this.offer + 1));
    return +(numberOfOffers * this.unitPrice).toFixed(2);
  }

  getUnitPrice() {
    return this.unitPrice;
  }

  getTotalPrice() {
    return +(this.unitPrice * this.count).toFixed(2);
  }

  getFinalPrice() {
    return +(this.getTotalPrice() - this.getDiscount()).toFixed(2);
  }

  getName() {
    return this.name;
  }

  getOffer() {
    return this.offer;
  }

  getCount() {
    return this.count;
  }
}

module.exports = Product;
