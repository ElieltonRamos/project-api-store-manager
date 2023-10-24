const { findAllProducts, findProductById, insertNewProduct,
  deleteProduct, updateProduct } = require('./products');
const { findAllSales, findSalesById, insertNewSale, createNewSale } = require('./sales');

module.exports = {
  findAllProducts,
  findProductById,
  findAllSales,
  findSalesById,
  insertNewProduct,
  insertNewSale,
  createNewSale,
  deleteProduct,
  updateProduct,
};