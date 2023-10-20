const models = require('../models');

const registerProduct = async (name) => {
  const allProducts = await models.findAllProducts();
  const productExists = allProducts.find((product) => product.name === name);
  if (productExists) return { status: 'CONFLICT', data: { message: 'product already registered' } };
  const productId = await models.insertNewProduct(name);
  const data = { id: productId, name };
  const status = productId ? 'CREATED' : 'ERROR';
  return { status, data };
};

module.exports = {
  registerProduct,
};