const receiptService = require('../src/receipt.service');
const productService = require('../src/product.service');
const Product = require('../src/product');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const expect = chai.expect;

describe('receipt service', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('#description', () => {
    describe('when we have multiple products without any discount', () => {
      const productsList = [
        'Apples',
        'Apples',
        'Apples'
      ];
      let receipt;
      let appleProduct;
      const totalValue = 69;
      const discount = 0;
      const finalValue = 69;

      beforeEach(() => {
        appleProduct = new Product('Apples', 23, 0);
        appleProduct.setCount(3);
        sandbox.stub(productService, 'getDetails').returns({
          products: [ appleProduct ],
          total: totalValue,
          discount: discount,
          finalPrice: finalValue
        });

        receipt = receiptService.description(productsList);
      });

      it('should get the products details from the products service', () => {
        expect(productService.getDetails).to.have.been.calledWith(productsList);
      });

      it('should return the detailed receipt without any discount for the lines', () => {
        expect(receipt).to.equal(
          '\nApples: 3 x 23 = 69' +
          '\nSummary:' +
          '\nTotal value: ' + totalValue +
          '\nTotal discount: ' + discount +
          '\nFinal value: ' + finalValue
        );
      });
    });

    describe('when we have multiple products with discount', () => {
      const productsList = [
        'Papayas',
        'Papayas',
        'Papayas'
      ];
      let receipt;
      let appleProduct;
      const totalValue = 69;
      const discount = 23;
      const finalValue = 46;

      beforeEach(() => {
        appleProduct = new Product('Papayas', 23, 2);
        appleProduct.setCount(3);
        sandbox.stub(productService, 'getDetails').returns({
          products: [ appleProduct ],
          total: totalValue,
          discount: discount,
          finalPrice: finalValue
        });

        receipt = receiptService.description(productsList);
      });

      it('should get the products details from the products service', () => {
        expect(productService.getDetails).to.have.been.calledWith(productsList);
      });

      it('should return the detailed receipt with the discount for the lines', () => {
        expect(receipt).to.equal(
          '\nPapayas: 3 x 23 = 69' +
          '\nDiscount: 23 Final price: 46' +
          '\nSummary:' +
          '\nTotal value: ' + totalValue +
          '\nTotal discount: ' + discount +
          '\nFinal value: ' + finalValue
        );
      });
    });
  });
});
