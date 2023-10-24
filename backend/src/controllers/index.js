const getAllProducts = require('./getAllProducts');
const getProductId = require('./getProductId');
const { getAllSales } = require('./getAllSales');
const { getSalesFromId } = require('./getSalesFromId');
const { postProducts } = require('./postProducts');
const { postSales } = require('./postSales');
const { deleteProduct } = require('./deleteProduct');
const { putProduct } = require('./putProduct');

module.exports = {
  getAllProducts,
  getProductId,
  getAllSales,
  getSalesFromId,
  postProducts,
  postSales,
  deleteProduct,
  putProduct,
};