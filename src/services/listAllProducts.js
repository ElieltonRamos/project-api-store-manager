const models = require('../models');

const listAllProducts = async () => {
  const allProducts = await models.findAllProducts();
  const status = allProducts.length > 0 ? 'OK' : 'NOT_FOUND';
  const data = allProducts.length > 0 ? allProducts : { message: 'Not found' };
  return { status, data };
};

module.exports = listAllProducts;
