const models = require('../models');

const productExists = async (productId) => {
  const resDB = await models.findProductById(productId);
  if (resDB.length === 0) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  return { status: 'OK' };
};

const validationItensSolds = async (itensSold) => {
  const isValid = await Promise.all(
    itensSold.map(async ({ productId, quantity }) => {
      if (productId === undefined) {
        return { status: 'BAD_REQUEST', data: { message: '"productId" is required' } };
      }
      if (quantity === undefined) {
        return { status: 'BAD_REQUEST', data: { message: '"quantity" is required' } };
      }
      if (quantity <= 0) {
        return {
          status: 'UNPROCESSABLE_ENTITY',
          data: { message: '"quantity" must be greater than or equal to 1' },
        };
      }
      return productExists(productId);
    }),
  );
  return isValid;
};

const registerSales = async (itensSold) => {
  const itensValids = await validationItensSolds(itensSold);
  if (itensValids.some((item) => item.status !== 'OK')) {
    return itensValids.find((item) => item.status !== 'OK');
  }
  const responseDB = await models.insertNewSale(itensSold);
  const status = responseDB.message ? 'ERROR' : 'CREATED';
  const data = responseDB.message ? responseDB : responseDB;
  return { status, data };
};

module.exports = {
  registerSales,
};