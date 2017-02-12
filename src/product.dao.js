const Product = require('./product');

const PRODUCTS_MAP = {
  'Apples': 25,
  'Oranges': 30,
  'Garlic': 15,
  'Papayas': 50
};

// Number of items at which you offer one
const PRODUCTS_OFFER = {
  'Papayas': 2
};

function getPrice(product) {
  if (!(product in PRODUCTS_MAP)) {
    throw new Error(`Product ${product} not found`);
  }

  return PRODUCTS_MAP[product];
}

function getOffer(product) {
  return PRODUCTS_OFFER[product];
}

function get(product) {
  return new Product(product, getPrice(product), getOffer(product));
}

module.exports = {
  get
};
