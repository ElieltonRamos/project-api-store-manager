const { findAllProducts, findProductById, insertNewProduct,
  deleteProduct, updateProduct } = require('./products');
const { findAllSales, findSalesById, insertNewSale, createNewSale,
  deleteSale } = require('./sales');

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
  deleteSale,
};