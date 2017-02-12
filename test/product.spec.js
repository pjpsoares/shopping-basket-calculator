const Product = require('../src/product');
const chai = require('chai');
const expect = chai.expect;

function testProduct(name, unitPrice, count, offer, { expectedDiscount, expectedTotal, expectedFinalPrice }) {
  let product;

  beforeEach(() => {
    product = new Product(name, unitPrice, offer);
    product.setCount(count);
  });

  it(`should have the discount as ${expectedDiscount}`, () => {
    expect(product.getDiscount()).to.equal(expectedDiscount);
  });

  it('should have the unit price as the passed value on the constructor', () => {
    expect(product.getUnitPrice()).to.equal(unitPrice);
  });

  it(`should have the total price as ${expectedTotal}`, () => {
    expect(product.getTotalPrice()).to.equal(expectedTotal);
  });

  it(`should have the final price as ${expectedFinalPrice}`, () => {
    expect(product.getFinalPrice()).to.equal(expectedFinalPrice);
  });

  it('should have the name as the passed value on the constructor', () => {
    expect(product.getName()).to.equal(name);
  });

}

describe('Product', () => {
  describe('when we havent set the count', () => {
    testProduct('Apple', 21.9, 0, 0, { expectedDiscount: 0, expectedTotal: 0, expectedFinalPrice: 0 });
  });

  describe('when we have a count of 1 without any offer', () => {
    testProduct('Banana', 82, 1, 0, { expectedDiscount: 0, expectedTotal: 82, expectedFinalPrice: 82 });
  });

  describe('when we have a count of 8 without any offer', () => {
    testProduct('Orange', 14.9, 8, 0, { expectedDiscount: 0, expectedTotal: 119.2, expectedFinalPrice: 119.2 });
  });

  describe('when we have a count of 1 and an offer of 2', () => {
    testProduct('Apple', 33, 1, 2, { expectedDiscount: 0, expectedTotal: 33, expectedFinalPrice: 33 });
  });

  describe('when we have a count of 2 and an offer of 2', () => {
    testProduct('Peach', 47.22, 2, 2, { expectedDiscount: 0, expectedTotal: 94.44, expectedFinalPrice: 94.44 }) ;
  });

  describe('when we have a count of 3 and an offer of 2', () => {
    testProduct('Banana', 24.3, 3, 2, { expectedDiscount: 24.3, expectedTotal: 72.9, expectedFinalPrice: 48.6 });
  });

  describe('when we have a count of 4 and an offer of 2', () => {
    testProduct('Garlic', 12.2, 4, 2, { expectedDiscount: 12.2, expectedTotal: 48.8, expectedFinalPrice: 36.6 });
  });

  describe('when we have a count of 11 and an offer of 2', () => {
    testProduct('Papayas', 9.3, 11, 2, { expectedDiscount: 27.9, expectedTotal: 102.3, expectedFinalPrice: 74.4 });
  });
});
