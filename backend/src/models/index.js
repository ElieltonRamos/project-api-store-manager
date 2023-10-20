const { findAllProducts, findProductById, insertNewProduct } = require('./products');
const { findAllSales, findSalesById } = require('./sales');

module.exports = {
  findAllProducts,
  findProductById,
  findAllSales,
  findSalesById,
  insertNewProduct,
};