const productService = require('./product.service');

function lineDescription(product) {
  const line = `\n${product.getName()}: ${product.getCount()} x ${product.getUnitPrice()} = ${product.getTotalPrice()}`;
  const discountLine = product.getDiscount() > 0 ?
    `\nDiscount: ${product.getDiscount()} Final price: ${product.getFinalPrice()}` : '';

  return line + discountLine;
}

function summaryDescription(productsDetails) {
  return '\nSummary:' +
    `\nTotal value: ${productsDetails.total}` +
    `\nTotal discount: ${productsDetails.discount}` +
    `\nFinal value: ${productsDetails.finalPrice}`;
}

function description(productsList) {
  let receipt = '';
  const productsDetails = productService.getDetails(productsList);
  productsDetails.products.forEach(productDetails => {
    receipt += lineDescription(productDetails);
  });

  receipt += summaryDescription(productsDetails);
  return receipt;
}

module.exports = {
  description
};
