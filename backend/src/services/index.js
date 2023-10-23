const listAllProducts = require('./listAllProducts');
const listProductId = require('./listProductId');
const { listAllSales } = require('./listAllSales');
const { listSalesFromId } = require('./listSalesFromId');
const { registerProduct } = require('./registerProduct');
const { registerSales, productExists, validationItensSolds } = require('./registerSales');

module.exports = {
  listAllProducts,
  listProductId,
  listAllSales,
  listSalesFromId,
  registerProduct,
  registerSales,
  productExists,
  validationItensSolds,
};