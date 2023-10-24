const models = require('../models');
const services = require('./registerSales');

const updateProduct = async (id, name) => {
  const product = await services.productExists(id);
  if (product.status !== 'OK') return product;
  const responseDB = await models.updateProduct(id, name);
  if (!responseDB) return { status: 'ERROR', data: { message: 'Internal server error' } };
  const idNumber = Number(id);
  return { status: 'OK', data: { id: idNumber, name } };
};

module.exports = {
  updateProduct,
};