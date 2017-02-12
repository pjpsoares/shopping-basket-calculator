const productDAO = require('../src/product.dao');
const chai = require('chai');
const expect = chai.expect;

function testProduct(name, price, offer) {
  describe('for Apples', () => {
    let product;

    beforeEach(() => {
      product = productDAO.get(name);
    });

    it(`should have the name as ${name}`, () => {
      expect(product.getName()).to.equal(name);
    });

    it(`should have the price as ${price}`, () => {
      expect(product.getUnitPrice()).to.equal(price);
    });

    it(`should have the offer as ${offer}`, () => {
      expect(product.getOffer()).to.equal(offer);
    });
  });
}

describe('product DAO', () => {
  describe('#get', () => {
    describe('for a product that does not exist', () => {
      it('should throw an error for product not found', () => {
        const product = 'unknownProduct';
        expect(() => { productDAO.get(product); })
          .to.throw(`Product ${product} not found`);
      });
    });

    testProduct('Apples', 25, 0);
    testProduct('Oranges', 30, 0);
    testProduct('Garlic', 15, 0);
    testProduct('Papayas', 50, 2);
  });
});
