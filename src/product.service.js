const productDAO = require('./product.dao');

function groupProducts(products) {
  let productsGroup = {};
  products.forEach(productName => {
    let count = productsGroup[productName];
    if (!count) {
      productsGroup[productName] = 1;
    } else {
      productsGroup[productName] = ++count;
    }
  });

  return productsGroup;
}

function getProductDetails(productName, count) {
  const newProduct = productDAO.get(productName);
  newProduct.setCount(count);

  return newProduct;
}

function getDetails(productsList) {
  const productsGroup = groupProducts(productsList);
  const productsWithDetails = [];
  let totalValue = 0;
  let totalDiscount = 0;

  for(let productName in productsGroup) {
    const productDetails = getProductDetails(productName, productsGroup[productName]);
    productsWithDetails.push(productDetails);
    totalValue += productDetails.getTotalPrice();
    totalDiscount += productDetails.getDiscount();
  }

  return {
    products: productsWithDetails,
    total: totalValue,
    discount: totalDiscount,
    finalPrice: totalValue - totalDiscount
  };
}

module.exports = {
  getDetails
};
