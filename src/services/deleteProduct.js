const models = require('../models');
const services = require('./registerSales');

const deleteProduct = async (id) => {
  if (!id) return ({ status: 'BAD_REQUEST', data: { message: '"id" is required' } });
  const product = await services.productExists(id);
  if (product.status !== 'OK') return product;
  const deletedProduct = await models.deleteProduct(id);
  if (!deletedProduct) return ({ status: 'ERROR', data: { message: 'Internal error' } });
  return { status: 'NO_CONTENT', data: 'product deleted success' };
};

module.exports = {
  deleteProduct,
};