const productService = require('../src/product.service');
const productDAO = require('../src/product.dao');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const expect = chai.expect;

describe('product service', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('#getDetails', () => {
    describe('when we have an empty list', () => {
      let details;

      beforeEach(() => {
        details = productService.getDetails([]);
      });

      it('should return products as an empty list', () => {
        expect(details.products).to.eql([]);
      });

      it('should return total as 0', () => {
        expect(details.total).to.equal(0);
      });

      it('should return discount as 0', () => {
        expect(details.total).to.equal(0);
      });

      it('should return finalPrice as 0', () => {
        expect(details.total).to.equal(0);
      });
    });

    describe('when we have a list with multiple elements', () => {
      const productsList = [
        'Apples',
        'Oranges',
        'Oranges',
        'Apples',
        'Papayas',
        'Apples',
        'Papayas',
        'Apples',
        'Papayas',
        'Apples',
        'Apples',
        'Garlic'
      ];
      const totalApples = 24;
      const totalOranges = 35;
      const totalGarlic = 11;
      const totalPapayas = 33;

      const discountApples = 4;
      const discountOranges = 0;
      const discountGarlic = 1;
      const discountPapayas = 3;

      let applesProductMock;
      let orangesProductMock;
      let papayasProductMock;
      let garlicProductMock;

      let productsDetails;

      function createProductMock(total, discount) {
        return {
          getDiscount: () => discount,
          getTotalPrice: () => total,
          setCount: sandbox.spy()
        };
      }

      beforeEach(() => {
        applesProductMock = createProductMock(totalApples, discountApples);
        orangesProductMock = createProductMock(totalOranges, discountOranges);
        papayasProductMock = createProductMock(totalPapayas, discountPapayas);
        garlicProductMock = createProductMock(totalGarlic, discountGarlic);

        sandbox.stub(productDAO, 'get')
          .withArgs('Apples').returns(applesProductMock)
          .withArgs('Oranges').returns(orangesProductMock)
          .withArgs('Papayas').returns(papayasProductMock)
          .withArgs('Garlic').returns(garlicProductMock);

        productsDetails = productService.getDetails(productsList);
      });

      it('should have the proper products on the return list', () => {
        expect(productsDetails.products[0]).to.equal(applesProductMock);
        expect(productsDetails.products[1]).to.equal(orangesProductMock);
        expect(productsDetails.products[2]).to.equal(papayasProductMock);
        expect(productsDetails.products[3]).to.equal(garlicProductMock);
      });

      it('should set the proper count of each of the products', () => {
        expect(applesProductMock.setCount).to.have.been.calledWith(6);
        expect(orangesProductMock.setCount).to.have.been.calledWith(2);
        expect(papayasProductMock.setCount).to.have.been.calledWith(3);
        expect(garlicProductMock.setCount).to.have.been.calledWith(1);
      });

      it('should have the total as the sum of each product total', () => {
        expect(productsDetails.total)
          .equal(totalApples + totalOranges + totalGarlic + totalPapayas);
      });

      it('should have the discount as the sum of each product discount', () => {
        expect(productsDetails.discount)
          .equal(discountApples + discountOranges + discountGarlic + discountPapayas);
      });

      it('should have the final price as the difference between total and the discount', () => {
        expect(productsDetails.finalPrice)
          .equal(
            totalApples + totalOranges + totalGarlic + totalPapayas
            -(discountApples + discountOranges + discountGarlic + discountPapayas)
          );
      });
    });
  });
});
