const { findAllProducts, findProductById, insertNewProduct } = require('./products');
const { findAllSales, findSalesById, insertNewSale } = require('./sales');

module.exports = {
  findAllProducts,
  findProductById,
  findAllSales,
  findSalesById,
  insertNewProduct,
  insertNewSale,
};