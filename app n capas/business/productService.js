const productModel = require('../data/productModel');

module.exports = {
  getProducts: () => productModel.getAll(),
  addProduct: (producto) => productModel.add(producto)
};