const { findProductById } = require('../models/products');

const listProductId = async (id) => {
  const productFromId = await findProductById(id);
  const status = productFromId.length === 1 ? 'OK' : 'NOT_FOUND';
  const data = productFromId.length === 1 ? productFromId[0] : { message: 'Product not found' };
  return { status, data };
};

module.exports = listProductId;
